export const mockProjects = [
  { id:"p1", name:"Luminary Financial Rebrand", client:"Luminary Financial", status:"In Progress", progress:68, dueDate:"Jul 15, 2026", type:"Brand + Web", budget:"₹8,00,000", priority:"High" },
  { id:"p2", name:"Verdant Foods Website", client:"Verdant Foods Co.", status:"In Review", progress:90, dueDate:"Jun 28, 2026", type:"Web Design", budget:"₹4,50,000", priority:"Medium" },
  { id:"p3", name:"Solari Energy Campaign", client:"Solari Energy", status:"Completed", progress:100, dueDate:"Jun 5, 2026", type:"Web + SEO", budget:"₹5,50,000", priority:"Low" },
  { id:"p4", name:"Nexus Protocol Dashboard", client:"Nexus Protocol", status:"Discovery", progress:15, dueDate:"Aug 30, 2026", type:"Product Design", budget:"₹12,00,000", priority:"High" },
  { id:"p5", name:"Helix Medical Identity", client:"Helix Medical", status:"In Progress", progress:45, dueDate:"Jul 22, 2026", type:"Brand Identity", budget:"₹5,00,000", priority:"Medium" },
  { id:"p6", name:"Orbit Analytics Platform", client:"Orbit Analytics", status:"Completed", progress:100, dueDate:"May 20, 2026", type:"Development", budget:"₹15,00,000", priority:"Low" },
];

export const mockLeads = [
  { id:"l1", name:"James O'Brien", company:"Prism Ventures", email:"james@prismventures.com", phone:"+91 98765 43210", service:"Brand + Web", budget:"₹5–10L", status:"Hot", source:"Referral", date:"Jun 18, 2026", notes:"Interested in full rebrand. Great fit for Growth package." },
  { id:"l2", name:"Maya Okonkwo", company:"Zenith Studios", email:"maya@zenithstudios.io", phone:"+91 98765 43211", service:"Web Design", budget:"₹3–5L", status:"Warm", source:"Website", date:"Jun 17, 2026", notes:"Looking for conversion-focused redesign for Q3 launch." },
  { id:"l3", name:"Tom Bergmann", company:"Cascade Growth", email:"tom@cascadegrowth.com", phone:"+91 98765 43212", service:"SEO", budget:"₹1–2L", status:"Cold", source:"LinkedIn", date:"Jun 15, 2026", notes:"Early stage. Needs follow-up email." },
  { id:"l4", name:"Aisha Patel", company:"SkyForm Inc.", email:"aisha@skyform.io", phone:"+91 98765 43213", service:"Brand Identity", budget:"₹3–4L", status:"Hot", source:"Dribbble", date:"Jun 14, 2026", notes:"Launching in 6 weeks — urgent timeline." },
  { id:"l5", name:"Carlos Mendez", company:"Nova Health", email:"carlos@novahealth.co", phone:"+91 98765 43214", service:"Product Design", budget:"₹10L+", status:"Warm", source:"Conference", date:"Jun 12, 2026", notes:"Series A funded. Big opportunity." },
];

export const mockClients = [
  { id:"c1", name:"Luminary Financial", contact:"Sarah Chen", email:"sarah@luminary.io", phone:"+91 98765 43215", plan:"Growth", status:"Active", joined:"Jan 2025", projects:2, spend:"₹14,00,000" },
  { id:"c2", name:"Verdant Foods Co.", contact:"David Park", email:"david@verdant.com", phone:"+91 98765 43216", plan:"Starter", status:"Active", joined:"Mar 2025", projects:1, spend:"₹4,50,000" },
  { id:"c3", name:"Solari Energy", contact:"Marcus Webb", email:"marcus@solari.com", phone:"+91 98765 43217", plan:"Growth", status:"Completed", joined:"Nov 2024", projects:3, spend:"₹16,50,000" },
  { id:"c4", name:"Nexus Protocol", contact:"Elena Vasquez", email:"elena@nexus.xyz", phone:"+91 98765 43218", plan:"Enterprise", status:"Active", joined:"May 2025", projects:1, spend:"₹12,00,000" },
  { id:"c5", name:"Helix Medical", contact:"Priya Nair", email:"priya@helixmed.co", phone:"+91 98765 43219", plan:"Starter", status:"Active", joined:"Apr 2025", projects:1, spend:"₹5,00,000" },
];

