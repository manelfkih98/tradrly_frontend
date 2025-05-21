import React from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard";
import Departement from "./pages/departemenet";
import { Box } from "@mui/material";
import Solution from "./pages/solution";
import OffreStage from "./pages/offreStage";
import OffreEmploi from "./pages/offreEmploi";
import Question from "./pages/question";
import Posts from "./pages/postsEmploi";
import PostWithoutOffre from "./pages/postWithoutOffre";
import Login from "./pages/login";
import Qcm from "./pages/Qcm";
import Test from "./pages/test";
import LoginCandidatPage from "./pages/loginCandidatPage";
import PostStage from "./pages/postStage";
import Home from "./pages/home";
import UboutUs from "./pages/aboutUs";
import Blog from "./pages/blog";
import WorkShowcase from "./components/home/WorkShowcase";
import Team from "./pages/team";
import Contact from "./pages/contact";
import NavbarDash from "./components/NavbarDash";
import TestInfoPage from "./pages/TestInfoPage";
import Careers from "./pages/careers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Postcandidat from "./pages/candidat"

const App = () => {
  const location = useLocation();

  const hideSidebarRoutes = ["/", "/test/:id", "/loginCandidat/:id"];
  const fullScreenRoutes = [
    "/home",
    "/about",
    "/blog",
    "/work",
    "/page_info/:id",
    "/",
    "/careers",
    "/dashboardcon",
    "/analysecv",
  ];

  const shouldHideSidebar = hideSidebarRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  const isFullScreenPage = fullScreenRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  if (isFullScreenPage) {
    return (
      <Routes>
        <Route path="/page_info/:id" element={<TestInfoPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<UboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/work" element={<WorkShowcase />} />
        <Route path="/" element={<Login />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/dashboardcon" element={<Postcandidat/>} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {!shouldHideSidebar && (
        <>
          <Sidebar />
          <NavbarDash />
        </>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departement" element={<Departement />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/offre/stage" element={<OffreStage />} />
          <Route path="/offre/emploi" element={<OffreEmploi />} />
          <Route path="/question" element={<Question />} />
          <Route path="/post/emploi" element={<Posts />} />
          <Route path="/post/stage" element={<PostStage />} />
          <Route path="/postwithoutoffre" element={<PostWithoutOffre />} />
          <Route path="/QCM" element={<Qcm />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/loginCandidat/:id" element={<LoginCandidatPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </Box>
    </Box>
  );
};

export default App;
