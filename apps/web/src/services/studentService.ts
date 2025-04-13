import { api } from "./api";
import {
  Student,
  CreateStudentData,
  UpdateStudentData,
} from "../types/student";

export const studentService = {
  async getStudents(): Promise<Student[]> {
    const response = await api.get("/students");
    return response.data;
  },

  async getStudent(id: number): Promise<Student> {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  async createStudent(data: CreateStudentData): Promise<Student> {
    const response = await api.post("/students", data);
    return response.data;
  },

  async updateStudent(id: number, data: UpdateStudentData): Promise<Student> {
    const response = await api.patch(`/students/${id}`, data);
    return response.data;
  },

  async deleteStudent(id: number): Promise<void> {
    await api.delete(`/students/${id}`);
  },
};
