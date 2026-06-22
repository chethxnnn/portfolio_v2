const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://127.0.0.1:27017/living-terminal-portfolio';
const ATLAS_URI = 'mongodb+srv://chethanlucky3214_db_user:W9bu7iAw4O5KT9zg@cluster0.ckx4ycp.mongodb.net/?appName=Cluster0';

// Import all models
const About = require('./models/About');
const Admin = require('./models/Admin');
const Contact = require('./models/Contact');
const Education = require('./models/Education');
const Experience = require('./models/Experience');
const Hobby = require('./models/Hobby');
const InstagramAccount = require('./models/InstagramAccount');
const MediaAccount = require('./models/MediaAccount');
const Project = require('./models/Project');
const SiteSettings = require('./models/SiteSettings');
const Skill = require('./models/Skill');

const models = [About, Admin, Contact, Education, Experience, Hobby, InstagramAccount, MediaAccount, Project, SiteSettings, Skill];

async function migrate() {
  try {
    // 1. Connect to LOCAL DB and fetch all data
    console.log('Connecting to LOCAL DB...');
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('Connected to local. Fetching data...');

    const data = {};
    for (const Model of models) {
      const LocalModel = localConn.model(Model.modelName, Model.schema);
      data[Model.modelName] = await LocalModel.find({}).lean();
      console.log(`Fetched ${data[Model.modelName].length} from ${Model.modelName}`);
    }
    await localConn.close();

    // 2. Connect to ATLAS DB and insert data
    console.log('\nConnecting to ATLAS DB...');
    await mongoose.connect(ATLAS_URI);
    console.log('Connected to Atlas. Wiping existing data and inserting from local...');

    for (const Model of models) {
      await Model.deleteMany({});
      if (data[Model.modelName].length > 0) {
        // Strip out local _id and __v to let Atlas assign them, except if it's singleton like About
        const docs = data[Model.modelName].map(doc => {
          const { _id, __v, ...rest } = doc;
          return rest;
        });
        await Model.insertMany(docs);
      }
      console.log(`Migrated ${Model.modelName}`);
    }

    console.log('\nMigration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
