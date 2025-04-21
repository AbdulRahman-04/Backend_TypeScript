import express, {Request, Response , Application, text} from "express"
import bcrypt from "bcrypt"
import config from "config"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import sendEmail from "../../utils/sendEmail"
// import sendSMS from "../../utils/sendSMS"
import userModel from "../../models/users/users"
import crypto from "crypto"


const JWT_KEY: string = config.get<string>("JWT_KEY");
const URL: string = config.get<string>("URL");
const USER: string = config.get<string>("EMAIL")

const router = express.Router()

router.post("/usersignup", async (req: Request, res: Response): Promise<void>=>{
    try {
        // take input from user 
        let {username, email, password, phone, serviceLookingFor, organisationName} = req.body;

        // check if any of'em i missing 
        if(!username || !email || !password || !phone || !serviceLookingFor || !organisationName){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Please Fill All Fields🙌"});
            return
        }

        //check if user already exists in db
        let userExist = await userModel.findOne({email})
        if(userExist){
            res.status(StatusCodes.NOT_ACCEPTABLE).json({msg: "User Already Exists, please go and login"})
            return
        }

        // hash the pass 
        let hashPass = await bcrypt.hash(password, 10);

        // generate random token for email and phone verify
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken = Math.random().toString(36).substring(2);

        // create new obj and push all the userInfo inside it 
        let newUser = {
            username,
            email,
            password: hashPass,
            phone,
            serviceLookingFor,
            organisationName,
            userVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        }

        // push into db 
        await userModel.create(newUser)

         // email verification link
         const emailData = {
            from: USER,
            to: email,
            subject: "Verification Link",
             text: `${URL}/api/user/emailverify/${emailToken}`
        }

         await sendEmail(emailData)


          // 8. Verification ke liye SMS data banate hain aur sendSMS function call karte hain.
        // const smsData = {
        //     body: `📲 Team Todo: Dear user, verify your phone by clicking the link: ${URL}/api/public/phoneverify/${phoneToken}. 
        //     If you didn't request this, ignore the message.`,
        //     to: phone
        // };
        
        // await sendSMS(smsData);


        console.log(`${URL}/api/user/emailverify/${emailToken}`);
        // console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        
        res.status(200).json({msg: "You'll be registered as our new user, once u verify your email🙌"})

        
    } catch (error) {
       if(error instanceof Error){
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
       }
    }
})

router.get("/emailverify/:token", async (req: Request, res: Response): Promise<void>=>{
    try {
        // take token from url
        let token = req.params.token

        // compare token with email token
        const user = await userModel.findOne({"userVerifyToken.email": token})
        if(!user){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Token💔"})
            return
         }

        // check if user hasn't clicked the link more than once 
        if(user.userVerified.email === true){
            res.status(StatusCodes.OK).json({msg: "User Email Already Verified🙌"})
            return
        } 

        // make userVerfied true and token as null
        if(user){
            user.userVerified.email = true;
            user.userVerifyToken.email = null;
            await user.save()
        }

        res.status(StatusCodes.OK).json({msg: "Email Verified Successfully!✅"})
        
    } catch (error) {
       if(error instanceof Error){
        console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
       }
    }
})

// router.get("/phoneverify/:token", async (req: Request, res: Response): Promise<void>=>{
//     try {
//         // take token from url
//         let token = req.params.token

//         // compare token 
//         let user = await userModel.findOne({"userVerifyToken.phone": token});
//         if(!user){
//          res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Token"})
//          return
//         }

//         // check if user hasn't clicked the link more than once 
//         if(user.userVerified.phone === true){
//             res.status(StatusCodes.OK).json({msg: "User Phone Already Verified"})
//             return
//         }

//         // make verified true and token null
//         if(user){
//             user.userVerified.phone = true;
//             user.userVerifyToken.phone = null;

//             await user.save()
//         }

//         res.status(StatusCodes.OK).json({msg: "User Phone Verified Successfully!✅"})
        
//     } catch (error) {
//         if(error instanceof Error){
//             console.log(error.message);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
//         }
//     }
// })

router.post("/usersignin", async (req: Request, res: Response): Promise<void>=>{
    try {
        // take email and password from user
        let {email, password} = req.body;

        if(!email || !password){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Please Fill All Fields🚨"})
            return
        }

        // check if user email exists in db
        let user = await userModel.findOne({email})
        if(!user){
            res.status(StatusCodes.NOT_FOUND).json({msg: "Email Not Found💔"})
            return
        }

        // check the password
        let passCheck = await bcrypt.compare(password, user.password);
        if(!passCheck){
            res.status(StatusCodes.CONFLICT).json({msg: "Invalid Password🚨"})
            return
        }

        // jwt token generate
        let token = jwt.sign({id: user._id}, JWT_KEY, {expiresIn: "5h"})

        res.status(StatusCodes.ACCEPTED).json({msg: "User Logged In Successfully!🙌🥹", token})

        
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
        }
    }
})



router.post("/resetpassword", async (req: Request, res: Response): Promise<void> => {
    try {
        let { email } = req.body;

        let checkUser = await userModel.findOne({ email });
        if (!checkUser) {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Email NOT Found🚨" });
            return;
        }

       // Generate and hash the new password BEFORE assigning it
        let newPass = crypto.randomBytes(8).toString("hex");
        let hashedPass = await bcrypt.hash(newPass, 10);

//     Assign the hashed password directly
       checkUser.password = hashedPass;  
       await checkUser.save();
        

        // Prepare email data and send
        const emailData = {
            from: USER,
            to: email,
            subject: "Password Reset Request",
            text: `Your new password is: ${newPass}\nPlease change it after logging in.`
        };

       await sendEmail(emailData);

        res.status(StatusCodes.OK).json({ msg: "New password sent to your email 📩" });

    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
        }
    }
});

export default router