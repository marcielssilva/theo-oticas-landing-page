import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  section_title: "Entre em Contato",
  section_subtitle: "Fale conosco",
  address_value: "Rua Coronel Pedro Dias Batista, BOX 04\nMercadão Municipal — Centro\nItapetininga — SP",
  address_url: "https://maps.google.com/?q=Mercad%C3%A3o+Municipal+Itapetininga",
  whatsapp_number: "(15) 99686-9669",
  whatsapp_url: "https://wa.me/5515996869669?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!",
  instagram_handle: "@theo.oticas",
  instagram_url: "https://www.instagram.com/theo.oticas",
};

export default function Contact() {
  const { data: content } = useSiteContent("contact");
  const c = { ...DEFAULTS, ...content };

  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Endereço",
      value: c.address_value,
      href: c.address_url,
      cta: "Ver no mapa",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.855L.057 23.776a.5.5 0 0 0 .612.637l6.122-1.607A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.17-1.446l-.37-.22-3.635.954.971-3.542-.242-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
      label: "WhatsApp",
      value: c.whatsapp_number,
      href: c.whatsapp_url,
      cta: "Enviar mensagem",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: "Instagram",
      value: c.instagram_handle,
      href: c.instagram_url,
      cta: "Seguir perfil",
    },
  ];

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.25em] uppercase font-medium">{c.section_subtitle}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">{c.section_title}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contacts.map((ct) => (
            <div key={ct.label} className="group bg-card border border-border rounded-2xl p-8 text-center hover:border-gold/50 hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 text-gold mb-5 group-hover:bg-gold/20 transition-colors">{ct.icon}</div>
              <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">{ct.label}</p>
              <p className="text-foreground text-sm font-medium whitespace-pre-line mb-5 leading-relaxed">{ct.value}</p>
              <a href={ct.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light text-sm font-semibold border-b border-gold/40 hover:border-gold/70 pb-0.5 transition-colors">{ct.cta} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
