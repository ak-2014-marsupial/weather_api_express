import {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {IQueryParams} from "../interfaces/app.interface";
import {QueryValidator} from "../validators/query.validator";

class QueryMiddleware {

    public isValid(req: Request, res: Response, next: NextFunction) {

        try {
            const {city, lat, lon} = req.query as IQueryParams;

            if (!city && !lat && !lon) {
                throw new ApiError("No parameters specified", 400);
            }

            if(!city &&((lon && !lat) || (!lon && lat))){
                throw new ApiError("One of the parameters Lat or Lon is missing",422)
            }

            const {error}= QueryValidator.query.validate(req.query as IQueryParams);
            if(error){
                throw new ApiError(error.message,422)
            }
            next();

        } catch (e) {
            next(e)
        }
    }
}

export const queryMiddleware = new QueryMiddleware();