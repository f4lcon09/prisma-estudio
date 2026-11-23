import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServicesStrip } from "@/components/ServicesStrip";
import { ProcessSection } from "@/components/ProcessSection";
import { FaqSection } from "@/components/FaqSection";
import { ProjectBuilder } from "@/components/ProjectBuilder";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden pb-[calc(72px+env(safe-area-inset-bottom,0px))] md:pb-0">
      <Header />

      <main className="flex-1">
        <HeroStage />
        <ProjectsShowcase />
        <ServicesStrip />
        <ProcessSection />
        <FaqSection />
        <ProjectBuilder />
      </main>

      <SiteFooter
        waContextMessage={`Olá! Vim pelo site (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`}
      />

      <MobileActionBar />
    </div>
  );
}
