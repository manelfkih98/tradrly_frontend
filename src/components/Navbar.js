import React from "react";
import { AppBar, Toolbar, Box, Button, InputBase, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../image/image 4.png";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Who are we", path: "/about" },
  { label: "Our work", scroll: true }, // Add scroll flag instead of path
  { label: "Our team" },
  { label: "Careers", path: "/careers" },
  { label: "Blog", path: "/blog" },
];

const Navbar = ({ scrollToWorkShowcase }) => {
  return (
    <AppBar
      sx={{
        backgroundColor: "#0a0a0a",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 10 } }}>
        <Box sx={{ height: "99px", display: "flex", alignItems: "center" }}>
          <NavLink to="/home">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "120px", height: "50px", objectFit: "contain" }}
            />
          </NavLink>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          {navLinks.map((link) => (
          <Button
          key={link.label}
          component={link.path ? NavLink : "button"}
          to={link.path}
          onClick={link.scroll ? scrollToWorkShowcase : undefined}
          color="inherit"
          sx={{
            textTransform: "none",
            textDecoration: "none",
            position: "relative",
            fontSize: "1rem",
            transition: "color 0.3s",
            "&:hover": {
              color: "#1E88E5", // ou la couleur de ton thème
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -2,
              left: 0,
              width: "0%",
              height: "2px",
              backgroundColor: "#1E88E5",
              transition: "width 0.3s",
            },
            "&:hover::after": {
              width: "100%",
            },
            "&.active": {
              fontWeight: "bold",
              color: "#1E88E5",
              "&::after": {
                width: "100%",
              },
            },
          }}
        >
          {link.label}
        </Button>
        
          ))}
        </Box>

        <Box
          sx={{
            position: "relative",
            borderRadius: "999px",
            backgroundColor: alpha("#ffffff", 0.1),
            "&:hover": {
              backgroundColor: alpha("#ffffff", 0.2),
            },
            width: 250,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
          }}
        >
          <SearchIcon sx={{ color: "white", mr: 1 }} />
          <InputBase
            placeholder="Search for something…"
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "white", width: "100%" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;