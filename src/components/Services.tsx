import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Section, SectionHeading } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

const DEFAULTS = {
  section_title: "O que a gente faz",
  section_subtitle: "Serviços",
  service_1_title: "Armações modernas",
  service_1_desc:
    "Coleção completa de armações de grau para todos os estilos: clássico, moderno, esportivo e fashion. Encontre a que combina com você.",
  service_2_title: "Óculos de sol",
  service_2_desc:
    "Proteja seus olhos com elegância. Modelos nacionais e importados, com proteção UV400 e lentes de qualidade superior.",
  service_3_title: "Atendimento personalizado",
  service_3_desc:
    "Nossa equipe ajuda a encontrar o modelo certo para o seu rosto e a sua rotina. Chame a gente e conte o que você procura.",
};

const FrameIcon = (
  <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden>
    <rect x="4" y="22" width="56" height="20" rx="10" stroke="currentColor" strokeWidth="3" />
    <circle cx="18" cy="32" r="8" stroke="currentColor" strokeWidth="3" />
    <circle cx="46" cy="32" r="8" stroke="currentColor" strokeWidth="3" />
    <line x1="26" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="3" />
  </svg>
);

const SunIcon = (
  <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden>
    <path
      d="M8 28C8 20 14 14 22 14H42C50 14 56 20 56 28V36C56 44 50 50 42 50H22C14 50 8 44 8 36V28Z"
      stroke="currentColor"
      strokeWidth="3"
    />
    <circle cx="22" cy="32" r="9" stroke="currentColor" strokeWidth="3" />
    <circle cx="42" cy="32" r="9" stroke="currentColor" strokeWidth="3" />
    <line x1="3" y1="28" x2="8" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="56" y1="30" x2="61" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PersonIcon = (
  <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden>
    <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      d="M10 52C10 42 20 36 32 36C44 36 54 42 54 52"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M26 30 L20 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M38 30 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Services() {
  const content = useSiteContent("services", DEFAULTS);

  const services = [
    { icon: FrameIcon, title: content.service_1_title, description: content.service_1_desc },
    { icon: SunIcon, title: content.service_2_title, description: content.service_2_desc },
    {
      icon: PersonIcon,
      title: content.service_3_title,
      description: content.service_3_desc,
      href: "#contato",
      cta: "Falar com a loja",
    },
  ];

  return (
    <Section id="servicos" aria-labelledby="servicos-titulo">
      <SectionHeading
        id="servicos-titulo"
        eyebrow={content.section_subtitle}
        title={content.section_title}
      />

      <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  const isAction = Boolean(href);

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-card border p-7 transition-all duration-300 ease-smooth md:p-8",
        // O card de atendimento é o único com ação, então é o único destacado.
        // Antes os três eram idênticos e a chamada passava despercebida.
        isAction
          ? "border-brand/45 bg-brand/[0.06] hover:border-brand hover:shadow-brand"
          : "border-border bg-card shadow-card hover:-translate-y-1 hover:border-brand/35 hover:shadow-lifted",
      )}
    >
      <div className="mb-6 text-brand">{icon}</div>

      <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {href && (
        <a
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand
                     transition-colors hover:text-brand-light"
        >
          {cta}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      )}
    </article>
  );
}
