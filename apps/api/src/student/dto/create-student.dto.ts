export class CreateStudentDto {
  student_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_of_birth?: Date;
  gender?: string;
  address?: string;
  phone_number?: string;
  enrollment_date?: Date;
  grade_level?: string;
}
