import React from 'react'
import useMenu from '../../hooks/useMenu';
import MenuItem from '../Shared/MenuItem/MenuItem';

function Pizza() {
    const [menu] = useMenu();

    // Get the pizza menu items
    const pizza = menu.filter((item) => item.category === "pizza");
  return (
    <div className="py-[50px]">
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {pizza.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Pizza