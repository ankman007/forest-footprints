"use client";
import styles from "./map.module.scss";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EventContainer from "../EventContainer";
import LayerContainer from "../LayerContainer";
import { getDeforestationSummary } from "@/app/utils/getDeforestationSummary.mjs";

const MapComponent = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [locationName, setLocationName] = useState(
    "Click on the map to get the location name and its deforestation state."
  );
  const [showDescription, setShowDescription] = useState(false);

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getDeforestationSummary(locationName);
      setSummary(result);
    };

    fetchData();
  }, [locationName]);

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

  const reverseGeocode = async (lat: string, lon: string) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setLocationName(`Location: ${data.display_name}`);
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
      map.on("click", function (e) {
        const { lat, lng }: any = e.latlng;
        reverseGeocode(lat, lng);
      });
    }
  }, [map]);
  console.log(summary);

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
