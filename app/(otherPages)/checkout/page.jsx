import Footer1 from "@/components/footers/Footer1";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";
import Header2 from "@/components/headers/Header2";
import Checkout from "@/components/othersPages/Checkout";

export const metadata = {
  title: " CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header2 />
      <Checkout />
      <Footer1 />
      <WhatsAppButton />
    </>
  );
}
