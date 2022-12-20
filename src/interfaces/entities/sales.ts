import { IEmployee } from "./employee";
import { IUnity } from "./unity";

export interface ISale {
  id: number;
  coordinates: string;
  value: number;
  saleDate: Date;
  roamingSale?: boolean,
  createdAt?: Date;
  updatedAt?: Date;
  unityId: number;
  employeeId: number;
}

export interface ISeedSales {
  employeeId: number;
  unityName: string;
}

export type Sale = Omit<ISale, "id" | "createdAt" | "updatedAt">;
export type SetSale = Omit<ISale, "id" | "createdAt" | "updatedAt" | "unityId"> & { unityName: string };
export type ResponseSale = Omit<ISale, "createdAt" | "updatedAt" | "employeeId" | "unityId"> 
& {
  employee: Pick<IEmployee, "id" | "name">;
  unity: Pick<IUnity, "id" | "name">;
};
