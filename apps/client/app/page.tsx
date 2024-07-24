import { footerHeight } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ChatContainer } from "@/chat/components/container";π
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
        {!process.env.OPENAI_API_KEY && <p>
          For the full experience, please add an <span className="text-primary">Open AI API key</span> to your <span style={{ fontFamily: "monospace" }}> .env </span> file.</p>}
      </div>

      <ProductCatalogDrawer
        maxWidth="44rem"
        offsetY={footerHeight}
      />
    </div>
  );
}
