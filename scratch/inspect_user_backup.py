import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

backup_file = 'banks/user_backup_070707.json'
with open(backup_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

print("=== INSPECCIÓN DE BACKUP DEL USUARIO (PIN 070707) ===")
print(f"Claves principales en backup: {list(data.keys())}")

stats = data.get('questionStats', [])
print(f"Total estadísticas registradas: {len(stats)}")

flagged = [s for s in stats if s.get('isFlagged')]
print(f"Preguntas marcadas con BANDERA / FLAG (🚩): {len(flagged)}")
for fl in flagged:
    print(f"  - Flagged ID: {fl.get('questionId')} (Correctas: {fl.get('timesCorrect')}, Incorrectas: {fl.get('timesIncorrect')})")

low_acc = [s for s in stats if s.get('timesAnswered', 0) >= 2 and (s.get('timesCorrect', 0) / s.get('timesAnswered', 1)) < 0.5]
print(f"Preguntas con tasa de acierto < 50% (falladas repetidamente): {len(low_acc)}")
for la in low_acc[:10]:
    print(f"  - Low Acc ID: {la.get('questionId')} (Aciertos: {la.get('timesCorrect')}/{la.get('timesAnswered')})")

reviews = data.get('reviewRequests', [])
print(f"Solicitudes de revisión en backup: {len(reviews)}")
for r in reviews:
    print(f"  - Review: {r}")

deleted = data.get('deletedQuestions', [])
print(f"Preguntas eliminadas en backup: {len(deleted)}")
for d in deleted:
    print(f"  - Deleted: {d.get('id') if isinstance(d, dict) else d}")
