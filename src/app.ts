import express from 'express';
import errorhandling = require('./middlewares/errorhandling');



const app = express();

app.use(express.json());



// Global error handler (should be after routes)
app.use(errorhandling.errorHandler);

export default app;
