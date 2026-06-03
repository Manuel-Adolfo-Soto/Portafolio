import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import WhyHireMe from './components/WhyHireMe';
import Services from './components/Services';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import DotNav from './components/DotNav';
import CVModal from './components/CVModal';

import { CVModalProvider } from './context/CVModalContext';

export default function App() {
  return (
    <CVModalProvider>
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
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
            <Testimonials />
            <WhyHireMe />
            <Services />
            <Blog />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
          <CVModal />
        </div>
      </CVModalProvider>
  );
}
