import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { Store } from "../models/store.model";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/product.model";

export const createStore = asyncHandler(
  async (req: NextRequest, context: MiddlewareContext | undefined) => {
    const { userId } = await context!;
    const { name, address, contactEmail, contactNo } = await req.json();

    if (!name)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Store name is required.");

    const store = await Store.create({
      name,
      owner: userId,
      address,
      contactEmail,
      contactNo,
    });

    if (!store)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create store"
      );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, store, "Store created successfully!")
    );
  }
);

export const updateStore = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { userId } = await context!;
    const { storeId } = await params!;

    const updateData = await req.json();

    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      {
        ...updateData,
      },
      { new: true }
    );

    if (!updatedStore)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update store"
      );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, updatedStore, "Store updated")
    );
  }
);

export const getProductsByStore = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { userId } = await context!;
    const { storeId, productId } = await params!;

    const productList = await Product.find({ storeId, productId });

    if (!productList) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get list");
    }

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, {}, "Products fetched")
    );
  }
);
