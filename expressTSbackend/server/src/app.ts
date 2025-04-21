import express, {Request, Response, Application} from "express"
import { StatusCodes } from "http-status-codes";
import config from "config"
// DATABASE IMPORT 
import "./utils/dbConnect"


const app: Application = express();
const PORT: string = config.get<string>("PORT");

app.use(express.json())

app.get("/", (req: Request, res: Response)=>{
    try {
        res.status(StatusCodes.OK).json({msg: "Hello world"})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})


app.listen(Number(PORT), ()=>{
    console.log(`your web app is running live at port ${PORT}`);
    
})