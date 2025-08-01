import { useState, useEffect } from 'react'

import { PencilIcon } from '@heroicons/react/outline'

import { MetaTags } from '@redwoodjs/web'

import CrmHome from 'src/components/A_CRMcomp/CrmHome'
import CrmTaskList from 'src/components/A_CRMcomp/CrmTaskList'
import CrmAnalyticsHome from 'src/components/A_CrmModule/CrmAnalyticsHome'
import CrmConstuctionModeHome from 'src/components/A_CrmModule/CrmConstructionHome'
import CrmRegisterModeHome from 'src/components/A_CrmModule/CrmRegisterHome'
import CrmRepHomePageView1 from 'src/components/A_CrmModule/CrmRepHomePageView1'
import CrmStallEnquiriesHome from 'src/components/A_CrmModule/CrmStallEnquiresHomes'
import CustomersEventsHome from 'src/components/A_CrmModule/CustomersEventsHome'
import CustomersSearchHome2 from 'src/components/A_CrmModule/CustomersSearchHome2'
import MarkeingMessagesList from 'src/components/A_ProjModule/MarketingMessagesList'
import { ProjectCard } from 'src/components/A_ProjModule/ProjectCardNew'
import ProjectCards from 'src/components/A_ProjModule/ProjectCards'
import ProjectMastersSetupHome from 'src/components/A_ProjModule/ProjectMastersSetup'
import ProjectIntegrationsHome from 'src/components/A_ProjModule/ProjIntegrations'
import ProjectsTaskHome from 'src/components/A_ProjModule/ProjTaskHome'
import UnitsInventoryHome from 'src/components/A_ProjModule/UnitsInvertoryHome'
import LeadsTransferHome from 'src/components/A_SalesModule/leadsTransfer'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import AllBankDetailsView from 'src/components/All_BankDetailsView'
import CalendarHome from 'src/components/comps/calendarHome'
import DummyBodyLayout from 'src/components/DummyBodyLayout/DummyBodyLayout'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import CrmBucketList from 'src/components/TableComp/CrmBuckets'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import SiderForm from '../../components/SiderForm/SiderForm'
import LeadsLakeHomePage from 'src/components/PreSaleModule/LeadsManagement/LeadsLakeHomePage'

