import { useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import cn from "@/lib/utils/cn";
import getImageUrl from "@/lib/appwrite/getImageUrl";
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
      className="group bg-white rounded-sm drop-shadow-md"
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
            "absolute top-2.5 right-2.5",
            "p-1 ml-5 rounded-full",
            "text-gray-600 hover:text-red-600",
            "filter backdrop-blur-3xl bg-white/30",
          )}
        >
          <XMarkIcon className="size-[20px]" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
