import BackToPreviousButton from "@/features/auth/presentation/components/account/BackToPreviousButton";
import UserEmailCard from "@/features/auth/presentation/components/account/UserEmailCard";
import UserInfoCard from "@/features/auth/presentation/components/account/UserInfoCard";
import UserPasswordCard from "@/features/auth/presentation/components/account/UserPasswordCard";

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
          <UserInfoCard />
          <UserEmailCard />
          <UserPasswordCard />
        </section>
      </div>
    </div>
  );
}
