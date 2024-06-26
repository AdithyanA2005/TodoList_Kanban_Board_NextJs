import cn from "@/lib/utils/cn";

export default function BgGradient() {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 -z-50",
        "w-full h-96 rounded-md",
        "filter blur-3xl opacity-50",
        "bg-gradient-to-br from-pink-400 to-primary",
      )}
    />
  );
}
