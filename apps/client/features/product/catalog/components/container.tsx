"use client";

import debounce from "debounce";
import { useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Loader } from "@/components/loader";
import { Section } from "@/components/section";
import { useAction } from "@/action/hooks/use-action";
import { getProductCatalog } from "@/product/catalog/actions/get";
import { ProductCatalogList } from "@/product/catalog/components/list";
import { ProductCatalogItem } from "@/product/catalog/type";
import { cn } from "@/ui/lib";

export type ProductCatalogContainerProps = ComponentProps<"div", { data: ProductCatalogItem[]; count: number }>;

export function ProductCatalogContainer({ className, data, count, ...props }: ProductCatalogContainerProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [catalog, setCatalog] = useState(data);
  const { execute, isPending } = useAction();

  useEffect(() => {
    if (!listRef.current) return;
    const element = listRef.current;

    const handleScroll = debounce(async () => {
      if (catalog.length < count && element.offsetHeight + element.scrollTop + 8 >= element.scrollHeight) {
        const data = await execute(() => {
          return getProductCatalog({ offset: catalog.length, limit: 5, products: { limit: 3 } });
        });
        setCatalog((catalog) => [...catalog, ...data]);
      }
    }, 400);

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [catalog.length, count, execute]);

  return (
    <div
      {...props}
      className={cn("h-full w-full overflow-hidden rounded-lg", className)}
    >
      <div
        ref={listRef}
        className="flex h-full w-full flex-col gap-4 overflow-y-auto overflow-x-hidden p-4"
      >
        <div className="flex flex-col gap-8">
          {catalog.map((data) => (
            <Section
              key={data[0].id}
              title={
                <>
                  {data[0].label}
                  <sup className="ml-1">({data[0].products_count})</sup>
                </>
              }
              variant="secondary"
              spacing="none"
              size="sm"
              titleProps={{ className: "capitalize" }}
            >
              <ProductCatalogList data={data} />
            </Section>
          ))}
        </div>

        {isPending && (
          <div className="relative size-6 flex-shrink-0 basis-auto self-center overflow-hidden">
            <Loader className="absolute left-0 top-0 h-full w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
