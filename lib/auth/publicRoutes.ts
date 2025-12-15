export const publicRoutes = ["/login", "/signup", "/api/auth"];
const MAIN_ROUTE = "/";

export const isPublicRoute = (path: string) =>
  publicRoutes.some(route => path.startsWith(route) || path === MAIN_ROUTE);
