import BlogGrid from "@/components/blogs/BlogGrid";
import Footer1 from "@/components/footers/Footer1";
import Header6 from "@/components/headers/Header6";
import Link from "next/link";
export const metadata = {
  title: "Imuno-Pump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Header6 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Blog Grid</div>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Fashion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BlogGrid />
      <Footer1 />
    </>
  );
}
