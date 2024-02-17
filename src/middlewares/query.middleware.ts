import {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {IQueryParams} from "../interfaces/app.interface";

class QueryMiddleware {

    public isValid(req: Request, res: Response, next: NextFunction) {

        try {
            const {city, lat, lon} = req.query as IQueryParams;
            if (!city && !lat && !lon) {
                throw new ApiError("No parameters specified", 400);
            }

            if (!isCity(city) && (!lat || !lon)) {
                throw new ApiError("Wrong city param", 422)
            } else {
                if (!isCoordinate(lon) && !city) {
                    throw new ApiError("wrong lon param", 422)
                }
                if (!isCoordinate(lat) && !city) {
                    throw new ApiError("wrong lat param", 422)
                }
            }

            next();

            function isCoordinate(coordinate: string): boolean {
                const val = parseFloat(coordinate);
                if (!isNaN(val) && val <= 90 && val >= -90) {
                    return true;
                } else {
                    return false;
                }
            }

            function isCity(city: string): boolean {
                if (!city) {
                    return false;
                }
                const cityRegex = /^[A-Za-z\s]+$/;
                if (cityRegex.test(city.trim()) && city.trim().length > 2) {
                    return true;
                } else {
                    return false;
                }
            }


        } catch (e) {
            next(e)
        }
    }
}

export const queryMiddleware = new QueryMiddleware();