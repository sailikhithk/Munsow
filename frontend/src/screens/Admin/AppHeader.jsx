import React from "react";
import { AppBar, Divider, Toolbar, Typography } from "@mui/material";

const AppHeader = ({ open, role1 }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100%)`,
        boxShadow: "unset",
        backgroundColor: "#f3f0f9",
        color: "#071437",
        height: "60px"
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ paddingLeft: open ? '270px' : '60px' }}>{role1 == 1 ? "Hello Christ University!" : ""}</Typography>
      </Toolbar>
      <Divider style={{ color: "gray", opacity: "0.4" }} />
    </AppBar>
  );
};

export default AppHeader;
