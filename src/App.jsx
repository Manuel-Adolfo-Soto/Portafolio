import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certificates from './components/Certificates';
import GitHubStats from './components/GitHubStats';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import WhyHireMe from './components/WhyHireMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import CVModal from './components/CVModal';
import { CVModalProvider } from './context/CVModalContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CVModalProvider>
      <SplashScreen isVisible={showSplash} />
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main>
          <Hero />
          <AboutMe />
          <Skills />
          <Experience />
          <Education />
          <Certificates />
          <GitHubStats />
          <Projects />
          <Blog />
          <Testimonials />
          <WhyHireMe />
          <Contact />
        </main>
        <Footer />
        <CVModal />
      </div>
    </CVModalProvider>
  );
}
