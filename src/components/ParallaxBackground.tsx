import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Sparkles, Star } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  type: 'book' | 'sparkle' | 'star';
  delay: number;
}

export function ParallaxBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const { scrollY } = useScroll();
  
  // Create parallax transforms at different speeds
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -200]);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    
    // Generate floating books
    for (let i = 0; i < 8; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        type: 'book',
        delay: Math.random() * 5,
      });
    }
    
    // Generate sparkles
    for (let i = 8; i < 16; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.3 + Math.random() * 0.4,
        rotation: 0,
        type: 'sparkle',
        delay: Math.random() * 3,
      });
    }
    
    // Generate stars
    for (let i = 16; i < 24; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.2 + Math.random() * 0.3,
        rotation: Math.random() * 45,
        type: 'star',
        delay: Math.random() * 4,
      });
    }
    
    setElements(newElements);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-full h-full" />;
      case 'sparkle':
        return <Sparkles className="w-full h-full" />;
      case 'star':
        return <Star className="w-full h-full" />;
      default:
        return null;
    }
  };

  const getParallaxY = (index: number) => {
    if (index < 8) return y1;
    if (index < 16) return y2;
    return y3;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => (
        <motion.div
          key={element.id}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            y: getParallaxY(index),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: element.scale,
            rotate: [element.rotation, element.rotation + 20, element.rotation],
          }}
          transition={{
            opacity: {
              duration: 4 + element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 8 + element.delay * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            scale: {
              duration: 0.5,
              delay: element.delay * 0.1,
            }
          }}
          className="absolute text-primary/20"
        >
          <div 
            className="w-8 h-8 md:w-12 md:h-12"
            style={{ transform: `scale(${element.scale})` }}
          >
            {getIcon(element.type)}
          </div>
        </motion.div>
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent/5 blur-3xl"
      />
    </div>
  );
}
