const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Education = require('./models/Education');
const Hobby = require('./models/Hobby');
const MediaAccount = require('./models/MediaAccount');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/living-terminal-portfolio');

const seedData = async () => {
  try {
    await Education.deleteMany();
    await Hobby.deleteMany();
    await MediaAccount.deleteMany();

    await Education.create([
      {
        name: "Dayananda Sagar Academy of Technology & Management",
        degree: "B.E in Computer Science Engineering",
        year: "2022 - 2026",
        score: "9.01 CGPA",
        expandedDetails: [
          "Completed my undergraduate degree with a focus on core computer science subjects.",
          "Actively participating in hackathons and technical events."
        ],
        order: 0
      },
      {
        name: "Jnana Sweekar PU College",
        degree: "Pre-University",
        year: "2020 - 2022",
        score: "96%",
        expandedDetails: [
          "Completed my pre-university education with a focus on Physics, Chemistry, Mathematics, and Computer Science.",
          "Secured distinction and built a strong foundation for engineering."
        ],
        order: 1
      },
      {
        name: "Sanmarg Central School",
        degree: "10th Grade",
        year: "2010 - 2020",
        score: "86%",
        expandedDetails: [
          "Completed my primary and secondary education.",
          "Was elected as School Captain.",
          "Participated in various cultural and sports activities."
        ],
        order: 2
      }
    ]);

    await Hobby.create([
      {
        title: "EDITING\n& CONTENT",
        icon: "🎬",
        desc: "Almost a decade in the game — 10+ years of photo and video editing, and still going. Started back in 2015 on Kinemaster (the OG, respect), moved to CapCut, and now leveling up with Adobe Premiere Pro. Song mixing, video mashups, audio sampling on Timbre, poster design on Canva — if it involves a timeline, a layer, or a beat drop, I've probably already touched it.",
        tools: "Tools: KineMaster · CapCut · Canva · Timbre · Adobe Premiere Pro",
        order: 0
      },
      {
        title: "SHOOTING",
        icon: "📸",
        desc: "Borderline addicted to clicking pictures — just not of myself. People, places, golden hours, chaotic streets, quiet corners. I don't just take photos, I capture memories. Hand me a phone, a DSLR, or honestly anything with a lens — and I'll find a frame worth keeping.",
        tools: "Gear: iPhone · Android · DSLRs — whatever shoots, shoots.",
        order: 1
      },
      {
        title: "CONTENT\nCREATION",
        icon: "🎥",
        desc: "Started my YouTube journey back in 2017 — tech videos, gaming content, song remixes, entertainment, traditional and musical videos, you name it. Over the years, it evolved into content writing, scripting, direction, social media strategy, and typography edits.\n\nThe numbers? 15,000+ followers across platforms. Multiple videos crossing 500K+ views, and a few that hit 1M+. Not viral fame — just consistent, honest creating.",
        tools: "Platforms: Instagram · YouTube · LinkedIn · X",
        order: 2
      },
      {
        title: "TALKING",
        icon: "🗣️",
        desc: "I don't need a reason to talk. Don't need a place, don't need a crowd. Just one person willing to listen — that's enough. Fair warning though: once I start, there's very little chance you're getting a word in. *But yeah — vibe matters.* If the vibe is right, the conversation never ends.",
        tools: "sms, whatsapp, calls, in-perosn, text",
        order: 3
      },
      {
        title: "BUILDING\nSTUFFS",
        icon: "🛠️",
        desc: "Sometimes I just sit down and vibe-code things from scratch. No brief, no deadline — just a random idea that won't leave my head until I turn it into something that works. Brainstorming concepts into real, functional solutions and watching them come alive? That's the kick. That's the whole point.",
        tools: "Tools: Claude · ChatGPT · Gemini · DeepSeek · Cursor · Kiwi · Stitch · Antigravity",
        order: 4
      }
    ]);

    await MediaAccount.create([
      {
        platform: "instagram",
        name: "Apna Culturez",
        handle: "@apna.culturez",
        profileUrl: "https://instagram.com/apna.culturez",
        logoUrl: "/images/apna_culturez.png",
        description: "Welcome to Apna Culturez! A page that celebrates the rich heritage, timeless traditions, and heartfelt moments of Marwadi culture. From vibrant wedding rituals to soulful folk songs, we bring it all to life. Rooted in culture, captured with love—having done many collaborations, created memories, and covered countless weddings and traditions.",
        order: 0
      },
      {
        platform: "instagram",
        name: "Namma Culturez",
        handle: "@namma.culturez",
        profileUrl: "https://instagram.com/namma.culturez",
        logoUrl: "/images/namma_culturez.png",
        description: "A strategic expansion into the Kannada-speaking demographic. Namma Culturez is a targeted effort to capture regional engagement through curated storytelling. By localizing the viral formula, this account drives deep, sustained interaction and strengthens the overall media empire's footprint.",
        order: 1
      },
      {
        platform: "instagram",
        name: "BakBak.exe",
        handle: "@bakbak.exe",
        profileUrl: "https://instagram.com/bakbak.exe",
        logoUrl: "/images/bakbak.png",
        description: "A dedicated space for typography edits. It's a personal creative outlet where I speak whatever I want—I just edit, express, and post.",
        order: 2
      },
      {
        platform: "instagram",
        name: "dsatm.confess",
        handle: "@dsatm.confess",
        profileUrl: "https://instagram.com/dsatm.confess",
        logoUrl: "/images/dsatm.png",
        description: "An anonymous confession page where students can confess and speak out without hesitating while their privacy is strictly protected. Any topics are allowed, ensuring we keep the environment appropriate and safe.",
        order: 3
      },
      {
        platform: "youtube",
        name: "Chethan Seervi",
        handle: "@ChethanLucky",
        profileUrl: "https://www.youtube.com/@ChethanLucky",
        logoUrl: "https://unavatar.io/youtube/ChethanLucky",
        description: "The personal vault where the journey began. This channel is a chronological documentary of my creative evolution—from early days of posting gaming videos (Clash of Clans, Mini Militia, PUBG Mobile), editing song remixes, and tech tutorials, to full-blown entertainment.",
        order: 0
      },
      {
        platform: "youtube",
        name: "Apna Culturez",
        handle: "@apnaculturez",
        profileUrl: "https://youtube.com/@apnaculturez",
        logoUrl: "https://unavatar.io/youtube/apnaculturez",
        description: "Our goal is simple: to preserve and share the beauty of our culture. Join us on this journey of stories, colors, and emotions—where every moment matters and every tradition has a tale. We bring Marwadi heritage to life through deep, meaningful long-form content.",
        order: 1
      },
      {
        platform: "linkedin",
        name: "Chethan P",
        handle: "in/chethxnnn",
        profileUrl: "https://www.linkedin.com/in/chethxnnn/",
        logoUrl: "https://unavatar.io/linkedin/chethxnnn",
        description: "Focused purely on NETWORKING. It's a platform dedicated to connecting with people, exploring how things work in the corporate world, and interacting with different people and different minds to constantly expand my perspective.",
        order: 0
      },
      {
        platform: "github",
        name: "Chethan P",
        handle: "@chethxnnn",
        profileUrl: "https://github.com/chethxnnn",
        logoUrl: "https://unavatar.io/github/chethxnnn",
        description: "'Engineering walon ka Pinterest.' Beyond just hosting code, this is a curated gallery of architectural thought processes. It bridges the gap between creative design and robust technical implementation, acting as an open-source portfolio that showcases my primary full-stack applications like BillDost and MateUp, alongside other side-projects and an obsession with shipping scalable systems.",
        order: 0
      },
      {
        platform: "x",
        name: "Chethan P",
        handle: "@Chethanxlucky",
        profileUrl: "https://x.com/Chethanxlucky",
        logoUrl: "https://unavatar.io/twitter/Chethanxlucky",
        description: "The command center for raw thoughts and real-time networking. This account operates as a public notebook for tech trends, media strategy, and unfiltered commentary. It's the connective tissue between the engineering and creator personas, used primarily to interact with industry leaders, test immediate ideas, and cut through the digital noise.",
        order: 0
      }
    ]);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  }
};

seedData();
