import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
    console.log("Middleware executed for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Protect /admin routes - only admin role
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        // Protect /Home routes - both admin and user roles
        if (pathname.startsWith("/Home")) {
          return token?.role === "user";
        }

        if (pathname.startsWith("/Graphs")) {
          return token?.role === "user";
        }

        // For other protected routes, just check if user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/Home/:path*", "/Graphs/:path*"],
};
