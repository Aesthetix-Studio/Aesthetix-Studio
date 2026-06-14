import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { GrainOverlay } from "./components/grain";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { MarqueeSection } from "./components/marquee";
import { Work } from "./components/work";
import { Process } from "./components/process";
import { Testimonials } from "./components/testimonials";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { BlogPost } from "./components/BlogPost";
import { AdminLayout } from "./admin/AdminLayout";
import { LeadsDashboard } from "./admin/LeadsDashboard";
import { ProjectsAdmin } from "./admin/ProjectsAdmin";
import { BlogAdmin } from "./admin/BlogAdmin";
import { CaseStudiesAdmin } from "./admin/CaseStudiesAdmin";
import DashboardPage from "./admin/dashboard/page";
import { AboutPage } from "./components/about";
import { JournalPage } from "./components/journal";
import { ServicePage } from "./components/ServicePage";
import { WorkPage } from "./components/WorkPage";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { NotFound } from "./components/NotFound";

function Landing() {
  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <MarqueeSection />
        <Work />
        <Process />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="leads" element={<LeadsDashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="case-studies" element={<CaseStudiesAdmin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
