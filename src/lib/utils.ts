export function todoColumnIdToTitle(id: IColumnTypes) {
  switch (id) {
    case "todo":
      return "To Do";
    case "doing":
      return "In Progress";
    case "done":
      return "Done";
  }
}

export function setColumnsInLocalStorage(columns: IColumns) {
  localStorage.setItem("columns", JSON.stringify(Array.from(columns.entries())));
}

export function getColumnFromLocalStorage(): IColumns {
  return new Map<IColumnTypes, IColumn>(JSON.parse(localStorage.getItem("columns")!));
}
