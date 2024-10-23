import React, { useEffect, useState } from 'react'

const ProjectMetrics2 = ({ project }) => {
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
      <div className="flex flex-col bg-white shadow rounded-md my-2   px-3  py-3 ml-1">
        <section className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
              {'Values'}
            </h6>
            <h6 className="font-bodyLato  text-xs m-1 mb-2">
              ₹{totalValue?.toLocaleString('en-IN') || 0}
            </h6>
          </div>
          <div className="w-[241.03px] h-[0px] border border-stone-300 mb-2"></div>
          <section className="flex flex-row px-1">
            <div className="flex flex-col  w-[33%] ml-1">
              {[
                { item: 'Sold', value: soldValue || 0 },
                { item: 'Collected', value: t_collect || 0 },
              ].map((data, i) => (
                <div
                  className=" mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      ₹{data?.value?.toLocaleString('en-IN')}
                    </h6>
                    <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                      {data.item}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col  w-[33%] mx-3">
              {[
                { item: 'UnSold', value: `${totalValue - soldValue}` || 0 },
                { item: 'Balance', value: t_bal || 0 },
              ].map((data, i) => (
                <div
                  className="mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      ₹{Number(data?.value)?.toLocaleString('en-IN')}
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
                { item: 'Refund', value: t_refund || 0 },
                { item: 'MTD', value: t_mtd || 0 },
              ].map((data, i) => (
                <div
                  className="mt-1 mb-2 "
                  style={{ display: 'inline-block', alignSelf: 'flex-start' }}
                  key={i}
                >
                  <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                    <h6 className="font-bodyLato font-semibold text-xs mt-1">
                      ₹{data?.value?.toLocaleString('en-IN')}
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
        <section className="flex flex-col mt-[34px] mb-[14px]">
          <div className="flex flex-row justify-between">
            <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
              {'CRM Pipeline'}
            </h6>
            <h6 className="font-bodyLato  text-xs m-1 mb-2">0</h6>
          </div>
          <div className="w-[241.03px] h-[0px] border border-stone-300 mb-2"></div>
          <section className="flex flex-row px-1">
            <div className="flex flex-col  w-[33%] ml-1">
              {[
                { item: 'Booked', value: 0 },
                { item: 'Construction', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mb-2 "
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
            <div className="flex flex-col  w-[33%]  mx-2">
              {[
                { item: 'Agreement', value: 0 },
                { item: 'Possession', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mt-1 "
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
            <div className="flex flex-col  w-[33%] ml-2">
              {[
                { item: 'Registered', value: 0 },
                { item: 'Cancelled', value: 0 },
              ].map((data, i) => (
                <div
                  className=" mt-1 "
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

export default ProjectMetrics2
