import { EAlertTypes } from "@/types/enums";

export interface IAlert {
  id: number;
  open: boolean;
  title: string;
  type: EAlertTypes;
  message: string;
}

