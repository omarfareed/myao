import { Avatar, Button, Collapse, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import React, { Component }  from 'react';
import { BsFillArrowRightCircleFill } from "react-icons/bs";


const Comments = (props)=> {
    return(
        <>
    <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="name?"
                    secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                    }
                    />
                    </ListItem >

                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Name" />
                    </ListItemAvatar>
                    <ListItemText
                    secondary={
                        <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        >
                        <TextField
                        label="Comment"
                        placeholder="give your comment"
                        multiline
                        variant="standard"
                        />
                        <Button variant="text" centerRipple size="small" startIcon={<BsFillArrowRightCircleFill />} />


                        </Stack>
                    }
                    />
                    </ListItem >

            </List>
          </Collapse>
          </>
          )
} 

export default Comments;