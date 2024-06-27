import env from "@/lib/env";
import { databases } from "@/lib/appwrite";
import { ETaskTypes } from "@/types/enums";
import { IColumn, IColumns } from "@/types/models/column";

export default async function getTaskColumns(): Promise<IColumns> {
  const data = await databases.listDocuments(env.awDatabaseId, env.awTodosCollectionId);

  return data.documents.reduce((acc, todo) => {
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
}
