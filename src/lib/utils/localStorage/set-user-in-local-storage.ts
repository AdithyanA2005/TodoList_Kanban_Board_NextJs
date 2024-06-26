import encryptString from "@/lib/utils/encrypt-string";
import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";

export default function setUserInLocalStorage(user: IUser) {
  const stringContent = JSON.stringify(user);
  const encryptedString = encryptString(stringContent);
  localStorage.setItem(ELocalStorageKeys.USER, encryptedString);
}
