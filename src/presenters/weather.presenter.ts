import {IWeatherData} from "../interfaces/oneWeatherMap.interface";

export class WeatherPresenter {
    public static weatherToResponse(data: IWeatherData | any) {
        return {
            name:data.name,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            lat:data.coord.lat,
            lon:data.coord.lon,
            country:data.sys.country
        }
    }
}