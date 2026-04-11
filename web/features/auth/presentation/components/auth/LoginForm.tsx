"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { LoginFormSchema } from "@/features/auth/data/schemas/auth.schema";
import { useAppStore } from "@/lib/store/appStore";
import { appToast, showErrorList } from "@/lib/toast/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../../actions/auth/login-user-action";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };

    const result = LoginFormSchema.safeParse(data);
    if (!result.success) {
      showErrorList(result.error.issues.map((issue) => issue.message));
      return;
    }

    const response = await login(result.data);
    if (!response.ok) {
      showErrorList(response.errors);
      return;
    }

    setEmail("");
    setPassword("");
    setUser(response.data);
    appToast.success("Bienvenido de nuevo");
    router.push("/");
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-gray-700 text-sm">
          Email
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

      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-[#3B82F6] hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button type="submit" className="w-full h-12 bg-[#1E3A5F] hover:bg-[#152B47] text-white">
        Iniciar sesión
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-[#3B82F6] hover:underline font-medium"
        >
          Regístrate
        </button>
      </p>
    </form>
  );
}
