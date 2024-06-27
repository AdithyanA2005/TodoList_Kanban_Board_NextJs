import { ETaskTypes } from "@/types/enums";
import { IColumns } from "@/types/models/column";

export default function sortColumns(columns: IColumns, order: ETaskTypes[]): IColumns {
  const sortedMap = new Map();
  for (const key of order) {
    const value = columns.get(key);
    if (value) sortedMap.set(key, value);
  }

  return sortedMap;
}
