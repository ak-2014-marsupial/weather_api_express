import joi from "joi";
import {regexConstants} from "../constants/regex.constants";

export class QueryValidator{
    public static query = joi.object({
        city: joi.string().lowercase().regex(regexConstants.ISCITY).messages({
            "string.base": "The name of the city must consist only of letters",
        }),
        lat: joi.string().regex(regexConstants.LAT).messages({
            "string.base": "Invalid Lat value",
        }),
        lon: joi.string().regex(regexConstants.LON).messages({
            "string.base": "Invalid Lon value",
        }),
    });
}