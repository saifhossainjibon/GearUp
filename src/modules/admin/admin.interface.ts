import { ActiveStatus } from "../../../generated/prisma/enums";

export interface IUpdateUserStatusPayload {
  status: ActiveStatus;
}
export interface ICategoryPayload {
  name: string;
  description?: string;
}