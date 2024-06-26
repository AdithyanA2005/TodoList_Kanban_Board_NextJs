import React from "react";
import cn from "@/lib/utils/cn";

interface FormModalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function FormModalInput({ className, ...props }: FormModalInputProps) {
  return (
    <input
      {...props}
      className={cn("px-4 py-3 w-full border border-gray-300 rounded-md outline-none", className)}
    />
  );
}
