import HeroSection from "@/features/auth/presentation/components/auth/HeroSection";
import LoginForm from "@/features/auth/presentation/components/auth/LoginForm";
import LoginSection from "@/features/auth/presentation/components/auth/LoginSection";

export default function LoginPage() {
  return (
    <>
      <HeroSection
        urlImage="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="¡Bienvenido de vuelta!"
        description={{
          mobile: "Gestiona el progreso académico de tu institución.",
          desktop:
            "Accede a tu plataforma educativa y continúa gestionando el progreso académico. Tu dedicación impulsa el éxito de toda la comunidad.",
        }}
      />
      <LoginSection>
        <LoginForm/>
      </LoginSection>
    </>
  );
}
