import React, { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../fooditem/FoodItem'
function FoodDisplay({ category }) {

  const { food_list } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {

            return < FoodItem name={item.name} id={item._id} description={item.description} price={item.price} image={item.image} />
          }

        })}
      </div>
    </div>
  )
}

export default FoodDisplay