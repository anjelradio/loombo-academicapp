import HeroSection from "@/features/auth/presentation/components/auth/HeroSection";
import RegisterForm from "@/features/auth/presentation/components/auth/RegisterForm";
import RegisterSection from "@/features/auth/presentation/components/auth/RegisterSection";

export default function RegisterPage() {
  return (
    <>
      <HeroSection
        urlImage="https://images.unsplash.com/photo-1740635341299-3b8e3490f546?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Únete a nuestra comunidad"
        description={{
          mobile: " Crea tu cuenta y gestiona tu centro escolar.",
          desktop:
            "Crea tu cuenta para comenzar a gestionar y supervisar el centro escolar.Transforma la experiencia educativa con tecnología innovadora.",
        }}
      />
      <RegisterSection>
        <RegisterForm />
      </RegisterSection>
    </>
  );
}
