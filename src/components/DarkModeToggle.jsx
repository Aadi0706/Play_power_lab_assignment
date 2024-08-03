import React from 'react';
import { Switch, Flex, Text } from '@chakra-ui/react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <Flex align="center">
      <Text mr={2}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
      <Switch isChecked={darkMode} onChange={toggleDarkMode} />
    </Flex>
  );
};

export default DarkModeToggle;
