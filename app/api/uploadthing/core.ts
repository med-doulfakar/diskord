import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const diskordFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(() => console.log("Server image upload complete")),
  messageFile: f(['image', 'pdf'])
    .middleware(handleAuth)
    .onUploadComplete(() => console.log("message file upload complete")),
} satisfies FileRouter;

export type DiskordFileRouter = typeof diskordFileRouter;
