import { createEncryptionPassword } from "./encryptionPassword";

const verifyPassword = (inputPassword: string, storedValue: string): boolean => {
    const inputPasswordHash = createEncryptionPassword(inputPassword);
    return inputPasswordHash === storedValue;
}

export default verifyPassword;