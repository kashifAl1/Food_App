import React from 'react'
import './exploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({category,setCategory}) {
   // console.log(category)
   return (
      <div className='explore-Menu' id='explore-Menu'>
         <h1> Explore our menu  </h1>
         <p className='explore-menu-text'> Choose from a divers menu featuring delecatble array of dishes. Our misson is to saitisfy you carvings and elevate you dining experience, one delicious meal at a time. </p>
         <div className="explore-menu-list">
             {menu_list.map((item, index) => {
               return (
                  <div onClick={()=>setCategory(prev => prev ===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                     <img className={category=== item.menu_name?"active-menu":""} src={item.menu_image} alt="" />
                     <p>{item.menu_name}</p>
                  </div>

               )
            })} 
         </div>
         <hr />
      </div>
   )
}

export default ExploreMenu