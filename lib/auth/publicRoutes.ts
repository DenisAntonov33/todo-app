export const publicRoutes = ["/login", "/signup", "/auth"];
const MAIN_ROUTE = "/";

export const isPublicRoute = (path: string) =>
  publicRoutes.some(route => path.includes(route) || path === MAIN_ROUTE);
