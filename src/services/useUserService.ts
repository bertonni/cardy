import { CreateUserDTO } from "src/@types/types";
import { api } from "../config/api"

export const createUser = async (createUserPayload: CreateUserDTO) => {
  const response = await api.post('/users', createUserPayload);
  const message = response.data.message;

  console.log(message);
  return message
}