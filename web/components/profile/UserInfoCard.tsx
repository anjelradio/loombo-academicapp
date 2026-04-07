import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserInfoForm from "@/components/profile/UserInfoForm";

export default function UserInfoCard() {
  return (
    <Card className="border-none bg-white shadow-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl text-[#1E3A5F]">Informacion personal</CardTitle>
        <CardDescription>Revisa tu nombre y apellido.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserInfoForm />
      </CardContent>
    </Card>
  );
}
