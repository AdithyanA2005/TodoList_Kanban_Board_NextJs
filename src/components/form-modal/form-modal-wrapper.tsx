import React, { FormEventHandler, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

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
        {/*Using this transition child to apply transition to the backdrop*/}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opcaity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h2" className="text-xl font-medium leading-6 text-gray-900 pb-2">
                  {title}
                </DialogTitle>

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
