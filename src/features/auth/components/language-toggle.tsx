"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: "en" | "pt") => {
    // replace garante que a URL mude mantendo a página atual
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border">
      <Button
        variant={locale === "pt" ? "default" : "ghost"}
        size="sm"
        className={cn(
          "h-8 px-3 text-xs transition-all cursor-pointer bg-[#003cff]",
          locale === "pt" ? "shadow-sm" : "text-muted-foreground bg-transparent hover:bg-muted"
        )}
        onClick={() => changeLanguage("pt")}
      >
        PT
      </Button>
      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        className={cn(
          "h-8 px-3 text-xs transition-all cursor-pointer bg-[#003cff]",
          locale === "en" ? "shadow-sm" : "text-muted-foreground bg-transparent hover:bg-muted"
        )}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}