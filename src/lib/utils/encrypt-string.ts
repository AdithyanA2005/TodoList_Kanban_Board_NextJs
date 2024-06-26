import CryptoJS from "crypto-js";
import env from "@/lib/env";

export default function encryptString(data: string): string {
  const bytes = CryptoJS.AES.encrypt(data, env.secretKey);
  return bytes.toString();
}
