"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Column from "@/components/column";
import { useBoardStore } from "@/lib/store/board.store";
import { IColumn } from "@/types/models/column";

export default function Board() {
  const { columns, setColumns, updateTask } = useBoardStore();

  const handleColumnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if the user dragged the card outside of board
    if (!destination) return;

    // Handle different types of drags
    switch (type) {
      case "column":
        const entries = Array.from(columns);
        const [removed] = entries.splice(source.index, 1);
        entries.splice(destination.index, 0, removed);
        const reArrangedColumns = new Map(entries);
        setColumns(reArrangedColumns);
        break;
      case "card":
        // This step is necessary as the indexes are stored as numbers(0, 1, 2, etc), instead of id's with DND library
        // droppable id here will be indices(typeof string) of the column
        const columnsArray = Array.from(columns);
        const sourceColEntry = columnsArray[Number(source.droppableId)];
        const destinationColEntry = columnsArray[Number(destination.droppableId)];

        const sourceCol: IColumn = {
          id: sourceColEntry[0],
          todos: sourceColEntry[1].todos,
        };
        const destinationCol: IColumn = {
          id: destinationColEntry[0],
          todos: destinationColEntry[1].todos,
        };

        if (!sourceCol || !destinationCol) return;
        if (source.index === destination.index && sourceCol === destinationCol) return;

        const newTodos = sourceCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (sourceCol.id === destinationCol.id) {
          // Same column task drag
          newTodos.splice(destination.index, 0, todoMoved);
          const newCol = {
            id: sourceCol.id,
            todos: newTodos,
          };
          const newColumns = new Map(columns);
          newColumns.set(sourceCol.id, newCol);
          setColumns(newColumns);
        } else {
          // Dragging to another column
          const finishedTodos = Array.from(destinationCol.todos);
          finishedTodos.splice(destination.index, 1, todoMoved);

          const newColumns = new Map(columns);
          const newCol = {
            id: sourceCol.id,
            todos: newTodos,
          };

          newColumns.set(sourceCol.id, newCol);
          newColumns.set(destinationCol.id, {
            id: destinationCol.id,
            todos: finishedTodos,
          });

          updateTask(todoMoved, destinationCol.id);

          setColumns(newColumns);
        }
    }
  };

  return (
    <DragDropContext onDragEnd={handleColumnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto py-4 px-2 md:px-4"
          >
            {Array.from(columns.entries()).map(([columnId, column], index) => (
              <Column key={columnId} id={columnId} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
