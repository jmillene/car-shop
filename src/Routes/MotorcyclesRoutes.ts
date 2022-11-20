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
routes.put(
  '/:id',
  (req, res, next) => new MotorcyclesController(req, res, next).updateId(),
);

export default routes;