// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// import { PencilIcon } from '@heroicons/react/outline'
// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { deleteUser, steamUsersList, steaminactiveUsersList } from 'src/context/dbQueryFirebase'
// import { TrashIcon } from '@heroicons/react/outline'
// import { useAuth } from 'src/context/firebase-auth-context'

// const AssetsManageTable = ({ editEmployeeFun, showCompletedTasks }) => {
//   const { user } = useAuth()

//   const { orgId } = user
//   const [leadsFetchedData, setLeadsFetchedData] = useState([])
//   const [filterData, setFilterData] = useState([])
//   const [selDept, setSelDept] = useState('')
//   useEffect(() => {
//     getLeadsDataFun()
//     setSelDept('all')
//   }, [showCompletedTasks])
//   useEffect(() => {
//     if (selDept === 'all') {
//       setFilterData(leadsFetchedData)
//     } else {
//       console.log(
//         ' what am i ',
//         selDept,
//         leadsFetchedData.filter((userD) => userD.department === selDept)
//       )
//       setFilterData(
//         leadsFetchedData.filter(
//           (userD) =>
//             userD.department === selDept || userD?.department?.includes(selDept)
//         )
//       )
//     }
//   }, [selDept, leadsFetchedData])
//   const getLeadsDataFun = async () => {
//     if(showCompletedTasks) {
//       const unsubscribe = steaminactiveUsersList(
//         orgId,
//         (querySnapshot) => {
//           const usersListA = querySnapshot.docs.map((docSnapshot) =>
//             docSnapshot.data()
//           )
//           setLeadsFetchedData(usersListA)
//         },
//         () => setLeadsFetchedData([])
//       )
//       return unsubscribe
//     }else {
//     const unsubscribe = steamUsersList(
//       orgId,
//       (querySnapshot) => {
//         const usersListA = querySnapshot.docs.map((docSnapshot) =>
//           docSnapshot.data()
//         )
//         setLeadsFetchedData(usersListA)
//       },
//       () => setLeadsFetchedData([])
//     )
//     return unsubscribe
//     }
//   }

//   const showOnlyDept = async (category) => {
//     setSelDept(category)
//   }
//   return (
//     <div className="flex flex-col">
//       <div className="-my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
//         <div className="py-2 align-middle inline-block min-w-full ">
//           <section className="flex ml-auto mt-[18px]  bg-white  border-gray-100 py-4 rounded-t-xl px-3 ">
//             {[
//               { label: 'All', val: 'all' },
//               { label: 'Laptop', val: 'admin' },
//               { label: 'Mobile', val: 'crm' },
//               { label: 'Sim', val: 'marketing' },
//               { label: 'Mouse', val: 'project' },
//               { label: 'Keyboard', val: 'legal' },
//               { label: 'Tab', val: 'sales' },
//               { label: 'Car', val: 'hr' },
//               { label: 'Locker Keys', val: 'finance' },
//               { label: 'AccessCard', val: 'construction' },
//               { label: 'Headset', val: 'admin_support' },
//               { label: 'Two Wheeler', val: 'admin_support' },


