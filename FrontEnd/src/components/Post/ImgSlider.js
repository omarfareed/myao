import { Box, ImageListItem } from '@mui/material';
import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import {slider,image,right_arrow,left_arrow,slide as s,slide_active} from "./imgSliderStyles.js"

const ImageSlider = ({ SliderData, currentimg }) => {

  const [current, setCurrent] = useState(currentimg);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <Box sx={slider} >
      <Box sx={left_arrow}><FaArrowAltCircleLeft  onClick={prevSlide} /></Box>
      <Box sx={right_arrow} ><FaArrowAltCircleRight  onClick={nextSlide} /></Box>
      {SliderData.map((slide, index) => {
        return (
          <Box
            sx={index === current ? slide_active : s}
            key={index}
          >
            {index === current && (
                <ImageListItem sx={image} >
              <img src={slide.img} alt='travel image'   />
              </ImageListItem>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ImageSlider;