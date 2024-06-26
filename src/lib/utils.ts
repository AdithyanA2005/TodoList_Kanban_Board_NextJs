export function todoColumnIdToTitle(id: IColumnTypes) {
import { EAlertTypes, ETaskTypes } from "@/types/enums";
export function todoColumnIdToTitle(id: ETaskTypes) {
  switch (id) {
    case "todo":
      return "To Do";
    case "doing":
      return "In Progress";
    case "done":
      return "Done";
  }
}

export function getAlertColors(type: EAlertTypes) {
  switch (type) {
    case "success":
      return {
        bg: "var(--green-100)",
        border: "var(--green-400)",
        text: "var(--green-700)",
      };
    case "error":
      return {
        bg: "var(--red-100)",
        border: "var(--red-400)",
        text: "var(--red-700)",
      };
    case "info":
      return {
        bg: "var(--blue-100)",
        border: "var(--blue-400)",
        text: "var(--blue-700)",
      };
    case "warning":
      return {
        bg: "var(--amber-100)",
        border: "var(--amber-400)",
        text: "var(--amber-700)",
      };
    default:
      return {
        bg: "var(--gray-100)",
        border: "var(--gray-400)",
        text: "var(--gray-700)",
      };
  }
}

// COLUMNS LOCAL STORAGE

export function setColumnsInLocalStorage(columns: IColumns) {
  localStorage.setItem("columns", JSON.stringify(Array.from(columns.entries())));
}

export function getColumnFromLocalStorage(): IColumns {
  return new Map<IColumnTypes, IColumn>(JSON.parse(localStorage.getItem("columns")!));
}
