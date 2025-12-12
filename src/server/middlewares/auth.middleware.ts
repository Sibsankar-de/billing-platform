import { NextRequest } from "next/server";
import { ApiError } from "../utils/error-handler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
import { cookies } from "next/headers";
import { MiddlewareContext } from "@/types/middleware";

export const verifyAuth = async (req: NextRequest, context: MiddlewareContext): Promise<MiddlewareContext> => {
    try {
        const token = req.cookies.get('accessToken')?.value;
        const refreshToken = req.cookies.get('refreshToken')?.value;
        if (!token) throw new ApiError(400, "Invalid request");

        const verifiedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!verifiedToken || typeof verifiedToken !== 'object' || !('_id' in verifiedToken)) {
            throw new ApiError(401, "Unauthorised request");
        }

        // userId from token 
        const userId = (verifiedToken as jwt.JwtPayload)._id;
        const user = await User.findById(userId);

        if (!user) throw new ApiError(402, "User not found");

        // validate sessions
        if (!user.sessions.find((item: Record<string, any>) => item.token === refreshToken)) {
            // clear the cookies
            (await cookies()).delete('accessToken');
            (await cookies()).delete('refreshToken');
            throw new ApiError(404, "Session Expired. Please login again")
        };

        return { ...context, userId: user._id }
    } catch (error) {
        throw new ApiError(401, "Unauthorised request");
    }

}