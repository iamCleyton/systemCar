"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function LogoutButton() {

  const t = useTranslations("LogoutButton");


  return (
    <Button 
      variant="ghost" 
      className="bg-red-500 hover:bg-red-200 transition-colors text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
      onClick={() => {
        signOut({ callbackUrl: "/login" });
        toast.warning(t("feedback"));
      }}
    
    >
      <LogOut className="size-5" />
      {t("logout")}
    </Button>
  );
}