import Car from '../Domains/CarsDomains';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsModel';

export default class CarsService {
  private carODM : CarODM;
  constructor() {
    this.carODM = new CarODM();
  }
  private createCarDomain(car: ICar) : Car {
    return new Car(car);
  }
  public async create(newCar: ICar): Promise<Car> {
    const car = await this.carODM.create(newCar);
    return this.createCarDomain(car);
  }
}
