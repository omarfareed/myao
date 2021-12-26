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
const PostImgs = (props) => {
  const photos = props.media;

  const photolength = photos.length;

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

  return <>{imgs}</>;
};

export default PostImgs;
