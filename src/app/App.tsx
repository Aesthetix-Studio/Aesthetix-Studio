import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { GrainOverlay } from "./components/grain";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Manifesto } from "./components/manifesto";
import { Work } from "./components/work";
import { Process } from "./components/process";
import { Practice } from "./components/practice";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { Blog } from "./components/blog";
import { BlogPost } from "./components/BlogPost";
import { LeadMagnets } from "./components/lead-magnets";
import { AdminLayout } from "./admin/AdminLayout";
import { LeadsDashboard } from "./admin/LeadsDashboard";
import { ProjectsAdmin } from "./admin/ProjectsAdmin";
import { BlogAdmin } from "./admin/BlogAdmin";
import { CaseStudiesAdmin } from "./admin/CaseStudiesAdmin";
import { ProposalGenerator } from "./admin/ProposalGenerator";
import { BriefAnalyzer } from "./admin/BriefAnalyzer";
import { ServicePage } from "./components/ServicePage";
import { NotFound } from "./components/NotFound";

function Landing() {
  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh", overflowX: "hidden" }}>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Work />
        <Process />
        <Practice />
        <LeadMagnets />
        <Blog />
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
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/leads" replace />} />
          <Route path="leads" element={<LeadsDashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="case-studies" element={<CaseStudiesAdmin />} />
          <Route path="proposals" element={<ProposalGenerator />} />
          <Route path="brief-analyzer" element={<BriefAnalyzer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
