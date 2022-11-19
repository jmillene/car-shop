import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;
  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: String,
      year: Number,
      color: String,
      status: Boolean,
      buyValue: Number,
      category: String,
      engineCapacity: Number,

    }, { versionKey: false });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  public async create(moto: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...moto });
  }
  public async find() : Promise<IMotorcycle[]> {
    return this.model.find();
  }
  public async getById(_id : string) : Promise<IMotorcycle | any> {
    return this.model.findOne({ _id });
  }
}