import { useState } from 'react';
import { Download, FileText, File, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ExportButtonProps {
  messages: Message[];
  disabled?: boolean;
}

export function ExportButton({ messages, disabled }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      let yPos = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      // Title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('USTOZ AI - Suhbat Tarixi', margin, yPos);
      yPos += 15;

      // Date
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Sana: ${new Date().toLocaleDateString('uz-UZ')}`, margin, yPos);
      yPos += 15;

      // Messages
      doc.setFontSize(11);
      messages.forEach((msg) => {
        const prefix = msg.role === 'user' ? 'Siz: ' : 'Ustoz AI: ';
        const text = prefix + msg.content;
        
        // Split text to fit page width
        const lines = doc.splitTextToSize(text, maxWidth);
        
        // Check if we need a new page
        if (yPos + lines.length * 6 > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont('helvetica', msg.role === 'user' ? 'bold' : 'normal');
        doc.text(lines, margin, yPos);
        yPos += lines.length * 6 + 8;
      });

      // Footer
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('Narzikulov Amirxon Anvarovich tomonidan yaratilgan Ustoz AI', margin, doc.internal.pageSize.getHeight() - 10);

      doc.save('ustoz-ai-suhbat.pdf');
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportToWord = async () => {
    setIsExporting(true);
    try {
      const children: Paragraph[] = [
        new Paragraph({
          text: 'USTOZ AI - Suhbat Tarixi',
          heading: HeadingLevel.TITLE,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: `Sana: ${new Date().toLocaleDateString('uz-UZ')}`,
          spacing: { after: 400 },
        }),
      ];

      messages.forEach((msg) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: msg.role === 'user' ? 'Siz: ' : 'Ustoz AI: ',
                bold: true,
              }),
              new TextRun({
                text: msg.content,
              }),
            ],
            spacing: { after: 200 },
          })
        );
      });

      children.push(
        new Paragraph({
          text: '',
          spacing: { before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Narzikulov Amirxon Anvarovich tomonidan yaratilgan Ustoz AI',
              italics: true,
              size: 20,
            }),
          ],
        })
      );

      const doc = new Document({
        sections: [{ children }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'ustoz-ai-suhbat.docx');
    } catch (error) {
      console.error('Word export error:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  if (messages.length === 0) return null;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-semibold transition-all disabled:opacity-50"
      >
        {isExporting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Download size={14} />
        )}
        <span className="hidden sm:inline">Yuklab olish</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && !isExporting && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 w-full text-left text-sm font-medium text-slate-700"
            >
              <FileText size={16} className="text-red-500" />
              PDF formatida
            </button>
            <button
              onClick={exportToWord}
              className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 w-full text-left text-sm font-medium text-slate-700"
            >
              <File size={16} className="text-blue-500" />
              Word formatida
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
