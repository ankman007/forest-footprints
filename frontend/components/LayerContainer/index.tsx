import styles from "./layer.module.scss";
import { useState } from "react";

export default function LayerContainer() {
  const [selectedLayers, setSelectedLayers] = useState({
      country: false,
      region: false,
    district: false,
    
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedLayers((prevLayers) => ({
      ...prevLayers,
      [name]: checked,
    }));
  };

  return (
    <>
      <div className={`${styles.layer_container}`}>
        <div className={`${styles.header}`}>
          <p>Layers</p>
        </div>

        <div className={`${styles.layer_list}`}>
          <div className={`${styles.checkbox}`}>
            <label>
              <input
                type="checkbox"
                name="country"
                checked={selectedLayers.country}
                onChange={handleCheckboxChange}
              />
              Country
            </label>
          </div>

          <div className={`${styles.checkbox}`}>
            <label>
              <input
                type="checkbox"
                name="region"
                checked={selectedLayers.region}
                onChange={handleCheckboxChange}
              />
              Region
            </label>
          </div>

          <div className={`${styles.checkbox}`}>
            <label>
              <input
                type="checkbox"
                name="district"
                checked={selectedLayers.district}
                onChange={handleCheckboxChange}
              />
              District
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
