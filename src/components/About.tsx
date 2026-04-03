import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  section_subtitle: "Nossa história",
  section_title: "Sobre a Theo Óticas",
  paragraph_1: "A Theo Óticas nasceu da paixão por ajudar as pessoas a enxergar melhor o mundo — com saúde, conforto e muito estilo. Localizada no coração de Itapetininga, no Mercadão Municipal, somos referência em produtos ópticos de qualidade.",
  paragraph_2: "Trabalhamos com as melhores marcas do mercado e oferecemos armações para todos os gostos e necessidades, além de óculos de sol com proteção UV400. Nosso diferencial é o atendimento humano e personalizado.",
  paragraph_3: "Venha nos visitar e descubra por que tantos clientes escolhem a Theo Óticas como parceira da sua visão.",
  stat_1_value: "100+", stat_1_label: "Marcas disponíveis",
  stat_2_value: "5★", stat_2_label: "Avaliação dos clientes",
  stat_3_value: "100%", stat_3_label: "Satisfação garantida",
  address: "Rua Coronel Pedro Dias Batista, BOX 04\nMercadão Municipal — Centro\nItapetininga — SP",
};

export default function About() {
  const { data: content } = useSiteContent("about");
  const c = { ...DEFAULTS, ...content };

  const stats = [
    { value: c.stat_1_value, label: c.stat_1_label },
    { value: c.stat_2_value, label: c.stat_2_label },
    { value: c.stat_3_value, label: c.stat_3_label },
  ];

  return (
    <section id="sobre" className="py-24 bg-navy-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold text-sm tracking-[0.25em] uppercase font-medium">{c.section_subtitle}</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-gold)" }}>
                {c.section_title}
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />
            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>{c.paragraph_1}</p>
              <p>{c.paragraph_2}</p>
              <p>{c.paragraph_3}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-6 bg-card border border-border rounded-xl p-6 hover:border-gold/40 transition-colors duration-300">
                <span className="font-display text-4xl font-bold text-transparent bg-clip-text min-w-[80px]" style={{ backgroundImage: "var(--gradient-gold)" }}>{s.value}</span>
                <span className="text-foreground/80 text-base font-medium">{s.label}</span>
              </div>
            ))}

            <div className="bg-card border border-gold/30 rounded-xl p-6 mt-2">
              <div className="flex items-start gap-4">
                <div className="text-gold mt-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm mb-1">Onde nos encontrar</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{c.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
