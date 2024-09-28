import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

   const url = "http://localhost:4000"

   let [cartItems, SetCartItem] = useState({})
   const [token, setToken] = useState("")
   const [food_list, setFoodlist] = useState([])

   const addToCart = async (itemId) => {
      if (!cartItems[itemId]) {
         SetCartItem((preve) => ({ ...preve, [itemId]: 1 }))
      } else {
         SetCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      }
      if (token) {
         await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
      }
   }

   const removeFromCart = async (itemId) => {
      SetCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
      if (token) {
         await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
      }
   }


   const getTotalCartAmount = () => {
      let totoalAmount = 0

      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            totoalAmount += itemInfo.price * cartItems[item];
         }
      };
      return totoalAmount;
   }

   const fetchFoodlist = async () => {
      const response = await axios.get(url + '/api/food/list')
      setFoodlist(response.data.data)
   }

   const loadCartdata = async (token) => {
      const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } })
      SetCartItem(response.data.cartData)
   }

   useEffect(() => {
      async function loadData() {
         await fetchFoodlist() 
         if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            await loadCartdata(localStorage.getItem('token'))
         }
      }
      loadData()
   }, [])
   const contextValue = {
      food_list,
      addToCart,
      removeFromCart,
      cartItems,
      SetCartItem,
      getTotalCartAmount,
      url,
      token,
      setToken
   }

   return (
      < StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   )
}

export default StoreContextProvider;