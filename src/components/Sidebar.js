import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
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
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../image/image 4.png";

const Sidebar = () => {
  const [openOffre, setOpenOffre] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          backgroundColor: "#121212",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "80%", marginBottom: "8px" }}
        />
      </Box>

      <List>
        <ListItemButton component={NavLink} to="/dashboard" activeClassName="active-link">
          <ListItemIcon>
            <Dashboard sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/departement" activeClassName="active-link">
          <ListItemIcon>
            <TableChart sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Départements" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/solution" activeClassName="active-link">
          <ListItemIcon>
            <ReceiptLong sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Projets" />
        </ListItemButton>

        {/* --- Offres --- */}
        <ListItemButton onClick={() => setOpenOffre(!openOffre)}>
          <ListItemIcon>
            <NotificationsNone sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Offres" />
          {openOffre ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openOffre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={NavLink} to="/offre/stage" sx={{ pl: 4 }} activeClassName="active-link">
              <ListItemIcon>
                <SchoolOutlined sx={{ color: "#64b5f6" }} />
              </ListItemIcon>
              <ListItemText primary="Stages" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/offre/emploi" sx={{ pl: 4 }} activeClassName="active-link">
              <ListItemIcon>
                <WorkOutline sx={{ color: "#64b5f6" }} />
              </ListItemIcon>
              <ListItemText primary="Emplois" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Postulations --- */}
        <ListItemButton onClick={() => setOpenPost(!openPost)}>
          <ListItemIcon>
            <PersonOutline sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Postulations" />
          {openPost ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openPost} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={NavLink} to="/post/stage" sx={{ pl: 4 }} activeClassName="active-link">
              <ListItemIcon>
                <SchoolOutlined sx={{ color: "#64b5f6" }} />
              </ListItemIcon>
              <ListItemText primary="Stages" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/post/emploi" sx={{ pl: 4 }} activeClassName="active-link">
              <ListItemIcon>
                <WorkOutline sx={{ color: "#64b5f6" }} />
              </ListItemIcon>
              <ListItemText primary="Emplois" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Autres liens --- */}
        <ListItemButton component={NavLink} to="/PostWithoutOffre" activeClassName="active-link">
          <ListItemIcon>
            <SendTimeExtension sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Demandes spontanées" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/question" activeClassName="active-link">
          <ListItemIcon>
            <HelpOutline sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Questions fréquentes" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/Qcm" activeClassName="active-link">
          <ListItemIcon>
            <FactCheckOutlined sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Tests / QCM" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/team" activeClassName="active-link">
          <ListItemIcon>
            <Groups2 sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Équipe" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/contact" activeClassName="active-link">
          <ListItemIcon>
            <ContactMailOutlined sx={{ color: "#64b5f6" }} />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
