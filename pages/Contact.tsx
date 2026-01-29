import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, Check, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { Button, Input, Select, SectionHeader } from '../components/UI';
import { ProjectType, BudgetRange } from '../types';
import SEO from '../components/SEO';

const Contact = () => {
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
    phone: '',
    inquiryType: 'sales' // This helps differentiate from proposal form
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
    
    // Add inquiry type to distinguish from proposal form
    formData.append('inquiryType', 'Contact Sales');
    
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
        <SEO title="Contact Request Received" description="Thank you for contacting our sales team." />
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Reaching Out</h2>
        <p className="text-slate-600 max-w-md mb-8">
          Thanks, {formData.name}. We've received your inquiry and sent a confirmation to {formData.email}. 
          Our sales team will review your requirements and contact you within 24 hours to discuss your project.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')} variant="outline">Return Home</Button>
          <Button onClick={() => navigate('/services')} variant="primary">Explore Our Services</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50">
      <SEO 
        title="Contact Sales" 
        description="Get in touch with our sales team to discuss your project requirements and get a custom quote."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Contact Our Sales Team" 
          subtitle="Ready to start your project? Let's discuss your requirements and create a custom solution for your business."
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600 text-sm">+91 (555) 123-4567</p>
                    <p className="text-slate-500 text-xs mt-1">Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600 text-sm">sales@aesthetixstudio.com</p>
                    <p className="text-slate-500 text-xs mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Office</h4>
                    <p className="text-slate-600 text-sm">Mumbai, Maharashtra</p>
                    <p className="text-slate-500 text-xs mt-1">Remote-first team</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-medium text-slate-900 mb-3">Quick Response Times</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Initial response: Within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Proposal delivery: 2-3 business days
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Project kickoff: Within 1 week
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Tell Us About Your Project</h3>
              
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
                  label="Phone Number" 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <Input 
                label="Current Website (Optional)" 
                name="website" 
                placeholder="https://yourcompany.com" 
                value={formData.website}
                onChange={handleChange}
              />

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
                <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">Project Goals & Requirements</label>
                <textarea 
                  className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none min-h-[120px]"
                  name="goals"
                  placeholder="Tell us about your business goals, target audience, specific features you need, and any challenges you're facing..."
                  required
                  value={formData.goals}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-8 relative">
                <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                  <Upload className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">
                    <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Design briefs, wireframes, brand assets (PDF, PNG, JPG up to 10MB)</p>
                  <input 
                    type="file" 
                    name="files"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
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

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 max-w-xs">
                  By submitting this form, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>. Your information is secure and will only be used to contact you about your project.
                </p>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" size={18} /> Sending...
                    </span>
                  ) : (
                    'Contact Sales Team'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;