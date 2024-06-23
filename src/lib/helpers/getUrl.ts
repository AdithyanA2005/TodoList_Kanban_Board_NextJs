import { storage } from "@/lib/appwrite";

export default async function getUrl(image: IImage) {
  return storage.getFilePreview(image.bucketId, image.fileId);
}
