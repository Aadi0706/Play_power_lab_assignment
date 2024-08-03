import React from 'react';
import { Stack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TimezoneItem from './TimezoneItem';

const TimezoneList = ({ timezones, onDragEnd, removeTimezone, darkMode }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="timezones">
        {(provided) => (
          <Stack {...provided.droppableProps} ref={provided.innerRef} spacing={4} mt={4}>
            {timezones.map((tz, index) => (
              <TimezoneItem
                key={tz.id}
                timezone={tz}
                index={index}
                removeTimezone={removeTimezone}
                darkMode={darkMode}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TimezoneList;
