import AllQcm from "../components/QCM/allQcm";
import { Box, Typography, Container } from "@mui/material";

const Qcm = () => {
  return (
    <Box
     
    >
      <Container maxWidth="lg">
        <Box
          
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            🧠 Espace Résultats QCM
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            mb={4}
          >
            Retrouvez ici les résultats de tests passés par les candidats.
          </Typography>

          <AllQcm />
        </Box>
      </Container>
    </Box>
  );
};

export default Qcm;
