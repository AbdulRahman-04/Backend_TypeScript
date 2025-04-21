import mongoose, { mongo } from "mongoose";
import config from "config"

const DB_URL: string  = config.get<string>("DB_URL")

async function dbConnect() {

    try {

        await mongoose.connect(DB_URL);
        console.log("DATABASE CONNECTED SUCCESSFULLY!✅");
        
        
    } catch (error) {
        console.log(error);
        
    }
    
}

dbConnect()