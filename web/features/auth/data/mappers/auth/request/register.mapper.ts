import type { RegisterFormData } from "../../../schemas/auth/request";

export function toRegisterRequestDto(data: RegisterFormData) {
  return {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
  };
}
