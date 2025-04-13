import { Navigate, Route, BrowserRouter, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import StudentRoutes from "./StudentRoutes";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/*"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentRoutes />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
