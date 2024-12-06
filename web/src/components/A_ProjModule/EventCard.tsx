// import React from 'react';
// import { Calendar, MapPin } from 'lucide-react';


// import { useState } from 'react'
// import { LinearProgress } from '@mui/material'
// import { Building2 } from 'lucide-react'
// import { useTranslation } from 'react-i18next'
// import { prettyDate } from 'src/util/dateConverter'
// import SiderForm from '../SiderForm/SiderForm'




// type ProjectStats = {
//   total: number
//   available: number
//   sold: number
//   blocked: number
// }

// type PipelineStats = {
//   registration: number
//   booking: number
//   construction: number
//   possession: number
// }

// type TransactionStats = {
//   total: string
//   sale: string
//   balance: string
//   refunds: string
// }

// type ProjectCardProps = {
//   name: string
//   type: string
//   price: string
//   stats: ProjectStats
//   pipeline: PipelineStats
//   transactions: TransactionStats
// }







// const events = [
//   {
//     id: 1,
//     title: 'Handpicked Jewellery Designs from Goldsmith',
//     imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',
//     category: 'JEWELLERY',
//   },
//   {
//     id: 2,
//     title: 'Healthy Delicious Food',
    
//     imageUrl: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826',
//     category: 'FOOD',
//   },
//   {
//     id: 3,
//     title: 'Trendy Designer Wear with an Extensive Collection of Clothing Options',
//     imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
//     category: 'FASHION',
//   },
// ];



// function EventCard({
//   project,
//   event,
//   setProject,
//   onSliderOpen,
//   isEdit,
//   name,
//   type,
//   price,
//   stats,
//   pipeline,
//   transactions,
// }) {
//   const [activeFilter, setActiveFilter] = React.useState('All');
//   const filters = ['All', 'Upcoming', 'Completed', 'Ongoing'];
//   const { t } = useTranslation()
//   const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
//   const handleNewProjectClose = () => setIsNewProjectOpen(false)

//   return (

//     <>
//        <div 
//        onClick={() => setIsNewProjectOpen(true)}
//        className="min-h-screen bg-[#FFFFFF] p-6 sm:p-8">
//       <div className="max-w-7xl mx-auto">
   
//         {/* <div className="mb-8 flex flex-col justify-center items-center">
//           <h1 className="text-2xl font-normal  text-[#2BC2F6] mb-6">All Events</h1>
//           <div className="flex gap-3">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   activeFilter === filter
//                     ? 'bg-red-500 text-white'
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </div> */}

 
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow h-auto"
//             >
        
//               <div className="relative">
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <span className="absolute top-4 right-4 bg-[#31C0F0] text-white px-3 py-2 rounded-[10px] text-sm font-medium">
//                   {event.category}
//                 </span>
//               </div>


//               <div className="flex-1 p-4 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg font-bold text-[#484848] mb-3">
//                   {project?.eventName}
//                   </h3>
//                   <div className="space-y-2">
//                     <div className="flex items-center font-semibold text-[#484848]">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       <span className="text-sm">  {project?.projectType?.name}</span>
//                     </div>
//                     <div className="flex items-center font-semibold text-gray-600">
//                       <MapPin className="w-4 h-4 mr-2 text-[#484848]"  />
//                       <span className="text-sm">{project?.location}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

         
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex items-baseline bg-[#F5FCFE] justify-between">
//                   <div className="flex items-baseline ml-3">
//                     <span className="text-[#000000]">₹</span>
//                     <span className="text-[#000000] font-bold text-[16px] ml-1">{project?.city}</span>
//                     <span className="text-[#000000] font-semibold uppercase text-[16px] ml-1">onwards</span>
//                   </div>
//                   <button className="text-[#000000] px-4 py-2 uppercase rounded text-[16px] font-semibold  transition-colors border-l-[3px] border-[#31C0F0] h-full flex items-center">
//                    BOOK NOW
//                   </button>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
    
//     </>
    
//   );
// }

// export default EventCard;
