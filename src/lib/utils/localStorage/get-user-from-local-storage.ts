import decryptString from "@/lib/utils/decrypt-string";
import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";

export default function getUserFromLocalStorage(): IUser | null {
  const storedEncryptedValue = localStorage.getItem(ELocalStorageKeys.USER);
  if (!storedEncryptedValue) return null;

  const decryptedValue = decryptString(storedEncryptedValue);
  return JSON.parse(decryptedValue);
}
