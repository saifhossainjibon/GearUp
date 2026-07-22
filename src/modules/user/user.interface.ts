import { Role } from "../../../generated/prisma/enums";

export interface RegisterUserPayload{
    name: string;
    email:string;
    phone:string;
    password: string;
    role: Role
}
