type IColumnTypes = "todo" | "doing" | "done";

interface IImage {
  bucketId: string;
  fileId: string;
}

interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  status: IColumnTypes;
  image?: `${IImage}`;
}

interface IColumn {
  id: IColumnTypes;
  todos: ITodo[];
}

type IColumns = Map<IColumnTypes, IColumn>;

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_AW_ENDPOINT?: string;
    NEXT_PUBLIC_AW_PROJECT_ID?: string;
    NEXT_PUBLIC_AW_DATABASE_ID?: string;
    NEXT_PUBLIC_AW_TODOS_COLLECTION_ID?: string;
  }
}
