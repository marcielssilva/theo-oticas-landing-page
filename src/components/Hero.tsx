import heroImg from "@/assets/hero-oticas.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULTS = {
  badge: "✦ Itapetininga — SP",
  title_line1: "Enxergue o mundo",
  title_line2: "com estilo",
  subtitle: "Na Theo Óticas, você encontra armações modernas, óculos de sol e atendimento exclusivo para realçar o seu olhar.",
  highlight_1: "Armações exclusivas",
  highlight_2: "Óculos de sol premium",
  highlight_3: "Atendimento personalizado",
  hero_image_url: "",
};

const WHATSAPP_URL =
  "https://wa.me/5515996869669?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!";
const INSTAGRAM_URL = "https://www.instagram.com/theo.oticas";

export default function Hero() {
  const { data: content } = useSiteContent("hero");
  const c = { ...DEFAULTS, ...content };
  const bgImage = c.hero_image_url || heroImg;

  const highlights = [
    { icon: "✦", text: c.highlight_1 },
    { icon: "✦", text: c.highlight_2 },
    { icon: "✦", text: c.highlight_3 },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <img src={bgImage} alt="Interior da Theo Óticas" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-28 pb-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6 bg-gold/10">
            {c.badge}
          </span>

          <h1 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            {c.title_line1}<br />
            <span className="text-white">{c.title_line2}</span>
          </h1>

          <p className="text-white text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            {c.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-gold hover:bg-gold-light text-primary-foreground font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-[var(--shadow-gold)] text-base">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.855L.057 23.776a.5.5 0 0 0 .612.637l6.122-1.607A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.17-1.446l-.37-.22-3.635.954.971-3.542-.242-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Falar no WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 border border-gold/50 hover:border-gold text-gold hover:bg-gold/10 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-base">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Ver Instagram
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-2">
                <span className="text-gold text-sm">{h.icon}</span>
                <span className="text-foreground/70 text-sm font-medium">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
