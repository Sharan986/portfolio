import { Marquee } from "@/components/ui/marquee";
import {
  HTML5,
  CSS3,
  JavaScript,
  TypeScript,
  React,
  NextJs,
  TailwindCSS,
  NodeJs,
  MongoDB,
  VercelLight,
  Android,
  AppleLight,
  Flutter,
  Kotlin,
  Swift,
  Firebase,
  Supabase,
  GitHubLight,
  Git,
  PostgreSQL,
} from "developer-icons";

export default function TechStackMarquee() {
  const iconProps = { size: 48, className: "mx-6 opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" };

  return (
    <section className="bg-[#0C0C0C] py-20 overflow-hidden border-y border-white/[0.04] relative flex flex-col gap-6">

      {/* Ambient glow in center */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(115,197,222,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col gap-6">
        {/* Web Dev Layer - Moves left */}
        <Marquee pauseOnHover className="[--duration:50s]">
          <HTML5 {...iconProps} />
          <CSS3 {...iconProps} />
          <JavaScript {...iconProps} />
          <TypeScript {...iconProps} />
          <React {...iconProps} />
          <NextJs {...iconProps} />
          <TailwindCSS {...iconProps} />
          <NodeJs {...iconProps} />
          <MongoDB {...iconProps} />
          <PostgreSQL {...iconProps} />
          <VercelLight {...iconProps} />
          <Git {...iconProps} />
          <GitHubLight {...iconProps} />
        </Marquee>

        {/* App Dev & Systems Layer - Moves right */}
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          <Android {...iconProps} />
          <AppleLight {...iconProps} />
          <React {...iconProps} />
          {/* <Flutter {...iconProps} />
          <Kotlin {...iconProps} />
          <Swift {...iconProps} /> */}
          <JavaScript {...iconProps} />
          <TypeScript {...iconProps} />
          <Firebase {...iconProps} />
          <Supabase {...iconProps} />
          <NodeJs {...iconProps} />
          <GitHubLight {...iconProps} />
        </Marquee>
      </div>

    </section>
  );
}
