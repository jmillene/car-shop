import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesService from '../Services/MotorcyclesService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcyclesService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcyclesService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }
}