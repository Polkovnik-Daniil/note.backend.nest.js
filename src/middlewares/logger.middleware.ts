import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class CustomeLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(
      `Routed by: {${req.baseUrl},\tMethod: ${req.method}}\tIP: ${req.ip}\tParam:${req.params}`,
      CustomeLoggerMiddleware.name,
    );
    next();
  }
}
