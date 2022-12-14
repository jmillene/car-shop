import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsModel';

export default class CarsService {
  private carODM : CarODM;
  constructor() {
    this.carODM = new CarODM();
  }
  private createCarDomain(car: ICar) : Car {
    return new Car(car);
    // transforma uma chave em um objeto;
  }
  public async create(newCar: ICar): Promise<Car> {
    const car = await this.carODM.create(newCar);
    return this.createCarDomain(car);
  }
  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const carArray = cars.map((car) => this.createCarDomain(car));
    return carArray;
  }
  public async getById(id: string) {
    try {
      const carODM = new CarODM();
      const cars = await carODM.getById(id);
      return this.createCarDomain(cars);  
    } catch (error) {
      console.log(error);
    }
  }
  public async updateId(id: string, car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const cars = await carODM.updateId(id, car);
    
    if (cars) {
      return this.createCarDomain(cars);
    } 
    return cars;
  }
}