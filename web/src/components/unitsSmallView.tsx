// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable prettier/prettier */
// import { useEffect, useState } from 'react'
// import { MenuItem, styled } from '@mui/material'

// const CustomMenuItem = styled(MenuItem)(() => ({
//   fontSize: '0.85rem',
// }))

// const UnitsSmallViewCard = ({ kind, feedData, bg,  setSelUnitDetails,
//   setShowCostSheetWindow,
//   setSelMode, }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [selOptionIs, setSelOptionIs] = useState("")
//   const [bgColor, setBgColor] = useState("")
//   const [fontColor, setFontColor] = useState("#000")

//   const open = Boolean(anchorEl)
//   const [sliderInfo, setSliderInfo] = useState({
//     open: false,
//     title: '',
//     sliderData: {},
//   })

//   useEffect(()=>{
//     if(kind.status==="available"){
//       setBgColor("#fff")
//     }else if(["booked", 'agreement_pipeline', 'agreement', 'allotment','possession', 'construction', 'registered'].includes(kind.status)){
//       setBgColor("#CCFBF1")
//       // setBgColor("#22c55e29")
//       // setFontColor("#118d57")
//     }else if(["blocked", 'customer_blocked', 'management_blocked'].includes(kind.status)){
//       setBgColor("#e9e9e9")
//     }else {
//       setBgColor("#F7EAD0")
//       setFontColor("#B76E00")
//     }
//   }, [kind])
//   const handleSliderClose = () => {
//     setSliderInfo({
//       open: false,
//       title: '',
//       sliderData: {},
//     })
//   }

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     console.log('was this from here' )
//     setAnchorEl(event.currentTarget)
//   }


//   return (
//     <div
//       className={` min-w-[145px] z-10 flex flex-col  max-w-md p-2 mx-auto my-0 rounded-lg cursor-pointer border border-black-600 shadow-radius shadow-xl`}
//       style={{ backgroundColor: bgColor, color: fontColor}}
//     >
//       <div className="flex flex-row items-center justify-between">
//         <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight  border-0 border-gray-200 sm:text-1xl md:text-1xl ">
//           {kind?.unit_no}

//         </h3>

//         {/* <DropCompUnitStatus
//             type={'unitMode'}
//             id={'id'}
//             pickCustomViewer={handleClose}
//           /> */}
//       </div>
//       <div className="flex flex-row justify-between px-2">
//         <span className="flex flex-row items-center justify-between mr-2">
//           <span className="text-[10px] font-">
//             {kind?.super_built_up_area || kind?.area || 0} sqm

//           </span>
//         </span>
//         <span className="flex flex-row items-center justify-between ">
//           <span className="text-[10px] font-">
//             {kind?.size || kind?.size || 0}

//           </span>
//         </span>


//       </div>

//       {/* <SiderForm
//         open={sliderInfo.open}
//         setOpen={handleSliderClose}
//         title={sliderInfo.title}
//         data={sliderInfo.sliderData}
//       /> */}
//     </div>
//   )
// }

// export default UnitsSmallViewCard




