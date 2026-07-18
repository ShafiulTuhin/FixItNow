import { UserRole } from "../../../generated/prisma/enums";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  role?: UserRole;
}
