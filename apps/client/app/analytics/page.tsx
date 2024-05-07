import { Metadata } from "next";

import { DbInfoSection } from "@/db/info/components/section";
import { QueriesContainer } from "@/queries/components/container";

export const metadata: Metadata = {
  title: `Analytics`,
};

export default function PageAnalytics() {
  return (
    <div className="relative mt-4 flex flex-1 flex-col gap-8 px-4">
      <DbInfoSection />
      <QueriesContainer className="flex-1" />
    </div>
  );
}
