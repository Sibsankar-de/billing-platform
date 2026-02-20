import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function isValidAuthToken(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) return false;

    const verifiedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (
      !verifiedToken ||
      typeof verifiedToken !== "object" ||
      !("_id" in verifiedToken)
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
