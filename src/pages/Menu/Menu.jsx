import React from 'react'
import DynamicCover from '../Shared/DynamicCover/DynamicCover'
import menuBanner from '../../assets/menu/banner3.jpg'
import dessert from '../../assets/menu/dessert-bg.jpeg'
import pizza from '../../assets/menu/pizza-bg.jpg'
import salad from '../../assets/menu/salad-bg.jpg'
import soup from '../../assets/menu/soup-bg.jpg'
import useMenu from '../../hooks/useMenu'
import TodaySpacial from './TodaySpacial';
import Dessert from './Dessert'
import Salad from './Salad'
import Pizza from './Pizza'
function Menu() {
  const [menu] = useMenu();
  return (
    <div>
        <DynamicCover
        bgImage={menuBanner}
        description={"Would you like to try a dish"}
        title={"OUR MENU"}
        />

        {/* showing first 6 menu items */}
        <TodaySpacial/>

         {/* showing dessert menu items */}
        <DynamicCover
        bgImage={dessert}
        description={"Would you like to try a dish"}
        title={"Dessert's"}
        />
        <Dessert/>

         {/* showing salad menu items */}
        <DynamicCover
        bgImage={salad}
        description={"Would you like to try a dish"}
        title={"salad's"}
        />
        <Salad/>

         {/* showing pizza menu items */}
        <DynamicCover
        bgImage={pizza}
        description={"Would you like to try a dish"}
        title={"pizza's"}
        />
        <Pizza/>
    </div>
  )
}

export default Menu