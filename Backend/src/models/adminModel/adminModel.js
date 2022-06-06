import mongoose from "mongoose";

const adminSignupDetailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },

        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const adminSignupDetails = mongoose.model("adminSignupDetails", adminSignupDetailsSchema);
export default adminSignupDetails;
