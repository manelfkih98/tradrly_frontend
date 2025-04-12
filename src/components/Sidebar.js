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
  Receipt,
  Notifications,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Work,
  School,
  HelpOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openOffre, setOpenOffre] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, rgb(65, 29, 167), #111)",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ textAlign: "center", p: 2, fontSize: 18, fontWeight: "bold" }}>
        Tradrly
      </Box>

      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <Dashboard sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton component={Link} to="/departement">
          <ListItemIcon>
            <TableChart sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Département" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton component={Link} to="/solution">
          <ListItemIcon>
            <Receipt sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Projets" sx={{ color: "#fff" }} />
        </ListItemButton>

        {/* === Offres Dropdown === */}
        <ListItemButton onClick={() => setOpenOffre(!openOffre)}>
          <ListItemIcon>
            <Notifications sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Offres" sx={{ color: "#fff" }} />
          {openOffre ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openOffre} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/offre/stage" sx={{ pl: 4 }}>
              <ListItemIcon>
                <School sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Stage" sx={{ color: "#fff" }} />
            </ListItemButton>

            <ListItemButton component={Link} to="/offre/emploi" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Work sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Emploi" sx={{ color: "#fff" }} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* === Posts Dropdown === */}
        <ListItemButton onClick={() => setOpenPost(!openPost)}>
          <ListItemIcon>
            <AccountCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Post" sx={{ color: "#fff" }} />
          {openPost ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openPost} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/post/stage" sx={{ pl: 4 }}>
              <ListItemIcon>
                <School sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Stage" sx={{ color: "#fff" }} />
            </ListItemButton>

            <ListItemButton component={Link} to="/post/emploi" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Work sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Emploi" sx={{ color: "#fff" }} />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton component={Link} to="/question">
          <ListItemIcon>
            <HelpOutline sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Questions" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton component={Link} to="/PostWithoutOffre">
          <ListItemIcon>
            <AccountCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Demande d'offre" sx={{ color: "#fff" }} />
        </ListItemButton>

        <ListItemButton component={Link} to="/Qcm">
          <ListItemIcon>
            <AccountCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Test" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton component={Link} to="/team">
          <ListItemIcon>
            <AccountCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Team" sx={{ color: "#fff" }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
