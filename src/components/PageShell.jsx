import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PageShell({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem-20rem)]">{children}</main>
      <Footer />
    </>
  );
}
