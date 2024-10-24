import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    let DB_URI: string = "";
    if (process.env.NODE_ENV === "development") {
      DB_URI = process.env.DB_LOCAL_URI!;
    }
    if (process.env.NODE_ENV === "production") {
      DB_URI = process.env.DB_PROD_URI!;
    }

    await mongoose.connect(DB_URI).then((con) => {
      console.log("MONGO DB is connected");
    });
  } catch (error) {
    console.log("===============");
    console.log("DB Connection Error");
    console.log("================");
  }
};

export default dbConnect;
