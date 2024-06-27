import { ELocalStorageKeys } from "@/types/enums";

export default function deleteTempColumnsFromLocalStorage() {
  localStorage.removeItem(ELocalStorageKeys.TEMPCOLUMNS);
}
