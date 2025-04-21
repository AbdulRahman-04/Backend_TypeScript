import express , {Request, Response} from "express"
import { StatusCodes } from "http-status-codes"
import userModel from "../../models/users/users"


const router = express.Router()

// Get all users
router.get("/getall", async(req: Request, res: Response): Promise<void>=>{
    try {
        let getall = await userModel.find({})
        res.status(StatusCodes.OK).json({msg: getall})
        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
            
        }
    }
})

// Get one user
router.get("/getone/:id", async (req: Request, res: Response): Promise<void>=>{
    try {
        // take id from params
        let paramsId = req.params.id

        let getOne = await userModel.findById(paramsId)
        if(!getOne){
            res.status(StatusCodes.NOT_FOUND).json({msg: "User Not Found"})
            return
        }

        res.status(StatusCodes.OK).json({msg: getOne})
        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
            
        }
    }
})

// Edit One User
router.put("/edituser/:id", async(req: Request, res: Response):Promise<void>=>{
    try {
        // take edit input from req.body
        let {username, serviceLookingFor, organisationName}= req.body;

        // search user in db
        let paramsId = req.params.id

        // search and update
        const updateUser = await userModel.findByIdAndUpdate(paramsId, {$set: {username, serviceLookingFor, organisationName}}, {new: true})

        if(!updateUser){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "User not found"})
            return
        }

        res.status(StatusCodes.OK).json({msg: "User Updated Successfully!🙌✅"})
        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
            
        }
    }
})

// delete one user
router.delete("/deleteuser/:id", async(req: Request, res: Response): Promise<void>=>{
    try {
        // take id from param 
        let paramsId = req.params.id

        // find user and delete 
        let deleteUser = await userModel.findByIdAndDelete(paramsId)
        if(!deleteUser){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Can't Delete One User, Not Found in DB"})
            return
        }

        res.status(StatusCodes.OK).json({msg: "User Deleted Successfully!🥹💔"})
        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
            
        }
    }
})


// Delete all users
router.delete("/deleteall", async (req: Request, res: Response):Promise<void>=>{
    try {

        let deleteall = await userModel.deleteMany({})

          if (!deleteall) {
                    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No users found to delete 🙌" });
                    return;
                }

        res.status(StatusCodes.OK).json({msg: "All Users Deleted Successfully!✅"})
        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
            
        }
    }
}) 

export default router;