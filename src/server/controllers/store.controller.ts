import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { Store } from "../models/store.model";
import { ApiError } from "../utils/error-handler";

export const createStore = asyncHandler(
  async (req: NextRequest, context: MiddlewareContext | undefined) => {
    const { userId } = context!;
    const { name, address, contactEmail, contactNo } = await req.json();

    if (!name) throw new ApiError(400, "Store name is required.");

    const store = await Store.create({
      name,
      owner: userId,
      address,
      contactEmail,
      contactNo,
    });

    if (!store) throw new ApiError(402, "Failed to create store");

    return NextResponse.json(
      new ApiResponse(200, store, "Store created successfully!")
    );
  }
);

export const updateStore = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { userId } = context!;
    const storeId = params?.storeId;

    const updateData = await req.json();

    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      {
        ...updateData,
      },
      { new: true }
    );

    if (!updatedStore) throw new ApiError(402, "Failed to update store");

    return NextResponse.json(new ApiResponse(200, updatedStore, "Store updated"));
  }
);
