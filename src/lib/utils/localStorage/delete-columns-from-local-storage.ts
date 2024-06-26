import encryptString from "@/lib/utils/encrypt-string";
import { ELocalStorageKeys } from "@/types/enums";

export default function deleteColumnsFromLocalStorage() {
  const encryptedKey = encryptString(ELocalStorageKeys.COLUMNS);
  localStorage.removeItem(encryptedKey);
}
