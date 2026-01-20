import express from 'express';
import {errorHandler} from './middlewares/errorhandling';



const app = express();

app.use(express.json());



// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
