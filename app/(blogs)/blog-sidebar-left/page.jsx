"use client";
import BlogLeftSidebar from "@/components/blogs/BlogLeftSidebar";
import Footer1 from "@/components/footers/Footer1";

import React from "react";
import Link from "next/link";
import Header18 from "@/components/headers/Header18";

export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Blog Sidebar Left</div>
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
      <BlogLeftSidebar />

      <Footer1 />
    </>
  );
}
