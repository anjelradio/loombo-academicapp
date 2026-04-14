"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { register } from "@/features/auth/presentation/actions/auth/register-user-action";
import { RegisterFormSchema } from "@/features/auth/data/schemas/auth.schema";
import { useAppStore } from "@/lib/store/appStore";
import { appToast, showErrorList } from "@/lib/toast/toast";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    const result = RegisterFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await register(result.data);
    if (!response.ok) {
      showErrorList(response.errors);
      return;
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setUser(response.data);
    appToast.success("Cuenta creada correctamente");
    router.push("/");
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstName" className="text-gray-700 text-sm">
          Nombre completo
        </Label>
        <Input
          id="firstName"
          type="text"
          name="first_name"
          placeholder="Juan"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-white border-gray-300 h-12"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="lastName" className="text-gray-700 text-sm">
          Apellidos completos
        </Label>
        <Input
          id="lastName"
          type="text"
          name="last_name"
          placeholder="Pérez García"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-white border-gray-300 h-12"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-gray-700 text-sm">
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-gray-300 h-12"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-gray-700 text-sm">
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-gray-300 h-12 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      <FormSubmitButton
        pendingText="Registrando..."
        className="w-full h-12 bg-[#1E3A5F] hover:bg-[#152B47] text-white"
      >
        Registrarse
      </FormSubmitButton>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[#3B82F6] hover:underline font-medium"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  );
}
