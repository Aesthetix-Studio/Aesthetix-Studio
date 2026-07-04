import { Link } from "react-router";
import { ArrowRight, MapPin, Mail, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import SEO, { localBusinessSchema } from "../components/SEO";

const services = [
  { name: "Web Design", desc: "Custom responsive websites built to convert visitors into customers." },
  { name: "Brand Identity", desc: "Logo design, brand guidelines, and visual systems for startups." },
  { name: "Web Development", desc: "React, Next.js, and modern tech stack development." },
  { name: "Product Design", desc: "UI/UX design for SaaS products and mobile apps." },
  { name: "Design Systems", desc: "Scalable component libraries and design tokens." },
  { name: "E-Commerce", desc: "Online stores, checkout flows, and payment integration." },
];

const areas = [
  "Falaknuma", "Charminar", "Secunderabad", "Banjara Hills", "Jubilee Hills",
  "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Kukatpally",
  "Ameerpet", "LB Nagar", "Dilsukhnagar", "Tarnaka", "Malkajgiri",
];

const stats = [
  { value: "80+", label: "Brands Launched" },
  { value: "42%", label: "Avg. Conversion Lift" },
  { value: "4.2×", label: "Average ROI" },
  { value: "6+", label: "Years in Hyderabad" },
];

const faqs = [
  { q: "Do you work with clients outside Hyderabad?", a: "Yes. While we're based in Falaknuma, Hyderabad, we serve clients across India and globally. Many of our best relationships started locally and expanded as their businesses grew." },
  { q: "How much does a website cost in Hyderabad?", a: "Our projects start at ₹25,000 for a focused landing page and range to ₹2,50,000+ for full brand + web packages. Every project is scoped based on your specific business goals." },
  { q: "How long does a typical project take?", a: "Most websites launch in 2-4 weeks. Complex SaaS products or full brand identities take 6-8 weeks. We move fast without cutting corners." },
  { q: "Can I meet you in person in Hyderabad?", a: "Absolutely. We're based in Falaknuma and happy to meet at your office, a cafe, or our workspace. Discovery calls are free — no pitch, no pressure." },
];

const reviews = [
  { name: "Dr. Priya Sharma", role: "Founder, PhysioCore", quote: "Our online bookings increased 68% in the first month. Patients love how professional the new site looks.", stars: 5 },
  { name: "Arjun Nair", role: "Head Chef, Saffron Kitchen", quote: "People now say our brand feels as good as our food. That's exactly what we wanted.", stars: 5 },
  { name: "Kenji Watanabe", role: "Founder, Mono Studio", quote: "Clients now say 'your site alone tells me you understand design.' That's the best compliment we've ever received.", stars: 5 },
];

export default function WebDesignHyderabad() {
  return (
    <>
      <SEO
        title="Web Design Agency in Hyderabad | Falaknuma"
        description="Aesthetix Studio is a web design agency in Falaknuma, Hyderabad. We build conversion-focused websites for startups and growing businesses across Telangana. 80+ brands launched, 42% avg. conversion lift."
        url="/web-design-hyderabad"
        structuredData={localBusinessSchema}
      />
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>

      <div className="bg-background min-h-screen">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-brand" />
              <span className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 500 }}>
                Falaknuma, Hyderabad, Telangana
              </span>
            </div>
            <h1
              className="text-foreground mb-5"
              style={{
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Web Design Agency
              <br />
              <span className="text-muted-foreground">in Hyderabad.</span>
            </h1>
            <p
              className="text-muted-foreground max-w-2xl mb-8"
              style={{ fontSize: "17px", lineHeight: 1.65 }}
            >
              We design and build conversion-focused websites, brand systems,
              and digital products for founders and teams across Hyderabad and Telangana.
              80+ brands launched, 42% average conversion lift.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link to="/discovery-call" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand text-white hover:bg-brand-hover transition-all" style={{ fontSize: "14px", fontWeight: 600 }}>
                Book Free Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-border text-foreground hover:bg-card transition-colors" style={{ fontSize: "14px", fontWeight: 500 }}>
                See Our Work
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-foreground" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <h2 className="text-foreground mb-3" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Web Design Services in Hyderabad
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            From landing pages to full-scale SaaS platforms, we build digital experiences that convert visitors into customers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.name} className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <h3 className="text-foreground mb-2" style={{ fontSize: "15px", fontWeight: 700 }}>{service.name}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "13px", lineHeight: 1.6 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="bg-secondary/30 border-y border-border py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <h2 className="text-foreground mb-3" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Serving Businesses Across Hyderabad
            </h2>
            <p className="text-muted-foreground mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
              We're based in Falaknuma and work with clients across the Hyderabad metro area and Telangana.
            </p>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span key={area} className="px-3 py-1.5 rounded-full border border-border bg-background text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <h2 className="text-foreground mb-3" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            What Hyderabad Clients Say
          </h2>
          <p className="text-muted-foreground mb-10" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            4.9/5 rating on Clutch with 50+ verified reviews from businesses across India.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.name} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4" style={{ fontSize: "14px", lineHeight: 1.7, fontStyle: "italic" }}>
                  "{review.quote}"
                </p>
                <div className="border-t border-border/50 pt-3">
                  <div className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{review.name}</div>
                  <div className="text-muted-foreground" style={{ fontSize: "12px" }}>{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card border-y border-border py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="text-foreground mb-10" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-foreground mb-2" style={{ fontSize: "15px", fontWeight: 700 }}>{faq.q}</h3>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Let's Build Something Together
              </h2>
              <p className="text-muted-foreground mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                Based in Falaknuma, Hyderabad. We meet clients across the city — at your office, a cafe, or ours. No pitch, no pressure.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand shrink-0" />
                  <span className="text-foreground" style={{ fontSize: "14px" }}>Falaknuma, Hyderabad, Telangana 500053</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand shrink-0" />
                  <span className="text-foreground" style={{ fontSize: "14px" }}>hello@aesthetixstudio.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand shrink-0" />
                  <span className="text-foreground" style={{ fontSize: "14px" }}>Mon–Fri, 9:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-card p-6">
              <h3 className="text-foreground mb-4" style={{ fontSize: "16px", fontWeight: 700 }}>Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your name" className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground" style={{ fontSize: "14px" }} />
                <input type="email" placeholder="Email address" className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground" style={{ fontSize: "14px" }} />
                <textarea placeholder="Tell us about your project" rows={4} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground resize-none" style={{ fontSize: "14px" }} />
                <button type="submit" className="w-full h-11 rounded-lg bg-brand text-white hover:bg-brand-hover transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
