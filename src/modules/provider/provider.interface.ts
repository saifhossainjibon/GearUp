import { GearCondition, RentalStatusForProvider } from "../../../generated/prisma/enums";


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
  categoryId: string;
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
  categoryId?: string;
}
export interface IUpdateRentalStatusPayload {
  status: RentalStatusForProvider;
}
