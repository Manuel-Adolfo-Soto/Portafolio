import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Testimonials from './components/Testimonials';
import WhyHireMe from './components/WhyHireMe';
import Services from './components/Services';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CinematicSplash from './components/CinematicSplash';
import BackToTop from './components/BackToTop';
import CertificatesButton from './components/CertificatesButton';
import DotNav from './components/DotNav';
import CVModal from './components/CVModal';

import { CVModalProvider } from './context/CVModalContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <CVModalProvider>
        <CinematicSplash isVisible={showSplash} onFinish={() => setShowSplash(false)} onSkip={() => setShowSplash(false)} />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <DotNav />
          <main>
            <Hero />
            <Experience />
            <Achievements />
            <Projects />
            <Skills />
            <AboutMe />
            <Education />
            <Certificates />
            <Testimonials />
            <WhyHireMe />
            <Services />
            <Blog />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
          <CertificatesButton />
          <CVModal />
        </div>
      </CVModalProvider>
    </ThemeProvider>
  );
}
