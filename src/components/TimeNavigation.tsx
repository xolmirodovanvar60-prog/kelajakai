import { motion } from 'framer-motion';
import { 
  Sword, 
  Atom, 
  Heart, 
  Calculator, 
  Star, 
  BookOpen, 
  FlaskConical, 
  Sparkles,
  Home
} from 'lucide-react';

interface TimeNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'history', label: 'History', icon: Sword },
  { id: 'physics', label: 'Physics', icon: Atom },
  { id: 'biology', label: 'Biology', icon: Heart },
  { id: 'math', label: 'Math', icon: Calculator },
  { id: 'astronomy', label: 'Astronomy', icon: Star },
  { id: 'literature', label: 'Literature', icon: BookOpen },
  { id: 'chemistry', label: 'Chemistry', icon: FlaskConical },
  { id: 'fiction', label: 'Fiction', icon: Sparkles },
];

export function TimeNavigation({ activeSection, onNavigate }: TimeNavigationProps) {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="glass-panel rounded-2xl p-3 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground neon-glow' 
                  : 'hover:bg-primary/20 text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-background/90 border border-primary/30 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}

// Mobile navigation
export function MobileTimeNavigation({ activeSection, onNavigate }: TimeNavigationProps) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      <div className="glass-panel border-t border-primary/30 px-2 py-2">
        <div className="flex justify-around items-center overflow-x-auto scrollbar-hide">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'neon-text' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
