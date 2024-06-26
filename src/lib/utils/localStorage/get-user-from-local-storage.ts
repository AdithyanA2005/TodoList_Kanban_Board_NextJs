import { IUser } from "@/types/models/user";
import { ELocalStorageKeys } from "@/types/enums";

export default function getUserFromLocalStorage(): IUser {
  const storedContent = localStorage.getItem(ELocalStorageKeys.USER)!;
  return JSON.parse(storedContent);
}

