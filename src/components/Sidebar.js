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
  Typography,
  Badge,
  Divider,
  Avatar,
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
  Settings,
  ExitToApp,
  Circle,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

const ModernSidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:900px)");

  const handleToggle = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const navItemStyle = ({ isActive }, to) => ({
    borderRadius: "12px",
    margin: "4px 16px",
    minHeight: "48px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    backgroundColor: isActive || location.pathname === to
      ? "rgba(99, 102, 241, 0.1)"
      : "transparent",
    color: isActive || location.pathname === to
      ? "#6366F1"
      : "#64748B",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: isActive || location.pathname === to ? "4px" : "0px",
      height: "24px",
      backgroundColor: "#6366F1",
      borderRadius: "0 4px 4px 0",
      transition: "width 0.2s ease",
    },
    "& .MuiListItemIcon-root": {
      color: isActive || location.pathname === to ? "#6366F1" : "#94A3B8",
      minWidth: "40px",
      fontSize: "20px",
    },
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontWeight: isActive || location.pathname === to ? 600 : 500,
    },
    "&:hover": {
      backgroundColor: "rgba(99, 102, 241, 0.05)",
      transform: "translateX(4px)",
      "& .MuiListItemIcon-root": { 
        color: "#6366F1",
        transform: "scale(1.1)",
      },
    },
  });

  const dropdownItemStyle = ({ isActive }) => ({
    borderRadius: "8px",
    margin: "2px 24px 2px 48px",
    minHeight: "40px",
    backgroundColor: isActive ? "rgba(139, 92, 246, 0.1)" : "transparent",
    color: isActive ? "#8B5CF6" : "#64748B",
    transition: "all 0.2s ease",
    "& .MuiListItemIcon-root": {
      color: isActive ? "#8B5CF6" : "#A855F7",
      minWidth: "32px",
      fontSize: "16px",
    },
    "& .MuiListItemText-primary": {
      fontSize: "13px",
      fontWeight: isActive ? 600 : 500,
    },
    "&:hover": {
      backgroundColor: "rgba(139, 92, 246, 0.05)",
      transform: "translateX(2px)",
    },
  });

  const parentItemStyle = (isOpen) => ({
    borderRadius: "12px",
    margin: "4px 16px",
    minHeight: "48px",
    backgroundColor: isOpen ? "rgba(99, 102, 241, 0.05)" : "transparent",
    color: "#64748B",
    transition: "all 0.2s ease",
    "& .MuiListItemIcon-root": {
      color: "#94A3B8",
      minWidth: "40px",
    },
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontWeight: 500,
    },
    "&:hover": {
      backgroundColor: "rgba(99, 102, 241, 0.05)",
      "& .MuiListItemIcon-root": { color: "#6366F1" },
    },
  });

  const drawerContent = (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100%",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
    }}>
      {/* Header with Logo and User Info */}
      <Box sx={{ 
        p: 3, 
        borderBottom: "1px solid #E2E8F0",
        background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
      }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: "white", 
              fontWeight: 700,
              letterSpacing: "-0.5px",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            RH Portal
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: "rgba(255,255,255,0.8)",
              fontWeight: 500,
            }}
          >
            Gestion des ressources humaines
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          p: 2,
          backdropFilter: "blur(10px)",
        }}>
          <Avatar 
            sx={{ 
              width: 36, 
              height: 36,
              background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
            }}
          >
            A
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "white", 
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Admin User
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: "rgba(255,255,255,0.7)",
                fontSize: "11px",
              }}
            >
              Administrateur
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", py: 2 }}>
        <List disablePadding>
          <ListItemButton 
            component={NavLink} 
            to="/dashboard" 
            sx={(props) => navItemStyle(props, "/dashboard")}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItemButton>

          <ListItemButton 
            component={NavLink} 
            to="/departement" 
            sx={(props) => navItemStyle(props, "/departement")}
          >
            <ListItemIcon>
              <TableChart />
            </ListItemIcon>
            <ListItemText primary="Départements" />
          </ListItemButton>

          <ListItemButton 
            component={NavLink} 
            to="/solution" 
            sx={(props) => navItemStyle(props, "/solution")}
          >
            <ListItemIcon>
              <ReceiptLong />
            </ListItemIcon>
            <ListItemText primary="Projets" />
          
          </ListItemButton>

          <Divider sx={{ my: 1, mx: 2, borderColor: "#E2E8F0" }} />

          <ListItemButton 
            onClick={() => handleToggle("offre")} 
            sx={parentItemStyle(activeDropdown === "offre")}
          >
            <ListItemIcon>
              <NotificationsNone />
            </ListItemIcon>
            <ListItemText primary="Offres" />
            <Box sx={{ 
              transform: activeDropdown === "offre" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}>
              <ExpandMore sx={{ fontSize: "18px" }} />
            </Box>
          </ListItemButton>
          <Collapse in={activeDropdown === "offre"} timeout={300}>
            <List component="div" disablePadding>
              <ListItemButton 
                component={NavLink} 
                to="/offre/stage" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Stages" />
              </ListItemButton>
              <ListItemButton 
                component={NavLink} 
                to="/offre/emploi" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Emplois" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton 
            onClick={() => handleToggle("post")} 
            sx={parentItemStyle(activeDropdown === "post")}
          >
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Gestion des candidats" />
            <Box sx={{ 
              transform: activeDropdown === "post" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}>
              <ExpandMore sx={{ fontSize: "18px" }} />
            </Box>
          </ListItemButton>
          <Collapse in={activeDropdown === "post"} timeout={300}>
            <List component="div" disablePadding>
              <ListItemButton 
                component={NavLink} 
                to="/post/stage" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Stages" />
              </ListItemButton>
              <ListItemButton 
                component={NavLink} 
                to="/post/emploi" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Emplois" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton 
            component={NavLink} 
            to="/PostWithoutOffre" 
            sx={(props) => navItemStyle(props, "/PostWithoutOffre")}
          >
            <ListItemIcon>
              <SendTimeExtension />
            </ListItemIcon>
            <ListItemText primary="Demandes spontanées" />
          </ListItemButton>

          <Divider sx={{ my: 1, mx: 2, borderColor: "#E2E8F0" }} />

          <ListItemButton 
            component={NavLink} 
            to="/questionPsy" 
            sx={(props) => navItemStyle(props, "/questionPsy")}
          >
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Questions de psychologie" />
          </ListItemButton>

          <ListItemButton 
            component={NavLink} 
            to="/question" 
            sx={(props) => navItemStyle(props, "/question")}
          >
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Questions de compétence" />
          </ListItemButton>

          <ListItemButton 
            onClick={() => handleToggle("qcm")} 
            sx={parentItemStyle(activeDropdown === "qcm")}
          >
            <ListItemIcon>
              <FactCheckOutlined />
            </ListItemIcon>
            <ListItemText primary="Tests / QCM" />
            <Box sx={{ 
              transform: activeDropdown === "qcm" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}>
              <ExpandMore sx={{ fontSize: "18px" }} />
            </Box>
          </ListItemButton>
          <Collapse in={activeDropdown === "qcm"} timeout={300}>
            <List component="div" disablePadding>
              <ListItemButton 
                component={NavLink} 
                to="/qcm/stage" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Stages" />
              </ListItemButton>
              <ListItemButton 
                component={NavLink} 
                to="/qcm/emploi" 
                sx={dropdownItemStyle}
              >
                <ListItemIcon>
                  <Circle sx={{ fontSize: "8px" }} />
                </ListItemIcon>
                <ListItemText primary="Emplois" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1, mx: 2, borderColor: "#E2E8F0" }} />

          <ListItemButton 
            component={NavLink} 
            to="/team" 
            sx={(props) => navItemStyle(props, "/team")}
          >
            <ListItemIcon>
              <Groups2 />
            </ListItemIcon>
            <ListItemText primary="Notre équipe" />
          </ListItemButton>

          <ListItemButton 
            component={NavLink} 
            to="/contact" 
            sx={(props) => navItemStyle(props, "/contact")}
          >
            <ListItemIcon>
              <ContactMailOutlined />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>

          <ListItemButton 
            component={NavLink} 
            to="/rh" 
            sx={(props) => navItemStyle(props, "/rh")}
          >
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Entretien RH" />
          </ListItemButton>
        </List>
      </Box>

     
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar 
          position="fixed" 
          sx={{ 
            background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
            zIndex: 1201,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              RH Portal
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: 280,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              border: "none",
              boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            mt: isMobile ? 8 : 0,
            backgroundColor: "#F8FAFC",
            minHeight: "100vh",
          }}
        >
         
        </Box>
      </Box>
    </>
  );
};

export default ModernSidebar;