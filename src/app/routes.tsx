import { createBrowserRouter } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import PortalLayout from "./layouts/PortalLayout";
import AdminLayout from "./layouts/AdminLayout";
import { AuthGate } from "./components/auth-gate";

const lazyPage = (loader: () => Promise<{ default: React.ComponentType<any> }>) => async () => {
  const mod = await loader();
  return { Component: mod.default };
};

export const router = createBrowserRouter([
  {
    path:"/auth",
    Component:AuthLayout,
    children:[
      { path:"login", lazy: lazyPage(() => import("./pages/auth/Login")) },
      { path:"signup", lazy: lazyPage(() => import("./pages/auth/Signup")) },
      { path:"forgot-password", lazy: lazyPage(() => import("./pages/auth/ForgotPassword")) },
      { path:"reset-password", lazy: lazyPage(() => import("./pages/auth/ResetPassword")) },
      { path:"verify-email", lazy: lazyPage(() => import("./pages/auth/VerifyEmail")) },
    ],
  },

  {
    path:"/portal",
    Component:PortalLayout,
    children:[
      { Component:AuthGate, children:[
        { index:true, lazy: lazyPage(() => import("./pages/portal/Dashboard")) },
        { path:"projects", lazy: lazyPage(() => import("./pages/portal/Projects")) },
        { path:"projects/:id", lazy: lazyPage(() => import("./pages/portal/ProjectDetails")) },
        { path:"files", lazy: lazyPage(() => import("./pages/portal/Files")) },
        { path:"messages", lazy: lazyPage(() => import("./pages/portal/Messages")) },
        { path:"invoices", lazy: lazyPage(() => import("./pages/portal/Invoices")) },
        { path:"settings", lazy: lazyPage(() => import("./pages/portal/Settings")) },
      ]},
    ],
  },

  {
    path:"/admin",
    Component:AdminLayout,
    children:[
      { Component:AuthGate, children:[
        { index:true, lazy: lazyPage(() => import("./pages/admin/Dashboard")) },
        { path:"leads", lazy: lazyPage(() => import("./pages/admin/Leads")) },
        { path:"leads/:id", lazy: lazyPage(() => import("./pages/admin/LeadDetails")) },
        { path:"clients", lazy: lazyPage(() => import("./pages/admin/Clients")) },
        { path:"clients/:id", lazy: lazyPage(() => import("./pages/admin/ClientDetails")) },
        { path:"projects", lazy: lazyPage(() => import("./pages/admin/Projects")) },
        { path:"projects/board", lazy: lazyPage(() => import("./pages/admin/ProjectBoard")) },
        { path:"tasks", lazy: lazyPage(() => import("./pages/admin/Tasks")) },
        { path:"calendar", lazy: lazyPage(() => import("./pages/admin/Calendar")) },
        { path:"team", lazy: lazyPage(() => import("./pages/admin/Team")) },
        { path:"analytics", lazy: lazyPage(() => import("./pages/admin/Analytics")) },
        { path:"content", lazy: lazyPage(() => import("./pages/admin/ContentPlanner")) },
        { path:"settings", lazy: lazyPage(() => import("./pages/admin/Settings")) },
      ]},
    ],
  },

  { path:"showcase/minimal", lazy: lazyPage(() => import("./pages/websites/MinimalSite")) },
  { path:"showcase/editorial", lazy: lazyPage(() => import("./pages/websites/EditorialSite")) },
  { path:"showcase/premium-saas", lazy: lazyPage(() => import("./pages/websites/PremiumSaasSite")) },
  { path:"showcase/creative-studio", lazy: lazyPage(() => import("./pages/websites/CreativeStudioSite")) },
  { path:"showcase/enterprise", lazy: lazyPage(() => import("./pages/websites/EnterpriseSite")) },
  { path:"showcase/luxury", lazy: lazyPage(() => import("./pages/websites/LuxurySite")) },
  { path:"showcase/startup", lazy: lazyPage(() => import("./pages/websites/StartupSite")) },
  { path:"showcase/modern-tech", lazy: lazyPage(() => import("./pages/websites/ModernTechSite")) },
  { path:"showcase/brutalist", lazy: lazyPage(() => import("./pages/websites/BrutalistSite")) },
  { path:"showcase/high-end-portfolio", lazy: lazyPage(() => import("./pages/websites/HighEndPortfolioSite")) },

  {
    path:"/",
    Component:PublicLayout,
    children:[
      { index:true, lazy: lazyPage(() => import("./pages/Home")) },
      { path:"services", lazy: lazyPage(() => import("./pages/Services")) },
      { path:"services/:slug", lazy: lazyPage(() => import("./pages/ServiceDetail")) },
      { path:"portfolio", lazy: lazyPage(() => import("./pages/Portfolio")) },
      { path:"portfolio/:slug", lazy: lazyPage(() => import("./pages/CaseStudy")) },
      { path:"about", lazy: lazyPage(() => import("./pages/About")) },
      { path:"blog", lazy: lazyPage(() => import("./pages/Blog")) },
      { path:"blog/:slug", lazy: lazyPage(() => import("./pages/BlogArticle")) },
      { path:"contact", lazy: lazyPage(() => import("./pages/Contact")) },
      { path:"pricing", lazy: lazyPage(() => import("./pages/Pricing")) },
      { path:"faq", lazy: lazyPage(() => import("./pages/FAQ")) },
      { path:"discovery-call", lazy: lazyPage(() => import("./pages/DiscoveryCall")) },
      { path:"inquiry", lazy: lazyPage(() => import("./pages/ProjectInquiry")) },
      { path:"thank-you", lazy: lazyPage(() => import("./pages/ThankYou")) },
      { path:"newsletter", lazy: lazyPage(() => import("./pages/Newsletter")) },
      { path:"system-states", lazy: lazyPage(() => import("./pages/system/SystemStates")) },
      { path:"*", lazy: lazyPage(() => import("./pages/system/NotFound")) },
    ],
  },
]);
