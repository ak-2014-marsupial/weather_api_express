import axios from "axios";
import {baseURL} from "../constants/urls.constants";

const axiosService=axios.create({baseURL});

export {axiosService};