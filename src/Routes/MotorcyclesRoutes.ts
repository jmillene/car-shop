import { Router } from 'express';

import MotorcyclesController from '../Controllers/MotorcyclesController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).create(),
);
routes.get(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).getAllMoto(),
);
routes.get(
  '/:id',
  (req, res, next) => new MotorcyclesController(req, res, next).gelById(),
);

export default routes;