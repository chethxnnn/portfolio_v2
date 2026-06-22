const mongoose = require('mongoose');
const ATLAS_URI = 'mongodb+srv://chethanlucky3214_db_user:W9bu7iAw4O5KT9zg@cluster0.ckx4ycp.mongodb.net/?appName=Cluster0';

const storyParagraphs = [
  "हाँ, मैं वोही हूँ। The kid who's been saying main engineer banunga since 20th April, 2004 literally birth se declaration. Every school diary, that one field AIM always had the same answer. No confusion, no backup plan. Just blind faith and a gel pen.",
  "Growing up, computers weren't just interesting they were an obsession. I was that kid who figured out WiFi passwords using WPA/WPS testers before figuring out algebra. Lucky Patcher? My best friend. Mod APKs? Downloaded every single one because why pay for an app when you can explore the cracked version and call it learning. And yes, I was proudly the first person in my entire school to create an email ID. The flex was unreal. LOL.",
  "Cut to around 2015 I started my YouTube channel. The editor of choice? Kinemaster the OG, the GOAT, the only option. I was mixing songs, uploading them, feeling like a full-blown content creator... and then getting copyright strikes left and right. Tab toh reason bhi nahi pata hota tha ki kyu aa rahe hain strikes. LOL. But that chaos? That was my first taste of creating something and putting it out into the world.",
  "Completed my 10th grade as School Captain, scored 86% in CBSE, and thought okay, next stop, IIT. फिर वोही कहानी IITian बनने का सपना।",
  "Got into Deeksha Coaching at Jnana Sweekar, ready to grind. And then... COVID-19 happened. 1.5 years of online coaching. IYKYK you know exactly what happened in those online classes. Screen on, camera off, mic muted, soul departed. That's probably the honest reason JEE didn't work out. Hahaha. XD. But hey scored 96% in 12th, so the brain was there, the WiFi just wasn't cooperating with destiny.",
  "Then began the real chapter Engineering. CSE at DSATM. Bada samandar. First time walking into that campus, it hit me iss samandar mein bohot machhliyaan hain, sharing the same water. Everyone's talented, everyone's hustling, and suddenly you're not the smartest person in the room anymore. That was humbling. And that was fuel.",
  "Topped the 1st semester. Participated in hackathons the 36-hour, no-sleep, energy-drink-fueled kind. Volunteered across events, joined clubs, built things, broke things, shipped things. Four years of chaos, code, caffeine, and growth secured an overall CGPA of 9.01 and graduated in 2026. Haash. VTU, namaste. 🙏",
  "And then, placement season the final boss level. Walked in, gave it everything, and walked out placed at a Big 4 KPMG India, as a TE SAP Intern."
];

const aboutSchema = new mongoose.Schema({
  bio: { type: String },
  story: { type: [String], default: [] },
  photoUrl: { type: String },
  resumeUrl: { type: String }
}, { strict: false });

const About = mongoose.model('About', aboutSchema);

async function run() {
  await mongoose.connect(ATLAS_URI);
  let about = await About.findOne();
  if (about) {
    about.story = storyParagraphs;
    await about.save();
    console.log('Story added to About document!');
  } else {
    console.log('No about document found!');
  }
  process.exit(0);
}
run();
