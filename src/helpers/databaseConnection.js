import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connection with datbase successful");
    });
    connection.on("error", () => {
      throw new Error("Connection with database failed");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(0);
  }
};

export default connectDB;
