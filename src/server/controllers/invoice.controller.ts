import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../utils/asynchandler";
import { MiddlewareContext } from "@/types/middleware";
import { ApiResponse } from "../utils/response-handler";
import { ApiError } from "../utils/error-handler";
import { StatusCodes } from "http-status-codes";
import { Invoice } from "../models/invoice.model";
import { Product } from "../models/product.model";
import { Customer } from "../models/customer.model";
import { Store } from "../models/store.model";
import { StoreSettings } from "../models/storeSettings.model";

export const createInvoice = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined,
  ) => {
    const billData = await req.json();
    const { userId } = await context!;
    const { storeId } = await params!;

    const { invoiceNumber, issueDate, total, subTotal, paidAmount, dueAmount } =
      billData;

    if (!invoiceNumber || !issueDate)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Invoice number and issue date is required",
      );

    if ([total, subTotal, paidAmount, dueAmount].some((e) => e === null))
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Calculated amounts are required",
      );

    if (billData?.billItems.length === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Atleast one bill item is required",
      );
    }

    if (
      ["invoiceNumber", "issueDate", "subTotal", "total"].some(
        (e) => billData[e] === null,
      )
    ) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "All starred fields are required",
      );
    }

    const customerDetails = billData.customerDetails;
    if (!customerDetails.name)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Customer name is required");

    // update the invoice number
    const store = await Store.findByIdAndUpdate(
      storeId,
      {
        $set: {
          lastInvoiceNumber: invoiceNumber,
        },
      },
      { new: true },
    );

    const storeSettings = await StoreSettings.findById(store.settingsId);

    // get or create new customer
    let customerId = customerDetails?._id;

    if (!customerId) {
      const customer = await createCustomer(storeId, customerDetails);
      customerId = customer._id;
    }

    const newInvoice = await Invoice.create({
      creatorId: userId,
      storeId,
      customerId,
      ...billData,
    });

    // update
    await Promise.all([
      // update all products if inventory tracking enabled
      ...(storeSettings.enableInventoryTracking
        ? billData.billItems.map((item: any) =>
            Product.updateOne(
              {
                _id: item.product.id,
                enabledInventoryTracking: true,
                totalStock: { $gte: item.netQuantity },
              },
              {
                $inc: { totalStock: -item.netQuantity },
              },
            ),
          )
        : []),
      // update customer if there is due
      dueAmount > 0 &&
        Customer.findByIdAndUpdate(customerId, {
          $inc: { totalStock: dueAmount },
        }),
    ]);

    return NextResponse.json(
      new ApiResponse(200, newInvoice, "Invoice created."),
    );
  },
);

const createCustomer = async (
  storeId: string,
  customerDetails: any,
): Promise<any> => {
  const customer = await Customer.create({
    storeId,
    ...customerDetails,
  });
  return customer;
};

export const getInvoiceList = asyncHandler(
  async (
    req: NextRequest,
    context: MiddlewareContext | undefined,
    params: Record<string, any> | undefined,
  ) => {
    const { storeId } = await params!;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let invoices = await Invoice.paginate(
      { storeId },
      {
        page,
        limit,
        sort: { createdAt: 1 },
        populate: [{ path: "customerId" }],
        lean: true,
      },
    );

    invoices.docs = invoices.docs.map((inv) => {
      const { customerId, ...rest } = inv;
      return {
        ...rest,
        customerDetails: customerId,
      };
    });

    return NextResponse.json(
      new ApiResponse(200, invoices, "Invoice list fetched."),
    );
  },
);
