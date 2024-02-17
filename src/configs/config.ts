import {config} from "dotenv";
import * as process from "process";

config();
export const configs ={
    PORT:process.env.PORT,
    API_KEY:process.env.API_KEY
}