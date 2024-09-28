import mongoose from "mongoose";

export const dbconnect = async () => {
   await mongoose.connect("mongodb+srv://Kashif:Abcd12345@cluster0.d114b.mongodb.net/food-del")
   .then(() => {
      console.log("DB Connected Successfully")
   })
}