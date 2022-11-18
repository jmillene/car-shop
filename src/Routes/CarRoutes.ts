import { Router } from 'express';

import CarController from '../Controllers/CarsControllers';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).create(),
);
routes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);
routes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).gelById(),
);
export default routes;