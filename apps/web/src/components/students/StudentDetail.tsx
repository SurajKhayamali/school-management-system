import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { studentService } from "../../services/studentService";
import { Student } from "../../types/student";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const StudentDetail = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (id) {
          const data = await studentService.getStudent(parseInt(id));
          setStudent(data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student details");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (
      student &&
      window.confirm("Are you sure you want to delete this student?")
    ) {
      try {
        await studentService.deleteStudent(student.id);
        navigate("/students");
      } catch (err) {
        setError("Failed to delete student");
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">Student not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/students")}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Student Details
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/students/${student.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Personal Information
            </Typography>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Student ID
              </Typography>
              <Typography variant="body1">{student.student_id}</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Full Name
              </Typography>
              <Typography variant="body1">
                {student.first_name} {student.last_name}
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{student.email || "N/A"}</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">
                {student.date_of_birth
                  ? new Date(student.date_of_birth).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Gender
              </Typography>
              <Typography variant="body1">{student.gender || "N/A"}</Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Academic Information
            </Typography>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Grade Level
              </Typography>
              <Typography variant="body1">
                {student.grade_level || "N/A"}
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Enrollment Date
              </Typography>
              <Typography variant="body1">
                {student.enrollment_date
                  ? new Date(student.enrollment_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={student.status}
                color={student.status === "active" ? "success" : "default"}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Contact Information
        </Typography>
        <Grid container spacing={4}>
          <Grid>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1">
                {student.address || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary">
                Phone Number
              </Typography>
              <Typography variant="body1">
                {student.phone_number || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default StudentDetail;
