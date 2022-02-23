import { Avatar, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Search, SearchIconWrapper, StyledInputBase } from "./HeaderStyle";
const SearchPart = () => {
  const ref = useRef();
  const history = useHistory();
  useEffect(() => {
    ref.current.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        history.push(`/search/${e.target.value}`);
        e.target.value = "";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
};

export default SearchPart;
