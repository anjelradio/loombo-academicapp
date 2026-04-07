export default function LoginSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full md:w-[30%] h-auto md:h-full flex items-center justify-center p-8 bg-white rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Inicia Sesión!
          </h1>
          <p className="text-gray-600">Por favor ingresa tus datos.</p>
        </div>

        {children}
      </div>
    </div>
  );
}
