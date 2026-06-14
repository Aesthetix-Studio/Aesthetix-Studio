#!/usr/bin/env node
/**
 * Seed script: populates the projects table with sample portfolio data.
 * Usage: node seed-projects.mjs
 */

const API = process.env.VITE_API_URL || "https://aesthetix-api.mohdabraralikhan.workers.dev";
const PASSWORD = process.env.VITE_ADMIN_PASSWORD || "AnythingWorks";

const PROJECTS = [
  {
    title: "Meridian",
    slug: "meridian",
    category: "Financial Intelligence Platform",
    summary: "Reshaping perception in the $3T wealth management sector. Full identity, motion system, and 140-screen platform.",
    result: "47% increase in enterprise conversions within 6 months of launch.",
    year: "2025",
    image: "/work/meridian.png",
    details: ["Brand Identity", "Digital Platform", "Motion"],
    is_featured: true,
  },
  {
    title: "Kyoto Co.",
    slug: "kyoto-co",
    category: "Luxury Retail Identity",
    summary: "Tripling conversion through surgical restraint. Complete rebrand for a 40-year heritage house.",
    result: "3x conversion rate improvement across all digital channels.",
    year: "2024",
    image: "/work/kyoto.png",
    details: ["Identity System", "Campaign"],
    is_featured: false,
  },
  {
    title: "Solaris",
    slug: "solaris",
    category: "Climate Technology Brand",
    summary: "Making clean energy feel inevitable. Category positioning, identity, and product design for Series B climate tech.",
    result: "$12M Series B funding secured within 4 months of rebrand.",
    year: "2025",
    image: "/work/solaris.png",
    details: ["Brand Strategy", "Product Design"],
    is_featured: false,
  },
  {
    title: "Vantage",
    slug: "vantage",
    category: "B2B SaaS Design System",
    summary: "Engineering 230+ components for a $450M platform. Design system, documentation, and 18-month implementation.",
    result: "60% faster feature development cycles across 12 product teams.",
    year: "2024",
    image: "/work/vantage.png",
    details: ["Design System", "Component Library"],
    is_featured: true,
  },
];

async function login() {
  const res = await fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const { token } = await res.json();
  return token;
}

async function createProject(token, project) {
  const res = await fetch(`${API}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to create "${project.title}": ${res.status} ${JSON.stringify(err)}`);
  }
  return res.json();
}

async function main() {
  console.log("🔑 Logging in...");
  const token = await login();
  console.log("✅ Authenticated\n");

  for (const project of PROJECTS) {
    process.stdout.write(`📦 Creating "${project.title}"... `);
    try {
      const result = await createProject(token, project);
      console.log(`done (${result.id})`);
    } catch (e) {
      console.log(`SKIP (${e.message})`);
    }
  }

  console.log("\n✅ Seed complete!");
}

main().catch((e) => {
  console.error("❌ Seed failed:", e.message);
  process.exit(1);
});
