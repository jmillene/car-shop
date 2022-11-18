import express from 'express';
import CarRouter from './Routes';

const app = express();
app.use(express.json());
app.use('/cars', CarRouter.CarRouter);
app.use('/motorcycles', CarRouter.MotorcyclesRoutes);
export default app;
