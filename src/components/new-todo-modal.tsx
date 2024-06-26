"use client";

import { FormEvent, useRef } from "react";
import Image from "next/image";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import FormModalSubmitButton from "@/components/form-modal/form-modal-submit-button";
import FormModalWrapper from "@/components/form-modal/form-modal-wrapper";
import FormModalInput from "@/components/form-modal/form-modal-input";
import cn from "@/lib/utils/cn";
import { useModalStore } from "@/lib/store/modal.store";
import { useBoardStore } from "@/lib/store/board.store";
import { useAlertStore } from "@/lib/store/alert.stote";
import { EAlertTypes } from "@/types/enums";

interface ITaskTypeRadio {
  id: string;
  name: string;
  description: string;
  bgColorClass: string;
}

const types: ITaskTypeRadio[] = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    bgColorClass: "bg-red-500",
  },
  {
    id: "doing",
    name: "In Progress",
    description: "A task that is currently being worked on",
    bgColorClass: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    bgColorClass: "bg-green-500",
  },
];

export default function NewTodoModal() {
  const { newAlert } = useAlertStore();
  const { newTodoIsOpen, closeNewTodoModal } = useModalStore();
  const { newTaskType, newTaskInput, setNewTaskInput, image, setImage, addTask } = useBoardStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Display an alert if the task title is empty
    if (!newTaskInput) {
      newAlert(
        {
          title: "Task title is required",
          message: "Please enter title of the task to be added",
          type: EAlertTypes.Error,
        },
        5000,
      );

      return;
    }

    // Add the task to the board if title is not empty
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeNewTodoModal();
  };

  return (
    <FormModalWrapper
      title="Add a Task"
      isOpen={newTodoIsOpen}
      onSubmit={handleSubmit}
      onClose={closeNewTodoModal}
    >
      <FormModalInput
        type="text"
        value={newTaskInput}
        onChange={(e) => setNewTaskInput(e.target.value)}
        placeholder="Enter a task title..."
        className="mt-2"
      />
      <TaskTypeRadioGroup />
      <ImageField />
      <FormModalSubmitButton btnText="Add Task" disabled={!newTaskInput} />
    </FormModalWrapper>
  );
}

function TaskTypeRadioGroup() {
  const { newTaskType, setNewTaskType } = useBoardStore();

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)} className="space-y-2">
          {types.map((type) => (
            <Radio
              key={type.id}
              value={type.id}
              className={({ focus, checked }) =>
                cn(
                  "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none",
                  focus && "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300",
                  checked ? `${type.bgColorClass} bg-opacity-75 text-white` : "bg-white",
                )
              }
            >
              {({ focus, checked }) => (
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm/6">
                    <p className={cn("font-semibold", checked ? "text-white" : "text-gray-900")}>
                      {type.name}
                    </p>
                    <div className={cn("inline", checked ? "text-white" : "text-gray-500")}>
                      {type.description}
                    </div>
                  </div>

                  {checked ? <CheckCircleIcon className="size-6 fill-white" /> : null}
                </div>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function ImageField() {
  const { image, setImage, addTask } = useBoardStore();
  const imagePickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border border-gray-300 rounded-md">
      {image ? (
        <Image
          alt="Uploaded Image"
          width={200}
          height={200}
          className={cn(
            "cursor-not-allowed",
            "object-cover w-full h-fit rounded-[inherit]",
            "filter hover:grayscale transition-all duration-150",
          )}
          src={URL.createObjectURL(image)}
          onClick={() => setImage(null)}
        />
      ) : (
        <button
          type="button"
          onClick={() => imagePickerRef.current?.click()}
          className={cn(
            "p-5 w-full min-h-28",
            "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          )}
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
  );
}
