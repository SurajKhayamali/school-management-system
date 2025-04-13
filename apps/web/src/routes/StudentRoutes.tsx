import { Routes, Route } from "react-router";
import StudentList from "../components/students/StudentList";
import StudentDetail from "../components/students/StudentDetail";
import StudentForm from "../components/students/StudentForm";

const StudentRoutes = () => (
  <Routes>
    <Route path="" element={<StudentList />} />
    <Route path="/new" element={<StudentForm />} />
    <Route path="/:id" element={<StudentDetail />} />
    <Route path="/:id/edit" element={<StudentForm />} />
  </Routes>
);

export default StudentRoutes;
