import React, { FormEventHandler, Fragment } from "react";
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FormModalWrapperProps {
  title: string;
  isOpen: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onClose: (value: boolean) => void;
  children: React.ReactNode;
}

export default function FormModalWrapper({
  title,
  isOpen,
  onSubmit,
  onClose,
  children,
}: FormModalWrapperProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" onSubmit={onSubmit} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />

        {/*Modal Body*/}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opcaity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="overflow-hidden rounded-2xl p-6 w-full max-w-md text-left bg-white shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-6">
                  <DialogTitle as="h2" className="text-[22px] font-medium leading-6 text-gray-700">
                    {title}
                  </DialogTitle>
                  <CloseButton>
                    <XMarkIcon className="size-[20px] text-gray-800" />
                  </CloseButton>
                </div>

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
