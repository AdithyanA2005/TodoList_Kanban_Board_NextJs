import { ID, storage } from "@/lib/appwrite";
import env from "@/lib/env";

export default async function uploadImage(file: File) {
  if (!file) return null;
  return await storage.createFile(env.awImageStorageId, ID.unique(), file);
}
