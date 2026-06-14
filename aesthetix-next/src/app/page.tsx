import { Hero } from "@/components/hero";
import { MarqueeSection } from "@/components/marquee";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata = {
  title: "Aesthetix Studio | Creative Design & Digital Experience",
  description: "A $50000 premium creative design and digital studio focused on high-end visual aesthetics.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <Hero />
      <MarqueeSection />
      <Work />
      <Process />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
