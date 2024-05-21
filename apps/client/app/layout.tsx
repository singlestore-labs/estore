import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollbarWidthController } from "@/components/scrollbar-width-controller";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME } from "@/constants/config";
import { StoreProvider } from "@/store/components/provider";
import { ThemeProvider } from "@/theme/components/provider";
import { cn } from "@/ui/lib";
import { UserController } from "@/user/components/controller";

import "./globals.css";

const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });

const title = `SingleStore | ${APP_NAME}`;
export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
};

export default async function RootLayout({
  children,
  product,
}: {
  children: React.ReactNode;
  product: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex h-screen w-full min-w-80 max-w-full flex-col overflow-y-auto overflow-x-hidden",
        )}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <UserController />
            <ScrollbarWidthController />
            <Header />
            <main className="flex flex-1 flex-col">
              {children}
              {product}
            </main>
            <Footer />
            <Toaster position="bottom-center" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
