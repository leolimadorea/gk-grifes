import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Checkout from "@/components/othersPages/Checkout";

export const metadata = {
  title: " VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header18 />

      <Checkout />
      <Footer1 />
    </>
  );
}
