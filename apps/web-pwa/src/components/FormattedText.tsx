import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split text by lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

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

  const formatInlineText = (str: string): React.ReactNode => {
    // Process **bold** and math
    let clean = str;
    // Replace LaTeX blocks like $\ge 2.000\text{ ft}$
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

    // Check if line is a table row: starts and ends with '|'
    if (line.startsWith('|') && line.endsWith('|')) {
      // Is it a divider row? e.g. | :--- | :--- |
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(line)) {
        // Divider row: ignore, just marks separation
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

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
