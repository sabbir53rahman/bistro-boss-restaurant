import React, { useEffect, useState } from "react";
import MenuItem from "../Shared/MenuItem/MenuItem";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";

function PopularMenu() {
  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular')
  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category === "popular");
  //       setMenu(popularItems);
  //     });
  // }, []);

  return (
    <>
      
      <div className="menu-book container mx-auto py-[50px] px-6 lg:px-24">
      <SectionTitle subHeading="Check it out" heading="FROM OUR MENU" />
      {/* Two-column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {popular.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
    </>
  );
}

export default PopularMenu;
