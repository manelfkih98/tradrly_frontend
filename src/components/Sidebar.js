import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  TableChart,
  ReceiptLong,
  NotificationsNone,
  ExpandLess,
  ExpandMore,
  WorkOutline,
  SchoolOutlined,
  HelpOutline,
  Groups2,
  ContactMailOutlined,
  FactCheckOutlined,
  SendTimeExtension,
  PersonOutline,
  Menu,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../image/image 4.png";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); 

  const isMobile = useMediaQuery("(max-width:900px)");

  const handleToggle = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const navItemStyle = ({ isActive }, to) => ({
    paddingLeft: 3,
    transition: "all 0.3s",
    backgroundColor: isActive
      ? "#EDE9FE" // Violet clair pour actif
      : location.pathname === to
      ? "#DBEAFE" // Bleu clair pour URL correspondante
      : "transparent",
    color: isActive
      ? "#914091" // Violet pour actif
      : location.pathname === to
      ? "#1E3A8A" // Bleu marine pour URL correspondante
      : "#1E3A8A",
    "& .MuiListItemIcon-root": {
      color: isActive
        ? "#914091"
        : location.pathname === to
        ? "#1E3A8A"
        : "#1E3A8A",
    },
    "&:hover": {
      backgroundColor: "#EDE9FE", // Violet clair au hover
      color: "#914091",
      "& .MuiListItemIcon-root": { color: "#914091" },
    },
  });

  const dropdownItemStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: 2,
    backgroundColor: isActive ? "#F3E8FF" : "transparent", // Violet très clair pour dropdown actif
    transition: "all 0.3s ease",
    color: isActive ? "#914091" : "#1E3A8A",
    "& .MuiListItemIcon-root": {
      color: isActive ? "#914091" : "#914091", // Violet pour icônes
    },
    "&:hover": {
      backgroundColor: "#F3E8FF",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    },
  });

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "75%",
            marginBottom: "12px",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          <ListItemButton component={NavLink} to="/dashboard" sx={(props) => navItemStyle(props, "/dashboard")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/departement" sx={(props) => navItemStyle(props, "/departement")}>
            <ListItemIcon>
              <TableChart />
            </ListItemIcon>
            <ListItemText primary="Départements" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/solution" sx={(props) => navItemStyle(props, "/solution")}>
            <ListItemIcon>
              <ReceiptLong />
            </ListItemIcon>
            <ListItemText primary="Projets" />
          </ListItemButton>

          <ListItemButton onClick={() => handleToggle("offre")} sx={navItemStyle({ isActive: false })}>
            <ListItemIcon>
              <NotificationsNone />
            </ListItemIcon>
            <ListItemText primary="Offres" />
            {activeDropdown === "offre" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={activeDropdown === "offre"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={NavLink} to="/offre/stage" sx={dropdownItemStyle}>
                <ListItemIcon sx={{ fontSize: 24, marginRight: 2 }}>
                  <SchoolOutlined />
                </ListItemIcon>
                <ListItemText primary="Stages" sx={{ fontWeight: "bold", fontSize: 16 }} />
              </ListItemButton>

              <ListItemButton component={NavLink} to="/offre/emploi" sx={dropdownItemStyle}>
                <ListItemIcon sx={{ fontSize: 24, marginRight: 2 }}>
                  <WorkOutline />
                </ListItemIcon>
                <ListItemText primary="Emplois" sx={{ fontWeight: "bold", fontSize: 16 }} />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleToggle("post")} sx={navItemStyle({ isActive: false })}>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Gestion des candidats" />
            {activeDropdown === "post" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={activeDropdown === "post"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={NavLink} to="/post/stage" sx={dropdownItemStyle}>
                <ListItemIcon sx={{ fontSize: 24, marginRight: 2 }}>
                  <SchoolOutlined />
                </ListItemIcon>
                <ListItemText primary="Stages" sx={{ fontWeight: "bold", fontSize: 16 }} />
              </ListItemButton>

              <ListItemButton component={NavLink} to="/post/emploi" sx={dropdownItemStyle}>
                <ListItemIcon sx={{ fontSize: 24, marginRight: 2 }}>
                  <WorkOutline />
                </ListItemIcon>
                <ListItemText primary="Emplois" sx={{ fontWeight: "bold", fontSize: 16 }} />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton component={NavLink} to="/PostWithoutOffre" sx={(props) => navItemStyle(props, "/PostWithoutOffre")}>
            <ListItemIcon>
              <SendTimeExtension />
            </ListItemIcon>
            <ListItemText primary="Demandes spontanées" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/question" sx={(props) => navItemStyle(props, "/question")}>
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Questions fréquentes" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/Qcm" sx={(props) => navItemStyle(props, "/Qcm")}>
            <ListItemIcon>
              <FactCheckOutlined />
            </ListItemIcon>
            <ListItemText primary="Tests / QCM" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/team" sx={(props) => navItemStyle(props, "/team")}>
            <ListItemIcon>
              <Groups2 />
            </ListItemIcon>
            <ListItemText primary="Notre équipe" />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/contact" sx={(props) => navItemStyle(props, "/contact")}>
            <ListItemIcon>
              <ContactMailOutlined />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "#EDE9FE", zIndex: 1201 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: 260,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 260,
              boxSizing: "border-box",
              backgroundColor: "#F8FAFC",
              borderRight: "none",
              height: "100%",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: isMobile ? 8 : 0 }}>
          {/* Ton contenu principal ici */}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;