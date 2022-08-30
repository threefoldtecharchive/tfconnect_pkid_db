import { decodeBase64, encodeUTF8 } from 'tweetnacl-util';
import { sign } from 'tweetnacl';
import { BadRequestException, GoneException } from '@nestjs/common';

export interface ISignatureData {
  timestamp: number;
  intent: string;
}

/**
 * Verify the signed request data that is signed with the private key of the user
 * @param publicKey
 * @param data
 * @param parseJson
 */
export const verifySignedData = <T = ISignatureData>({
  publicKey,
  data,
  parseJson,
}: {
  publicKey: string;
  data: string;
  parseJson?: boolean;
}): T => {
  try {
    const decodedData = decodeBase64(parseJson ? JSON.parse(data) : data);
    const decodedPublicKey = decodeBase64(
      Buffer.from(publicKey, 'hex').toString('base64'),
    );

    const signatureData = sign.open(decodedData, decodedPublicKey);

    return JSON.parse(encodeUTF8(signatureData)) as T;
  } catch (e) {
    throw new BadRequestException('InvalidKeyForSignature');
  }
};

/**
 * Verify the header that is signed with the private key of the user
 * @param publicKey
 * @param header
 */
export const verifySignedHeader = ({
  publicKey,
  header,
}: {
  publicKey: string;
  header: string;
}) => {
  const signatureData: ISignatureData = verifySignedData({
    publicKey,
    data: header,
  });

  const currentMilliseconds = new Date().getTime();
  const difference = currentMilliseconds - signatureData.timestamp;

  if (difference > 5000 && signatureData.intent === 'pkid.store') {
    throw new GoneException();
  }

  return header;
};
