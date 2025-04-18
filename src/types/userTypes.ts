import { User } from "../database/entities/User";

type RequestParamsUser = {id?: string};
type RequestBodyUser = Omit<User, "id" | "reservations">;
type ResponseBodyUser = Omit<User, "password" | "phoneNumber" | "reservations">;

export {RequestBodyUser, RequestParamsUser, ResponseBodyUser}