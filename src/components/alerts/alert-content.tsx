import React from "react";
import getAlertColors from "@/lib/utils/get-alert-colors";
import { EAlertTypes } from "@/types/enums";

interface AlertContentProps {
  type: EAlertTypes;
  title: string;
  message: string;
}

export default function AlertContent({ type, title, message }: AlertContentProps) {
  const colors = getAlertColors(type);

  return (
    <div className="flex-1">
      <h3 style={{ color: colors.text }} className="text-sm font-medium">
        {title}
      </h3>
      <p style={{ color: colors.text }} className="mt-2 text-sm">
        {message}
      </p>
    </div>
  );
}

