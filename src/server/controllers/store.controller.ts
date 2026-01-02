import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { Store } from "../models/store.model";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";
import { Product } from "../models/product.model";
import { StoreDto } from "@/types/dto/storeDto";
import { Customer } from "../models/customer.model";

export const createStore = asyncHandler(
  async (req: NextRequest, context: MiddlewareContext | undefined) => {
    const { userId } = await context!;
    const { name, businessType, address, contactEmail, contactNo } =
      await req.json();

    if (!name)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Store name is required.");

    const store = await Store.create({
      name,
      owner: userId,
      businessType,
      address,
      contactEmail,
      contactNo,
      accessList: [
        {
          userId,
          role: "ADMIN",
        },
      ],
    });

    if (!store)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create store"
      );

    return NextResponse.json(
      new ApiResponse(
        StatusCodes.OK,
        store as StoreDto,
        "Store created successfully!"
      )
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
    ).select("-accessList");

    if (!updatedStore)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update store"
      );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, updatedStore as StoreDto, "Store updated")
    );
  }
);

export const getStoreList = asyncHandler(
  async (req: NextRequest, context: MiddlewareContext | undefined) => {
    const { userId } = await context!;

    const storeList = await Store.find({ owner: userId }).select("-accessList");

    if (!storeList) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get list");
    }

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, storeList, "Stores fetched")
    );
  }
);

export const getStoreById = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { userId } = await context!;
    const { storeId } = await params!;

    const store = await Store.findById(storeId).select("-accessList");

    if (!store) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get store");
    }

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, store, "Store fetched")
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
    const { storeId } = await params!;

    const productList = await Product.find({ storeId });

    if (!productList) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get list");
    }

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, productList, "Products fetched")
    );
  }
);

export const getCustomerList = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { storeId } = await params!;

    const customerList = await Customer.find({ storeId });

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, customerList, "Customer details fetched")
    );
  }
);
