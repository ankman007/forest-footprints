import styles from "./layer.module.scss";

export default function LayerContainer() {
  return (
    <>
      <div className={`${styles.header}`}>
        <p>Layers</p>
      </div>

      <div className={`${styles.events_list}`}>
        <div className={`${styles.event_card}`}></div>
      </div>
    </>
  );
}
