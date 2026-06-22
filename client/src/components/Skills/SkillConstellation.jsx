import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';
import SectionHeader from '../common/SectionHeader';

import { 
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPython, SiFlask, 
  SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiGit, SiDocker, SiPostman, 
  SiBootstrap, SiNextdotjs, SiSap, SiSalesforce, SiCanva, SiWhatsapp, SiAndroid 
} from 'react-icons/si';
import { FaJava, FaApple, FaCamera, FaPhoneAlt, FaSms, FaHandshake } from 'react-icons/fa';

const techLogosRow1 = [
  { node: <FaJava />, title: "Java" },
  { node: <SiPython />, title: "Python" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiReact />, title: "React.js" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiFlask />, title: "Flask" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss />, title: "CSS3" },
];

const techLogosRow2 = [
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiBootstrap />, title: "Bootstrap" },
  { node: <SiGit />, title: "Git" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiPostman />, title: "Postman" },
  { node: <SiSap />, title: "SAP UI5" },
  { node: <SiSalesforce />, title: "SAP BTP" },
];

const techLogosRow3 = [
  { node: <span className="font-bold text-[#ea77ff] text-2xl leading-none font-sans">Pr</span>, title: "Adobe Premiere Pro" },
  { node: <span className="font-black text-2xl leading-none font-sans">CC</span>, title: "CapCut" },
  { node: <span className="font-bold text-2xl leading-none tracking-tighter font-sans">KM</span>, title: "KineMaster" },
  { node: <SiCanva />, title: "Canva" },
  { node: <span className="font-black text-2xl leading-none font-serif italic pr-1">T</span>, title: "Timbre" },
  { node: <FaCamera />, title: "DSLRs" },
  { node: <FaApple />, title: "iPhone" },
  { node: <SiAndroid />, title: "Android" },
  { node: <SiWhatsapp />, title: "WhatsApp" },
  { node: <FaPhoneAlt />, title: "Calls" },
  { node: <FaSms />, title: "SMS" },
  { node: <FaHandshake />, title: "In-Person" },
];

const SkillConstellation = () => {
  return (
    <section className="py-16 md:py-32 px-6 relative z-10" id="skills">
      <div className="max-w-6xl mx-auto">
        <SectionHeader id="skills" label="Stack" title="Technologies." index="04" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-10"
        >
          <LogoLoop
            logos={techLogosRow1}
            speed={80}
            direction="left"
            logoHeight={50}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Tech stack row 1"
          />

          <LogoLoop
            logos={techLogosRow2}
            speed={60}
            direction="right"
            logoHeight={50}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Tech stack row 2"
          />

          <LogoLoop
            logos={techLogosRow3}
            speed={70}
            direction="left"
            logoHeight={50}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Creative stack row 3"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillConstellation;
