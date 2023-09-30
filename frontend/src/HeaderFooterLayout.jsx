import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
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

const openedMixin = (theme, role1) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: role1 === 1 ? "white" : "white",
  color: "#FFFFFF",
});

const closedMixin = (theme, role1) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: role1 === 1 ? "white" : "white",
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
})(({ theme, open, role1 }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, role1),
    "& .MuiDrawer-paper": openedMixin(theme, role1),
  }),
  ...(!open && {
    ...closedMixin(theme, role1),
    "& .MuiDrawer-paper": closedMixin(theme, role1),
  }),
}));

export default function HeaderFooterLayout({ Component }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [menuData, setMenuData] = useState([]);

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (GLOBAL_CONSTANTS?.user_cred?.role_id === 1) {
      setMenuData([
        {
          label: "Home",
          icon: <DashboardOutlinedIcon  />,
          route: "/adminDashboard",
          subItems: [],
        },
        {
          label: "Deep Analysis",
          icon: <RuleOutlinedIcon  />,
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
        },
        {
          label: "User Management",
          icon: <RuleOutlinedIcon  />,
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
            },
          ],
        },
      ]);
    } else {
      setMenuData([
        {
          label: "Dashboard",
          icon: <DashboardOutlinedIcon />,
          route: "/studentDashboard",
          subItems: [],
        },
        {
          label: "Practice Now",
          icon: <RuleOutlinedIcon />,
          route: "/practice",
          subItems: [],
        },
        {
          label: "My Reports",
          icon: <AccountCircleOutlinedIcon />,
          route: "/report",
          subItems: [],
        },
        {
          label: "Notifications",
          icon: <AccountCircleOutlinedIcon />,
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

  const handleListItemClick = (index, route) => {
    setSelectedItem(index);
    navigate(route);
    handleDrawerOpen();
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      <CustomDrawer variant="permanent" open={open} role1={GLOBAL_CONSTANTS?.user_cred?.role_id ? GLOBAL_CONSTANTS?.user_cred?.role_id : 1}>
        <DrawerHeader style={{background:"#f1e8f5"}}>
          <div className="font-bold  text-[#4e3f6b] text-2xl pr-10">MUNSOW</div>
          {!open ? (
            <IconButton onClick={handleDrawerOpen}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon style={{ color: "black" }} />
              ) : (
                <ChevronRightIcon style={{ color: "black" }} />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "black" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "black" }} />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider style={{opacity:"0.2"}}/>
        <List>
          {menuData.map((mainItem, mainIndex) => (
            <div key={mainIndex}>
              <ListItem
                disablePadding
                onClick={() => {
                  if (mainItem.subItems.length > 0) {
                    setOpenSubMenu(openSubMenu === mainIndex ? null : mainIndex);
                  } else {
                    handleListItemClick(mainIndex, mainItem.route);
                  }
                }}
                selected={selectedItem === mainIndex}
              >

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: selectedItem === mainIndex ? "#f3f0f9" : "transparent",
                    borderBottomRightRadius:"40px"
                    // color:selectedItem === mainIndex ? "purple" : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: selectedItem === mainIndex ? "#a590cf" : "gray",
                    }}

                  >
                    {mainItem.icon}
                  </ListItemIcon>
                  <ListItemText style={{ color: selectedItem === mainIndex ? "#a590cf" : "gray", fontSize: "30px" }} primary={mainItem.label} sx={{ opacity: open ? 1 : 0 }} />
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
                        handleListItemClick(subIndex, subItem.route);
                      }}
                      selected={selectedItem === subIndex}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          // backgroundColor: selectedItem === mainIndex ? "#f3f0f9" : "transparent",
                          // borderBottomRightRadius:"40px"

                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            // color: selectedItem === mainIndex ? "#a590cf" : "gray",
                          }}
                        >
                          {/* Customize the sub-item icons here */}
                        </ListItemIcon>
                        <ListItemText style={{ color: selectedItem === mainIndex ? "#a590cf" : "gray", fontSize: "30px" }} primary={subItem.label} sx={{ opacity: open ? 1 : 0 }} />
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
              navigate("/");
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
                <LogoutOutlinedIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText  style={{color:"black"}} primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </DrawerFooter>
      </CustomDrawer>

      <AppHeader open={open} role1={GLOBAL_CONSTANTS?.user_cred?.role_id ? GLOBAL_CONSTANTS?.user_cred?.role_id : 1}/>

      <div className="mt-[60px] bg-red-500 overflow-y-scroll " style={{ flexGrow: 1, background: "#f3f0f9" }}>
        {Component}
      </div>
    </Box>
  );
}

HeaderFooterLayout.propTypes = {
  Component: PropTypes.element.isRequired,
};
