import CryptoJS from "crypto-js";
import env from "@/lib/env";

export default function decryptString(data: string): string {
  const bytes = CryptoJS.AES.decrypt(data, env.secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
