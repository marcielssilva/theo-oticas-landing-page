import { EXTERNAL_LINK_PROPS, siteConfig, whatsappLink } from "@/config/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

const DEFAULTS = {
  subtitle: "Pronto para ver melhor?",
  title: "Passe na loja hoje mesmo",
  description:
    "Estamos no Mercadão Municipal de Itapetininga. Mande uma mensagem antes e já deixamos os modelos separados para você experimentar.",
  whatsapp_url: whatsappLink(),
};

export default function CTASection() {
  const content = useSiteContent("cta", DEFAULTS);

  return (
    <section
      className="section relative overflow-hidden bg-surface-raised"
      aria-labelledby="cta-titulo"
    >
      {/*
        O brilho de fundo usava um dourado fixo (hsl(43,74%,55%)) sobrando da
        paleta antiga — destoava nos dois temas. Agora sai do token da marca.
      */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[120vw]
                   -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-2xl"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--brand)) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container relative max-w-2xl text-center">
        <p className="eyebrow">{content.subtitle}</p>

        <h2
          id="cta-titulo"
          className="mt-4 font-display text-display-lg font-bold text-foreground"
        >
          {content.title}
        </h2>

        <p className="measure mx-auto mt-5 whitespace-pre-line text-lead text-muted-foreground">
          {content.description}
        </p>

        <a
          href={content.whatsapp_url}
          {...EXTERNAL_LINK_PROPS}
          className="btn-primary btn-lg mt-9 text-base"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Falar no WhatsApp
        </a>

        <p className="mt-4 text-sm text-muted-foreground">
          {siteConfig.whatsapp.display} · {siteConfig.hours[0].days}, {siteConfig.hours[0].time}
        </p>
      </div>
    </section>
  );
}
