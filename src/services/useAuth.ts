import { SignInDTO } from "src/@types/types";
import { api } from "../config/api";

export const login = async (SignInData: SignInDTO) => {
  const response = await api.post("/auth/login", SignInData);
  const data = response.data;

  return data;
};
