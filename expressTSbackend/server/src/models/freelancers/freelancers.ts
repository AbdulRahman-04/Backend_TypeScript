import mongoose, {Schema, Document, Model} from "mongoose";

interface IFreelancer extends Document{
    flname: string,
    email: string,
    password: string,
    age: number,
    phone: string,
    qualifications: string,
    skillsMasteredAt: string,
    experience: string,
    profilePhoto: string,
    portfolio?: string,
    flVerified: {
        email: boolean | null,
        phone: boolean | null
    },
    flVerifyToken: {
        email: string | null,
        phone: string | null
    }
}

const flSchema = new Schema<IFreelancer>({
    flname: {
       type: String,
       required: true,
       maxlength: 50,
       minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        require: true
    },
    age:{
        type: Number
    },
    phone: {
        type:  String,
        require: true
    },
    qualifications: {
        type: String,
        require: true
    },
    skillsMasteredAt: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String
    },
    flVerified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    flVerifyToken: {
        email: {
            type: String 
        },
        phone: {
            type: String
        }
    }
})

const flModel : Model<IFreelancer> = mongoose.model<IFreelancer>("Freelancers", flSchema, "Freelancers")

export default flModel;