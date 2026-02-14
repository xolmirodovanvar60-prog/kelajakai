import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
}

const NewsCard = ({ image, date, title, description }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Button
          variant="ghost"
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0"
        >
          Batafsil
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default NewsCard;
