import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { Customer } from "../models/customer.model";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/response-handler";
import { StatusCodes } from "http-status-codes";

export const getCustomersPaged = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined,
  ) => {
    const { storeId } = await params!;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const pipeline = [
      { $match: { storeId: new mongoose.Types.ObjectId(storeId) } },
      {
        $lookup: {
          from: "invoices",
          localField: "_id",
          foreignField: "customerId",
          as: "invoices",
        },
      },
      {
        $addFields: {
          totalInvoices: { $size: "$invoices" },
          dueCount: {
            $size: {
              $filter: {
                input: "$invoices",
                as: "inv",
                cond: { $gt: ["$$inv.dueAmount", 0] },
              },
            },
          },
        },
      },
      {
        $project: {
          invoices: 0,
        },
      },
    ];

    const paginatedList = await Customer.aggregatePaginate(pipeline, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    return NextResponse.json(
      new ApiResponse(StatusCodes.OK, paginatedList, "Customers fetched"),
    );
  },
);
