import { ETaskTypes } from "@/types/enums";

export default function getColumnDisplayName(id: ETaskTypes) {
  switch (id) {
    case "todo":
      return "To Do";
    case "doing":
      return "In Progress";
    case "done":
      return "Done";
  }
}
