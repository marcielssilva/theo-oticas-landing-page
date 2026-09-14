import { MapPin } from "lucide-react";
import heroImg from "@/assets/hero-oticas.jpg";
import { EXTERNAL_LINK_PROPS, siteConfig, whatsappLink } from "@/config/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

const DEFAULTS = {
  badge: `${siteConfig.address.city} — ${siteConfig.address.state}`,
  title_line1: "Enxergue o mundo",
  title_line2: "com estilo",
  subtitle:
    "Armações modernas, óculos de sol com proteção UV400 e um atendimento que leva tempo para entender o seu rosto, o seu dia a dia e o seu gosto.",
  highlight_1: "Armações exclusivas",
  highlight_2: "Óculos de sol premium",
  highlight_3: "Atendimento personalizado",
  hero_image_url: "",
};

export default function Hero() {
  const content = useSiteContent("hero", DEFAULTS);
  const background = content.hero_image_url || heroImg;

  const highlights = [content.highlight_1, content.highlight_2, content.highlight_3];

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      aria-labelledby="hero-titulo"
    >
      {/*
        100svh no lugar de 100vh: no mobile a barra do navegador cortava o CTA.
        A imagem é o LCP da página, então carrega eager e com prioridade alta.
      */}
      <img
        src={background}
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-base)" }}
        aria-hidden
      />

      <div className="container relative z-10 pb-14 pt-[calc(var(--header-height)+3rem)] md:pb-20">
        <div className="max-w-2xl">
          <p
            className="inline-flex animate-rise-in items-center gap-2 rounded-full border border-white/25
                       bg-white/10 px-4 py-1.5 text-eyebrow uppercase text-white/90 backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {content.badge}
          </p>

          <h1
            id="hero-titulo"
            className="mt-7 animate-rise-in font-display text-display-xl font-bold text-white"
            style={{ animationDelay: "80ms" }}
          >
            {content.title_line1}
            <br />
            {content.title_line2}
          </h1>

          <p
            className="measure mt-6 animate-rise-in text-lead text-white/75"
            style={{ animationDelay: "160ms" }}
          >
            {content.subtitle}
          </p>

          <div
            className="mt-9 flex animate-rise-in flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "240ms" }}
          >
            <a href={whatsappLink()} {...EXTERNAL_LINK_PROPS} className="btn-primary btn-lg">
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp
            </a>

            <a
              href={siteConfig.instagram.url}
              {...EXTERNAL_LINK_PROPS}
              className="btn btn-lg border border-white/35 text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              <InstagramIcon className="h-5 w-5" />
              Ver o Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Faixa de destaques: ancora o hero na base em vez de deixar o texto solto. */}
      <div className="relative z-10 border-t border-white/15 bg-black/25 backdrop-blur-sm">
        <ul className="container grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2.5 py-3.5 text-sm font-medium text-white/85 sm:justify-center sm:px-4"
            >
              <span className="text-brand" aria-hidden>
                ✦
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
