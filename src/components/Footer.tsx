import { Link } from "react-router-dom";
import { EXTERNAL_LINK_PROPS, siteConfig, whatsappLink } from "@/config/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { GlassesIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

const DEFAULTS = {
  address: `${siteConfig.address.complement}, ${siteConfig.address.city}`,
  whatsapp_url: whatsappLink(),
  instagram_url: siteConfig.instagram.url,
};

const PAGES = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
];

const ANCHORS = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export default function Footer() {
  const content = useSiteContent("footer", DEFAULTS);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <GlassesIcon className="h-5 w-auto text-brand" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-foreground">
                {siteConfig.shortName}
              </span>
              <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-brand">
                Óticas
              </span>
            </span>
          </Link>

          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            {content.address}
          </p>
        </div>

        <nav aria-labelledby="footer-paginas">
          <h2 id="footer-paginas" className="font-display text-sm font-semibold text-foreground">
            Páginas
          </h2>
          <ul className="mt-4 space-y-2.5">
            {PAGES.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {ANCHORS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">Atendimento</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {siteConfig.hours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4 sm:max-w-[16rem]">
                <span>{entry.days}</span>
                <span className="text-foreground/80">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">Contato</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={content.whatsapp_url}
                {...EXTERNAL_LINK_PROPS}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {siteConfig.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={content.instagram_url}
                {...EXTERNAL_LINK_PROPS}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                <InstagramIcon className="h-4 w-4" />
                {siteConfig.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            {siteConfig.address.street} — {siteConfig.address.city}/{siteConfig.address.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
