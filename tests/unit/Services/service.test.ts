import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsService from '../../../src/Services/CarsServices';
import Car from '../../../src/Domains/Car';

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
});
