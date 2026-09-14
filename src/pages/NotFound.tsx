import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EXTERNAL_LINK_PROPS, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 — rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow">Erro 404</p>

        <h1 className="mt-4 font-display text-display-lg font-bold text-foreground">
          Essa página não existe
        </h1>

        <p className="measure mx-auto mt-5 text-muted-foreground">
          O endereço digitado não está no site. Volte para o início ou veja os modelos
          disponíveis no catálogo.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary btn-lg">
            Voltar ao início
          </Link>
          <Link to="/catalogo" className="btn-outline btn-lg">
            Ver catálogo
          </Link>
        </div>

        <a
          href={whatsappLink()}
          {...EXTERNAL_LINK_PROPS}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Falar com a loja
        </a>
      </div>
    </main>
  );
}
