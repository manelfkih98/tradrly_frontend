
import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { fetchDashboardData, fetchPostByOffreJob, fetchPostByOffreStage } from "../store/services/dashboardService"; 
import { useDispatch, useSelector } from "react-redux";
import {
  Briefcase, GraduationCap, Send, Building2, Layers3
} from "lucide-react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";

const ReactApexChart = lazy(() => import("react-apexcharts"));

const iconMap = {
  "Post Emploi": Briefcase,
  "Post Stage": GraduationCap,
  "Demande Spontanée": Send,
  "Offres d'emploi": Briefcase,      
  "Offres de stage": GraduationCap,  
  "Départements": Building2,
  "Équipe": Layers3,
};

const StatCard = ({ title, value, color }) => {
  const Icon = iconMap[title];
  const colorMap = {
    primary: "#1976d2",
    success: "#2e7d32",
    warning: "#ed6c02",
    error: "#d32f2f",
    info: "#0288d1",
    secondary: "#9c27b0",
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        background: `linear-gradient(135deg, ${colorMap[color]}22, ${colorMap[color]}0A)`,
        boxShadow: `0px 8px 20px ${colorMap[color]}33`,
        textAlign: "center",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        p: 2,
      }}
    >
      {Icon && (
        <Box
          sx={{
            width: 30,
            height: 30,
            mx: "auto",
            mb: 1.5,
            borderRadius: "50%",
            backgroundColor: `${colorMap[color]}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={colorMap[color]} />
        </Box>
      )}
      <Typography variant="subtitle1" color="textSecondary" fontWeight="500">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color={color}>
        {value}
      </Typography>
    </Paper>
  );
};

const ChartWrapper = ({ options, series, type, height }) => (
  <Suspense
    fallback={
      <Box
        height={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="primary" />
      </Box>
    }
  >
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      aria-label={`Chart displaying ${type} data`}
    />
  </Suspense>
);

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dashboardData, loading, error, postByOffreStage, postByOffreJob } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchPostByOffreJob());
    dispatch(fetchPostByOffreStage());
  }, [dispatch]);

  const chartsData = useMemo(() => {
    if (!dashboardData) return null;

    // Aggregate postByOffreStage by titre
    const aggregatedPostByOffreStage = Array.isArray(postByOffreStage)
      ? Object.values(
          postByOffreStage.reduce((acc, curr) => {
            const titre = curr.titre || "Inconnu";
            if (!acc[titre]) {
              acc[titre] = { titre, postCount: 0 };
            }
            acc[titre].postCount += curr.postCount || 0;
            return acc;
          }, {})
        ).filter(offre => offre.postCount > 0) // Exclude zero counts
      : [];

    // Aggregate postByOffreJob by titre
    const aggregatedPostByOffreJob = Array.isArray(postByOffreJob)
      ? Object.values(
          postByOffreJob.reduce((acc, curr) => {
            const titre = curr.titre || "Inconnu";
            if (!acc[titre]) {
              acc[titre] = { titre, postCount: 0 };
            }
            acc[titre].postCount += curr.postCount || 0;
            return acc;
          }, {})
        ).filter(offre => offre.postCount > 0) // Exclude zero counts
      : [];

    return {
      lineChartOptions: {
        chart: {
          id: "candidatures-line",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1000,
            animateGradually: { enabled: true, delay: 150 },
          },
          toolbar: { show: true, tools: { download: true, zoom: true, pan: true } },
        },
        xaxis: {
          categories: dashboardData.lineChart?.categories || [],
          labels: { style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary } },
        },
        yaxis: {
          labels: { style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary } },
        },
        stroke: { curve: "smooth", width: 4 },
        colors: [theme.palette.primary.main],
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: [theme.palette.primary.light],
            inverseColors: false,
            opacityFrom: 0.6,
            opacityTo: 0.1,
          },
        },
        grid: { borderColor: theme.palette.grey[200], strokeDashArray: 4, padding: { left: 20, right: 20 } },
        tooltip: {
          theme: "light",
          y: {
            formatter: (val) => `${val} candidatures`,
          },
          style: { fontSize: "12px" },
        },
        markers: { size: 5, hover: { size: 8 } },
        dataLabels: { enabled: false },
      },
      lineChartSeries: [
        { name: "Candidatures", data: dashboardData.lineChart?.series || [] }
      ],
      doughnutChartOptions: {
        chart: {
          id: "candidatures-donut",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1000,
            animateGradually: { enabled: true, delay: 150 },
          },
        },
        labels: dashboardData.doughnutChart?.labels || [],
        colors: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        legend: {
          position: "bottom",
          fontSize: "14px",
          fontWeight: 500,
          onItemClick: { toggleDataSeries: true },
          markers: { width: 12, height: 12, radius: 12 },
        },
        dataLabels: {
          enabled: true,
          style: { fontSize: "14px", fontWeight: 600, colors: ["#fff"] },
          dropShadow: { enabled: true, blur: 2, opacity: 0.8 },
        },
        plotOptions: {
          pie: {
            donut: {
              size: "70%",
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Total",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  formatter: (w) => {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `${total}`;
                  },
                },
              },
            },
          },
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: (val) => `${val} candidatures`,
          },
          style: { fontSize: "12px" },
        },
      },
      doughnutChartSeries: dashboardData.doughnutChart?.series || [],
      statCards: dashboardData.statCards || [],
      postByOffreStageData: aggregatedPostByOffreStage,
      postByOffreJobData: aggregatedPostByOffreJob,
    };
  }, [dashboardData, theme, postByOffreStage, postByOffreJob]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <Typography variant="h6" color="error">
          Erreur lors du chargement des données : {error}
        </Typography>
      </Box>
    );
  }

  if (!chartsData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <Typography variant="h6" color="textSecondary">
          Aucune donnée disponible
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {chartsData.statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 4 }} role="region" aria-labelledby="line-chart-title">
            <Typography id="line-chart-title" variant="h6" gutterBottom color="textPrimary">
              Candidatures par mois
            </Typography>
            <ChartWrapper
              options={chartsData.lineChartOptions}
              series={chartsData.lineChartSeries}
              type="line"
              height={400}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 4 }} role="region" aria-labelledby="donut-chart-title">
            <Typography id="donut-chart-title" variant="h6" gutterBottom color="textPrimary">
              Répartition des candidatures
            </Typography>
            <ChartWrapper
              options={chartsData.doughnutChartOptions}
              series={chartsData.doughnutChartSeries}
              type="donut"
              height={400}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 4 }} role="region" aria-labelledby="postByOffreStage-title">
            <Typography id="postByOffreStage-title" variant="h6" gutterBottom color="textPrimary">
              Nombre de postulations par offre (Stage)
            </Typography>
            {chartsData.postByOffreStageData.length > 0 ? (
              <ChartWrapper
                options={{
                  chart: {
                    id: "postByOffreStage-chart",
                    animations: {
                      enabled: true,
                      easing: "easeinout",
                      speed: 1000,
                      animateGradually: { enabled: true, delay: 150 },
                    },
                  },
                  xaxis: {
                    categories: chartsData.postByOffreStageData.map(offre => offre.titre || "Inconnu"),
                    labels: {
                      style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary },
                      rotate: -45,
                      rotateAlways: true,
                    },
                  },
                  yaxis: {
                    labels: { style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary } },
                  },
                  colors: [theme.palette.success.main + "CC"], // Slight transparency
                  grid: { borderColor: theme.palette.grey[200], strokeDashArray: 4, padding: { left: 20, right: 20 } },
                  plotOptions: {
                    bar: {
                      borderRadius: 8,
                      dataLabels: { position: "top" },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    offsetY: -25,
                    style: { fontSize: "12px", fontWeight: 600, colors: [theme.palette.text.primary] },
                    dropShadow: { enabled: true, blur: 2, opacity: 0.8 },
                  },
                  tooltip: {
                    theme: "light",
                    y: {
                      formatter: (val) => `${val} postulations`,
                    },
                    style: { fontSize: "12px" },
                  },
                  states: {
                    hover: {
                      filter: { type: "lighten", value: 0.1 },
                    },
                  },
                }}
                series={[{ name: "Postulations (Stage)", data: chartsData.postByOffreStageData.map(offre => offre.postCount || 0) }]}
                type="bar"
                height={400}
              />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography variant="h6" color="textSecondary">
                  Aucune donnée disponible
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 4 }} role="region" aria-labelledby="postByOffreJob-title">
            <Typography id="postByOffreJob-title" variant="h6" gutterBottom color="textPrimary">
              Nombre de postulations par offre (Emploi)
            </Typography>
            {chartsData.postByOffreJobData.length > 0 ? (
              <ChartWrapper
                options={{
                  chart: {
                    id: "postByOffreJob-chart",
                    animations: {
                      enabled: true,
                      easing: "easeinout",
                      speed: 1000,
                      animateGradually: { enabled: true, delay: 150 },
                    },
                  },
                  xaxis: {
                    categories: chartsData.postByOffreJobData.map(offre => offre.titre || "Inconnu"),
                    labels: {
                      style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary },
                      rotate: -45,
                      rotateAlways: true,
                    },
                  },
                  yaxis: {
                    labels: { style: { fontSize: "12px", fontWeight: 500, colors: theme.palette.text.secondary } },
                  },
                  colors: [theme.palette.primary.main + "CC"], // Slight transparency
                  grid: { borderColor: theme.palette.grey[200], strokeDashArray: 4, padding: { left: 20, right: 20 } },
                  plotOptions: {
                    bar: {
                      borderRadius: 8,
                      dataLabels: { position: "top" },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    offsetY: -25,
                    style: { fontSize: "12px", fontWeight: 600, colors: [theme.palette.text.primary] },
                    dropShadow: { enabled: true, blur: 2, opacity: 0.8 },
                  },
                  tooltip: {
                    theme: "light",
                    y: {
                      formatter: (val) => `${val} postulations`,
                    },
                    style: { fontSize: "12px" },
                  },
                  states: {
                    hover: {
                      filter: { type: "lighten", value: 0.1 },
                    },
                  },
                }}
                series={[{ name: "Postulations (Emploi)", data: chartsData.postByOffreJobData.map(offre => offre.postCount || 0) }]}
                type="bar"
                height={400}
              />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography variant="h6" color="textSecondary">
                  Aucune donnée disponible
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
