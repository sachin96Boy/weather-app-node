import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes';

const app: Express = express();

dotenv.config();

app.use(cors());
/** Logging */
app.use(morgan('dev'));
/** Takes care of JSON data */
app.use(express.json());
/** Parse the request */
app.use(express.urlencoded({ extended: false }));

app.use('/', weatherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

