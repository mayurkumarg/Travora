const mongoose=require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");
const Review = require("../models/reviewSchema.js");

main()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Database connection failed!", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travora");
}

const initDB=async ()=>{
   try {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68b85972c45a4f41bb9514af"}))
    await Listing.insertMany(initData.data);
    console.log("Data initialized ");
    // initData.data=initData.data.map((obj)=>({...obj}))
  } catch (err) {
    console.log("Error initializing data ", err);
  } finally {
    mongoose.connection.close(); 
  }
}

initDB();