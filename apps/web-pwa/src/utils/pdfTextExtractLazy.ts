/**
 * Extracción PDF bajo demanda (evita cargar pdfjs en el bundle inicial).
 */
export async function extractTextFromPdf(file: File): Promise<{ text: string; truncated: boolean; pages: number }> {
  const { extractTextFromPdf: extract } = await import('./pdfTextExtract');
  return extract(file);
}

export async function titleFromPdfFileName(fileName: string): Promise<string> {
  const { titleFromPdfFileName: titleFn } = await import('./pdfTextExtract');
  return titleFn(fileName);
}
