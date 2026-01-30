import { Middleware, MiddlewareContext } from "@/types/middleware";
import { NextRequest } from "next/server";

export async function runMiddlewares(
  req: NextRequest,
  middlewares: Middleware[],
  params?: Record<string, string>,
): Promise<MiddlewareContext> {

  let context: MiddlewareContext = {};

  for (const middleware of middlewares) {
    context = await middleware(req, context, params);
  }

  return context;
}
