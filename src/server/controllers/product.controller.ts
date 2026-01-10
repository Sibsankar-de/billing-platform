import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";
import { Category } from "../models/category.model";
import { generateGTIN } from "@/utils/gtin-generator";

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
      gtin,
      buyingPricePerQuantity,
      enableInventoryTracking,
      totalStock,
      stockUnit,
      pricePerQuantity,
      categories,
    } = productData;

    if (
      [
        storeId,
        name,
        sku,
        buyingPricePerQuantity,
        stockUnit,
        pricePerQuantity,
      ].some((e) => !e) ||
      (enableInventoryTracking && !totalStock)
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

    let categoryIds: string[] = [];
    if (categories && categories.length > 0) {
      for (const category of categories) {
        const categoryId = await getOrCreateCategory(category?.name, storeId);
        categoryIds.push(categoryId.toString());
      }
    }

    const product = await Product.create({
      creatorId: userId,
      storeId,
      ...productData,
      gtin: gtin || generateGTIN(),
      categories: categoryIds,
    });

    if (!product)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create store"
      );

    const productWithCategories = await getProductWithCategories(product);

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, productWithCategories, "Product created")
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
    const {
      storeId,
      name,
      sku,
      gtin,
      buyingPricePerQuantity,
      enableInventoryTracking,
      totalStock,
      stockUnit,
      pricePerQuantity,
      categories,
    } = productData;

    if (
      [
        storeId,
        name,
        sku,
        buyingPricePerQuantity,
        stockUnit,
        pricePerQuantity,
      ].some((e) => !e) ||
      (enableInventoryTracking && !totalStock)
    )
      throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required.");

    let categoryIds: string[] = [];
    if (categories && categories.length > 0) {
      for (const category of categories) {
        const categoryId = await getOrCreateCategory(category?.name, storeId);
        categoryIds.push(categoryId.toString());
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          ...productData,
          categories: categoryIds,
          gtin: gtin || generateGTIN(),
        },
      },
      { new: true }
    );

    const productWithCategories = await getProductWithCategories(
      updatedProduct
    );

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, productWithCategories, "Product updated")
    );
  }
);

const getOrCreateCategory = async (categoryName: string, storeId: string) => {
  // Check if category exists
  let category = await Category.findOne({ name: categoryName, storeId });

  // If not, create it
  if (!category) {
    category = await Category.create({ name: categoryName, storeId });
  }

  return category._id;
};

export const getProduct = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const { productId } = await params!;
    const product = await Product.findById(productId).populate([
      { path: "categories", select: "_id name storeId" },
    ]);

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

const getProductWithCategories = async (product: any) => {
  const categories = await Category.find({ _id: { $in: product.categories } });
  return { ...product.toObject(), categories };
};
