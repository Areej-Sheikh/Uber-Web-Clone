"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, MarkerF } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GoogleMapSection = () => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const { Source } = useContext(SourceContext);
  const { Destination } = useContext(DestinationContext);

  useEffect(() => {
    if (map) {
      // When both locations are set, fetch directions
      if (Source?.lat && Destination?.lat) {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: { lat: Source.lat, lng: Source.lng },
            destination: { lat: Destination.lat, lng: Destination.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
              const leg = result.routes[0].legs[0];
              setDistance(leg.distance.text);
              setDuration(leg.duration.text);

              const bounds = new window.google.maps.LatLngBounds();
              result.routes[0].overview_path.forEach((point) =>
                bounds.extend(point)
              );
              map.fitBounds(bounds);
            } else {
              console.error("Directions request failed:", status);
            }
          }
        );
      } else if (Source?.lat) {
        const newCenter = { lat: Source.lat, lng: Source.lng };
        setCenter(newCenter);
        map.panTo(newCenter);
      } else if (Destination?.lat) {
        const newCenter = { lat: Destination.lat, lng: Destination.lng };
        setCenter(newCenter);
        map.panTo(newCenter);
      }
    }
  }, [Source, Destination, map]);

  const onLoad = useCallback(
    (mapInstance) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      mapInstance.fitBounds(bounds);
      setMap(mapInstance);
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Custom identical black pin icon URL (Google default pin in black)
  const blackPinIcon = "https://maps.gstatic.com/mapfiles/ms2/micons/black.png";

  return (
    <div className="flex flex-col gap-4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: "8f2ec0e27e692b3c" }}
      >
        {/* 🔲 Source Marker (Black Pin) */}
        {Source?.lat && (
          <MarkerF
            position={{ lat: Source.lat, lng: Source.lng }}
            icon={{
              url: "/blackPinIcon.png",
              scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
            }}
          />
        )}

        {/* 🔲 Destination Marker (Black Pin) */}
        {Destination?.lat && (
          <MarkerF
            position={{ lat: Destination.lat, lng: Destination.lng }}
            icon={{
              url: "/blackPinIcon.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}

        {/* 🔲 Directions Renderer with thinner black route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#000000", // Black
                strokeOpacity: 0.9,
                strokeWeight: 2, // Thinner route
              },
              suppressMarkers: true, // We'll use our own custom markers
            }}
          />
        )}
      </GoogleMap>

      {/* Distance and Duration display */}
      {distance && duration && (
        <div className="text-sm bg-white p-3 rounded shadow max-w-sm border">
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Estimated Time:</strong> {duration}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapSection;
