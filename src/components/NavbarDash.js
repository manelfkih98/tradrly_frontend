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
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Event as EventIcon,
  AccountCircle,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntretienByDay } from "../store/services/entretienService";

const socket = io("http://localhost:5000");

const NavbarDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [messageAnchor, setMessageAnchor] = useState(null);
  const [entretienAnchor, setEntretienAnchor] = useState(null);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [applicationNotifications, setApplicationNotifications] = useState([]);
  const [requestNotifications, setRequestNotifications] = useState([]);
  const [userName, setUserName] = useState("");

  const entretienByDay = useSelector((state) => state.entretiens?.entretienByDay || []);
  const entretienLoading = useSelector((state) => state.entretien?.loading ?? false);

  const openProfile = Boolean(anchorEl);
  const openNotif = Boolean(notifAnchor);
  const openMessage = Boolean(messageAnchor);
  const openEntretien = Boolean(entretienAnchor);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/");
  };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  useEffect(() => {
    const user = localStorage.getItem("fullName");
    if (user) {
      setUserName(user.charAt(0).toUpperCase());
    }
  }, []);

  const saveNotificationsToLocalStorage = () => {
    localStorage.setItem("messageNotifications", JSON.stringify(messageNotifications));
    localStorage.setItem("applicationNotifications", JSON.stringify(applicationNotifications));
    localStorage.setItem("requestNotifications", JSON.stringify(requestNotifications));
  };

  const loadNotificationsFromLocalStorage = () => {
    const savedMessageNotifications = localStorage.getItem("messageNotifications");
    const savedApplicationNotifications = localStorage.getItem("applicationNotifications");
    const savedRequestNotifications = localStorage.getItem("requestNotifications");

    if (savedMessageNotifications) {
      setMessageNotifications(JSON.parse(savedMessageNotifications));
    }
    if (savedApplicationNotifications) {
      setApplicationNotifications(JSON.parse(savedApplicationNotifications));
    }
    if (savedRequestNotifications) {
      setRequestNotifications(JSON.parse(savedRequestNotifications));
    }
  };

  useEffect(() => {
    loadNotificationsFromLocalStorage();

    socket.on("nouvelle-candidature", (data) => {
      setApplicationNotifications((prev) => [data, ...prev]);
      toast.info(`${data.nom} a postulé à l’offre ${data.offre}`, { autoClose: false });
    });

    socket.on("nouveau-message", (data) => {
      const notif = {
        nom: data.email,
        date: new Date().toISOString(),
        contenu: data.contenu,
      };
      setMessageNotifications((prev) => [notif, ...prev]);
      toast.info(`📩 Nouveau message de ${data.email}`, { autoClose: false });
    });

    socket.on("nouvelle-demande", (data) => {
      const notif = {
        nom: data.nom,
        date: new Date().toISOString(),
      };
      setRequestNotifications((prev) => [notif, ...prev]);
      toast.info(`📨 Nouvelle demande de ${data.nom}`, { autoClose: false });
    });

    return () => {
      socket.off("nouvelle-candidature");
      socket.off("nouveau-message");
      socket.off("nouvelle-demande");
    };
  }, []);

  useEffect(() => {
    saveNotificationsToLocalStorage();
  }, [messageNotifications, applicationNotifications, requestNotifications]);

  const handleEntretienClick = (event) => {
    setEntretienAnchor(event.currentTarget);
    const today = new Date().toISOString().split("T")[0];
    dispatch(fetchEntretienByDay(today));
  };

  const iconButtonStyle = {
    color: "#1E3A8A",
    "&:hover": {
      backgroundColor: "#EDE9FE",
      color: "#914091",
    },
  };

  const menuItemStyle = {
    color: "#1E3A8A",
    "&:hover": {
      backgroundColor: "#F3E8FF",
      color: "#914091",
    },
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#F8FAFC",
        color: "#1E3A8A",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          sx={{ ...iconButtonStyle, mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, color: "#1E3A8A" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1E3A8A" }}>
            Dashboard
          </Link>
        </Typography>

        <IconButton sx={{ ...iconButtonStyle, ml: 1 }} onClick={(e) => setNotifAnchor(e.currentTarget)}>
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
              bgcolor: "#F8FAFC",
              color: "#1E3A8A",
              width: 300,
              maxHeight: 400,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            },
          }}
        >
          {applicationNotifications.length === 0 ? (
            <MenuItem disabled sx={menuItemStyle}>
              Aucune nouvelle candidature
            </MenuItem>
          ) : (
            <List dense>
              {applicationNotifications.map((notif, idx) => (
                <ListItem key={idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`${notif.nom} a postulé à l’offre ${notif.offre}`}
                    secondary={
                      <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                        {new Date(notif.date).toLocaleString()}
                      </span>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      toast.info(`Candidature de ${notif.nom} traitée`, { autoClose: 2000 });
                      setApplicationNotifications((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    sx={{ color: "#1E3A8A" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        <IconButton sx={{ ...iconButtonStyle, ml: 1 }} onClick={(e) => setMessageAnchor(e.currentTarget)}>
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
              bgcolor: "#F8FAFC",
              color: "#1E3A8A",
              width: 300,
              maxHeight: 400,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            },
          }}
        >
          {messageNotifications.length === 0 ? (
            <MenuItem disabled sx={menuItemStyle}>
              Aucun nouveau message
            </MenuItem>
          ) : (
            <List dense>
              {messageNotifications.map((notif, idx) => (
                <ListItem key={idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`📩 ${notif.nom} a envoyé un message`}
                    secondary={
                      <>
                        <span style={{ color: "#914091" }}>{notif.contenu}</span>
                        <br />
                        <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                          {new Date(notif.date).toLocaleString()}
                        </span>
                      </>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      toast.info(`Message de ${notif.nom} traité`, { autoClose: 2000 });
                      setMessageNotifications((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    sx={{ color: "#1E3A8A" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        <IconButton sx={{ ...iconButtonStyle, ml: 1 }} onClick={handleEntretienClick}>
          <Badge badgeContent={entretienByDay.length} color="error">
            <EventIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={entretienAnchor}
          open={openEntretien}
          onClose={() => setEntretienAnchor(null)}
          PaperProps={{
            sx: {
              bgcolor: "#F8FAFC",
              color: "#1E3A8A",
              width: 300,
              maxHeight: 400,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            },
          }}
        >
          {entretienLoading ? (
            <MenuItem disabled sx={menuItemStyle}>
              Chargement...
            </MenuItem>
          ) : entretienByDay.length === 0 ? (
            <MenuItem disabled sx={menuItemStyle}>
              Aucun entretien aujourd'hui
            </MenuItem>
          ) : (
            <List dense>
              {entretienByDay.map((entretien, idx) => (
                <ListItem key={entretien._id || idx} divider alignItems="flex-start">
                  <ListItemText
                    primary={`${entretien.postId?.nom || "Inconnu"} ${entretien.postId?.prenom || ""}`}
                    secondary={
                      <>
                        <span style={{ color: "#914091" }}>
                          {entretien.postId?.jobId?.titre || "Poste inconnu"} - {entretien.heure} ({entretien.mode})
                        </span>
                        <br />
                        <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                          {new Date(entretien.date).toLocaleTimeString()}
                        </span>
                      </>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      toast.info(`Entretien avec ${entretien.postId?.nom || "Inconnu"} marqué comme vu`, { autoClose: 2000 });
                      dispatch(fetchEntretienByDay(new Date().toISOString().split("T")[0]));
                    }}
                    sx={{ color: "#1E3A8A" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Menu>

        <IconButton sx={{ ...iconButtonStyle, ml: 2 }} onClick={handleMenu}>
          <Avatar sx={{ bgcolor: "#914091", fontSize: "1rem" }}>{userName}</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={openProfile} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleLogout} sx={menuItemStyle}>
            Déconnexion
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarDash;