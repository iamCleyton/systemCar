"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      className="bg-red-500 hover:bg-red-200 transition-colors text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
      onClick={() => {
        signOut({ callbackUrl: "/login" });
        toast.warning("Você saiu da sua conta com sucesso!");
      }}
    
    >
      <LogOut className="size-5" />
      Logout
    </Button>
  );
}