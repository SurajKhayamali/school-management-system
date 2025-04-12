import { Request } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export type AuthenticatedUser = Pick<User, 'id' | 'email' | 'role'>;

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
