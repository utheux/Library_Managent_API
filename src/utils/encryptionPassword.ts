import crypto from "crypto";

export const createEncryptionPassword = (password: string) => {

    const hash = crypto.createHash("sha256");

    hash.update(password);
    return hash.digest("hex");

}