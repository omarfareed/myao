import * as React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  useStyle,
} from "./HeaderStyle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { BiSearch } from "react-icons/bi";
import { Grid, Tab, Tabs } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const classes = useStyle();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    history.push("/setting");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: { xs: "block" } }}
          >
            MYAO
          </Typography>
          <Search>
            <SearchIconWrapper>
              <BiSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Grid item sx={{ display: { xs: "none", md: "block" } }}>
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab
                disableRipple
                icon={<AiFillHome className={classes.icons} />}
                aria-label="Home"
                onClick={() => history.push("/")}
              />
              <Tab
                disableRipple
                icon={<IoPersonCircle className={classes.icons} />}
                aria-label="person"
                onClick={() => history.push("/profile")}
              />
              <Tab
                disableRipple
                icon={<MdFavorite className={classes.icons} />}
                aria-label="favorite"
                onClick={() => history.push("/fav")}
              />
            </Tabs>
          </Grid>

          <Box sx={{ flexGrow: 1 }} />

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <IoSettingsSharp className={classes.color} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Setting</MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, backgroundColor: "primary" }}>
        <Grid color="primary" sx={{ display: { xs: "block", md: "none" } }}>
          <Tabs
            variant="fullWidth"
            textColor="secondary"
            value={value}
            onChange={handleChange}
          >
            <Tab
              disableRipple
              icon={<AiFillHome className={classes.icons} />}
              aria-label="phone"
            />
            <Tab
              disableRipple
              icon={<MdFavorite className={classes.icons} />}
              aria-label="favorite"
            />
            <Tab
              disableRipple
              icon={<IoPersonCircle className={classes.icons} />}
              aria-label="person"
            />
          </Tabs>
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
