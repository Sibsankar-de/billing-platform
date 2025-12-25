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
    const { userId } = await context!;

    const productData = await req.json();
    const {
      storeId,
      name,
      sku,
      totalPrice,
      totalStock,
      stockUnit,
      pricePerQuantity,
    } = productData;

    if (
      [
        storeId,
        name,
        sku,
        totalPrice,
        totalStock,
        stockUnit,
        pricePerQuantity,
      ].some((e) => !e)
    )
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Fill all the stared fields."
      );

    if (pricePerQuantity.length === 0)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Price per quantity is required."
      );

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

export const updateProduct = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { userId } = await context!;
    const { productId } = await params!;

    const productData = await req.json();
    const { name, sku, totalPrice, totalStock, stockUnit, pricePerQuantity } =
      productData;

    if (
      [name, sku, totalPrice, totalStock, stockUnit, pricePerQuantity].some(
        (e) => !e
      )
    )
      throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required.");

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
      },
      { new: true }
    );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, updatedProduct, "Product updated")
    );
  }
);

export const getProduct = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { productId } = await params!;
    const product = await Product.findById(productId);

    if (!product)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid product id");

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, product, "Product fetched")
    );
  }
);

export const deleteProduct = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { productId } = await params!;
    await Product.findByIdAndDelete(productId);

    return NextResponse.json(
      new ApiResponse(200, { productId }, "Product deleted")
    );
  }
);
