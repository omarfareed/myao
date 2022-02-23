import * as React from "react";
import { useStyle } from "./HeaderStyle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import TabsHeader from "./tabs";
import SearchPart from "./SearchPart";
import MenuComp from "./menu";
const Header = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyle();

  const theme = useTheme();
  const matchDMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ height: "4rem" }}></div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <SearchPart />
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
          <MenuComp setValue={setValue} />
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
