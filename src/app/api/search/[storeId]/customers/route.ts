import { withDbAndCors } from "@/server/utils/withDbAndCors";
import { NextRequest } from "next/server";
import { runMiddlewares } from "@/server/utils/middlewareControll";
import { verifyAuth } from "@/server/middlewares/auth.middleware";
import { searchCustomers } from "@/server/controllers/customer.controller";

export const GET = withDbAndCors(async (req: NextRequest, { params }) => {
  const context = runMiddlewares(req, [verifyAuth]);
  return await searchCustomers(req, context, params);
});
