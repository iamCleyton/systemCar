import { cn } from "@/lib/utils";

export function InputDemo({ className }: { className?: string }) {
  return (
    <div className={cn(
      // Removido h-30 (altura fixa). Adicionado py-6 (espaçamento dinâmico).
      // flex-wrap permite que os itens "caiam" para a linha de baixo.
      "flex flex-col md:flex-row items-center justify-center rounded-lg w-[90%] bg-white py-6 px-4 shadow-[-10px_0_0_0_#003cff]", 
      className
    )}>   
      {/* O form agora quebra em múltiplas linhas (flex-wrap) e centraliza no mobile */}
      <form className="flex flex-row flex-wrap gap-6 md:gap-10 items-end justify-center w-full">
        
        {/* Container genérico para os campos de Input */}
        {[
          { label: "Modelo", placeholder: "Ex: Tesla" },
          { label: "Marca", placeholder: "Ex: Porsche" },
          { label: "Cor", placeholder: "Ex: Preto" },
          { label: "Ano", placeholder: "Ex: 2024" }
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium leading-none">
              {item.label}
            </label>
            <input 
              className="border-input border bg-transparent px-3 py-1 rounded-md text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all w-full sm:w-[180px]" 
              placeholder={item.placeholder}
            />
          </div>
        ))}

        {/* Botões - Centralizados no mobile e alinhados no desktop */}
        <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start pt-2">
          <button type="button" className="bg-[#003cffd7] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer w-full sm:w-auto whitespace-nowrap">
            Filtrar
          </button>
          <button type="reset" className="bg-[#003cffd7] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer w-full sm:w-auto whitespace-nowrap">
            Limpar
          </button>
        </div>

      </form>
    </div>
  );
}