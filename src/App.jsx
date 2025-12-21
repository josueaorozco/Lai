import React, { useState } from 'react';
// Importamos los módulos necesarios de React Router
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom';
// Importamos los íconos de Lucide
import { Menu, X, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base 
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b-2 border-current' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.home')}
      </NavLink>
      <NavLink
        to="/mission"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base 
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b-2 border-current' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.mission')}
      </NavLink>
      <NavLink
        to="/activites"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `hover:text-[#4A4A4A] transition duration-150 py-2 md:py-0 text-lg md:text-base 
          ${isActive ? 'font-medium text-[#4A4A4A] md:border-b-2 border-current' : 'text-[#6E6E6E] font-light'}`
        }
      >
        {t('nav.activities')}
      </NavLink>
      <NavLink
        to="/contact"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `py-2 px-4 rounded-full border transition duration-150 mt-2 md:mt-0 text-lg md:text-base 
          ${isActive
            ? 'font-medium text-white bg-[#4A4A4A] shadow-md'
            : 'text-[#4A4A4A] border-[#6E6E6E] hover:bg-[#F5F3EE]'}`
        }
      >
        {t('nav.contact')}
      </NavLink>
    </>
  );

  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white shadow-md fixed top-0 left-0 z-50">
      {/* Logo: tries to load /logo-lai.jpg from public/; falls back to text if missing */}
      <div className="flex items-center gap-2">
        <NavLink to="/" className="text-xl font-semibold text-[#4A4A4A] hover:text-[#000] transition duration-200 flex items-center">
          {!logoError ? (
            <img
              src="/logo-laisvg.svg"
              alt="LAI"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#4A4A4A] text-white flex items-center justify-center text-lg font-light rounded-full">LAI</div>
          )}
        </NavLink>
      </div>

      {/* Navegación Desktop */}
      <nav className="hidden md:flex space-x-6 items-center">
        {navLinks}
        <select onChange={changeLang} defaultValue={i18n.language} className="ml-2 bg-transparent border rounded px-2 py-1 text-sm">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="it">IT</option>
          <option value="es">ES</option>
        </select>
      </nav>

      {/* Menú Móvil - Botón */}
      <button
        className="md:hidden text-[#4A4A4A] p-2 rounded-lg hover:bg-[#F5F3EE] transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú Móvil - Overlay */}
      <div
        className={`fixed inset-0 top-16 bg-white transition-transform duration-300 ease-in-out z-40 md:hidden 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col p-8 space-y-6">
          {navLinks}
          <div>
            <select onChange={changeLang} defaultValue={i18n.language} className="bg-transparent border rounded px-2 py-1 text-sm">
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
    <footer className="py-8 text-center bg-[#4A4A4A] text-white text-sm mt-16">
      <div className="max-w-7xl mx-auto px-8">
        <p className="font-light tracking-wider">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p className="mt-2 text-xs text-gray-400 font-extralight">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
}

// --- LAYOUT ---

// MainLayout envuelve el contenido de las páginas con Header y Footer
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col pt-16 font-sans">
      <Header />
      
      {/* Outlet renderiza el componente de la ruta actual (Home, Mission, etc.) */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

// --- PAGES ---

// Home Page
function Home() {
  const { t } = useTranslation();
  const values = t('values_list', { returnObjects: true });
  const activities = t('activities', { returnObjects: true });

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* HERO SECTION */}
      <section className="w-full px-6 py-24 flex flex-col items-center text-center bg-[#F5F3EE]">
        <img src="/logo-laisvg.svg" alt="LAI" className="w-28 h-28 md:w-44 md:h-44 mb-6 object-contain" />
        <h1 className="text-5xl md:text-7xl font-light tracking-wider text-[#4A4A4A] mb-6 flex items-center gap-4 justify-center">
          {t('hero.title')}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-[#6E6E6E] font-light">
          {t('hero.subtitle')}
        </p>
      </section>

      {/* ABOUT */}
      <section className="px-8 md:px-24 py-20 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-light tracking-wide text-[#4A4A4A] mb-4">{t('about.title')}</h2>
          <p className="text-[#6E6E6E] leading-relaxed">{t('about.text')}</p>
        </div>
        <div className="bg-[#FBFAF7] p-8 rounded-lg shadow-inner border border-[#E5E5E5]">
          <p className="text-[#4A4A4A] italic font-light">{t('quote')}</p>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-8 md:px-24 py-20 bg-[#F5F3EE]">
        <h2 className="text-3xl font-light tracking-wide text-[#4A4A4A] text-center mb-12">{t('values')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((v) => (
            <div key={v} className="p-6 border border-[#E5E5E5] rounded-xl text-center text-[#4A4A4A] bg-white shadow-sm hover:shadow-lg transition duration-200">
              <p className="font-medium">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION Preview on Home */}
      <section className="px-8 md:px-24 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light tracking-wide text-[#4A4A4A] mb-4 text-center">{t('mission_preview.title')}</h2>
        <div className="text-center">
            <p className="text-[#6E6E6E] leading-relaxed mb-6 max-w-2xl mx-auto">{t('mission_preview.text')}</p>
            <NavLink to="/mission" className="inline-flex items-center gap-2 mt-4 text-[#4A4A4A] font-medium border-b border-[#4A4A4A] hover:border-[#6E6E6E] transition">
                {t('mission_preview.read_more')} <ArrowRight size={18} />
            </NavLink>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="px-8 md:px-24 py-20 bg-[#FBFAF7]">
        <h2 className="text-3xl font-light tracking-wide text-[#4A4A4A] text-center mb-12">{t('activities_title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {activities.map((a) => (
            <div key={a.title} className="p-6 bg-white rounded-xl shadow-sm border border-[#E5E5E5] hover:border-[#4A4A4A] hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-medium text-[#4A4A4A] mb-2">{a.title}</h3>
              <p className="text-[#6E6E6E] font-light text-sm">{a.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Mission Page
function Mission() {
  const { t } = useTranslation();
  return (
    <section className="px-8 md:px-24 py-20 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-light tracking-wide text-[#4A4A4A] mb-8 border-b pb-4">{t('mission.title')}</h1>
      
      <div className="space-y-8 text-[#6E6E6E] text-lg">
        <p className="leading-relaxed">{t('mission.p1')}</p>
        
        <h2 className="text-3xl font-medium text-[#4A4A4A] pt-4 border-t border-[#E5E5E5]">{t('mission.objectives_title')}</h2>
        <ul className="list-disc list-inside space-y-3 pl-4">
          <li className="font-medium text-[#4A4A4A]">{t('mission.objective1_title')}</li>
          <p className="ml-5 text-[#6E6E6E] text-base">{t('mission.objective1_text')}</p>
          
          <li className="font-medium text-[#4A4A4A]">{t('mission.objective2_title')}</li>
          <p className="ml-5 text-[#6E6E6E] text-base">{t('mission.objective2_text')}</p>
          
          <li className="font-medium text-[#4A4A4A]">{t('mission.objective3_title')}</li>
          <p className="ml-5 text-[#6E6E6E] text-base">{t('mission.objective3_text')}</p>
        </ul>
      </div>
    </section>
  );
}

// Activities Page
function Activities() {
  const { t } = useTranslation();
  const activityList = t('activities', { returnObjects: true });

  return (
    <section className="px-8 md:px-24 py-20 max-w-5xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-light tracking-wide text-[#4A4A4A] mb-12 border-b pb-4">{t('activities_title')}</h1>
      
      <div className="space-y-8">
        {activityList.map((activity, index) => (
          <div key={index} className="p-6 md:p-8 bg-[#F5F3EE] rounded-xl shadow-lg border-l-4 border-[#4A4A4A] hover:shadow-xl transition duration-300">
            <span className="text-sm font-medium text-[#6E6E6E] bg-white px-3 py-1 rounded-full border border-[#E5E5E5]">{activity.tag || ''}</span>
            <h2 className="text-2xl font-medium text-[#4A4A4A] mt-3 mb-2">{activity.title}</h2>
            <p className="text-[#6E6E6E] leading-relaxed">{activity.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact Page
function Contact() {
  const { t } = useTranslation();
  return (
    <section className="px-8 md:px-24 py-20 max-w-4xl mx-auto text-center min-h-[60vh]">
      <h1 className="text-4xl font-light tracking-wide text-[#4A4A4A] mb-8 border-b pb-4">{t('contact.title')}</h1>
      <p className="text-[#6E6E6E] mb-12 text-lg">{t('contact.text')}</p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        
        {/* Contact info cards */}
        <ContactCard icon={Mail} title={t('contact.email')} content="linguaeartiditalia@gmail.com" type="link" link="mailto:linguaeartiditalia@gmail.com" />
        <ContactCard icon={MapPin} title={t('contact.address')} content="Bruxelles, Belgique" type="text" />

        {/* Person 1 */}
        <ContactCard icon={Phone} title={t('contact.phone_donatella')} content="+32 472 591764" type="phone" link="tel:+32472591764" />
        {/* Person 2 */}
        <ContactCard icon={Phone} title={t('contact.phone_elina')} content="+32 470 126045" type="phone" link="tel:+32470126045" />

      </div>
    </section>
  );
}

// Componente auxiliar para la página de contacto
const ContactCard = ({ icon: Icon, title, content, type, link }) => (
  <div className="p-6 bg-[#FBFAF7] rounded-xl shadow-md border border-[#E5E5E5] text-left hover:shadow-lg transition duration-200">
    <div className="flex items-center text-[#4A4A4A] mb-3">
      <Icon size={24} className="mr-3" />
      <h3 className="text-xl font-medium">{title}</h3>
    </div>
    {type === 'link' || type === 'phone' ? (
      <a href={link} className="text-[#6E6E6E] hover:text-[#4A4A4A] transition font-medium underline-offset-4 hover:underline">
        {content}
      </a>
    ) : (
      <p className="text-[#6E6E6E]">{content}</p>
    )}
  </div>
);


// --- APP ROUTER (Centralizando las rutas) ---

// Componente principal que envuelve toda la aplicación con el Router
export default function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Rutas Index */}
            <Route index element={<Home />} />
            
            {/* Rutas de Páginas */}
            <Route path="mission" element={<Mission />} />
            <Route path="activites" element={<Activities />} />
            <Route path="contact" element={<Contact />} />

            {/* Manejo de rutas no encontradas (404) */}
            <Route path="*" element={
              <div className="py-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
                <h1 className="text-7xl md:text-9xl text-[#4A4A4A] font-bold tracking-widest">404</h1>
                  <p className="text-xl text-[#6E6E6E] mt-4 font-light tracking-wide">{t('page.not_found')}</p>
                  <NavLink to="/" className="mt-8 text-lg text-[#4A4A4A] font-medium border-b border-[#4A4A4A] hover:border-[#6E6E6E] transition">
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
