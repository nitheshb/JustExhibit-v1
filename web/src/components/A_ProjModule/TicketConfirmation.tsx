
import React from 'react';

const TicketConfirmation = () => {
  const ticketDetails = [
    {
      label: "Date",
      value: "08/22/2025",
      icon: (
        <svg className="w-5 h-5 mt-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: "Dubai",
      icon: (
        <svg className="w-5 h-5 mt-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Ticket Holder",
      value: (
        <>
          <p>Sonny Sangha</p>
          <p className="text-sm text-gray-500">sonny.sangha@gmail.com</p>
        </>
      ),
      icon: (
        <svg className="w-5 h-5 mt-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const ticketId = "User_2oy5TXmM7BpXvUa7bcUusWGPVU2";
  const ticketPrice = "£20.00";
  const purchaseDate = "21/10/2024 14:08:48";
  const qrCodeUrl = "/api/placeholder/100/100";
  const importantInfo = [
    "Please arrive at least 30 minutes before the event",
    "Have your ticket QR code ready for scanning",
    "This ticket is non-transferable",
  ];

  return (
    <div className="w-full bg-gray-200 p-6 mx-auto">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">Ticket Purchase Successful!</h2>
        <p className="text-sm text-gray-600">Your ticket has been confirmed and is ready to use</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">



<div className="relative">

    <div className="absolute bottom-2 left-2   text-white px-4 py-2 rounded">
      <h3 className="text-lg font-bold">Tyga Infamous World Tour</h3>
    </div>
    

    <img 
      src="https://picsum.photos/400/200" 
      alt="Concert banner" 
      className="w-full h-[350px] object-cover"
    />
  </div>







        <div className="space-y-2 px-6 py-4 mb-6">
          {ticketDetails.map((detail, index) => (
            <div className="flex items-start gap-2" key={index}>
              {detail.icon}
              <div>
                <p className="text-sm text-gray-500">{detail.label}</p>
                <p>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-6 items-start">
          <div className="flex items-start gap-2 max-w-[60%]">
            <svg className="w-5 h-5 mt-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Ticket Number ID</p>
              <p className="font-mono text-sm break-all">{ticketId}</p>
            </div>
          </div>
          <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
        </div>

        <div className="flex items-start px-6 gap-2 mt-4">
          <svg className="w-5 h-5 mt-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Ticket Price</p>
            <p>{ticketPrice}</p>
          </div>
        </div>

        <div className="mt-6 px-6 space-y-2">
          <p className="font-medium">Important Information</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {importantInfo.map((info, index) => (
              <li key={index}>• {info}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 px-6 pb-6 flex justify-between text-xs text-gray-500">
          <p>Purchase Date: {purchaseDate}</p>
          <p className="text-blue-600">Valid Ticket</p>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
