import React from "react";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";

function Dessert() {
    const [menu] = useMenu();

    // Get the dessert menu items
    const dessert = menu.filter(item => item.category === 'dessert');
  return (
    <div className="py-[50px]">
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {dessert.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Dessert;
