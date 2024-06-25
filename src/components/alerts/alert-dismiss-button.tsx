import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAlertColors } from "@/lib/utils";
import { EAlertTypes } from "@/types/enums";

interface AlertDismissButton {
  type: EAlertTypes;
  dismiss: () => void;
}

export default function AlertDismissButton({ type, dismiss }: AlertDismissButton) {
  const colors = getAlertColors(type);

  return (
    <button
      type="button"
      style={{ color: colors.text }}
      className="hidden group-hover:flex absolute top-2 right-2 rounded-md p-2 hover:bg-black/5 filter backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-offset-2"
      onClick={dismiss}
    >
      <XMarkIcon className="size-[20px]" />
      <span className="sr-only">Close</span>
    </button>
  );
}
