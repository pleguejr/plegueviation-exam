import React, { useState } from 'react';
import { ZoomIn, X, BookOpen, AlertCircle } from 'lucide-react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');

  if (!text) return null;

  // Split text by lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  const flushTable = (keyIndex: number) => {
    if (tableHeader.length > 0 || tableRows.length > 0) {
      elements.push(
        <div key={`table-${keyIndex}`} className="overflow-x-auto my-3 rounded-xl border border-sky-500/25 bg-[#081224] shadow-lg">
          <table className="w-full text-left text-xs border-collapse font-mono">
            {tableHeader.length > 0 && (
              <thead>
                <tr className="bg-slate-900/90 text-[11px] uppercase text-sky-300 border-b border-slate-800">
                  {tableHeader.map((th, i) => (
                    <th key={i} className="py-2.5 px-3 font-bold">
                      {formatInlineText(th.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-sky-950/20 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 text-slate-200">
                      {formatInlineText(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeader = [];
      tableRows = [];
    }
    inTable = false;
  };

  const flushBlockquote = (keyIndex: number) => {
    if (blockquoteLines.length > 0) {
      const fullBlockText = blockquoteLines.join('\n');
      const isManualQuote = fullBlockText.includes('Extracto') || fullBlockText.includes('Manual') || fullBlockText.includes('MOA') || fullBlockText.includes('POH') || fullBlockText.includes('AFM') || fullBlockText.includes('QRH');
      
      elements.push(
        <div
          key={`quote-${keyIndex}`}
          className={`my-3 p-3.5 rounded-xl border-l-4 shadow-md text-xs sm:text-sm leading-relaxed transition-all ${
            isManualQuote
              ? 'border-amber-400 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-slate-900/40 text-amber-100/95'
              : 'border-sky-400 bg-gradient-to-r from-sky-950/30 via-slate-900/60 to-slate-900/40 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1.5 text-xs text-amber-300 uppercase tracking-wider">
            {isManualQuote ? <BookOpen className="w-4 h-4 text-amber-400" /> : <AlertCircle className="w-4 h-4 text-sky-400" />}
            <span>{isManualQuote ? 'Extracto Literal Oficial del Manual' : 'Cita / Referencia Operacional'}</span>
          </div>
          <div className="space-y-1 font-serif italic text-slate-100/90 pl-1 border-l border-amber-400/20 my-1">
            {blockquoteLines.map((bLine, bIdx) => (
              <p key={bIdx}>{formatInlineText(bLine)}</p>
            ))}
          </div>
        </div>
      );
      blockquoteLines = [];
    }
    inBlockquote = false;
  };

  const formatInlineText = (str: string): React.ReactNode => {
    let clean = str;
    clean = clean.replace(/\\ge/g, '≥').replace(/\\le/g, '≤').replace(/\\approx/g, '≈').replace(/\\text\{([^}]+)\}/g, '$1').replace(/\$/g, '');

    const parts = clean.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="text-sky-300 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for markdown image: ![Alt Text](image_url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (inTable) flushTable(i);
      if (inBlockquote) flushBlockquote(i);

      const altText = imgMatch[1] || 'Extracto del Manual';
      const imgSrc = imgMatch[2];

      elements.push(
        <div key={`img-${i}`} className="my-3.5 group relative">
          <div
            onClick={() => {
              setLightboxSrc(imgSrc);
              setLightboxAlt(altText);
            }}
            className="cursor-pointer rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/80 shadow-xl hover:border-amber-400/70 transition-all duration-200"
          >
            <div className="relative bg-slate-900/50 flex items-center justify-center p-1">
              <img
                src={imgSrc}
                alt={altText}
                className="max-h-72 w-auto max-w-full object-contain rounded-lg transition-transform group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-amber-300 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity border border-slate-700">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
            {altText && (
              <div className="py-1.5 px-3 bg-slate-900/90 text-center text-[11px] text-slate-300 font-mono border-t border-slate-800 flex items-center justify-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>{altText}</span>
              </div>
            )}
          </div>
        </div>
      );
      continue;
    }

    // Check for Blockquote: starts with '>'
    if (line.startsWith('>')) {
      if (inTable) flushTable(i);
      inBlockquote = true;
      const quoteContent = line.replace(/^>\s?/, '').trim();
      if (quoteContent.length > 0) {
        blockquoteLines.push(quoteContent);
      }
      continue;
    } else if (inBlockquote) {
      flushBlockquote(i);
    }

    // Check if line is a table row: starts and ends with '|'
    if (line.startsWith('|') && line.endsWith('|')) {
      if (inBlockquote) flushBlockquote(i);
      // Is it a divider row? e.g. | :--- | :--- |
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(line)) {
        continue;
      }

      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    // Heading 3: ###
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${i}`} className="text-sm font-black text-sky-400 mt-3 mb-1.5 flex items-center gap-1.5">
          <span>{line.slice(4)}</span>
        </h4>
      );
      continue;
    }

    // Heading 2: ##
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${i}`} className="text-base font-black text-white mt-4 mb-2">
          {line.slice(3)}
        </h3>
      );
      continue;
    }

    // Bullet point: - or *
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2 text-slate-200 text-xs sm:text-sm pl-2 my-1">
          <span className="text-sky-400 font-bold">•</span>
          <span className="flex-1">{formatInlineText(line.slice(2))}</span>
        </div>
      );
      continue;
    }

    // Regular paragraph or empty line
    if (line.length > 0) {
      elements.push(
        <p key={`p-${i}`} className="text-slate-200 text-xs sm:text-sm leading-relaxed my-1.5">
          {formatInlineText(line)}
        </p>
      );
    }
  }

  if (inTable) {
    flushTable(lines.length);
  }
  if (inBlockquote) {
    flushBlockquote(lines.length);
  }

  return (
    <>
      <div className={`space-y-1 ${className}`}>{elements}</div>

      {/* Lightbox Modal for high-res snippet viewing */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>{lightboxAlt || 'Recorte Oficial del Manual'}</span>
              </div>
              <button
                onClick={() => setLightboxSrc(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[calc(90vh-60px)] flex items-center justify-center bg-slate-950/60">
              <img
                src={lightboxSrc}
                alt={lightboxAlt}
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
