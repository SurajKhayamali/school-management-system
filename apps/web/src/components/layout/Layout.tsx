import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state, dispatch } = useAuth();
  const { user } = state;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Menu items based on user role
  const getMenuItems = () => {
    const items = [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard",
      },
    ];

    if (user?.role === "admin") {
      items.push(
        { text: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
        { text: "Teachers", icon: <PeopleIcon />, path: "/dashboard/teachers" },
        { text: "Students", icon: <PeopleIcon />, path: "/dashboard/students" },
        { text: "Courses", icon: <BookIcon />, path: "/dashboard/courses" },
        {
          text: "Settings",
          icon: <SettingsIcon />,
          path: "/dashboard/settings",
        },
      );
    } else if (user?.role === "teacher") {
      items.push(
        {
          text: "My Classes",
          icon: <SchoolIcon />,
          path: "/dashboard/classes",
        },
        { text: "Students", icon: <PeopleIcon />, path: "/dashboard/students" },
      );
    } else if (user?.role === "student") {
      items.push(
        { text: "My Courses", icon: <BookIcon />, path: "/dashboard/courses" },
        { text: "Grades", icon: <SchoolIcon />, path: "/dashboard/grades" },
      );
    } else if (user?.role === "parent") {
      items.push(
        {
          text: "My Children",
          icon: <PeopleIcon />,
          path: "/dashboard/children",
        },
        {
          text: "Performance",
          icon: <SchoolIcon />,
          path: "/dashboard/performance",
        },
      );
    }

    return items;
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          School MS
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            School Management System
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
