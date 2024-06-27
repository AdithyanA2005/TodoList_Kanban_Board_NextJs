import { useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import cn from "@/lib/utils/cn";
import getImageUrl from "@/lib/appwrite/get-image-url";
import { useBoardStore } from "@/lib/store/board.store";
import { ETaskTypes } from "@/types/enums";
import { ITodo } from "@/types/models/task";

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
  id: ETaskTypes;
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
        const url = await getImageUrl(JSON.parse(todo.image!));
        if (url) setImageUrl(url.toString());
      })();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="group outline-none select-none relative bg-white rounded-sm drop-shadow-md"
    >
      {imageUrl ? (
        <div className="h-full w-full rounded-t-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-[inherit]"
          />
        </div>
      ) : null}

      <div className="flex justify-between items-center px-4 py-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className={cn(
            "hidden group-hover:block",
            "absolute right-0 top-0 translate-x-1/4 -translate-y-1/4",
            "shadow-2xl rounded-full p-[5px]",
            "bg-red-100 text-gray-800 hover:text-red-700",
            "transition duration-200",
          )}
        >
          <XMarkIcon className="size-5 " strokeWidth={2.1} />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
