export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Login Bem-Sucedido! 🎉</h1>
        <p className="text-gray-700 text-lg">
          Bem-vindo ao seu painel de gerenciamento de carros.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          Se você está vendo esta tela, a comunicação com o Spring Boot funcionou perfeitamente.
        </p>
      </div>
    </div>
  );
}