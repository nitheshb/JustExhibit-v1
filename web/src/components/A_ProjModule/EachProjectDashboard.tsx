// import { useState } from 'react'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { Box, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Link, routes } from '@redwoodjs/router'

import ProjectMetrics2 from './Comps/ModularDispCard/MetricsProjectCard2'
import ProjectMetrics3 from './Comps/ModularDispCard/MetricsProjectCard3'
import ModularProjectMetrics from './Comps/ModularDispCard/ModularDispCard'

const EachProjectDashboard = ({ project, onSliderOpen = () => {}, isEdit }) => {
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

  const { t } = useTranslation()

  return (
    // <div className="px-4 pb-[0.1px] flex bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 ">
    <>
      <Link to={routes.projectEdit({ uid })}>
        <section className="flex flex-col">
          <div className=" bg-[#E9E9F2]">
            <div className="">
              <section className="flex flex-row">
                <section className="flex flex-col mt-1">
                  <div className="w-[317px] h-[210px] relative bg-indigo-600 rounded-md border border-slate-200 mx-1">
                    {/* <div className="w-[130px] h-[130px] left-[197px] top-[31px] absolute opacity-50 bg-gradient-to-b from-white to-white rounded-full" /> */}
                    <div className="w-[220px] left-[32px] top-[31px] absolute justify-start items-center gap-3 inline-flex">
                      <div className="w-11 h-11 relative rounded-[25px] mr-1">
                        <div className="w-11 h-11 left-0 top-0 absolute bg-violet-100 rounded-[25px]" />
                        <img
                          className="w-10 h-10"
                          alt=""
                          src="/apart.svg"
                        ></img>
                      </div>
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="self-stretch justify-start items-start gap-[5px] inline-flex">
                          <div className="text-white text-sm font-bold  leading-[27px]">
                            {eventName}
                          </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-[5px] inline-flex">
                          <span className="text-sm  font-light  font text-gray-200 mt-[2px] ">
                            {location},
                          </span>
                          <span>
                            <span className="text-sm  font-light  font text-gray-200 ">
                              {area}
                            </span>
                            <span className="text-[10px]  font-light ml-1 font text-gray-300 ">
                              sqft
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section>
                    <div className="flex flex-col bg-white shadow rounded-md my-1 mx-1  px-2  py-2">
                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-4">
                        {'Stalls'}
                      </h6>
                      <div className="flex flex-row h-[101px]">
                        {[
                          { item: 'Total', value: totalUnitCount || 0 },
                          { item: 'Available', value: availableCount || 0 },
                          { item: 'Sold', value: soldUnitCount || 0 },
                          { item: 'Blocked', value: blockedUnitCount || 0 },
                          // { item: 'M_Blocked', value: blockedUnitCount || 0 },
                        ].map((data, i) => (
                          <div
                            className=" w-1/4  mx-1"
                            style={{
                              display: 'inline-block',
                              alignSelf: 'flex-end',
                            }}
                            key={i}
                          >
                            <h6 className="font-bodyLato flex justify-center font-semibold text-xs mt-1">
                              {t(data?.value)}
                            </h6>

                            <div className="">
                              <LinearProgress
                                sx={{
                                  backgroundColor: 'white',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#57c0d0',
                                  },
                                }}
                                variant="determinate"
                                value={100}
                                style={{
                                  backgroundColor: '#22D3EE',
                                  borderRadius: '3px',
                                  height: `${
                                    58 * (data.value / totalUnitCount)
                                  }px`,
                                  width: `100%`,
                                }}
                              />
                            </div>
                            <div className="flex  justify-center mr-1  mb-1 mt[2px]">
                              <h6 className="font-bodyLato  text-xs mt-1">
                                {t(data.item)}
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </section>
                <ProjectMetrics2 project={project}/>
                <section>
                  <ModularProjectMetrics  project={project}/>
                </section>

                <ProjectMetrics3 project={project} />
              </section>

            </div>
          </div>



        </section>
      </Link>
    </>
  )
}

export default EachProjectDashboard
