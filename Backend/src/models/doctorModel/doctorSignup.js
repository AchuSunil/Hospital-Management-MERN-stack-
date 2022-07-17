import mongoose from "mongoose";

const doctorSignupDetailsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },

        department: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "departmentDetails",
            type: String,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const doctorSignupDetails = mongoose.model("doctorSignupDetails", doctorSignupDetailsSchema);
export default doctorSignupDetails;
