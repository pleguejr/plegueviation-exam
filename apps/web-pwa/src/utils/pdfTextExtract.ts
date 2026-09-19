const MAX_CHARS = 90000;

async function getPdfJs(): Promise<any> {
  if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
    return (window as any).pdfjsLib;
  }
  try {
    const importEsm = new Function('url', 'return import(url)');
    // @ts-ignore dynamic remote ESM import
    const pdfjs = await importEsm('https://esm.sh/pdfjs-dist@3.11.174');
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    return pdfjs;
  } catch (e) {
    throw new Error('No se pudo cargar el motor PDF. Comprueba tu conexión a internet o copia y pega el texto del documento.');
  }
}

/**
 * Extrae texto de un PDF en el navegador (sin subir a ningún servidor).
 */
export async function extractTextFromPdf(file: File): Promise<{ text: string; truncated: boolean; pages: number }> {
  const pdfjs = await getPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => (item && 'str' in item ? String(item.str) : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (pageText) {
      parts.push(`--- Página ${pageNum} ---\n${pageText}`);
    }
  }

  const full = parts.join('\n\n').trim();
  if (!full) {
    throw new Error('No se pudo extraer texto del PDF (¿escaneado solo como imagen?). Usa OCR en Gemini subiendo el archivo.');
  }

  if (full.length > MAX_CHARS) {
    return {
      text: `${full.slice(0, MAX_CHARS)}\n\n[… texto truncado por longitud; el resto sigue en el PDF original …]`,
      truncated: true,
      pages: doc.numPages
    };
  }

  return { text: full, truncated: false, pages: doc.numPages };
}

export function titleFromPdfFileName(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'Comunicado operativo';
}
