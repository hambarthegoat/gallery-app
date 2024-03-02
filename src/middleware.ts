import { authMiddleware } from "@clerk/nextjs";
 
// Autentikasi 
export default authMiddleware({
    publicRoutes: ["/"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};