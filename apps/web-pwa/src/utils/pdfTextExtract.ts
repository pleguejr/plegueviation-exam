import * as pdfjs from 'pdfjs-dist';

// Vite: worker from the same package version
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const MAX_CHARS = 90000;

/**
 * Extrae texto de un PDF en el navegador (sin subir a ningún servidor).
 */
export async function extractTextFromPdf(file: File): Promise<{ text: string; truncated: boolean; pages: number }> {
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? String(item.str) : ''))
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
