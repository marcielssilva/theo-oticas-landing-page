const WHATSAPP_URL =
  "https://wa.me/5515996869669?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!";
const INSTAGRAM_URL = "https://www.instagram.com/theo.oticas";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-border py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display text-gold text-xl font-bold tracking-wide">Theo</span>
            <span className="text-foreground/50 text-xs tracking-[0.3em] uppercase -mt-1">Óticas</span>
            <p className="text-muted-foreground text-xs mt-2 text-center md:text-left">
              Mercadão Municipal — Centro, Itapetininga
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {year} Theo Óticas — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
