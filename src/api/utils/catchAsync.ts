import { Request, Response, NextFunction } from 'express';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};


export const catchAsyncStartup = (fn: () => Promise<any>) => {
  return () => {
      fn().catch((error) => {
          console.error('Failed to start the server:', error);
          process.exit(1);
      });
  }
}
