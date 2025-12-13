import { NextRequest, NextResponse } from 'next/server';
import { corsHeaders } from './corsHeaders';
import { connectMongo } from '../db/connect-mongo';

type RouteHandler = (req: NextRequest, params?: Record<string,any>) => Promise<NextResponse>;

export const withDbAndCors = (handler: RouteHandler, params?: Record<string,any>): RouteHandler => {
    return async (req: NextRequest) => {
        if (req.method === 'OPTIONS') {
            return new NextResponse(null, { status: 204, headers: corsHeaders });
        }

        await connectMongo();
        console.log(params);
        
        const param = await params?.param
        const response = await handler(req, param);
        corsHeaders && Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    };
};