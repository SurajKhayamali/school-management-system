export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  phone_number?: string;
  enrollment_date?: string;
  grade_level?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  phone_number?: string;
  enrollment_date?: string;
  grade_level?: string;
}

export interface UpdateStudentData {
  first_name?: string;
  last_name?: string;
  email?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  phone_number?: string;
  enrollment_date?: string;
  grade_level?: string;
  status?: string;
}
