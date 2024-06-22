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
