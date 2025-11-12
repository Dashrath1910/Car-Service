import { ls } from "./storage";

export function getUserVehicles(userId: string) {
  return ls.get(`vehicles_${userId}`, []);
}
export function addUserVehicle(userId: string, vehicle: any) {
  const list = getUserVehicles(userId);
  list.unshift(vehicle);
  ls.set(`vehicles_${userId}`, list);
}
export function getUserBookings(userId: string) {
  return ls.get(`bookings_${userId}`, []);
}
export function addUserBooking(userId: string, booking: any) {
  const list = getUserBookings(userId);
  list.unshift(booking);
  ls.set(`bookings_${userId}`, list);
}
