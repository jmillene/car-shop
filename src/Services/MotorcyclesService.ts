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
  public async getAllMoto() {
    const motorcyclesODM = new MotorcyclesODM();
    const moto = await motorcyclesODM.find();
    const motoArray = moto.map((mot) => this.createCarDomain(mot));
    return motoArray;
  }
  public async getById(id: string) {
    try {
      const motorcyclesODM = new MotorcyclesODM();
      const moto = await motorcyclesODM.getById(id);
      
      return this.createCarDomain(moto);  
    } catch (error) {
      console.log(error);
    }
  }
  public async updateId(id: string, moto: IMotorcycle): Promise<Motorcycles | null> {
    const motoOdm = new MotorcyclesODM();
    const motos = await motoOdm.updateId(id, moto);
    if (motos) {
      return this.createCarDomain(motos);
    } 
    return motos;
  }
}