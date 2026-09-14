/**
 * Fonte única de verdade sobre a marca, contatos e links externos.
 *
 * Qualquer dado institucional (telefone, endereço, redes) deve ser lido daqui.
 * Antes esses valores estavam duplicados em 6 componentes diferentes, o que
 * significava 6 lugares para errar quando algo mudasse.
 */

export const siteConfig = {
  name: "Theo Óticas",
  shortName: "Theo",
  tagline: "Enxergue o mundo com estilo",
  description:
    "Ótica em Itapetininga — SP. Armações de grau, óculos de sol com proteção UV400 e atendimento personalizado no Mercadão Municipal.",
  url: "https://theo-oticas-oficial.vercel.app",

  address: {
    street: "Rua Coronel Pedro Dias Batista, BOX 04",
    complement: "Mercadão Municipal — Centro",
    city: "Itapetininga",
    state: "SP",
    country: "BR",
    postalCode: "18200-000",
    get full() {
      return `${this.street}\n${this.complement}\n${this.city} — ${this.state}`;
    },
    mapsUrl: "https://maps.google.com/?q=Mercad%C3%A3o+Municipal+Itapetininga",
    geo: { latitude: -23.5915, longitude: -48.0531 },
  },

  hours: [
    { days: "Segunda a sexta", time: "08h — 18h" },
    { days: "Sábado", time: "08h — 13h" },
    { days: "Domingo", time: "Fechado" },
  ],

  whatsapp: {
    /** Somente dígitos, com DDI — formato exigido pela API wa.me */
    raw: "5515996869669",
    display: "(15) 99686-9669",
  },

  instagram: {
    handle: "@theo.oticas",
    url: "https://www.instagram.com/theo.oticas",
  },
} as const;

/** Mensagem padrão de quem chega pelo site. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e gostaria de mais informações.";

/**
 * Monta um link wa.me já codificado.
 * Usar sempre esta função em vez de colar URLs prontas no JSX.
 */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const base = `https://wa.me/${siteConfig.whatsapp.raw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Atributos que todo link externo deve carregar (segurança + sem warning de lint). */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
