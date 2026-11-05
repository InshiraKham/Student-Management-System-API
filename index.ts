import express, { type Application, type Request, type Response } from 'express';
import studentRoutes from './student/student.routes.js';

const app: Application = express();

app.use(express.json());

app.use('/students', studentRoutes);

app.listen(3000, () => {
    console.log('Server is Running on Port 3000');
});