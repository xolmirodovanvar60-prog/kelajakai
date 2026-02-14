import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

const StatCounter = ({ end, suffix = '', label, icon: Icon }: StatCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-amber-400" />
      </div>
      <div className="text-5xl font-black mb-2">
        {count}{suffix}
      </div>
      <div className="text-blue-200 font-medium">{label}</div>
    </motion.div>
  );
};

export default StatCounter;
