import React, { useState } from 'react';
import { Button, Input, Flex } from '@chakra-ui/react';

const AddTimezone = ({ addTimezone }) => {
  const [newTimezone, setNewTimezone] = useState('');

  const handleAdd = () => {
    addTimezone(newTimezone);
    setNewTimezone('');
  };

  return (
    <Flex>
      <Input placeholder="Enter Timezone (e.g., Asia/Kolkata)" value={newTimezone} onChange={(e) => setNewTimezone(e.target.value)} />
      <Button onClick={handleAdd} ml={2}>Add</Button>
    </Flex>
  );
};

export default AddTimezone;
