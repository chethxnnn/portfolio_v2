import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const Highlight = ({ children }) => (
  <span className="inline-block font-sans font-black text-white text-xl md:text-4xl tracking-tighter uppercase mx-1 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-default origin-bottom">
    {children}
  </span>
);

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 md:py-32 px-6 relative z-10" id="about">
      <div className="max-w-4xl mx-auto">
        <SectionHeader id="about" label="About" title="The Story." index="02" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto mt-20 space-y-24"
        >
          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-left md:pr-32">
            हाँ, मैं वोही हूँ। The kid who's been saying <Highlight>main engineer banunga</Highlight> since <Highlight>20th April, 2004</Highlight> literally birth se declaration. Every school diary, that one field AIM always had the same answer. No confusion, <Highlight>no backup plan</Highlight>. Just blind faith and a gel pen.
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-right md:pl-32">
            Growing up, computers weren't just interesting they were <Highlight>an obsession</Highlight>. I was that kid who figured out <Highlight>WiFi passwords</Highlight> using WPA/WPS testers before figuring out algebra. <Highlight>Lucky Patcher?</Highlight> My best friend. <Highlight>Mod APKs?</Highlight> Downloaded every single one because why pay for an app when you can explore the cracked version and call it <Highlight>learning</Highlight>. And yes, I was proudly the <Highlight>first person</Highlight> in my entire school to create an email ID. The flex was unreal. LOL.
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-left md:pr-32">
            Cut to around 2015 I started my <Highlight>YouTube channel</Highlight>. The editor of choice? <Highlight>Kinemaster</Highlight> the OG, the GOAT, the only option. I was mixing songs, uploading them, feeling like a full-blown <Highlight>content creator</Highlight>... and then getting <Highlight>copyright strikes</Highlight> left and right. Tab toh reason bhi nahi pata hota tha ki kyu aa rahe hain strikes. LOL. But that chaos? That was my first taste of <Highlight>creating something</Highlight> and putting it out into the world.
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-right md:pl-32">
            Completed my 10th grade as <Highlight>School Captain</Highlight>, scored <Highlight>86% in CBSE</Highlight>, and thought okay, <Highlight>next stop, IIT</Highlight>. फिर वोही कहानी <Highlight>IITian बनने का सपना</Highlight>।
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-left md:pr-32">
            Got into Deeksha Coaching at Jnana Sweekar, ready to grind. And then... <Highlight>COVID-19</Highlight> happened. 1.5 years of <Highlight>online coaching</Highlight>. IYKYK you know exactly what happened in those online classes. <Highlight>Screen on, camera off</Highlight>, mic muted, soul departed. That's probably the honest reason JEE didn't work out. Hahaha. XD. But hey scored <Highlight>96% in 12th</Highlight>, so the brain was there, the WiFi just wasn't cooperating with destiny.
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-right md:pl-32">
            Then began the real chapter <Highlight>Engineering</Highlight>. <Highlight>CSE at DSATM</Highlight>. <Highlight>Bada samandar</Highlight>. First time walking into that campus, it hit me iss samandar mein bohot machhliyaan hain, sharing the same water. <Highlight>Everyone's talented</Highlight>, everyone's hustling, and suddenly you're not the smartest person in the room anymore. That was <Highlight>humbling</Highlight>. And that was <Highlight>fuel</Highlight>.
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-left md:pr-32">
            <Highlight>Topped the 1st semester</Highlight>. Participated in <Highlight>hackathons</Highlight> the 36-hour, no-sleep, energy-drink-fueled kind. Volunteered across events, joined clubs, <Highlight>built things, broke things, shipped things</Highlight>. Four years of chaos, code, caffeine, and growth secured an overall <Highlight>CGPA of 9.01</Highlight> and <Highlight>graduated in 2026</Highlight>. Haash. <Highlight>VTU, namaste</Highlight>. 🙏
          </p>

          <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-right md:pl-32">
            And then, <Highlight>placement season</Highlight> the <Highlight>final boss level</Highlight>. Walked in, gave it everything, and walked out placed at a <Highlight>Big 4</Highlight> <Highlight>KPMG India</Highlight>, as a <Highlight>TE SAP Intern</Highlight>.
          </p>
          

          {data.resumeUrl && (
            <div className="flex justify-center md:justify-end mt-12">
              <a 
                href={data.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Resume
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
              </a>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default About;