//             ].map((dat, index) => (
//               <a
//                 key={index}
//                 className={`rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 mr-4`}
//                 onClick={() => showOnlyDept(dat.val)}
//               >
//                 <div
//                   className={`py-1 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
//                     selDept.includes(dat.val)
//                       ? 'bg-indigo-100 text-indigo-700'
//                       : 'text-gray-600'
//                   }`}
//                 >
//                   {dat.label}
//                 </div>
//               </a>
//             ))}
//           </section>
//           <div className="shadow overflow-hidden border-b border-gray-200  bg-white pb-4  px-2  xl:px-10">
//             <table className="min-w-full divide-y divide-gray-200 ">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Emp Id
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Dept
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Role
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th scope="col" className="relative px-6 py-3">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filterData.map((person) => (
//                   <motion.tr key={person.email}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <img
//                             className="h-10 w-10 rounded-full"
//                             src={
//                               '/avatar_1.png'
//                             }
//                             alt=""
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {person.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {person.email}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {person.empId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {person.title}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {person.department}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {person.roles}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                       {person?.userStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <PencilIcon
//                         className="w-5 h-5 ml-[6px] mb-[4px] inline cursor-pointer"
//                         onClick={() => editEmployeeFun(person)}
//                       />
//                       <TrashIcon
//                         className="w-5 h-5 ml-[18px] mb-[4px] inline cursor-pointer"
//                         onClick={() =>
//                           deleteUser(
//                             orgId,
//                             person?.uid,
//                             'nithe.nithesh@gmail.com',
//                             person?.email,
//                             person?.roles
//                           )
//                         }
//                       />
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AssetsManageTable



/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { PencilIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { deleteUser, steamUsersList, steaminactiveUsersList } from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'
import { useAuth } from 'src/context/firebase-auth-context'

const AssetsManageTable = ({ editEmployeeFun, showCompletedTasks }) => {
  const { user } = useAuth()
  const { orgId } = user
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  const [departmentCounts, setDepartmentCounts] = useState({})

  useEffect(() => {
    getLeadsDataFun()
    setSelDept('all')
  }, [showCompletedTasks])

  useEffect(() => {
    if (leadsFetchedData.length > 0) {
      const counts = {
        all: leadsFetchedData.length,
        laptop: leadsFetchedData.filter(userD => userD.department === 'laptop').length,
        barcode_scanner: leadsFetchedData.filter(userD => userD.department === 'barcode_scanner').length,
        brochures: leadsFetchedData.filter(userD => userD.department === 'brochures').length,
        phone_tablet: leadsFetchedData.filter(userD => userD.department === 'phone_tablet').length,
        mouse: leadsFetchedData.filter(userD => userD.department === 'mouse').length,
        keyboard: leadsFetchedData.filter(userD => userD.department === 'keyboard').length,
      }
      setDepartmentCounts(counts)
    }
  }, [leadsFetchedData])

  useEffect(() => {
    if (selDept === 'all') {
      setFilterData(leadsFetchedData)
    } else {
      setFilterData(
        leadsFetchedData.filter(
          (userD) =>
            userD.department === selDept || userD?.department?.includes(selDept)
        )
      )
    }
  }, [selDept, leadsFetchedData])

  const getLeadsDataFun = async () => {
    if(showCompletedTasks) {
      const unsubscribe = steaminactiveUsersList(
        orgId,
        (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setLeadsFetchedData(usersListA)
        },
        () => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = steamUsersList(
        orgId,
        (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setLeadsFetchedData(usersListA)
        },
        () => setLeadsFetchedData([])
      )
      return unsubscribe
    }
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }

  return (
    <div className="flex flex-col px-[20px] py-[20px]">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 flex flex-col gap-[20px] inline-block min-w-full">
          <section className="flex flex-wrap mt-[18px] bg-white border-b border-gray-300">
            {[
              { label: 'All', val: 'all' },
              { label: 'Laptop', val: 'laptop' },
              { label: 'Barcode Scanner', val: 'barcode_scanner' },
              { label: 'Brochures', val: 'brochures' },
              { label: 'Phone/Tablet', val: 'phone_tablet' },
              { label: 'Mouse', val: 'mouse' },
              { label: 'Keyboard', val: 'keyboard' },
            ].map((dat, index) => (
              <button
                key={index}
                onClick={() => showOnlyDept(dat.val)}
                className={`mr-4 px-4 py-[18px] flex items-center gap-2 rounded-t-lg transition-colors duration-200 ${
                  selDept.includes(dat.val)
                    ? ' text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]'
                    : 'bg-transparent text-[#6B7280] hover:text-[#1A1A1A]'
                }`}
              >
                {dat.label}
                <span className={`font-manrope font-bold text-[14px] leading-[100%] tracking-[0] text-center align-middle rounded-full px-2 py-0.5 ${
                  selDept.includes(dat.val)
                    ? 'bg-[#FEEDE9] text-[#F44D21] font-inter font-semibold text-[12px] leading-[18px] tracking-[0] text-center'
                    : 'bg-[#F3F4F6] text-[#666666] font-inter font-semibold text-[12px] leading-[18px] tracking-[0] text-center'
                }`}>
                  {departmentCounts[dat.val] || 0}
                </span>
              </button>
            ))}
          </section>

          <div className="shadow overflow-hidden border border-[#F0F2F4] bg-white rounded-[16px]">
            <table className="min-w-full divide-y divide-[#F0F2F4]">
              <thead className="bg-[#F5F5F5]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter tracking-wider border-b border-[#F0F2F4]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter uppercase tracking-wider border-b border-[#F0F2F4]"
                  >
                    Emp Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter tracking-wider border-b border-[#F0F2F4]"
                  >
                    Dept
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter tracking-wider border-b border-[#F0F2F4]"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter tracking-wider border-b border-[#F0F2F4]"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="relative px-6 py-3 font-medium text-[12px] leading-[18px] tracking-[0] text-black font-inter border-b border-[#F0F2F4]"
                  >
                    <span>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#F0F2F4]">
                {filterData.map((person) => (
                  <motion.tr key={person.email}>
                    <td className="px-6 py-4 whitespace-nowrap border border-[#F0F2F4]">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={'/avatar_1.png'}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-[#F0F2F4]">
                      <div className="text-sm text-gray-900">
                        {person.empId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-[#F0F2F4]">
                      <div className="text-sm text-gray-900">
                        {person.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {person.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-[#F0F2F4]">
                      {person.roles}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-[#F0F2F4]">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-[#FEEDE9] text-[#F44D21]">
                        {person?.userStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium border border-[#F0F2F4]">
                      <div className="flex items-center justify-center space-x-4">
                        <PencilIcon
                          className="w-5 h-5 text-gray-500 hover:text-[#F44D21] cursor-pointer transition-colors duration-200"
                          onClick={() => editEmployeeFun(person)}
                        />
                        <div className="h-5 w-px bg-[#F0F2F4]"></div>
                        <TrashIcon
                          className="w-5 h-5 text-gray-500 hover:text-[#F44D21] cursor-pointer transition-colors duration-200"
                          onClick={() =>
                            deleteUser(
                              orgId,
                              person?.uid,
                              'nithe.nithesh@gmail.com',
                              person?.email,
                              person?.roles
                            )
                          }
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsManageTable
