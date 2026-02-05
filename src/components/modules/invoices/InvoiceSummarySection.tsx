"use client";

import { PrimaryBox } from "@/components/sections/PrimaryBox";
import { useStoreNavigation } from "@/hooks/store-navigation";
import {
  fetchInvoiceSummaryThunk,
  selectInvoiceState,
} from "@/store/features/invoiceSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InvoiceSummarySection = () => {
  const { storeId } = useStoreNavigation();
  const dispatch = useDispatch();
  const {
    data: { summaryData },
    summaryStatus,
  } = useSelector(selectInvoiceState);

  useEffect(() => {
    if (summaryStatus === "idle") {
      dispatch(fetchInvoiceSummaryThunk({ storeId }));
    }
  }, [dispatch, summaryStatus]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <PrimaryBox className="rounded-xl">
        <p className="text-gray-600 mb-1">Total Revenue</p>
        <h2 className="text-gray-900 mb-2">
          &#8377;{summaryData.totalRevenue}
        </h2>
        <p className="text-green-600 text-sm">
          {summaryData.totalInvoices} invoices
        </p>
      </PrimaryBox>
      <PrimaryBox className="rounded-xl">
        <p className="text-gray-600 mb-1">Total Paid Amount</p>
        <h2 className="text-green-700 mb-2">&#8377;{summaryData.totalPaid}</h2>
        {/* <p className="text-red-600 text-sm">18 invoices</p> */}
      </PrimaryBox>
      <PrimaryBox className="rounded-xl">
        <p className="text-gray-600 mb-1">Total Pending Payment</p>
        <h2 className="text-red-500 mb-2">&#8377;{summaryData.totalDue}</h2>
        {/* <p className="text-amber-600 text-sm">86 invoices</p> */}
      </PrimaryBox>
    </div>
  );
};
