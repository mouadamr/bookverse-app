import Navbar from '@/components/shared/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
