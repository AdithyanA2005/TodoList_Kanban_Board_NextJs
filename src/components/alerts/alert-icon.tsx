import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import getAlertColors from "@/lib/utils/get-alert-colors";
import { EAlertTypes } from "@/types/enums";

interface AlertIconProps {
  type: EAlertTypes;
}

export default function AlertIcon({ type }: AlertIconProps) {
  const colors = getAlertColors(type);

  return (
    <div style={{ color: colors.text }} className="mr-4 flex-shrink-0">
      {type === "success" && <CheckCircleIcon className="size-7" />}
      {type === "error" && <XCircleIcon className="size-7" />}
      {type === "info" && <InformationCircleIcon className="size-7" />}
      {type === "warning" && <ExclamationCircleIcon className="size-7" />}
    </div>
  );
}
