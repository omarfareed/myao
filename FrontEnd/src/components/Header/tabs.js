import { Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFilePostFill } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";
import { IoPeople, IoPersonCircle } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const TabsHeader = ({ value, setValue, classes, render }) => {
  const { isAuth, user } = useSelector((state) => state.reducer);
  const location = useLocation();
  const history = useHistory();
  const { id } = user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user.role === "role") {
      if (location.pathname === "/") setValue(0);
      else if (
        location.pathname.includes("profile") &&
        id === location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
      )
        setValue(1);
      else if (location.pathname === "/fav") setValue(2);
      else if (location.pathname === "/requests") setValue(3);
      else setValue(4);
    } else if (user.role === "admin") {
      if (location.pathname === "/admin/users") setValue(0);
      else if (location.pathname.includes("/admin/posts")) setValue(1);
      else setValue(4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return render ? (
    <>
      {isAuth && user.role === "user" ? (
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
          <Tab
            disableRipple
            icon={
              <IoPeople
                style={{ color: value !== 3 ? "#555" : undefined }}
                className={classes.icons}
              />
            }
            aria-label="favorite"
            onClick={() => history.push("/requests")}
          />{" "}
        </Tabs>
      ) : user.role === "admin" ? (
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab
            disableRipple
            icon={
              <GoOrganization
                style={{ color: value !== 0 ? "#555" : undefined }}
                className={classes.icons}
              />
            }
            aria-label="Home"
            onClick={() => history.push("/admin/users")}
          />
          <Tab
            disableRipple
            icon={
              <BsFilePostFill
                style={{ color: value !== 1 ? "#555" : undefined }}
                className={classes.icons}
              />
            }
            aria-label="person"
            onClick={() => history.push(`/admin/posts`)}
          />
        </Tabs>
      ) : null}
    </>
  ) : null;
};
export default TabsHeader;
