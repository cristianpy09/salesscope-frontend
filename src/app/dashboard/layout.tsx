import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import Providers from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <Providers>

    <div className="flex min-h-screen w-full text-base-content ">
      <aside className=" bg-base-200 fixed left-0 top-0 h-full w-64   shadow-lg">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 ml-64">
        <header className="fixed top-0 left-64 right-0 z-50 ">
          <Navbar />
        </header>

        <main className="mt-16 p-6 overflow-y-auto min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </div>
     </Providers>
  );
}
