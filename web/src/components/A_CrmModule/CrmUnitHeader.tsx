import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'

const CrmUnitHeader = ({ projectDetails }) => {
  const { user } = useAuth()
  const { orgId } = user

  useEffect(() => {
    console.log('projectDetails', projectDetails)
  }, [projectDetails])

  return (
    <>
      <div className="flex flex-row justify-between ">
        {/* <h1 className="font-playfair text-[19px]  text-gray-700   ">
          {projectDetails?.eventName?.toUpperCase()}
        </h1> */}

        <img className="w-[80px]" src={'/nirvana_logo.png'} alt="" />

        <div className="pt-2 flex flex-row">
          {/* <img
            className="h-6 w-24 "
            alt="barcode"
            src="https://t4.ftcdn.net/jpg/02/28/23/91/240_F_228239110_4eEmhcqbUpZG8y1x1aazFBQMVmbGjoce.jpg"
          /> */}
          <img
            className="w-[98px] h-[51px] mt-[8px]"
            alt="barcode"
            src="/ps_logo.png"
          />
          <img
            className="w-[89px] h-[42px] ml-4 mt-[15px]"
            alt="barcode"
            src="/maahomes_logo.png"
          />
          {/* <div className=" text-center">
            <span className="tracking-widest font-bodyLato  text-gray-400 text-[10px] mb-[2px]">
              23456788
            </span>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default CrmUnitHeader
