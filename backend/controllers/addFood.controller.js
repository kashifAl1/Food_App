import foodModel from "../models/food.model.js"
import fs from "fs"



// Add Food item

const addFood = async (req, res) => {
   let image_filename = `${req.file.filename}`
   let { name, description, price, image, category } = req.body
   const food = new foodModel({
      name: name, description: description, price: price, category: category, image: image_filename
   })
   try {
      await food.save()
      return res.status(200).json({ success: true, message: "Food Added" })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "Error" })
   }
};


// List Food

const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({})
      return res.status(200).json({ success: true, length: foods.length, data: foods })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "Error" })
   }
};

// Remove Food 


const removeFood = async (req, res) => {
   try {
      let { id } = req.body
      const food = await foodModel.findById(id);
      fs.unlink(`uploads/${food.image}`, () => { })
      await foodModel.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Food Removed" })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "Error" })
   }
}






export { addFood, listFood, removeFood }