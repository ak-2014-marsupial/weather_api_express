import {Request, Response, NextFunction} from "express";
import {weatherService} from "../services/weather.service";
import {IQueryParams} from "../interfaces/app.interface";
import {WeatherPresenter} from "../presenters/weather.presenter";

class WeatherController {
    public async getData(req: Request, res: Response, next: NextFunction) {

        try {
            const weatherData = await weatherService.getData(req.query as IQueryParams);
            return res.json({data:WeatherPresenter.weatherToResponse(weatherData) })
        } catch (e) {
            next(e)
        }
    }
}

export const weatherController = new WeatherController();