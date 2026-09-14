import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Casca padrão de seção.
 *
 * O espaçamento vertical, o container e o alinhamento do cabeçalho estavam
 * copiados em todas as seções com valores levemente diferentes (py-20 aqui,
 * py-24 ali, mb-16 numa e mb-10 noutra). Centralizar aqui deixa o ritmo da
 * página uniforme e reduz o JSX de cada seção.
 */

type Tone = "base" | "raised" | "contrast";

const TONE_CLASS: Record<Tone, string> = {
  base: "bg-background",
  raised: "bg-surface-raised",
  contrast: "bg-surface-raised",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  /** Desativa o container interno quando a seção precisa sangrar (ex.: carrossel). */
  bleed?: boolean;
  "aria-labelledby"?: string;
}

export function Section({
  id,
  tone = "base",
  className,
  children,
  bleed = false,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn("section", TONE_CLASS[tone], className)} {...rest}>
      {bleed ? children : <div className="container">{children}</div>}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <h2 id={id} className="font-display text-display-lg font-bold text-foreground">
        {title}
      </h2>

      <span className="rule" aria-hidden />

      {description && (
        <p className={cn("measure text-muted-foreground text-lead", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </header>
  );
}
