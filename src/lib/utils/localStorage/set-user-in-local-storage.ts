import encryptString from "@/lib/utils/encrypt-string";
import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";

export default function setUserInLocalStorage(user: IUser) {
  const stringContent = JSON.stringify(user);
  const encryptedKey = encryptString(ELocalStorageKeys.USER);
  const encryptedValue = encryptString(stringContent);
  localStorage.setItem(encryptedKey, encryptedValue);
}
