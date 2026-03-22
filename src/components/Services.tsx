const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden>
        <rect x="4" y="22" width="56" height="20" rx="10" stroke="currentColor" strokeWidth="3"/>
        <circle cx="18" cy="32" r="8" stroke="currentColor" strokeWidth="3"/>
        <circle cx="46" cy="32" r="8" stroke="currentColor" strokeWidth="3"/>
        <line x1="26" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="3"/>
      </svg>
    ),
    title: "Armações Modernas",
    description:
      "Coleção completa de armações de grau para todos os estilos: clássico, moderno, esportivo e fashion. Encontre a que combina com você.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden>
        <path d="M8 28C8 20 14 14 22 14H42C50 14 56 20 56 28V36C56 44 50 50 42 50H22C14 50 8 44 8 36V28Z" stroke="currentColor" strokeWidth="3"/>
        <ellipse cx="22" cy="32" rx="9" ry="9" stroke="currentColor" strokeWidth="3"/>
        <ellipse cx="42" cy="32" rx="9" ry="9" stroke="currentColor" strokeWidth="3"/>
        <line x1="3" y1="28" x2="8" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="30" x2="61" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Óculos de Sol",
    description:
      "Proteja seus olhos com elegância. Modelos nacionais e importados, com proteção UV400 e lentes de qualidade superior.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden>
        <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="3"/>
        <path d="M10 52C10 42 20 36 32 36C44 36 54 42 54 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M26 30 L20 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 30 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Atendimento Personalizado",
    description:
      "Nossa equipe está pronta para te ajudar a encontrar o produto ideal. Venha nos visitar no Mercadão Municipal de Itapetininga.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.25em] uppercase font-medium">
            O que oferecemos
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
            Nossos Serviços
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-gold/50 transition-all duration-300 hover:shadow-[var(--shadow-gold)]"
            >
              {/* Gold top bar */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent group-hover:via-gold/70 transition-all duration-300" />

              <div className="text-gold mb-6">{s.icon}</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
