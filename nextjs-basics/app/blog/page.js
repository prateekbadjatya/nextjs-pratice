import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <main>
      <h1>BlogPage</h1>

      <p>
        <Link href={`/blog/1`}>Post 1</Link>
      </p>
      <p>
        <Link href={`/blog/2`}>Post 2</Link>
      </p>
    </main>
  );
};

export default BlogPage;
