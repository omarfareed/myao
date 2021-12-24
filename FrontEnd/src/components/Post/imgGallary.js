// import { useState, useCallback } from "react";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
// import Button from "@mui/material/Button";

import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";

const photos = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const photolength = 1;

let imgs;

if (photolength > 3)
  imgs = (
    <ImageList
      gap={1}
      rowHeight={121}
      variant="quilted"
      sx={{ width: "100%", height: "auto", overflow: "hidden" }}
      cols={3}
    >
      <ImageListItem
        rows={2}
        cols={5}
        sx={{ transform: "scale(1,.8)", margin: "0px" }}
      >
        <img src={photos[0].img} alt={photos[0].title} />
      </ImageListItem>
      <ImageListItem rows={1} cols={2} sx={{ transform: "scale(1,.8)" }}>
        <img src={photos[1].img} alt={photos[1].title} />
      </ImageListItem>
      <ImageListItem
        rows={1}
        cols={3}
        sx={{ transform: "scale(1,.8)", height: "150%" }}
      >
        <img src={photos[2].img} alt={photos[2].title} />
        <ImageListItemBar
          position="top"
          sx={{ height: "100%" }}
          actionIcon={
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
              }}
            >
              <AiOutlinePlusCircle />
            </IconButton>
          }
        />
      </ImageListItem>
    </ImageList>
  );

if (photolength === 3)
  imgs = (
    <ImageList
      gap={1}
      rowHeight={121}
      variant="quilted"
      sx={{ width: "100%", height: "auto", overflow: "hidden" }}
      cols={3}
    >
      <ImageListItem
        rows={2}
        cols={5}
        sx={{ transform: "scale(1,.8)", margin: "0px" }}
      >
        <img src={photos[0].img} alt={photos[0].title} />
      </ImageListItem>
      <ImageListItem rows={1} cols={2} sx={{ transform: "scale(1,.8)" }}>
        <img src={photos[1].img} alt={photos[1].title} />
      </ImageListItem>
      <ImageListItem
        rows={1}
        cols={3}
        sx={{ transform: "scale(1,.8)", height: "150%" }}
      >
        <img src={photos[2].img} alt={photos[2].title} />
      </ImageListItem>
    </ImageList>
  );

if (photolength === 2)
  imgs = (
    <ImageList
      gap={1}
      rowHeight={121}
      variant="quilted"
      sx={{ width: "100%", height: "auto", overflow: "hidden" }}
      cols={1}
    >
      <ImageListItem cols={2} sx={{ transform: "scale(1,1.2)" }}>
        <img src={photos[0].img} alt={photos[0].title} />
      </ImageListItem>
      <ImageListItem cols={2} sx={{ transform: "scale(1,.8)" }}>
        <img src={photos[1].img} alt={photos[1].title} />
      </ImageListItem>
    </ImageList>
  );

if (photolength === 1)
  imgs = (
    <ImageList
      gap={1}
      rowHeight={121}
      variant="quilted"
      sx={{ width: "100%", height: "auto", overflow: "hidden" }}
      cols={1}
    >
      <ImageListItem rows={2} cols={2} sx={{ transform: "scale(1,1.2)" }}>
        <img src={photos[0].img} alt={photos[0].title} />
      </ImageListItem>
    </ImageList>
  );

const PostImgs = (props) => {
  return <>{imgs}</>;
};

export default PostImgs;
