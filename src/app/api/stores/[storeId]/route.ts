import { withDbAndCors } from "@/server/utils/withDbAndCors";
import { NextRequest } from "next/server";
import { runMiddlewares } from "@/server/utils/middlewareControll";
import { verifyAuth } from "@/server/middlewares/auth.middleware";
import { getStoreById } from "@/server/controllers/store.controller";

export const GET = withDbAndCors(async (req: NextRequest, { params }) => {
  const context = await runMiddlewares(req, [verifyAuth]);

  return await getStoreById(req, context, params);
});
