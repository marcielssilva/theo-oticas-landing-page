import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

export type ContentMap = Record<string, string>;

/**
 * Lê os textos editáveis de uma seção e já devolve mesclados com os padrões.
 *
 * Antes cada componente fazia `{ ...DEFAULTS, ...data }` na mão e o resultado
 * perdia a tipagem (virava `any`), então um typo em `c.titulo` só aparecia em
 * produção. Agora o retorno tem exatamente as chaves do objeto de defaults.
 */
export function useSiteContent<T extends ContentMap>(section: string, defaults: T): T {
  const { data } = useQuery({
    queryKey: ["site_content", section],
    enabled: isSupabaseConfigured,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    queryFn: async (): Promise<ContentMap> => {
      const { data: rows, error } = await supabase
        .from("site_content")
        .select("key, value")
        .eq("section", section);

      if (error) throw error;

      return Object.fromEntries((rows ?? []).map((row) => [row.key, row.value]));
    },
  });

  return useMemo(() => {
    if (!data) return defaults;

    // Valor vazio no CMS não deve apagar o texto padrão da página.
    const filled = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value?.trim().length),
    );

    return { ...defaults, ...filled } as T;
    // `defaults` é um literal estável definido no módulo de cada componente.
  }, [data, defaults]);
}

/** Usado pelo painel /admin para listar tudo que é editável. */
export function useAllSiteContent() {
  return useQuery({
    queryKey: ["site_content", "all"],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section")
        .order("key");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpsertContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: { section: string; key: string; value: string }[]) => {
      if (items.length === 0) return;

      // Um único upsert em lote no lugar de um request por campo:
      // salvar o painel inteiro fazia ~40 chamadas sequenciais.
      const { error } = await supabase
        .from("site_content")
        .upsert(items, { onConflict: "section,key" });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
}
