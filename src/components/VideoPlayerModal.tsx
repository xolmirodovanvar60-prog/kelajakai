import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoPlayerModal({ isOpen, onClose, videoUrl, title }: VideoPlayerModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden glass-panel"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Mute/Unmute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-foreground" />
              )}
            </button>

            {/* Title overlay */}
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-white text-xl font-bold drop-shadow-lg">{title}</h3>
            </div>

            {/* Video */}
            <video
              ref={videoRef}
              src={videoUrl}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
