import React, { useState } from 'react';
// Importamos los módulos necesarios de React Router
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom';
// Importamos los íconos de Lucide
import { Menu, X, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const RANDOM_BGS = [
  "url('/bg-davinci.png')",
  "url('/bg-manos.png')",
  "url('/bg-pillar.png')",
  "url('/bg-venus.png')"
];

const useRandomBg = () => {
  return React.useMemo(() => RANDOM_BGS[Math.floor(Math.random() * RANDOM_BGS.length)], []);
};

// --- COMPONENTS ---

// Componente de Navegación (Header)
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLang = (e) => i18n.changeLanguage(e.target.value);

  const navLinks = (
    <>
      <NavLink
        to="/"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base tracking-wide
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b border-[#4A4A4A]' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.home')}
      </NavLink>
      <NavLink
        to="/mission"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base tracking-wide
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b border-[#4A4A4A]' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.mission')}
      </NavLink>
      <NavLink
        to="/activites"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base tracking-wide
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b border-[#4A4A4A]' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.activities')}
      </NavLink>
      <NavLink
        to="/contact"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `py-2 px-6 rounded-none border transition duration-300 mt-2 md:mt-0 text-lg md:text-base font-serif italic
          ${isActive
            ? 'font-medium text-white bg-[#4A4A4A] shadow-md border-[#4A4A4A]'
            : 'text-[#4A4A4A] border-[#6E6E6E] hover:bg-[#F5F3EE]'}`
        }
      >
        {t('nav.contact')}
      </NavLink>
    </>
  );

  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white shadow-sm border-b border-[#E5E5E5] fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <NavLink to="/" className="text-xl font-semibold text-[#4A4A4A] hover:text-[#000] transition duration-200 flex items-center">
          {!logoError ? (
            <img
              src="/logo-laisvg.svg"
              alt="LAI"
              className="w-12 h-12 md:w-14 md:h-14 object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4A4A4A] text-white flex items-center justify-center text-lg font-serif italic rounded-sm">LAI</div>
          )}
        </NavLink>
      </div>

      {/* Navegación Desktop */}
      <nav className="hidden md:flex space-x-8 items-center">
        {navLinks}
        <select onChange={changeLang} defaultValue={i18n.language} className="ml-4 bg-transparent border-b border-[#6E6E6E] text-[#4A4A4A] font-serif px-2 py-1 text-sm outline-none hover:border-[#4A4A4A]">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="it">IT</option>
          <option value="es">ES</option>
        </select>
      </nav>

      {/* Menú Móvil - Botón */}
      <button
        className="md:hidden text-[#4A4A4A] p-2 hover:bg-[#F5F3EE] transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú Móvil - Overlay */}
      <div
        className={`fixed inset-0 top-[72px] bg-white transition-transform duration-300 ease-in-out z-40 md:hidden border-t border-[#E5E5E5]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col p-8 space-y-6">
          {navLinks}
          <div className="pt-6 border-t border-[#E5E5E5]">
            <select onChange={changeLang} defaultValue={i18n.language} className="bg-transparent border-b border-[#6E6E6E] text-[#4A4A4A] font-serif px-2 py-1 text-lg outline-none w-24">
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="it">IT</option>
              <option value="es">ES</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Componente Footer
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-12 mt-auto border-t border-[#E5E5E5] bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-no-repeat bg-right-bottom" style={{ backgroundImage: "url('/bg-pillar.png')" }}></div>
      <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
        <img src="/logo-laisvg.svg" alt="LAI" className="w-10 h-10 mx-auto mb-6 opacity-30 grayscale" />
        <p className="font-serif italic text-[#6E6E6E] tracking-wider mb-2">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p className="text-sm text-[#A0A0A0] font-light">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
}

// --- LAYOUT ---

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col pt-[73px] font-sans antialiased text-[#4A4A4A]">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- PAGES ---

// Home Page
function Home() {
  const { t } = useTranslation();
  const valuesRaw = t('values_list', { returnObjects: true });
  const activitiesRaw = t('activities', { returnObjects: true });
  const values = Array.isArray(valuesRaw) ? valuesRaw : Object.values(valuesRaw || {});
  const activities = Array.isArray(activitiesRaw) ? activitiesRaw : Object.values(activitiesRaw || {});

  return (
    <motion.div initial="hidden" animate="visible" className="bg-[#FBFAF7] text-gray-900 font-sans relative overflow-hidden flex-grow flex flex-col">
      {/* Background art reference */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-[800px] h-[800px] bg-no-repeat bg-right-top bg-contain" style={{ backgroundImage: "url('/bg-davinci.png')" }}></div>

      {/* HERO SECTION */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center text-center z-10">
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          src="/logo-laisvg.svg" alt="LAI" className="w-28 h-28 md:w-44 md:h-44 mb-8 object-contain" 
        />
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-7xl font-serif font-medium tracking-wider text-[#4A4A4A] mb-6 flex items-center gap-4 justify-center"
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p 
          variants={fadeIn}
          className="max-w-2xl text-lg md:text-2xl text-[#6E6E6E] font-light italic"
        >
          {t('hero.subtitle')}
        </motion.p>
      </section>

      {/* ABOUT */}
      <section className="relative px-8 md:px-24 py-24 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif font-medium tracking-wide text-[#4A4A4A] mb-8">{t('about.title')}</h2>
          <p className="text-[#6E6E6E] leading-relaxed text-lg first-letter:text-7xl first-letter:font-serif first-letter:text-[#4A4A4A] first-letter:float-left first-letter:mr-3 first-letter:leading-none">{t('about.text')}</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn} className="relative bg-white p-12 shadow-sm border border-[#E5E5E5]">
           {/* Decor */}
           <div className="absolute top-2 left-6 text-[#E5E5E5] opacity-50 text-8xl font-serif leading-none">"</div>
          <p className="text-[#4A4A4A] font-serif text-2xl italic font-medium relative z-10 leading-relaxed text-center">{t('quote')}</p>
           <div className="absolute bottom-[-1rem] right-6 text-[#E5E5E5] opacity-50 text-8xl font-serif leading-none rotate-180">"</div>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="relative px-8 md:px-24 py-24 bg-[#FBFAF7] border-y border-[#E5E5E5] z-10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-full h-full bg-no-repeat bg-center bg-cover fixed" style={{ backgroundImage: "url('/bg-manos.png')" }}></div>
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-4xl font-serif font-medium tracking-wide text-[#4A4A4A] text-center mb-16 relative z-10"
        >
          {t('values')}
        </motion.h2>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        >
          {values.map((v) => (
            <motion.div key={v} variants={fadeIn} className="p-6 border border-[#E5E5E5] rounded-xl text-center bg-white shadow-sm hover:shadow-lg transition duration-200">
              <p className="font-serif text-xl tracking-wide italic text-[#4A4A4A]">{v}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MISSION Preview on Home */}
      <section className="px-8 md:px-24 py-24 max-w-7xl mx-auto z-10 relative">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-full h-full bg-no-repeat bg-left-bottom bg-contain" style={{ backgroundImage: "url('/bg-pillar.png')" }}></div>
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-4xl font-serif font-medium tracking-wide text-[#4A4A4A] mb-8 text-center"
        >
          {t('mission_preview.title')}
        </motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center relative z-10">
            <p className="text-[#6E6E6E] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">{t('mission_preview.text')}</p>
            <NavLink to="/mission" className="inline-flex items-center gap-2 mt-4 text-[#4A4A4A] font-serif uppercase tracking-widest text-sm border-b border-[#4A4A4A] hover:text-[#000] hover:border-[#000] transition-colors pb-1">
                {t('mission_preview.read_more')} <ArrowRight size={16} />
            </NavLink>
        </motion.div>
      </section>

      {/* ACTIVITIES */}
      <section className="px-8 md:px-24 py-24 border-t border-[#E5E5E5] z-10 relative">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="text-4xl font-serif font-medium tracking-wide text-[#4A4A4A] text-center mb-16"
        >
          {t('activities_title')}
        </motion.h2>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {activities.map((a) => (
            <motion.div key={a.title} variants={fadeIn} className="p-6 bg-white rounded-xl shadow-sm border border-[#E5E5E5] hover:border-[#4A4A4A] hover:shadow-lg transition duration-200">
              <h3 className="text-2xl font-serif font-medium text-[#4A4A4A] mb-4 mt-2">{a.title}</h3>
              <p className="text-[#6E6E6E] font-light leading-relaxed">{a.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}

// Mission Page
function Mission() {
  const { t } = useTranslation();
  const bgImage = useRandomBg();

  return (
    <motion.section 
      initial="hidden" animate="visible" variants={fadeIn}
      className="px-8 md:px-24 py-24 max-w-4xl mx-auto min-h-[60vh] relative flex-grow"
    >
      <div className="absolute top-0 right-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-[600px] h-[600px] bg-no-repeat bg-right-top bg-contain" style={{ backgroundImage: bgImage }}></div>
      
      <h1 className="text-6xl font-serif font-medium tracking-wide text-[#4A4A4A] mb-16 border-b border-[#E5E5E5] pb-8 relative z-10">{t('mission.title')}</h1>
      
      <div className="space-y-12 text-[#6E6E6E] text-lg relative z-10">
        <p className="leading-relaxed text-xl first-letter:text-8xl first-letter:font-serif first-letter:text-[#4A4A4A] first-letter:float-left first-letter:mr-6 first-letter:leading-none">
          {t('mission.p1')}
        </p>
        
        <h2 className="text-4xl font-serif font-medium text-[#4A4A4A] pt-12 border-t border-[#E5E5E5] mb-8">{t('mission.objectives_title')}</h2>
        <ul className="space-y-10">
          <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative pl-8 border-l border-[#4A4A4A]">
            <h3 className="font-serif text-2xl text-[#4A4A4A] mb-3 italic">{t('mission.objective1_title')}</h3>
            <p className="text-[#6E6E6E] leading-relaxed">{t('mission.objective1_text')}</p>
          </motion.li>
          
          <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative pl-8 border-l border-[#4A4A4A]">
            <h3 className="font-serif text-2xl text-[#4A4A4A] mb-3 italic">{t('mission.objective2_title')}</h3>
            <p className="text-[#6E6E6E] leading-relaxed">{t('mission.objective2_text')}</p>
          </motion.li>
          
          <motion.li initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative pl-8 border-l border-[#4A4A4A]">
            <h3 className="font-serif text-2xl text-[#4A4A4A] mb-3 italic">{t('mission.objective3_title')}</h3>
            <p className="text-[#6E6E6E] leading-relaxed">{t('mission.objective3_text')}</p>
          </motion.li>
        </ul>
      </div>
    </motion.section>
  );
}

// Activities Page
function Activities() {
  const { t } = useTranslation();
  const activityListRaw = t('activities', { returnObjects: true });
  const activityList = Array.isArray(activityListRaw) ? activityListRaw : Object.values(activityListRaw || {});
  const bgImage = useRandomBg();

  return (
    <motion.section 
      initial="hidden" animate="visible" variants={fadeIn}
      className="px-8 md:px-24 py-24 max-w-5xl mx-auto min-h-[60vh] relative flex-grow"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-full h-[80vh] bg-no-repeat bg-center bg-cover fixed" style={{ backgroundImage: bgImage }}></div>
      
      <h1 className="text-6xl font-serif font-medium tracking-wide text-[#4A4A4A] mb-16 border-b border-[#E5E5E5] pb-8 relative z-10">{t('activities_title')}</h1>
      
      <div className="space-y-12 relative z-10">
        {activityList.map((activity, index) => (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
            key={index} 
            className="p-8 md:p-10 bg-white rounded-xl shadow-md border-l-4 border-[#4A4A4A] hover:shadow-xl transition duration-300"
          >
            {activity.tag && <span className="inline-block text-sm uppercase tracking-widest font-sans font-light text-[#A0A0A0] mb-4">{activity.tag}</span>}
            <h2 className="text-4xl font-serif font-medium text-[#4A4A4A] mb-6">{activity.title}</h2>
            <p className="text-[#6E6E6E] leading-relaxed text-lg">{activity.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Contact Page
function Contact() {
  const { t } = useTranslation();
  const bgImage = useRandomBg();

  return (
    <motion.section 
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }}
      className="px-8 md:px-24 py-24 max-w-5xl mx-auto text-center min-h-[60vh] flex-grow flex flex-col justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply w-full h-[80vh] bg-no-repeat bg-center bg-cover fixed" style={{ backgroundImage: bgImage }}></div>
      <div className="relative z-10 w-full">
        <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-wide text-[#4A4A4A] mb-8">{t('contact.title')}</h1>
        <p className="text-[#6E6E6E] mb-16 text-xl max-w-2xl mx-auto font-light">{t('contact.text')}</p>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <ContactCard icon={Mail} title={t('contact.email')} content="linguaeartiditalia@gmail.com" type="link" link="mailto:linguaeartiditalia@gmail.com" />
          <ContactCard icon={MapPin} title={t('contact.address')} content="Bruxelles, Belgique" type="text" />
          <ContactCard icon={Phone} title={t('contact.phone_donatella')} content="+32 472 591764" type="phone" link="tel:+32472591764" />
          <ContactCard icon={Phone} title={t('contact.phone_elina')} content="+32 470 126045" type="phone" link="tel:+32470126045" />
        </div>
      </div>
    </motion.section>
  );
}

const ContactCard = ({ icon: Icon, title, content, type, link }) => (
  <motion.div 
    whileHover={{ y: -5 }} transition={{ duration: 0.3 }}
    className="p-10 bg-[#FBFAF7] border border-[#E5E5E5] text-left hover:shadow-lg hover:border-[#4A4A4A] transition-all duration-300"
  >
    <div className="flex items-center text-[#4A4A4A] mb-6 pb-4 border-b border-[#E5E5E5]">
      <Icon size={28} className="mr-4 text-[#A0A0A0]" strokeWidth={1} />
      <h3 className="text-2xl font-serif font-medium">{title}</h3>
    </div>
    {type === 'link' || type === 'phone' ? (
      <a href={link} className="text-[#6E6E6E] hover:text-[#000] transition font-medium text-lg border-b border-transparent hover:border-[#000] pb-1">
        {content}
      </a>
    ) : (
      <p className="text-[#6E6E6E] text-lg">{content}</p>
    )}
  </motion.div>
);

// --- APP ROUTER ---
export default function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#4A4A4A] selection:text-white flex flex-col">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="mission" element={<Mission />} />
            <Route path="activites" element={<Activities />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={
              <div className="py-24 text-center flex-grow flex flex-col justify-center items-center">
                <h1 className="text-8xl md:text-[150px] font-serif text-[#F5F3EE] font-bold tracking-widest drop-shadow-sm">404</h1>
                  <p className="text-2xl text-[#6E6E6E] -mt-10 font-serif italic tracking-wide relative z-10">{t('page.not_found')}</p>
                  <NavLink to="/" className="mt-12 text-lg text-[#4A4A4A] font-medium border-b border-[#4A4A4A] hover:border-[#000] transition pb-1">
                      {t('page.back_home')}
                  </NavLink>
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
