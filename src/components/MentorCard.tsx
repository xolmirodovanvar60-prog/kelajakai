import { motion } from 'framer-motion';
import { MessageCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

export interface Mentor {
  id: string;
  name: string;
  subject: string;
  era: string;
  description: string;
  topic: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
}

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  onChat: (mentor: Mentor) => void;
  onPlayVideo?: (mentor: Mentor) => void;
  hasVideo?: boolean;
}

export function MentorCard({ mentor, index, onChat, onPlayVideo, hasVideo }: MentorCardProps) {
  const Icon = mentor.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative glass-panel rounded-2xl p-6 overflow-hidden h-full">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${mentor.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
        
        {/* Holographic border effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${mentor.accentColor}20, transparent, ${mentor.accentColor}20)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.gradient} flex items-center justify-center mb-4 shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: `0 0 30px ${mentor.accentColor}40`,
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Subject badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            {mentor.subject}
          </span>

          {/* Name */}
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {mentor.name}
          </h3>

          {/* Era */}
          <p className="text-sm text-muted-foreground mb-3">{mentor.era}</p>

          {/* Description */}
          <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-2">
            {mentor.description}
          </p>

          {/* Topic */}
          <div className="bg-background/30 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Featured Topic</p>
            <p className="text-sm font-medium text-foreground">{mentor.topic}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => onChat(mentor)}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to Me
            </Button>
            {hasVideo && onPlayVideo && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPlayVideo(mentor)}
                className="border-primary/50 text-primary hover:bg-primary/20"
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
