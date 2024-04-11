import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME } from "@/constants/config";
import { StoreProvider } from "@/store/components/provider";
import { ThemeProvider } from "@/theme/components/provider";
import { cn } from "@/ui/lib";

import "./globals.css";

const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: `SingleStore | ${APP_NAME}`,
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            <div className="mx-auto flex min-h-screen w-full min-w-80 max-w-full flex-col overflow-y-auto">
              <Header />
              <main className="flex flex-1 flex-col px-4">{children}</main>
              <Footer />
              <Toaster position="bottom-center" />
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
