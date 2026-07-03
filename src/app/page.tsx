import type { Metadata } from "next";
import { config } from "@/config";
import HeroSection from "@/components/HeroSection";
import InteractiveSkillsSection from "@/components/InteractiveSkillsSection";
import ProjectGrid from "@/components/ProjectGrid";
import CareerJourney from "@/components/CareerJourney";
import AnimalGallery from "@/components/AnimalGallery";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: config.title,
  description: config.shortDescription,
  keywords: [
    config.name,
    "Python Engineer",
    "SDET",
    "LangGraph",
    "AI Agent",
    "AWS Lambda",
    "Snowflake",
    "Automation",
  ],
  openGraph: {
    title: config.title,
    description: config.shortDescription,
    type: "website",
  },
};

export default function Home() {
  return (
    <main style={{ background: "#111111", color: "#ededed", minHeight: "100vh" }}>
      <HeroSection />
      <InteractiveSkillsSection />
      <ProjectGrid />
      <CareerJourney />
      <AnimalGallery />
      <ContactFooter />
    </main>
  );
}
