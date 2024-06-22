import { databases } from "@/lib/appwrite";

export default async function getTodosGroupedByColum() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_AW_DATABASE_ID!,
    process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID!,
  );

  // Group the to-dos by column
  const columns = data.documents.reduce((acc, todo) => {
    // Initialize the column for the to-do if it doesn't exist
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    // Add the to-do to the appropriate columns todos list
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      $updatedAt: todo.$updatedAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image ? { image: todo.image } : {}),
    });

    return acc;
  }, new Map<IColumnTypes, IColumn>());

  // Ensure that all columns exist even if they are empty
  const columnTypes: IColumnTypes[] = ["todo", "doing", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // TODO: Sort columns according to the users preference
  const sortedColumns = columns;

  // Return the columns in a board
  const board: IBoard = { columns: sortedColumns };
  return board;
}
