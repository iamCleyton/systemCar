import { RegisterForm } from "@/features/auth/components/ui/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </main>
  );
}