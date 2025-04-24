import React, { useMemo, lazy, Suspense } from "react";
import { Users, Briefcase, GraduationCap, Send } from "lucide-react";
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
  "Total Candidatures": Users,
  "Emploi": Briefcase,
  "Stage": GraduationCap,
  "Spontanée": Send,
};

const StatCard = ({ title, value, color }) => {
  const Icon = iconMap[title];
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        textAlign: "center",
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
      role="region"
      aria-label={`Stat card: ${title}`}
    >
      {Icon && <Icon color={color} size={28} style={{ marginBottom: 8 }} />}
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" color={color}>
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
    <ReactApexChart options={options} series={series} type={type} height={height} />
  </Suspense>
);

const Dashboard = () => {
  const theme = useTheme();

  const chartsData = useMemo(
    () => ({
      lineChartOptions: {
        chart: { id: "candidatures-line" },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "Mai", "Juin"] },
        stroke: { curve: "smooth" },
        colors: [theme.palette.primary.main],
        grid: { show: true },
      },
      lineChartSeries: [{ name: "Candidatures", data: [12, 19, 3, 5, 9, 14] }],
      doughnutChartOptions: {
        labels: ["Emploi", "Stage", "Spontanée"],
        colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Total",
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `${total}`;
                  },
                },
              },
            },
          },
        },
      },
      doughnutChartSeries: [30, 45, 25],
      statCards: [
        { title: "Total Candidatures", value: 100, color: "primary" },
        { title: "Emploi", value: 30, color: "primary" },
        { title: "Stage", value: 45, color: "success" },
        { title: "Spontanée", value: 25, color: "warning" },
      ],
    }),
    [theme]
  );

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {chartsData.statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} role="region" aria-labelledby="line-chart-title">
            <Typography
              id="line-chart-title"
              variant="h6"
              gutterBottom
              color="textPrimary"
            >
              Candidatures par mois
            </Typography>
            <ChartWrapper
              options={chartsData.lineChartOptions}
              series={chartsData.lineChartSeries}
              type="line"
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} role="region" aria-labelledby="donut-chart-title">
            <Typography
              id="donut-chart-title"
              variant="h6"
              gutterBottom
              color="textPrimary"
            >
              Répartition des candidatures
            </Typography>
            <ChartWrapper
              options={chartsData.doughnutChartOptions}
              series={chartsData.doughnutChartSeries}
              type="donut"
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
