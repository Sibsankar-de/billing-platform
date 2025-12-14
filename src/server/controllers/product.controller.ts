import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";

export const createProduct = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { storeId } = await params!;
    const { userId } = await context!;

    const productData = await req.json();
    const { name, sku, totalPrice, totalStock, stockUnit, pricePerQuantity } =
      productData;

    if (
      [name, sku, totalPrice, totalStock, stockUnit, pricePerQuantity].some(
        (e) => !e
      )
    )
      throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required.");

    if (pricePerQuantity.length === 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, "");

    const product = await Product.create({
      creatorId: userId,
      storeId,
      ...productData,
    });

    if (!product)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create store"
      );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, product, "Product created")
    );
  }
);
