import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(motorcycles: IMotorcycle) {
    this.id = motorcycles.id;
    this.model = motorcycles.model;
    this.year = motorcycles.year;
    this.color = motorcycles.color;
    this.status = motorcycles.status || false;
    this.buyValue = motorcycles.buyValue;
    this.category = motorcycles.category;
    this.engineCapacity = motorcycles.engineCapacity;
  }
  public getId() {
    return this.id;
  }
  public setId(id: string) {
    this.id = id;
  }
  public getModel() {
    return this.model;
  }
  public setModel(model: string) {
    this.model = model;
  }
  public getYear() {
    return this.year;
  }
  public setYear(year: number) {
    this.year = year;
  }
  public getColor() {
    return this.color;
  }
  public setColor(color: string) {
    this.color = color;
  }
  public getStatus() {
    return this.status;
  }
  public setStatus(status: boolean) {
    this.status = status;
  }
  public getBuyValue() {
    return this.buyValue;
  }
  public getCategory() {
    return this.category;
  }
  public setCategory(category: 'Street' | 'Custom' | 'Trail') {
    this.category = category;
  }
  public getEngineCapacity() {
    return this.engineCapacity;
  }
  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
}
