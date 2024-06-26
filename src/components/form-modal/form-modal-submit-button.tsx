import React from "react";
import clsx from "clsx";
import cn from "@/lib/utils/cn";

interface FormModalSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

export default function FormModalSubmitButton({
  btnText,
  className,
  ...props
}: FormModalSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "flex justify-center",
        "font-medium text-sm",
        "rounded-md border border-transparent px-4 mt-4 py-2",
        "text-blue-900 bg-blue-100 hover:bg-blue-200 ",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed",
        className,
      )}
    >
      {btnText}
    </button>
  );
}
