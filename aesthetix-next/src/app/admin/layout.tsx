import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <>
    {/* Overlay for mobile when menu is open */}
    <div className={`fixed inset-0 bg-black/30 z-30 md:hidden ${menuOpen ? "block" : "hidden"}`} onClick={() => setMenuOpen(false)} />

    {/* Sidebar navigation */}
    <aside className={`fixed inset-y-0 left-0 bg-white shadow-md z-40 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0 md:w-64 md:block`}>
      <div className="p-4 flex items-center justify-between md:hidden">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button className="text-xl focus:outline-none" onClick={toggleMenu} aria-label="Close menu">✕</button>
      </div>
      <nav className="flex flex-col gap-4 p-4">
        <a href="/admin/dashboard" className="text-gray-800 hover:underline">Dashboard</a>
        <a href="/admin/leads" className="text-gray-800 hover:underline">Leads</a>
        <a href="/admin/projects" className="text-gray-800 hover:underline">Projects</a>
      </nav>
    </aside>

    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-4 md:p-8 md:ml-64">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Aesthetix Studio – Admin Portal</h1>
        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </nav>
      <main className="container mx-auto px-4">{children}</main>
    </section>
  </>);
}
