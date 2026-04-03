import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAllSiteContent, useUpsertContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LogOut, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Define all editable fields with metadata
const CONTENT_FIELDS = [
  // HERO
  { section: "hero", key: "badge", label: "Badge (localização)", maxChars: 40, hint: "Ex: ✦ Itapetininga — SP" },
  { section: "hero", key: "title_line1", label: "Título — Linha 1", maxChars: 40, hint: "Ex: Enxergue o mundo" },
  { section: "hero", key: "title_line2", label: "Título — Linha 2", maxChars: 30, hint: "Ex: com estilo" },
  { section: "hero", key: "subtitle", label: "Subtítulo", maxChars: 200, hint: "Descrição abaixo do título", multiline: true },
  { section: "hero", key: "highlight_1", label: "Destaque 1", maxChars: 30, hint: "Ex: Armações exclusivas" },
  { section: "hero", key: "highlight_2", label: "Destaque 2", maxChars: 30, hint: "Ex: Óculos de sol premium" },
  { section: "hero", key: "highlight_3", label: "Destaque 3", maxChars: 30, hint: "Ex: Atendimento personalizado" },
  { section: "hero", key: "hero_image_url", label: "URL da imagem do Hero", maxChars: 500, hint: "Foto de fundo — Tamanho ideal: 1920×1080px, formato JPG", isUrl: true },

  // SERVICES
  { section: "services", key: "section_title", label: "Título da seção", maxChars: 40, hint: "Ex: Nossos Serviços" },
  { section: "services", key: "section_subtitle", label: "Subtítulo da seção", maxChars: 30, hint: "Ex: O que oferecemos" },
  { section: "services", key: "service_1_title", label: "Serviço 1 — Título", maxChars: 30 },
  { section: "services", key: "service_1_desc", label: "Serviço 1 — Descrição", maxChars: 200, multiline: true },
  { section: "services", key: "service_2_title", label: "Serviço 2 — Título", maxChars: 30 },
  { section: "services", key: "service_2_desc", label: "Serviço 2 — Descrição", maxChars: 200, multiline: true },
  { section: "services", key: "service_3_title", label: "Serviço 3 — Título", maxChars: 30 },
  { section: "services", key: "service_3_desc", label: "Serviço 3 — Descrição", maxChars: 200, multiline: true },

  // ABOUT
  { section: "about", key: "section_subtitle", label: "Subtítulo", maxChars: 30, hint: "Ex: Nossa história" },
  { section: "about", key: "section_title", label: "Título", maxChars: 40, hint: "Ex: Sobre a Theo Óticas" },
  { section: "about", key: "paragraph_1", label: "Parágrafo 1", maxChars: 400, multiline: true },
  { section: "about", key: "paragraph_2", label: "Parágrafo 2", maxChars: 400, multiline: true },
  { section: "about", key: "paragraph_3", label: "Parágrafo 3", maxChars: 300, multiline: true },
  { section: "about", key: "stat_1_value", label: "Estatística 1 — Valor", maxChars: 10, hint: "Ex: 100+" },
  { section: "about", key: "stat_1_label", label: "Estatística 1 — Label", maxChars: 30, hint: "Ex: Marcas disponíveis" },
  { section: "about", key: "stat_2_value", label: "Estatística 2 — Valor", maxChars: 10 },
  { section: "about", key: "stat_2_label", label: "Estatística 2 — Label", maxChars: 30 },
  { section: "about", key: "stat_3_value", label: "Estatística 3 — Valor", maxChars: 10 },
  { section: "about", key: "stat_3_label", label: "Estatística 3 — Label", maxChars: 30 },
  { section: "about", key: "address", label: "Endereço completo", maxChars: 200, multiline: true },

  // CONTACT
  { section: "contact", key: "section_title", label: "Título", maxChars: 40 },
  { section: "contact", key: "section_subtitle", label: "Subtítulo", maxChars: 30 },
  { section: "contact", key: "address_value", label: "Endereço exibido", maxChars: 200, multiline: true },
  { section: "contact", key: "address_url", label: "URL do Google Maps", maxChars: 500, isUrl: true },
  { section: "contact", key: "whatsapp_number", label: "WhatsApp exibido", maxChars: 20, hint: "Ex: (15) 99686-9669" },
  { section: "contact", key: "whatsapp_url", label: "URL do WhatsApp", maxChars: 500, isUrl: true },
  { section: "contact", key: "instagram_handle", label: "@ do Instagram", maxChars: 30 },
  { section: "contact", key: "instagram_url", label: "URL do Instagram", maxChars: 500, isUrl: true },

  // CTA
  { section: "cta", key: "subtitle", label: "Subtítulo", maxChars: 40 },
  { section: "cta", key: "title", label: "Título", maxChars: 60 },
  { section: "cta", key: "description", label: "Descrição", maxChars: 200, multiline: true },
  { section: "cta", key: "whatsapp_url", label: "URL do WhatsApp", maxChars: 500, isUrl: true },

  // FOOTER
  { section: "footer", key: "address", label: "Endereço no rodapé", maxChars: 100 },
  { section: "footer", key: "whatsapp_url", label: "URL do WhatsApp", maxChars: 500, isUrl: true },
  { section: "footer", key: "instagram_url", label: "URL do Instagram", maxChars: 500, isUrl: true },
];

