import { IColumn, IColumns } from "@/types/models/column";
import { ELocalStorageKeys, ETaskTypes } from "@/types/enums";

export default function getColumnFromLocalStorage(): IColumns {
  const storedContent = localStorage.getItem(ELocalStorageKeys.COLUMNS)!;
  return new Map<ETaskTypes, IColumn>(JSON.parse(storedContent));
}
