import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  section_title: "Nossos Serviços",
  section_subtitle: "O que oferecemos",
  service_1_title: "Armações Modernas",
  service_1_desc: "Coleção completa de armações de grau para todos os estilos: clássico, moderno, esportivo e fashion. Encontre a que combina com você.",
  service_2_title: "Óculos de Sol",
  service_2_desc: "Proteja seus olhos com elegância. Modelos nacionais e importados, com proteção UV400 e lentes de qualidade superior.",
  service_3_title: "Atendimento Personalizado",
  service_3_desc: "Nossa equipe está pronta para te ajudar a encontrar o produto ideal. Clique aqui e fale conosco agora mesmo!",
};

const icons = [
  <svg key="1" viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden><rect x="4" y="22" width="56" height="20" rx="10" stroke="currentColor" strokeWidth="3"/><circle cx="18" cy="32" r="8" stroke="currentColor" strokeWidth="3"/><circle cx="46" cy="32" r="8" stroke="currentColor" strokeWidth="3"/><line x1="26" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="3"/></svg>,
  <svg key="2" viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden><path d="M8 28C8 20 14 14 22 14H42C50 14 56 20 56 28V36C56 44 50 50 42 50H22C14 50 8 44 8 36V28Z" stroke="currentColor" strokeWidth="3"/><ellipse cx="22" cy="32" rx="9" ry="9" stroke="currentColor" strokeWidth="3"/><ellipse cx="42" cy="32" rx="9" ry="9" stroke="currentColor" strokeWidth="3"/><line x1="3" y1="28" x2="8" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><line x1="56" y1="30" x2="61" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>,
  <svg key="3" viewBox="0 0 64 64" className="w-10 h-10" fill="none" aria-hidden><circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="3"/><path d="M10 52C10 42 20 36 32 36C44 36 54 42 54 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M26 30 L20 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M38 30 L44 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
];

export default function Services() {
  const { data: content } = useSiteContent("services");
  const c = { ...DEFAULTS, ...content };

  const services = [
    { icon: icons[0], title: c.service_1_title, description: c.service_1_desc, href: null },
    { icon: icons[1], title: c.service_2_title, description: c.service_2_desc, href: null },
    { icon: icons[2], title: c.service_3_title, description: c.service_3_desc, href: "#contato" },
  ];

  const handleCardClick = (href: string | null) => {
    if (!href) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">{c.section_subtitle}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">{c.section_title}</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-5 opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => (
            <div key={s.title} onClick={() => handleCardClick(s.href)} className={`group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-gold)] ${s.href ? "cursor-pointer" : ""}`}>
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary/70 transition-all duration-300" />
              <div className="text-primary mb-6">{s.icon}</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              {s.href && (
                <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold tracking-wide">
                  <span>Falar conosco</span>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden><path d="M3.5 8a.5.5 0 0 1 .5-.5h6.293L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4a.5.5 0 0 1-.5-.5z"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
