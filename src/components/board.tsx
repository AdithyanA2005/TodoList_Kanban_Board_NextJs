"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useBoardStore } from "@/store/board-store";
import Column from "@/components/column";

export default function Board() {
  const [board, getBoard] = useBoardStore((state) => [state.board, state.getBoard]);
  const handleDragEnd = (result: DropResult) => {};

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([columnId, column], index) => (
              <Column key={columnId} id={columnId} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
