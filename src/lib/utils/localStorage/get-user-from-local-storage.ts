import decryptString from "@/lib/utils/decrypt-string";
import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";
import encryptString from "@/lib/utils/encrypt-string";

export default function getUserFromLocalStorage(): IUser | null {
  const encryptedKey = encryptString(ELocalStorageKeys.USER);
  const storedEncryptedValue = localStorage.getItem(encryptedKey);
  if (!storedEncryptedValue) return null;

  const decryptedValue = decryptString(storedEncryptedValue);
  return JSON.parse(decryptedValue);
}
