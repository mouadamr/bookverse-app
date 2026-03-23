import Navbar from '@/components/shared/Navbar';

// A nested layout component takes 'children' as a prop.
// These 'children' will be the pages inside this layout (like your homepage).
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // It should return only the UI elements for this specific layout.
  // NO <html> or <body> tags here.
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        {children}
      </main>
    </>
  );
}
