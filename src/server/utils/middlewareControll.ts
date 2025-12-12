import { Middleware, MiddlewareContext } from "@/types/middleware";
import { NextRequest } from "next/server";

export async function runMiddlewares(req: NextRequest, middlewares: Middleware[]): Promise<MiddlewareContext> {
    let context: MiddlewareContext = {};

    for (const middleware of middlewares) {
        context = await middleware(req, context);
    }

    return context;
}