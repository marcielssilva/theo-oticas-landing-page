import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentMap = Record<string, string>;

export function useSiteContent(section: string) {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .eq("section", section);
      if (error) throw error;
      const map: ContentMap = {};
      data?.forEach((row) => {
        map[row.key] = row.value;
      });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllSiteContent() {
  return useQuery({
    queryKey: ["site_content", "all"],
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (items: { section: string; key: string; value: string }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from("site_content")
          .upsert(
            { section: item.section, key: item.key, value: item.value },
            { onConflict: "section,key" }
          );
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
}
