import { MiddlewareContext } from "@/types/middleware";
import { NextRequest } from "next/server";
import { Store } from "../models/store.model";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";

export const verifyStoreAccess = async (
  req: NextRequest,
  context: MiddlewareContext | undefined,
  params: Record<string, any> | undefined,
  allowed_roles: string[],
): Promise<MiddlewareContext> => {
  try {
    const { userId } = await context!;
    const { storeId } = await params!;

    const store = await Store.findById(storeId);
    if (!store) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Store not found.");
    }

    const accessor = store.accessList.find(
      (e) =>
        e.userId.toString() === userId?.toString() &&
        allowed_roles.includes(e.role),
    );

    console.log(userId, accessor);

    if (!accessor) throw new ApiError(StatusCodes.FORBIDDEN, "Access denied");

    return { ...context, store };
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Access check failed");
  }
};
