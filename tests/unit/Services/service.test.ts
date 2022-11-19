import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarsServices';
import Car from '../../../src/Domains/Car';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcyclesService from '../../../src/Services/MotorcyclesService';

const Honda = 'Honda Cb 600f Hornet';
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
    const car: ICar = {
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
    const car: ICar = {
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
      
      model: Honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput: Motorcycle = new Motorcycle(motoInput);
    sinon.stub(Model, 'create').resolves(motoInput);
    const service = new MotorcyclesService();
    const result = await service.create(motoInput);
    expect(result).to.be.deep.equal(motoOutput);
  });
  it('Deverá retorna um um objeto com um moto', async function () {
    const moto: IMotorcycle = {
      id: '6378e80c7e4d4888de401d88',
      model: Honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findOne').resolves(moto);
    const service = new MotorcyclesService();
    const motos = await service.getById('6378e80c7e4d4888de401d88');
    expect(motos).to.be.deep.equal(moto);
  });
  it('Deverá retorna um um informar que o moto  não existe', async function () {
    const moto: IMotorcycle = {
      id: '6378e80c7e4d4888de401d88',
      model: Honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    };
    try {
      sinon.stub(Model, 'findOne').resolves(moto);
      const service = new MotorcyclesService();
      await service.getById(moto.id as string);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
  it('Deverá retorna uma mensagem de erro para o id inválido', async function () {
    const moto: IMotorcycle = {
      id: '1',
      model: Honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.0,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'create').resolves({});
    try {
      const service = new MotorcyclesService();
      await service.create(moto);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
  it('Deverá retorna uma lista de carros', async function () {
    const cars: ICar[] = [
      {
        id: '6378eb0e7e4d4888de401d8a',
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12,
        doorsQty: 2,
        seatsQty: 5,
      },
      {
        id: '6378eb297e4d4888de401d8e',
        model: 'Civic',
        year: 1982,
        color: 'Red',
        status: true,
        buyValue: 16,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(cars);

    const service = new CarsService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(cars);
  });
});
