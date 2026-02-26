"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Car, Calendar, Palette, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditCarModal } from "@/features/auth/components/ui/edit-car-modal";
import { LanguageToggle } from "../language-toggle";
import { useTranslations, useLocale } from "next-intl";
import { ModeToggle } from "./mode-toggle";

interface CarDetailsProps {
  carro: any; 
}

export function CarDetails({ carro }: CarDetailsProps) {
  const router = useRouter();
  
  const t = useTranslations("CarDetails");
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center min-h-screen bg-background py-16 px-4 w-full">
      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/dashboard")}
              className="hover:bg-white shadow-sm rounded-full p-2 cursor-pointer"
            >
              <ArrowLeft className="size-6 text-blue-600" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
                {carro?.model}
              </h1>
              <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="flex flex-row gap-2 items-center">
              <ModeToggle />
              <LanguageToggle />
            </div>
            <div className="flex items-center gap-4">
              <EditCarModal carro={carro} />
            </div>
          </div>
        </div>

        <div className="bg-card p-10 rounded-xl shadow-lg border-t-8 border-t-[#003cff]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <DetailItem icon={<Tag />} label={t("labels.brand")} value={carro?.brand} />
              <DetailItem icon={<Car />} label={t("labels.model")} value={carro?.model} />
              <DetailItem icon={<Palette />} label={t("labels.color")} value={carro?.color} />
              <DetailItem icon={<Calendar />} label={t("labels.year")} value={carro?.year} />
              
              {/* Comentário colocado fora das props do componente para não quebrar a sintaxe */}
              <DetailItem 
                icon={<Calendar />} 
                label={t("labels.registrationDate")} 
                value={carro?.dateCreate ? new Date(carro.dateCreate).toLocaleString(locale) : "---"} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) {
  return (
    <div className="flex items-center gap-4 border-b border-border pb-4">
      <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-foreground">{value || "---"}</p>
      </div>
    </div>
  );
}