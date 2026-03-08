import { Role } from '../enums/role.enum';

export interface JwtPayload {
  userId: string;
  username: string;
  role: Role;
  sub: string;
  email: string;
}
