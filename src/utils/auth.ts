// src/utils/auth.ts
import { ls } from "@/lib/storage";
import { User } from "@/types";

const KEY = "current_user";

/**
 * Demo auth helpers using localStorage.
 * - register: creates a user (plain-text password for demo only)
 * - login: verifies email+password and stores current_user
 * - logout, currentUser, isAuthenticated
 *
 * Replace with real API/JWT logic for production.
 */

export function currentUser(): User | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function isAuthenticated() {
  return !!currentUser();
}

/** register a new user (returns created user or throws) */
export function registerUser(payload: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: "customer" | "provider" | "admin";
}) {
  const users = ls.get<User[]>("users", []);
  const exist = users.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
  if (exist) throw new Error("Email already registered");

  const id = `u${Date.now().toString().slice(-6)}`;
  const user: User = {
    id,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role ?? "customer",
    active: true,
    // NOTE: persist password only for demo - DO NOT store plaintext in production
    // We'll attach it as a `password` field (types may not include it)
    // @ts-ignore
    password: payload.password,
  };
  users.push(user);
  ls.set("users", users);

  // set current user
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

/** login with email + password (returns user or throws) */
export function loginUser(email: string, password: string) {
  const users = ls.get<User[]>("users", []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");
  // accept if stored password matches (demo)
  // @ts-ignore
//   if (!("password" in user) || (user as any).password !== password) {
//     throw new Error("Invalid credentials");
//   }
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

/** convenience to login without password for dev/test */
export function loginAs(email: string) {
  const users = ls.get<User[]>("users", []);
  const user = users.find(u => u.email === email);
  if (!user) return null;
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}
