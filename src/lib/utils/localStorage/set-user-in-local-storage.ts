import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";

export default function setUserInLocalStorage(user: IUser) {
  localStorage.setItem(ELocalStorageKeys.USER, JSON.stringify(user));
}
