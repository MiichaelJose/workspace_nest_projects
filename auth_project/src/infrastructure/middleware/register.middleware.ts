import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    const { url, method, params, query } = req
    
    console.log({ url, method, params, query });
    
    next();
}
