import mongoose from "mongoose";

const userProfileInfoSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        userAddress: {
            address: {
                type: String,
                required: true,
            },

            streetAddress: {
                type: String,
            },
            country: {
                type: String,
                required: true,
            },

            state: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        DOB: {
            type: Date,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "userSignupDetails",
        },
    },
    {
        timestamps: true,
    }
);

const userProfileInfo = mongoose.model("userProfileInfo", userProfileInfoSchema);
export default userProfileInfo;
