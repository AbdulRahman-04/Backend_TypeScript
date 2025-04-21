import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import config from "config";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
// import sendSMS from "../../utils/sendSMS";
import sendEmail from "../../utils/sendEmail";
import flModel from "../../models/freelancers/freelancers";
import crypto from "crypto";

const JWT_KEY: string = config.get<string>("JWT_KEY");
const URL: string = config.get<string>("URL");
const USER: string = config.get<string>("EMAIL");

const router = express.Router();

// Freelancer Signup
router.post("/flsignup", async (req: Request, res: Response): Promise<void> => {
    try {
        let { flname, email, password, phone, qualifications, skillsMasteredAt, age } = req.body;

        if (!flname || !email || !password || !phone || !qualifications || !skillsMasteredAt) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please Fill All Fields 🙌" });
            return;
        }

        let flExist = await flModel.findOne({ email });
        if (flExist) {
            res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: "Freelancer Already Exists, Please Login!" });
            return;
        }

        let hashPass = await bcrypt.hash(password, 10);

        let emailToken = Math.random().toString(36).substring(2)
        let phoneToken = Math.random().toString(36).substring(2)

        let newFreelancer = {
            flname,
            email,
            password: hashPass,
            phone,
            qualifications,
            skillsMasteredAt,
            age,
            flVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        };

        await flModel.create(newFreelancer);

        const emailData = {
            from: USER,
            to: email,
            subject: "Verification Link",
            text: `${URL}/api/fl/emailverify/${emailToken}`
        };

        await sendEmail(emailData);

        console.log(`${URL}/api/fl/emailverify/${emailToken}`);

        res.status(StatusCodes.OK).json({ msg: "Freelancer registered! Verify your email to continue 🙌" });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});


router.get("/emailverify/:token", async (req: Request, res: Response): Promise<void>=>{
    try {
        // take token from url
        let token = req.params.token

        // compare token with email token
        const fl = await flModel.findOne({"flVerifyToken.email": token})
        if(!fl){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Token💔"})
            return
         }

        // check if user hasn't clicked the link more than once 
        if(fl.flVerified.email === true){
            res.status(StatusCodes.OK).json({msg: "Fl Email Already Verified🙌"})
            return
        } 

        // make userVerfied true and token as null
        if(fl){
            fl.flVerified.email = true;
            fl.flVerifyToken.email = null;
            await fl.save()
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
//         let fl = await flModel.findOne({"flVerifyToken.phone": token});
//         if(!fl){
//          res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Token"})
//          return
//         }

//         // check if user hasn't clicked the link more than once 
//         if(fl.flVerified.phone === true){
//             res.status(StatusCodes.OK).json({msg: "fla Phone Already Verified"})
//             return
//         }

//         // make verified true and token null
//         if(fl){
//             fl.flVerified.phone = true;
//             fl.flVerifyToken.phone = null;

//             await fl.save()
//         }

//         res.status(StatusCodes.OK).json({msg: "User Phone Verified Successfully!✅"})
        
//     } catch (error) {
//         if(error instanceof Error){
//             console.log(error.message);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
//         }
//     }
// })


// Freelancer Login
router.post("/flsignin", async (req: Request, res: Response): Promise<void> => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please Fill All Fields 🚨" });
            return;
        }

        let freelancer = await flModel.findOne({ email });
        if (!freelancer) {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Email Not Found 💔" });
            return;
        }

        let passCheck = await bcrypt.compare(password, freelancer.password);
        if (!passCheck) {
            res.status(StatusCodes.CONFLICT).json({ msg: "Invalid Password 🚨" });
            return;
        }

        let token = jwt.sign({ id: freelancer._id }, JWT_KEY, { expiresIn: "5h" });

        res.status(StatusCodes.ACCEPTED).json({ msg: "Freelancer Logged In Successfully! 🙌", token });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

// Reset Password for Freelancer
router.post("/flresetpassword", async (req: Request, res: Response): Promise<void> => {
    try {
        let { email } = req.body;

        let freelancer = await flModel.findOne({ email });
        if (!freelancer) {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Email NOT Found 🚨" });
            return;
        }

        let newPass = crypto.randomBytes(8).toString("hex");
        let hashedPass = await bcrypt.hash(newPass, 10);

        freelancer.password = hashedPass;
        await freelancer.save();

        const emailData = {
            from: USER,
            to: email,
            subject: "Password Reset Request",
            text: `Your new password is: ${newPass}\nPlease change it after logging in.`
        };

        await sendEmail(emailData);

        res.status(StatusCodes.OK).json({ msg: "New password sent to your email 📩" });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

export default router