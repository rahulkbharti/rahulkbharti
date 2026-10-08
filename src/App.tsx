import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import About from './pages/about/About';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';
import Home from './pages/home/Home';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/projects/ProjectDetail';
import ProjectsPage from './pages/projects/ProjectsPage';

/** Pages from the previous version of the site now live as sections on the home page. */
const LEGACY_ROUTES: Record<string, string> = {
    skills: '/#stack',
    contact: '/#contact',
    services: '/#services',
    timeline: '/#experience',
    achievements: '/#proof',
    metrics: '/#proof',
    testimonials: '/#proof',
    availability: '/#contact',
    'open-source': '/projects',
    talks: '/blog',
};

export default function App() {
    return (
        <BrowserRouter basename="/rahulkbharti">
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:slug" element={<ProjectDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    {Object.entries(LEGACY_ROUTES).map(([path, to]) => (
                        <Route key={path} path={path} element={<Navigate to={to} replace />} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
