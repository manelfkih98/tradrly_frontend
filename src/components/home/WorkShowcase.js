import React, { useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSolutions } from '../../store/services/solutionService';

const WorkShowcase = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  // Grouping projects by department
  const groupedByDepartment = projects.reduce((acc, project) => {
    const depName = project?.departementId?.NameDep || 'Autre';
    if (!acc[depName]) acc[depName] = [];
    acc[depName].push(project);
    return acc;
  }, {});

  const departments = Object.entries(groupedByDepartment).map(
    ([name, items]) => ({
      name,
      items,
    })
  );

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
        OUR WORK IS BASED ON
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : (
        departments.map((department, deptIndex) => (
          <div key={deptIndex} style={{ marginBottom: '48px' }}>
            {/* Header with department name */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  deptIndex % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  border: '1px solid #1976d2',
                  borderRadius: '20px',
                  backgroundColor: '#fff',
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {department.name}
                </Typography>
              </Box>
            </Box>

            {/* Horizontal scrollable cards */}
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                paddingBottom: '16px',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
              }}
            >
              {department.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: '0 0 auto',
                    width: '33.33%',
                    minWidth: '300px',
                    padding: '0 12px',
                  }}
                >
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${item.image?.replace(
                        /\\/g,
                        '/'
                      )}`}
                      alt={item.name_project}
                      sx={{
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0',
                      }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        #{item.name_project}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(item.date_creation).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

export default WorkShowcase;
