import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME } from "@/constants/config";
import { ScrollbarController } from "@/scrollbar/controller";
import { StoreProvider } from "@/store/components/provider";
import { ThemeProvider } from "@/theme/components/provider";
import { cn } from "@/ui/lib";

import "./globals.css";

const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: `SingleStore | ${APP_NAME}`,
  description: "",
};

export default function RootLayout({
  children,
  product,
}: {
  children: React.ReactNode;
  product: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen w-full min-w-80 max-w-full flex-col">
              <Header />
              <main className="flex flex-1 flex-col">
                {children}
                {product}
              </main>
              <Footer />
              <Toaster position="bottom-center" />
            </div>
            <ScrollbarController />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
