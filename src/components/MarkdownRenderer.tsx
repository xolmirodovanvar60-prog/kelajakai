import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Kalit so'zlarni ajratish funksiyasi
function highlightKeywords(text: string): React.ReactNode {
  const keywords = [
    'muhim', 'esda tuting', 'formula', 'qoida', 'ta\'rif', 'misol', 'javob',
    'important', 'remember', 'definition', 'example', 'answer', 'note',
    'xulosa', 'natija', 'sabab', 'chunki', 'demak', 'shuning uchun'
  ];
  
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={i} className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-semibold mx-0.5">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content leading-[1.8] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 last:mb-0 text-slate-700 leading-relaxed">
              {typeof children === 'string' ? highlightKeywords(children) : children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-2 text-slate-700">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-indigo-700 bg-indigo-50 px-1 rounded">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-purple-600">{children}</em>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded-md text-sm font-mono border border-slate-200">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto my-4 shadow-lg">
                <code className="text-sm font-mono leading-relaxed">{children}</code>
              </pre>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-xl font-black mb-4 text-slate-900 border-b-2 border-indigo-200 pb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold mb-2 text-slate-700">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-400 bg-indigo-50/50 pl-4 pr-3 py-3 italic text-slate-600 my-4 rounded-r-xl">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-6 border-t-2 border-slate-200" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-slate-200 rounded-xl overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-indigo-50 px-4 py-2 text-left font-bold text-indigo-700 border-b border-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-b border-slate-100 text-slate-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
