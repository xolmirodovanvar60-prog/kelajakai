import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { MentorsHub, mentors } from '@/components/MentorsHub';
import { LivingBookSection } from '@/components/LivingBookSection';
import { TimeNavigation, MobileTimeNavigation } from '@/components/TimeNavigation';
import { AIChatModal } from '@/components/AIChatModal';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import { Mentor } from '@/components/MentorCard';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string }>({ url: '', title: '' });
  const mentorsRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    mentorsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('mentors');
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      mentorsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatWithMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsChatOpen(true);
  };

  const handlePlayVideo = (mentor: Mentor) => {
    if (mentor.videoUrl) {
      setCurrentVideo({ 
        url: mentor.videoUrl, 
        title: mentor.videoTitle || `${mentor.name} - ${mentor.topic}` 
      });
      setIsVideoOpen(true);
    }
  };

  const handleOpenLivingBook = () => {
    const bookMentor = mentors.find(m => m.id === 'book');
    if (bookMentor) {
      handleChatWithMentor(bookMentor);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Navigation */}
      <TimeNavigation activeSection={activeSection} onNavigate={handleNavigate} />
      <MobileTimeNavigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
              <span className="text-xs font-black text-primary-foreground">AI</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              AI-Librarian
            </span>
          </motion.div>

          <div className="glass-panel px-4 py-2 rounded-full">
            <span className="text-xs font-medium text-primary">
              🚀 The Time Machine of Knowledge
            </span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <HeroSection onExplore={handleExplore} />

      {/* Mentors Hub */}
      <div ref={mentorsRef}>
        <MentorsHub 
          onChatWithMentor={handleChatWithMentor} 
          onPlayVideo={handlePlayVideo}
        />
      </div>

      {/* Living Book Section */}
      <LivingBookSection onOpenBook={handleOpenLivingBook} />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/20 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 AI-Librarian. Revitalizing Books with AI.
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            An interactive educational platform for curious minds.
          </p>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        mentor={selectedMentor}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={currentVideo.url}
        title={currentVideo.title}
      />
    </div>
  );
};

export default Index;
