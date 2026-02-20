import { redirect } from "next/navigation";

export default function HomePage() {
  // Assim que alguém acessar localhost:3000/, 
  // o Next joga a pessoa na mesma hora para /login
  redirect("/login");
}