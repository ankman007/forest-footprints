'use client';
import styles from './map.module.scss';
import React, { useEffect, useState } from "react";
import L from "leaflet";


const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [locationName, setLocationName] = useState("Click on the map to get the location name.");

  useEffect(() => {
    const mapInstance = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const reverseGeocode = async (lat: string, lon: string) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setLocationName(`Location: ${data.display_name}`);
      } else {
        setLocationName("No location found.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocationName("Error fetching location.");
    }
  };

  useEffect(() => {
    if (map) {
      map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng);
      });
    }
  }, [map]);

  return (
    <div className={`${styles.map_wrapper}`}>
      <h1>Click on the map to get the location name</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
      <div id="location-name" style={{ marginTop: "10px", fontSize: "18px" }}>
        {locationName}
      </div>
    </div>
  );
};

export default MapComponent;
