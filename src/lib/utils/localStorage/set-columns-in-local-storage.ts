import encryptString from "@/lib/utils/encrypt-string";
import { IColumns } from "@/types/models/column";
import { ELocalStorageKeys } from "@/types/enums";

export default function setColumnsInLocalStorage(columns: IColumns) {
  const stringContent = JSON.stringify(Array.from(columns.entries()));
  const encryptedKey = encryptString(ELocalStorageKeys.COLUMNS);
  const encryptedValue = encryptString(stringContent);
  localStorage.setItem(encryptedKey, encryptedValue);
}
