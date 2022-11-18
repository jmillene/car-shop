import Motorcycles from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesModel';

export default class MotorcyclesService {
  private motorcyclesODM : MotorcyclesODM ;
  constructor() {
    this.motorcyclesODM = new MotorcyclesODM();
  }
  private createCarDomain(moto: IMotorcycle) : Motorcycles {
    return new Motorcycles(moto);
  }
  public async create(newMoto: IMotorcycle) {
    const car = await this.motorcyclesODM.create(newMoto);
    return this.createCarDomain(car);
  }
}