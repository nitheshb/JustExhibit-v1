/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'
import {
  useTheme,
} from '@mui/material'
import { QrCode, Scan } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  getAllProjects,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'
import '../../styles/myStyles.css'
import QRGenerator from '../0_EventKit/QrGenerator'
import QRScanner from '../0_EventKit/QrScanner'
import DummyBodyLayout from '../DummyBodyLayout/DummyBodyLayout'
import UnitBookingSummaryHomePage from './Reports/bookingSummaryHome1'
import CrmCollectionReport from './Reports/collectionReport'
import CreditNoteSummaryHomePage from './Reports/creditNoteSummaryHome'
import CrmSummaryReport from './Reports/Crm_SummaryReport'
import CrmAnalyticsUnitHome from './Reports/CrmAnalyticsUnitHome'
import CrmMortgageSummaryTable from './Reports/CrmMortgageSummary'
import CrmProjectionReport from './Reports/CrmProjectionReport'
import CrmInventorySummaryTable from './Reports/CrmSummaryTable'

const CrmAnalyticsHome = ({ project }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])
  const [selCat, setSelCat] = useState('booking_summary')
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate')

  useEffect(() => {
    getProjects()
  }, [])
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.eventName
          user.value = user?.uid
        })
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  return (
    <div>
      <div className="flex overflow-x-auto ml border-b pb-2">
        <div className="flex items-center flex-shrink-0   border-grey maahome">
          {/* <Link
                className="flex items-center"
               // to={routes.projectEdit({ uid })}
              > */}

          <span className="relative  flex items-center w-auto text-xl font-bold leading-none pl-0 mt-[18px]"></span>
          {/* </Link> */}
        </div>
        {[
          { label: 'Booking Summary', value: 'booking_summary' },
          { label: 'Collections', value: 'collection_performance' },
          { label: 'Stalls Inventory Report', value: 'crm_table' },
          {
            label: 'Collection Projection Report',
            value: 'crm_projection_report',
          },

          { label: 'Event Summary', value: 'proj_summary' },
          { label: 'Mortgage Details', value: 'mortgage_details' },
          { label: 'Credit Note', value: 'creditnote_summary' },
          { label: 'Qr code scanner', value: 'qrCodeScanner' },
          // { label: 'Collections', value: 'collections-summary' },
          // { label: 'Home', value: 'crm_summary' },
          // { label: 'Source Report', value: 'source_report' },
          // { label: 'Employee Report', value: 'emp_status_report' },
          // { label: 'Event Leads Report', value: 'proj_leads_report' },
          //  { label: 'Employee Leads Aging', value: 'emp_leads_report' },
        ].map((data, i) => {
          return (
            <section
              key={i}
              className="flex  mt-[18px]"
              onClick={() => {
                console.log('am i clicked', data.value)
                setSelCat(data.value)
              }}
            >
              <button>
                <span
                  className={`flex mr-2 items-center py-3 px-3 text-xs flex flex-col  min-w-[120px] ${
                    selCat === data.value
                      ? 'font-normal text-green-800 bg-[#FFEDEA]'
                      : 'font-normal text-black-100 bg-[#f0f8ff]'
                  }  rounded`}
                >
                  {/* <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" /> */}
                  <img alt="" src="/temp2.png" className="h-5 w-5 mr-1 mb-1" />
                  {data?.label}
                </span>
              </button>
            </section>
          )
        })}
      </div>
      {selCat === 'proj_summary' && (
        <section className=" mt-1 mr-1 py-8 mb-2 leading-7 text-gray-900 bg-white  rounded-lg  ">
          {/* <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <section className="flex flex-row justify-between">
            <div className="">
              <h3 className="h1MainText">Congratulations Nithesh! 🎉</h3>
              <p className="subText montF">
                You have done <span>76%</span> more sales today. <br></br>
                Check your inventory and update your stocks.
              </p>
              <div className="montF MuiBox-root cardBg">
                <div className="montF flex w-full">
                  <svg
                    className="svgIcon"
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
                  <div className="ml-2 w-full">
                    <div className="flex flex-row justify-between">
                      <span className="whiteSmallText">Star Seller</span>
                      <span className="whiteSmallText">76%</span>
                    </div>
                    <span
                      className="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-rr2k8m-MuiLinearProgress-root"
                      role="progressbar"
                      aria-valuenow="76"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span
                        className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-1fakg6h-MuiLinearProgress-bar1"
                        style={{ transform: 'translateX(-24%)' }}
                      ></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiBox-root css-0">
              <img src="/userDashboard.svg" width="100%" alt="User" />
            </div>
          </section>
        </div> */}

          <div className="px-2 mt-2">
            {projects.map((project) => (
              <CrmAnalyticsUnitHome
                key={project.uid}
                project={project}
                // onSliderOpen={() => {
                //   setProject(project)
                //   setIsEditProjectOpen(true)
                // }}
                // isEdit={false}
              />
            ))}
            {projects.length === 0 && <DummyBodyLayout />}
          </div>
        </section>
      )}
      {selCat === 'booking_summary' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <UnitBookingSummaryHomePage />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'crm_summary' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CrmSummaryReport />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'crm_table' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CrmInventorySummaryTable projects={projects} />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'mortgage_details' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CrmMortgageSummaryTable projects={projects} />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'crm_projection_report' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CrmProjectionReport projects={projects} />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}
      {selCat === 'collection_performance' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CrmCollectionReport projects={projects} />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'creditnote_summary' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <CreditNoteSummaryHomePage />

          {projects.length === 0 && <DummyBodyLayout />}
        </div>
      )}

      {selCat === 'qrCodeScanner' && (
        <div className="">
          {/* <AdvancedDataTableTest /> */}
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  QR Code Generator & Scanner
                </h1>
                <p className="text-lg text-gray-600">
                  Generate QR codes from form data or scan existing codes
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => setActiveTab('generate')}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                      activeTab === 'generate'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    Generate
                  </button>
                  <button
                    onClick={() => setActiveTab('scan')}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                      activeTab === 'scan'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Scan className="w-4 h-4" />
                    Scan
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                {activeTab === 'generate' ? <QRGenerator /> : <QRScanner />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CrmAnalyticsHome
