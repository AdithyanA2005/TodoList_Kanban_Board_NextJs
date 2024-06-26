import encryptString from "@/lib/utils/encrypt-string";
import { ELocalStorageKeys } from "@/types/enums";

export default function deleteUserFromLocalStorage() {
  const encryptedKey = encryptString(ELocalStorageKeys.USER);
  localStorage.removeItem(encryptedKey);
}
