import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Checkout from "@/components/othersPages/Checkout";

export const metadata = {
  title: " ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header3 />

        <Checkout />
        <Footer1 />
      </div>
    </>
  );
}
