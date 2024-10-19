import Link from "next/link";
import React from "react";

const BlogDetails = ({ params }) => {
//   console.log("params", params);
  return (
    <main>
      <h1>Blog Post: {params?.slug}</h1>
      <p>
        {" "}
        <Link href={"/blog"}>Blog Page</Link>
      </p>
    </main>
  );
};

export default BlogDetails;
