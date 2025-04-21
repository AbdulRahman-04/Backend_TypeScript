import mongoose, {Schema, Document, Model} from "mongoose";

// users interface
interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    phone: string,
    serviceLookingFor: string,
    organisationName?: string,
    userVerified: {
        email: boolean | null,
        phone: boolean | null
    },
    userVerifyToken: {
        email: string | null,
        phone: string | null
    }
}

const userSchema = new Schema<IUser>({
  
    username: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    serviceLookingFor: {
        type: String,
        required: true
    },
    organisationName: {
        type: String,
    },
    userVerified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    userVerifyToken: {
        email:{
            type: String
        },
        phone: {
            type: String
        }
    }

})

const userModel: Model<IUser> = mongoose.model<IUser>("Users", userSchema, "Users")

export default userModel;