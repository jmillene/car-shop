import { Router } from 'express';

import MotorcyclesController from '../Controllers/MotorcyclesController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new MotorcyclesController(req, res, next).create(),
);

export default routes;