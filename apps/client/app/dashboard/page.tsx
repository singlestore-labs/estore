import { Metadata } from "next";

import { ProductTopSection } from "@/product/components/top-section";

export const metadata: Metadata = {
  title: `Dashboard`,
};

export default function PageDashboard() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-12 px-4">
      <ProductTopSection />
    </div>
  );
}
