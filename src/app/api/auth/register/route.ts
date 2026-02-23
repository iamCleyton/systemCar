import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Chamada para o seu Spring Boot
    const response = await fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      // Se o status for 409 (Conflict) ou a mensagem indicar e-mail duplicado
      if (response.status === 409 || data.message?.includes("already exists")) {
        return NextResponse.json(
          { message: "Email already exists" }, 
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { message: data.message || "Erro no servidor Java" }, 
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro de conexão com o servidor" }, 
      { status: 500 }
    );
  }
}