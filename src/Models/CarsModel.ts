import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  constructor() {
    this.schema = new Schema<ICar>({
      id: String,
      model: String,
      year: Number,
      color: String,
      status: Boolean,
      buyValue: Number,
      doorsQty: Number,
      seatsQty: Number,
    }, { versionKey: false });
    this.model = models.Car || model('Car', this.schema);
  }
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }
}