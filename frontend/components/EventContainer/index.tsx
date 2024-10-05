import React, { useState } from 'react';
import './EventContainer.scss';

interface Event {
  title: string;
  description: string;
  location: string;
}

const EventContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events] = useState<Event[]>([
    {
      title: 'Event 1',
      description: 'Description for Event 1',
      location: 'Location 1',
    },
    {
      title: 'Event 2',
      description: 'Description for Event 2',
      location: 'Location 2',
    },
    {
      title: 'Event 3',
      description: 'Description for Event 3',
      location: 'Location 3',
    },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="event-container">
      <div className="header">
        <h2>Events</h2>
        <button onClick={handleButtonClick} className="create-event-button">
          Create Event
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Events"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="events-list">
        {events
          .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p className="location">{event.location}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventContainer;
