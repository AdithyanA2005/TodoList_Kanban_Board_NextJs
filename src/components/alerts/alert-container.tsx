import React, { useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import getAlertColors from "@/lib/utils/get-alert-colors";
import { EAlertTypes } from "@/types/enums";

interface AlertContainerProps {
  children: React.ReactNode;
  dismiss: () => void;
  type: EAlertTypes;
  open: boolean;
}

export default function AlertContainer({ type, open, dismiss, children }: AlertContainerProps) {
  const colors = getAlertColors(type);
  const alertRef = useRef<HTMLDivElement>(null);

  // State for initial drag position and shift percentage
  const [startX, setStartX] = useState(0);
  const [shiftPercent, setShiftPercent] = useState(0);

  // Percentage of elements width in which to trigger dismiss +ve for right swipe
  const dismissThreshold = 60;

  // Handle touch actions
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Prevent bubbling to parent elements
    e.stopPropagation();

    // Making sure that working conditions are met :)
    if (!alertRef.current || !(e.touches && e.touches[0])) return;

    // Capture initial X position
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!alertRef.current || !(e.touches && e.touches[0])) return;

    // Calculate the shift Percent using drag length(deltaX) & width
    const deltaX = e.touches[0].clientX - startX;
    const width = alertRef.current!.offsetWidth;
    setShiftPercent((deltaX / width) * 100);

    // Only allow shifting towards right(+ve values). Apply drag translation
    if (shiftPercent > 0) alertRef.current!.style.transform = `translateX(${deltaX}px)`;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (shiftPercent > dismissThreshold) dismiss();
    else alertRef.current!.style.transform = "translateX(0px)";

    setStartX(0);
    setShiftPercent(0);
  };

  return (
    <Transition
      show={open} // Variable that triggers entry and leave
      appear={true} // Triggers animation on initial mount
    >
      <div
        ref={alertRef}
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
        className={clsx([
          "group relative flex items-start rounded-md border p-4",
          "cursor-grab sm:cursor-default active:cursor-grabbing select-none",
          "transition ease-in-out data-[closed]:opacity-0 data-[closed]:translate-x-full",
          "data-[enter]:duration-200",
          "data-[leave]:duration-500",
        ])}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </Transition>
  );
}
