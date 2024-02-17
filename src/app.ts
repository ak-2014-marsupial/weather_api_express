import express, {Request,Response,NextFunction} from "express";
import {configs} from "./configs/config";
import {ApiError} from "./errors/api.error";
import {weatherRouter} from "./routers/weather.router";

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/weather",weatherRouter);

app.use("*",(err:ApiError,req:Request,res:Response,next:NextFunction)=>{
    return res.status(err?.status || 500).json({message:err?.message,status:err?.status})
})

const port = configs.PORT;

app.listen(port,async ()=>{
    try{
        console.log(`Server has started on port ${port}`);
    }catch(err){
        console.log(err.message);
    }
})