/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { MenuItem, styled } from '@mui/material'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const UnitsSmallViewCard = ({ kind, feedData, bg, setSelUnitDetails,
  setShowCostSheetWindow,
  setSelMode, }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selOptionIs, setSelOptionIs] = useState("")
  const [fontColor, setFontColor] = useState("#000")
  const [buildingColor, setBuildingColor] = useState("#FCC8BA")
  const [roofColor, setRoofColor] = useState("#F44D21")

  const open = Boolean(anchorEl)
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })

  useEffect(() => {
    if (kind.status === "available") {
      setBuildingColor(" #F0F0F0")
      setRoofColor("#00c9a7")
      setFontColor("#000000")
    } else if (["booked", 'agreement_pipeline', 'agreement', 'allotment', 'possession', 'construction', 'registered'].includes(kind.status)) {
      setBuildingColor("#F0F0F0") // Light green for booked
      setRoofColor("#b0a8b9") // Dark green roof
      setFontColor("#000000") // Dark green text
    } else if (["blocked", 'customer_blocked', 'management_blocked'].includes(kind.status)) {
      setBuildingColor("#F0F0F0") // Gray for blocked
      setRoofColor("#FAAD99") // Dark gray roof
      setFontColor("#000000") // Dark gray text
    } else {
      setBuildingColor("#FDE68A") // Light yellow for others
      setRoofColor("#B45309") // Dark yellow roof
      setFontColor("#000000")
    }
  }, [kind])

  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('was this from here')
    setAnchorEl(event.currentTarget)
  }

  const UnitSvgWithDetails = () => (
    <svg
      width="99"
      height="99"
      viewBox="0 0 119 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        setSelUnitDetails(kind)
        setShowCostSheetWindow(true)
        setSelMode('edit')
      }}
      className="cursor-pointer"
    >
      {/* Building background */}
      <path
        d="M26.0061 0H92.3734C95.2974 0 97.9884 1.59524 99.3918 4.16045L113.289 29.5641C113.933 30.7413 114.271 32.0617 114.271 33.4036L114.271 99.7936C114.271 103.619 111.17 106.72 107.345 106.72V112.281C107.345 115.991 104.338 118.997 100.629 118.997C96.9194 118.997 93.9125 115.991 93.9125 112.281V106.72H24.6969V112.224C24.6969 115.965 21.6641 118.997 17.9231 118.997C14.1821 118.997 11.1493 115.965 11.1493 112.224V106.72C7.41371 106.72 4.38538 103.691 4.38538 99.9557V31.9416C4.38538 30.5546 4.74602 29.1913 5.43191 27.9857L19.0526 4.04408C20.4749 1.54406 23.1298 0 26.0061 0Z"
        fill={buildingColor}
      />

      {/* Roof */}
      <path
        d="M101.705 27.7051C101.705 32.3855 97.9109 36.1795 93.2305 36.1797C88.5498 36.1797 84.7552 32.3856 84.7549 27.7051C84.7545 32.3856 80.9599 36.1796 76.2793 36.1797C71.7447 36.1797 68.0415 32.6188 67.8145 28.1406L67.8037 27.7051C67.8033 32.3856 64.0088 36.1797 59.3281 36.1797C54.6475 36.1797 50.8529 32.3856 50.8525 27.7051C50.8522 32.3856 47.0576 36.1797 42.377 36.1797C37.6964 36.1795 33.9017 32.3855 33.9014 27.7051C33.901 32.3855 30.1072 36.1795 25.4268 36.1797C20.7461 36.1797 16.9515 32.3856 16.9512 27.7051C16.9508 32.3856 13.1562 36.1796 8.47559 36.1797C3.79494 36.1797 0.000359783 32.3856 0 27.7051V18.1689H101.705V27.7051ZM118.656 27.7051C118.656 32.3856 114.861 36.1797 110.181 36.1797C105.5 36.1795 101.706 32.3855 101.706 27.7051V18.1689H118.656V27.7051ZM118.656 18.168H0L22.0684 0H96.707L118.656 18.168ZM30.209 2.13281C29.5894 2.13288 29.0046 2.41977 28.626 2.91016L20.9824 12.8145C19.9683 14.1292 20.9058 16.0361 22.5664 16.0361H33.2197C33.9636 16.036 34.6461 15.6228 34.9912 14.9639L40.1748 5.05957C40.8714 3.72812 39.906 2.13311 38.4033 2.13281H30.209ZM55.9199 2.13281C54.929 2.13296 54.0881 2.85874 53.9424 3.83887L52.4707 13.7422C52.2915 14.9503 53.2278 16.0361 54.4492 16.0361H65.5557C66.8397 16.0361 67.7914 14.8427 67.5059 13.5908L65.2441 3.6875C65.0364 2.77803 64.2278 2.13294 63.2949 2.13281H55.9199ZM80.2539 2.13281C78.7511 2.1328 77.785 3.72803 78.4814 5.05957L83.665 14.9639C84.0102 15.623 84.6934 16.0361 85.4375 16.0361H96.0908C97.7514 16.036 98.6881 14.1292 97.6738 12.8145L90.0312 2.91016C89.6526 2.41959 89.067 2.13283 88.4473 2.13281H80.2539Z"
        fill={roofColor}
      />

{/* Unit number - Centered */}
<text
  x="50%"
  y="50%"
  dominantBaseline="middle"
  textAnchor="middle"
  fill={fontColor}
  fontFamily="Arial"
  fontSize="16"
  fontWeight="bold"
>
  {kind?.unit_no}
</text>

{/* Area info - Bottom left */}
<text
  x="10%"
  y="75%"
  dominantBaseline="middle"
  textAnchor="start"
  fill={fontColor}
  fontFamily="Arial"
  fontSize="10"
>
  {(kind?.super_built_up_area || kind?.area || 0) + ' sqft'}
</text>

{/* Status info - Bottom right */}
<text
  x="90%"
  y="75%"
  dominantBaseline="middle"
  textAnchor="end"
  fill={fontColor}
  fontFamily="Arial"
  fontSize="10"
  fontStyle="italic"
>
  {kind?.status || ''}
</text>

    </svg>
  )

  return (
    <div>
      <UnitSvgWithDetails />
    </div>
  )
}

export default UnitsSmallViewCard