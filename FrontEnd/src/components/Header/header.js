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
import { Grid, MenuItem, Tab, Tabs } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state.reducer);
  const [SettingIcon, setSettingIcon] = React.useState(false);
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/") setValue(0);
    else if (location.pathname.includes("profile")) setValue(1);
    else if (location.pathname === "/fav") setValue(2);
    else setValue(3);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setSettingIcon(1);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingIcon(0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ height: "4rem" }}></div>
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
                icon={
                  <AiFillHome
                    style={{ color: value !== 0 ? "#555" : undefined }}
                    className={classes.icons}
                  />
                }
                aria-label="Home"
                onClick={() => history.push("/")}
              />
              <Tab
                disableRipple
                icon={
                  <IoPersonCircle
                    style={{ color: value !== 1 ? "#555" : undefined }}
                    className={classes.icons}
                  />
                }
                aria-label="person"
                onClick={() => history.push(`/profile/${user.id}`)}
              />
              <Tab
                disableRipple
                icon={
                  <MdFavorite
                    style={{ color: value !== 2 ? "#555" : undefined }}
                    className={classes.icons}
                  />
                }
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
              <IoSettingsSharp
                className={
                  SettingIcon
                    ? `${classes.moveSetting} ${classes.color}`
                    : classes.color
                }
              />
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
              style={{ marginTop: "2.2rem" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setValue(3);
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setValue(3);
                  handleClose();
                }}
              >
                Setting
              </MenuItem>
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
