import React from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
} from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";

//////////////////////
import ImageSlider from "./ImgSlider";

////////////////////////

const PostImgs = ({ photos = [] }) => {
  const [open, setOpen] = React.useState(false);
  const photolength = photos.length;
  const handleOpen = () => {
    setOpen(true); /* get the img postio in array*/
  };
  const handleClose = () => {
    setOpen(false);
    console.log("sss");
  };
  const imgIndex = 3;

  let imgs;
  if (photolength > 3)
    imgs = (
      <ImageList
        gap={3}
        rowHeight={121}
        variant="quilted"
        sx={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
        cols={3}
      >
        <ImageListItem
          rows={2}
          cols={5}
          sx={{
            margin: "0px",
          }}
        >
          <img src={photos[0].img} alt={photos[0].title} onClick={handleOpen} />
        </ImageListItem>
        <ImageListItem rows={1} cols={2} sx={{}}>
          <img src={photos[1].img} alt={photos[1].title} onClick={handleOpen} />
        </ImageListItem>
        <ImageListItem rows={1} cols={3} sx={{ height: "150%" }}>
          <img src={photos[2].img} alt={photos[2].title} onClick={handleOpen} />
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
                onClick={handleOpen}
              >
                <AiOutlinePlusCircle />
              </IconButton>
            }
          />
        </ImageListItem>
      </ImageList>
    );

  if (photolength == 3)
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
          <img src={photos[0].img} alt={photos[0].title} onClick={handleOpen} />
        </ImageListItem>
        <ImageListItem rows={1} cols={2} sx={{ transform: "scale(1,.8)" }}>
          <img src={photos[1].img} alt={photos[1].title} onClick={handleOpen} />
        </ImageListItem>
        <ImageListItem
          rows={1}
          cols={3}
          sx={{ transform: "scale(1,.8)", height: "150%" }}
        >
          <img src={photos[2].img} alt={photos[2].title} onClick={handleOpen} />
        </ImageListItem>
      </ImageList>
    );

  if (photolength == 2)
    imgs = (
      <ImageList
        gap={1}
        rowHeight={121}
        variant="quilted"
        sx={{ width: "100%", height: "auto", overflow: "hidden" }}
        cols={1}
      >
        <ImageListItem cols={2} sx={{ transform: "scale(1,1.2)" }}>
          <img src={photos[0].img} alt={photos[0].title} onClick={handleOpen} />
        </ImageListItem>
        <ImageListItem cols={2} sx={{ transform: "scale(1,.8)" }}>
          <img src={photos[1].img} alt={photos[1].title} onClick={handleOpen} />
        </ImageListItem>
      </ImageList>
    );

  if (photolength == 1)
    imgs = (
      <ImageList
        gap={1}
        rowHeight={121}
        variant="quilted"
        sx={{ width: "100%", height: "auto", overflow: "hidden" }}
        cols={1}
      >
        <ImageListItem rows={2} cols={2} sx={{ transform: "scale(1,1.2)" }}>
          <img src={photos[0].img} alt={photos[0].title} onClick={handleOpen} />
        </ImageListItem>
      </ImageList>
    );

  return (
    <>
      {imgs}
      <Modal open={open} onClose={handleClose}>
        <ImageSlider SliderData={photos} currentimg={imgIndex} />
      </Modal>
    </>
  );
};

export default PostImgs;
