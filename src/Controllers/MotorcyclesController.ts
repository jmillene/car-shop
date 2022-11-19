import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
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
  public async getAllMoto() {
    const moto = await this.service.getAllMoto();
    return this.res.status(200).json(moto);
  }
  public async gelById() {
    const { id } = this.req.params;
    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });
    const car = await this.service.getById(id);
    if (!car) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
    return this.res.status(200).json(car);
  }
}