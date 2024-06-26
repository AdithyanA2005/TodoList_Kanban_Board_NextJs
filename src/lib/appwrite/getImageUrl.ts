import { storage } from "@/lib/appwrite";
import { IImage } from "@/types/utils/image";

export default async function getImageUrl(image: IImage) {
  return storage.getFilePreview(image.bucketId, image.fileId);
}
