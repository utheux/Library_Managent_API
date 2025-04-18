import { Address } from "../database/entities/Address";

type RequestBodyAddress = Omit<Address, "id">;

export default RequestBodyAddress;