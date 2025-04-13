import CarsDataList from "@/utils/CarsDataList";
import React, { useState } from "react";
import CarListItem from "./CarListItem";

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();

  return (
    <div className="mt-5 overflow-auto h-[300px]">
      <h2 className="text-[22px] font-bold mb-2 ">Recommended</h2>
      {CarsDataList.map((item, index) => (
        <div
          key={item.id}
          className={`cursor-pointer px-4 ${
            activeIndex === index
              ? "border-[2px] border-black rounded-2xl"
              : null
          }`}
          onClick={() => setActiveIndex(index)}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
    </div>
  );
};

export default CarListOptions;
