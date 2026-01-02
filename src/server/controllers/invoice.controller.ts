import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";
import { Invoice } from "../models/invoice.model";
import { Product } from "../models/product.model";
import { Customer } from "../models/customer.model";

export const createInvoice = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined
  ) => {
    const billData = await req.json();
    const { userId } = await context!;
    const { storeId } = await params!;

    if (billData?.billItems.length === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Atleast one bill item is required"
      );
    }

    if (
      ["invoiceNumber", "issueDate", "subTotal", "total"].some(
        (e) => billData[e] === null
      )
    ) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "All starred fields are required"
      );
    }

    const customerDetails = billData?.customerDetails;
    let customerId = null;
    if (customerDetails?.fullName || customerDetails?.phoneNumber) {
      const customer = await Customer.create({
        ...customerDetails,
      });
      customerId = customer[0]._id;
    }

    const newInvoice = await Invoice.create({
      creatorId: userId,
      storeId,
      customerId,
      ...billData,
    });

    // update all products
    await Promise.all(
      billData.billItems.map((item: any) =>
        Product.updateOne(
          { _id: item.product.id },
          {
            $inc: {
              totalStock: -item.netQuantity,
              totalPrice: -item.totalPrice,
            },
          }
        )
      )
    );

    return NextResponse.json(
      new ApiResponse(200, newInvoice, "Invoice created.")
    );
  }
);
