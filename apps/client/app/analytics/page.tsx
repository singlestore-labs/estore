import { Metadata } from "next";

import { DbInfoSection } from "@/analytics/_components/db-info-section";
import { AnalyticsQueriesList } from "@/analytics/_components/queries-list";

export const metadata: Metadata = {
  title: `Analytics`,
};

export default function PageAnalytics() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-12 px-4">
      <DbInfoSection />
      <AnalyticsQueriesList className="flex-1" />
    </div>
  );
}
