import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  subtitle: "Pronto para ver melhor?",
  title: "Visite a Theo Óticas hoje mesmo",
  description: "Estamos te esperando no Mercadão Municipal de Itapetininga.\nEntre em contato agora e garanta o seu atendimento!",
  whatsapp_url: "https://wa.me/5515996869669?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!",
};

export default function CTASection() {
  const { data: content } = useSiteContent("cta");
  const c = { ...DEFAULTS, ...content };

  return (
    <section className="py-24 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, hsl(43,74%,55%) 0%, transparent 70%)" }} />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 text-center max-w-2xl">
        <span className="text-gold text-sm tracking-[0.25em] uppercase font-medium">{c.subtitle}</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">{c.title}</h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed whitespace-pre-line">{c.description}</p>
        <a href={c.whatsapp_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-primary-foreground font-bold px-10 py-4 rounded-full transition-all duration-200 shadow-[var(--shadow-gold)] text-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.855L.057 23.776a.5.5 0 0 0 .612.637l6.122-1.607A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.17-1.446l-.37-.22-3.635.954.971-3.542-.242-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Falar no WhatsApp
        </a>
      </div>
    </section>
  );
}
