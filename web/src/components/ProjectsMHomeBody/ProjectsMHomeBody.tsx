/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { useState } from 'react'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState } from 'react'

import { PencilIcon, EyeIcon } from '@heroicons/react/outline'
import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons'
import { Box, LinearProgress, useTheme } from '@mui/material'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

import { Link, routes } from '@redwoodjs/router'

import Card2 from '../A_ProjModule/Comps/Card2'
import ProjectProgressDisplayCard from '../A_ProjModule/Comps/ProjectProgressDisplayCard'
import CircleProgress from '../Charts_Graphs/CircleProgress'
import PieChartProject from '../comps/pieChartProject'
import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
import SiderForm from '../SiderForm/SiderForm'
import { prettyDate } from 'src/util/dateConverter'

const ProjectsMHomeBody = ({
  project,
  setProject,
  onSliderOpen = () => {},
  isEdit,
}) => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const handleNewProjectClose = () => setIsNewProjectOpen(false)

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
    projectName,
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

  const data = {
    series: [
      {
        name: 'Spent',
        data: [22, 80, 36, 50, 60, 30],
      },
    ],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  }
  const theme = useTheme()
  const { t } = useTranslation()
  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors: ['#5928E5'],
    dataLabels: {
      enabled: false,
    },
    // fill: { opacity: 1 },
    grid: {
      show: false,
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: data.categories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '60%',
        rangeBarOverlap: false,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  }


  const chartSeries = data.series
  return (
    // <div className="px-4 pb-[0.1px] flex bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 ">
    <>
      <div onClick={() => setIsNewProjectOpen(true)} className="cursor-pointer mx-2 mb-2 rounded-xl bg-white shadow-full shadow border p-2">
        <div className="flex flex-row mb-[2px] ">
          <div className="w-2/4">
            <div className="">
              <div className="MuiPaper-elevation  MuiPaper-elevation1 MuiCard-root css-1fwf2za-MuiPaper-root-MuiCard-root bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-r-xl">
                <Box mt={3} mb={1}>
                  <div className="flex flex-col align-middle justify-between">
                    <Link
                      className="flex flex-col items-center"
                      // to={routes.projectEdit({ uid })}
                    >
                      <img className="w-10 h-10" alt="" src="/apart.svg"></img>
                      <span className="relative  flex items-center w-auto text-md font-bold leading-none pl-0 mt-[8px]">
                        {projectName}
                      </span>
                    </Link>
                  </div>


                  <section className="flex flex-row justify-between mt-2">
                    <span className="text-sm  font-light  font text-gray-800 ">
                      {projectType?.name}
                    </span>
                    <section>
                      <span className="text-sm  font-light  font text-gray-800 ">
                        {area}
                      </span>
                      <span className="text-[10px]  font-light ml-1 font text-gray-600 ">
                        sqft
                      </span>
                    </section>
                  </section>
                </Box>
              </div>
            </div>
          </div>
          <div className="w-2/4  px-1">
            <div className="flex flex-col bg-white  my-2  px-2  py-2">
              <h6 className="font-bodyLato font-semibold text-md my-1">
              {project?.eventName}
              </h6>

              <span className='text-[12px]'>{prettyDate(project?.eventStartDate)} - {prettyDate(project?.eventEndDate)} </span>
              <span className='text-[12px]'>{project?.location}</span>
              <span className='text-[12px]'>{project?.city}</span>







            </div>
          </div>
          <div className="w-3/4 px-1 ">
            {' '}
            <Box>
              <>
                <div className="flex flex-col bg-white shadow rounded-md my-2  px-2  py-2">
                  <h6 className="font-bodyLato font-semibold text-xs m-1 mb-4">
                    {'Units'}
                  </h6>
                  <div className="flex flex-row h-[101px]">
                    {[
                      { item: 'Total', value: totalUnitCount || 0 },
                      { item: 'Available', value: availableCount || 0 },
                      { item: 'Sold', value: soldUnitCount || 0 },
                      { item: 'Blocked', value: blockedUnitCount || 0 },
                      { item: 'Mang B', value: blockedUnitCount || 0 },
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
                              height: `${58 * (data.value / totalUnitCount)}px`,
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
              </>
            </Box>
          </div>
          <div className="w-2/4 ">
            <div className="flex flex-col bg-white shadow rounded-md my-2  px-2  py-2">
              <h6 className="font-bodyLato font-semibold text-xs m-1 mb-4">
                {'Status Pipeline'}
              </h6>
              <div className="flex flex-row justify-between px-1">
                {[
                  { item: 'Total', value: bookUnitCount || 0 },
                  { item: 'Booking', value: bookUnitCount || 0 },
                  { item: 'Agreement', value: s_agreeCount || 0 },
                ].map((data, i) => (
                  <div
                    className=" w-1/4  mx-1"
                    style={{ display: 'inline-block', alignSelf: 'flex-end' }}
                    key={i}
                  >
                    <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                      <h6 className="font-bodyLato font-semibold text-xs mt-1">
                        {t(data.value)}
                      </h6>
                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                        {t(data.item)}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-between px-1 mt-3">
                {[
                  { item: 'Registration', value: s_registerCount || 0 },
                  { item: 'Construction', value: s_constCount || 0 },
                  { item: 'Possession', value: s_possCount || 0 },
                ].map((data, i) => (
                  <div
                    className=" w-1/4  mx-1"
                    style={{ display: 'inline-block', alignSelf: 'flex-end' }}
                    key={i}
                  >
                    <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
                      <h6 className="font-bodyLato font-semibold text-xs mt-1">
                        {t(data.value)}
                      </h6>
                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                        {t(data.item)}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <SiderForm
        open={isNewProjectOpen}
        setOpen={handleNewProjectClose}
        title="project_details"
        data={project}
        setProject={setProject}
        widthClass="max-w-4xl"
      />
    </>
  )
}

export default ProjectsMHomeBody
