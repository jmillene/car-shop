import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsServices';

export default class CarController {
  constructor(private service = new CarsService()) {}

  create = async (req: Request, res : Response) => {
    const car:ICar = req.body;
    const created = await this.service.create(car);
    return res.status(201).json(created);
  };
}