import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

total_q = 0
all_ids = {}
schema_issues = []
corrupted_chars = []
giveaway_artifacts = []
length_bias_warnings = []
duplicate_options = []
option_count_issues = []

suspicious_phrases = [
    'todas las anteriores', 'ninguna de las anteriores', 'todas son correctas', 'a y b son correctas',
    'carga comercial no declarada', 'inspección técnica diferida', 'notoc firmado'
]

for f in banks:
    fname = os.path.basename(f)
    if fname in ignored or fname.startswith('user_backup'):
        continue
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        items = data if isinstance(data, list) else [data]
        for item in items:
            total_q += 1
            qid = item.get('id', 'MISSING_ID')
            
            # Check ID uniqueness
            if qid in all_ids:
                schema_issues.append((f, qid, f'ID duplicado (visto en {all_ids[qid]})'))
            else:
                all_ids[qid] = f
                
            # Check required fields
            for req in ['id', 'subject_id', 'learning_objective', 'stem', 'options', 'explanation']:
                if req not in item:
                    schema_issues.append((f, qid, f'Falta campo requerido: {req}'))
                    
            options = item.get('options', [])
            if len(options) < 3:
                option_count_issues.append((f, qid, f'Menos de 3 opciones ({len(options)})'))
                
            correct_cnt = sum(1 for o in options if o.get('is_correct') is True)
            if correct_cnt != 1:
                schema_issues.append((f, qid, f'Tiene {correct_cnt} opciones correctas'))
                
            # Check duplicate text in options
            opt_texts = [o.get('text', '').strip().lower() for o in options]
            if len(opt_texts) != len(set(opt_texts)):
                duplicate_options.append((f, qid, 'Opciones idénticas dentro de la misma pregunta'))
                
            # Check encoding / corrupted chars
            full_str = json.dumps(item, ensure_ascii=False)
            if '\ufffd' in full_str:
                corrupted_chars.append((f, qid, 'Contiene caracter corrupto Unicode replacement char'))
                
            # Check suspicious artifacts
            for opt in options:
                txt = opt.get('text', '').lower()
                for sp in suspicious_phrases:
                    if sp in txt:
                        giveaway_artifacts.append((f, qid, f'Frase sospechosa/artefacto: "{sp}" en opción {opt.get("id")}'))
                        
            # Check length bias
            correct_opts = [o for o in options if o.get('is_correct') is True]
            wrong_opts = [o for o in options if o.get('is_correct') is False]
            if correct_opts and wrong_opts:
                c_len = len(correct_opts[0].get('text', ''))
                w_avg = sum(len(w.get('text', '')) for w in wrong_opts) / len(wrong_opts)
                if w_avg > 15 and c_len > 3.0 * w_avg:
                    length_bias_warnings.append((f, qid, f'Sesgo de longitud severo: Correcta={c_len} chars vs Distractores={w_avg:.0f} chars'))

    except Exception as e:
        schema_issues.append((f, 'FILE_ERROR', str(e)))

print(f'=== RESULTADOS DE AUDITORÍA GLOBAL ({total_q} PREGUNTAS ANALIZADAS) ===')
print(f'1. Errores de Esquema / Estructura: {len(schema_issues)}')
for issue in schema_issues[:10]:
    print('   -', issue)
print(f'2. Caracteres corruptos: {len(corrupted_chars)}')
for issue in corrupted_chars[:10]:
    print('   -', issue)
print(f'3. Artefactos / Fórmulas Prohibidas EASA: {len(giveaway_artifacts)}')
for issue in giveaway_artifacts[:20]:
    print('   -', issue)
print(f'4. Opciones Duplicadas en misma pregunta: {len(duplicate_options)}')
for issue in duplicate_options[:10]:
    print('   -', issue)
print(f'5. Conteo de Opciones (<3): {len(option_count_issues)}')
for issue in option_count_issues[:10]:
    print('   -', issue)
print(f'6. Advertencias de Sesgo de Longitud Severo (>3x): {len(length_bias_warnings)}')
for issue in length_bias_warnings[:15]:
    print('   -', issue)
