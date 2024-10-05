import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles  = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);