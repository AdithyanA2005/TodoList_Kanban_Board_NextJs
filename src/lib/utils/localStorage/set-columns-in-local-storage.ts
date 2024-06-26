import encryptString from "@/lib/utils/encrypt-string";
import { IColumns } from "@/types/models/column";
import { ELocalStorageKeys } from "@/types/enums";

export default function setColumnsInLocalStorage(columns: IColumns) {
  const stringContent = JSON.stringify(Array.from(columns.entries()));
  const encryptedString = encryptString(stringContent);
  localStorage.setItem(ELocalStorageKeys.COLUMNS, encryptedString);
}
