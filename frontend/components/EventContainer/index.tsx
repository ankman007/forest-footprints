import React, { useState } from 'react';
import styles from "./event.module.scss";

interface Event {
  title: string;
  description: string;
  location: string;
}

const EventContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Tree planetary',
      description: 'We are planning to do tree plantation on the land of the historical forest of seattle.',
      location: 'Seattle',
    },
    {
      title: 'Tree planetary',
      description: 'We are planning to do tree plantation on the land of the historical forest of seattle.',
      location: 'Seattle',
    },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className={`${styles.event_container}`}>
      <input
        type="text"
        placeholder="Search Events"
        value={searchTerm}
        onChange={handleSearchChange}
        className={`${styles.search_bar}`}
      />

      <div className={`${styles.header}`}>
        <p className='color-primary-90'>Events</p>
        <button onClick={handleButtonClick} className={`${styles.create_event_button}`}>
          Add Event
        </button>
      </div>
      
      <div className={`${styles.events_list}`}>
        {events
          .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((event, index) => (
            <div key={index} className={`${styles.event_card}`}>
              <h3 className='color-primary-80 text-[14px]'>{event.title}</h3>
              <p className='color-neutral-40 text-[14px] block mb-[12px]'>{event.description}</p>
              <p className={`${styles.location} color-neutral-30 text-[12px]`}>{event.location}</p>
            </div>

          ))}
      </div>
    </div>
  );
};

export default EventContainer;
