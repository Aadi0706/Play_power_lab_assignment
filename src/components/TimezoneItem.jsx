import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

const TimezoneItem = ({ timezone, index, removeTimezone, darkMode }) => {
  return (
    <Draggable key={timezone.id} draggableId={timezone.id} index={index}>
      {(provided) => (
        <Flex
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          align="center"
          bg={darkMode ? 'gray.700' : 'white'}
          p={4}
          borderRadius="md"
          shadow="md"
        >
          <Text flex="1">{timezone.name}: {timezone.time.format('HH:mm')}</Text>
          <Button size="sm" onClick={() => removeTimezone(timezone.id)}>Remove</Button>
        </Flex>
      )}
    </Draggable>
  );
};

export default TimezoneItem;
