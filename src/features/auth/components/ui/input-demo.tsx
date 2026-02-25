"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// 1. Importando o hook de tradução
import { useTranslations } from "next-intl";

interface Filters {
  brand: string;
  model: string;
  color: string;
  year: number | undefined;
}

interface InputDemoProps {
  onFilter: (filters: Filters) => void;
}

export function InputDemo({ onFilter }: InputDemoProps) {
  // 2. Inicializando o hook com o namespace "InputDemo"
  const t = useTranslations("InputDemo");

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState<string>("");

  const handleFilter = () => {
    onFilter({
      model: model.trim(),
      brand: brand.trim(),
      color: color.trim(),
      year: year ? parseInt(year, 10) : undefined,
    });
  };

  const handleClear = () => {
    setModel("");
    setBrand("");
    setColor("");
    setYear("");
    
    onFilter({
      model: "",
      brand: "",
      color: "",
      year: undefined,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[90%] border-l-8 border-l-[#003cff] flex flex-col md:flex-row gap-4 items-end">
      
      {/* Input de Modelo */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* 3. Traduzindo labels e placeholders */}
        <label className="text-sm font-bold text-gray-700">{t("labels.model")}</label>
        <Input 
          placeholder={t("placeholders.model")}
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Marca */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">{t("labels.brand")}</label>
        <Input 
          placeholder={t("placeholders.brand")}
          value={brand} 
          onChange={(e) => setBrand(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Cor */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">{t("labels.color")}</label>
        <Input 
          placeholder={t("placeholders.color")}
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Ano */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">{t("labels.year")}</label>
        <Input 
          type="number" 
          placeholder={t("placeholders.year")}
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Botões */}
      <div className="flex gap-2 w-full md:w-auto flex-col md:flex-row md:gap-5 mt-4 md:mt-0">
        <Button 
          onClick={handleFilter} 
          className="bg-[#003cff] hover:bg-blue-700 text-white px-6 w-full md:w-auto cursor-pointer"
        >
          {t("buttons.filter")}
        </Button>
        <Button 
          onClick={handleClear} 
          variant="outline" 
          className="border-[#003cff] text-[#003cff] hover:bg-blue-50 px-6 w-full md:w-auto cursor-pointer"
        >
          {t("buttons.clear")}
        </Button>
      </div>

    </div>
  );
}