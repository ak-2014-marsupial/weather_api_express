import {Router} from "express";
import {weatherController} from "../controllers/weather.controller";
import {queryMiddleware} from "../middlewares/query.middleware";


const router = Router();

router.get("/",
    queryMiddleware.isValid,
    weatherController.getData);


export const weatherRouter = router;