export const mockInvoices = [
  { id:"INV-2026-041", client:"Luminary Financial", amount:"₹4,00,000", status:"Paid", issued:"Jun 1, 2026", due:"Jun 15, 2026", project:"Rebrand Phase 1" },
  { id:"INV-2026-040", client:"Verdant Foods Co.", amount:"₹2,25,000", status:"Pending", issued:"Jun 10, 2026", due:"Jun 24, 2026", project:"Website Design" },
  { id:"INV-2026-039", client:"Nexus Protocol", amount:"₹6,00,000", status:"Overdue", issued:"May 15, 2026", due:"May 29, 2026", project:"Dashboard Design" },
  { id:"INV-2026-038", client:"Helix Medical", amount:"₹2,50,000", status:"Paid", issued:"May 28, 2026", due:"Jun 11, 2026", project:"Brand Identity" },
  { id:"INV-2026-037", client:"Solari Energy", amount:"₹2,75,000", status:"Paid", issued:"May 1, 2026", due:"May 15, 2026", project:"SEO Strategy" },
];

export const mockTasks = [
  { id:"t1", title:"Finalize brand guidelines PDF", project:"Luminary Financial", assignee:"Anna R.", due:"Jun 23", priority:"High", status:"In Progress" },
  { id:"t2", title:"Design homepage hero section", project:"Verdant Foods", assignee:"Kai T.", due:"Jun 24", priority:"Medium", status:"To Do" },
  { id:"t3", title:"SEO audit — on-page recommendations", project:"Solari Energy", assignee:"Lena M.", due:"Jun 22", priority:"Low", status:"Done" },
  { id:"t4", title:"User flow diagrams for dashboard", project:"Nexus Protocol", assignee:"Anna R.", due:"Jun 26", priority:"High", status:"To Do" },
  { id:"t5", title:"Motion concepts for hero animation", project:"Luminary Financial", assignee:"Kai T.", due:"Jun 25", priority:"Medium", status:"In Progress" },
  { id:"t6", title:"Write alt text for portfolio images", project:"Internal", assignee:"Lena M.", due:"Jun 27", priority:"Low", status:"To Do" },
];

export const mockTeam = [
  { id:"u1", name:"Anna Reeves", role:"Lead Designer", email:"anna@aesthetix.studio", avatar:"AR", color:"#6150F6", projects:3, status:"Active" },
  { id:"u2", name:"Kai Tanaka", role:"UI/UX Designer", email:"kai@aesthetix.studio", avatar:"KT", color:"#F59E0B", projects:2, status:"Active" },
  { id:"u3", name:"Lena Morris", role:"Brand Strategist", email:"lena@aesthetix.studio", avatar:"LM", color:"#EC4899", projects:4, status:"Active" },
  { id:"u4", name:"Dev Sharma", role:"Frontend Developer", email:"dev@aesthetix.studio", avatar:"DS", color:"#10B981", projects:2, status:"Active" },
  { id:"u5", name:"Mia Chen", role:"Project Manager", email:"mia@aesthetix.studio", avatar:"MC", color:"#3B82F6", projects:5, status:"Active" },
];

export const mockMessages = [
  { id:"m1", from:"Anna Reeves", avatar:"AR", color:"#6150F6", project:"Luminary Rebrand", preview:"The latest design directions look amazing! Could we jump on a quick call to discuss…", time:"2h ago", unread:true },
  { id:"m2", from:"Mia Chen", avatar:"MC", color:"#3B82F6", project:"Internal", preview:"Weekly update: all projects on track. Nexus dashboard review scheduled for…", time:"5h ago", unread:true },
  { id:"m3", from:"David Park", avatar:"DP", color:"#10B981", project:"Verdant Website", preview:"Approved the homepage layout! Let's move to inner pages next.", time:"Yesterday", unread:false },
  { id:"m4", from:"Elena Vasquez", avatar:"EV", color:"#F59E0B", project:"Nexus Dashboard", preview:"Can you share the updated Figma file? The team is excited to review.", time:"2 days ago", unread:false },
];

export const statusColors: Record<string, string> = {
  "In Progress":"#6150F6", "In Review":"#F59E0B", "Completed":"#16A34A",
  "Discovery":"#3B82F6", "Hot":"#EF4444", "Warm":"#F59E0B", "Cold":"#737370",
  "Active":"#16A34A", "Paid":"#16A34A", "Pending":"#F59E0B", "Overdue":"#EF4444",
  "Done":"#16A34A", "To Do":"#737370", "High":"#EF4444", "Medium":"#F59E0B", "Low":"#737370",
};
