import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;
  constructor() {
    this.schema = new Schema<IMotorcycle>(
      {
        model: String,
        year: Number,
        color: String,
        status: Boolean,
        buyValue: Number,
        category: String,
        engineCapacity: Number,
      },
      { versionKey: false },
    );
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  public async create(moto: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...moto });
  }
  public async find(): Promise<IMotorcycle[]> {
    return this.model.find();
  }
  public async getById(_id: string): Promise<IMotorcycle | any> {
    return this.model.findOne({ _id });
  }
  public async updateId(
    _id: string,
    car: IMotorcycle,
  ): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw new Error('Invalid mongo id');
    return this.model.findByIdAndUpdate(
      { _id },
      { ...car } as UpdateQuery<IMotorcycle>,
      { new: true },
    );
  }
}
