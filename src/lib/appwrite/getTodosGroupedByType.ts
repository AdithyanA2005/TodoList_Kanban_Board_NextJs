import env from "@/lib/env";
import { databases } from "@/lib/appwrite";
import { ETaskTypes } from "@/types/enums";
import { IColumn, IColumns } from "@/types/models/column";

export default async function getTodosGroupedByType(): Promise<IColumns> {
  const data = await databases.listDocuments(env.awDatabaseId, env.awTodosCollectionId);

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
  }, new Map<ETaskTypes, IColumn>());

  // Ensure that all columns exist even if they are empty
  const columnTypes: ETaskTypes[] = Object.values(ETaskTypes);
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

  // Return the columns
  return sortedColumns;
}
