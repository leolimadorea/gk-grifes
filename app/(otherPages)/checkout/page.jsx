import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Checkout from "@/components/othersPages/Checkout";

export const metadata = {
  title: " VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header2 />

      <Checkout />
      <Footer2 />
    </>
  );
}
