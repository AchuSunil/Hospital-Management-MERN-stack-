import mongoose from "mongoose";

const doctorDetailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        qualification: {
            type: [String],
            required: true,
        },
        opTime: {
            day: {
                type: [String],
                required: true,
            },
            time: {
                type: [String],
                required: true,
            },
        },
        expertise: {
            type: [String],
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "department",
        },

        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const doctorDetails = mongoose.model("doctorDetails", doctorDetailsSchema);
export default doctorDetails;
