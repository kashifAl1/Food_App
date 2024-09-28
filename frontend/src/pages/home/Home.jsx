import React, { useState } from 'react'

import './home.css'

import Header from '../header/Header'

import ExploreMenu from '../../components/exploreMenu/ExploreMenu'

import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import { AppDownload } from '../../components/mobileAppDownload/AppDownload'

export default function Home() {
  let [category, Setcategory] = useState("All")

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={Setcategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}
