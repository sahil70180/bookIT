import mongoose from "mongoose";
import Room from "../models/room";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/BookIT");

    await Room.deleteMany();
    console.log("Rooms are Deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are Added");

    process.exit();
  } catch (error) {
    console.log("Seeder Error : ", error);
    process.exit();
  }
};

seedRooms();
