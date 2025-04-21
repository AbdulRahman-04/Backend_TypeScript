import express , {Request, Response , Application} from "express"
import { StatusCodes } from "http-status-codes";
import config from "config"
// DB IMPORT
import "./utils/dbConnect"
// private api's
import userRouter from "./controllers/private/users"
import flRouter from "./controllers/private/fl"
// MIDDLEWARE
import authMiddleware from "./middleware/auth";
// Public api's
import userPublic from "./controllers/public/user"
import flPublic from "./controllers/public/fl"


const app: Application = express();
const PORT: string = config.get<string>("PORT");

app.use(express.json())

app.get("/", (req: Request, res: Response)=>{
    try {
        res.status(StatusCodes.OK).json({msg: "HELLO WORLD✨"})
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
})

// public api's
app.use("/api/user", userPublic)
app.use("/api/fl", flPublic)


// private api's with middleware
app.use("/api/private/users", authMiddleware, userRouter)
app.use("/api/private/fls", authMiddleware, flRouter)

app.listen(Number(PORT), ()=>{
    console.log(`YOUR SERVER IS RUNNING AT ${PORT}`);
})