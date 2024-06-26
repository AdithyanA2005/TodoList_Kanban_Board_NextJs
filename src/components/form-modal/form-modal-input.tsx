import React from "react";

interface FormModalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function FormModalInput({ className, ...props }: FormModalInputProps) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-300 rounded-md outline-none px-4 py-3 ${className}`}
    />
  );
}
