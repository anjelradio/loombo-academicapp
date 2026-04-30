"use client";

import { useRef, useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { LoginFormSchema } from "@/features/auth/data/schemas/auth";
import { FormTextField } from "@/features/shared/components/forms/FormTextField";
import { SubmitButton } from "@/features/shared/components/forms/SubmitButton";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import { appToast } from "@/features/shared/components/toast/toast";
import { submitWithSchema } from "@/features/shared/infrastructure/forms/submit-with-schema";
import { login } from "../../actions/auth/login-user-action";
import ForgotPasswordLink from "./ForgotPasswordLink";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await submitWithSchema({
      schema: LoginFormSchema,
      payload: {
      email: formData.get("email"),
      password: formData.get("password"),
      },
      action: login,
      onSuccess: ({ data }) => {
        formRef.current?.reset();
        setUser(data);
        appToast.success("Bienvenido de nuevo");
        router.push("/");
      },
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-5">
      <FormTextField
        id="email"
        type="email"
        name="email"
        label="Correo institucional"
        placeholder="correo@ejemplo.com"
        className="pr-10"
        required
      />

      <FormTextField
        id="password"
        type={showPassword ? "text" : "password"}
        name="password"
        label="Contraseña"
        placeholder="••••••••"
        className="pr-10"
        required
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 hover:text-[#1E3A5F]"
          >
            <Eye className="h-5 w-5" />
          </button>
        }
      />

      <p className="-mt-3 text-xs text-slate-500">Tu acceso esta protegido con autenticacion segura.</p>

      <div className="flex items-center justify-between">
        <ForgotPasswordLink />
      </div>

      <SubmitButton
        pendingText="Iniciando sesión..."
        className="h-12 w-full rounded-xl bg-[#1E3A5F] text-white shadow-[0_16px_32px_-20px_rgba(10,31,61,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#152B47] hover:shadow-[0_24px_44px_-22px_rgba(10,31,61,0.9)]"
      >
        Iniciar sesión
      </SubmitButton>

      <p className="text-center text-sm text-slate-600">
        ¿No tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="font-semibold text-[#1E3A5F] transition-colors duration-200 hover:text-[#3B82F6]"
        >
          Regístrate
        </button>
      </p>
    </form>
  );
}
