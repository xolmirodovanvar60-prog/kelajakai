import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SchoolHeaderProps {
  isScrolled: boolean;
}

const navLinks = [
  { href: '#home', label: 'Asosiy' },
  { href: '#about', label: 'Maktab haqida' },
  { href: '#academics', label: "O'quv bo'limi" },
  { href: '#admission', label: 'Qabul' },
  { href: '#contact', label: 'Aloqa' },
];

const SchoolHeader = ({ isScrolled }: SchoolHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="hidden md:block">
                <div className={`text-xl font-black ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                  Maktab 40
                </div>
                <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-blue-200'}`}>
                  Jomboy tumani
                </div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors hover:text-amber-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant={isScrolled ? 'default' : 'outline'}
                className={`hidden md:flex items-center gap-2 ${
                  isScrolled
                    ? 'bg-blue-900 hover:bg-blue-800 text-white'
                    : 'border-2 border-white text-white hover:bg-white hover:text-blue-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Kirish
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${
                  isScrolled ? 'text-blue-900' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto">
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Kirish
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SchoolHeader;
