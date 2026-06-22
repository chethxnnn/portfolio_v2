const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models
const Admin = require('./models/Admin');
const About = require('./models/About');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const SiteSettings = require('./models/SiteSettings');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await About.deleteMany();
    await Experience.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await SiteSettings.deleteMany();

    // 1. Admin
    await Admin.create({
      username: 'admin',
      passwordHash: 'admin123' // Will be hashed by pre-save hook
    });

    // 2. Site Settings
    await SiteSettings.create({
      seoTitle: 'Chethan P | Portfolio',
      seoDesc: 'Computer Science undergraduate & Full Stack / AI Developer',
      heroTagline: 'Chethan P',
      heroSubtitle: 'frontend_developer.exe running...\\nAI & Full Stack Enthusiast.',
    });

    // 3. About
    await About.create({
      bio: 'Computer Science undergraduate with a genuine interest in Artificial Intelligence and what becomes possible when AI is applied thoughtfully to real problems. Prefers learning by building, working through the architecture, the failures, and the reasoning behind every decision rather than assembling things without understanding them. Comfortable across the full stack, and increasingly focused on how intelligent systems can be designed, integrated, and made useful in production environments.',
      education: [
        {
          school: 'Dayananda Sagar Academy of Technology and Management',
          year: 'Jun 2022 – 2026',
          location: 'Bangalore, Karnataka',
          degree: 'B.E – Computer Science and Engineering | CGPA: 9.01'
        },
        {
          school: 'Jnana Sweekar PU College',
          year: 'Sep 2020 – 2022',
          location: 'Bangalore, Karnataka',
          degree: '2nd PUC – Physics, Chemistry, Mathematics | Percentage: 96%'
        }
      ],
      socialLinks: {
        github: 'https://github.com/chethxnnn',
        linkedin: 'https://linkedin.com/in/chethxnnn',
        email: 'chethanseervi2004@gmail.com'
      }
    });

    // 4. Experience
    await Experience.create([
      {
        company: 'KPMG India',
        role: 'Technology Enablement – SAP Intern',
        startDate: 'Jan 2026',
        endDate: 'Present',
        description: 'Business Process Automation (BPA), ABAP, RAP & SAP UI5 Fiori. Contributed as backend developer on AI-Powered SAP Assistant (Flask/FAISS/Next.js) and as Frontend Developer for FIEM Industries supplier portal (React.js/Node.js).',
        techStack: ['SAP BPA', 'ABAP', 'SAP UI5', 'Flask', 'Next.js', 'React.js', 'Node.js'],
        order: 1
      },
      {
        company: 'Varcons Technologies',
        role: 'Full Stack Web Development Intern',
        startDate: 'May 2024',
        endDate: 'Jul 2024',
        description: 'Developed web template for Azayd IT Consulting Services. Designed and integrated a MySQL database. Collaborated on full-stack development implementing frontend and backend features.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
        order: 2
      }
    ]);

    await Project.create([
      {
        title: 'BillDost',
        description: 'An advanced web application for billing and invoicing. Designed for businesses to streamline their accounting processes.',
        shortDesc: 'Advanced web application for billing and invoicing',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
        liveUrl: 'http://billdost.in',
        githubUrl: 'https://github.com/chethxnnn/BillDost-Landing-Page.git',
        status: 'Ongoing',
        projectType: 'Personal',
        order: 1,
        featured: true
      },
      {
        title: 'FrustoChat',
        description: 'A real-time chat application with a seamless user interface. Focuses on low latency messaging and clean aesthetic design.',
        shortDesc: 'Real-time chat application with seamless UI',
        techStack: ['Next.js', 'Socket.io', 'TailwindCSS', 'Node.js'],
        liveUrl: 'https://frusto-chat.vercel.app/',
        githubUrl: 'https://github.com/chethxnnn/FrustoChat.git',
        status: 'Completed',
        projectType: 'Personal',
        order: 2,
        featured: true
      },
      {
        title: 'ProfileForge',
        description: 'A dynamic portfolio generator that allows users to quickly forge professional online presences with customizable templates.',
        shortDesc: 'Dynamic portfolio generator for professionals',
        techStack: ['React', 'Vercel', 'TailwindCSS'],
        liveUrl: 'https://profile-forge.vercel.app',
        githubUrl: 'https://github.com/chethxnnn/ProfileForge',
        status: 'Completed',
        projectType: 'Personal',
        order: 3,
        featured: false
      },
      {
        title: 'MateUp: Roommate Finding Platform',
        description: 'Built a web platform for students to find compatible roommates using optimized matching algorithms. Implemented secure REST APIs with session-based authentication. Used EJS for dynamic server-side rendering.',
        shortDesc: 'Platform for students to find compatible roommates',
        techStack: ['Node.js', 'Express.js', 'MySQL', 'EJS', 'Bootstrap'],
        liveUrl: 'https://mateup-jurj.onrender.com',
        githubUrl: 'https://github.com/chethxnnn/MateUp',
        status: 'Completed',
        projectType: 'College',
        order: 4,
        featured: true
      },
      {
        title: 'EcoScore: Sustainable Lifestyle Rating',
        description: 'Built an ML-based platform predicting sustainable lifestyle ratings with personalized insights. Preprocessed and trained a Random Forest model. Developed a Flask-powered backend integrating a chatbot API.',
        shortDesc: 'ML platform predicting sustainable lifestyle ratings',
        techStack: ['Python', 'Flask', 'Machine Learning', 'Random Forest'],
        githubUrl: 'https://github.com/chethxnnn/EcoScore',
        status: 'Completed',
        projectType: 'College',
        order: 5,
        featured: false
      },
      {
        title: 'Virtual Assistant',
        description: 'An AI-powered virtual assistant capable of understanding natural language commands, fetching information, and automating desktop tasks.',
        shortDesc: 'AI-powered virtual assistant for task automation',
        techStack: ['Python', 'SpeechRecognition', 'NLP', 'APIs'],
        githubUrl: 'https://github.com/chethxnnn/Vitual-Assisstant',
        status: 'Completed',
        projectType: 'College',
        order: 6,
        featured: false
      },
      {
        title: 'Timetable Generator',
        description: 'Built a Java-based timetable automation system that schedules classes dynamically by considering room availability, teacher schedules, and course constraints.',
        shortDesc: 'Java-based timetable automation system',
        techStack: ['Java', 'Algorithms'],
        githubUrl: 'https://github.com/chethxnnn/Timetable-Generator',
        status: 'Completed',
        projectType: 'College',
        order: 7,
        featured: false
      }
    ]);

    // 6. Skills
    const skillsToInsert = [
      { name: 'Java', category: 'Programming', proficiency: 90 },
      { name: 'Python', category: 'Programming', proficiency: 85 },
      { name: 'SAP AI Core', category: 'SAP Tech', proficiency: 80 },
      { name: 'SAP UI5 Fiori', category: 'SAP Tech', proficiency: 85 },
      { name: 'React.js', category: 'Web Tech', proficiency: 90 },
      { name: 'Node.js', category: 'Web Tech', proficiency: 85 },
      { name: 'MongoDB', category: 'Databases', proficiency: 85 },
      { name: 'Vector Embeddings', category: 'AI/ML', proficiency: 80 }
    ];
    await Skill.create(skillsToInsert);

    console.log('Data Seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
