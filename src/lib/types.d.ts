import { ETaskTypes } from "@/types/enums";


interface IImage {
  bucketId: string;
  fileId: string;
}

interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  status: ETaskTypes;
  image?: `${IImage}`;
}

interface IColumn {
  id: ETaskTypes;
  todos: ITodo[];
}

type IColumns = Map<ETaskTypes, IColumn>;

