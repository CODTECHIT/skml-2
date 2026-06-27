import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Use safe string to avoid crashing on complex objects like Zod errors
  try { console.error("ERROR:", err.message || String(err)); } catch(_) {}
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || "Server Error";

  // Hide detailed internal messages in production for 500 errors to prevent data leakage
  if (statusCode === 500 && process.env.NODE_ENV === "production") {
    message = "Internal Server Error";
  }

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // If Zod validation error
  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.errors.map((e: any) => e.message).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};
