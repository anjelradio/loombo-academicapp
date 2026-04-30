import BackToPreviousButton from "@/features/auth/presentation/components/account/BackToPreviousButton";
import AccountSectionCard from "@/features/auth/presentation/components/account/AccountSectionCard";
import ChangeEmailButton from "@/features/auth/presentation/components/account/ChangeEmailButton";
import ChangePasswordButton from "@/features/auth/presentation/components/account/ChangePasswordButton";
import UserEmailField from "@/features/auth/presentation/components/account/UserEmailField";
import UserInfoForm from "@/features/auth/presentation/components/account/UserInfoForm";

export default function UserProfilePage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <BackToPreviousButton />
        </div>

        <section className="space-y-2 text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">Mi perfil</h1>
          <p className="text-white/85">
            Administra tu informacion de usuario y las opciones de seguridad de tu cuenta.
          </p>
        </section>

        <section className="space-y-5">
          <AccountSectionCard
            title="Informacion personal"
            description="Revisa tu nombre y apellido."
          >
            <UserInfoForm />
          </AccountSectionCard>

          <AccountSectionCard
            title="Correo electronico"
            description="Este es el correo asociado a tu cuenta."
            contentClassName="space-y-4"
          >
            <UserEmailField />
            <ChangeEmailButton />
          </AccountSectionCard>

          <AccountSectionCard
            title="Contrasena"
            description="Actualiza la clave de acceso de tu cuenta."
            contentClassName="flex justify-center pt-2"
          >
            <ChangePasswordButton />
          </AccountSectionCard>
        </section>
      </div>
    </div>
  );
}
