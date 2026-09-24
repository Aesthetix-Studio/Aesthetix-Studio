import fs from 'node:fs';import path from 'node:path';import{fileURLToPath}from'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');const read=p=>fs.readFileSync(path.join(root,p),'utf8');const write=(p,s)=>{const f=path.join(root,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s)};
const SITE='https://aesthetixstudio.com';
/* Social card + Organization/WebSite/Service JSON-LD, injected into every page here
   rather than in each of the 26 hand-crafted proto heads so there is a single place to
   change it. ponytail: `address.streetAddress` and `sameAs` are omitted on
   purpose — the social links are still href="#". Wrong data in structured data is
   worse than absent data; add them once the real details exist. */
const OG_CARD=`<meta property="og:image" content="${SITE}/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Aesthetix Studio — a digital product studio"><meta name="twitter:image" content="${SITE}/og-image.png">`;
const LD_JSON=`<script type="application/ld+json">${JSON.stringify({
  '@context':'https://schema.org',
  '@graph':[
    { '@type':['Organization','ProfessionalService'],'@id':`${SITE}/#org`,name:'Aesthetix Studio',url:`${SITE}/`,logo:`${SITE}/og-image.png`,image:`${SITE}/og-image.png`,email:'mohdabraralikhan@gmail.com',telephone:'+91 8499908716',description:'Aesthetix Studio is a digital product studio in Hyderabad, India. We design and build digital experiences, web applications and AI solutions that create measurable business impact.',address:{'@type':'PostalAddress',addressLocality:'Hyderabad',addressCountry:'IN'},areaServed:'Worldwide',knowsAbout:['digital product design','web application development','AI solutions','technical SEO','brand strategy'] },
    { '@type':'WebSite','@id':`${SITE}/#website`,url:`${SITE}/`,name:'Aesthetix Studio',publisher:{'@id':`${SITE}/#org`} },
    { '@type':'Service','@id':`${SITE}/#service`,name:'Digital product design and development',serviceType:'Digital product design, web application development, AI solutions',provider:{'@id':`${SITE}/#org`},areaServed:'Worldwide',hasOfferCatalog:{'@type':'OfferCatalog',name:'Services',itemListElement:['Digital Experiences','Web Applications','AI Solutions','Website Redesign','SEO Service'].map((n)=>({'@type':'Offer',itemOffered:{'@type':'Service',name:n}}))} },
  ],
})}</script>`;
/* og:/twitter: title+description are duplicated inside the 26 hand-crafted proto heads, so
   editing a <title> left the social card advertising the old string. Derive them from the
   authoritative <title>/<meta name=description> instead, so the two can never drift apart. */
const seoHead=(html,p)=>{
  const t=(html.match(/<title>([\s\S]*?)<\/title>/)||[])[1];
  const d=(html.match(/<meta name="description" content="([^"]*)"/)||[])[1];
  if(/property="og:title"/.test(html)){
    if(t) html=html.replace(/(<meta property="og:title" content=")[^"]*(">)/,'$1'+t+'$2').replace(/(<meta name="twitter:title" content=")[^"]*(">)/,'$1'+t+'$2');
    if(d) html=html.replace(/(<meta property="og:description" content=")[^"]*(">)/,'$1'+d+'$2').replace(/(<meta name="twitter:description" content=")[^"]*(">)/,'$1'+d+'$2');
  }else{
    /* 11 hand-crafted proto heads shipped with neither a social card nor a canonical at all
       (the gated admin screens, leads, forms, brand-audit-tool). Build the block here from
       the authoritative title/description rather than hand-editing 11 more heads. */
    html=html.replace('</head>',(html.includes('rel="canonical"')?'':`<link rel="canonical" href="${SITE}${p}">`)+`<meta property="og:type" content="website"><meta property="og:site_name" content="Aesthetix Studio"><meta property="og:title" content="${t||''}"><meta property="og:description" content="${d||''}"><meta property="og:url" content="${SITE}${p}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${t||''}"><meta name="twitter:description" content="${d||''}">`+'</head>');
  }
  // error pages answer a non-200 status and carry no content of their own — never index them
  if(p==='/404'||p==='/500') html=html.replace('</head>','<meta name="robots" content="noindex"></head>');
  // idempotent: a page that already carries the card is left alone
  return html.includes('/og-image.png')?html:html.replace('</head>',OG_CARD+LD_JSON+'</head>');
};
/* Footer fixes, applied to every page for the same reason as the head: the footer is
   duplicated across the 26 hand-crafted proto files in two different whitespace styles,
   so patching the template alone would leave those pages behind. Turns the legal links
   into real anchors (they were plain text, which left /cookies-policy unreachable) and
   adds a Services column so the money pages are linked instead of orphaned. */
const seoFooter=(html)=>{
  html=html.replace(/(<span>)(Privacy Policy[\s\S]{0,60}?Terms of Service)(<\/span>)/, '$1<a href="/privacy-policy">Privacy Policy</a> · <a href="/terms-of-service">Terms of Service</a> · <a href="/cookies-policy">Cookies Policy</a>$3');
  /* Footers now carry the Services column natively (site/_footer.html + protos) —
     inject only for pages that predate it. ponytail: string guard instead of a
     registry; the day two footer variants exist this wants a real partial. */
  if(!html.includes('<h4>Services</h4>')) html=html.replace(/(\s*<div>\s*<h4>Connect<\/h4>)/, '<div><h4>Services</h4><div class="footer-col"><a href="/ai-solutions.html">AI Solutions</a><a href="/seo-service.html">SEO Service</a><a href="/website-redesign.html">Website Redesign</a><a href="/pricing.html">Pricing</a></div></div>$1');
  return html;
};
/* FAQ blocks + FAQPage JSON-LD on the pricing and service pages.
   Google deprecated the FAQ rich result on 7 May 2026, so this earns nothing in the SERP —
   the reason to carry it is GEO: answer engines read the question/answer pairs directly.
   The visible copy is the real prize, since these pages were 80-200 words of thin content
   and the FAQ answers the questions a buyer asks before they enquire.
   ponytail: content lives in this one table rather than in five page bodies. */
const FAQ={
 '/pricing':['Questions about pricing',[
  ['How much does a website cost?','Website and landing-page retainers start at ₹29,999 per month on Starter, which covers one active project of up to five pages. Growth is ₹59,999 per month for three active projects of up to fifteen pages. Larger programmes are quoted individually.'],
  ['Can I pay yearly instead of monthly?','Yes. Choosing yearly billing saves 15% against the monthly rate. Both are billed in advance for the period you select.'],
  ['What is included in every plan?','UI/UX design, responsive development and SEO are in all three plans. Starter adds email support, Growth adds CMS integration and priority support, and Enterprise adds a dedicated team and ongoing maintenance.'],
  ['What counts as an active project?','One stream of work in progress at a time — a website, a product build, or a defined piece of work on an existing platform. Starter covers one at once, Growth three, and Enterprise as many as you need running.'],
  ['How do I price something that does not fit a plan?','Send us the brief through the project form and we will quote it directly. Enterprise is priced to your requirements rather than off a rate card.'],
 ]],
};
const seoFaq=(html,p)=>{
  const e=FAQ[p]; if(!e) return html;
  const [heading,items]=e;
  const ld=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage','mainEntity':items.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
  const block=`<section class="faq section"><div class="eyebrow">FAQ</div><h2>${heading}</h2><div class="faq-list">${items.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div><script type="application/ld+json">${ld}</script></section>`;
  return html.replace('</main>', block+'</main>');
};
/* Fonts are self-hosted (see the @font-face block at the end of css/aesthetix.css), so the
   three third-party tags are swapped for local preloads here rather than edited into the 26
   hand-crafted proto heads. Preloading both latin files gets them started before the CSS is
   parsed, which is what the old `preconnect` pair was loosely trying to achieve. */
const FONT_LINKS=`<link rel="preload" href="/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/dm-serif-display.woff2" as="font" type="font/woff2" crossorigin>`;
const seoFonts=(html)=>{
  if(!html.includes('fonts.googleapis.com')) return html;
  return html
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/g,'')
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/g,'')
    .replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/,FONT_LINKS);
};
/* Image dimensions + lazy loading. Almost every image here sits in a container the CSS has
   already sized, but width/height is free and is the hint that stops a late load from
   shifting layout. Dimensions are read from the real file, never guessed — set to the true
   intrinsic size they are layout-neutral even where no CSS width applies. The FIRST image on
   a page is left eager: it is usually the LCP element, and lazy-loading that makes LCP worse. */
const dims=new Map();
const imageSize=(src)=>{
  if(dims.has(src)) return dims.get(src);
  let out=null;
  try{
    const b=fs.readFileSync(path.join(root,'.'+src));
    if(b.slice(0,8).toString('hex')==='89504e470d0a1a0a') out=[b.readUInt32BE(16),b.readUInt32BE(20)]; // PNG IHDR
    else if(b[0]===0xff&&b[1]===0xd8){ // JPEG — scan to the SOF marker (studio_02_abrar_portrait.png is a JPEG despite its extension)
      let o=2;
      while(o+9<b.length){
        if(b[o]!==0xff){o++;continue;}
        const marker=b[o+1];
        if(marker>=0xc0&&marker<=0xcf&&marker!==0xc4&&marker!==0xc8&&marker!==0xcc){out=[b.readUInt16BE(o+7),b.readUInt16BE(o+5)];break;}
        const len=b.readUInt16BE(o+2);
        if(len<2) break;
        o+=2+len;
      }
    }
    else if(b.slice(0,3).toString()==='GIF') out=[b.readUInt16LE(6),b.readUInt16LE(8)];
    else if(src.endsWith('.svg')){
      const s=b.toString('utf8',0,600);
      const w=Number((s.match(/\bwidth="(\d+)/)||[])[1]), h=Number((s.match(/\bheight="(\d+)/)||[])[1]);
      if(w&&h) out=[w,h];
    }
  }catch{}
  dims.set(src,out);
  return out;
};
const seoImages=(html)=>{
  let first=true;
  return html.replace(/<img\b[^>]*>/g,(tag)=>{
    let t=tag;
    if(!/\bwidth=/.test(t)){
      const src=(t.match(/\bsrc="([^"]+)"/)||[])[1]||'';
      const d=src.startsWith('/')?imageSize(src):null; // remote (Unsplash hero) left alone rather than guessed
      if(d) t=t.replace(/<img\b/,`<img width="${d[0]}" height="${d[1]}"`);
    }
    if(!/\bloading=/.test(t)) t=t.replace(/<img\b/,first?'<img decoding="async"':'<img loading="lazy" decoding="async"');
    first=false;
    return t;
  });
};
const seo=(html,p)=>seoImages(seoFonts(seoFooter(seoFaq(seoHead(html,p),p))));
const img='https://images.unsplash.com/';
const images={hero:img+'photo-1531058020387-3be344556be6?w=1800&q=85',work:img+'photo-1618005198919-d3d4b5a92ead?w=1600&q=85',laptop:img+'photo-1558655146-d09347e92766?w=1600&q=85',abstract:img+'photo-1634017839464-5c339ebe3cb4?w=1600&q=85',studio:img+'photo-1518005020951-eccb494ad742?w=1800&q=85',stairs:img+'photo-1600607687920-4e2a09cf159d?w=1600&q=85',medix:img+'photo-1576091160399-112ba8d25d1d?w=1400&q=80',nexora:img+'photo-1551288049-bebda4e38f71?w=1400&q=80'};
const nav=read('site/_nav.html'),footer=read('site/_footer.html'),head=read('site/_head.html');
function page(title,description,key,body,path){let n=nav.replaceAll('{{WORK_ACTIVE}}',key==='work'?'active':'').replaceAll('{{CAP_ACTIVE}}',key==='capabilities'?'active':'').replaceAll('{{JOURNAL_ACTIVE}}',key==='journal'?'active':'').replaceAll('{{STUDIO_ACTIVE}}',key==='studio'?'active':'').replaceAll('{{CONTACT_ACTIVE}}',key==='contact'?'active':'');return head.replace('{{TITLE}}',title).replace('{{DESCRIPTION}}',description).replaceAll('{{URL}}',path)+n+body+footer}
const hero=(label,title,sub,image=images.hero)=>`<section class="page-hero"><img class="hero-image" src="${image}" alt=""><div class="hero-content"><div class="eyebrow">${label}</div><h1>${title}</h1><p class="lede">${sub}</p><a class="text-link" href="/start-a-project.html"><span class="arrow">↗</span> Start a project</a></div></section>`;
const split=(num,title,text,image,light=true)=>`<section class="${light?'paper':''} split"><div class="copy"><div class="index">${num}</div><h2>${title}</h2><p class="small">${text}</p><div class="rule"></div><a class="text-link" href="/case-studies.html">View case study　<span class="arrow">↗</span></a></div><div class="media"><img src="${image}" alt=""></div></section>`;
const stats=`<section class="dark section"><div class="eyebrow">Results</div><div class="stats"><div class="stat"><strong>80+</strong><label>Brands launched</label></div><div class="stat"><strong>42%</strong><label>Avg. conversion lift</label></div><div class="stat"><strong>42x</strong><label>Average ROI</label></div><div class="stat"><strong>6 yrs</strong><label>In the craft</label></div></div></section>`;
const home=`<main>${hero('Digital product studio','<span>Designing<br>digital products</span><span>that create measurable<br>business impact.</span>','We make websites, applications, and AI products that turn ambitious ideas into meaningful business outcomes.')}<div class="band">Most websites look good.<span>Very few solve business problems.</span></div>${split('01','Luminary Financial','A high-performance digital platform for a boutique wealth management firm. Built for clarity, connection, trust, and long-term client relationships.',images.work)}<section class="paper section"><div class="eyebrow">What we build</div><h2>Digital experiences, web applications,<br>and AI solutions — designed around<br>business outcomes.</h2><div class="features"><div class="feature"><div class="index">01</div><h3>Digital<br>Experiences</h3><p class="small">Marketing websites and landing pages designed to convert visitors into customers. Every page is crafted with your audience in mind — not just aesthetics.</p></div><div class="feature"><div class="index">02</div><h3>Web<br>Applications</h3><p class="small">Scalable SaaS products, dashboards, and internal platforms built for long-term growth. Modern stacks, clean architecture, performance-first.</p></div><div class="feature"><div class="index">03</div><h3>AI<br>Solutions</h3><p class="small">Intelligent experiences that automate workflows and enhance customer interactions.</p></div></div></section>${stats}<section class="paper section"><div class="testimonial"><div class="stars"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div><p class="quote">“Aesthetix completely transformed how our company presents itself online. Three weeks after launch, we closed a ₹15L deal where the client specifically mentioned our website as the reason they reached out.”</p><p class="small">Sam Chen<br>CEO, Luminary Financial</p></div></section><section class="cta"><div><h2>Ready to build<br>something people<br>remember?</h2><a class="text-link" href="/start-a-project.html"><span class="arrow">↗</span> Book a discovery call</a></div></section></main>`;
const capabilities=`<main>${hero('Capabilities','<span>What we do<br>and how we help.</span>','From strategic digital experiences to intelligent systems, we design and build solutions that drive real business outcomes.',images.studio)}${split('01','Digital<br>Experiences','We design digital experiences that are intuitive, engaging, and built around your users — not just aesthetics.',images.laptop,true)}${split('02','Web<br>Applications','Scalable web applications and platforms built for performance, security, and long-term growth.',images.work,false)}${split('03','AI<br>Solutions','We build intelligent solutions that automate workflows, enhance decisions, and unlock new possibilities.',images.abstract,true)}<section class="dark section"><h2>Strategy, design,<br>technology — working<br>together for impact.</h2><a class="outline-cta" href="/start-a-project.html">Start a project　↗</a></section></main>`;
const PH='/images/placeholder.svg';
const caseCard=(href,client,title,desc)=>`<a class="case-card" href="${href}"><div class="case-card-img"><img src="${PH}" alt=""></div><div class="case-card-body"><div class="eyebrow">${client}</div><h3>${title}</h3><p class="small">${desc}</p><span class="text-link"><span class="arrow">↗</span> View case study</span></div></a>`;
const studies=[['luminary-financial','Luminary Financial','Designing trust in financial experiences.','A modern wealth management platform built for clarity and trust.'],['kora-health','Kora Health','Healthcare that feels human.','A patient-first platform making complex care journeys simple.'],['vertex','Vertex','From data to decisions.','An analytics platform that turns data into decisions.']];
const dLum={slug:'luminary-financial',eyebrow:'Work / Luminary Financial',h1:['Designing trust','in financial','experiences.'],lede:'A modern wealth management platform that combines clarity, personalization, and security to help users make confident financial decisions.',mockLabel:'LUMINARY',appTitle:'Intelligent wealth management for a modern world.',metrics:[['$2.4B+','Assets under management'],['18K+','Active clients'],['98%','Client retention rate'],['24/7','Dedicated support']],meta:[['Industry','Finance'],['Service','Product Design, Web Development, UX Strategy'],['Timeline','4 Months'],['Platform','Web Application']],overview:'Luminary Financial approached Aesthetix Studio to reimagine their digital platform. The goal was to create a modern, intuitive experience that builds trust, simplifies complex financial data, and enables users to take action with confidence.',ovMetrics:[['40%','Increase in user engagement'],['28%','Growth in assets under management'],['35%','Improvement in task completion rate'],['98%','Client satisfaction score']],challengeTitle:'Complex data.<br>Low trust. Outdated<br>experience.',challenge:"The previous platform was difficult to navigate, lacked personalization, and didn't communicate security or credibility. Users struggled to find key information and complete important actions.",solutionTitle:'Clarity through design.<br>Trust through experience.',solution:"We designed a clean, intuitive platform that puts users in control. By simplifying data visualization, personalizing insights, and reinforcing security at every step, we created a seamless experience that builds long-term trust.",impact:'A platform that grows with our clients.',impactText:'Luminary Financial now delivers a digital experience that empowers users, strengthens trust, and drives measurable business growth.',quote:'Aesthetix Studio transformed our vision into a powerful platform. The new experience is intuitive, beautiful, and our clients love it.',initials:'SM',author:'Sarah Mitchell',role:'Chief Marketing Officer, Luminary Financial',side2:'Portfolio',side3:'Investments',side4:'Transactions',side5:'Insights',dashWelcome:'Welcome back, Alex Johnson',dashLabel:'Portfolio value',dashValue:'$1,234,567.00',phoneLabel:'Portfolio',phoneValue:'$1,234,567.00',card1Badge:'Balanced',card1Title:'Risk analysis',card1Desc:"A balanced portfolio tuned to each client's goals.",card2Title:'Secure by design',card2Desc:'Bank-level encryption protects every account.'};
const caseStudy=(d)=>`<main>
<section class="work-hero">
  <div class="work-hero-inner">
    <div class="work-hero-copy">
      <div class="eyebrow">${d.eyebrow}</div>
      <h1>${d.h1.map(l=>`<span>${l}</span>`).join('')}</h1>
      <p class="lede">${d.lede}</p>
      <div class="work-ctas">
        <a class="btn-ghost" href="#">Visit website <span class="arrow">↗</span></a>
        <a class="text-link" href="#overview">⊞ View project overview</a>
      </div>
    </div>
    <div class="laptop" aria-hidden="true">
      <div class="laptop-screen">
        <div class="app-top">${d.mockLabel}</div>
        <div class="app-hero">
          <div><h4>${d.appTitle}</h4><button>Get started</button></div>
          <div class="app-graphic"></div>
        </div>
        <div class="app-metrics">
          ${d.metrics.map(m=>`<div><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>
<section class="work-meta">
  ${d.meta.map(m=>`<div><span>${m[0]}</span><strong>${m[1]}</strong></div>`).join('')}
</section>
<section class="work-overview section" id="overview">
  <div class="work-overview-copy">
    <div class="eyebrow">Overview</div>
    <p>${d.overview}</p>
  </div>
  <div class="work-overview-metrics">
    ${d.ovMetrics.map(m=>`<div><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}
  </div>
</section>
<section class="cs-split">
  <div class="cs-panel cs-challenge">
    <div class="eyebrow">The Challenge</div>
    <h2>${d.challengeTitle}</h2>
    <p>${d.challenge}</p>
    <a class="outline-cta" href="#">＋ Key challenges</a>
  </div>
  <a class="cs-arrow" href="#" aria-label="Next section">↗</a>
  <div class="cs-panel cs-solution">
    <div class="eyebrow">Our Solution</div>
    <h2>${d.solutionTitle}</h2>
    <p>${d.solution}</p>
    <a class="outline-cta" href="#">＋ Our approach</a>
  </div>
</section>
<section class="process section">
  <div class="eyebrow">The Process</div>
  <div class="process-bar">
    <div class="process-step active"><i></i><strong>01</strong><h4>Discover</h4><p>We started by understanding user needs, business goals, and market opportunities.</p></div>
    <div class="process-step"><i></i><strong>02</strong><h4>Define</h4><p>We defined the product strategy, user flows, and information architecture.</p></div>
    <div class="process-step"><i></i><strong>03</strong><h4>Design</h4><p>We crafted wireframes, visual design, and interactive prototypes.</p></div>
    <div class="process-step"><i></i><strong>04</strong><h4>Develop</h4><p>We built a secure, scalable platform with performance and accessibility in mind.</p></div>
    <div class="process-step"><i></i><strong>05</strong><h4>Deliver</h4><p>We tested, launched, and continually optimized based on user feedback.</p></div>
  </div>
</section>
<section class="showcase dark section">
  <div class="device tablet">
    <div class="tablet-side"><a>Overview</a><a>${d.side2}</a><a>${d.side3}</a><a>${d.side4}</a><a>${d.side5}</a><a>Settings</a></div>
    <div class="tablet-main"><div class="eyebrow">Dashboard</div><h3>${d.dashWelcome}</h3><div class="balance"><span>${d.dashLabel}</span><strong>${d.dashValue}</strong></div><div class="spark"></div></div>
  </div>
  <div class="device phone">
    <div class="phone-balance"><span>${d.phoneLabel}</span><strong>${d.phoneValue}</strong></div>
    <div class="spark"></div>
  </div>
  <div class="showcase-cards">
    <div class="sc-card"><div class="gauge"><span>${d.card1Badge}</span></div><b>${d.card1Title}</b><p class="small">${d.card1Desc}</p></div>
    <div class="sc-card"><div class="lock"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><b>${d.card2Title}</b><p class="small">${d.card2Desc}</p></div>
  </div>
</section>
<section class="impact section">
  <div class="impact-copy">
    <div class="eyebrow">The Impact</div>
    <h2>${d.impact}</h2>
    <p>${d.impactText}</p>
  </div>
  <div class="impact-quote">
    <span class="quote-mark">“</span>
    <p class="quote">${d.quote}</p>
    <div class="quote-author"><span class="avatar">${d.initials}</span><div><b>${d.author}</b><span>${d.role}</span></div></div>
  </div>
</section>
${d.slug?`<section class="screen-cards section"><div class="eyebrow">More case studies</div><div class="case-grid">${studies.filter(s=>s[0]!==d.slug).map(s=>caseCard('/work/'+s[0],s[1],s[2],s[3])).join('')}</div></section>`:''}
<section class="cta"><div><h2>Have a project in mind?</h2><p class="cta-sub">Let's build something impactful together.</p><a class="text-link" href="/start-a-project.html"><span class="arrow">↗</span> Start a project</a></div></section>
</main>`;
/* ponytail: /work leads with the flagship case study (Work 2 prototype) — a full narrative converts high-ticket buyers; breadth lives at /case-studies */
const work=caseStudy(dLum);
const caseStudies=`<main>
<section class="screen-head section"><div class="eyebrow">Case studies</div><h1>The work, in depth.</h1><p class="small">How strategy, design, and technology came together for each client.</p></section>
<section class="screen-cards section"><div class="case-grid">
${caseCard('/work/luminary-financial','Luminary Financial','Designing trust in financial experiences.','A modern wealth management platform built for clarity, connection, and trust.')}
${caseCard('/work/kora-health','Kora Health','Healthcare that feels human.','A patient-first platform making complex healthcare journeys feel simple.')}
${caseCard('/work/vertex','Vertex','From data to decisions.','An analytics platform that turns operational data into decisions.')}
</div></section>
<section class="cta"><div><h2>Good projects start<br>with great conversations.</h2><a class="text-link" href="/start-a-project.html"><span class="arrow">↗</span> Start a project</a></div></section>
</main>`;
const journal=`<main>${hero('Journal','<span>Thinking about<br>the work.</span>','Ideas, observations, and lessons from designing digital products for real people and real businesses.',images.abstract)}<section class="paper section"><div class="eyebrow">Latest articles</div><div class="journal-grid"><a class="journal-card" href="#"><img src="${images.work}" alt=""><div><div class="journal-meta">Design · 8 min read</div><h3>Designing for clarity in a noisy world.</h3><p class="small">The best digital products make the important thing obvious.</p></div></a><a class="journal-card" href="#"><img src="${images.studio}" alt=""><div><div class="journal-meta">Strategy · 6 min read</div><h3>What good product strategy actually looks like.</h3><p class="small">A practical way to move from ambition to outcomes.</p></div></a><a class="journal-card" href="#"><img src="${images.laptop}" alt=""><div><div class="journal-meta">Process · 5 min read</div><h3>The case for fewer, better features.</h3></div></a><a class="journal-card" href="#"><img src="${images.hero}" alt=""><div><div class="journal-meta">AI · 7 min read</div><h3>Building AI products people can trust.</h3></div></a></div></section></main>`;
const studio=`<main>${hero('Studio','<span>We design and build<br>digital products<br>with purpose,<br>clarity, and impact.</span>','Aesthetix Studio is a digital product studio partnering with ambitious companies to solve complex problems and create meaningful digital experiences.',images.studio)}<section class="paper section"><div class="eyebrow">Who we are</div><div class="split" style="min-height:0"><h2>We’re a team of designers,<br>engineers, and strategists<br>obsessed with craftsmanship<br>and outcomes.</h2><p class="small">We believe great digital products are built at the intersection of strategy, design, and technology. Our work is rooted in deep thinking, refined by aesthetics, and measured by results.</p></div></section><section class="dark section"><div class="eyebrow">Our philosophy</div><h2>Principles that<br>guide every<br>decision we make.</h2><div class="cards"><div class="card"><div class="index">01</div><h3>Purpose over decoration</h3><p class="small">Every element must serve a user need or business goal.</p></div><div class="card"><div class="index">02</div><h3>Clarity through simplicity</h3><p class="small">We strip away the unnecessary to create experiences that feel effortless.</p></div><div class="card"><div class="index">03</div><h3>Craft in every detail</h3><p class="small">Thoughtful execution builds trust and elevates the entire experience.</p></div></div></section><section class="paper section"><div class="eyebrow">Our process</div><h2>A thoughtful process<br>designed for impact.</h2><div class="timeline">${['Discover','Define','Design','Build','Optimize'].map((x,i)=>`<div><div class="index">0${i+1}</div><h4>${x}</h4><p class="small">We turn insight into meaningful progress.</p></div>`).join('')}</div></section></main>`;
const contact=`<main>${hero('Contact','<span>Let’s create<br>something inspiring<br>together.</span>','Have a project in mind or just want to explore ideas? We’d love to hear from you.',images.stairs)}<section class="contact-grid"><aside class="contact-info"><div class="eyebrow">Get in touch</div><h2>We respond to every inquiry within 24 hours.</h2><div class="rule"></div><p><b>Email</b><br>mohdabraralikhan@gmail.com</p><p><b>Phone</b><br>+91 8499908716</p><p><b>Studio</b><br>Aesthetix Studio<br>Hyderabad, India</p><p><b>Working Hours</b><br>Mon – Fri　10:00 AM – 7:00 PM IST</p></aside><form class="contact-form" id="contact-form"><div class="eyebrow">Send us a message</div><h2>Tell us about your project</h2><div class="form-grid"><div class="field"><label>Your name</label><input name="name" placeholder="John Doe" required></div><div class="field"><label>Email address</label><input name="email" type="email" placeholder="john@example.com" required></div><div class="field"><label>Company name (optional)</label><input name="company" placeholder="Your company"></div><div class="field"><label>Website (if any)</label><input name="website" placeholder="yourcompany.com"></div><div class="field full"><label>What type of project is this?</label><select name="project_type"><option value="">Select project type</option><option>Website</option><option>Web application</option><option>AI solution</option></select></div><div class="field full"><label>Tell us about your project</label><textarea name="message" placeholder="Describe your goals, challenges, and what success looks like..." required></textarea></div></div><button class="submit" type="submit">Send message　↗</button><p id="contact-status" role="status" aria-live="polite" style="display:none;margin-top:16px;color:#666;font-size:13px"></p></form>
<script>
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contact-status');
  const btn = form.querySelector('button');
  btn.disabled = true;
  try {
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Something went wrong — please try again.');
    status.textContent = 'Thanks — your message has been received. We’ll be in touch within 24 hours.';
    form.reset();
  } catch (err) {
    status.textContent = err.message;
  } finally {
    btn.disabled = false;
    status.style.display = 'block';
  }
});
</script></section><section class="cta"><h2>Good projects start<br>with great conversations.</h2></section></main>`;
const generic=title=>`<main>${hero(title,'<span>Let’s build something<br>people remember.</span>','Aesthetix Studio helps ambitious teams turn complex ideas into clear, useful digital products.',images.hero)}<section class="paper section"><div class="eyebrow">Aesthetix Studio</div><h2>Strategy, design, and technology for measurable outcomes.</h2><p class="small">This page is part of the studio experience and is ready to be expanded with your content.</p></section></main>`;
/* ── additional screens (frontend-only, placeholder images) ── */
const field=(t,p,l)=>{const id='f-'+l.toLowerCase().replace(/[^a-z]+/g,'-');return `<div class="field"><label for="${id}">${l}</label><input id="${id}" type="${t}" placeholder="${p}"></div>`;};
const authScreen=(eyebrow,title,sub,fields,button,alt)=>`<main><section class="auth"><form class="auth-card" onsubmit="return false"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="small">${sub}</p>${fields.map(f=>field(...f)).join('')}<button class="submit" type="submit">${button}</button>${alt?`<p class="auth-alt small">${alt}</p>`:''}</form></section></main>`;
/* ponytail: cta names the audit to request — the five orphan analyzer pages share
   this one funnel band instead of five bespoke funnels. Omit it and the page stays
   a plain readout (maintenance, knowledge-base, …). */
const screen=(eyebrow,title,sub,cards=[],img=true,cta=null)=>`<main><section class="screen-head section"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="small">${sub}</p>${img?`<div class="screen-img"><img src="${PH}" alt=""></div>`:''}</section>${cards.length?`<section class="screen-cards section"><div class="screen-grid">${cards.map(c=>`<div class="scard"><div class="eyebrow">${c[0]}</div><h3>${c[1]}</h3><p class="small">${c[2]}</p></div>`).join('')}</div></section>`:''}${cta?`<section class="cta"><div><h2>Want this for your site?</h2><p class="cta-sub">Request a ${cta} — scoped, priced, and delivered by the studio.</p><a class="text-link" href="/start-a-project.html"><span class="arrow">↗</span> Request an audit</a></div></section>`:''}</main>`;
/* wired tool screens: hero + live stat cards + entity table (wireToolPage in js/admin.js).
   cfg is JSON-serializable: { entity, title, tableTitle, cols:[{key,label,fmt?}], badge,
   stats:[{label,desc,op,key?,value?}], fields:[modal defs] } — stats are declarative ops. */
/* ponytail: tool screens render full admin chrome (sidebar + topbar), not the
   marketing nav/footer — the pages loop below emits them chrome-less. `eyebrow`
   is retired but kept in the signature so the call sites stay untouched.
   cfg.active (e.g. '/tasks.html') highlights the sidebar item.
   Family layout mirrors the mockups (Forms/Feedback/Files/Meeting Notes):
   icon stat cards, tab bar + live table, right rail (overview donut, top
   breakdown, quick actions, recent). cfg extras are all optional so old
   configs keep working: addLabel, searchPh, tabs:[{label,value,values?}],
   tabKey, rail:{overview,group:{key,colors,labels},top,recent,actions}.
   cfg.view==='timeline' switches to the bespoke Gantt board (wireTimeline);
   tables paginate at a fixed 8 rows and sort via the Filters menu. */
/* ponytail: the timeline board is bespoke (Gantt + month grid), not the generic
   table — one dedicated renderer beats bending wireToolPage around week math.
   cfg.view==='timeline' selects it; every other tool page is unaffected. */
const timelineView=(title,sub,cfg)=>{const pals=[['#8B5CF6','rgba(139,92,246,.15)','◷'],['#22C55E','rgba(34,197,94,.14)','✓'],['#60A5FA','rgba(59,130,246,.14)','✉']];return `<style>body{overflow:hidden}
.tool-stats{display:grid;grid-template-columns:repeat(${cfg.stats.length},minmax(0,1fr));gap:14px;margin-bottom:16px}
.tool-stat{display:flex;gap:12px;align-items:flex-start}
.tool-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;font-size:15px;font-weight:800}
.tool-stat-tx{min-width:0}
.tl-back{font-size:12px;color:#B9B9C4;display:inline-flex;gap:6px;margin-bottom:8px;cursor:pointer}
.tl-back:hover{color:#fff}
.tool-ghostbtn{background:#181824;border:1px solid #23232F;color:#C9C9D2;padding:9px 14px;border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:7px;font-family:inherit;white-space:nowrap}
.tool-ghostbtn:hover{border-color:#7C3AED;color:#fff}
.tl-select{background:#12121A;border:1px solid #23232F;border-radius:9px;color:#E4E4EA;font-size:12px;padding:10px 12px;font-family:inherit;cursor:pointer;max-width:240px;outline:none}
.tl-grid{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:14px;align-items:start}
.tl-rail{display:flex;flex-direction:column;gap:14px;min-width:0}
.tl-toggle{display:flex;align-items:center;gap:4px;background:#12121A;border:1px solid #1F1F2B;border-radius:10px;padding:4px;margin-bottom:12px;width:max-content;max-width:100%}
.tl-toggle span{font-size:12px;color:#8E8E9A;padding:0 8px 0 10px}
.tl-toggle button{background:none;border:0;color:#8E8E9A;font-size:12px;font-weight:500;padding:7px 16px;border-radius:7px;cursor:pointer;font-family:inherit}
.tl-toggle button.on{background:#7C3AED;color:#fff;font-weight:600}
.tl-legend{margin-left:auto;display:flex;gap:14px;font-size:11px;color:#8E8E9A;align-items:center}
.tl-gantt{background:#12121A;border:1px solid #1F1F2B;border-radius:14px;overflow:hidden;overflow-x:auto}
.tl-ghead,.tl-grow{display:grid;grid-template-columns:230px minmax(480px,1fr)}
.tl-ghead{border-bottom:1px solid #1B1B26}
.tl-glabel{padding:12px 14px;font-size:10.5px;font-weight:700;color:#8E8E9A;letter-spacing:.06em;border-right:1px solid #1B1B26}
.tl-weeks{display:grid}
.tl-week{padding:10px 6px;font-size:9.5px;color:#7A7A88;text-align:center;border-left:1px solid #1B1B26}
.tl-week b{display:block;font-size:10px;color:#B9B9C4}
.tl-grow{border-bottom:1px solid #1B1B26}
.tl-grow:last-child{border-bottom:0}
.tl-mname{padding:12px 14px;border-right:1px solid #1B1B26;display:flex;gap:9px;align-items:flex-start;min-width:0}
.tl-dot{width:10px;height:10px;border-radius:50%;margin-top:3px;flex-shrink:0}
.tl-mname b{display:block;font-size:12px;color:#fff;font-weight:600}
.tl-mname span{font-size:10px;color:#7A7A88}
.tl-track{position:relative;min-height:52px;background-image:repeating-linear-gradient(90deg,#1B1B26 0 1px,transparent 1px calc(100%/var(--n,8)))}
.tl-bar{position:absolute;top:14px;height:24px;border-radius:7px;font-size:10px;color:#fff;display:flex;align-items:center;padding:0 10px;white-space:nowrap;overflow:hidden;cursor:pointer;min-width:24px}
.tl-today{position:absolute;top:0;bottom:0;width:1px;background:#8B5CF6;z-index:2}
.tl-today span{position:absolute;top:2px;left:50%;transform:translateX(-50%);background:#7C3AED;color:#fff;font-size:9px;font-weight:700;border-radius:5px;padding:2px 7px;white-space:nowrap}
.tl-ov-row{display:flex;justify-content:space-between;gap:10px;font-size:11px;padding:7px 0;border-top:1px solid #1B1B26}
.tl-ov-row:first-of-type{border-top:0}
.tl-ov-row span{color:#7A7A88}
.tl-ov-row b{color:#E4E4EA;font-weight:600;text-align:right}
.tl-key{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #1B1B26}
.tl-key:first-child{border-top:0}
.tl-key .tx b{display:block;font-size:11.5px;color:#E4E4EA;font-weight:600}
.tl-key .tx span{font-size:10px;color:#7A7A88}
.tl-file{display:flex;gap:10px;align-items:center;padding:7px 0;border-top:1px solid #1B1B26;font-size:11px}
.tl-file:first-child{border-top:0}
.tl-fic{width:28px;height:28px;border-radius:7px;display:grid;place-items:center;font-size:13px;flex-shrink:0}
.tl-calgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.tl-dow{font-size:10px;color:#6E6E7E;text-align:center;padding:4px 0;font-weight:700}
.tl-day{min-height:64px;background:#181824;border:1px solid #23232F;border-radius:8px;padding:5px;font-size:10px;color:#8E8E9A}
.tl-day.dim{opacity:.35}
.tl-day b{display:block;font-size:10px;margin-bottom:3px}
.tl-evt{font-size:9px;background:rgba(124,58,237,.2);border:1px solid rgba(124,58,237,.45);color:#C4B5FD;border-radius:4px;padding:1px 4px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tl-evt.done{background:rgba(34,197,94,.15);border-color:rgba(34,197,94,.4);color:#4ADE80}
.tl-navbtn{width:30px;height:30px;border-radius:8px;background:#181824;border:1px solid #262633;color:#9A9AA8;cursor:pointer;font-family:inherit}
.tl-foot-note{background:#12121A;border:1px solid #1F1F2B;border-radius:14px;padding:16px 18px;display:flex;gap:12px;margin-top:14px;font-size:11.5px;color:#9A9AA8}
.bx{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;display:inline-block;white-space:nowrap}
.bx-scheduled{background:rgba(139,92,246,.15);color:#A78BFA}.bx-inprogress{background:rgba(59,130,246,.15);color:#60A5FA}.bx-complete{background:rgba(34,197,94,.15);color:#4ADE80}
@media(max-width:1280px){.tl-grid{grid-template-columns:1fr}.tool-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style><div class="dash-layout"><aside class="dash-sidebar"><div class="dash-logo-wrap"><div class="dash-logo">AESTHETIX<small>STUDIO</small></div><button class="dash-collapse" aria-label="Collapse sidebar">«</button></div><div class="dash-user"><div class="dash-avatar" data-adm="initials">—</div><div class="dash-user-info"><h4 data-adm="name">—</h4><span><span data-adm="role">—</span><br><span class="dash-dot">●</span><span class="dash-user-badge">Online</span></span></div><button type="button" class="dash-signout" data-adm="signout" title="Sign out">⌄</button></div><nav class="dash-nav" data-dash-nav="suite" data-active="/project-timeline.html"></nav><div class="dash-sidebar-bottom"><button class="dash-visit-btn" onclick="location.href='/'">Visit Website <span style="font-size:13px">↗</span></button><div class="dash-dark-toggle"><span>🌙&nbsp; Dark Mode</span><div class="toggle-switch"></div></div></div></aside><div class="dash-main"><div class="dash-topbar"><div><a class="tl-back" href="/admin-projects">← Back to Project</a><h1>${title}</h1><p>${sub}</p></div><div class="dash-topbar-right"><select id="tl-project" class="tl-select" aria-label="Select project"></select><button class="btn-create-new" id="tl-download">Download Timeline ⇩</button></div></div><div class="dash-content" style="overflow-y:auto;height:calc(100vh - 80px)"><div class="tool-stats">${cfg.stats.map((s,i)=>{const p=pals[i%pals.length];return `<div class="scard tool-stat"><div class="tool-ic" style="color:${p[0]};background:${p[1]}">${p[2]}</div><div class="tool-stat-tx"><div class="eyebrow">${s.label}</div><h3>—</h3><p class="small">${s.desc}</p></div></div>`;}).join('')}</div><div class="tl-grid"><div style="min-width:0"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div class="tl-toggle"><span>View:</span><button data-tview="timeline" class="on">Timeline</button><button data-tview="list">List</button><button data-tview="cal">Calendar</button></div><div class="tl-legend"><span><span class="rail-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22C55E"></span> Completed</span><span><span class="rail-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#8B5CF6"></span> In Progress</span><span><span class="rail-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#52525B"></span> Upcoming</span></div></div><div class="tl-gantt" id="tl-gantt"></div><div class="tool-panel" id="tl-list" hidden><div class="tool-head"><h2>All Milestones</h2><span><span class="adm-count" id="tl-count"></span> <button class="tool-ghostbtn" id="tl-add" style="display:inline-flex;margin-left:8px">+ New Milestone</button></span></div><table class="adm-table"><thead><tr><th>Milestone</th><th>Status</th><th>Start</th><th>Due</th><th></th></tr></thead><tbody id="tl-tbody"></tbody></table></div><div class="tool-panel" id="tl-cal" hidden><div class="tool-head"><h2 id="tl-cal-title">Calendar</h2><span><button class="tl-navbtn" id="tl-prev" aria-label="Previous month">‹</button> <button class="tl-navbtn" id="tl-next" aria-label="Next month">›</button></span></div><div class="tl-calgrid" id="tl-calgrid"></div></div><div class="tl-foot-note"><span style="font-size:16px">◷</span><span><b style="color:#E4E4EA">Timelines are estimates.</b><br>Progress updates automatically from milestone status — mark phases complete as the work ships.</span></div></div><div class="tl-rail"><div class="tool-panel"><div class="tool-head"><h2>Project Overview</h2></div><div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:6px" id="tl-ov-name">—</div><div class="tl-ov-row"><span>Start Date</span><b id="tl-ov-start">—</b></div><div class="tl-ov-row"><span>Target Date</span><b id="tl-ov-target">—</b></div><div class="tl-ov-row"><span>Status</span><b id="tl-ov-status">—</b></div></div><div class="tool-panel"><div class="tool-head"><h2>Key Milestones</h2><span class="dash-link" id="tl-keys-all" style="font-size:11px;color:#8B5CF6;cursor:pointer">View All</span></div><div id="tl-keys"></div></div><div class="tool-panel"><div class="tool-head"><h2>Project Files</h2><a href="/files-deliverables" style="font-size:11px;color:#8B5CF6">View All</a></div><div id="tl-files"></div></div></div></div><script src="/js/admin.js"></script><script>wireTimeline(${JSON.stringify(cfg)})</script></div></div></div>`;};
const tool=(eyebrow,title,sub,cfg)=>{if(cfg.view==='timeline')return timelineView(title,sub,cfg);const tabs=cfg.tabs&&cfg.tabs.length?cfg.tabs:[{label:'All',value:'all'}];const rail=cfg.rail||{};const pals=[['#8B5CF6','rgba(139,92,246,.15)','◫'],['#22C55E','rgba(34,197,94,.14)','✓'],['#60A5FA','rgba(59,130,246,.14)','✉'],['#FBBF24','rgba(245,158,11,.14)','◷'],['#EC4899','rgba(236,72,153,.14)','★']];return `<style>body{overflow:hidden}
.tool-stats{display:grid;grid-template-columns:repeat(${cfg.stats.length},minmax(0,1fr));gap:14px;margin-bottom:16px}
.tool-stat{display:flex;gap:12px;align-items:flex-start}
.tool-ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;font-size:15px;font-weight:800}
.tool-stat-tx{min-width:0}
.ftabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap;align-items:center}
.ftab{padding:7px 14px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#8E8E9A;font-family:inherit}
.ftab:hover{color:#fff}
.ftab.active{background:#7C3AED;color:#fff;font-weight:600}
.tool-ghostbtn{background:#181824;border:1px solid #23232F;color:#C9C9D2;padding:9px 14px;border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:7px;font-family:inherit;white-space:nowrap}
.tool-ghostbtn:hover{border-color:#7C3AED;color:#fff}
.tool-filterwrap{position:relative}
.tool-menu{position:absolute;right:0;top:calc(100% + 6px);background:#181824;border:1px solid #262633;border-radius:10px;padding:6px;min-width:160px;z-index:30}
.tool-menu button{display:block;width:100%;text-align:left;background:none;border:0;color:#B9B9C4;font-size:12px;padding:8px 10px;border-radius:7px;cursor:pointer;font-family:inherit}
.tool-menu button:hover{background:#23232F;color:#fff}
.tool-menu button.on{color:#fff;font-weight:600}
.tool-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 2px 0}
.tool-pages{display:flex;gap:6px;align-items:center}
.tool-pages button{min-width:30px;height:30px;border-radius:8px;background:#181824;border:1px solid #262633;color:#9A9AA8;font-size:11.5px;cursor:pointer;font-family:inherit;padding:0 8px}
.tool-pages button:hover:not(:disabled){border-color:#7C3AED;color:#fff}
.tool-pages button.on{background:#7C3AED;border-color:#7C3AED;color:#fff;font-weight:700}
.tool-pages button:disabled{opacity:.4;cursor:default}
.tool-grid{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:14px;align-items:start}
.tool-rail{display:flex;flex-direction:column;gap:14px;min-width:0}
.rail-donut-wrap{display:flex;align-items:center;gap:14px;margin-top:4px}
.rail-donut{width:110px;height:110px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;background:#262633}
.rail-hole{width:72px;height:72px;border-radius:50%;background:#18181B;display:flex;flex-direction:column;align-items:center;justify-content:center}
.rail-total{font-size:18px;font-weight:800;color:#fff}
.rail-cap{font-size:9px;color:#8E8E9A}
.rail-legend{display:grid;gap:7px;flex:1;min-width:0}
.rail-leg{display:flex;align-items:center;gap:7px;font-size:11px;color:#B9B9C4}
.rail-leg b{margin-left:auto;color:#fff;font-weight:600;white-space:nowrap}
.rail-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.rail-item{display:flex;align-items:center;gap:9px;padding:7px 0;border-top:1px solid #1B1B26;font-size:11px}
.rail-item:first-child{border-top:0}
.rail-item .tx{flex:1;min-width:0}
.rail-item .tx b{display:block;font-size:11.5px;color:#E4E4EA;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rail-item .tx span{font-size:10px;color:#7A7A88}
.rail-bar{height:4px;border-radius:2px;background:#262633;margin-top:5px;overflow:hidden}
.rail-bar i{display:block;height:100%;border-radius:2px;background:#7C3AED}
.rail-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.rail-act{background:#181824;border:1px solid #23232F;color:#C9C9D2;border-radius:9px;padding:10px 8px;font-size:11px;font-weight:500;cursor:pointer;font-family:inherit;text-align:center}
.rail-act:hover{border-color:#7C3AED;color:#fff}
.rail-av{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:9.5px;font-weight:800;flex-shrink:0}
.bx{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;display:inline-block;white-space:nowrap}
.bx-new{background:rgba(108,92,231,.15);color:#A78BFA}.bx-contacted{background:rgba(59,130,246,.15);color:#60A5FA}.bx-qualified{background:rgba(34,197,94,.15);color:#4ADE80}.bx-proposal{background:rgba(245,158,11,.15);color:#FBBF24}.bx-converted{background:rgba(16,185,129,.15);color:#34D399}.bx-lost{background:rgba(239,68,68,.15);color:#F87171}.bx-active{background:rgba(34,197,94,.15);color:#4ADE80}.bx-inactive{background:rgba(113,113,122,.18);color:#A1A1AA}.bx-archived{background:rgba(245,158,11,.15);color:#FBBF24}.bx-draft{background:rgba(113,113,122,.18);color:#A1A1AA}.bx-sent{background:rgba(59,130,246,.15);color:#60A5FA}.bx-accepted{background:rgba(34,197,94,.15);color:#4ADE80}.bx-rejected{background:rgba(239,68,68,.15);color:#F87171}.bx-scheduled{background:rgba(139,92,246,.15);color:#A78BFA}.bx-held{background:rgba(34,197,94,.15);color:#4ADE80}.bx-inprogress{background:rgba(59,130,246,.15);color:#60A5FA}.bx-complete{background:rgba(34,197,94,.15);color:#4ADE80}
.stars{color:#FBBF24;letter-spacing:1px;font-size:11px;white-space:nowrap}
@media(max-width:1280px){.tool-grid{grid-template-columns:1fr}.tool-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style><div class="dash-layout"><aside class="dash-sidebar"><div class="dash-logo-wrap"><div class="dash-logo">AESTHETIX<small>STUDIO</small></div><button class="dash-collapse" aria-label="Collapse sidebar">«</button></div><div class="dash-user"><div class="dash-avatar" data-adm="initials">—</div><div class="dash-user-info"><h4 data-adm="name">—</h4><span><span data-adm="role">—</span><br><span class="dash-dot">●</span><span class="dash-user-badge">Online</span></span></div><button type="button" class="dash-signout" data-adm="signout" title="Sign out">⌄</button></div><nav class="dash-nav" data-dash-nav="suite"${cfg.active?` data-active="${cfg.active}"`:''}></nav><div class="dash-sidebar-bottom"><button class="dash-visit-btn" onclick="location.href='/'">Visit Website <span style="font-size:13px">↗</span></button><div class="dash-dark-toggle"><span>🌙&nbsp; Dark Mode</span><div class="toggle-switch"></div></div></div></aside><div class="dash-main"><div class="dash-topbar"><div><h1>${title}</h1><p>${sub}</p></div><div class="dash-topbar-right"><div class="dash-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input id="tool-search" type="text" placeholder="${cfg.searchPh||'Search...'}" aria-label="${cfg.searchPh||'Search'}"><span class="dash-search-kbd">⌘K</span></div><button class="tool-ghostbtn" id="tool-filters">Filters</button><span class="tool-filterwrap"><span class="tool-menu" id="tool-menu" hidden><button data-sort="new" class="on">Newest first</button><button data-sort="old">Oldest first</button><button data-sort="az">Name A–Z</button></span></span><button class="tool-ghostbtn" id="tool-export">Export</button><button class="btn-create-new" id="tool-add">${cfg.addLabel||'＋ Add'}</button></div></div><div class="dash-content" style="overflow-y:auto;height:calc(100vh - 80px)"><div class="tool-stats">${cfg.stats.map((s,i)=>{const p=pals[i%pals.length];return `<div class="scard tool-stat"><div class="tool-ic" style="color:${p[0]};background:${p[1]}">${p[2]}</div><div class="tool-stat-tx"><div class="eyebrow">${s.label}</div><h3>—</h3><p class="small">${s.desc}</p></div></div>`;}).join('')}</div><div class="tool-grid"><div style="min-width:0"><div class="ftabs">${tabs.map((t,i)=>`<button class="ftab${i===0?' active':''}" data-tab="${t.value}" data-tabvals="${(t.values||[]).join(',')}">${t.label}</button>`).join('')}</div><div class="tool-panel"><div class="tool-head"><h2>${cfg.tableTitle}</h2></div><table class="adm-table"><thead><tr>${cfg.cols.map(c=>`<th>${c.label}</th>`).join('')}<th></th></tr></thead><tbody id="adm-tbody"></tbody></table><div class="tool-foot"><span class="adm-count" id="adm-count"></span><div class="tool-pages" id="tool-pages"></div></div></div></div><div class="tool-rail"><div class="tool-panel"><div class="tool-head"><h2>${rail.overview||'Overview'}</h2></div><div class="rail-donut-wrap"><div class="rail-donut" id="rail-pie"><div class="rail-hole"><div class="rail-total" id="rail-total">—</div><div class="rail-cap">Total</div></div></div><div class="rail-legend" id="rail-legend"></div></div></div><div class="tool-panel"><div class="tool-head"><h2>${rail.top||'Top items'}</h2></div><div id="rail-top"></div></div><div class="tool-panel"><div class="tool-head"><h2>Quick Actions</h2></div><div class="rail-actions">${(rail.actions||['Add']).map((a,i)=>`<button class="rail-act"${i===0?' data-act="add"':''}>${a}</button>`).join('')}</div></div><div class="tool-panel"><div class="tool-head"><h2>${rail.recent||'Recent activity'}</h2></div><div id="rail-recent"></div></div></div></div><script src="/js/admin.js"></script><script>wireToolPage(${JSON.stringify(cfg)})</script></div></div></div>`;};
const chatScreen=`<main><section class="screen-head section"><div class="eyebrow">AI chat assistant</div><h1>Answers, instantly.</h1><p class="small">A trained assistant for your content and questions.</p></section><section class="screen-cards section"><div class="tool-panel"><div class="chat-box" id="chat-box"></div><div class="chat-composer"><input id="chat-input" placeholder="Ask the assistant..."><button class="adm-btn" id="chat-send">Send</button></div></div></section><script src="/js/admin.js"></script><script>wireChat()</script></main>`;
/* ponytail: search renders inside the admin chrome (not the public marketing
   results page) because it queries the gated /api/search across workspace
   entities. The card + type-filter pattern mirrors the Search mockup. */
const searchScreen=`<style>body{overflow:hidden}
.search-grid{display:grid;grid-template-columns:230px minmax(0,1fr);gap:14px;align-items:start}
.search-frow{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12px;color:#B9B9C4}
.search-frow:hover{background:#181824}
.search-frow input{accent-color:#7C3AED}
.search-frow b{margin-left:auto;color:#fff;font-weight:600}
.search-big{display:flex;align-items:center;gap:10px;background:#12121A;border:1px solid #23232F;border-radius:10px;padding:12px 16px;margin-bottom:12px}
.search-big input{background:none;border:0;outline:none;color:#E4E4EA;font-size:14px;width:100%;font-family:inherit}
.search-clear{background:none;border:1px solid #2A2A38;color:#8E8E9A;border-radius:7px;font-size:11px;padding:5px 10px;cursor:pointer;white-space:nowrap;font-family:inherit}
.search-clear:hover{color:#fff;border-color:#7C3AED}
.search-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;font-size:12px;color:#8E8E9A}
.search-sort{background:#12121A;border:1px solid #23232F;border-radius:8px;color:#C9C9D2;font-size:11.5px;padding:7px 10px;font-family:inherit;cursor:pointer;outline:none}
.search-card{display:flex;gap:14px;background:#12121A;border:1px solid #1F1F2B;border-radius:12px;padding:16px 18px;margin-bottom:12px}
.search-ic{width:52px;height:52px;border-radius:10px;display:grid;place-items:center;font-size:20px;flex-shrink:0}
.search-card .eyebrow{margin-bottom:6px}
.search-card h3{font-size:15px;margin:0 0 6px;color:#fff;font-family:'Manrope'}
.search-open{font-size:11.5px;color:#8B5CF6;font-weight:600;white-space:nowrap}
.search-promo{margin-top:14px;background:linear-gradient(135deg,#1C1533,#12121A);border:1px solid rgba(124,58,237,.35);border-radius:12px;padding:16px}
.search-promo b{font-size:12.5px;color:#fff}
.search-promo p{font-size:11px;color:#9A9AA8;line-height:1.6;margin:8px 0 12px}
.search-promo a{font-size:11.5px;color:#C4B5FD;font-weight:600}
@media(max-width:1280px){.search-grid{grid-template-columns:1fr}}
</style><div class="dash-layout"><aside class="dash-sidebar"><div class="dash-logo-wrap"><div class="dash-logo">AESTHETIX<small>STUDIO</small></div><button class="dash-collapse" aria-label="Collapse sidebar">«</button></div><div class="dash-user"><div class="dash-avatar" data-adm="initials">—</div><div class="dash-user-info"><h4 data-adm="name">—</h4><span><span data-adm="role">—</span><br><span class="dash-dot">●</span><span class="dash-user-badge">Online</span></span></div><button type="button" class="dash-signout" data-adm="signout" title="Sign out">⌄</button></div><nav class="dash-nav" data-dash-nav="suite" data-active="/search.html"></nav><div class="dash-sidebar-bottom"><button class="dash-visit-btn" onclick="location.href='/'">Visit Website <span style="font-size:13px">↗</span></button><div class="dash-dark-toggle"><span>🌙&nbsp; Dark Mode</span><div class="toggle-switch"></div></div></div></aside><div class="dash-main"><div class="dash-topbar"><div><h1>Search</h1><p>Search projects, leads, files, and notes.</p></div></div><div class="dash-content" style="overflow-y:auto;height:calc(100vh - 80px)"><div class="search-grid"><aside class="tool-panel"><div class="tool-head"><h2>Results</h2><span class="adm-count" id="search-total"></span></div><div id="search-filters"></div><div class="search-promo"><b>Can&rsquo;t find what you&rsquo;re looking for?</b><p>Every project starts with a conversation.</p><a href="/start-a-project.html">Start a project ↗</a></div></aside><div style="min-width:0"><div class="search-big"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color:#8E8E9A;flex-shrink:0"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input id="search-input" aria-label="Search projects, leads, files, and notes" placeholder="Search projects, leads, files, notes..."><button class="search-clear" id="search-clear">Clear ✕</button></div><div class="search-meta"><span id="search-count">Type to search across the workspace.</span><select class="search-sort" id="search-sort" aria-label="Sort results"><option value="rel">Most relevant</option><option value="az">A–Z</option></select></div><div id="search-results"></div></div></div><script src="/js/admin.js"></script><script>wireSearch()</script></div></div></div>`;
/* ponytail: v1 client-review slice — intentionally one small public page, not a portal.
   Reads/writes the existing files/messages/feedback/milestones/projects tables only.
   thread=file:<id> is the link convention; milestone/progress bump is best-effort string
   matching. Ceiling: no auth, no FKs. Upgrade path: gated /client/* + deliverables table. */
const clientReview=`<main><section class="screen-head section"><div class="eyebrow">Aesthetix · Client Portal</div><h1 id="client-project-name">Your project.</h1><p class="small" id="client-project-sub">Loading your project…</p><div id="client-project"><div class="screen-grid"><div class="scard"><div class="eyebrow">Project progress</div><h3 id="client-progress">—</h3><p class="small" id="client-milestones">Loading milestones…</p></div></div></div></section><section class="screen-cards section"><div class="eyebrow">Needs your attention</div><div class="screen-grid" id="needs-attention"><p class="small">Loading…</p></div></section><section class="screen-cards section"><div class="eyebrow">Decided</div><div class="screen-grid" id="decided"></div></section><p class="small" id="review-status" role="status" aria-live="polite" style="display:none"></p><script>
(async()=>{
const head=document.getElementById('client-project-name'),sub=document.getElementById('client-project-sub'),prog=document.getElementById('client-progress'),miles=document.getElementById('client-milestones');
const needs=document.getElementById('needs-attention'),done=document.getElementById('decided'),msg=document.getElementById('review-status');
const say=(t)=>{msg.textContent=t;msg.style.display='block';};
const api=async(p,o)=>{const r=await fetch(p,{...o,headers:{'content-type':'application/json',...((o&&o.headers)||{})}});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||('Request failed ('+r.status+')'));return j;};
const esc=(s)=>String(s??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let files=[],projects=[],milestones=[];
try{[files,projects,milestones]=[(await api('/api/files')).data||[],(await api('/api/projects')).data||[],(await api('/api/milestones')).data||[]];}catch(e){needs.innerHTML='<p class="small">Could not load files — please try again.</p>';return;}
// ponytail: featured project is best-effort string matching (file.project vs title/client),
// same ceiling as the approve bump below. No FKs yet — first review file wins, else first project.
const featured=(()=>{const r=files.find((f)=>f.status==='review');const hit=r&&projects.find((p)=>p.title===(r.project||'')||p.client===(r.project||''));return hit||projects[0]||null;})();
const pms=featured?milestones.filter((m)=>Number(m.project_id)===Number(featured.id)):[];
if(featured){
  head.textContent=featured.title||featured.client||'Your project.';
  sub.textContent=[featured.client,featured.description||featured.category].filter(Boolean).join(' · ')||'Where things stand, and what needs you.';
  const pct=Number(featured.progress)||0;
  prog.textContent=pct+'% complete';
  const dot=(s)=>s==='complete'?'✓':s==='in progress'?'●':'○';
  miles.textContent=pms.length?pms.map((m)=>dot(m.status)+' '+m.title).join(' · '):'No milestones tracked yet.';
}else{sub.textContent='No projects on record yet.';prog.textContent='—';miles.textContent='';}
// ponytail: <details> is the whole Review drill-in — summary is the waiting item,
// the open body is the existing approve/request-changes interaction. No new UI system.
const card=(f)=>'<details class="scard" id="file-'+f.id+'"><summary><b>'+esc(f.name)+'</b><span class="small"> '+esc(f.project||'Project')+' · '+esc(f.type||'file')+(f.size?' · '+esc(f.size):'')+' · <u>Review</u></span></summary><div><p class="small">Uploaded'+(f.uploaded_by?' by '+esc(f.uploaded_by):'')+' — approve it or tell the studio what to change.</p><textarea data-note rows="2" aria-label="Note for the studio" placeholder="Note for the studio (needed for changes)…"></textarea><div style="display:flex;gap:8px;margin-top:8px"><button class="adm-btn" data-approve="'+f.id+'">Approve</button><button class="adm-btn ghost" data-changes="'+f.id+'">Request changes</button></div></div></details>';
// ponytail: decided shows state only — no history system yet. Notes stay in feedback/messages.
const decidedText=(f)=>f.status==='changes_requested'?'Changes requested — Aesthetix will review your feedback and send an updated version.':(f.status||'draft');
const render=()=>{
  const review=files.filter((f)=>f.status==='review'),rest=files.filter((f)=>f.status!=='review');
  needs.innerHTML=review.length?review.map(card).join(''):'<p class="small">Nothing waiting — you are all caught up.</p>';
  done.innerHTML=rest.map((f)=>'<div class="scard"><div class="eyebrow">'+esc(f.project||'Project')+'</div><h3>'+esc(f.name)+'</h3><p class="small">'+esc(decidedText(f))+'</p></div>').join('');
};
render();
async function bumpProject(file){
  try{
    const ps=(await api('/api/projects')).data||[];
    const p=ps.find((x)=>x.title===file.project||x.client===file.project);
    if(!p)return;
    const ms=((await api('/api/milestones')).data||[]).filter((m)=>Number(m.project_id)===Number(p.id));
    const open=ms.find((m)=>m.status!=='complete');
    if(open)await api('/api/milestones/'+open.id,{method:'PUT',body:JSON.stringify({status:'complete'})});
    const left=((await api('/api/milestones')).data||[]).filter((m)=>Number(m.project_id)===Number(p.id));
    const pct=left.length?Math.round(left.filter((m)=>m.status==='complete').length/left.length*100):100;
    await api('/api/projects/'+p.id,{method:'PUT',body:JSON.stringify({progress:pct})});
  }catch{}
}
document.addEventListener('click',async(e)=>{
  const a=e.target.closest('[data-approve]'),c=e.target.closest('[data-changes]');
  if(!a&&!c)return;
  const id=Number((a||c).dataset.approve||(a||c).dataset.changes);
  const f=files.find((x)=>x.id===id);if(!f)return;
  const box=e.target.closest('details')||e.target.closest('.scard');
  const note=((box&&box.querySelector('[data-note]'))||{}).value||'';
  try{
    if(a){
      await api('/api/files/'+id,{method:'PUT',body:JSON.stringify({status:'approved'})});
      await api('/api/messages',{method:'POST',body:JSON.stringify({role:'user',content:'Approved '+f.name,thread:'file:'+id})});
      await bumpProject(f);say('Approved — thanks. The studio has been notified.');
    }else{
      if(!note.trim()){say('Add a short note so the studio knows what to change.');return;}
      await api('/api/files/'+id,{method:'PUT',body:JSON.stringify({status:'changes_requested'})});
      await api('/api/feedback',{method:'POST',body:JSON.stringify({source:'Client review',rating:3,message:note})});
      await api('/api/messages',{method:'POST',body:JSON.stringify({role:'user',content:note,thread:'file:'+id})});
      say('Sent — the studio has your change request.');
    }
    files=(await api('/api/files')).data||[];
    const fresh=(await api('/api/projects')).data||[];
    if(featured){const p=fresh.find((x)=>x.id===featured.id);if(p){featured.progress=p.progress;prog.textContent=(Number(p.progress)||0)+'% complete';}}
    render();
  }catch(err){say(err.message);}
});
})();
</script></main>`;
/* Legal pages — full mockup builds (hero, sticky TOC, sections, cards).
   Copy is standard policy text with the studio's real contact details; treatment
   (numbering, icons, accordions) follows the Privacy/Terms/Cookies mockups. */
const CAL_SVG='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
const CHECK_SVG='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8.5 12.5 11 15 15.5 9.5"/></svg>';
const legalHero=(title,lede,updated,img,alt)=>`<section class="page-hero legal-hero"><img class="hero-image" src="${img}" alt="${alt}"><div class="hero-content"><div class="eyebrow">Legal</div><h1>${title}</h1><p class="lede">${lede}</p><p class="legal-updated">${updated}</p></div></section>`;
const legalToc=(items,pill)=>`<div class="legal-toc${pill?' pill':''}"><div class="eyebrow">On this page</div><nav>${items.map((t,i)=>`<a href="#${t[0]}"${i===0?' class="on"':''}><i>${t[1]}</i> ${t[2]}</a>`).join('')}</nav></div>`;
const legalHelp=(icon,q,sub,link,h)=>`<div class="legal-help"><div class="legal-help-ic">${icon}</div><b>${q}</b><p>${sub}</p><a href="${h}">${link} ↗</a></div>`;
const SHIELD_SVG='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/></svg>';
const LOCK_SVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
const MAIL_SVG='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
const privacyPage=`<main>${legalHero('Privacy Policy','Your privacy matters. This policy explains how Aesthetix Studio collects, uses, and protects your information when you visit our website or work with us.','Last updated: May 20, 2025','/images/assets/01_concrete_stairwell.png','Concrete stairwell lit by a shaft of daylight')}
<div class="legal-body"><aside class="legal-side"><div class="legal-stick">${legalToc([['p1','1.','Information We Collect'],['p2','2.','How We Use Your Information'],['p3','3.','How We Share Your Information'],['p4','4.','Cookies & Tracking Technologies'],['p5','5.','Data Security'],['p6','6.','Your Rights & Choices'],['p7','7.','Data Retention'],['p8','8.','Third-Party Links'],['p9','9.','Children’s Privacy'],['p10','10.','Changes to This Policy'],['p11','11.','Contact Us']])}${legalHelp(SHIELD_SVG,'Questions about your data?','We’re happy to help.','Contact us','/contact')}</div></aside>
<div class="legal-main">
<section class="legal-sec" id="p1"><h2>1. Information We Collect</h2><p>We collect information that you provide to us directly, information we obtain automatically when you use our website, and information we receive from third parties.</p><div class="legal-minis"><div class="legal-mini"><div class="legal-mini-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg></div><b>Information you provide</b><p>Name, email address, company name, and any details you share when contacting us or filling out forms.</p></div><div class="legal-mini"><div class="legal-mini-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="13" rx="2"/><line x1="9" y1="21" x2="15" y2="21"/></svg></div><b>Automatically collected</b><p>IP address, browser type, device information, pages visited, and usage data through cookies and analytics.</p></div><div class="legal-mini"><div class="legal-mini-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><b>From third parties</b><p>Information from analytics providers, advertising partners, or other trusted services.</p></div></div></section>
<section class="legal-sec" id="p2"><h2>2. How We Use Your Information</h2><p>We use the information we collect to:</p><div class="legal-checks"><div class="legal-check">${CHECK_SVG}<span>Respond to your inquiries and provide requested services</span></div><div class="legal-check">${CHECK_SVG}<span>Improve our website, services, and user experience</span></div><div class="legal-check">${CHECK_SVG}<span>Send you updates, insights, and relevant communications (if you opt in)</span></div><div class="legal-check">${CHECK_SVG}<span>Comply with legal obligations and protect our rights</span></div></div></section>
<div class="legal-acc"><details id="p3"><summary>3. How We Share Your Information</summary><div class="acc-body">We share data only with the service providers needed to run the studio — hosting, analytics, and payment processing — each bound to handle it confidentially. We disclose information when required by law, and we never sell your personal information.</div></details><details id="p4"><summary>4. Cookies &amp; Tracking Technologies</summary><div class="acc-body">We use a small set of cookies for preferences and privacy-respecting analytics. See our <a href="/cookies-policy" style="color:var(--violet-soft)">Cookies Policy</a> for the full list, providers, and durations.</div></details><details id="p5"><summary>5. Data Security</summary><div class="acc-body">We apply reasonable technical and organizational safeguards to the data we hold. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</div></details><details id="p6"><summary>6. Your Rights &amp; Choices</summary><div class="acc-body">You may request access, correction, or deletion of your personal data at any time by writing to mohdabraralikhan@gmail.com. You can opt out of marketing messages with the unsubscribe link in any email.</div></details><details id="p7"><summary>7. Data Retention</summary><div class="acc-body">We keep personal data only for as long as needed for the purposes above, or as required by law — after which it is deleted or anonymized.</div></details><details id="p8"><summary>8. Third-Party Links</summary><div class="acc-body">Our website may link to third-party sites. We are not responsible for their content or privacy practices, and we encourage you to read their policies.</div></details><details id="p9"><summary>9. Children’s Privacy</summary><div class="acc-body">Our services are not directed at children under 13, and we do not knowingly collect their data. Contact us and we will promptly remove any such information.</div></details><details id="p10"><summary>10. Changes to This Policy</summary><div class="acc-body">We may update this policy from time to time. Material changes will be posted on this page with a revised date.</div></details><details id="p11"><summary>11. Contact Us</summary><div class="acc-body">Questions about this policy or your data? Write to mohdabraralikhan@gmail.com — we respond to every message.</div></details></div>
<div class="legal-trust"><div class="legal-trust-ic">${LOCK_SVG}</div><p><b>Your trust is important to us.</b><br>We are committed to protecting your privacy and being transparent about our practices.</p><a class="legal-btn" href="/contact">Contact us ↗</a></div>
</div></div></main>`;
const TERMS_ROWS=[
 ['01','Acceptance of Terms','By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.','If you disagree with any part of these terms, please discontinue use of the website.','<rect x="6" y="3" width="12" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/>'],
 ['02','Our Services','Aesthetix Studio provides digital product design, development, branding, and related consulting services. The specific scope and deliverables are defined in individual agreements.','Each engagement is confirmed in writing before work begins.','<path d="M12 2l8 4.5v9L12 20l-8-4.5v-9z"/><path d="M12 11L4 6.5M12 11l8-4.5M12 11v9"/>'],
 ['03','User Responsibilities','You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment.','You are responsible for the accuracy of information you provide to us.','<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>'],
 ['04','Intellectual Property','All content, designs, logos, and materials on this website are the property of Aesthetix Studio and are protected by copyright and trademark laws.','You may not reproduce our work without prior written permission.','<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2A4.5 4.5 0 0 0 14.5 14.8"/>'],
 ['05','Payments & Refunds','All payments are due as per the terms outlined in your agreement or invoice. Refunds are handled on a case-by-case basis as per our Refund Policy.','Late payments may pause scheduled work until the balance is cleared.','<rect x="3" y="6" width="18" height="13" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>'],
 ['06','Confidentiality','We respect the confidentiality of your information. Both parties agree not to disclose confidential information without prior written consent.','Project materials you share with us are treated as confidential by default.','<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'],
 ['07','Limitation of Liability','Aesthetix Studio shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.','Nothing in these terms limits liability that cannot be limited by law.','<path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/>'],
 ['08','Termination','We reserve the right to suspend or terminate access to our services at any time for any violation of these Terms.','Outstanding invoices remain payable after termination.','<path d="M12 3v8"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>'],
 ['09','Governing Law','These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.','Disputes are subject to the exclusive jurisdiction of the courts of Hyderabad, India.','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/>'],
 ['10','Changes to Terms','We may update these Terms from time to time. Continued use of our services constitutes acceptance of the updated Terms.','The current version is always available on this page.','<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>'],
 ['11','Contact Us','If you have any questions about these Terms, please reach out to us.','Write to mohdabraralikhan@gmail.com — we respond within two business days.','<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'],
];
const termsPage=`<main>${legalHero('Terms of Service','These Terms of Service govern your access to and use of the website, services, and products provided by Aesthetix Studio.',`${CAL_SVG} Last updated: May 20, 2025`,'/images/assets/03_skylight_stairwell.png','Tall concrete stairwell under a skylight')}
<div class="legal-body"><aside class="legal-side"><div class="legal-stick">${legalToc([['t1','01','Acceptance of Terms'],['t2','02','Our Services'],['t3','03','User Responsibilities'],['t4','04','Intellectual Property'],['t5','05','Payments & Refunds'],['t6','06','Confidentiality'],['t7','07','Limitation of Liability'],['t8','08','Termination'],['t9','09','Governing Law'],['t10','10','Changes to Terms'],['t11','11','Contact Us']],true)}${legalHelp(MAIL_SVG,'Questions about these terms?','We’re here to help you with any clarification.','Contact us','/contact')}</div></aside>
<div class="legal-main">${TERMS_ROWS.map((r,i)=>`<details class="legal-trow" id="t${i+1}"><summary><span class="legal-trow-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${r[4]}</svg></span><span class="tx"><span class="legal-trow-num">${r[0]}</span><h3>${r[1]}</h3><p>${r[2]}</p></span></summary><div class="acc-body">${r[3]}</div></details>`).join('')}</div></div></main>`;
const cookiesPage=`<main>${legalHero('Cookies Policy','This policy explains how Aesthetix Studio uses cookies and similar technologies on our website to recognize you and enhance your experience.',`${CAL_SVG} Last updated: May 20, 2025`,'/images/assets/02_circular_stairwell.png','Circular concrete stairwell seen from below')}
<div class="legal-body"><aside class="legal-side"><div class="legal-stick">${legalToc([['c1','01','What Are Cookies?'],['c2','02','How We Use Cookies'],['c3','03','Types of Cookies We Use'],['c4','04','Cookie Details'],['c5','05','Managing Your Preferences'],['c6','06','Third-Party Cookies'],['c7','07','Updates to This Policy'],['c8','08','Contact Us']],true)}<div id="c8">${legalHelp('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="9.5" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="14" cy="13.5" r=".9" fill="currentColor" stroke="none"/><circle cx="10.5" cy="15" r=".9" fill="currentColor" stroke="none"/></svg>','Your choice.<br>Your experience.','You can manage or withdraw your cookie preferences at any time.','Manage preferences','/cookies-policy#sec-managing')}</div></div></aside>
<div class="legal-main">
<section class="legal-sec" id="c1"><h2>01. What Are Cookies?</h2><p>Cookies are small text files stored on your device when you visit a website. They help websites remember your actions and preferences over a period of time, so you don’t have to re-enter them whenever you return to the site.</p></section>
<section class="legal-sec" id="c2"><h2>02. How We Use Cookies</h2><p>We use cookies to operate and improve our website, personalize your experience, analyze site performance, and support our marketing efforts.</p><div class="legal-feats"><div class="legal-feat"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="20" x2="5" y2="12"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="19" y1="20" x2="19" y2="9"/></svg><b>Essential</b><p>Required for the website to function properly.</p></div><div class="legal-feat"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="15" cy="8" r="2.2"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="16" r="2.2"/></svg><b>Performance</b><p>Help us understand how visitors use our site.</p></div><div class="legal-feat"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg><b>Functionality</b><p>Remember your preferences and provide enhanced features.</p></div><div class="legal-feat"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg><b>Marketing</b><p>Deliver relevant content and measure campaign effectiveness.</p></div></div></section>
<section class="legal-sec" id="c3"><h2>03. Types of Cookies We Use</h2><p>We use the following types of cookies on our website.</p><div class="legal-table"><table><thead><tr><th>Type</th><th>Purpose</th><th>Provider</th><th>Duration</th></tr></thead><tbody>
<tr><td><span class="tname"><span class="tic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>Essential Cookies</span></td><td>These cookies are necessary for the website to function and cannot be disabled in our systems.</td><td>Aesthetix Studio</td><td>Session</td></tr>
<tr><td><span class="tname"><span class="tic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="20" x2="5" y2="12"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="19" y1="20" x2="19" y2="9"/></svg></span>Performance Cookies</span></td><td>Help us understand how visitors interact with our website by collecting anonymous information.</td><td>Google Analytics</td><td>Up to 2 years</td></tr>
<tr><td><span class="tname"><span class="tic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="15" cy="8" r="2.2"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="16" r="2.2"/></svg></span>Functionality Cookies</span></td><td>Allow the website to remember your choices and provide enhanced, personalized features.</td><td>Aesthetix Studio</td><td>Up to 1 year</td></tr>
<tr><td><span class="tname"><span class="tic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span>Marketing Cookies</span></td><td>Used to deliver relevant ads and measure the effectiveness of our campaigns.</td><td>Google, Meta, LinkedIn</td><td>Up to 2 years</td></tr>
</tbody></table></div><p class="legal-note">ⓘ Some cookies are placed by third-party services that appear on our pages.</p></section>
<section class="legal-sec" id="c4"><h2>04. Cookie Details</h2><p>Session cookies expire when you close your browser. Preference cookies last up to a year and analytics cookies up to two years. The table above lists every category we set, its provider, and how long it lives.</p></section>
<div class="legal-cards"><div class="legal-card" id="sec-managing"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="14" y2="14"/></svg><h3>05. Managing Your Preferences</h3><p>You can choose to accept or decline cookies. Most browsers allow you to control cookies through their settings.</p><a href="#sec-managing">Manage cookie preferences ↗</a></div><div class="legal-card" id="sec-third"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg><h3>06. Third-Party Cookies</h3><p>Some cookies are placed by third parties whose services we use. We do not control these cookies.</p><a href="#sec-types">View third-party list ↗</a></div><div class="legal-card" id="sec-updates"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><h3>07. Updates to This Policy</h3><p>We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated date.</p><a href="#sec-updates">View change history ↗</a></div></div>
</div></div></main>`;
const pages={"index.html":['Aesthetix Studio — Digital Product Studio','Digital products that create measurable business impact.','',home],"work.html":['Work — Case Studies From the Studio — Aesthetix Studio','Selected projects from Aesthetix Studio: wealth management, healthcare and analytics platforms, with the brief, the work and the results for each.','work',work],"capabilities.html":['Capabilities — Aesthetix Studio','What we do and how we help.','capabilities',capabilities],"journal.html":['Journal — Aesthetix Studio','Thinking about the work.','journal',journal],"studio.html":['Studio — Aesthetix Studio','We design and build digital products with purpose.','studio',studio],"contact.html":['Contact — Aesthetix Studio','Let’s create something inspiring together.','contact',contact],"start-a-project.html":['Start a Project — Aesthetix Studio','Tell us about your project.','contact',generic('Start a project')],"case-studies.html":['Case Studies — Aesthetix Studio','The work, in depth.','work',caseStudies],"careers.html":['Careers — Build Products With Us — Aesthetix Studio','Open roles at Aesthetix Studio, what it is like to work here, and how we hire — plus what to include if you want to send a speculative application.','studio',generic('Come build with us')],"process.html":['Process — How We Design and Build — Aesthetix Studio','How a project runs at Aesthetix Studio, from the first discovery call through strategy, design, build and launch, and what we need from you at each stage.','capabilities',generic('A thoughtful process')],"404.html":['Page not found — Aesthetix Studio','The page could not be found.','',generic('Page not found')]};
Object.assign(pages,{
"500.html":['Server Error — Please Try Again Shortly — Aesthetix Studio','Something went wrong on our end. We have logged the issue and will have it fixed shortly — please try again in a few minutes.','',screen('Server error','Something went wrong on our end.','We’ve logged the issue and will have it fixed shortly. Please try again in a few minutes.',[],false)],
/* Auth model: login is live (POST /api/session exchanges ADMIN_TOKEN for a signed cookie).
   signup / forgot-password / reset-password / verify-email are PROTOTYPE screens — inert
   by design (onsubmit="return false"): there are no account, password or email endpoints
   to wire them to. Do not fake-wire success flows; build real auth first or repoint the
   copy. qa/audit.mjs tracks them as LOW "intentionally inert" findings — that is the
   steady state until an account system is scoped. */
"login.html":['Login — Aesthetix Studio','Sign in to the studio workspace.','',authScreen('Login','Welcome back','Sign in to continue to the studio workspace.',[['email','you@company.com','Email'],['password','••••••••','Password']],'Sign in','Don\'t have an account? <a href="/signup.html">Create one</a>')],
"signup.html":['Signup — Aesthetix Studio','Create your account.','',authScreen('Signup','Create your account','Start building with Aesthetix Studio.',[['text','Your name','Name'],['email','you@company.com','Email'],['password','••••••••','Password']],'Create account','Already have an account? <a href="/login.html">Sign in</a>')],
"forgot-password.html":['Forgot Password — Reset Your Access — Aesthetix Studio','Enter the email address on your Aesthetix Studio account and we will send a secure link you can use to choose a new password.','',authScreen('Account','Reset your password','Enter your email and we’ll send you a reset link.',[['email','you@company.com','Email']],'Send reset link','Remembered it? <a href="/login.html">Sign in</a>')],
"reset-password.html":['Reset Password — Choose a New One — Aesthetix Studio','Pick a new password for your Aesthetix Studio account. Choose something long and unique that you do not reuse on any other site.','',authScreen('Account','Choose a new password','Pick a strong password for your account.',[['password','••••••••','New password'],['password','••••••••','Confirm password']],'Reset password','<a href="/login.html">Back to sign in</a>')],
"verify-email.html":['Verify Email — Confirm Your Address — Aesthetix Studio','Confirm your email address to finish setting up your Aesthetix Studio account. The verification link expires 24 hours after it is sent.','',authScreen('Account','Check your inbox','We’ve sent a verification link to your email address.',[],'Verify email','Didn\'t get it? <a href="#">Resend link</a>')],
"pricing.html":['Pricing — Aesthetix Studio','Simple pricing that scales with you.','',screen('Pricing','Plans for every stage.','Choose the plan that fits your team. Every plan includes a 14-day trial.',[['Starter','$499 / month','Landing pages and sites for early-stage teams.'],['Studio','$1,200 / month','Web apps, dashboards, and ongoing product work.'],['Scale','Custom','Dedicated team for platforms and AI products.']])],
"design-system.html":['Design System — Aesthetix Studio','Our design tokens and components.','',screen('Design system','One system, every screen.','Colors, type, spacing, and components that keep every page consistent.',[['Color','Brand #1F5EFF','Zinc neutrals from canvas to floating surfaces.'],['Type','DM Serif Display + Manrope','Display serif for headlines, Manrope for interfaces.'],['Components','Buttons, cards, forms','Shared building blocks used across the site.']])],
"privacy-policy.html":['Privacy Policy — How We Handle Your Data — Aesthetix Studio','How Aesthetix Studio collects, uses and protects your data: what we gather from contact forms, how analytics is used, and how to access or delete it.','',privacyPage],
"terms-of-service.html":['Terms of Service — Rules of Engagement — Aesthetix Studio','The terms that govern work with Aesthetix Studio: how services and deliverables are described, how scope, timeline and pricing are agreed, and liability limits.','',termsPage],
"cookies-policy.html":['Cookies Policy — How This Site Uses Them — Aesthetix Studio','What cookies this site sets, what each one is used for, and how to manage or disable them in your browser. Analytics and preference cookies only.','',cookiesPage],
"dashboard.html":['Dashboard — Aesthetix Studio','The studio at a glance.','',screen('Dashboard','Everything at a glance.','Live metrics, recent activity, and quick actions in one place.',[['Revenue','$84,200','Billable revenue this month.'],['Active projects','12','Five ship this week.'],['Open leads','34','Awaiting your reply.']])],
"leads.html":['Leads — Aesthetix Studio','Inquiries from the contact form.','',screen('Leads','Inquiries from the contact form.','Review, qualify, and respond to new business.',[['New','34','This week.'],['Responded','22','Replied within 24 hours.'],['Won','6','Converted to projects.']])],
"search.html":['Search — Projects, Leads, Files and Notes — Aesthetix Studio','Search across everything in the Aesthetix Studio workspace at once: projects, leads, files, meeting notes and form submissions, from one input.','',searchScreen],
"forms.html":['Forms — Aesthetix Studio','Every submission in one place.','',tool('Forms','Every submission in one place.','Capture and review form data from all pages.',{entity:'forms',title:'submission',tableTitle:'Form submissions',cols:[{key:'form_name',label:'Form'},{key:'name',label:'Name'},{key:'email',label:'Email'},{key:'status',label:'Status',fmt:'badge'},{key:'created_at',label:'Received',fmt:'date'}],badge:{new:['bx-new','New'],qualified:['bx-qualified','Qualified'],converted:['bx-converted','Converted']},stats:[{label:'Submissions',op:'count',desc:'All time.'},{label:'Qualified',op:'count',key:'status',value:'qualified',desc:'Worth pursuing.'},{label:'Converted',op:'count',key:'status',value:'converted',desc:'Became projects.'}],fields:[{name:'form_name',label:'Form',required:true},{name:'name',label:'Name'},{name:'email',label:'Email'},{name:'message',label:'Message',type:'textarea'},{name:'status',label:'Status',type:'select',options:['new','qualified','converted']}]})],
"feedback.html":['Feedback — Surveys, Ratings and Comments — Aesthetix Studio','Collect and review client feedback in one place: ratings, written comments and survey responses, with an average score across every response.','',tool('Feedback','Feedback','See what clients are saying and track feedback across all projects.',{entity:'feedback',title:'feedback',tableTitle:'All Feedback',active:'/feedback.html',addLabel:'+ Request Feedback',searchPh:'Search feedback...',tabs:[{label:'All Feedback',value:'all'},{label:'5★',value:'5'},{label:'4★',value:'4'},{label:'3★ & below',value:'low',values:['1','2','3']}],tabKey:'rating',cols:[{key:'source',label:'Client'},{key:'rating',label:'Rating',fmt:'stars'},{key:'message',label:'Comment'},{key:'created_at',label:'Date',fmt:'date'}],stats:[{label:'Total Feedback',op:'count',desc:'Across all projects.'},{label:'Average Rating',op:'avg',key:'rating',desc:'Out of 5.'},{label:'5★ Ratings',op:'count',key:'rating',value:5,desc:'Perfect scores.'}],rail:{overview:'Feedback Overview',group:{key:'rating',colors:['#22C55E','#84CC16','#FBBF24','#FB923C','#EF4444'],labels:{'5':'5★','4':'4★','3':'3★','2':'2★','1':'1★'}},top:'Ratings Breakdown',recent:'Recent Highlights',actions:['Request Feedback','Feedback Settings','Response Templates']},fields:[{name:'source',label:'Source'},{name:'rating',label:'Rating (1–5)',type:'number'},{name:'message',label:'Comment',type:'textarea'}]})],
"maintenance.html":['Maintenance — Uptime and Planned Windows — Aesthetix Studio','Track uptime, planned maintenance windows and open incidents for the Aesthetix Studio platform, with a rolling 90-day availability figure.','',screen('Maintenance','Scheduled updates.','Track maintenance windows and uptime.',[['Uptime','99.9%','Last 90 days.'],['Windows','2','Planned this month.'],['Incidents','0','Open right now.']])],
"knowledge-base.html":['Knowledge Base — Self-Serve Answers — Aesthetix Studio','Guides and how-to articles for clients and the studio team, covering the common questions that come up after a project ships.','',screen('Knowledge base','Self-serve answers.','Articles and guides for clients and the team.',[['Articles','86','Published guides.'],['Views','12K','This month.'],['Helpful','92%','Readers found answers.']])],
"meeting-notes.html":['Meeting Notes — Summaries and Next Steps — Aesthetix Studio','Every client call logged with its summary, attendees and action items, so decisions and follow-ups stay in one searchable place.','',tool('Meeting notes','Meeting Notes','Capture, organize and track key discussions & decisions.',{entity:'meetings',title:'meeting',tableTitle:'All Notes',active:'/meeting-notes.html',addLabel:'+ New Meeting Note',searchPh:'Search meeting notes...',tabs:[{label:'All Notes',value:'all'},{label:'Completed',value:'held'},{label:'Upcoming',value:'scheduled'}],tabKey:'status',cols:[{key:'title',label:'Meeting'},{key:'date',label:'Date & Time'},{key:'attendees',label:'Attendees'},{key:'action_items',label:'Action Items'},{key:'status',label:'Status',fmt:'badge'}],badge:{scheduled:['bx-scheduled','Upcoming'],held:['bx-held','Completed']},stats:[{label:'Total Meetings',op:'count',desc:'Across all projects.'},{label:'Completed',op:'count',key:'status',value:'held',desc:'Calls held.'},{label:'Upcoming',op:'count',key:'status',value:'scheduled',desc:'Scheduled syncs.'}],rail:{overview:'Meetings Overview',group:{key:'status',colors:['#22C55E','#8B5CF6'],labels:{held:'Completed',scheduled:'Upcoming'}},top:'Meetings by Status',recent:'Recent Meetings',actions:['New Meeting Note','Connect Calendar']},fields:[{name:'title',label:'Meeting',required:true},{name:'date',label:'Date'},{name:'attendees',label:'Attendees'},{name:'summary',label:'Summary',type:'textarea'},{name:'status',label:'Status',type:'select',options:['scheduled','held']},{name:'action_items',label:'Action items',type:'textarea'}]})],
"tasks.html":['Tasks — Follow-ups and Delivery To-dos — Aesthetix Studio','Every follow-up and delivery to-do in one list: who owns it, which project it belongs to, when it is due, and what is already done.','',tool('Tasks','Tasks','Follow-ups and delivery to-dos across every project.',{entity:'tasks',title:'task',tableTitle:'All Tasks',active:'/tasks.html',addLabel:'+ New Task',searchPh:'Search tasks...',tabs:[{label:'All Tasks',value:'all'},{label:'To Do',value:'todo'},{label:'In Progress',value:'in progress'},{label:'Done',value:'done'}],tabKey:'status',cols:[{key:'title',label:'Task'},{key:'project',label:'Project'},{key:'assignee',label:'Assignee'},{key:'status',label:'Status',fmt:'badge'},{key:'due_date',label:'Due',fmt:'date'}],badge:{todo:['bx-draft','To do'],'in progress':['bx-sent','In progress'],done:['bx-accepted','Done']},stats:[{label:'Total Tasks',op:'count',desc:'Tracked to-dos.'},{label:'In Progress',op:'count',key:'status',value:'in progress',desc:'Active right now.'},{label:'Done',op:'count',key:'status',value:'done',desc:'Completed.'}],rail:{overview:'Tasks Overview',group:{key:'status',colors:['#FBBF24','#60A5FA','#22C55E'],labels:{todo:'To do','in progress':'In progress',done:'Done'}},top:'Tasks by Status',recent:'Recent Tasks',actions:['New Task','View Calendar']},fields:[{name:'title',label:'Task',required:true},{name:'project',label:'Project'},{name:'assignee',label:'Assignee'},{name:'status',label:'Status',type:'select',options:['todo','in progress','done']},{name:'due_date',label:'Due date'}]})],
"messages.html":['Messages — Threads and Chat Logs — Aesthetix Studio','Client message threads and assistant chat history in one searchable list, newest first, so no enquiry ever goes unanswered.','',tool('Messages','Messages','Client messages and chat history in one place.',{entity:'messages',title:'message',tableTitle:'All Threads',active:'/messages.html',addLabel:'+ New Message',searchPh:'Search messages...',tabs:[{label:'All Threads',value:'all'},{label:'From Clients',value:'user'},{label:'From Assistant',value:'assistant'}],tabKey:'role',cols:[{key:'thread',label:'Thread'},{key:'role',label:'Role',fmt:'badge'},{key:'content',label:'Message'},{key:'created_at',label:'Received',fmt:'date'}],badge:{user:['bx-new','User'],assistant:['bx-sent','Assistant']},stats:[{label:'Total Messages',op:'count',desc:'Messages on record.'},{label:'From Clients',op:'count',key:'role',value:'user',desc:'Needs a reply.'},{label:'From Assistant',op:'count',key:'role',value:'assistant',desc:'Answered.'}],rail:{overview:'Messages Overview',group:{key:'role',colors:['#8B5CF6','#60A5FA'],labels:{user:'From clients',assistant:'From assistant'}},top:'Messages by Role',recent:'Recent Messages',actions:['New Message','Open AI Chat']},fields:[{name:'thread',label:'Thread'},{name:'role',label:'Role',type:'select',options:['user','assistant']},{name:'content',label:'Message',type:'textarea'}]})],
"subscriptions.html":['Subscriptions — Retainers and Plans — Aesthetix Studio','Retainer subscriptions per client and plan: monthly and yearly billing, active and past-due status, and when each one started.','',tool('Subscriptions','Subscriptions','Retainers per client and plan, billed monthly or yearly.',{entity:'subscriptions',title:'subscription',tableTitle:'All Subscriptions',active:'/subscriptions.html',addLabel:'+ New Subscription',searchPh:'Search subscriptions...',tabs:[{label:'All',value:'all'},{label:'Active',value:'active'},{label:'Past Due',value:'past due'},{label:'Cancelled',value:'cancelled'}],tabKey:'status',cols:[{key:'client',label:'Client'},{key:'plan',label:'Plan'},{key:'amount',label:'Amount',fmt:'inr'},{key:'interval',label:'Billing'},{key:'status',label:'Status',fmt:'badge'},{key:'started',label:'Started',fmt:'date'}],badge:{active:['bx-accepted','Active'],'past due':['bx-rejected','Past due'],cancelled:['bx-draft','Cancelled']},stats:[{label:'Active Retainers',op:'count',key:'status',value:'active',desc:'Paying now.'},{label:'Past Due',op:'count',key:'status',value:'past due',desc:'Needs chasing.'},{label:'Total',op:'count',desc:'All subscriptions.'}],rail:{overview:'Subscriptions Overview',group:{key:'status',colors:['#22C55E','#FBBF24','#8E8E9A'],labels:{active:'Active','past due':'Past due',cancelled:'Cancelled'}},top:'Subscriptions by Status',recent:'Recent Subscriptions',actions:['New Subscription','View Payments']},fields:[{name:'client',label:'Client',required:true},{name:'plan',label:'Plan',type:'select',options:['Starter','Growth','Enterprise']},{name:'amount',label:'Amount (₹)',type:'number'},{name:'interval',label:'Billing',type:'select',options:['monthly','yearly']},{name:'status',label:'Status',type:'select',options:['active','past due','cancelled']},{name:'started',label:'Start date'}]})],
"project-timeline.html":['Project Timeline — Milestones and Dates — Aesthetix Studio','Milestones across the full project lifecycle, from discovery through design and build to launch, with status and due dates for each phase.','',tool('Project timeline','Project Timeline','Phases, tasks, and key milestones to keep every project on track.',{entity:'milestones',title:'milestone',view:'timeline',stats:[{label:'Total Milestones',op:'count',desc:'Tracked phases.'},{label:'In Progress',op:'count',key:'status',value:'in progress',desc:'Active phases.'},{label:'Complete',op:'count',key:'status',value:'complete',desc:'Shipped phases.'}],badge:{scheduled:['bx-scheduled','Scheduled'],'in progress':['bx-inprogress','In progress'],complete:['bx-complete','Complete']},fields:[{name:'title',label:'Milestone',required:true},{name:'project_id',label:'Project ID',type:'number'},{name:'status',label:'Status',type:'select',options:['scheduled','in progress','complete']},{name:'start_date',label:'Start date'},{name:'due_date',label:'Due date'}]})],
"proposal.html":['Proposal — Scope, Timeline and Investment — Aesthetix Studio','The offer, ready to send: scope of work, delivery timeline and investment laid out so a client can review and approve it in one pass.','',screen('Proposal','The offer, ready to send.','Scope, timeline, and investment for the client.',[['Scope','12 weeks','Strategy, design, build.'],['Investment','$48,000','Fixed fee.'],['Status','Draft','Not yet sent.']])],
"proposal-request.html":['Proposal Request — Review a New Brief — Aesthetix Studio','A new proposal request, with the client brief, indicated budget range and the deadline for our response gathered in one place.','',screen('Proposal request','A new request came in.','Review the brief and prepare your response.',[['Client','Meridian','Fintech platform.'],['Budget','$40-60K','Indicated range.'],['Deadline','2 weeks','Response due.']])],
"proposal-generator.html":['Proposal Generator — Build Proposals Fast — Aesthetix Studio','Assemble scope, pricing and terms into a polished proposal document, then track each one through draft, sent, accepted or rejected.','',tool('Proposal generator','Build proposals fast.','Assemble scope, pricing, and terms into a polished document.',{entity:'proposals',title:'proposal',tableTitle:'Proposals',cols:[{key:'title',label:'Title'},{key:'client',label:'Client'},{key:'scope',label:'Scope'},{key:'investment',label:'Investment',fmt:'inr'},{key:'status',label:'Status',fmt:'badge'},{key:'created_at',label:'Created',fmt:'date'}],badge:{draft:['bx-draft','Draft'],sent:['bx-sent','Sent'],accepted:['bx-accepted','Accepted'],rejected:['bx-rejected','Rejected']},stats:[{label:'Generated',op:'count',desc:'Proposals on record.'},{label:'Accepted',op:'count',key:'status',value:'accepted',desc:'Signed proposals.'},{label:'Pipeline',op:'sum',key:'investment',desc:'Proposed value.'}],fields:[{name:'title',label:'Title',required:true},{name:'client',label:'Client'},{name:'scope',label:'Scope',type:'textarea'},{name:'investment',label:'Investment (₹)',type:'number'},{name:'status',label:'Status',type:'select',options:['draft','sent','accepted','rejected']}]})],
"files-deliverables.html":['Files & Deliverables — Assets per Project — Aesthetix Studio','Assets, documents and exports for every project on record, with file size, which project each belongs to and whether it is used on a live page.','',tool('Files and deliverables','Files & Deliverables','Access, review and download all project files and deliverables in one place.',{entity:'files',title:'file',tableTitle:'All Files',active:'/files-deliverables.html',addLabel:'+ Upload Files',searchPh:'Search files...',tabs:[{label:'All Files',value:'all'},{label:'In Review',value:'review'},{label:'Approved',value:'approved'},{label:'Draft',value:'draft'}],tabKey:'status',cols:[{key:'name',label:'Name'},{key:'project',label:'Project'},{key:'uploaded_by',label:'Uploaded By'},{key:'type',label:'Type'},{key:'size',label:'Size'},{key:'status',label:'Status',fmt:'badge'}],badge:{draft:['bx-draft','Draft'],review:['bx-sent','Ready for review'],approved:['bx-accepted','Approved'],changes_requested:['bx-rejected','Changes requested']},stats:[{label:'Total Files',op:'count',desc:'Across all projects.'},{label:'Needs Review',op:'count',key:'status',value:'review',desc:'Waiting on the client.'},{label:'Approved',op:'count',key:'status',value:'approved',desc:'Signed off.'}],rail:{overview:'Storage Overview',group:{key:'type',colors:['#8B5CF6','#60A5FA','#22C55E','#FBBF24','#EC4899'],labels:{document:'Documents',design:'Design files',image:'Images',video:'Videos',file:'Others'}},top:'Files by Type',recent:'Recent Activity',actions:['Upload Files','New Folder','Request a File']},fields:[{name:'name',label:'Name',required:true},{name:'type',label:'Type',type:'select',options:['file','document','design','video','image']},{name:'size',label:'Size'},{name:'project',label:'Project'},{name:'status',label:'Status',type:'select',options:['draft','review','approved','changes_requested']},{name:'uploaded_by',label:'Uploaded by'}]})],
"audit-analysis.html":['Audit & Analysis — Performance, UX, SEO — Aesthetix Studio','Deep-dive reporting that combines performance, UX and SEO findings into one prioritised list, with a current baseline score for the site.','',screen('Audit and analysis','Deep-dive reports.','Performance, UX, and SEO findings in one report.',[['One report','Combined','Performance, UX and SEO in a single read.'],['Prioritized','By impact','Fixes ordered by what moves the needle.'],['Baseline','Recorded','A score to measure progress against.']],true,'combined audit')],
"accessibility.html":['Accessibility — WCAG-Aligned Design — Aesthetix Studio','How we approach accessibility: WCAG-aligned conformance across the experience, verified contrast on text and UI, and full keyboard navigation.','',screen('Accessibility','Design for everyone.','WCAG-aligned checks across the experience.',[['WCAG AA','94%','Conformance across pages.'],['Contrast','Pass','Text and UI elements.'],['Keyboard','100%','Fully navigable.']])],
"accessibility-scanner.html":['Accessibility Scanner — Automated Audits — Aesthetix Studio','Run automated accessibility audits across a site, triage the issues they surface by severity, and track which ones have been resolved.','',screen('Accessibility scanner','Automated audits.','Scan pages for accessibility issues and fixes.',[['WCAG review','AA criteria','Checked against the standard.'],['Triage','By severity','What blocks users comes first.'],['Fix list','Verified','Re-scanned after the fix.']],true,'accessibility audit')],
"ai-chat-assistant.html":['AI Chat Assistant — Answers, Instantly — Aesthetix Studio','A trained assistant that answers questions about your content, products and internal documentation, embedded directly in the product.','',chatScreen],
"ai-solutions.html":['AI Solutions — Intelligence, Built In — Aesthetix Studio','Automations and insights embedded in your product: workflows that take on the repetitive work, and surfaces that show what matters.','',screen('AI solutions','Intelligence, built in.','Automations and insights embedded in your product.',[['Workflows','6','Live automations.'],['Automated','1.2K','Tasks handled.'],['Time saved','38h','Per month.']])],
"brand-audit-tool.html":['Brand Audit Tool — Aesthetix Studio','Consistency, measured.','',screen('Brand audit tool','Consistency, measured.','Check messaging, voice, and visuals against guidelines.',[['Pages','46','Audited.'],['Consistency','82%','On-brand score.'],['Violations','9','Flagged items.']])],
"performance-analyzer.html":['Performance Analyzer — Core Web Vitals — Aesthetix Studio','Measure Core Web Vitals and load performance per page — LCP, CLS and INP — and track how each one moves as the site changes.','',screen('Performance analyzer','Speed, quantified.','Core Web Vitals and load performance per page.',[['Web Vitals','LCP · CLS · INP','The three Google measures.'],['Per page','Measured','Real loads, not estimates.'],['Fix queue','By gain','Ordered by speed won.']],true,'performance audit')],
"seo-analyzer.html":['SEO Analyzer — Rankings and Site Health — Aesthetix Studio','Track keyword positions, on-page SEO health and organic sessions in one view, so you can see which pages are gaining and which are slipping.','',screen('SEO analyzer','Rankings and health.','On-page SEO, backlinks, and keyword positions.',[['Positions','Tracked','Where you rank per keyword.'],['On-page health','Reviewed','Page-by-page findings.'],['Sessions','Baselined','Organic traffic before and after.']],true,'SEO audit')],
"seo-service.html":['SEO Service — Grow Organic Traffic — Aesthetix Studio','Technical SEO, content and authority building as an ongoing service, reported quarterly against rankings, traffic and page-one terms.','',screen('SEO service','Grow organic traffic.','Technical SEO, content, and authority building.',[['Traffic','+42%','Year over year.'],['Rankings','38','Page one terms.'],['Audits','Quarterly','Full reports.']])],
"website-audit-tool.html":['Website Audit Tool — A Full Health Check — Aesthetix Studio','Check a site for technical, UX and content issues in one pass, with everything found ranked by how much it is likely to matter.','',screen('Website audit tool','A full health check.','Technical, UX, and content issues across the site.',[['Technical','Ranked','Issues ordered by impact.'],['UX findings','Prioritized','With concrete fixes.'],['Content gaps','Mapped','Matched to the pages that need them.']],true,'website audit')],
"website-redesign.html":['Website Redesign — Rebuild for Conversion — Aesthetix Studio','Reimagine an existing site around your business goals: discovery, design and build in one engagement, measured against conversion after launch.','',screen('Website redesign','A fresh start.','Reimagine the site around your business goals.',[['Timeline','10 weeks','Discovery to launch.'],['Pages','28','Designed and built.'],['Conversion','+35%','After launch.']])],
"discovery-call.html":['Discovery Call — Aesthetix Studio','The first conversation.','',screen('Discovery call','The first conversation.','Understand the problem before proposing the work.',[['Duration','45 min','Structure of the call.'],['Agenda','Goals, scope, budget','What we cover.'],['Next step','Proposal','What follows.']])],
"rss-feed.html":['RSS Feed — Journal Posts for Subscribers — Aesthetix Studio','Deliver journal posts to subscribers and feed readers as they publish, covering the topics, writing and process notes we publish regularly.','',screen('RSS feed','Syndicate your content.','Deliver journal posts to subscribers and readers.',[['Subscribers','2,400','Feed readers.'],['Posts','24','Published.'],['Clicks','18K','Monthly.']])],
"sitemap-tool.html":['Sitemap — Every Page of This Site, Mapped — Aesthetix Studio','The structure and hierarchy of the whole Aesthetix Studio site, with every page mapped by depth and updated automatically on publish.','',screen('Sitemap','Every page, mapped.','Structure and hierarchy of the whole site.',[['Pages','46','Indexed.'],['Depth','3','Max levels.'],['Updated','Auto','On publish.']])],
"client-review.html":['Client Review — Approve Deliverables Fast — Aesthetix Studio','Review files waiting for your approval, leave feedback or approve deliverables in one place while the studio tracks every status update.','',clientReview],
});
const dKora={slug:'kora-health',eyebrow:'Work / Kora Health',h1:['Healthcare that','feels human.'],lede:'A patient-first platform that makes complex healthcare journeys feel simple, clear, and human.',mockLabel:'KORA',appTitle:'Every step of care, in one place.',metrics:[['12K+','Active patients'],['94%','Satisfaction score'],['38%','Fewer missed visits'],['24/7','Care support']],meta:[['Industry','Healthcare'],['Service','Product Design, UX Strategy'],['Timeline','6 Months'],['Platform','Web Application']],overview:'Kora Health came to Aesthetix Studio to rebuild how patients move through care. The goal was a platform that reduces friction, builds trust, and keeps every patient informed at each step of their journey.',ovMetrics:[['42%','Faster patient onboarding'],['31%','Fewer support tickets'],['96%','Patient satisfaction'],['25%','Reduction in no-shows']],challengeTitle:'Fragmented care.<br>Overwhelmed patients.<br>Complex journeys.',challenge:"Patients juggled phone calls, paperwork, and disconnected portals. Staff spent hours on manual coordination, and too many patients fell through the cracks.",solutionTitle:'One clear path<br>through every<br>step of care.',solution:'We designed a single, calm interface for scheduling, messaging, and care plans. Patients always know what is next, and staff spend less time chasing and more time caring.',impact:'A platform patients actually trust.',impactText:'Kora Health now delivers a care experience that patients understand and staff can rely on — measured in better outcomes and fewer missed steps.',quote:'Aesthetix Studio gave our patients a platform they actually enjoy using. Onboarding is faster, and our team finally has a tool that works the way care works.',initials:'PN',author:'Dr. Priya Nair',role:'Chief Medical Officer, Kora Health',side2:'Appointments',side3:'Messages',side4:'Care plan',side5:'Records',dashWelcome:'Welcome back, Dr. Mehta',dashLabel:"Today's visits",dashValue:'14 scheduled',phoneLabel:'Care plan',phoneValue:'On track',card1Badge:'On track',card1Title:'Care plan',card1Desc:'A clear plan for every stage of treatment.',card2Title:'Private by design',card2Desc:'Health records protected end to end.'};
const dVertex={slug:'vertex',eyebrow:'Work / Vertex',h1:['From data to','decisions.'],lede:'An analytics platform that turns operational data into decisions teams can act on.',mockLabel:'VERTEX',appTitle:'Operational data, ready for decisions.',metrics:[['40K','Events per day'],['3.1x','Faster reporting'],['92%','Weekly adoption'],['99.9%','Uptime']],meta:[['Industry','Analytics'],['Service','Web Development, Product Design'],['Timeline','5 Months'],['Platform','Web Application']],overview:'Vertex needed an analytics platform their teams would actually use. Aesthetix Studio rebuilt the experience around the questions teams ask, not raw dashboards.',ovMetrics:[['3.1x','Faster reporting cycles'],['92%','Weekly team adoption'],['40K','Events processed daily'],['99.9%','Platform uptime']],challengeTitle:'Dashboards nobody used.<br>Data nobody trusted.',challenge:"Legacy dashboards were slow, dense, and out of sync. Decisions relied on spreadsheets and instinct because the platform could not answer questions in time.",solutionTitle:'Insights teams<br>can act on.',solution:"We rebuilt the experience around workflows: alerts that matter, reports that explain themselves, and views tuned to each team. The data finally drives the work.",impact:'Decisions, made faster.',impactText:'Vertex teams now find answers in seconds instead of days, and the platform has become the source of truth for operational decisions.',quote:'Aesthetix Studio turned our analytics into something people actually open. Reporting went from days to minutes.',initials:'RM',author:'Ravi Menon',role:'VP of Operations, Vertex',side2:'Metrics',side3:'Alerts',side4:'Reports',side5:'Sources',dashWelcome:'Welcome back, Analyst',dashLabel:'Active dashboards',dashValue:'12 synced',phoneLabel:'Alerts',phoneValue:'3 open',card1Badge:'Live',card1Title:'Real-time metrics',card1Desc:'Operational metrics updated as events stream in.',card2Title:'Trusted data',card2Desc:'One source of truth your teams can rely on.'};
Object.assign(pages,{
"work/luminary-financial.html":['Case Study — Luminary Financial Platform — Aesthetix Studio','How Aesthetix Studio redesigned Luminary Financial\'s wealth management platform: simplified data visualisation, personalised insights and a 40% engagement lift.','work',caseStudy(dLum)],
"work/kora-health.html":['Case Study — Kora Health Patient Platform — Aesthetix Studio','How Aesthetix Studio built a patient-first healthcare platform for Kora Health: one calm interface for scheduling, messaging and care plans.','work',caseStudy(dKora)],
"work/vertex.html":['Case Study — Vertex Analytics Platform — Aesthetix Studio','How Aesthetix Studio rebuilt Vertex\'s analytics platform around the questions teams actually ask, taking reporting cycles from days down to minutes.','work',caseStudy(dVertex)]
});
const ADMIN_TOOL=new Set(['feedback.html','meeting-notes.html','project-timeline.html','files-deliverables.html','tasks.html','messages.html','subscriptions.html']);
for(const [file,[title,description,key,body]] of Object.entries(pages)){const route=file==='index.html'?'/':'/'+file.replace(/\.html$/,'');const html=ADMIN_TOOL.has(file)?head.replace('{{TITLE}}',title).replace('{{DESCRIPTION}}',description).replaceAll('{{URL}}',route)+body:page(title,description,key,body,route);write(file,seo(html,route));}
/* sitemap: clean canonical URLs (no .html), error pages excluded */
/* private: the admin surface (pages that load js/admin.js) + auth screens — the API is
   bearer-gated, but don't advertise the screens to crawlers either. Keep in sync with
   the Disallow list in robots.txt and the GATED set asserted by scripts/serve.mjs --check. */
const PRIVATE=new Set(['dashboard.html','leads.html','forms.html','feedback.html','meeting-notes.html','project-timeline.html','proposal-generator.html','files-deliverables.html','tasks.html','messages.html','calendar.html','design-brief-analyzer.html','subscriptions.html','ai-chat-assistant.html','brand-audit-tool.html','search.html','login.html','signup.html','forgot-password.html','reset-password.html','verify-email.html','admin-testimonials.html','admin-categories.html','admin-tags.html','admin-comments.html','admin-pages.html','admin-lead-sources.html','admin-activity.html','admin-system-health.html','admin-ai-writer.html','admin-integrations.html','admin-roles.html','knowledge-base.html','design-system.html','client-review.html']);
const clean=Object.keys(pages).filter(f=>f.endsWith('.html')&&f!=='404.html'&&f!=='500.html'&&!PRIVATE.has(f)).map(f=>f==='index.html'?'':f.replace(/\.html$/,'')).sort();
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${clean.map(u=>`  <url>
    <loc>${SITE}/${u}</loc>
  </url>`).join('\n')}
</urlset>\n`);
console.log(`✓ generated ${Object.keys(pages).length} Aesthetix pages + sitemap (${clean.length} URLs)`);





// ──

/* ponytail: the 14 prototype-quality pages (marketing, auth, dashboard, discovery) are
   hand-crafted and live in site/proto/ — copied verbatim over the generated versions so
   builds never clobber them. Edit those files, not the generated HTML. */
const protoDir=path.join(root,'site','proto');
for(const f of fs.readdirSync(protoDir))write(f,seo(read(path.join('site','proto',f)),'/'+f.replace(/\.html$/,'').replace(/^index$/,'')));