const CrmHomePage = () => {
  const { user } = useAuth()

  const { orgId } = user
  const [isClicked, setIsClicked] = useState(false)

  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({})
  const handleNewProjectClose = () => setIsNewProjectOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const [projects, setProjects] = useState([])
  const [viewable, setViewable] = useState('Home')
  const [selModule, setSelModule] = useState('Stalls')

  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProjects(projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  const data = [
    {
      Lead_Status: 'NEW',
      'vertex aprtments': 151,
      'hot dogColor': 'hsl(17, 70%, 50%)',
      'subha EcoStone': 81,
      burgerColor: 'hsl(279, 70%, 50%)',
      'vertex villas': 126,
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 146,
      kebabColor: 'hsl(339, 70%, 50%)',
      'Vintage Villas': 165,
      friesColor: 'hsl(160, 70%, 50%)',
      'Dream Space': 37,
      donutColor: 'hsl(277, 70%, 50%)',
    },

    {
      Lead_Status: 'VISIT DONE',
      'vertex aprtments': 28,
      'hot dogColor': 'hsl(271, 70%, 50%)',
      'subha EcoStone': 54,
      burgerColor: 'hsl(262, 70%, 50%)',
      'vertex villas': 91,
      sandwichColor: 'hsl(199, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 95,
      kebabColor: 'hsl(193, 70%, 50%)',
      'Vintage Villas': 76,
      friesColor: 'hsl(28, 70%, 50%)',
      'Dream Space': 49,
      donutColor: 'hsl(163, 70%, 50%)',
    },
    {
      Lead_Status: 'NEGOTIATION',
      'vertex aprtments': 59,
      'hot dogColor': 'hsl(92, 70%, 50%)',
      'subha EcoStone': 132,
      burgerColor: 'hsl(133, 70%, 50%)',
      'vertex villas': 86,
      sandwichColor: 'hsl(31, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 60,
      kebabColor: 'hsl(161, 70%, 50%)',
      'Vintage Villas': 22,
      friesColor: 'hsl(352, 70%, 50%)',
      'Dream Space': 186,
      donutColor: 'hsl(199, 70%, 50%)',
    },
    {
      Lead_Status: 'RNR',
      'vertex aprtments': 97,
      'hot dogColor': 'hsl(343, 70%, 50%)',
      'subha EcoStone': 115,
      burgerColor: 'hsl(197, 70%, 50%)',
      'vertex villas': 38,
      sandwichColor: 'hsl(26, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 147,
      kebabColor: 'hsl(184, 70%, 50%)',
      'Vintage Villas': 119,
      friesColor: 'hsl(68, 70%, 50%)',
      'Dream Space': 136,
      donutColor: 'hsl(38, 70%, 50%)',
    },
    {
      Lead_Status: 'NOT INTERESTED',
      'vertex aprtments': 130,
      'hot dogColor': 'hsl(70, 70%, 50%)',
      'subha EcoStone': 46,
      burgerColor: 'hsl(355, 70%, 50%)',
      'vertex villas': 145,
      sandwichColor: 'hsl(120, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 168,
      kebabColor: 'hsl(338, 70%, 50%)',
      'Vintage Villas': 130,
      friesColor: 'hsl(204, 70%, 50%)',
      'Dream Space': 71,
      donutColor: 'hsl(28, 70%, 50%)',
    },
    {
      Lead_Status: 'DEAD',
      'vertex aprtments': 67,
      'hot dogColor': 'hsl(22, 70%, 50%)',
      'subha EcoStone': 38,
      burgerColor: 'hsl(26, 70%, 50%)',
      'vertex villas': 111,
      sandwichColor: 'hsl(345, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 104,
      kebabColor: 'hsl(294, 70%, 50%)',
      'Vintage Villas': 180,
      friesColor: 'hsl(66, 70%, 50%)',
      'Dream Space': 72,
      donutColor: 'hsl(202, 70%, 50%)',
    },
    {
      Lead_Status: 'BOOKED',
      'vertex aprtments': 159,
      'hot dogColor': 'hsl(332, 70%, 50%)',
      'subha EcoStone': 113,
      burgerColor: 'hsl(268, 70%, 50%)',
      'vertex villas': 4,
      sandwichColor: 'hsl(209, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 6,
      kebabColor: 'hsl(229, 70%, 50%)',
      'Vintage Villas': 55,
      friesColor: 'hsl(216, 70%, 50%)',
      'Dream Space': 88,
      donutColor: 'hsl(149, 70%, 50%)',
    },
  ]

  const data1 = [
    {
      Lead_Status: 'JAN',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'FEB',
      facebook: 15100,
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: 8100,
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': 126000,
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': 1460,
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': 1650,
      friesColor: 'hsl(160, 70%, 50%)',
      Others: 370,
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'MAR',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'APR',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'MAY',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'JUN',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'JUL',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'AUG',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'SEP',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'OCT',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'NOV',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'DEC',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
  ]
  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
      <div className="flex w-screen h-screen  text-gray-700">
        <div className="flex  flex-col flex-grow">
          {/* <HeadNavBar /> */}

          {/* <div className="flex flex-col  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"> */}
          <div className="flex flex-col text-gray-700  overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] ">
            {/* <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar]:hidden"> */}

            {/* <div className='fixed top-0 left-0 right-0 z-50'> */}
            <HeadNavBar2
              selModule={selModule}
              setSelModule={setSelModule}
              setViewable={setViewable}
            />
            <div className="flex overflow-y-auto mb-1">
              <SlimSideMenuBar
                pgName={'crmModule'}
                sourceLink={'crmModule'}
                showSideView1={undefined}
                setViewable={setViewable}
                viewable={viewable}
              />
              {/* <HeadSideBar pgName={'crmModule'} />
            <HeadSideBarDetailView2
              pgName={'crmModule'}
              sourceLink={'crmModule'}
              showSideView1={undefined}
              setViewable={setViewable}
              viewable={viewable}
            /> */}
              <div className="flex-grow items-center">
                {viewable === 'userProfile' && <ProfileSummary />}
                <div className="p-0 px-1">
                  {/* {viewable === 'crmDashboard' && (
                  <CrmDashboardHome
                    project={{
                      eventName: 'Events',
                    }}
                    isEdit={undefined}
                  />
                )} */}
                  {viewable === 'crmAnalytics' && (
                    <CrmAnalyticsHome
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {viewable === 'crmSpace' && <CrmRepHomePageView1 />}
                </div>

                {(viewable === 'Integrations' ||
                  viewable === 'MyProjectTasks') && (
                  // <ProjectsTaskHome leadsTyper={undefined} />
                  <ProjectIntegrationsHome />
                )}
                <div className="pr-2">
                  {(viewable === 'CrmHome' || viewable === 'Home') && (
                    <CrmHome leadsTyper={undefined} />
                  )}
                  {/* {viewable === 'CrmTeamTasks' && (
                  <CrmHome leadsTyper={undefined} />
                )} */}
                  {viewable === 'stallEnquiries' && <CrmStallEnquiriesHome />}
                  {viewable === 'leadslake' && (
                    <LeadsLakeHomePage taskType={viewable} />
                  )}
                  {viewable === 'eventsDisplay' && (
                    <ProjectsUnitInventory
                      project={{
                        eventName: 'eventsDisplay',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {viewable === 'leadsController' && (
                    <LeadsTransferHome
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {viewable === 'unitsInventory' && (
                    <ProjectsUnitInventory
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {viewable === 'CrmBuckets' && (
                    <CrmBucketList leadsTyper={'financeModule'} />
                  )}
                  {viewable === 'crmSpace-II' && <CrmTaskList />}
                  {viewable === 'crmSpace-I' && <CrmRegisterModeHome />}
                  {viewable === 'constuction_view' && (
                    <CrmConstuctionModeHome />
                  )}
                  {viewable === 'MyCustomers' && (
                    <CustomersEventsHome
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {viewable === 'MyCustomersEvents' && (
                    <CustomersEventsHome
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}
                  {/* {viewable === 'MyCustomers-II' && (
                    <CustomersSearchHome2
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )} */}
                  {viewable === 'units_inventory' && (
                    <UnitsInventoryHome
                      project={{
                        eventName: 'Events',
                      }}
                      isEdit={undefined}
                    />
                  )}

                  {(viewable === 'Bank Accounts' ||
                    viewable === 'Virtual Accounts') && (
                    <>
                      <div className="">
                        <div className="flex items-center justify-between py-2  ">
                          <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                            {viewable}
                          </span>
                          <button className="flex items-center justify-center h-10 px-4  bg-transparent ml-auto text-sm font-medium rounded hover:bg-transparent"></button>
                        </div>
                      </div>

                      <div>
                        <section className="w-full py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                          <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                            <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                              <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                                <span className="flex items-center">
                                  <img
                                    className="w-16 h-16"
                                    alt=""
                                    src="/apart.svg"
                                  ></img>
                                  <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                                    {viewable}
                                  </span>
                                </span>
                                <section className="flex ml-auto mt-[18px]">
                                  <button>
                                    <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                      <PencilIcon
                                        className="h-3 w-3 mr-1"
                                        aria-hidden="true"
                                      />
                                      Edit
                                    </span>
                                  </button>
                                </section>
                              </div>
                              <AllBankDetailsView title={viewable} />
                            </div>
                          </div>
                        </section>
                      </div>
                    </>
                  )}

                  {viewable === 'Campaign Budget Report' && (
                    <>
                      <div className="">
                        <div className="flex items-center justify-between py-2  ">
                          <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                            Events
                          </span>
                          <button
                            onClick={() => setIsNewProjectOpen(true)}
                            className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <span className="ml-2 leading-none">Add Event</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                          <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                            <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                              <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                                <span className="flex items-center">
                                  <img
                                    className="w-16 h-16"
                                    alt=""
                                    src="/apart.svg"
                                  ></img>
                                  <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                                    {'Campaign Budget Report'}
                                  </span>
                                </span>
                                <section className="flex ml-auto mt-[18px]">
                                  <button>
                                    <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                      <PencilIcon
                                        className="h-3 w-3 mr-1"
                                        aria-hidden="true"
                                      />
                                      Edit
                                    </span>
                                  </button>
                                </section>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-1">
                              <div className="min-h-[380px]">
                                {/* <h1>hello</h1> */}

                                <ResponsiveBar
                                  data={data1}
                                  keys={[
                                    'facebook',
                                    'Instagram',
                                    'Google Adwords',
                                    'Housing.com',
                                    'News Paper',
                                    'Others',
                                  ]}
                                  indexBy="Lead_Status"
                                  margin={{
                                    top: 50,
                                    right: 130,
                                    bottom: 50,
                                    left: 60,
                                  }}
                                  padding={0.3}
                                  valueScale={{ type: 'linear' }}
                                  indexScale={{ type: 'band', round: true }}
                                  colors={{ scheme: 'nivo' }}
                                  defs={[
                                    {
                                      id: 'dots',
                                      type: 'patternDots',
                                      background: 'inherit',
                                      color: '#38bcb2',
                                      size: 4,
                                      padding: 1,
                                      stagger: true,
                                    },
                                    {
                                      id: 'lines',
                                      type: 'patternLines',
                                      background: 'inherit',
                                      color: '#eed312',
                                      rotation: -45,
                                      lineWidth: 6,
                                      spacing: 10,
                                    },
                                  ]}
                                  fill={[
                                    {
                                      match: {
                                        id: 'Vintage Villas',
                                      },
                                      id: 'dots',
                                    },
                                    {
                                      match: {
                                        id: 'vertex villas',
                                      },
                                      id: 'lines',
                                    },
                                  ]}
                                  borderColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]],
                                  }}
                                  axisTop={null}
                                  axisRight={null}
                                  axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Type',
                                    legendPosition: 'middle',
                                    legendOffset: 32,
                                  }}
                                  axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Spent',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                  }}
                                  labelSkipWidth={12}
                                  labelSkipHeight={12}
                                  labelTextColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]],
                                  }}
                                  legends={[
                                    {
                                      dataFrom: 'keys',
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 120,
                                      translateY: 0,
                                      itemsSpacing: 2,
                                      itemWidth: 100,
                                      itemHeight: 20,
                                      itemDirection: 'left-to-right',
                                      itemOpacity: 0.85,
                                      symbolSize: 20,
                                      effects: [
                                        {
                                          on: 'hover',
                                          style: {
                                            itemOpacity: 1,
                                          },
                                        },
                                      ],
                                    },
                                  ]}
                                  role="application"
                                  ariaLabel="Nivo bar chart demo"
                                  barAriaLabel={function (e) {
                                    return (
                                      e.id +
                                      ': ' +
                                      e.formattedValue +
                                      ' in Lead_Status: ' +
                                      e.indexValue
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </>
                  )}
                  {viewable === 'Setup' && (
                    <>
                      {/*Registration Executive Notifications border */}
                      <div className="min-h-screen border  mr-2 rounded-xl">
                        <section className="w-full  leading-7 text-gray-900 bg-white  rounded-md">
                          <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-7xl mx-auto px-6 py-8 ">
                            <ProjectMastersSetupHome
                              title={'WhatsApp Message Templates'}
                            />
                          </div>
                        </section>
                      </div>
                    </>
                  )}
                  {viewable === 'Marketing' && (
                    <>
                      {/*Registration Executive Notifications border */}
                      <div className="mt-1 mx-1">
                        <section className="w-full py-4  leading-7 text-gray-900 bg-white  rounded-md border pr-2">
                          <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-7xl mx-auto px-6 py-8 ">
                            <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                              <MarkeingMessagesList
                                title={'WhatsApp Message Templates'}
                              />
                            </div>
                          </div>
                        </section>
                      </div>
                    </>
                  )}
                  {viewable === 'ongoing_projects' && (
                    <>
                      <div className="">
                        <div className="flex items-center justify-between mt-1   pb-8 ">
                          <div className="w-full flex-grow   items-center  bg-blue h-[98%]  py-300 ">
                            <div className="px-1">
                              {true && (
                                <>
                                  <div className="flex flex-row">
                                    <section className="-3 w-[75%] flex flex-col">
                                      <div></div>
                                      <div className="">
                                        {projects.length > 0 ? (
                                          <section className="bg-white py-2 rounded-xl shadow border">
                                            <div className="px-4">
                                              <div className="flex items-center justify-between py-2 pb-4  ">
                                                <span className="relative  flex items-center w-auto text-md font-bold leading-none pl-0 font-bebas ">
                                                  Upcoming events
                                                  {/* {viewable} */}
                                                </span>
                                                <button
                                                  onClick={() =>
                                                    setIsNewProjectOpen(true)
                                                  }
                                                  className="flex items-center justify-center h-8 px-4  bg-gray-200 ml-auto text-sm font-medium rounded-2xl hover:bg-gray-300"
                                                >
                                                  <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                  </svg>
                                                  <span className="ml-2 leading-none">
                                                    Add Event
                                                  </span>
                                                </button>
                                              </div>
                                            </div>

                                            {/* main content */}
                                            <section className="grid gap-6">
                                              {projects.map((project) => (
                                                <ProjectCard
                                                  key={project.uid}
                                                  project={project}
                                                  setProject={setProject}
                                                  onSliderOpen={() => {
                                                    setProject(project)
                                                    setIsEditProjectOpen(true)
                                                  }}
                                                  isEdit={false}
                                                  name="Esperanza"
                                                  type="Plots"
                                                  price="₹2,100/sqft"
                                                  stats={{
                                                    total: 3,
                                                    available: 1,
                                                    sold: 2,
                                                    blocked: 0,
                                                  }}
                                                  pipeline={{
                                                    registration: 0,
                                                    booking: 1,
                                                    construction: 0,
                                                    possession: 0,
                                                  }}
                                                  transactions={{
                                                    total: '₹0',
                                                    sale: '₹0',
                                                    balance: '₹2,000',
                                                    refunds: '₹0',
                                                  }}
                                                />
                                                // <ProjectsMHomeBody
                                                //   key={project.uid}
                                                //   project={project}
                                                //   setProject={setProject}
                                                //   onSliderOpen={() => {
                                                //     setProject(project)
                                                //     setIsEditProjectOpen(true)
                                                //   }}
                                                //   isEdit={false}
                                                // />
                                              ))}
                                            </section>

                                            {/* copy of upper section */}
                                            {/* <section className="grid gap-6">
                                                                  {projects.map((project) => (
                                                                    <ProjectCards key={project.uid}
                                                                      project={project}
                                                                      setProject={setProject}
                                                                      onSliderOpen={() => {
                                                                        setProject(project)
                                                                        setIsEditProjectOpen(true)
                                                                      }}
                                                                      isEdit={false}
                                                                      name="Esperanza"

                                                                      type="Plots"
                                                                      price="₹2,100/sqft"
                                                                      stats={{
                                                                        total: 3,
                                                                        available: 1,
                                                                        sold: 2,
                                                                        blocked: 0
                                                                      }}
                                                                      pipeline={{
                                                                        registration: 0,
                                                                        booking: 1,
                                                                        construction: 0,
                                                                        possession: 0
                                                                      }}
                                                                      transactions={{
                                                                        total: "₹0",
                                                                        sale: "₹0",
                                                                        balance: "₹2,000",
                                                                        refunds: "₹0"
                                                                      }}
                                                                    />
                                                                    // <ProjectsMHomeBody
                                                                    //   key={project.uid}
                                                                    //   project={project}
                                                                    //   setProject={setProject}
                                                                    //   onSliderOpen={() => {
                                                                    //     setProject(project)
                                                                    //     setIsEditProjectOpen(true)
                                                                    //   }}
                                                                    //   isEdit={false}
                                                                    // />
                                                                  ))}
                                                                </section> */}
                                          </section>
                                        ) : (
                                          <span
                                            onClick={() =>
                                              setIsNewProjectOpen(true)
                                            }
                                          >
                                            <DummyBodyLayout />
                                          </span>
                                        )}
                                      </div>
                                    </section>
                                    <section className="mx-3 w-[25%] flex flex-col gap-8 ">
                                      {' '}
                                      <div className="border bg-white shadow rounded-xl">
                                        <CalendarHome />
                                      </div>{' '}
                                    </section>
                                  </div>
                                </>
                              )}
                            </div>

                            {viewable === 'Events Lead Report' && (
                              <>
                                <div className="">
                                  <div className="  flex items-center justify-between py-2  ">
                                    <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                                      Events
                                    </span>
                                    <button
                                      onClick={() => setIsNewProjectOpen(true)}
                                      className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                      <span className="ml-2 leading-none">
                                        Add Event
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                                    <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                                      <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                                        <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                                          <span className="flex items-center">
                                            <img
                                              className="w-16 h-16"
                                              alt=""
                                              src="/apart.svg"
                                            ></img>
                                            <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                                              {'Events vs Leads'}
                                            </span>
                                          </span>
                                          <section className="flex ml-auto mt-[18px]">
                                            <button>
                                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                                <PencilIcon
                                                  className="h-3 w-3 mr-1"
                                                  aria-hidden="true"
                                                />
                                                Edit
                                              </span>
                                            </button>
                                          </section>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-1">
                                        <div className="min-h-[380px]">
                                          {/* <h1>hello</h1> */}

                                          <ResponsiveBar
                                            data={data}
                                            keys={[
                                              'vertex aprtments',
                                              'subha EcoStone',
                                              'vertex villas',
                                              'Subha Gruha Kalpa Plots',
                                              'Vintage Villas',
                                              'Dream Space',
                                            ]}
                                            indexBy="Lead_Status"
                                            margin={{
                                              top: 50,
                                              right: 130,
                                              bottom: 50,
                                              left: 60,
                                            }}
                                            padding={0.3}
                                            valueScale={{ type: 'linear' }}
                                            indexScale={{
                                              type: 'band',
                                              round: true,
                                            }}
                                            colors={{ scheme: 'nivo' }}
                                            defs={[
                                              {
                                                id: 'dots',
                                                type: 'patternDots',
                                                background: 'inherit',
                                                color: '#38bcb2',
                                                size: 4,
                                                padding: 1,
                                                stagger: true,
                                              },
                                              {
                                                id: 'lines',
                                                type: 'patternLines',
                                                background: 'inherit',
                                                color: '#eed312',
                                                rotation: -45,
                                                lineWidth: 6,
                                                spacing: 10,
                                              },
                                            ]}
                                            fill={[
                                              {
                                                match: {
                                                  id: 'Vintage Villas',
                                                },
                                                id: 'dots',
                                              },
                                              {
                                                match: {
                                                  id: 'vertex villas',
                                                },
                                                id: 'lines',
                                              },
                                            ]}
                                            borderColor={{
                                              from: 'color',
                                              modifiers: [['darker', 1.6]],
                                            }}
                                            axisTop={null}
                                            axisRight={null}
                                            axisBottom={{
                                              tickSize: 5,
                                              tickPadding: 5,
                                              tickRotation: 0,
                                              legend: 'Lead Status',
                                              legendPosition: 'middle',
                                              legendOffset: 32,
                                            }}
                                            axisLeft={{
                                              tickSize: 5,
                                              tickPadding: 5,
                                              tickRotation: 0,
                                              legend: 'Count',
                                              legendPosition: 'middle',
                                              legendOffset: -40,
                                            }}
                                            labelSkipWidth={12}
                                            labelSkipHeight={12}
                                            labelTextColor={{
                                              from: 'color',
                                              modifiers: [['darker', 1.6]],
                                            }}
                                            legends={[
                                              {
                                                dataFrom: 'keys',
                                                anchor: 'bottom-right',
                                                direction: 'column',
                                                justify: false,
                                                translateX: 120,
                                                translateY: 0,
                                                itemsSpacing: 2,
                                                itemWidth: 100,
                                                itemHeight: 20,
                                                itemDirection: 'left-to-right',
                                                itemOpacity: 0.85,
                                                symbolSize: 20,
                                                effects: [
                                                  {
                                                    on: 'hover',
                                                    style: {
                                                      itemOpacity: 1,
                                                    },
                                                  },
                                                ],
                                              },
                                            ]}
                                            role="application"
                                            ariaLabel="Nivo bar chart demo"
                                            barAriaLabel={function (e) {
                                              return (
                                                e.id +
                                                ': ' +
                                                e.formattedValue +
                                                ' in Lead_Status: ' +
                                                e.indexValue
                                              )
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            )}
                            {viewable === 'unitsInventory' && (
                              <ProjectsUnitInventory
                                project={{
                                  eventName: 'Events',
                                }}
                                isEdit={undefined}
                              />
                            )}

                            {viewable === 'Campaign Budget Report' && (
                              <>
                                <div className="">
                                  <div className="flex items-center justify-between py-2  ">
                                    <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                                      Events
                                    </span>
                                    <button
                                      onClick={() => setIsNewProjectOpen(true)}
                                      className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                      <span className="ml-2 leading-none">
                                        Add Event
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                                    <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                                      <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                                        <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                                          <span className="flex items-center">
                                            <img
                                              className="w-16 h-16"
                                              alt=""
                                              src="/apart.svg"
                                            ></img>
                                            <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                                              {'Campaign Budget Report'}
                                            </span>
                                          </span>
                                          <section className="flex ml-auto mt-[18px]">
                                            <button>
                                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                                <PencilIcon
                                                  className="h-3 w-3 mr-1"
                                                  aria-hidden="true"
                                                />
                                                Edit
                                              </span>
                                            </button>
                                          </section>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 gap-1">
                                        <div className="min-h-[380px]">
                                          {/* <h1>hello</h1> */}

                                          <ResponsiveBar
                                            data={data1}
                                            keys={[
                                              'facebook',
                                              'Instagram',
                                              'Google Adwords',
                                              'Housing.com',
                                              'News Paper',
                                              'Others',
                                            ]}
                                            indexBy="Lead_Status"
                                            margin={{
                                              top: 50,
                                              right: 130,
                                              bottom: 50,
                                              left: 60,
                                            }}
                                            padding={0.3}
                                            valueScale={{ type: 'linear' }}
                                            indexScale={{
                                              type: 'band',
                                              round: true,
                                            }}
                                            colors={{ scheme: 'nivo' }}
                                            defs={[
                                              {
                                                id: 'dots',
                                                type: 'patternDots',
                                                background: 'inherit',
                                                color: '#38bcb2',
                                                size: 4,
                                                padding: 1,
                                                stagger: true,
                                              },
                                              {
                                                id: 'lines',
                                                type: 'patternLines',
                                                background: 'inherit',
                                                color: '#eed312',
                                                rotation: -45,
                                                lineWidth: 6,
                                                spacing: 10,
                                              },
                                            ]}
                                            fill={[
                                              {
                                                match: {
                                                  id: 'Vintage Villas',
                                                },
                                                id: 'dots',
                                              },
                                              {
                                                match: {
                                                  id: 'vertex villas',
                                                },
                                                id: 'lines',
                                              },
                                            ]}
                                            borderColor={{
                                              from: 'color',
                                              modifiers: [['darker', 1.6]],
                                            }}
                                            axisTop={null}
                                            axisRight={null}
                                            axisBottom={{
                                              tickSize: 5,
                                              tickPadding: 5,
                                              tickRotation: 0,
                                              legend: 'Type',
                                              legendPosition: 'middle',
                                              legendOffset: 32,
                                            }}
                                            axisLeft={{
                                              tickSize: 5,
                                              tickPadding: 5,
                                              tickRotation: 0,
                                              legend: 'Spent',
                                              legendPosition: 'middle',
                                              legendOffset: -40,
                                            }}
                                            labelSkipWidth={12}
                                            labelSkipHeight={12}
                                            labelTextColor={{
                                              from: 'color',
                                              modifiers: [['darker', 1.6]],
                                            }}
                                            legends={[
                                              {
                                                dataFrom: 'keys',
                                                anchor: 'bottom-right',
                                                direction: 'column',
                                                justify: false,
                                                translateX: 120,
                                                translateY: 0,
                                                itemsSpacing: 2,
                                                itemWidth: 100,
                                                itemHeight: 20,
                                                itemDirection: 'left-to-right',
                                                itemOpacity: 0.85,
                                                symbolSize: 20,
                                                effects: [
                                                  {
                                                    on: 'hover',
                                                    style: {
                                                      itemOpacity: 1,
                                                    },
                                                  },
                                                ],
                                              },
                                            ]}
                                            role="application"
                                            ariaLabel="Nivo bar chart demo"
                                            barAriaLabel={function (e) {
                                              return (
                                                e.id +
                                                ': ' +
                                                e.formattedValue +
                                                ' in Lead_Status: ' +
                                                e.indexValue
                                              )
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </>
                            )}
                            <SiderForm
                              open={isNewProjectOpen}
                              setOpen={handleNewProjectClose}
                              title="Create Event"
                              data={project}
                              setProject={setProject}
                              widthClass="max-w-4xl"
                            />
                            <SiderForm
                              open={isEditProjectOpen}
                              setOpen={handleEditProjectClose}
                              title="Edit Event"
                              data={project}
                              widthClass="max-w-4xl"
                            />
                          </div>
                        </div>
                        <MetaTags
                          title="ExecutiveHome"
                          description="ExecutiveHome page"
                        />
                      </div>
                    </>
                  )}

                  <SiderForm
                    open={isNewProjectOpen}
                    setOpen={handleNewProjectClose}
                    title="Create Event"
                    data={{}}
                  />
                  <SiderForm
                    open={isEditProjectOpen}
                    setOpen={handleEditProjectClose}
                    title="Edit Event"
                    data={project}
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
        </div>
      </div>
    </>
  )
}
export default CrmHomePage
