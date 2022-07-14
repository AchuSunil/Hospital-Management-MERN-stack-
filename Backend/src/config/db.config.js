import mongoose from "mongoose";

//** To Handle Error on initial connection used Try/catch **//

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error;
    }
};

//** To Handle Error after initial connection should listen for error events on the connection **//
//** You should listen to the disconnected event to report when Mongoose is disconnected from MongoDB **//

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
});

export default connect;
