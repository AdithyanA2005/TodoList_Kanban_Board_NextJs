import { ETaskTypes } from "@/types/enums";
import { IColumn, IColumns } from "@/types/models/column";

export default function getFilledColumns(columns?: IColumns): IColumns {
  const newColumns = new Map<ETaskTypes, IColumn>(columns);
  const columnTypes: ETaskTypes[] = Object.values(ETaskTypes);

  for (const columnType of columnTypes) {
    if (!newColumns.get(columnType)) {
      newColumns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  return newColumns;
}
