// src/utils/profile.ts
import { ls } from "@/lib/storage";
const KEY = "user_vehicles"; // store as { userId: Vehicle[] }

export function getUserVehicles(userId: string) {
  const all = ls.get<Record<string, any[]>>(KEY, {});
  return all[userId] || [];
}

export function addVehicleForUser(userId: string, vehicle: any) {
  const all = ls.get<Record<string, any[]>>(KEY, {});
  const list = all[userId] || [];
  const newV = { id: `V${Date.now()}`, ...vehicle };
  list.unshift(newV);
  all[userId] = list;
  ls.set(KEY, all);
  return newV;
}
export type Vehicle = {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  fuelType?: string;
  mileage?: number;
};

// export function getUserVehicles(userId: string): Vehicle[] {
//   const vehicles = ls.get<Vehicle[]>("vehicles", []);
//   return vehicles.filter(v => v.userId === userId);
// }

// export function addVehicleForUser(userId: string, vehicle: Omit<Vehicle, "id" | "userId">): Vehicle {
//   const vehicles = ls.get<Vehicle[]>("vehicles", []);
//   const newV: Vehicle = {
//     id: `V${Date.now()}`,
//     userId,
//     ...vehicle,
//   };
//   vehicles.unshift(newV);
//   ls.set("vehicles", vehicles);
//   return newV;
// }
