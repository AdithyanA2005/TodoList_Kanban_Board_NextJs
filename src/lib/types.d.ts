type IColumnTypes = "todo" | "doing" | "done";

interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  status: IColumnTypes;
  image?: URL;
}

interface IColumn {
  id: IColumnTypes;
  todos: ITodo[];
}

interface IBoard {
  columns: Map<IColumnTypes, IColumn>;
}

interface IImage {
  bucketId: string;
  fileId: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_AW_ENDPOINT?: string;
    NEXT_PUBLIC_AW_PROJECT_ID?: string;
    NEXT_PUBLIC_AW_DATABASE_ID?: string;
    NEXT_PUBLIC_AW_TODOS_COLLECTION_ID?: string;
  }
}
