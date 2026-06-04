import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetail from "./pages/projects/ProjectDetail";
import SkillsPage from "./pages/skills/SkillsPage";
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import AchievementsPage from "./pages/sections/AchievementsPage";
import TimelinePage from "./pages/sections/TimelinePage";
import MetricsPage from "./pages/sections/MetricsPage";
import TestimonialsPage from "./pages/sections/TestimonialsPage";
import OpenSourcePage from "./pages/sections/OpenSourcePage";
import TalksWritingPage from "./pages/sections/TalksWritingPage";
import ServicesPage from "./pages/sections/ServicesPage";
import AvailabilityPage from "./pages/sections/AvailabilityPage";
import Layout from "./layout";
import BlogBackprop from "./data/Backpropagation";

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/rahulkbharti">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:slug" element={<ProjectDetail />} />
                    <Route path="skills" element={<SkillsPage />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="timeline" element={<TimelinePage />} />
                    <Route path="metrics" element={<MetricsPage />} />
                    <Route path="testimonials" element={<TestimonialsPage />} />
                    <Route path="open-source" element={<OpenSourcePage />} />
                    <Route path="talks" element={<TalksWritingPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="availability" element={<AvailabilityPage />} />
                    <Route path="*" element={<BlogBackprop />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
