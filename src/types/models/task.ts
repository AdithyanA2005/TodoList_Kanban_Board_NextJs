import { ETaskTypes } from "@/types/enums";

export interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  status: ETaskTypes;
  image?: string;
}
