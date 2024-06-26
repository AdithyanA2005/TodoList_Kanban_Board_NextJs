import { IColumns } from "@/types/models/column";
import { ELocalStorageKeys } from "@/types/enums";

export default function setColumnsInLocalStorage(columns: IColumns) {
  const stringContent = JSON.stringify(Array.from(columns.entries()));
  localStorage.setItem(ELocalStorageKeys.COLUMNS, stringContent);
}
