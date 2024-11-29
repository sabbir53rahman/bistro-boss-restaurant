import React from "react";
import useMenu from "../../hooks/useMenu";
import MenuItem from "../Shared/MenuItem/MenuItem";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function TodaySpacial() {
  const [menu] = useMenu();

  // Get the first 6 menu items
  const todaySpacial = menu.filter(item => item.category === 'offered');
  return (
    <div className="py-[50px]">
    <SectionTitle
    heading={"today's spacial"}/>
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {todaySpacial.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default TodaySpacial;
