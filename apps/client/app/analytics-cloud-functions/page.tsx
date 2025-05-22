import { Metadata } from "next";

import { AnalyticsQueriesList } from "@/analytics/query/components/list";
import { DbInfoSection } from "@/analytics-cloud-functions/_components/db-info-section";

export const metadata: Metadata = {
  title: `Analytics - Cloud Functions`,
};

export default function PageAnalytics() {
  return (
    <div className="relative mt-6 flex flex-1 flex-col gap-12 px-4">
      <DbInfoSection />
      <AnalyticsQueriesList className="flex-1" />
    </div>
  );
}
