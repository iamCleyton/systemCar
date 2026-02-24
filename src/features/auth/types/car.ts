// Representa o carro retornado pelo Back-end
export interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  date_create: string;
}

// Representa os dados enviados para CADASTRAR um carro (sem ID)
export interface CarCreateDto {
  brand: string;
  model: string;
  color: string;
  year: number;
  date_create: string;
}

// Representa a estrutura de Paginação que o Spring Boot devolve nativamente
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}