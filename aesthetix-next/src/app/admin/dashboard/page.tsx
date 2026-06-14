import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li>
          <Link href="/admin/clients" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium">Clients</h3>
            <p className="text-gray-600">Manage client records</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/projects" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium">Projects</h3>
            <p className="text-gray-600">View and edit projects</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/invoices" className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium">Invoices</h3>
            <p className="text-gray-600">Track billing</p>
          </Link>
        </li>
        {/* Add more admin sections as needed */}
      </ul>
    </section>
  );
}
