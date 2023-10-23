import mongoose from "mongoose";

let mongoUrl: string;
if (process.env.MONGO) {
  mongoUrl = process.env.MONGO;
} else {
  throw new Error("WHATEVER environment variable is not set");
}

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
