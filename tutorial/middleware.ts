/*

Middleware in Next.js is a piece of code that allows you to perform actions before a request is completed and modify the response accordingly.

- create middleware.ts in the root
- by default will be invoked for every route in your project



[Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
*/

export function middleware(request) {
  return Response.json({ msg: "hello there" });
}

export const config = {
  //because of matcher the above middlewafe run only for /about endpoint
  matcher: "/about",
};

//-------------------------------------------------------------------------

// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/about/:path*", "/tours/:path*"],
// };
