import { Metadata } from "next";

import { DbInfoSection } from "@/db/info/components/section";
import { getDbInfo } from "@/db/info/lib/get";

export const metadata: Metadata = {
  title: `Analytics`,
};

export default async function PageAnalytics() {
  const dbInfo = getDbInfo();

  return (
    <div className="relative mt-4 flex-1 px-4">
      <DbInfoSection data={dbInfo} />
    </div>
  );
}
