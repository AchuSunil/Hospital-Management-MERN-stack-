import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema(
    {
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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "userSignupDetails",
        },
        userProfileId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "userProfileInfo",
        },
    },
    {
        timestamps: true,
    }
);

const userAddress = mongoose.model("userAddress", userAddressSchema);
export default userAddress;
