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
const searchQuery = 'New York City.json';

try {

    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${url}?latitude=${52.52}&longitude=${13.41}&current_weather=${true}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const geocodeConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${geocoadingURL}/${endpoint}/${searchQuery}?access_token=${process.env.GEOCOADING_ACCESSTOKEN}&limit=1`,
        headers: {
            'Content-Type': 'application/json',
        },
    }


    axios(geocodeConfig).then((response: AxiosResponse) => {
        console.log(response.data.features[0].center);
        // here latitude comes from index 1
        //  and longitude comes from index 0
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];

        axios(config).then((response: AxiosResponse) => {
            console.log(response.data.current_weather);
        }).catch((error: AxiosError) => {
            console.log(error);
        });

    }).catch((error: AxiosError) => {
        console.log(error);
    });


} catch (error: any) {
    console.log(error);
}





