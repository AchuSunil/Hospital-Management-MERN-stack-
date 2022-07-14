import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true
        },

    },
    {
        timestamps: true,
    }
);

const bannerDetails = mongoose.model("bannerDetails", bannerSchema);
export default bannerDetails;
