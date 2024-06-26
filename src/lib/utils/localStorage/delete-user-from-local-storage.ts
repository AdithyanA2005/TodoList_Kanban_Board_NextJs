import { ELocalStorageKeys } from "@/types/enums";

export default function deleteUserFromLocalStorage() {
  localStorage.removeItem(ELocalStorageKeys.USER);
}
