import React from 'react';
import { Slider as ChakraSlider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from '@chakra-ui/react';

const Slider = ({ selectedTime, onSliderChange }) => {
  return (
    <ChakraSlider
      aria-label="time-slider"
      min={0}
      max={1440}
      step={15}
      value={selectedTime}
      onChange={onSliderChange}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6}>
        <Box color="tomato">{Math.floor(selectedTime / 60)}:{selectedTime % 60 < 10 ? '0' : ''}{selectedTime % 60}</Box>
      </SliderThumb>
    </ChakraSlider>
  );
};

export default Slider;
