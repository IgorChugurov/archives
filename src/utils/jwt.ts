import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "";

interface SignOption {
  expiresIn?: string | number;
  issuer?: string;
}

const ACCESS_TOKEN_SIGN_OPTION = {
  expiresIn: "1h",
  issuer: "abcsoftware",
};

const REFRESH_TOKEN_SIGN_OPTION = {
  expiresIn: "7d",
  issuer: "abcsoftware",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = ACCESS_TOKEN_SIGN_OPTION,
) {
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

export function signJwtRefreshToken(
  payload: JwtPayload,
  options: SignOption = REFRESH_TOKEN_SIGN_OPTION,
) {
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

// Verify authorization
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey!);
    return decoded as JwtPayload;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
