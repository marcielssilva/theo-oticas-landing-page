import framesImg from "@/assets/frames-collection.jpg";
import framesDetail from "@/assets/frames-detail.jpg";
import sunglassesImg from "@/assets/sunglasses-collection.jpg";
import sunglassesDetail from "@/assets/sunglasses-detail.jpg";

/**
 * Catálogo único da loja.
 *
 * Antes a mesma lista existia copiada dentro de ProductCarousel e
 * ProductCatalog — editar um produto exigia lembrar dos dois arquivos.
 * Quando o catálogo migrar para o Supabase, basta trocar este módulo por
 * um fetch; nenhum componente precisa mudar.
 */

export const PRODUCT_CATEGORIES = ["Armação Moderna", "Óculos de Sol"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductTag = "Novo" | "Destaque" | "Mais vendido";

export interface Product {
  id: number;
  category: ProductCategory;
  name: string;
  style: string;
  tag: ProductTag | null;
  images: string[];
  description: string;
  material: string;
  gender: "Masculino" | "Feminino" | "Unissex";
}

/** Rótulo curto usado nos badges dos cards. */
export const CATEGORY_SHORT_LABEL: Record<ProductCategory, string> = {
  "Armação Moderna": "Armação",
  "Óculos de Sol": "Sol",
};

export const products: Product[] = [
  {
    id: 1,
    category: "Armação Moderna",
    name: "Silver Classic",
    style: "Metal fino • Unissex",
    tag: "Novo",
    images: [framesImg, framesDetail],
    material: "Metal fino",
    gender: "Unissex",
    description:
      "Design clean e atemporal em metal fino. Armação leve e versátil, perfeita para o dia a dia no escritório ou passeio. Disponível em diferentes tamanhos de lentes.",
  },
  {
    id: 2,
    category: "Armação Moderna",
    name: "Quadrado Titanium",
    style: "Titanium • Masculino",
    tag: "Destaque",
    images: [framesImg, framesDetail],
    material: "Titanium",
    gender: "Masculino",
    description:
      "Formato quadrado com hastes de titanium de alta resistência. Extremamente leve e durável, ideal para quem busca robustez sem abrir mão do estilo.",
  },
  {
    id: 3,
    category: "Armação Moderna",
    name: "Oval Elegance",
    style: "Aço inox • Feminino",
    tag: null,
    images: [framesImg, framesDetail],
    material: "Aço inox",
    gender: "Feminino",
    description:
      "Linhas suaves e femininas em aço inoxidável de alta qualidade. Moldura oval que valoriza os traços do rosto e confere um visual delicado e refinado.",
  },
  {
    id: 4,
    category: "Armação Moderna",
    name: "Slim Round",
    style: "Metal fino • Unissex",
    tag: "Novo",
    images: [framesImg, framesDetail],
    material: "Metal fino",
    gender: "Unissex",
    description:
      "Armação redonda com perfil ultra-slim, inspirada no estilo retrô contemporâneo. Combina com diferentes estilos de vestimenta e personalidades.",
  },
  {
    id: 5,
    category: "Armação Moderna",
    name: "Executive Pro",
    style: "Titanium • Masculino",
    tag: null,
    images: [framesImg, framesDetail],
    material: "Titanium",
    gender: "Masculino",
    description:
      "Modelo executivo de alta performance em titanium premium. Indicado para profissionais que precisam de conforto durante longas jornadas de uso.",
  },
  {
    id: 6,
    category: "Óculos de Sol",
    name: "Aviator Premium",
    style: "UV400 • Unissex",
    tag: "Mais vendido",
    images: [sunglassesImg, sunglassesDetail],
    material: "Metal",
    gender: "Unissex",
    description:
      "Clássico Aviator com proteção UV400 completa. Um ícone do design que nunca sai de moda. Lentes de alta clareza com tratamento anti-reflexo.",
  },
  {
    id: 7,
    category: "Óculos de Sol",
    name: "Wayfarer Dark",
    style: "Polarizado • Masculino",
    tag: null,
    images: [sunglassesImg, sunglassesDetail],
    material: "Acetato",
    gender: "Masculino",
    description:
      "Estilo Wayfarer clássico com lentes polarizadas para redução máxima de reflexos. Ideal para direção e atividades ao ar livre com conforto visual superior.",
  },
  {
    id: 8,
    category: "Óculos de Sol",
    name: "Cat-Eye Luxe",
    style: "UV400 • Feminino",
    tag: "Destaque",
    images: [sunglassesImg, sunglassesDetail],
    material: "Acetato",
    gender: "Feminino",
    description:
      "Formato cat-eye sofisticado com acabamento luxuoso. Realça os traços femininos e adiciona glamour a qualquer produção. Proteção UV400.",
  },
  {
    id: 9,
    category: "Óculos de Sol",
    name: "Shield Sport",
    style: "Espelhado • Unissex",
    tag: null,
    images: [sunglassesImg, sunglassesDetail],
    material: "Policarbonato",
    gender: "Unissex",
    description:
      "Design esportivo com lente única espelhada de alta resistência. Proteção total contra raios UV e impactos. Indicado para esportes e atividades intensas.",
  },
  {
    id: 10,
    category: "Óculos de Sol",
    name: "Retro Round",
    style: "Polarizado • Unissex",
    tag: "Novo",
    images: [sunglassesImg, sunglassesDetail],
    material: "Metal + Acetato",
    gender: "Unissex",
    description:
      "Formato redondo retrô com lentes polarizadas e armação mista em metal e acetato. Um modelo cheio de personalidade que combina com estilo vintage e moderno.",
  },
];

/** Remove acentos e caixa para que "armacao" encontre "Armação". */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterProducts(
  list: Product[],
  { category, search }: { category: string; search: string },
): Product[] {
  const term = normalize(search);

  return list.filter((product) => {
    const matchesCategory = category === "Todos" || product.category === category;
    if (!matchesCategory) return false;
    if (!term) return true;

    return [product.name, product.category, product.material, product.style, product.gender]
      .map(normalize)
      .some((field) => field.includes(term));
  });
}
