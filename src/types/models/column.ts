import { ETaskTypes } from "@/types/enums";
import { ITodo } from "@/types/models/task";

export interface IColumn {
  id: ETaskTypes;
  todos: ITodo[];
}

export type IColumns = Map<ETaskTypes, IColumn>;
