export enum ProjectType {
  WEBSITE = 'Website Design',
  WEB_APP = 'Web Application',
  ECOMMERCE = 'E-Commerce',
  PROTOTYPE = 'Prototype/MVP',
  MAINTENANCE = 'Maintenance'
}

export enum BudgetRange {
  SMALL = '$5k - $10k',
  MEDIUM = '$10k - $25k',
  LARGE = '$25k - $50k',
  ENTERPRISE = '$50k+'
}

export enum ProposalStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export interface Proposal {
  id: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  projectType: ProjectType;
  budget: BudgetRange;
  launchDate: string;
  goals: string;
  phone?: string;
  submittedAt: string;
  status: ProposalStatus;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}