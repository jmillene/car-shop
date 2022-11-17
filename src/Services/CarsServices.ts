import Car from '../Domains/CarsDomains';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsModel';

export default class CarsService {
  constructor(private model = new CarODM()) {}
  idNot = (newCar : ICar) => new Car(newCar);

  create = async (obj: ICar) => {
    const newCar = await this.model.create(obj);
    return this.idNot(newCar);
  };
}
