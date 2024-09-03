import authConfig from "@/auth.config"; // this works on the edge
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/lib/constants";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // console.log("================================");
  // console.log("nextUrl.pathname: ", nextUrl.pathname);
  // console.log("isLoggedIn: ", isLoggedIn);
  // console.log("isAuthRoute: ", isAuthRoute);
  // console.log("isPublicRoute: ", isPublicRoute);
  // console.log("================================");

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isLoggedIn === false && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    /**
     * For some reason when i go to a path deeper than 1 (ex: /auth/something - wich is
     * not an Auth Route or a Public Route) it keeps adding /auth like: /auth/auth/auth/auth/login
     * and continues to redirect in a endless loop to auth/login on top of already added /auth
     *
     * TODO: keep an eye on this and be sure it is not an issue when deploy
     */
    const url = new URL("auth/login", nextUrl);
    // console.log("url: ", url.href);
    // console.log("================================");

    const link = `${url.protocol}//${url.host}/auth/login?callbackUrl=${encodedCallbackUrl}`;

    // console.log("link", link);

    // return Response.redirect(new URL("auth/login", nextUrl));
    return Response.redirect(link);
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
