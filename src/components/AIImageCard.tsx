import { ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIImageCardProps {
  imageUrl: string;
  isLoading: boolean;
}

const defaultImage = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800';

export function AIImageCard({ imageUrl, isLoading }: AIImageCardProps) {
  const displayImage = imageUrl || defaultImage;

  return (
    <div className="bg-card rounded-[2rem] aspect-square overflow-hidden shadow-xl border relative group">
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <span className="text-sm font-medium text-muted-foreground">Rasm chizilmoqda...</span>
          </div>
        </div>
      )}
      
      <motion.img
        key={displayImage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src={displayImage}
        alt="AI Generated Illustration"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-primary mb-2 font-bold uppercase text-xs tracking-widest">
          <ImageIcon size={16} />
          DALL-E 3 RASSOM
        </div>
        <p className="text-white text-lg font-bold leading-tight">
          Mavzuga doir avtomatik vizual darslik
        </p>
      </div>
    </div>
  );
}
