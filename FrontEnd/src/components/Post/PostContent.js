import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import ShowMoreText from "react-show-more-text";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const PostContent = ({ text }) => {
  return (
    <CardContent sx={{ padding: "1rem", minHeight: "2rem" }}>
      <ShowMoreText
        lines={3}
        more={<MdExpandMore title="Show More" />}
        less={<MdExpandLess title="Show Less" />}
        className="content-css"
        anchorClass="my-anchor-css-class"
        expanded={false}
      >
        <Typography>{text}</Typography>
      </ShowMoreText>
    </CardContent>
  );
};

export default PostContent;
