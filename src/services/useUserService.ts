import { CreateUserDTO } from "src/@types/types";
import { api } from "../config/api";

export const createUser = async (createUserPayload: CreateUserDTO) => {
  const response = await api.post("/users", createUserPayload);
  const message = response.data.message;

  return message;
};

export const getUserStats = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

	const response = await api.get("/users/me/stats", config);
	const userStats = response.data;

	return userStats;
};
