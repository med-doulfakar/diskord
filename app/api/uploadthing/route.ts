import { createNextRouteHandler } from "uploadthing/next";
 
import { diskordFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: diskordFileRouter,
});