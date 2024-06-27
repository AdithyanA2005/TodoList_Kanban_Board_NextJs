import decryptString from "@/lib/utils/decrypt-string";
import { IColumn, IColumns } from "@/types/models/column";
import { ELocalStorageKeys, ETaskTypes } from "@/types/enums";

export default function getTempColumnFromLocalStorage(): IColumns {
  const storedEncryptedString = localStorage.getItem(ELocalStorageKeys.TEMPCOLUMNS);
  if (!storedEncryptedString) return new Map<ETaskTypes, IColumn>();

  const decryptedString = decryptString(storedEncryptedString);
  return new Map<ETaskTypes, IColumn>(JSON.parse(decryptedString));
}
