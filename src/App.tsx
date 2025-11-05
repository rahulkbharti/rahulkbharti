import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Skills from "./pages/skills/Skills";
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";
import Contact from "./pages/contact/Contact";
import Layout from "./layout";
import BlogBackprop from "./data/Backpropagation";

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/rahulkbharti">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<BlogBackprop />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;