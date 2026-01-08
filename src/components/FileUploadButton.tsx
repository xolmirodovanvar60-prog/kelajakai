import { useRef } from 'react';
import { Paperclip, X, FileText, Image as ImageIcon, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
  file: File;
  preview?: string;
  type: 'image' | 'document' | 'other';
}

interface FileUploadButtonProps {
  onFileSelect: (files: UploadedFile[]) => void;
  selectedFiles: UploadedFile[];
  onRemoveFile: (index: number) => void;
  disabled?: boolean;
}

export function FileUploadButton({ 
  onFileSelect, 
  selectedFiles, 
  onRemoveFile,
  disabled 
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedFiles: UploadedFile[] = [];

    files.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isDocument = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'].includes(file.type);
      
      const uploadedFile: UploadedFile = {
        file,
        type: isImage ? 'image' : isDocument ? 'document' : 'other',
      };

      if (isImage) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      uploadedFiles.push(uploadedFile);
    });

    onFileSelect(uploadedFiles);
    if (inputRef.current) inputRef.current.value = '';
  };

  const getFileIcon = (type: UploadedFile['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={14} className="text-blue-500" />;
      case 'document':
        return <FileText size={14} className="text-emerald-500" />;
      default:
        return <File size={14} className="text-slate-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all disabled:opacity-50 flex-shrink-0"
        title="Fayl yuklash (rasm, PDF, Word, TXT)"
      >
        <Paperclip size={18} />
      </motion.button>

      {/* Selected files preview */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-1 overflow-x-auto max-w-[200px]"
          >
            {selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative flex-shrink-0"
              >
                {file.type === 'image' && file.preview ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                    <img 
                      src={file.preview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
                <button
                  onClick={() => onRemoveFile(index)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
