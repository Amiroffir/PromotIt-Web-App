import { Context, createContext } from "react";

export const RoleContext: Context<string> = createContext<string>("");

export const walletContext: Context<any> = createContext<any>(0); // Still need to figure out how to fix this any

export const identifiedUserContext: Context<boolean> =
  createContext<boolean>(false);
