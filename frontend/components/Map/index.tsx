"use client";

import styles from "./map.module.scss";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EventContainer from "../EventContainer";
import LayerContainer from "../LayerContainer";
import { getDeforestationSummary } from "@/app/utils/getDeforestationSummary.mjs";

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41], 
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapComponent = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [locationName, setLocationName] = useState(
    "Click on the map to get the location name and its deforestation state."
  );
  const [showDescription, setShowDescription] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log("Location Name:", locationName);
      console.log(summary);
      if (locationName !== 'No location found.' && locationName !== 'Error fetching location.') {
        const result = await getDeforestationSummary(locationName);
        setSummary(result);
      }
    };
  
    fetchData();
  }, [locationName, summary]);
  

  useEffect(() => {
    const mapInstance = L.map("map", {
      zoom: 4,
      minZoom: 3,
      maxZoom: 20,
      scrollWheelZoom: true,
    }).setView([27.7103, 85.3222], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    mapInstance.zoomControl.remove();

    const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    mapInstance.setMaxBounds(bounds);

    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  const reverseGeocode = async (lat: number, lon: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;
    
    console.log('lat, lon', lat, lon);
    // console.log('url', url);

    try {
      console.log("this is response 1",);
      const response = await fetch(url);
      console.log("this is response 2",);
      console.log("this is response", response);
      const data = await response.json();
      console.log("data", data);
      console.log(data.display_name);
      if (data && data.display_name) {
        console.log(data.display_name);

        setLocationName(data.display_name);
        setShowDescription(true);
      } else {
        setLocationName("No location found.");
        setShowDescription(false);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocationName("Error fetching location.");
    }
  };

  useEffect(() => {
    if (map) {
      let marker: L.Marker;

      map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng);

        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

      });
    }
  }, [map]);

  return (
    <>
      <div className={`${styles.event_container}`}>
        <EventContainer />
      </div>
      <div className={`${styles.layer_container}`}>
        <LayerContainer />
      </div>
      <div className={`${styles.location_name}`}>
        <h2 className="color-neutral-40 font-medium text-[16px]">{locationName}</h2>
        {showDescription && (
          <div className="color-neutral-30 text-[14px]">
            <hr className="" />
            <p className="mt-[8px]">{summary}</p>
          </div>
        )}
      </div>

      <div className={`${styles.map_wrapper}`}>
        <div id="map" className={`${styles.map}`}></div>
      </div>
    </>
  );
};

export default MapComponent;
