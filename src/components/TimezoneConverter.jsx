import React, { useState } from 'react';
import { Box, Button, Flex, Text, Stack } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import Slider from './Slider';

const TimezoneConverter = ({ timezone, index, onTimeChange, removeTimezone }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(moment().tz('UTC').diff(moment().startOf('day'), 'minutes'));

  const handleSliderChange = (value) => {
    setSelectedTime(value);
    const updatedTime = moment(selectedDate).startOf('day').add(value, 'minutes').tz(timezone.name, true);
    onTimeChange(updatedTime, timezone.id);
  };

  const timeInZone = moment.tz(moment(selectedDate).startOf('day').add(selectedTime, 'minutes'), timezone.name);

  return (
    <Draggable draggableId={timezone.id} index={index}>
      {(provided) => (
        <Box
          p={4}
          bg="white"
          borderRadius="md"
          shadow="md"
          width="100%"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack spacing={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg">{timezone.name}</Text>
              <Button size="sm" onClick={() => removeTimezone(timezone.id)}>Remove</Button>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="2xl">{timeInZone.format('HH:mm')}</Text>
              <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
            </Flex>
            <Slider selectedTime={selectedTime} onSliderChange={handleSliderChange} />
            <Text>Selected Time: {timeInZone.format('MMMM Do YYYY, h:mm A')}</Text>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default TimezoneConverter;
