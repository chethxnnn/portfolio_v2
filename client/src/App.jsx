import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioLayout from './layouts/PortfolioLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProjectsPanel from './admin/panels/ProjectsPanel';
import EducationPanel from './admin/panels/EducationPanel';
import HobbiesPanel from './admin/panels/HobbiesPanel';
import MediaPanel from './admin/panels/MediaPanel';
import ExperiencePanel from './admin/panels/ExperiencePanel';
import SkillsPanel from './admin/panels/SkillsPanel';
import AboutPanel from './admin/panels/AboutPanel';
import ResumePanel from './admin/panels/ResumePanel';
import SettingsPanel from './admin/panels/SettingsPanel';
// Public pages
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsPanel />} />
          <Route path="education" element={<EducationPanel />} />
          <Route path="hobbies" element={<HobbiesPanel />} />
          <Route path="media" element={<MediaPanel />} />
          <Route path="experience" element={<ExperiencePanel />} />
          <Route path="skills" element={<SkillsPanel />} />
          <Route path="resume" element={<ResumePanel />} />
          <Route path="about" element={<AboutPanel />} />
          <Route path="settings" element={<SettingsPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
