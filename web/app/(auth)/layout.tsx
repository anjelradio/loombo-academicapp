export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen w-full items-end overflow-hidden md:items-center md:justify-center">
      {children}
    </div>
  );
}
