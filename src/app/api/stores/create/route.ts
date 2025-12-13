import { withDbAndCors } from "@/server/utils/withDbAndCors"
import { NextRequest } from "next/server"
import { runMiddlewares } from "@/server/utils/middlewareControll";
import { verifyAuth } from "@/server/middlewares/auth.middleware";
import { createStore } from "@/server/controllers/store.controller";

export const POST = withDbAndCors(async (req: NextRequest) => {
    const context = runMiddlewares(req, [verifyAuth])
    
    return await createStore(req, context);
});