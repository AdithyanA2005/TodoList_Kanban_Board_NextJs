"use client";

import { FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useModalStore } from "@/store/modal-store";
import { useBoardStore } from "@/store/board-store";
import TaskTypeRadioGroup from "@/components/task-type-radio-group";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Modal() {
  const { isOpen, closeModal } = useModalStore();
  const { newTaskType, newTaskInput, setNewTaskInput, image, setImage, addTask } = useBoardStore();

  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" onSubmit={handleSubmit} onClose={closeModal} className="relative z-10">
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

        {/*Main Modal Body*/}
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
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a Task
                </DialogTitle>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-4"
                  />
                </div>

                <TaskTypeRadioGroup />

                {/*Image Preview or New Image Button*/}
                <div className="border border-gray-300 rounded-md">
                  {image ? (
                    <Image
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-full h-fit object-cover filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-[inherit]"
                      src={URL.createObjectURL(image)}
                      onClick={() => setImage(null)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => imagePickerRef.current?.click()}
                      className="w-full outline-none p-5 min-h-28 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                      Upload Image
                    </button>
                  )}

                  <input
                    hidden
                    type="file"
                    ref={imagePickerRef}
                    onChange={(e) => {
                      // Check that e is an image
                      if (!e.target.files![0]?.type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 hover:bg-blue-200 px-4 py-2 font-medium text-sm text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
