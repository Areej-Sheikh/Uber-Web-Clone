'use client'
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const GooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);


const InputItem = ({ type }) => {
  const isSource = type === "source";
  const [value, setValue] = useState(null);

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={isSource ? "/source.png" : "/destination.png"}
        width={20}
        height={20}
        alt=""
      />
      <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          value,
          onChange: setValue,
          placeholder:'Pickup Location',
          isClearable:true,
          className:"w-full",
          components:{
            DropdownIndicator:false,
          },
          styles:{
            control:(provided) =>({
              ...provided,
              backgroundColor:'transparent',
              border:'none'
            })
          }
        }}
      />
    </div>
  );
};

export default InputItem;
