"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 font-semibold transition-all active:scale-95 cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="size-5" />
      Sair
    </Button>
  );
}