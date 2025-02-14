import { Schema } from "mongoose";
const meetingSchema = new Schema(
    {
        userid:{
            type:String
        },
        meetingid:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now,
            required:true
        }
    }
)
const Meeting=mongoose.model('Meeting',meetingSchema);
export {Meeting};
