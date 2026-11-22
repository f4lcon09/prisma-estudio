import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServicesStrip } from "@/components/ServicesStrip";
import { ProjectBuilder } from "@/components/ProjectBuilder";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <HeroStage />
        <ProjectsShowcase />
        <ServicesStrip />
        <ProjectBuilder />
      </main>

      <SiteFooter
        waContextMessage={`Olá! Vim pelo site (${siteConfig.brandName}) e gostaria de conversar sobre um projeto.`}
      />
    </div>
  );
}
