import encryptString from "@/lib/utils/encrypt-string";
import decryptString from "@/lib/utils/decrypt-string";
import { IColumn, IColumns } from "@/types/models/column";
import { ELocalStorageKeys, ETaskTypes } from "@/types/enums";

export default function getColumnFromLocalStorage(): IColumns {
  const encryptedKey = encryptString(ELocalStorageKeys.COLUMNS);
  const storedEncryptedString = localStorage.getItem(ELocalStorageKeys.COLUMNS);
  if (!storedEncryptedString) return new Map<ETaskTypes, IColumn>();

  const decryptedString = decryptString(storedEncryptedString);
  return new Map<ETaskTypes, IColumn>(JSON.parse(decryptedString));
}
