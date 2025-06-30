// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// import { CheckCircleIcon } from '@heroicons/react/solid'
// export default function LeadTaskDisplayHead({
//   data,
//   setAddTaskCommentObj,
//   closeTaskFun,
//   hoverTasId,
//   undoFun,
//   setShowVisitFeedBackStatusFun,
// }) {
//   return (
//     <section className="flex flex-row justify-between">
//       <div
//         className={`${data?.sts === 'completed' ? 'cursor-not-allowed ' : 'cursor-pointer'
//           }  mt-1 block w-full`}
//         onClick={() => {
//           if (data?.sts === 'pending') {
//             setAddTaskCommentObj(data)
//           }
//         }}
//       >
//         <label className="inline-flex items-center">
//           {data?.sts != 'completed' && (
//             <span
//               className="px-[2px] py-[2px]  rounded-full border border-2 cursor-pointer text-[#cdcdcd] hover:text-green-800 hover:border-green-700 hover:bg-green-100"
//               // onClick={() => doneFun(data)}
//               onClick={() => closeTaskFun(data)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-2 w-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </span>
//           )}
//           {data?.sts === 'completed' && (
//             <CheckCircleIcon className="w-4 h-4 inline text-[#058527]" />
//           )}
//           <div
//             className={`${data?.sts === 'completed' ? 'line-through' : 'cursor-pointer'
//               }  ml-2 text-[14px] inline font-bodyLato font-brand tracking-wider text-[#0091ae]`}
//             onClick={() => {
//               if (data?.sts === 'pending') {
//                 setAddTaskCommentObj(data)
//               }
//             }}
//           >
//             {data?.notes}
//           </div>
//         </label>
//       </div>
//       {/* {data?.sts == 'completed' && hoverTasId === data?.ct && (
//         <span
//           className="font-thin text-[#e91313] cursor-pointer text-[12px]  font-bodyLato text-[10px] ml-2  border-b hover:border-[#0091ae]  "
//           onClick={() => undoFun(data)}
//         >
//           UNDO
//         </span>
//       )} */}
//       {data?.sts != 'completed' && (
//         <section className="flex flex-row">
//           <span
//             onClick={() => {
//               setAddTaskCommentObj(data)
//             }}
//             className="inline-flex  placeholder:font-thin text-[#0091ae]  cursor-pointer font-bodyLato text-[12px] ml-2 pt-1 text-[#867777] hover:text-green-900"
//           >

//             {/* 
//             <svg
//               viewBox="0 0 12 12"
//               className="notes_icon inline w-4 h-4 mr-1 text-[#0091ae] "
//               aria-label="2 comments"
//             >
//               <g fill="none" fillRule="evenodd">
//                 <path
//                   fill="currentColor"
//                   fillRule="nonzero"
//                   d="M9.5 1A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9H7.249L5.28 10.97A.75.75 0 0 1 4 10.44V9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h7zm0 1h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H5v1.836L6.835 8H9.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"
//                 ></path>
//               </g>
//             </svg> */}
//             <span
//               className="font-thin text-[#e91313] cursor-pointer text-[12px]  font-bodyLato text-[10px] ml-2  border-b hover:border-[#0091ae]  "
//             >
//               Comment
//             </span>
//           </span>
//           {data?.stsType === 'visitfixed' && data?.sts != 'completed' && (
//             <span
//               className=" mt-[3px]  ml-4 text-green-900 font-semibold hover:border-[#7BD500] text-[12px] ml-2 cursor-pointer"
//               onClick={() => setShowVisitFeedBackStatusFun(data, 'visitdone')}
//             >
//               VISITDONE
//             </span>
//           )}
//         </section>
//       )}
//     </section>
//   )
// }




/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CheckCircleIcon } from '@heroicons/react/solid'
import { use } from 'i18next'
import { useState, useEffect } from 'react'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
} from 'src/util/dateConverter'

