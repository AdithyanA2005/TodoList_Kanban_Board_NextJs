"use client";

import { FormEvent, useRef } from "react";
import Image from "next/image";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useModalStore } from "@/lib/store/modal-store";
import { useBoardStore } from "@/lib/store/board-store";
import FormModalSubmitButton from "@/components/form-modal/form-modal-submit-button";
import FormModalWrapper from "@/components/form-modal/form-modal-wrapper";
import FormModalInput from "@/components/form-modal/form-modal-input";

interface ITaskTypeRadio {
  id: string;
  name: string;
  description: string;
  color: string;
}

const types: ITaskTypeRadio[] = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "doing",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

export default function NewTodoModal() {
  const { newTodoIsOpen, closeNewTodoModal } = useModalStore();
  const { newTaskType, newTaskInput, setNewTaskInput, image, setImage, addTask } = useBoardStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
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
        placeholder="Enter a task here..."
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
                `
                  ${focus ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300" : ""}
                  ${checked ? `${type.color} bg-opacity-75 text-white` : "bg-white"}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                `
              }
            >
              {({ focus, checked }) => (
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm/6">
                    <p className={` ${checked ? "text-white" : "text-gray-900"} font-semibold`}>
                      {type.name}
                    </p>
                    <div className={`${checked ? "text-white" : "text-gray-500"} inline`}>
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
  );
}
