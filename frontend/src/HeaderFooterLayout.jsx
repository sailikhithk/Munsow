import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {Box} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect } from "react";
import PropTypes from "prop-types";

import GLOBAL_CONSTANTS from "../GlobalConstants";
import { Collapse } from "@mui/material";
import AppHeader from "./screens/Admin/AppHeader";

const drawerWidth = 270;

const openedMixin = (theme,role1) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background:role1==1? "linear-gradient(1deg,#1c85ce 30%, #5271ff)":"#824bef",
  color: "#FFFFFF",
});

const closedMixin = (theme,role1) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background:role1==1? "linear-gradient(1deg,#1c85ce 30%, #5271ff)":"#824bef",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  position: "fixed",
  bottom: 0,
  color: "#FFFFFF",
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open,role1 }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme,role1),
    "& .MuiDrawer-paper": openedMixin(theme,role1),
  }),
  ...(!open && {
    ...closedMixin(theme,role1),
    "& .MuiDrawer-paper": closedMixin(theme,role1),
  }),
}));

export default function HeaderFooterLayout({ Component }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [menuData, setMenuData] = useState([]);

  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    if (GLOBAL_CONSTANTS?.user_cred?.role_id === 1) {
      setMenuData([
        {
          label: "Home",
          icon: <DashboardOutlinedIcon style={{ color: "white" }} />,
          route: "/adminDashboard",
          subItems: [],
        },
        {
          label: "Deep Analysis",
          icon: <RuleOutlinedIcon style={{ color: "white" }} />,
          route: "/dashboard",
          subItems: [
            {
              label: "Behavioral Analysis",
              route: "/emotionSensing",
            },
            {
              label: "KS Analysis",
              route: "/emotionSensing",
            },
            {
              label: "Practical thinking A",
              route: "/emotionSensing",
            },
            {
              label: "Emotion Sensing",
              route: "/emotionSensing",
            },
            {
              label: "Hard Skill vs Soft skills",
              route: "/emotionSensing",
            },
          ],
        },{
          label: "User Management",
          icon: <RuleOutlinedIcon style={{ color: "white" }} />,
          route: "/summary",
          subItems: [
            {
              label: "Summary",
              route: "/summary",
            },
            {
              label: "Students",
              route: "/studentList",
            },
            {
              label: "Teachers",
              route: "/teachersList",
            }
          ],
        },
        // {
        //   label: "Users",
        //   icon: <AccountCircleOutlinedIcon style={{ color: "white" }} />,
        //   route: "/users",
        //   subItems: [],
        // },
        // {
        //   label: "Profile",
        //   icon: <SettingsOutlinedIcon style={{ color: "white" }} />,
        //   route: "/profile",
        //   subItems: [],
        // },
      ]);
    } else {
      setMenuData([
        {
          label: "Dashboard",
          icon: <DashboardOutlinedIcon style={{ color: "white" }} />,
          route: "/studentDashboard",
          subItems: [],
        },
        {
          label: "Practice Now",
          icon: <RuleOutlinedIcon style={{ color: "white" }} />,
          route: "/studentDashboard",
          subItems: [],
        },
        {
          label: "My Reports",
          icon: <AccountCircleOutlinedIcon style={{ color: "white" }} />,
          route: "/report",
          subItems: [],
        },
        {
          label: "Notifications",
          icon: <AccountCircleOutlinedIcon style={{ color: "white" }} />,
          route: "/studentDashboard",
          subItems: [],
        },
      ]);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      <CustomDrawer variant="permanent" open={open} role1={GLOBAL_CONSTANTS?.user_cred?.role_id?GLOBAL_CONSTANTS?.user_cred?.role_id:1}>
        <DrawerHeader>
          {!open ? (
            <IconButton onClick={handleDrawerOpen}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon style={{ color: "white" }} />
              ) : (
                <ChevronRightIcon style={{ color: "white" }} />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "white" }} />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {menuData.map((mainItem, mainIndex) => (
            <div key={mainIndex}>
              <ListItem
                disablePadding
                onClick={() => {
                  if (mainItem.subItems.length > 0) {
                    setOpenSubMenu(openSubMenu === mainIndex ? null : mainIndex);
                  } else {
                    navigate(mainItem.route);
                  }
                  handleDrawerOpen();
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {mainItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={mainItem.label} sx={{ opacity: open ? 1 : 0 }} />
                  {mainItem.subItems.length > 0 && (
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                    >
                      {openSubMenu === mainIndex ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubMenu === mainIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {mainItem.subItems.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{ display: "block", pl: 4 }}
                      onClick={() => {
                        navigate(subItem.route);
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {/* Customize the sub-item icons here */}
                        </ListItemIcon>
                        <ListItemText primary={subItem.label} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
        <DrawerFooter>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/")
              window.location.reload();
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutOutlinedIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </DrawerFooter>
      </CustomDrawer>
      
      <AppHeader open={open}/>

      <div className="mt-[60px] bg-red-500 overflow-y-hidden " style={{ flexGrow: 1, background: "#f5f5f5" }}>
        {Component}
      </div>
    </Box>
  );
}

HeaderFooterLayout.propTypes = {
  Component: PropTypes.element.isRequired,
};
