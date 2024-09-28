import React, { useContext } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

function FoodItem({ id, image, name, description, price }) {
   let { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext)
   //  console.log("add cart",addToCart()) 
   return (
      <div className='food-item'>
         <div className="food-item-container">
            <img className='food-item-img' src={url + "/images/" + image} alt="" />
            {!cartItems[id]
               ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
               : <div className='food-item-counter'>
                  <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                  <p>{cartItems[id]}</p>
                  <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
               </ div>

            }
         </div>
         <div className="food-item-info">
            <div className="food-item-name-rating">
               <p>{name}</p>
               <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-decs'>{description}</p>
            <p className='food-item-price'>${price}</p>
         </div>

      </div>
   )
}

export default FoodItem