export default function LeadTaskDisplayHead({
  data,
  setAddTaskCommentObj,
  closeTaskFun,
  hoverTasId,
  undoFun,
  setShowVisitFeedBackStatusFun,
  EditTaskOpenWindowFun
}) {
  const [comingSoonState, setComingSoonState] = useState(false)



  useEffect(() => {
    let x =

      getDifferenceInHours(data?.schTime, '') >= 0
        ? true
        : false
    setComingSoonState(x)
  }, [data])
  return (
    <div>



      <div className='flex items-start '>

        {/*
        <div className=''>

          {data?.sts === 'completed' && (
            // <CheckCircleIcon className="w-4 h-4 inline text-[#058527]" />
            <img
              src="/Checked.svg"
              alt="Completed"
              className="w-5 h-5 inline align-middle"
            />
          )}

{data?.sts != 'completed' &&  data?.stsType !== 'visitfixed' &&  (


                <img
                src="/UnCheck.svg"
                alt="Completed"
                className="w-5 h-5 inline align-middle"
                onClick={() => closeTaskFun(data)}
              />
              )}

        </div> */}



        {data?.sts === 'completed' && (
          <img
            src="/Checked.svg"
            alt="Completed"
            className="w-5 h-5 inline align-middle mt-2"
          />
        )}

        {data?.sts != 'completed' && (
          <img
            src="/UnCheck.svg"
            alt="Completed"
            className="w-5 h-5 inline align-middle mt-1"
            onClick={() => closeTaskFun(data)}
          />
        )}

        <div className='flex flex-row justify-between ml-3 w-full' >

          <section>

            {(data?.sts != 'completed') && (
              <span
                className={` px-3 py-1  mb-3  rounded-[4px] ${comingSoonState ? 'bg-[#DFF6E0] text-[#1B6600]' : 'bg-[#FDECEC] text-[#D20D0D]'
                  }   font-outfit font-medium text-[12px] leading-tight tracking-tight text-center`}
              >
                {comingSoonState ? 'Starts in' : 'Delayed by'} {'  '}
                {getDifferenceInMinutes(data?.schTime, '') > 60
                  ? Math.abs(getDifferenceInMinutes(data?.schTime, '')) > 8640
                    ? `${Math.abs(getDifferenceInDays(data?.schTime, ''))} Days `
                    : `${Math.abs(getDifferenceInHours(data?.schTime, ''))} Hours `
                  : `${Math.abs(getDifferenceInMinutes(data?.schTime, ''))} Min`}{' '}
              </span>
            )}

            <div className={`${data?.sts === 'completed' ? 'cursor-not-allowed ' : 'cursor-pointer'
              }  mt-1 block`}
              onClick={() => {
                if (data?.sts === 'pending') {
                  setAddTaskCommentObj(data)
                }
              }}
            >
              <label className="inline-flex gap-2 items-center">
                <div
                  className={`${data?.sts === 'completed' ? 'line-through' : 'cursor-pointer'
                    }   font-outfit font-medium text-[16px] leading-[14px] tracking-normal  text-[#0091ae] `}
                  onClick={() => {
                    if (data?.sts === 'pending') {
                      setAddTaskCommentObj(data)
                    }
                  }}
                >
                  {data?.notes}
                </div>


                {/*
              <div className='flex gap-2'> */}

                <span
                  className="text-[14px] font-medium px-2 py-[2px] rounded-[13px]  text-[#606062]"
                >
                  #{data?.stsType === 'visitfixed' ? 'Visit Fixed' : data?.stsType || 'New'}
                </span>

                {data?.sts != 'completed' && <img
                  src="/edit-02.svg"
                  alt="Edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => { EditTaskOpenWindowFun(data) }}
                />}

              </label>
            </div>


          </section>

          {/* <section className="flex flex-row justify-between"> */}



          <div>
            {data?.sts != 'completed' && (
              <section className="flex gap-4 flex-row">
                <span
                  onClick={() => {
                    setAddTaskCommentObj(data)
                  }}
                  className=" px-3 py-2 rounded-[8px] border border-[#E7E7E9] text-[#000000] font-normal text-[12px] cursor-pointer hover:text-green-900 "
                // className="inline-flex  placeholder:font-thin text-[#0091ae]  cursor-pointer font-bodyLato text-[12px]   hover:text-green-900"
                >

                  Add Comment

                </span>
                {data?.stsType === 'visitfixed' && data?.sts != 'completed' && (
                  <span
                    className="px-3 py-2 rounded-[8px] border border-[#E7E7E9] text-[#000000] font-normal text-[12px] cursor-pointer hover:text-green-900 "
                    onClick={() => setShowVisitFeedBackStatusFun(data, 'visitdone')}
                  >
                    Visit Done
                  </span>
                )}
              </section>
            )}
          </div>

          {/* </section> */}

        </div>
      </div>

    </div>
  )
}
