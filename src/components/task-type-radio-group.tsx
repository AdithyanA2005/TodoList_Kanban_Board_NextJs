import { useBoardStore } from "@/store/board-store";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Radio, RadioGroup } from "@headlessui/react";

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

export default function TaskTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)} className="space-y-2">
          {types.map((type) => (
            <Radio
              key={type.id}
              value={type.id}
              className={({ focus, checked }) =>
                `${focus ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300" : ""}
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
