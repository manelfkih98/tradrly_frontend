import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Link,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableSortLabel,
  Pagination,
    Typography,
} from "@mui/material";
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const tableCellStyle = {
  borderBottom: "1px solid #e5e7eb",
  py: 1,
  px: 2,
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusProps = (status) => {
  switch (status) {
    case "pending":
      return { label: "En Attente", color: "default" };
    case "refused":
      return { label: "Refusé", color: "error" };
    case "testPassed":
      return { label: "Test Réussi", color: "success" };
    default:
      return { label: "Inconnu", color: "default" };
  }
};

const sortApplications = (applications, sortBy, sortOrder) => {
  return [...applications].sort((a, b) => {
    const aValue = sortBy === "createdAt" ? new Date(a.createdAt) : a.status;
    const bValue = sortBy === "createdAt" ? new Date(b.createdAt) : b.status;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

const CandidateTable = ({
  applications,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  page,
  setPage,
  rowsPerPage,
  handleOpenModal,
  handleLogout,
}) => {
  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(field);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredApplications = useMemo(() => {
    let result = applications;
    if (statusFilter !== "all") {
      result = applications.filter((post) => post.status === statusFilter);
    }
    return sortApplications(result, sortBy, sortOrder);
  }, [applications, statusFilter, sortBy, sortOrder]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredApplications.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredApplications, page, rowsPerPage]);

  const pageCount = Math.ceil(filteredApplications.length / rowsPerPage);

  const navItems = [
    { text: "Candidatures", icon: <WorkIcon />, path: "/dashboardcon", selected: true },
    { text: "Profil", icon: <PersonIcon />, path: "/profile" },
    { text: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
    { text: "Déconnexion", icon: <LogoutIcon />, action: handleLogout },
  ];

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="status-filter-label">Filtrer par statut</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Filtrer par statut"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            sx={{
              borderRadius: "8px",
              bgcolor: "#FFFFFF",
              "& .MuiSelect-select": { py: 1.5 },
            }}
          >
            <MenuItem value="all">Tous</MenuItem>
            <MenuItem value="pending">En Attente</MenuItem>
            <MenuItem value="refused">Refusé</MenuItem>
            <MenuItem value="testPassed">Test Réussi</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredApplications.length === 0 ? (
        <Typography
          sx={{
            color: "#4A5568",
            textAlign: "center",
            my: 4,
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Aucune candidature trouvée.
        </Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              bgcolor: "#FFFFFF",
            }}
          >
            <Table aria-label="Tableau des candidatures">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "25%" }}>
                    Poste
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    <TableSortLabel
                      active={sortBy === "status"}
                      direction={sortBy === "status" ? sortOrder : "asc"}
                      onClick={() => handleSort("status")}
                    >
                      Statut
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    <TableSortLabel
                      active={sortBy === "status"}
                      direction={sortBy === "status" ? sortOrder : "asc"}
                      onClick={() => handleSort("status")}
                    >
                      Résultat
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    <TableSortLabel
                      active={sortBy === "createdAt"}
                      direction={sortBy === "createdAt" ? sortOrder : "asc"}
                      onClick={() => handleSort("createdAt")}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    CV
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1A202C", width: "15%" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedApplications.map((post, index) => (
                  <TableRow
                    key={post._id}
                    sx={{
                      bgcolor: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                      "&:hover": { bgcolor: "#EDF2F7" },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell sx={{ color: "#2D3748", fontSize: "0.95rem" }}>
                      {post.jobId ? post.jobId.titre : "En attente de poste"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusProps(post.status).label}
                        color={getStatusProps(post.status).color}
                        size="small"
                        sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      {post.qcm_resultat !== null && post.qcm_resultat !== undefined ? (
                        <Chip
                          label={post.qcm_resultat}
                          color="primary"
                          size="small"
                          sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                        />
                      ) : (
                        <Chip
                          label="-"
                          color="default"
                          size="small"
                          sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "#4A5568", fontSize: "0.95rem" }}>
                      {formatDate(post.createdAt)}
                    </TableCell>
                    <TableCell sx={{ color: "#4A5568", fontSize: "0.95rem" }}>
                      {post.jobId ? (post.jobId.type === "job" ? "Emploi" : "Stage") : "-"}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Link
                          href={post.cv_google_drive_url || "#"}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                          sx={{
                            color: post.cv_local_url ? "#1976D2" : "#A0AEC0",
                            fontSize: "0.9rem",
                            "&:hover": post.cv_local_url && { color: "#1565C0" },
                          }}
                        >
                          Local
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenModal(post)}
                        disabled={post.status !== "pending"}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.9rem",
                          borderRadius: "8px",
                          borderColor: "#914091",
                          color: "#1976D2",
                          "&:disabled": {
                            borderColor: "#B0BEC5",
                            color: "#B0BEC5",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Modifier CV
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "0.95rem",
                  "&:hover": { bgcolor: "#914091" },
                },
                "& .Mui-selected": {
                  bgcolor: "#1976D2",
                  color: "#FFFFFF",
                  "&:hover": { bgcolor: "#1565C0" },
                },
              }}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default CandidateTable;