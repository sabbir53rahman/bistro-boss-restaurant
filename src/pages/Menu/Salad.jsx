import React from "react";
import useMenu from "../../hooks/useMenu";
import MenuItem from "../Shared/MenuItem/MenuItem";

function Salad() {
  const [menu] = useMenu();

  // Get the salad menu items
  const salad = menu.filter((item) => item.category === "salad");
  return (
    <div className="py-[50px]">
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {salad.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Salad;
