import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const experienceLevels = ['Junior', 'Mid', 'Senior']

export default function KanbanBoard({ candidates, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {experienceLevels.map(level => (
          <Droppable key={level} droppableId={level}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-base-200 p-4 rounded-box min-h-96"
              >
                <h3 className="text-xl font-bold mb-4">{level} ({candidates.filter(c => c.experience === level).length})</h3>
                {candidates
                  .filter(c => c.experience === level)
                  .map((candidate, index) => (
                    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <CandidateCard candidate={candidate} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}