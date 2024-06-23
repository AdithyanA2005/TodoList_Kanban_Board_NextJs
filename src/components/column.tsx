"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { todoColumnIdToTitle } from "@/lib/utils";
import TodoCard from "@/components/todo-card";
import { useBoardStore } from "@/store/board-store";
import { debounce } from "next/dist/server/utils";
import { useModalStore } from "@/store/modal-store";

interface ColumnProps {
  id: IColumnTypes;
  todos: ITodo[];
  index: number;
}

export default function Column({ id, todos, index }: ColumnProps) {
  const { searchString, setSearchString, setNewTaskType } = useBoardStore();
  const { openModal } = useModalStore();

  const searchCheck = (query: string, value: string): boolean => {
    // Return true if no query or if it's matching
    if (!query) return true;
    return value.toLowerCase().includes(query.toLowerCase());
  };
  const handleAddTodo = () => {
    setNewTaskType(id); // Select the radio according to column id(todo, doing, done)
    openModal();
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
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {todoColumnIdToTitle(id)}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 font-mono text-xs flex justify-center items-center">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) => searchCheck(searchString, todo.title)).length}
                  </span>
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

                  <div className="flex justify-end items-end p-2">
                    <button onClick={handleAddTodo} className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
