import { useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import { useBoardStore } from "@/store/board-store";
import getUrl from "@/lib/helpers/getUrl";

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
  const { deleteTask } = useBoardStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // For todos with image this will get the image url
    if (todo.image) {
      (async () => {
        const url = await getUrl(JSON.parse(todo.image!));
        if (url) setImageUrl(url.toString());
      })();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="group bg-white rounded-sm drop-shadow-md"
    >
      <div className="flex justify-between items-center px-4 py-5">
        <p className="">{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="absolute top-2 right-2 ml-5 hidden group-hover:block text-gray-400 hover:text-red-600"
        >
          <XMarkIcon className="size-6" />
        </button>
      </div>

      {imageUrl ? (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      ) : null}
    </div>
  );
}
