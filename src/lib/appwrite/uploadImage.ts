import { ID, storage } from "@/lib/appwrite";

export default async function uploadImage(file: File) {
  if (!file) return null;
  return await storage.createFile(process.env.NEXT_PUBLIC_AW_IMAGE_STORAGE_ID!, ID.unique(), file);
}
