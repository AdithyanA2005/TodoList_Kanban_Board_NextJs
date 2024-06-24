"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { todoColumnIdToTitle } from "@/lib/utils";
import TodoCard from "@/components/todo-card";
import { useBoardStore } from "@/store/board-store";
import { debounce } from "next/dist/server/utils";
import { useModalStore } from "@/store/modal-store";
import { PlusIcon } from "@heroicons/react/24/outline";

interface ColumnProps {
  id: IColumnTypes;
  todos: ITodo[];
  index: number;
}

export default function Column({ id, todos, index }: ColumnProps) {
  const { searchString, setSearchString, setNewTaskType } = useBoardStore();
  const { openNewTodoModal } = useModalStore();

  const searchCheck = (query: string, value: string): boolean => {
    // Return true if no query or if it's matching
    if (!query) return true;
    return value.toLowerCase().includes(query.toLowerCase());
  };
  const handleAddTodo = () => {
    setNewTaskType(id); // Select the radio according to column id(todo, doing, done)
    openNewTodoModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`}
              >
                <h2 className="flex justify-between font-bold text-xl p-1.5">
                  <div className="flex items-center gap-1">
                    <span>{todoColumnIdToTitle(id)}</span>
                    <span className="h-7 aspect-square text-gray-500 bg-gray-200 rounded-full px-2 py-1 font-mono text-xs flex justify-center items-center">
                      {!searchString
                        ? todos.length
                        : todos.filter((todo) => searchCheck(searchString, todo.title)).length}
                    </span>
                  </div>

                  <button onClick={handleAddTodo} className="rounded-full bg-gray-200/50 hover:bg-green-200/80 filter backdrop-blur-3xl p-[5px] text-gray-700 hover:text-green-800">
                    <PlusIcon className="size-[22px]" />
                  </button>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (!searchCheck(searchString, todo.title)) return null;

                    return (
                      <Draggable key={index} draggableId={todo.$id} index={index}>
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                  {/*<div className="flex justify-end items-end p-2">*/}
                  {/*</div>*/}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
