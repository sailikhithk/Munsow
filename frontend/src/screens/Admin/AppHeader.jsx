import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AppHeader = ({open}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100%)`,
        // ml: "270px",
        boxShadow: "unset",
        backgroundColor: "#E8E8E8",
        color: "#071437",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ paddingLeft: open ? '270px' : '60px' }}>Hello Christ University!</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
