import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(message: string, public status: number, public code?: string, public extras?: Record<string, unknown>) {
    super(message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Not authenticated") {
    super(message, 401, "unauthorized");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "forbidden");
  }
}

export class UpgradeRequiredError extends AppError {
  constructor(reason: string, message = "Upgrade required") {
    super(message, 403, "upgrade_required", { reason });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "not_found");
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid request", extras?: Record<string, unknown>) {
    super(message, 400, "validation_error", extras);
  }
}

export function errorResponse(err: unknown): NextResponse {
  if (err instanceof AppError) {
    return NextResponse.json(
      { error: err.message, code: err.code, ...(err.extras || {}) },
      { status: err.status }
    );
  }
  console.error("Unhandled error", err);
  return NextResponse.json({ error: "Internal server error", code: "internal" }, { status: 500 });
}
