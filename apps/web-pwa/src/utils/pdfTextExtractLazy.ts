/**
 * Extracción PDF bajo demanda (evita cargar pdfjs en el bundle inicial).
 */
export async function extractTextFromPdf(file: File): Promise<{ text: string; truncated: boolean; pages: number }> {
  const mod = await import('./pdfTextExtract');
  return mod.extractTextFromPdf(file);
}

export function titleFromPdfFileName(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'Comunicado operativo';
}
