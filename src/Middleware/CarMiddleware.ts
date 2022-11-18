import { NextFunction, Request, Response } from 'express';

export default class ValidaCar {
  validaCar = (req: Request, res: Response, next: NextFunction) => {
    const { model } = req.body;
    if (!model) {
      return res.status(404).json({ message: 'Car not found' });
    }
    next();
  };
}