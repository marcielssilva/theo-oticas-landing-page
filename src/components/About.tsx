import { Clock, MapPin } from "lucide-react";
import { EXTERNAL_LINK_PROPS, siteConfig } from "@/config/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Section } from "@/components/layout/Section";

const DEFAULTS = {
  section_subtitle: "Nossa história",
  section_title: "Sobre a Theo Óticas",
  paragraph_1:
    "A Theo Óticas nasceu da vontade de ajudar as pessoas a enxergar melhor o mundo — com saúde, conforto e estilo. Ficamos no coração de Itapetininga, dentro do Mercadão Municipal.",
  paragraph_2:
    "Trabalhamos com as melhores marcas do mercado, com armações para todos os gostos e óculos de sol com proteção UV400. O que nos diferencia é o atendimento: gente de verdade, sem pressa.",
  paragraph_3:
    "Passe na loja para experimentar os modelos e descobrir por que tantos clientes escolhem a gente como parceira da sua visão.",
  stat_1_value: "100+",
  stat_1_label: "Marcas disponíveis",
  stat_2_value: "5★",
  stat_2_label: "Avaliação dos clientes",
  stat_3_value: "100%",
  stat_3_label: "Satisfação garantida",
  address: siteConfig.address.full,
};

export default function About() {
  const content = useSiteContent("about", DEFAULTS);

  const stats = [
    { value: content.stat_1_value, label: content.stat_1_label },
    { value: content.stat_2_value, label: content.stat_2_label },
    { value: content.stat_3_value, label: content.stat_3_label },
  ];

  return (
    <Section id="sobre" tone="raised" aria-labelledby="sobre-titulo">
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="eyebrow">{content.section_subtitle}</p>

          <h2
            id="sobre-titulo"
            className="mt-4 font-display text-display-lg font-bold text-foreground"
          >
            {content.section_title}
          </h2>

          <span className="rule mt-5" aria-hidden />

          <div className="measure mt-7 space-y-5 leading-relaxed text-muted-foreground">
            <p>{content.paragraph_1}</p>
            <p>{content.paragraph_2}</p>
            <p>{content.paragraph_3}</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Números em faixa única, com divisores: lê-se mais rápido do que
              três cartões empilhados repetindo a mesma moldura. */}
          <dl className="grid grid-cols-3 divide-x divide-border rounded-card border border-border bg-card shadow-card">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-gradient-brand block font-display text-3xl font-bold">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-card border border-brand/30 bg-card p-6 shadow-card">
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-foreground">Onde nos encontrar</p>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {content.address}
                </p>
                <a
                  href={siteConfig.address.mapsUrl}
                  {...EXTERNAL_LINK_PROPS}
                  className="mt-3 inline-block text-sm font-semibold text-brand hover:text-brand-light"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-4 border-t border-border pt-6">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <div className="w-full">
                <p className="text-sm font-semibold text-foreground">Horário de atendimento</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {siteConfig.hours.map((entry) => (
                    <li key={entry.days} className="flex justify-between gap-4">
                      <span>{entry.days}</span>
                      <span className="text-foreground/80">{entry.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
