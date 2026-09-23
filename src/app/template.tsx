import { PageTransition } from "@/components/layouts/PageTransition";
import Footer from "@/components/layouts/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      {children}
      <Footer />
    </PageTransition>
  );
}
