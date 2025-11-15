import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || '服务器内部错误';
  const code = err.code || 'INTERNAL_ERROR';

  console.error(`错误 [${code}]:`, err);

  res.status(status).json({
    success: false,
    code,
    message,
    timestamp: new Date().toISOString(),
  });
}

export class ValidationError extends Error implements ApiError {
  status = 400;
  code = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error implements ApiError {
  status = 404;
  code = 'NOT_FOUND';

  constructor(message: string = '资源不存在') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error implements ApiError {
  status = 401;
  code = 'UNAUTHORIZED';

  constructor(message: string = '未授权') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

