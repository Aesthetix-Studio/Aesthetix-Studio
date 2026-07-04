/**
 * Content — FAQ
 * Aesthetix Studio
 *
 * FAQ items used across the website.
 * Import from here instead of hardcoding in components.
 */

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const homepageFaq: FAQItem[] = [
  {
    question: 'What\'s included in a typical website project?',
    answer: 'Every project starts with a strategy session, then moves through UX wireframes, full visual design in Figma, a component library, and responsive front-end development. You\'ll receive complete source files and a 30-day support window post-launch.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A focused 5-page marketing site typically takes 4–6 weeks from kickoff to launch. Larger projects — design systems, e-commerce, or custom web apps — run 8–14 weeks.',
  },
  {
    question: 'Do you work with startups that don\'t have a brand yet?',
    answer: 'Yes — and it\'s actually ideal. Starting fresh means we can build everything from the right foundation. Our Growth package covers brand identity and website together.',
  },
  {
    question: 'Can you take over or redesign an existing website?',
    answer: 'Absolutely. We do full redesigns regularly. We\'ll start with a short audit of your current site — what\'s working, what\'s not — then build a strategy before designing anything.',
  },
  {
    question: 'What do you need from us to get started?',
    answer: 'A discovery call (30–60 minutes), answers to a short creative brief, access to any existing brand assets, and your key pages, goals, and timeline.',
  },
  {
    question: 'Do you offer monthly retainer plans?',
    answer: 'Yes. Many clients move to a retainer after their initial project for ongoing design support — new landing pages, campaign assets, feature design, and SEO updates.',
  },
];

export const faqCategories: { name: string; faqs: FAQItem[] }[] = [
  {
    name: 'Working with Us',
    faqs: [
      { question: 'What does your discovery call involve?', answer: 'It\'s a 30-minute conversation — not a sales pitch. We\'ll ask about your goals, target audience, timeline, and budget. You\'ll get a clear sense of whether we\'re the right fit.' },
      { question: 'How long does a typical project take?', answer: 'A focused 5-page website takes 4–6 weeks. Larger design systems or apps run 8–14 weeks. We share a detailed milestone schedule at kickoff.' },
      { question: 'How many clients do you take on at once?', answer: 'We cap at 4 concurrent active projects to maintain quality. We typically have 1–2 spots available each quarter.' },
    ],
  },
  {
    name: 'Design Process',
    faqs: [
      { question: 'Do you work with existing brands?', answer: 'Yes. We can extend, refine, or work within existing brand systems. We always start with a brand audit to understand what\'s working before making recommendations.' },
      { question: 'What\'s included in a web design project?', answer: 'UX wireframes, full visual design in Figma, component library, interactive prototype, and responsive layouts. Source files are always included.' },
      { question: 'How do revisions work?', answer: 'Each package includes defined revision rounds at structured checkpoints. We use feedback forms to keep sessions focused and efficient.' },
    ],
  },
  {
    name: 'Pricing & Contracts',
    faqs: [
      { question: 'Do you work with fixed or hourly pricing?', answer: 'We use fixed project pricing exclusively. You know the cost upfront with no surprises. Hourly billing creates the wrong incentives.' },
      { question: 'What\'s your payment structure?', answer: '50% deposit to begin, 25% at design approval, 25% at project completion. Enterprise projects can be structured differently.' },
      { question: 'Do you offer retainers?', answer: 'Yes. Many clients move to a monthly retainer after their initial project for ongoing design, new pages, and SEO. Starting at ₹25,000/mo.' },
    ],
  },
];
