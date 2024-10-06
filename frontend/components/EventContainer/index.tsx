import React, { useState } from 'react';
import styles from "./event.module.scss";
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Event {
  title: string;
  description: string;
  location: string;
}

const EventContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalopen, setIsmodalOpen] = useState(false);
  const [events] = useState<Event[]>([
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleModal = () => {
    setIsmodalOpen(!isModalopen);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    switch (name) {
      case 'title':
        setTitle(e.target.value);
        console.log(e.target.value);
        break;

      case 'description':
        setDescription(e.target.value);
        console.log(22);
        break;

      case 'location':
        setLocation(e.target.value);
        console.log(222);
        break;

      default:
        break;
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !location) {
      console.error("Please fill in all fields");
      return;
    }

    const obj = {
      title, description, location,
    }
    events.push(obj);

    setIsmodalOpen(false);
    toast.success('Event added sucessfully');
  };
  return (
    <div className={`${styles.event_container} border-primary-47`}>
     
      <div className={`${styles.header}`}>
        <p className='color-primary-90'>Events</p>
        <button onClick={toggleModal} className={`${styles.create_event_button}`}>
          Add Event
        </button>
      </div>

      {isModalopen &&
        <form onSubmit={onSubmit} className="z-[100000] bg-neutral-0 max-w-[300px] w-full border-primary-47 p-[12px] rounded-[8px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between">
            <div className="title font-bold color-primary-80">Create Event</div>

            <div onClick={toggleModal}>
              <Image src={`/images/close.svg`} width={40} height={40} alt='close' />
            </div>
          </div>

          <div className="input-box mb-[12px]">
            <label className='color-primary-80 text-[14px] mb-[2px] block'>Title</label>
            <input name="title" onChange={onChange} className='w-full h-[48px] px-[8px] color-primary-90 border-primary-47 rounded-[8px]' />
          </div>


          <div className="input-box mb-[12px]">
            <label className='color-primary-80 text-[14px] mb-[2px] block'>Date</label>
            <input name="date" onChange={onChange} className='w-full h-[48px] px-[8px] color-primary-90 border-primary-47 rounded-[8px]' />
          </div>

          <div className="input-box mb-[12px]">
            <label className='color-primary-80 text-[14px] mb-[2px] block'>Description</label>
            <input name="description" onChange={onChange} className='w-full h-[48px] px-[8px] color-primary-90 border-primary-47 rounded-[8px]' />
          </div>

          <div className="input-box mb-[12px]">
            <label className='color-primary-80 text-[14px] mb-[2px] block'>Location</label>
            <input name="location" onChange={onChange} className='w-full h-[48px] px-[8px] color-primary-90 border-primary-47 rounded-[8px]' />
          </div>

          <button onSubmit={() => onSubmit} className='h-[44px] text-[14px] bg-primary-80 color-neutral-0 rounded-[8px] w-full'>Create Event</button>
        </form>
      }

      <div className={`${styles.events_list} h-[300px] overflow-scroll`}>
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
