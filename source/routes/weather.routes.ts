import express from 'express';
import getWeather from '../controller/weather.controller';

const router = express.Router();

router.get('/weather', getWeather);

export default router;