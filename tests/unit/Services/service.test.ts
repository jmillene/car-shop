import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarsServices';
import Car from '../../../src/Domains/Car';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcyclesService from '../../../src/Services/MotorcyclesService';

describe('Deveria cadastrar um carro', function () {
  it('Deveria cadastrar um carro com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(carInput);
    sinon.stub(Model, 'create').resolves(carInput);
    const service = new CarsService();
    const result = await service.create(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
  it('Deveria lançar uma exceção quando a id é inválida', async function () {
    const carInput: ICar = {
      id: '1',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
  
    sinon.stub(Model, 'create').resolves({});
    try {
      const service = new CarsService();
      await service.create(carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
      
  afterEach(function () {
    sinon.restore();
  }); 
  it('Deverá retorna um um objeto com um carro', async function () {
    const car : ICar = {
      id: '6377b7ae5bf3457baf621986',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves(car);
    const service = new CarsService();
    const cars = await service.getById('6377b7ae5bf3457baf621986');
    expect(cars).to.be.deep.equal(car);
  }); 
  it('Deverá retorna um um informar que o carro não existe', async function () {
    const car : ICar = {
      id: '6377b7ae5bf3457baf621986',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    try {
      sinon.stub(Model, 'findOne').resolves(car);
      const service = new CarsService();
      await service.getById(car.id as string);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
  it('Deveria cadastrar um moto com SUCESSO', async function () {
    const motoInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput: Motorcycle = new Motorcycle(motoInput);
    sinon.stub(Model, 'create').resolves(motoInput);
    const service = new MotorcyclesService();
    const result = await service.create(motoInput);
    expect(result).to.be.deep.equal(motoOutput);
  });
});
