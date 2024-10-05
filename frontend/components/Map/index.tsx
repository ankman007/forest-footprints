"use client";
import styles from "./map.module.scss";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EventContainer from "../EventContainer";
// import LocationDescriptionHook from "../LocationDescription";
import { getDeforestationSummary } from "@/app/utils/getDeforestationSummary.mjs";
import LocationDescriptionHook from "../LocationDescription";

const MapComponent = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [locationName, setLocationName] = useState(
    "Click on the map to get the location name."
  );
  const [showDescription, setShowDescription] = useState(false);
  
  
  const [summary, setSummary] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDeforestationSummary(location);
      setSummary(result);
    };
    
    fetchData();
  }, [location]);
  
  const [ress, setRess] = useState('');

  useEffect(() => {
    const ff = async() => {
      const locationTxt = await LocationDescriptionHook({ location: locationName });
      setRess(locationTxt)
    }

    ff();
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
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng);
      });
    }
  }, [map]);

  return (
    <>
      <div className={`${styles.event_container}`}>
        <EventContainer />
      </div>
      <div className={`${styles.location_name}`}>
        <h2>{locationName}</h2>
        {showDescription && (
          <div>
            <hr />
            <p>{summary}</p>
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
