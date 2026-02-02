import { motion } from 'framer-motion';
import { 
  Sword, 
  Atom, 
  Heart, 
  Calculator, 
  Star, 
  BookOpen, 
  FlaskConical, 
  Sparkles 
} from 'lucide-react';
import { MentorCard, Mentor } from '@/components/MentorCard';

interface MentorsHubProps {
  onChatWithMentor: (mentor: Mentor) => void;
}

export const mentors: Mentor[] = [
  {
    id: 'amir-temur',
    name: 'Amir Temur',
    subject: 'History',
    era: '1336-1405 CE',
    description: 'The great conqueror who built one of the largest empires in history, known for his military genius and cultural patronage.',
    topic: 'The Battle of Mud (1365)',
    icon: Sword,
    gradient: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    subject: 'Physics',
    era: '1879-1955 CE',
    description: 'Revolutionary physicist who developed the theory of relativity and transformed our understanding of space, time, and energy.',
    topic: 'General Relativity',
    icon: Atom,
    gradient: 'from-blue-500 to-purple-600',
    accentColor: '#3b82f6',
  },
  {
    id: 'ibn-sino',
    name: 'Ibn Sina',
    subject: 'Biology',
    era: '980-1037 CE',
    description: 'Persian polymath known as the "Father of Modern Medicine", whose Canon of Medicine was used for centuries.',
    topic: 'Human Anatomy & Medicine',
    icon: Heart,
    gradient: 'from-red-500 to-pink-600',
    accentColor: '#ef4444',
  },
  {
    id: 'al-khwarizmi',
    name: 'Al-Khwarizmi',
    subject: 'Mathematics',
    era: '780-850 CE',
    description: 'The Father of Algebra whose work gave us algorithms. His name literally became the word "algorithm".',
    topic: 'Invention of Algorithms',
    icon: Calculator,
    gradient: 'from-green-500 to-emerald-600',
    accentColor: '#22c55e',
  },
  {
    id: 'ulughbek',
    name: 'Mirzo Ulughbek',
    subject: 'Astronomy',
    era: '1394-1449 CE',
    description: 'The astronomer prince of Samarkand who built one of the finest observatories and catalogued over 1,000 stars.',
    topic: 'Zij-i Sultani Star Catalog',
    icon: Star,
    gradient: 'from-indigo-500 to-violet-600',
    accentColor: '#6366f1',
  },
  {
    id: 'navoi',
    name: 'Alisher Navoi',
    subject: 'Literature',
    era: '1441-1501 CE',
    description: 'The greatest representative of Chagatai Turkic literature, often called the founder of Uzbek literary language.',
    topic: 'Origin of Uzbek Language',
    icon: BookOpen,
    gradient: 'from-teal-500 to-cyan-600',
    accentColor: '#14b8a6',
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    subject: 'Chemistry',
    era: '1867-1934 CE',
    description: 'Pioneer in radioactivity research, first woman to win a Nobel Prize, and only person to win in two different sciences.',
    topic: 'Radioactivity & Elements',
    icon: FlaskConical,
    gradient: 'from-yellow-500 to-lime-500',
    accentColor: '#eab308',
  },
  {
    id: 'book',
    name: 'The Living Book',
    subject: 'Fiction',
    era: 'Timeless',
    description: 'A magical tome that contains infinite stories and can bring any tale to life. Open its pages and adventure awaits!',
    topic: 'Infinite Stories',
    icon: Sparkles,
    gradient: 'from-fuchsia-500 to-rose-500',
    accentColor: '#d946ef',
  },
];

export function MentorsHub({ onChatWithMentor }: MentorsHubProps) {
  return (
    <section id="mentors" className="py-20 px-6 relative">
      {/* Background effects */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-panel text-primary text-sm font-medium mb-4">
            Interactive Classroom
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Mentors
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Travel through time and learn from history's greatest minds. 
            Click "Talk to Me" to start an AI-powered conversation.
          </p>
        </motion.div>

        {/* Mentors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              index={index}
              onChat={onChatWithMentor}
              hasVideo={mentor.id === 'amir-temur'}
              onPlayVideo={(m) => console.log('Play video for', m.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
