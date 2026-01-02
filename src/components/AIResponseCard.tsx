import { Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIResponseCardProps {
  response: string;
  isPlayingAudio: boolean;
}

export function AIResponseCard({ response, isPlayingAudio }: AIResponseCardProps) {
  return (
    <div className="bg-card rounded-[2rem] p-8 shadow-xl border relative min-h-[300px] flex flex-col justify-between overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-5">
        <Sparkles size={200} />
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            AI Ustoz Javobi:
          </span>
          {isPlayingAudio && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-1 text-primary"
            >
              <Volume2 size={14} />
              <span className="text-xs">O'qilmoqda...</span>
            </motion.div>
          )}
        </div>
        <p className="text-lg font-medium text-card-foreground leading-relaxed">
          "{response}"
        </p>
      </div>
    </div>
  );
}
