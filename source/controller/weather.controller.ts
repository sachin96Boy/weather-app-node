import {
    Request,
    Response,
    NextFunction
} from 'express';
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.WEATHER_REQUEST_URL;
const geocoadingURL = process.env.FORWARD_GEOCOADING_REQUEST_URL;
const endpoint = 'mapbox.places';


const getWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const searchPrase = req.query.search;
        const searchQuery = `${searchPrase}.json`;
        const geocodeConfig: AxiosRequestConfig = {
            method: 'get',
            url: `${geocoadingURL}/${endpoint}/${searchQuery}?access_token=${process.env.GEOCOADING_ACCESSTOKEN}&limit=1`,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios(geocodeConfig).then(async (response: AxiosResponse) => {
            // here latitude comes from index 1
            //  and longitude comes from index 0
            const latitude = response.data.features[0].center[1];
            const longitude = response.data.features[0].center[0];

            const config: AxiosRequestConfig = {
                method: 'get',
                url: `${url}?latitude=${latitude}&longitude=${longitude}&current_weather=${true}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            await axios(config).then((response: AxiosResponse) => {
                res.status(200).json({
                    message: 'Weather data fetched successfully',
                    data: response.data.current_weather
                });
            }).catch((error: AxiosError) => {
                console.log(error);
            });

        }).catch((error: AxiosError) => {
            console.log(error);
        });


    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}

export default getWeather;
