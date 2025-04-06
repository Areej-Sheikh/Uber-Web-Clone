"use client";
import React, { useContext, useEffect } from "react";
import InputItem from "./InputItem";
import GoogleWrapper from "./GoogleWrapper";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const SearchSection = () => {
  const { Source, setSource } = useContext(SourceContext);
  const { Destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (Source) {
      console.log("Source:", Source);
    }
    if (Destination) {
      console.log("Destination:", Destination);
    }
  }, [Source, Destination]);

  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">Get A Ride</p>
      <GoogleWrapper>
        <InputItem type="source" />
        <InputItem type="destination" />
      </GoogleWrapper>

      <button className="bg-black text-white py-3 rounded-lg mt-3 w-full">
        Search
      </button>
    </div>
  );
};

export default SearchSection;
