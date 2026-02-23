import { Button } from "@/features/auth/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/auth/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/auth/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"

export function TableActions() {
  return (
    <div className="rounded-xl border-2 border-black-100 overflow-hidden shadow-mg bg-white">
    <Table>
      <TableHeader>
        <TableRow className="bg-blue-200">
          <TableHead>Modelo</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Data de Criação</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Exemplo de Linha 1 */}
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Logitech</TableCell> {/* Marca */}
          <TableCell>Preto</TableCell>   {/* Cor */}
          <TableCell>2024</TableCell>    {/* Ano */}
          <TableCell>22/02/2026</TableCell> {/* Data */}
          
          {/* Ações na 6ª coluna, alinhada à direita */}
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>


        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Logitech</TableCell> {/* Marca */}
          <TableCell>Preto</TableCell>   {/* Cor */}
          <TableCell>2024</TableCell>    {/* Ano */}
          <TableCell>22/02/2026</TableCell> {/* Data */}
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        
        
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Logitech</TableCell> {/* Marca */}
          <TableCell>Preto</TableCell>   {/* Cor */}
          <TableCell>2024</TableCell>    {/* Ano */}
          <TableCell>22/02/2026</TableCell> {/* Data */}
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Logitech</TableCell> {/* Marca */}
          <TableCell>Preto</TableCell>   {/* Cor */}
          <TableCell>2024</TableCell>    {/* Ano */}
          <TableCell>22/02/2026</TableCell> {/* Data */}
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>Logitech</TableCell> {/* Marca */}
          <TableCell>Preto</TableCell>   {/* Cor */}
          <TableCell>2024</TableCell>    {/* Ano */}
          <TableCell>22/02/2026</TableCell> {/* Data */}
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        
                {/* Repita o mesmo número de TableCell para as outras linhas */}

      </TableBody>
    </Table>
    </div>
  )
}
