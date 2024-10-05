import { getDeforestationSummary } from "@/app/utils/getDeforestationSummary.mjs";
import React, { useEffect } from "react";

const LocationDescriptionHook: React.FC<{ location: string }> = ({
  location,
}) => {
  const text = '';
  useEffect(() => {
    text = getDeforestationSummary(location);
  }, []);

  return text;
};

export default LocationDescriptionHook;
