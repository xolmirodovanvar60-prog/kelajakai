import { GraduationCap, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const SchoolFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-lg font-black">Maktab 40</div>
                <div className="text-xs text-blue-200">Jomboy tumani</div>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Sifatli ta'lim va porloq kelajak uchun eng yaxshi tanlov
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Maktab haqida
                </a>
              </li>
              <li>
                <a href="#academics" className="text-blue-200 hover:text-white transition-colors text-sm">
                  O'quv bo'limi
                </a>
              </li>
              <li>
                <a href="#admission" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Qabul
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Aloqa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Aloqa</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200">Jomboy tumani, Mustaqillik ko'chasi, 40-uy</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-blue-200">+998 (66) 225-XX-XX</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-blue-200">info@maktab40.uz</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Ijtimoiy tarmoqlar</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-blue-200">
              © 2024 Jomboy tuman 40-ixtisoslashtirilgan umumta'lim maktabi. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-xs text-blue-300">
              Developed by KELAJAKAI.UZ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SchoolFooter;
