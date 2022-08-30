import * as crypto from "crypto";
import { IParam } from "@/common/types/interfaces/param.interface";

/**
 * Generate a unique hex key based on the document location and the public key of the user
 * @param publicKey
 * @param documentKey
 */
export const generateDocumentKey = ({ publicKey, documentKey }: IParam): string => {
  return crypto
    .createHash("sha256")
    .update(Buffer.from(publicKey + documentKey).toString("utf-8"))
    .digest()
    .toString("hex");
};
