import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const url = process.env.WEATHER_REQUEST_URL;



try {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${url}?latitude=${52.52}&longitude=${13.41}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    axios(config).then((response: AxiosResponse) => {
        console.log(response.data);
    }).catch((error: AxiosError) => {
        console.log(error);
    });


} catch (error: any) {
    console.log(error);
}





