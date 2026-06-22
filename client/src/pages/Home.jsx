import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '../components/Landing/BootSequence';
import Hero from '../components/Landing/Hero';
import Education from '../components/Education/Education';
import About from '../components/About/About';
import ProjectCards from '../components/Projects/ProjectCards';
import SkillConstellation from '../components/Skills/SkillConstellation';
import MediaShowcase from '../components/Media/MediaShowcase';
import ExperienceTimeline from '../components/Experience/ExperienceTimeline';
import Hobbies from '../components/Hobbies/Hobbies';
import ContactForm from '../components/Contact/ContactForm';
import ProgressiveNav from '../components/common/ProgressiveNav';
import { NavProvider, useNav } from '../components/common/NavContext';
import MediaHero from '../components/Media/MediaHero';

const getProfMessages = () => {
  let netInfo = "SECURE_WLAN";
  // Browsers block reading actual WiFi SSIDs for privacy, so we read the connection API instead
  if (typeof navigator !== 'undefined' && navigator.connection) {
    const type = navigator.connection.type || navigator.connection.effectiveType || 'WIFI';
    const speed = navigator.connection.downlink ? ` @ ${navigator.connection.downlink}Mbps` : '';
    netInfo = `${type.toUpperCase()}${speed}`;
  }

  return [
    { text: "> initializing core systems...", delay: 1000 },
    { text: "> analyzing network interface...", delay: 1200 },
    { text: `> connection established via ${netInfo}`, delay: 1500 },
    { text: "> extracting data from chethan's brain...", delay: 2500 },
    { text: "> collecting his data from school, college reports...", delay: 2500 },
    { text: "> checking where he is current working...", delay: 2500 },
    { text: "> system ready", delay: 1000 }
  ];
};

const mediaMessages = [
  { text: "> contacting linkedin ceo for accessing his id...", delay: 2500 },
  { text: "> dailing sundar pichai on 87xx57xx14 to collect his google data across all platforms...", delay: 3000 },
  { text: "> contacting ex...", delay: 1500, error: true, errorText: " failed" },
  { text: "> trying to connect to chethan's X account....", delay: 2500 },
  { text: "> calling zuck baba to allow us to access his instagram...", delay: 2500 },
  { text: "> media access granted", delay: 1000 }
];

const MainContent = ({ data }) => {
  const { viewMode } = useNav();
  const [activeBoot, setActiveBoot] = useState(null);
  const prevViewMode = useRef(viewMode);
  const [profMsgs] = useState(() => getProfMessages());

  useEffect(() => {
    if (prevViewMode.current !== viewMode) {
      if (viewMode === 'media') {
        setActiveBoot('media');
      } else if (viewMode === 'professional') {
        setActiveBoot('professional');
      }
      prevViewMode.current = viewMode;
    }
  }, [viewMode]);

  return (
    <>
      <ProgressiveNav />
      
      {activeBoot === 'media' && (
        <BootSequence 
          messages={mediaMessages} 
          onComplete={() => setActiveBoot(null)} 
        />
      )}
      
      {activeBoot === 'professional' && (
        <BootSequence 
          messages={profMsgs} 
          onComplete={() => setActiveBoot(null)} 
        />
      )}

      <AnimatePresence mode="wait">
        {viewMode === 'professional' ? (
          <motion.div 
            key="professional"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fade-in-content overflow-x-hidden"
          >
            <Hero data={data.settings} />
            <Education education={data.education} />
            <div id="about">
              <About data={data.about} />
            </div>
            <ProjectCards projects={data.projects} />
            <SkillConstellation />
            <div id="experience">
              <ExperienceTimeline experience={data.experience} />
            </div>
            <Hobbies hobbies={data.hobbies} />
            <div id="contact">
              <ContactForm />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="media"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fade-in-content overflow-x-hidden"
          >
            <MediaHero />
            <MediaShowcase mediaAccounts={data.media} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Home = () => {
  const [booting, setBooting] = useState(true);
  const [profMsgs] = useState(() => getProfMessages());
  const [data, setData] = useState({
    settings: null,
    about: null,
    projects: [],
    skills: [],
    experience: [],
    education: [],
    hobbies: [],
    media: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settings, about, projects, skills, experience, education, hobbies, media] = await Promise.all([
          axios.get('http://localhost:5000/api/settings'),
          axios.get('http://localhost:5000/api/about'),
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/skills'),
          axios.get('http://localhost:5000/api/experience'),
          axios.get('http://localhost:5000/api/education'),
          axios.get('http://localhost:5000/api/hobbies'),
          axios.get('http://localhost:5000/api/media')
        ]);

        setData({
          settings: settings.data,
          about: about.data,
          projects: projects.data,
          skills: skills.data,
          experience: experience.data,
          education: education.data,
          hobbies: hobbies.data,
          media: media.data
        });
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/20">
      {booting ? (
        <BootSequence messages={profMsgs} onComplete={() => setBooting(false)} />
      ) : (
        <NavProvider>
          <MainContent data={data} />
        </NavProvider>
      )}
    </div>
  );
};

export default Home;
