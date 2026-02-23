import { cn } from "@/lib/utils"; // Importe o utilitário que você já tem no projeto

// Adicionamos a prop className para o TypeScript parar de reclamar
export function InputDemo({ className }: { className?: string }) {
  return (
    <>
      {/* Usamos cn() para manter suas classes fixas e aceitar as que vierem de fora (como mb-10) */}
      <div className={cn(
        "flex items-center justify-center rounded-lg w-[90%] bg-white h-30 shadow-[-10px_0_0_0_#003cff]", 
        className
      )}>   
        <form className="flex flex-row gap-10 items-center justify-center">
          
          {/* Modelo */}
          <div className="flex-row flex gap-2 items-center justify-center">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
              <p>Modelo</p>
            </label>
            <input 
              className="border-input border bg-transparent px-3 py-1 rounded-md text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all w-[200px]" 
              placeholder="Digite aqui..."
            />
          </div>

          {/* Marca */}
          <div className="flex-row flex gap-2 items-center justify-center">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
              <p>Marca</p>
            </label>
            <input 
              className="border-input border bg-transparent px-3 py-1 rounded-md text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all w-[200px]" 
              placeholder="Digite aqui..."
            />
          </div>

          {/* Cor */}
          <div className="flex-row flex gap-2 items-center justify-center">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
              <p>Cor</p>
            </label>
            <input 
              className="border-input border bg-transparent px-3 py-1 rounded-md text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all w-[200px]" 
              placeholder="Digite aqui..."
            />
          </div>

          {/* Ano */}
          <div className="flex-row flex gap-2 items-center justify-center">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
              <p>Ano</p>
            </label>
            <input 
              className="border-input border bg-transparent px-3 py-1 rounded-md text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all w-[200px]" 
              placeholder="Digite aqui..."
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button type="button" className="bg-[#003cffd7] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
              Filtrar
            </button>

            <button type="reset" className="bg-[#003cffd7] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
              Limpar
            </button>
          </div>

        </form>
      </div>
    </>
  );
}