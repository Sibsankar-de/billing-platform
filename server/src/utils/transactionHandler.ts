import mongoose from "mongoose";
import type { NextFunction, Request, Response, RequestHandler } from "express";

type TransactionalHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  session: mongoose.ClientSession,
) => Promise<unknown>;

const transactionHandler = (fn: TransactionalHandler): RequestHandler => {
  return async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        await fn(req, res, next, session);
      });
    } catch (err) {
      return next(err);
    } finally {
      session.endSession();
    }
  };
};

export { transactionHandler };
