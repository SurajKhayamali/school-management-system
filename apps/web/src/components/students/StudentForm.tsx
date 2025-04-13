import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { studentService } from "../../services/studentService";
import {
  Student,
  CreateStudentData,
  UpdateStudentData,
} from "../../types/student";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

type FormMode = "create" | "edit";

const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mode: FormMode = id ? "edit" : "create";

  const [loading, setLoading] = useState<boolean>(mode === "edit");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    CreateStudentData | UpdateStudentData
  >({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "",
    address: "",
    phone_number: "",
    enrollment_date: "",
    grade_level: "",
    status: "active",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      if (mode === "edit" && id && id !== "new") {
        try {
          const data = await studentService.getStudent(parseInt(id));
          // Format dates for input fields
          const formattedData = {
            ...data,
            date_of_birth: data.date_of_birth
              ? new Date(data.date_of_birth).toISOString().split("T")[0]
              : "",
            enrollment_date: data.enrollment_date
              ? new Date(data.enrollment_date).toISOString().split("T")[0]
              : "",
          };
          setFormData(formattedData);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch student data");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await studentService.createStudent(formData as CreateStudentData);
      } else if (mode === "edit" && id && id !== "new") {
        await studentService.updateStudent(parseInt(id), formData);
      }
      navigate("/students");
    } catch (err) {
      setError(
        mode === "create"
          ? "Failed to create student"
          : "Failed to update student",
      );
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress />
      </Box>
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
            {mode === "create" ? "Add New Student" : "Edit Student"}
          </Typography>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" mb={2}>
                Personal Information
              </Typography>
            </Grid>

            {mode === "create" && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  id="student_id"
                  name="student_id"
                  label="Student ID"
                  value={(formData as CreateStudentData).student_id}
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="date_of_birth"
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="gender"
                name="gender"
                label="Gender"
                select
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" mb={2}>
                Academic & Contact Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="grade_level"
                name="grade_level"
                label="Grade Level"
                select
                value={formData.grade_level}
                onChange={handleChange}
              >
                <MenuItem value="">Select Grade Level</MenuItem>
                <MenuItem value="Kindergarten">Kindergarten</MenuItem>
                <MenuItem value="1st Grade">1st Grade</MenuItem>
                <MenuItem value="2nd Grade">2nd Grade</MenuItem>
                <MenuItem value="3rd Grade">3rd Grade</MenuItem>
                <MenuItem value="4th Grade">4th Grade</MenuItem>
                <MenuItem value="5th Grade">5th Grade</MenuItem>
                <MenuItem value="6th Grade">6th Grade</MenuItem>
                <MenuItem value="7th Grade">7th Grade</MenuItem>
                <MenuItem value="8th Grade">8th Grade</MenuItem>
                <MenuItem value="9th Grade">9th Grade</MenuItem>
                <MenuItem value="10th Grade">10th Grade</MenuItem>
                <MenuItem value="11th Grade">11th Grade</MenuItem>
                <MenuItem value="12th Grade">12th Grade</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="enrollment_date"
                name="enrollment_date"
                label="Enrollment Date"
                type="date"
                value={formData.enrollment_date}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>

            {mode === "edit" && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  id="status"
                  name="status"
                  label="Status"
                  select
                  value={(formData as UpdateStudentData).status}
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="graduated">Graduated</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                  <MenuItem value="transferred">Transferred</MenuItem>
                </TextField>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/students")}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {mode === "create" ? "Create Student" : "Update Student"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentForm;
