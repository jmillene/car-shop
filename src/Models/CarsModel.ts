import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  constructor() {
    this.schema = new Schema<ICar>({
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
  public async find() : Promise<ICar[]> {
    return this.model.find();
  }
  public async getById(_id : string) : Promise<ICar | any> {
    return this.model.findOne({ _id });
  }
  public async updateId(_id: string, car: ICar): Promise<ICar | null > {
    if (!isValidObjectId(_id)) throw new Error('Invalid mongo id');
    return this.model.findByIdAndUpdate({ _id }, { ...car } as UpdateQuery<ICar>, { new: true });
  }
}