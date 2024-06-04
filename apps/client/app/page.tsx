import { footerHeight } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";
import { Chat } from "@/chat/types";
import { ProductCatalogDrawer } from "@/product/catalog/components/drawer";

const chatName: Chat["name"] = "main";

export default function Home() {
  return (
    <div className="flex flex-1">
      <div className="relative flex max-h-full w-full max-w-[100vw] flex-1 flex-col items-center justify-center gap-16">
        <Hero chatName={chatName} />
        <ChatContainer
          name={chatName}
          formProps={{ placeholder: "Describe the product you wish to buy" }}
          fadeProps={{ className: "bg-background" }}
        />
      </div>

      <ProductCatalogDrawer
        maxWidth="44rem"
        offsetY={footerHeight}
      />
    </div>
  );
}
