import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome, {user?.email} ({user?.role})
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {user?.role === "admin" && (
          <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h4">120</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Total Teachers</Typography>
                <Typography variant="h4">15</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Total Courses</Typography>
                <Typography variant="h4">24</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Total Classes</Typography>
                <Typography variant="h4">36</Typography>
              </Item>
            </Grid>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">My Classes</Typography>
                <Typography variant="h4">5</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">My Students</Typography>
                <Typography variant="h4">87</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Upcoming Tests</Typography>
                <Typography variant="h4">3</Typography>
              </Item>
            </Grid>
          </>
        )}

        {user?.role === "student" && (
          <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">My Courses</Typography>
                <Typography variant="h4">6</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Assignments Due</Typography>
                <Typography variant="h4">4</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Upcoming Tests</Typography>
                <Typography variant="h4">2</Typography>
              </Item>
            </Grid>
          </>
        )}

        {user?.role === "parent" && (
          <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">My Children</Typography>
                <Typography variant="h4">2</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Pending Approvals</Typography>
                <Typography variant="h4">1</Typography>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Item>
                <Typography variant="h6">Messages</Typography>
                <Typography variant="h4">3</Typography>
              </Item>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
