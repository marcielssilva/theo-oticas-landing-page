import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import { EXTERNAL_LINK_PROPS, siteConfig, whatsappLink } from "@/config/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Section, SectionHeading } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

const DEFAULTS = {
  section_title: "Fale com a gente",
  section_subtitle: "Contato",
  address_value: siteConfig.address.full,
  address_url: siteConfig.address.mapsUrl,
  whatsapp_number: siteConfig.whatsapp.display,
  whatsapp_url: whatsappLink(),
  instagram_handle: siteConfig.instagram.handle,
  instagram_url: siteConfig.instagram.url,
};

export default function Contact() {
  const content = useSiteContent("contact", DEFAULTS);

  const channels = [
    {
      icon: <WhatsAppIcon className="h-6 w-6" />,
      label: "WhatsApp",
      value: content.whatsapp_number,
      href: content.whatsapp_url,
      cta: "Enviar mensagem",
      featured: true,
    },
    {
      icon: <MapPin className="h-6 w-6" aria-hidden />,
      label: "Endereço",
      value: content.address_value,
      href: content.address_url,
      cta: "Ver no mapa",
      featured: false,
    },
    {
      icon: <InstagramIcon className="h-6 w-6" />,
      label: "Instagram",
      value: content.instagram_handle,
      href: content.instagram_url,
      cta: "Seguir o perfil",
      featured: false,
    },
  ];

  return (
    <Section id="contato" aria-labelledby="contato-titulo">
      <SectionHeading
        id="contato-titulo"
        eyebrow={content.section_subtitle}
        title={content.section_title}
        description="Chame no WhatsApp, passe na loja ou acompanhe as novidades pelo Instagram."
      />

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
        {channels.map((channel) => (
          <ChannelCard key={channel.label} {...channel} />
        ))}
      </div>
    </Section>
  );
}

function ChannelCard({
  icon,
  label,
  value,
  href,
  cta,
  featured,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  cta: string;
  featured: boolean;
}) {
  return (
    <a
      href={href}
      {...EXTERNAL_LINK_PROPS}
      className={cn(
        "group flex flex-col items-center rounded-card border p-7 text-center transition-all duration-300 ease-smooth",
        "hover:-translate-y-1",
        featured
          ? "border-brand/50 bg-brand/[0.07] hover:border-brand hover:shadow-brand"
          : "border-border bg-card shadow-card hover:border-brand/40 hover:shadow-lifted",
      )}
    >
      <span
        className={cn(
          "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full text-brand transition-colors",
          featured ? "bg-brand/15 border border-brand/40" : "bg-brand/10 border border-brand/25",
          "group-hover:bg-brand/20",
        )}
      >
        {icon}
      </span>

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground">
        {value}
      </p>

      <span className="mt-5 text-sm font-semibold text-brand group-hover:text-brand-light">
        {cta}
      </span>
    </a>
  );
}
