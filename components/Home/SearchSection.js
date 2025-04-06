import React from "react";
import InputItem from "./InputItem";

const SearchSection = () => {
  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl   ">
      <p className="text-[20px] font-bold">Get A Ride</p>
      <InputItem type='source'/>
      <InputItem type='destination' />
      <button className="bg-black text-white py-3 rounded-lg mt-3 w-full ">Search</button>
    </div>
  );
};

export default SearchSection;
