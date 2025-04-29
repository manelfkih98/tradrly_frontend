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
          style={{
            width: "80%",
            marginBottom: "8px",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        />
      </Box>

      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <Dashboard sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Tableau de bord" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/departement"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <TableChart sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Départements" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/solution"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <ReceiptLong sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Projets" />
        </ListItemButton>

        {/* --- Offres --- */}
        <ListItemButton
          onClick={() => setOpenOffre(!openOffre)}
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
          aria-expanded={openOffre}
        >
          <ListItemIcon>
            <NotificationsNone sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Offres" />
          {openOffre ? <ExpandLess sx={{ color: "#1e3a8a" }} /> : <ExpandMore sx={{ color: "#1e3a8a" }} />}
        </ListItemButton>

        <Collapse in={openOffre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/offre/stage"
              sx={{
                "&.active-link": {
                  backgroundColor: "#1e3a8a",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                },
                "&:hover": {
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  "& .MuiListItemIcon-root": { color: "#1e3a8a" },
                },
                transition: "all 0.3s",
              }}
            >
              <ListItemIcon>
                <SchoolOutlined sx={{ color: "#1e3a8a" }} />
              </ListItemIcon>
              <ListItemText primary="Stages" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/offre/emploi"
              sx={{
                "&.active-link": {
                  backgroundColor: "#1e3a8a",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                },
                "&:hover": {
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  "& .MuiListItemIcon-root": { color: "#1e3a8a" },
                },
                transition: "all 0.3s",
              }}
            >
              <ListItemIcon>
                <WorkOutline sx={{ color: "#1e3a8a" }} />
              </ListItemIcon>
              <ListItemText primary="Emplois" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Postulations --- */}
        <ListItemButton
          onClick={() => setOpenPost(!openPost)}
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
          aria-expanded={openPost}
        >
          <ListItemIcon>
            <PersonOutline sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Postulations" />
          {openPost ? <ExpandLess sx={{ color: "#1e3a8a" }} /> : <ExpandMore sx={{ color: "#1e3a8a" }} />}
        </ListItemButton>

        <Collapse in={openPost} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/post/stage"
              sx={{
                "&.active-link": {
                  backgroundColor: "#1e3a8a",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                },
                "&:hover": {
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  "& .MuiListItemIcon-root": { color: "#1e3a8a" },
                },
                transition: "all 0.3s",
              }}
            >
              <ListItemIcon>
                <SchoolOutlined sx={{ color: "#1e3a8a" }} />
              </ListItemIcon>
              <ListItemText primary="Stages" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/post/emploi"
              sx={{
                "&.active-link": {
                  backgroundColor: "#1e3a8a",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                },
                "&:hover": {
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  "& .MuiListItemIcon-root": { color: "#1e3a8a" },
                },
                transition: "all 0.3s",
              }}
            >
              <ListItemIcon>
                <WorkOutline sx={{ color: "#1e3a8a" }} />
              </ListItemIcon>
              <ListItemText primary="Emplois" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Autres liens --- */}
        <ListItemButton
          component={NavLink}
          to="/PostWithoutOffre"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <SendTimeExtension sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Demandes spontanées" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/question"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <HelpOutline sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Questions fréquentes" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/Qcm"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <FactCheckOutlined sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Tests / QCM" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/team"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <Groups2 sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Équipe" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/contact"
          sx={{
            "&.active-link": {
              backgroundColor: "#1e3a8a",
              color: "#fff",
              "& .MuiListItemIcon-root": { color: "#fff" },
            },
            "&:hover": {
              backgroundColor: "#d4af37",
              color: "#1e3a8a",
              "& .MuiListItemIcon-root": { color: "#1e3a8a" },
            },
            transition: "all 0.3s",
          }}
        >
          <ListItemIcon>
            <ContactMailOutlined sx={{ color: "#1e3a8a" }} />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;