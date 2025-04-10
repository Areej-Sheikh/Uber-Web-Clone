// components/Home/GoogleMapSection.js
"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

const GoogleMapSection = () => {
  const containerStyle = {
    width: "100%",
    height: "200%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "8f2ec0e27e692b3c" }}
    >
      {/* Child components */}
      <></>
    </GoogleMap>
  );
};

export default GoogleMapSection;
