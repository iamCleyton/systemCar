"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Tipagem dos filtros que o Dashboard espera receber
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
  //  Estados locais para cada input
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState<string>("");

  //  Ação do botão "Filtrar" (O "Enter")
  const handleFilter = () => {
    onFilter({
      model: model.trim(),
      brand: brand.trim(),
      color: color.trim(),
      year: year ? parseInt(year, 10) : undefined, // Converte o ano para número se existir
    });
  };

  //  Ação do botão "Limpar"
  const handleClear = () => {
    // Zera os campos na tela
    setModel("");
    setBrand("");
    setColor("");
    setYear("");
    
    // Dispara a busca com os filtros vazios (traz todos os carros de volta)
    onFilter({
      model: "",
      brand: "",
      color: "",
      year: undefined,
    });
  };

  // Permite filtrar ao apertar a tecla "Enter" dentro de qualquer input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[90%] border-l-8 border-l-[#003cff] flex flex-col md:flex-row gap-4 items-end">
      
      {/* Input de Modelo */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">Model</label>
        <Input 
          placeholder="Ex: Tesla" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Marca */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">Brand</label>
        <Input 
          placeholder="Ex: Porsche" 
          value={brand} 
          onChange={(e) => setBrand(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Cor */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">Color</label>
        <Input 
          placeholder="Ex: Preto" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Input de Ano */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        <label className="text-sm font-bold text-gray-700">Year</label>
        <Input 
          type="number" 
          placeholder="Ex: 2024" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Botões */}
      <div className="flex gap-2 w-full md:w-auto flex-col md:flex-row md:gap-5  mt-4 md:mt-0">
        <Button 
          onClick={handleFilter} 
          className="bg-[#003cff] hover:bg-blue-700 text-white px-6 w-full md:w-auto cursor-pointer"
        >
          Filter
        </Button>
        <Button 
          onClick={handleClear} 
          variant="outline" 
          className="border-[#003cff] text-[#003cff] hover:bg-blue-50 px-6 w-full md:w-auto cursor-pointer"
        >
          Clean
        </Button>
      </div>

    </div>
  );
}