import { withDbAndCors } from "@/server/utils/withDbAndCors";
import { NextRequest } from "next/server";
import { runMiddlewares } from "@/server/utils/middlewareControll";
import { verifyAuth } from "@/server/middlewares/auth.middleware";
import { createCategory } from "@/server/controllers/store.controller";

export const POST = withDbAndCors(async (req: NextRequest, { params }) => {
  const context = runMiddlewares(req, [verifyAuth]);
  return await createCategory(req, context, params);
});
