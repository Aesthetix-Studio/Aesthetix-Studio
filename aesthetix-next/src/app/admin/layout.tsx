import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-4 md:p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Aesthetix Studio – Admin Portal</h1>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        {/* Navigation links (placeholder) */}
        <div className={`flex flex-col md:flex-row gap-4 ${menuOpen ? "block" : "hidden md:flex"}`}>
          <a href="/admin/dashboard" className="text-gray-800 hover:underline">Dashboard</a>
          <a href="/admin/leads" className="text-gray-800 hover:underline">Leads</a>
          <a href="/admin/projects" className="text-gray-800 hover:underline">Projects</a>
        </div>
      </nav>
      <main className="container mx-auto px-4">{children}</main>
    </section>
  );
}
