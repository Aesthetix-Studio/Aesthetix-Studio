import React from "react";

export const metadata = {
  title: "Client Portal",
  description: "Root layout for client portal pages",
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Aesthetix Studio – Client Portal</h1>
        {/* Add navigation links as needed */}
      </nav>
      <main className="container mx-auto">{children}</main>
    </section>
  );
}
