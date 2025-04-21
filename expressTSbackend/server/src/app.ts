import express , {Request, Response , Application} from "express"
import { StatusCodes } from "http-status-codes";
import config from "config"
// DB IMPORT
import "./utils/dbConnect"


const app: Application = express();
const PORT: string = config.get<string>("PORT");

app.get("/", (req: Request, res: Response)=>{
    try {
        res.status(StatusCodes.OK).json({msg: "HELLO WORLD✨"})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
})

app.listen(Number(PORT), ()=>{
    console.log(`YOUR SERVER IS RUNNING AT ${PORT}`);
})