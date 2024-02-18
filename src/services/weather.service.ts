import {AxiosResponse} from "axios";

import {axiosService} from "./axios.service";
import {breakPoint} from "../constants/urls.constants"
import {configs} from "../configs/config";
import {IWeatherData} from "../interfaces/oneWeatherMap.interface";
import {IQueryParams} from "../interfaces/app.interface";

type IRes<T> = Promise<AxiosResponse<T>>

class WeatherService {

    public async getData(params: IQueryParams) {
        const {lon, lat, city} = params;
        if (lat && lon) {
            const {data} = await axiosService.get<IRes<IWeatherData>>(breakPoint,
                {params: {lat, lon, appid: `${configs.API_KEY}`, units: "metric"}});
            return data;
        } else if (city) {
            const {data} = await axiosService.get<IRes<IWeatherData>>(breakPoint,
                {params: {q: city, appid: `${configs.API_KEY}`, units: "metric"}});
            return data;
        }
    }
}

export const weatherService = new WeatherService();