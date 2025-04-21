import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import flModel from "../../models/freelancers/freelancers";

const router = express.Router();

// Get all freelancers
router.get("/getall", async (req: Request, res: Response): Promise<void> => {
    try {
        let getAllFL = await flModel.find({});
        res.status(StatusCodes.OK).json({ msg: getAllFL });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

// Get one freelancer
router.get("/getone/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        let paramsId = req.params.id;
        let getOneFL = await flModel.findById(paramsId);
        if (!getOneFL) {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Freelancer Not Found" });
            return;
        }
        res.status(StatusCodes.OK).json({ msg: getOneFL });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

// Edit One Freelancer
router.put("/editfl/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        let { flname, skillsMasteredAt, qualifications } = req.body;
        let paramsId = req.params.id;

        const updateFL = await flModel.findByIdAndUpdate(
            paramsId,
            { $set: { flname, skillsMasteredAt, qualifications } },
            { new: true }
        );

        if (!updateFL) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "Freelancer not found" });
            return;
        }

        res.status(StatusCodes.OK).json({ msg: "Freelancer Updated Successfully! 🙌✅" });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

// Delete one freelancer
router.delete("/deletefl/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        let paramsId = req.params.id;

        let deleteFL = await flModel.findByIdAndDelete(paramsId);
        if (!deleteFL) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "Freelancer Not Found, Cannot Delete" });
            return;
        }

        res.status(StatusCodes.OK).json({ msg: "Freelancer Deleted Successfully! 🥹💔" });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

router.delete("/deleteallfl", async (req: Request, res: Response): Promise<void> => {
    try {
        let deleteAllFL = await flModel.deleteMany({});
        
        if (!deleteAllFL) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "No freelancers found to delete 🙌" });
            return;
        }

        res.status(StatusCodes.OK).json({ msg: "All Freelancers Deleted Successfully! ✅" });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
        }
    }
});

export default router;