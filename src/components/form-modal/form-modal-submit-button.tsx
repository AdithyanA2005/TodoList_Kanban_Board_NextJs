import React from "react";
import clsx from "clsx";
import cn from "@/lib/utils/cn";

interface FormModalSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  submitting?: boolean;
}

export default function FormModalSubmitButton({
  btnText,
  disabled,
  submitting,
  className,
  ...props
}: FormModalSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || submitting}
      className={cn(
        "flex justify-center",
        "font-medium text-sm",
        "rounded-md border border-transparent px-4 mt-4 py-2",
        "text-blue-900 bg-blue-100 hover:bg-blue-200 ",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed",
        className,
      )}
    >
      {submitting ? <Spinner /> : null}
      {submitting ? "Please wait..." : btnText}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-[inherit]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
