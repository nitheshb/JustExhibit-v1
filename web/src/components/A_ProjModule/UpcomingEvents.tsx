import React from 'react';

const EventCard = ({ title, price, location, date, availability, description, imageUrl }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="relative h-48">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-green-600">£{price}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-1 mb-3  text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-1 mb-3 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-1 mb-3 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-sm">{availability}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const events = [
    {
      title: "Music Concert Series A",
      price: "70.00",
      location: "New York",
      date: "01/12/2024",
      availability: "1 / 1 available",
      description: "Join us for an unforgettable evening of live music performances.",
      imageUrl: "https://picsum.photos/400/300?random=1"
    },
    {
      title: "Artist Showcase B",
      price: "30.00",
      location: "London",
      date: "02/01/2025",
      availability: "100 / 100 available",
      description: "Experience an amazing showcase of talent and artistry.",
      imageUrl: "https://picsum.photos/400/300?random=3"
    },
    {
      title: "World Tour C",
      price: "58.00",
      location: "Paris",
      date: "12/01/2025",
      availability: "200 / 200 available",
      description: "A spectacular performance featuring world-class entertainment.",
      imageUrl: "https://picsum.photos/400/300"
    },
    {
      title: "Food Festival D",
      price: "45.00",
      location: "Los Angeles",
      date: "20/02/2025",
      availability: "50 / 50 available",
      description: "Savor the finest cuisines from around the world at our food festival.",
      imageUrl: "https://picsum.photos/400/300?random=4"
    },
    {
      title: "Tech Conference E",
      price: "150.00",
      location: "San Francisco",
      date: "05/03/2025",
      availability: "30 / 30 available",
      description: "Join industry leaders for a day of networking and cutting-edge tech talks.",
      imageUrl: "https://picsum.photos/400/300?random=5"
    },
    {
      title: "Art Gallery F",
      price: "25.00",
      location: "Berlin",
      date: "22/04/2025",
      availability: "200 / 200 available",
      description: "Explore an inspiring collection of modern art from renowned artists.",
      imageUrl: "https://picsum.photos/400/300?random=6"
    },
    {
      title: "Marathon G",
      price: "20.00",
      location: "Sydney",
      date: "15/05/2025",
      availability: "500 / 500 available",
      description: "Take part in one of the world’s most challenging and exciting marathons.",
      imageUrl: "https://picsum.photos/400/300?random=7"
    },
    {
      title: "Film Screening H",
      price: "12.00",
      location: "Tokyo",
      date: "10/06/2025",
      availability: "100 / 100 available",
      description: "Watch exclusive screenings of independent films and documentaries.",
      imageUrl: "https://picsum.photos/400/300?random=8"
    },
    {
      title: "Comedy Night I",
      price: "40.00",
      location: "Chicago",
      date: "01/07/2025",
      availability: "20 / 20 available",
      description: "A night of laughs with some of the best comedians in the world.",
      imageUrl: "https://picsum.photos/400/300?random=9"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Upcoming Events</h1>
          <p className="text-gray-600">Discover & book tickets for amazing events</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>12 Upcoming Events</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;