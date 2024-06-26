import { ELocalStorageKeys } from "@/types/enums";

export default function deleteColumnsFromLocalStorage() {
  localStorage.removeItem(ELocalStorageKeys.COLUMNS);
}
