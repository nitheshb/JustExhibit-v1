import React, { useEffect, useState } from 'react'

const ModularProjectMetrics = ({ project }) => {
  const {
    totalEstValue,
    totalPlotArea,
    totalValue,
    soldValue,
    availValue,
    bookValue,
    blockValue,
    holdValue,
    totalArea,
    soldArea,
    availArea,
    bookArea,
    blockArea,
    holdArea,
    totalUnitCount,
    soldUnitCount,
    blockedUnitCount,
    availableCount,
    bookUnitCount,
    blockUnitCount,
    area,
    builderName,
    location,
    eventName,
    projectType,
    uid = 0,
    s_agreeCount,
    s_registerCount,
    s_constCount,
    s_possCount,
    t_collect,
    t_mtd,
    t_bal,
    t_refund,
  } = project
  return (
    <div>
      <div className="flex flex-col bg-white shadow rounded-md my-2   px-3  py-3 mx-1">
        <section className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
              {'Leads'}
            </h6>
            <h6 className="font-bodyLato  text-xs m-1 mb-2">0</h6>
          </div>
          <div className="w-[241.03px] h-[0px] border border-stone-300 mb-2"></div>
          <section className="flex flex-row px-1">
            <div className="flex flex-col  w-[33%] ml-1">
              {[
                { item: 'InProgress', value: 0 },
                { item: 'Site Visits', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-[33%] ml-1 mx">
              {[
                { item: 'Booked', value: 0 },
                { item: 'Not Interest', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-[33%] ml-1">
              {[{ item: 'Archieved', value: 0 }].map((data, i) => (
                <div
                  className=" mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* section 2 */}
        <section className="flex flex-col mt-4">
          <div className="flex flex-row justify-between">
            <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
              {'Site Visit Feedback'}
            </h6>
            <h6 className="font-bodyLato  text-xs m-1 mb-2">0</h6>
          </div>
          <div className="w-[241.03px] h-[0px] border border-stone-300 mb-2"></div>
          <section className="flex flex-row px-1">
            <div className="flex flex-col  w-[33%] ml-1">
              {[
                { item: 'Visits', value: 0 },
                { item: 'Not Interest', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mb-2"
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-[33%] ml-1 mx">
              {[
                { item: 'Booked', value: 0 },
                { item: 'Liked', value: 0 },
              ].map((data, i) => (
                <div
                  className="  mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-[33%] ml-1">
              {[
                { item: 'Inprogress', value: 0 },
                { item: 'Dislike', value: 0 },
              ].map((data, i) => (
                <div
                  className="  mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      {data.value}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default ModularProjectMetrics
