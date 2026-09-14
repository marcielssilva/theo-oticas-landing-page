import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { EXTERNAL_LINK_PROPS, siteConfig, whatsappLink } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { GlassesIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import CartDrawer from "@/components/CartDrawer";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const location = useLocation();

  // Só a home tem hero de imagem atrás do header; nas outras rotas ele já
  // nasce sólido, senão os links ficavam ilegíveis sobre o fundo claro.
  const overlayMode = location.pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar — antes ele continuava aberto por cima da página.
  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors duration-200",
      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0",
      "after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100",
      isActive ? "text-brand after:scale-x-100" : "text-foreground/70 hover:text-foreground",
    );

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm
                   focus:font-semibold focus:text-brand-foreground"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          overlayMode
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-background/90 shadow-card backdrop-blur-md",
        )}
      >
        <div className="container flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} — início`}>
            <GlassesIcon className="h-5 w-auto text-brand" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-wide text-foreground">
                {siteConfig.shortName}
              </span>
              <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-brand">
                Óticas
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) =>
              link.href.includes("#") ? (
                <a key={link.href} href={link.href} className={linkClass({ isActive: false })}>
                  {link.label}
                </a>
              ) : (
                <NavLink key={link.href} to={link.href} end className={linkClass}>
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5 md:gap-2.5">
            <IconButton
              onClick={toggleTheme}
              label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </IconButton>

            {/* O carrinho agora vive no header e acompanha o visitante em todas as páginas. */}
            <IconButton
              onClick={() => setCartOpen(true)}
              label={`Abrir carrinho${totalItems > 0 ? ` com ${totalItems} item(ns)` : " (vazio)"}`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              {totalItems > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center
                             rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground"
                >
                  {totalItems}
                </span>
              )}
            </IconButton>

            <a
              href={whatsappLink()}
              {...EXTERNAL_LINK_PROPS}
              className="btn-primary btn-md hidden md:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>

            <IconButton
              className="md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              label={menuOpen ? "Fechar menu" : "Abrir menu"}
              expanded={menuOpen}
              controls="menu-mobile"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </IconButton>
          </div>
        </div>

        <div
          id="menu-mobile"
          hidden={!menuOpen}
          className="border-t border-border bg-background/98 backdrop-blur-md md:hidden"
        >
          <nav className="container flex flex-col py-3" aria-label="Navegação">
            {NAV_LINKS.map((link) =>
              link.href.includes("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-3.5 text-base font-medium text-foreground/80 last:border-0"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-border/60 py-3.5 text-base font-medium last:border-0",
                      isActive ? "text-brand" : "text-foreground/80",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}

            <a
              href={whatsappLink()}
              {...EXTERNAL_LINK_PROPS}
              className="btn-primary btn-md mt-4 mb-2 w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
  className,
  expanded,
  controls,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  expanded?: boolean;
  controls?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border",
        "text-foreground/70 transition-colors duration-200",
        "hover:border-brand/50 hover:bg-brand/10 hover:text-brand",
        className,
      )}
    >
      {children}
    </button>
  );
}
