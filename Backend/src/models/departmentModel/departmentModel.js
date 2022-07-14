import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
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

const departmentDetails = mongoose.model("departmentDetails", departmentSchema);
export default departmentDetails;
