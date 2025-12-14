import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "./corsHeaders";
import { connectMongo } from "../db/connect-mongo";

type RouteHandler = (
  req: NextRequest,
  context: { params: Record<string, string> }
) => Promise<NextResponse>;

export const withDbAndCors =
  (handler: RouteHandler): RouteHandler =>
  async (req, context) => {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    await connectMongo();

    const response = await handler(req, context);

    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
