import { Metadata } from "next";

import { DbInfoSection } from "@/db/info/components/section";
import { QueriesList } from "@/query/components/list";

export const metadata: Metadata = {
  title: `Analytics`,
};

export default function PageAnalytics() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-12 px-4">
      <DbInfoSection />
      <QueriesList className="flex-1" />
    </div>
  );
}
