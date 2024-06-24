import React from "react";

interface FormModalSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

export default function FormModalSubmitButton({ btnText, ...props }: FormModalSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 hover:bg-blue-200 px-4 py-2 font-medium text-sm text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
    >
      {btnText}
    </button>
  );
}
