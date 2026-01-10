import React, { useState, useEffect } from 'react';
import { getProposals, updateProposalStatus } from '../services/proposalService';
import { Proposal, ProposalStatus } from '../types';
import { Button } from '../components/UI';

const Admin = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setProposals(getProposals());
    }
  }, [isLoggedIn]);

  const handleStatusChange = (id: string, status: ProposalStatus) => {
    updateProposalStatus(id, status);
    setProposals(getProposals()); // Refresh
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <p className="text-slate-500 mb-6 text-sm">For demo purposes, just click login.</p>
          <Button onClick={() => setIsLoggedIn(true)} className="w-full">Login to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Proposal Management</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-sm font-bold text-slate-600">Date</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Client</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Project</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Budget</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Status</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {proposals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No proposals received yet.</td>
                  </tr>
                ) : (
                  proposals.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm text-slate-600">{new Date(p.submittedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-sm">
                        <div className="font-medium text-slate-900">{p.name}</div>
                        <div className="text-slate-500 text-xs">{p.email}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{p.projectType}</td>
                      <td className="p-4 text-sm text-slate-600">{p.budget}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.status === ProposalStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                          p.status === ProposalStatus.ACCEPTED ? 'bg-green-100 text-green-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select 
                          value={p.status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value as ProposalStatus)}
                          className="text-sm border border-slate-300 rounded px-2 py-1 bg-white"
                        >
                          {Object.values(ProposalStatus).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;