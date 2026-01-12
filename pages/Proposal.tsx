import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, FileText, Check, Loader2 } from 'lucide-react';
import { Button, Input, Select, SectionHeader } from '../components/UI';
import { ProjectType, BudgetRange, Proposal, ProposalStatus } from '../types';
import { saveProposal, generatePDF } from '../services/proposalService';
import SEO from '../components/SEO';

const ProposalForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    projectType: '' as ProjectType,
    budget: '' as BudgetRange,
    launchDate: '',
    goals: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xbddjlyp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <SEO title="Proposal Received" description="Thank you for your request." />
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Proposal Request Received</h2>
        <p className="text-slate-600 max-w-md mb-8">
          Thanks, {formData.name}. We've generated a PDF summary of your request and sent it to {formData.email}. 
          A member of our team will review your requirements and contact you within 24 hours.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')} variant="outline">Return Home</Button>
          <Button onClick={() => window.print()} variant="primary">Download Summary PDF</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50">
      <SEO 
        title="Start Your Project" 
        description="Request a proposal for your website or web application. Tell us about your vision."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Start Your Project" 
          subtitle="Tell us about your vision. We'll craft a tailored plan to make it reality."
          center
        />
        
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              name="name" 
              placeholder="Jane Doe" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
            <Input 
              label="Work Email" 
              type="email" 
              name="email" 
              placeholder="jane@company.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Company Name" 
              name="company" 
              placeholder="Acme Inc." 
              required 
              value={formData.company}
              onChange={handleChange}
            />
            <Input 
              label="Current Website (Optional)" 
              name="website" 
              placeholder="https://..." 
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="Project Type" 
              name="projectType" 
              required
              options={Object.values(ProjectType)}
              value={formData.projectType}
              onChange={handleChange}
            />
            <Select 
              label="Estimated Budget" 
              name="budget" 
              required
              options={Object.values(BudgetRange)}
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <Input 
            label="Desired Launch Date" 
            name="launchDate" 
            type="date" 
            required 
            value={formData.launchDate}
            onChange={handleChange}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Goals & Description</label>
            <textarea 
              className="w-full px-4 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none min-h-[120px]"
              name="goals"
              placeholder="Describe the problem you are solving, your target audience, and any specific features you need..."
              required
              value={formData.goals}
              onChange={handleChange}
            />
          </div>

          <div className="mb-8 relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">Attachments (Design Brief, Assets)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
              <Upload className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">
                <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG up to 10MB</p>
              <input 
                type="file" 
                name="files"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              {files && (
                <p className="text-sm text-green-600 mt-2">
                  {files.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 max-w-xs">
              By submitting this form, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>. Your data is secure.
            </p>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" size={18} /> Processing...
                </span>
              ) : (
                'Submit Request'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;