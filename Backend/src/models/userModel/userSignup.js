import mongoose from "mongoose";

const userSignupDetailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique:true
        },

        phone: {
            type: String,
            required: true,
            
        },
        password: {
            type: String,
            required: true,
        },

        isBlocked: {
            type: Boolean,
            default: false,
            required: true,
        },
        // userProfileInfo: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     // required:true,
        //     ref: "userProfileInfo",
        // },
    },
    {
        timestamps: true,
    }
);

const userSignupDetails = mongoose.model("userSignupDetails", userSignupDetailsSchema);
export default userSignupDetails;
