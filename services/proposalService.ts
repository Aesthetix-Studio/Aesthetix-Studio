import { Proposal, ProposalStatus } from '../types';

// Simulate local storage "Backend"
const STORAGE_KEY = 'aesthetix_proposals';

export const getProposals = (): Proposal[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveProposal = (proposal: Proposal): void => {
  const current = getProposals();
  const updated = [proposal, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateProposalStatus = (id: string, status: ProposalStatus): void => {
  const current = getProposals();
  const updated = current.map(p => p.id === id ? { ...p, status } : p);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const generatePDF = (proposal: Proposal) => {
  // Simulation of PDF generation
  console.log(`Generating PDF for ${proposal.id}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};