type FieldDef = (typeof CONTENT_FIELDS)[number];

const SECTIONS_ORDER = ["hero", "services", "about", "contact", "cta", "footer"];
const SECTION_LABELS: Record<string, string> = {
  hero: "🏠 Hero (Topo)",
  services: "⚙️ Serviços",
  about: "ℹ️ Sobre",
  contact: "📞 Contato",
  cta: "📣 CTA (Chamada)",
  footer: "📋 Rodapé",
};

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAdmin();
  const navigate = useNavigate();
  const { data: dbContent, isLoading: contentLoading } = useAllSiteContent();
  const upsert = useUpsertContent();

  const [form, setForm] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState("hero");

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  // Populate form from DB
  useEffect(() => {
    if (dbContent) {
      const map: Record<string, string> = {};
      dbContent.forEach((row) => {
        map[`${row.section}__${row.key}`] = row.value;
      });
      setForm(map);
    }
  }, [dbContent]);

  const getValue = (field: FieldDef) => form[`${field.section}__${field.key}`] ?? "";

  const setValue = (field: FieldDef, value: string) => {
    if (value.length <= (field.maxChars ?? 9999)) {
      setForm((prev) => ({ ...prev, [`${field.section}__${field.key}`]: value }));
    }
  };

  const handleSave = async () => {
    const items = CONTENT_FIELDS.filter(
      (f) => form[`${f.section}__${f.key}`] !== undefined && form[`${f.section}__${f.key}`] !== ""
    ).map((f) => ({
      section: f.section,
      key: f.key,
      value: form[`${f.section}__${f.key}`],
    }));

    if (items.length === 0) {
      toast.info("Nenhum conteúdo para salvar.");
      return;
    }

    try {
      await upsert.mutateAsync(items);
      toast.success("Conteúdos salvos com sucesso!");
    } catch {
      toast.error("Erro ao salvar. Verifique suas permissões.");
    }
  };

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const sectionFields = CONTENT_FIELDS.filter((f) => f.section === activeSection);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-primary text-lg font-bold">Theo</span>
          <span className="text-muted-foreground text-xs">Painel Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={upsert.isPending} size="sm">
            {upsert.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <Save className="w-4 h-4 mr-1" />
            )}
            Salvar tudo
          </Button>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 border-r border-border bg-card min-h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-1">
            {SECTIONS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === s
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {SECTION_LABELS[s]}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden w-full overflow-x-auto border-b border-border bg-card px-2 py-2 flex gap-1">
          {SECTIONS_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeSection === s
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {SECTION_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {SECTION_LABELS[activeSection]}
          </h2>

          <div className="space-y-6">
            {sectionFields.map((field) => {
              const val = getValue(field);
              const charCount = val.length;
              const isMultiline = "multiline" in field && field.multiline;

              return (
                <div key={`${field.section}__${field.key}`} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <Label className="text-sm font-semibold">{field.label}</Label>
                    <span
                      className={`text-xs ${
                        charCount > (field.maxChars ?? 9999) * 0.9
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {charCount}/{field.maxChars}
                    </span>
                  </div>

                  {field.hint && (
                    <p className="text-xs text-muted-foreground">{field.hint}</p>
                  )}

                  {isMultiline ? (
                    <Textarea
                      value={val}
                      onChange={(e) => setValue(field, e.target.value)}
                      maxLength={field.maxChars}
                      rows={3}
                      className="resize-none"
                    />
                  ) : (
                    <Input
                      value={val}
                      onChange={(e) => setValue(field, e.target.value)}
                      maxLength={field.maxChars}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Button onClick={handleSave} disabled={upsert.isPending} className="w-full md:w-auto">
              {upsert.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Salvar todas as alterações
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
