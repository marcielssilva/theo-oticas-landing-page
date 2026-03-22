const stats = [
  { value: "100+", label: "Marcas disponíveis" },
  { value: "5★", label: "Avaliação dos clientes" },
  { value: "100%", label: "Satisfação garantida" },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-navy-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="text-gold text-sm tracking-[0.25em] uppercase font-medium">
              Nossa história
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Sobre a{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                Theo Óticas
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />

            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                A Theo Óticas nasceu da paixão por ajudar as pessoas a enxergar
                melhor o mundo — com saúde, conforto e muito estilo. Localizada
                no coração de Itapetininga, no Mercadão Municipal, somos
                referência em produtos ópticos de qualidade.
              </p>
              <p>
                Trabalhamos com as melhores marcas do mercado e oferecemos
                armações para todos os gostos e necessidades, além de óculos de
                sol com proteção UV400. Nosso diferencial é o atendimento
                humano e personalizado.
              </p>
              <p>
                Venha nos visitar e descubra por que tantos clientes escolhem a
                Theo Óticas como parceira da sua visão.
              </p>
            </div>
          </div>

          {/* Stats side */}
          <div className="grid grid-cols-1 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-6 bg-card border border-border rounded-xl p-6 hover:border-gold/40 transition-colors duration-300"
              >
                <span
                  className="font-display text-4xl font-bold text-transparent bg-clip-text min-w-[80px]"
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                >
                  {s.value}
                </span>
                <span className="text-foreground/80 text-base font-medium">{s.label}</span>
              </div>
            ))}

            {/* Address card */}
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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Rua Coronel Pedro Dias Batista, BOX 04<br />
                    Mercadão Municipal — Centro<br />
                    Itapetininga — SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
