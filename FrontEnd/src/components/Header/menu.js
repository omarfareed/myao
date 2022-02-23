import { IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserActions } from "../../Store/UserSlice";
import { useStyle } from "./HeaderStyle";

const MenuComp = ({ setValue }) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const [SettingIcon, setSettingIcon] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
            setValue(4);
            handleClose();
            history.push("/setting");
          }}
        >
          Setting
        </MenuItem>
        <MenuItem
          onClick={() => {
            setValue(4);
            handleClose();
            logOut();
          }}
        >
          log out
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MenuComp;
