"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);

const InputItem = ({ type }) => {
  const isSource = type === "source";
  const [value, setValue] = useState(null);

  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);

  const getLatitudeLongitude = (place) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (placeDetails, status) => {
      if (
        status === "OK" &&
        placeDetails.geometry &&
        placeDetails.geometry.location
      ) {
        const lat = placeDetails.geometry.location.lat();
        const lng = placeDetails.geometry.location.lng();

        const payload = {
          lat,
          lng,
          name: placeDetails.formatted_address,
          label: placeDetails.name,
        };

        console.log(`${type} location:`, payload);

        if (type === "source") {
          setSource(payload);
        } else {
          setDestination(payload);
        }
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={isSource ? "/source.png" : "/destination.png"}
        width={20}
        height={20}
        alt={isSource ? "Source Icon" : "Destination Icon"}
      />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatitudeLongitude(place);
            setValue(place);
          },
          placeholder: isSource ? "Pickup Location" : "Dropoff Location",
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;
