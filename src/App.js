import React, { useState } from 'react';
import { Box, Container, Heading, VStack, Button } from '@chakra-ui/react';
import TimezoneConverter from './components/TimezoneConverter';
import AddTimezone from './components/AddTimeZone';
import DarkModeToggle from './components/DarkModeToggle';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import moment from 'moment-timezone';

const App = () => {
  const [timezones, setTimezones] = useState([
    { id: 'UTC', name: 'UTC', time: moment().tz('UTC') },
    { id: 'Asia/Kolkata', name: 'IST', time: moment().tz('Asia/Kolkata') },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  const addTimezone = (timezone) => {
    if (timezone && moment.tz.names().includes(timezone)) {
      const timezoneData = {
        id: timezone,
        name: timezone,
        time: moment().tz(timezone),
      };
      setTimezones([...timezones, timezoneData]);
    }
  };

  const removeTimezone = (id) => {
    setTimezones(timezones.filter(tz => tz.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timezones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTimezones(items);
  };

  const onTimeChange = (newTime, timezoneId) => {
    setTimezones((prevTimezones) => {
      return prevTimezones.map((tz) => {
        if (tz.id === timezoneId) {
          return { ...tz, time: newTime };
        } else {
          return { ...tz, time: newTime.clone().tz(tz.id) };
        }
      });
    });
  };

  const handleSubmit = () => {
    console.log("Current Timezones:", timezones);
  };

  return (
    <Box bg={darkMode ? 'gray.800' : 'gray.100'} color={darkMode ? 'white' : 'black'} minH="100vh" p={4}>
      <Container maxW="container.md">
        <Heading as="h1" textAlign="center" mb={6}>
          Timezone Converter
        </Heading>
        <VStack spacing={6}>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <AddTimezone addTimezone={addTimezone} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="timezones">
              {(provided) => (
                <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={6} width="100%">
                  {timezones.map((tz, index) => (
                    <TimezoneConverter
                      key={tz.id}
                      timezone={tz}
                      index={index}
                      onTimeChange={onTimeChange}
                      removeTimezone={removeTimezone}
                    />
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
          <Button onClick={handleSubmit} colorScheme="blue" mt={4}>
            Submit
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default App;
