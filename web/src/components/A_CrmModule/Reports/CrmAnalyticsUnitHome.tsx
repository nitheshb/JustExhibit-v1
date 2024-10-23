/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import {
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Link } from '@redwoodjs/router'

import SiderForm from 'src/components/SiderForm/SiderForm'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import 'flowbite'

import '../../../styles/myStyles.css'
// import Chart from 'react-apexcharts'
import ApexChart from '../../Apex_chart/ApexChart'
import Conversion_rates from '../../Apex_chart/Conversion_rates'
import PieChart from '../../Apex_chart/PieChart'
import RadarChart from '../../Apex_chart/RadarChart'

import CircleBar from './CircleBar'
import ReportBars from './ReportBars'
import TransactionCard from './TransactionCard'
import UnitStatusCardReport from './UnitStatusCardReport'
import { CountUpComp } from 'src/components/comps/countUpComp'

const CrmAnalyticsUnitHome = ({ project }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { user } = useAuth()

  const { orgId } = user


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


      <div className="bg-[#E3E9EF] mt- mr-1 py-2 mb-2 leading-7 text-gray-900  rounded-lg flex flex-row justify-between">
        <div className="bg-white h-[422px] w-[20%] ml-3 rounded-lg flex flex-col">
          <div className="bg-[#023E8A] h-[24%] w-full rounded-t-lg px-2 py-3 flex flex-col">
            <div className="flex flex-row">
              <svg
                className="svgIcon mt-[2px]"
                focusable="false"
                viewBox="0 0 18 24"
                aria-hidden="true"
              >
                <path
                  d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
              </svg>
              <div className=" ml-1 text-white text-[16px] font-bold leading-1">
                Collections
              </div>
            </div>
            <div className=" ml-2 text-white text-[9px] leading-[18px]">
              Overall 10% revnue share contribution{' '}
            </div>
          </div>
          <div>
            <CircleBar />
          </div>
         <div>
         <TransactionCard projectDetails={project} />
         </div>

        </div>
        {/* section - 2 */}
        <section className=" flex flex-col   w-[60%] mx-1">
             {/* lower section */}
             <div className="bg-white h-[70px]  w-full rounded-lg">
            <div className="bg-[#023E8A] w-full rounded-t-lg px-2 py-3 flex flex-col">
              <div className="flex flex-row">
                <svg
                  className="svgIcon mt-[2px]"
                  focusable="false"
                  viewBox="0 0 18 24"
                  aria-hidden="true"
                >
                  <path
                    d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                  ></path>
                  <path
                    d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                  ></path>
                  <path
                    d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                  ></path>
                </svg>
                <div className=" ml-1 text-white text-[16px] font-bold leading-1">
                  {eventName}
                </div>
              </div>
              <div className=" ml-2 text-white text-[9px] leading-[18px]">
                Overall {area} sqft share contribution{' '}
              </div>
            </div>
          </div>
          <div className="bg-white w-full mb-1 rounded-b-lg ">
            <div className="flex flex-row py-3 px-2">
              <svg
                className="svgIcon mt-[2px] text-green-900"
                focusable="false"
                viewBox="0 0 18 24"
                aria-hidden="true"
              >
                <path
                  d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
              </svg>
              <div className="  ml-1 text-[16px] font-bold leading-1">
                Area Summary
              </div>
            </div>
            <div className="px-4 mb-4 ">
              {[
                { item: 'Sold', value: soldUnitCount || 0, sqft: 72851, bua: 127195, price: 0 },
                {
                  item: 'Available',
                  value: availableCount || 0,
                  sqft: 21355,
                  bua: 37051,
                  price: 0,
                },
                { item: 'Blocked', value:  blockedUnitCount || 0, sqft: 2312, bua: 3127, price: 0 },
                {
                  item: 'Management Blocked',
                  value: blockedUnitCount || 0 ,
                  sqft: 28903,
                  bua: 41612,
                  price: 0,
                },
              ].map((data, i) => (
                <div className="flex flex-row " key={i}>
                  <Box className="w-[75%] mt-[5px]">
                    <div className="flex flex-row align-middle justify-between mb-2 mt-[3px]">
                      <h6 className="font-bodyLato font-semibold text-sm">
                        {data?.item}
                      </h6>
                      <span className="font-bodyLato text-[12px] text-[#94A4C4] mt-[5px]">
                        {/* {userTodayPerfA?.followup_comp || 0}/{userTodayPerfA?.followup} */}
                        <section className="leading-[0px]">
                          <span className="font-light text-xs ">
                          <CountUpComp
                                            value={data?.value}
                                          /> Stalls - {data?.sqft} sqft
                          </span>
                        </section>
                      </span>
                    </div>

                    <LinearProgress
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#0077B6',
                        },
                      }}
                      variant="determinate"
                      value={50}
                      style={{
                        backgroundColor: '#ADE8F4',
                        borderRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderBottomRightRadius: '3px',
                        height: `${8}px`,
                        width: `100%`,
                      }}
                    />
                  </Box>
                  <section
                    className={`flex flex-col text-right w-[25%] bg-[#ade8f4] border-b ml-1 ${
                      i == 0 ? 'rounded-t-lg' : ''
                    } ${i == 3 ? 'rounded-b-lg pb-[13px]' : ''}`}
                  >
                    <span className="font-semibold text-md text-[#0077B6] mt-[9px] pr-2 flex flex-row justify-between">
                      {/* <span className='border rounded-full w-6 h-6 ml-1 mt-[2px]'>S</span> */}
                      <svg
                        className="svgIcon mt-[6px] ml-3 text-[16px] text-black"
                        focusable="false"
                        viewBox="0 0 18 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fillOpacity="0"
                        ></path>
                        <path
                          d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fillOpacity="0"
                        ></path>
                        <path
                          d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fillOpacity="0"
                        ></path>
                      </svg>
                      ₹0,00,00,000
                    </span>
                  </section>
                </div>
              ))}
            </div>
          </div>


          <div className="flex flex-col bg-white shadow rounded-md mt-  px-2  py-2">
      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-4">
        {'Transactions'}
      </h6>
      <div className="flex flex-row justify-between px-1">
        {[
          { item: 'Total Leads', value: soldValue || 0 },
          { item: 'Conversion Rate', value: t_collect || 0 },
          { item: 'Legal Issues ', value: t_mtd || 0 },
          { item: 'Construction ', value: t_mtd || 0 },
          { item: 'CP ', value: t_mtd || 0 },
        ].map((data, i) => (
          <div
            className=" w-1/4  mx-1"
            style={{ display: 'inline-block', alignSelf: 'flex-end' }}
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
      {/* <div className="flex flex-row justify-between px-1 mt-3">
        {[
          { item: 'Balance', value: 0 },
          { item: 'Refunds', value: 0 },
          { item: '', value: '' },
        ].map((data, i) => (
          <div
            key={i}
            className=" w-1/4  mx-1"
            style={{ display: 'inline-block', alignSelf: 'flex-end' }}
          >
            <div className="flex flex-col  justify-center mr-1  mb-1 mt[2px]">
              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                ₹{data.value}
              </h6>
              <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                {data.item}
              </h6>
            </div>
          </div>
        ))}
      </div> */}
    </div>
        </section>
        {/* section - 3 */}
        <div className="bg-white h-[300px] w-[20%] mr-3 rounded-lg">
          <div className="bg-[#023E8A] h-[24%] w-full rounded-t-lg px-2 py-3 flex flex-col">
            <div className="flex flex-row">
              <svg
                className="svgIcon mt-[2px]"
                focusable="false"
                viewBox="0 0 18 24"
                aria-hidden="true"
              >
                <path
                  d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
                <path
                  d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                ></path>
              </svg>
              <div className=" ml-1 text-white text-[16px] font-bold leading-1">
                Sales
              </div>
            </div>
            <div className=" ml-2 text-white text-[9px] leading-[18px]">
              Overall 10% Sale share contribution{' '}
            </div>
          </div>
          {/* <div className=" px-3">
            <ReportBars />
          </div> */}
          <section className="flex flex-col">
          <section className="mt-2 flex flex-row justify-between px-2">
            {[
              { lab: 'JUN', value: '2' },
              { lab: 'JUL', value: '5' },
              { lab: 'AUG', value: '3' },
              { lab: 'SEP', value: '10' },
            ].map((d, i) => (
              <section className=" flex flex-col" key={i}>
                <span className="text-[10px] text-center font-bold">
                  {d?.value}
                </span>
                <LinearProgress
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#0077B6',
                    },
                  }}
                  variant="determinate"
                  value={100}
                  style={{
                    backgroundColor: '#ADE8F4',
                    borderRadius: '3px',
                    borderTopRightRadius: '3px',
                    borderBottomRightRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    height: `100px`,
                    width: `38px`,
                  }}
                />

                <span className="text-[10px] text-center">{d?.lab}</span>
              </section>
            ))}
          </section>
          <div
      style={{

        top: '80%',
        left: '40%',
        padding: '0 0.5rem',
        fontSize: '0.9rem',
        color: '#4fa183',
        textAlign: 'center',
      }}
      className="bg-[#57c0d0] text-center"
    >
      <span className="text-white">SEP</span>
    </div>
          </section>

          <section className="bg-[EFFCFF]"><UnitStatusCardReport project={project} /></section>
        </div>
      </div>
    </div>
  )
}

export default CrmAnalyticsUnitHome
