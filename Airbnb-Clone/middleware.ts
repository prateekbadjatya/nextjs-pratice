import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/bookings(.*)',
  '/checkout(.*)',
  '/favorites(.*)',
  '/profile(.*)',
  '/rentals(.*)',
  '/reviews(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};


//https://clerk.com/docs/quickstarts/react


// # In Next.js, environment variables that start with NEXT*PUBLIC* are exposed to the browser. This means they can be accessed in your front-end code.

// # For example, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY can be used in both server-side and client-side code.

// # On the other hand, CLERK_SECRET_KEY is a server-side environment variable. It's not exposed to the browser, making it suitable for storing sensitive data like API secrets.

// # 
// # [Clerk Docs](https://clerk.com/)
// # [Clerk + Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)

// https://dashboard.clerk.com/apps/app_2pdHXNtTYuE7XvcTjBShPcHobAR/instances/ins_2pdHXLvnaZHz7b9PC7VvmzD3xsa/