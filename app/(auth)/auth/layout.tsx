// src/app/(auth)/layout.tsx (atau sesuai struktur folder auth Anda)

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HAPUS <html> dan <body> dari sini!
    // Ganti dengan div biasa untuk membungkus halaman login/register Anda
    <div className="w-full min-h-screen flex items-center justify-center bg-yellow-300">
      {children}
    </div>
  );
}