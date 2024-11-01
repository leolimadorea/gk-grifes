import BlogDetails from "@/components/blogs/BlogDetails";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Header2 from "@/components/headers/Header2";
import { allBlogs } from "@/data/blogs";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Blog Details || Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page({ params }) {
  const blog = allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Blog Detail</div>
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
      <BlogDetails blog={blog} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
