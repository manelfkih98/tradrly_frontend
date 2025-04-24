import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  HelpOutline,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5000");

const NavbarDash = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [messageAnchor, setMessageAnchor] = useState(null);
  const [requestAnchor, setRequestAnchor] = useState(null);

  const [messageNotifications, setMessageNotifications] = useState([]);
  const [applicationNotifications, setApplicationNotifications] = useState([]);
  const [requestNotifications, setRequestNotifications] = useState([]);

  const openProfile = Boolean(anchorEl);
  const openNotif = Boolean(notifAnchor);
  const openMessage = Boolean(messageAnchor);
  const openRequest = Boolean(requestAnchor);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  useEffect(() => {
    socket.on("nouvelle-candidature", (data) => {
      setApplicationNotifications((prev) => [data, ...prev]);
      toast.info(`${data.nom} a postulé à l’offre ${data.offre}`, {
        autoClose: false,
      });
    });

    socket.on("nouveau-message", (data) => {
      const notif = {
        nom: data.email,
        date: new Date().toISOString(),
        contenu: data.contenu,
      };
      setMessageNotifications((prev) => [notif, ...prev]);
      toast.info(`📩 Nouveau message de ${data.email}`, {
        autoClose: false,
      });
    });

    socket.on("nouvelle-demande", (data) => {
      const notif = {
        name: data.nom,
        date: new Date().toISOString(),
      };
      setRequestNotifications((prev) => [notif, ...prev]);
      toast.info(`📨 Nouvelle demande de ${data.nom}`, {
        autoClose: false,
      });
    });

    return () => {
      socket.off("nouvelle-candidature");
      socket.off("nouveau-message");
      socket.off("nouvelle-demande");
    };
  }, []);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#121212" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
            Dashboard
          </Link>
        </Typography>

        {/* Notifications candidatures */}
        <IconButton
          color="inherit"
          onClick={(e) => setNotifAnchor(e.currentTarget)}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={applicationNotifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notifAnchor}
          open={openNotif}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{
            sx: {
              bgcolor: "#1e1e1e",
              color: "#fff",
              width: 300,
              maxHeight: 400,
            },
          }}
        >
          {applicationNotifications.length === 0 ? (
            <MenuItem disabled>Aucune nouvelle candidature</MenuItem>
          ) : (
            <List dense>
              {applicationNotifications.map((notif, idx) => (
                <ListItem key={idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`${notif.nom} a postulé à l’offre ${notif.offre}`}
                    secondary={
                      <span style={{ fontSize: "0.75rem", color: "#bbb" }}>
                        {new Date(notif.date).toLocaleString()}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        {/* Notifications messages */}
        <IconButton
          color="inherit"
          onClick={(e) => setMessageAnchor(e.currentTarget)}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={messageNotifications.length} color="error">
            <MailIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={messageAnchor}
          open={openMessage}
          onClose={() => setMessageAnchor(null)}
          PaperProps={{
            sx: {
              bgcolor: "#1e1e1e",
              color: "#fff",
              width: 300,
              maxHeight: 400,
            },
          }}
        >
          {messageNotifications.length === 0 ? (
            <MenuItem disabled>Aucun nouveau message</MenuItem>
          ) : (
            <List dense>
              {messageNotifications.map((notif, idx) => (
                <ListItem key={idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`📩 ${notif.nom} a envoyé un message`}
                    secondary={
                      <>
                        <span style={{ color: "#B2DFDB" }}>
                          {notif.contenu}
                        </span>

                        <br />
                        <span style={{ fontSize: "0.75rem", color: "#bbb" }}>
                          {new Date(notif.date).toLocaleString()}
                        </span>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        {/* Notifications demandes */}
        <IconButton
          color="inherit"
          onClick={(e) => setRequestAnchor(e.currentTarget)}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={requestNotifications.length} color="error">
            <HelpOutline />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={requestAnchor}
          open={openRequest}
          onClose={() => setRequestAnchor(null)}
          PaperProps={{
            sx: {
              bgcolor: "#1e1e1e",
              color: "#fff",
              width: 300,
              maxHeight: 400,
            },
          }}
        >
          {requestNotifications.length === 0 ? (
            <MenuItem disabled>Aucune nouvelle demande</MenuItem>
          ) : (
            <List dense>
              {requestNotifications.map((notif, idx) => (
                <ListItem key={idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`📨 Demande de ${notif.name}`}
                    secondary={
                      <span style={{ fontSize: "0.75rem", color: "#bbb" }}>
                        {new Date(notif.date).toLocaleString()}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        {/* Profil */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenu}
          sx={{ ml: 2 }}
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={openProfile}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              bgcolor: "#121212",
              color: "#fff",
            },
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarDash;
