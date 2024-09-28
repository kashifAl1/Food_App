import userModel from '../models/user.model.js'


// add to cart

const addToCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body
      // console.log(userId, "userID")
      let userData = await userModel.findById(userId)
      let cartData = await userData.cartData;
      if (!cartData[itemId]) {
         cartData[itemId] = 1
      } else {
         cartData[itemId] += 1
      }
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.status(200).json({ success: true, message: "Added To Cart " })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: "Error" })
   }
}


// remove  itmes from user cart  

const removeFromCart = async (req, res) => {
   const { userId, itemId } = req.body
   try {
      const userData = await userModel.findById(userId)
      const cartData = await userData.cartData;
      if (cartData[itemId] > 0) {
         cartData[itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(userId, { cartData })
      return res.status(200).json({ success: true, message: "removed from cart " })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "Error" })
   }
}


// gfetch  user cart data 

const getCart = async (req, res) => {
   const { userId, itemId } = req.body;
   try {
      const userData = await userModel.findById(userId);
      const cartData = await userData.cartData;
      return res.status(200).json({ success: true, cartData })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: "Error" })
   }
}



export { addToCart, removeFromCart, getCart }