import { GearCondition, RentalStatus } from "../../../generated/prisma/enums";


export interface IAddGearPayload {
  name: string;
  description?: string;
  brand: string;
  model?: string;
  pricePerDay: number;
  availableStock?: number;
  condition: GearCondition;
  image: string;
  isAvailable?: boolean;
  category: string;
}
export interface IUpdateGearPayload {
  name?: string;
  description?: string;
  brand?: string;
  model?: string;
  pricePerDay?: number;
  availableStock?: number;
  condition?: GearCondition;
  image?: string;
  isAvailable?: boolean;
  category?: string;
}
export interface IUpdateRentalStatusPayload {
  status: RentalStatus;
}
