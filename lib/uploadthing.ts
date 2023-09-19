import { generateComponents } from "@uploadthing/react";
 
import type { DiskordFileRouter } from "@/app/api/uploadthing/core";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<DiskordFileRouter>();