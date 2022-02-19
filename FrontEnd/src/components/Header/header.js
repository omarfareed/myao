import * as React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  useStyle,
} from "./HeaderStyle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { BiSearch } from "react-icons/bi";
import { Avatar, Grid, MenuItem } from "@mui/material";
import { IoSettingsSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UserActions } from "../../Store/UserSlice";
import TabsHeader from "./tabs";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [SettingIcon, setSettingIcon] = React.useState(false);
  const classes = useStyle();
  const ref = React.useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const matchDMD = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    ref.current.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        history.push(`/search/${e.target.value}`);
        e.target.value = "";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setSettingIcon(1);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingIcon(0);
  };
  const logOut = () => {
    document.cookie = ""; // best pracise from index jwt till find the second space (after jwt there is a space)
    axios.post("/api/v1/security/logout");
    dispatch(UserActions.logout());
    history.push("/login");
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
            <Avatar
              src="/meaw.png"
              sx={{ width: "8rem", height: "3rem", marginRight: "-1.5rem" }}
            />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <BiSearch />
            </SearchIconWrapper>
            <StyledInputBase
              ref={ref}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Grid
            item
            sx={{
              transform: "translateX(-25%)",
            }}
          >
            <TabsHeader
              value={value}
              setValue={setValue}
              classes={classes}
              render={!matchDMD}
            />
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
              style={{ marginTop: "2.2rem", zIndex: "10000" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setValue(6);
                  handleClose();
                  history.push("/setting");
                }}
              >
                Setting
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setValue(6);
                  handleClose();
                  logOut();
                }}
              >
                log out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, backgroundColor: "primary" }}>
        <Grid color="primary">
          <TabsHeader
            value={value}
            setValue={setValue}
            classes={classes}
            render={matchDMD}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
// eslint-disable-next-line no-lone-blocks
{
  /* <Tabs
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
  <Tabs
    disableRipple
    icon={<IoPersonCircle className={classes.icons} />}
    aria-label="person"
  />
</Tabs> */
}
