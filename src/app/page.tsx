import { Navbar } from "@/components/blocks/navbar";
import { LandingSection } from "@/components/blocks/landing-section";
import { AboutSection } from "@/components/blocks/about-section";
import { MarketingSection } from "@/components/blocks/marketing-section";
import { ProjectsSection } from "@/components/blocks/projects-section";
import { ContactSection } from "@/components/blocks/contact-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Upper layer — scrolls over the contact section */}
      <div className="relative z-10 bg-[#0a0a0a]">
        <LandingSection />
        <AboutSection />
        <MarketingSection />
        <ProjectsSection />
      </div>

      {/* Contact — fixed beneath, revealed as upper layer scrolls away */}
      <div className="h-screen" />
      <ContactSection />
    </main>
  );
}
