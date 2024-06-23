import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";

export default function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: {
  todo: ITodo;
  index: number;
  id: IColumnTypes;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}) {
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p className="">{todo.title}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>

        {/*TODO: add image*/}
      </div>
    </div>
  );
}
