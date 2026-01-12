import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, MessageCircle, Users } from "lucide-react";
import { useEffect } from "react";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const chatbotCards = [
  {
    icon: Bot,
    title: "Telegramda chatbot yaratish",
    description: "Telegram platformasi uchun avtomatlashtirilgan chatbotlar."
  },
  {
    icon: MessageCircle,
    title: "Chatbot assistant yaratish",
    description: "Mijozlar bilan muloqot qiluvchi aqlli chatbot assistant."
  },
  {
    icon: Users,
    title: "AI assistant ro'yxati",
    description: "Tayyor va individual AI assistant variantlari."
  }
];

const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.3 
              }}
              className="relative w-full max-w-[900px] h-[80vh] bg-white rounded-2xl shadow-2xl 
                         overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 
                           hover:bg-slate-200 transition-colors duration-200 group"
                aria-label="Yopish"
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
              </button>

              {/* Modal content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                               bg-blue-50 border border-blue-100 mb-6"
                  >
                    <span className="text-sm text-blue-600 font-medium">KELAJAKAI.UZ</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
                  >
                    Chatbot xizmatini tanlang
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 text-base md:text-lg"
                  >
                    Biznesingiz uchun aqlli chatbot va AI assistantlar
                  </motion.p>
                </div>

                {/* Service cards grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {chatbotCards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group bg-white rounded-xl p-6 border border-slate-200 
                                 shadow-[0_4px_20px_rgba(0,0,0,0.06)] 
                                 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] 
                                 transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5
                                      group-hover:bg-blue-100 transition-colors duration-300">
                        <card.icon className="w-7 h-7 text-blue-600" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                        {card.description}
                      </p>

                      {/* Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium
                                   hover:bg-blue-700 transition-all duration-200
                                   shadow-[0_4px_14px_rgba(37,99,235,0.25)]
                                   hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]"
                      >
                        Tanlash
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {/* Footer note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-slate-400 text-sm mt-10"
                >
                  Professional chatbotlar biznesingiz uchun 24/7 ishlaydi
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatbotModal;
