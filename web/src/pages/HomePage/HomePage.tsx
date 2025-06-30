import { useState, useEffect } from 'react'

// import { ResponsiveBar } from '@nivo/bar'
import { PencilIcon } from '@heroicons/react/outline'
import { usePageLoadingContext } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import MarkeingMessagesList from 'src/components/A_ProjModule/MarketingMessagesList'
import ProjectMastersSetupHome from 'src/components/A_ProjModule/ProjectMastersSetup'
import ProjectReportsBody from 'src/components/A_ProjModule/ProjectReports'
import ProjectsTaskHome from 'src/components/A_ProjModule/ProjTaskHome'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import AllBankDetailsView from 'src/components/All_BankDetailsView'
import CalendarHome from 'src/components/comps/calendarHome'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import {
  getAllProjects,
  getSalesReportsData,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import SiderForm from '../../components/SiderForm/SiderForm'
import { ProjectCard } from 'src/components/A_ProjModule/ProjectCardNew'
import ProjectIntegrationsHome from 'src/components/A_ProjModule/ProjIntegrations'
import { Calendar, MapPin } from 'lucide-react'
import ProjectCards from 'src/components/A_ProjModule/ProjectCards'
import EventCard from 'src/components/A_ProjModule/EventCard'

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const { orgId } = user || {}
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({})
  const handleNewProjectClose = () => setIsNewProjectOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const [projects, setProjects] = useState([])
  const [salesReportsDbData, setSalesReportsDbData] = useState([])
  const [viewable, setViewable] = useState('ongoing_projects')
  const { loading } = usePageLoadingContext()
  const [selModule, setSelModule] = useState('Events')

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

  const getSalesReportsDataFun = async () => {
    const unsubscribe = getSalesReportsData(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setSalesReportsDbData(projects)
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
    getSalesReportsDataFun()
  }, [])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }






  const events = [
    {
      id: 1,
      title: 'Handpicked Jewellery Designs from Goldsmith',
      date: 'December 4, 2024',
      location: 'HSR layout, Bangalore',
      price: '11,111',
      imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',
      category: 'JEWELLERY',
    },
    {
      id: 2,
      title: 'Healthy Delicious Food',
      date: 'December 4, 2024',
      location: 'Outer Ring Road, Bangalore',
      price: '11,111',
      imageUrl: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826',
      category: 'FOOD',
    },
    {
      id: 3,
      title: 'Trendy Designer Wear with an Extensive Collection of Clothing Options',
      date: 'December 4, 2024',
      location: 'Vijayanagar, Bangalore',
      price: '11,111',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      category: 'FASHION',
    },
  ];





  const [activeFilter, setActiveFilter] = React.useState('All');
  const filters = ['All', 'Upcoming', 'Completed', 'Ongoing'];

  return (
    <>
      {loading && <div>Loading...</div>}
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          <div className="flex flex-col text-gray-700  overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] ">
            {/* <div className="flex overflow-y-hidden flex-row overflow-auto h-[100vh]   text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 bg-gradient-to-tr from-blue-500 from-0% via-transparent via-10% to-transparent to-40% [background-position:0%_100%,100%_0%] [background-size:50%_50%,50%_50%] [background-repeat:no-repeat]"> */}
            {/* <HeadSideBar pgName={'home'} /> */}


            <HeadNavBar2
              selModule={selModule}
              setSelModule={setSelModule}
              setViewable={setViewable}
            />

            <div className='flex overflow-y-auto mb-1'>

              <SlimSideMenuBar
                pgName={'projectModule'}
                sourceLink={'projectModule'}
                showSideView1={undefined}
                setViewable={setViewable}
                viewable={viewable}
              />

              <div className="flex-grow   items-center ">

                {viewable === 'userProfile' && <ProfileSummary />}

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
                {viewable === 'projectReports' && (
                  <>
                    <div className="mt-1 mx-1">
                      <section className="w-full py-4  leading-7 text-gray-900 bg-white  rounded-md">
                        <div className="box-border px-2 mx-auto border-solid  max-w-full ">
                          <div className="flex flex-col   leading-7  text-gray-900 border-0 border-gray-200 ">
                            <ProjectReportsBody
                              title={'WhatsApp Message Templates'}
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  </>
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
                              <AllBankDetailsView title={'Bank Accounts'} />
                            </div>
                          </div>
                        </section>
                      </div>
                    </>
                  )}
                {(viewable === 'Home' || viewable === 'MyProjectTasks') && (
                  <ProjectsTaskHome leadsTyper={undefined} />
                )}
                {(viewable === 'Integrations' || viewable === 'MyProjectTasks') && (
                  // <ProjectsTaskHome leadsTyper={undefined} />
                  <ProjectIntegrationsHome />

                )}
                {viewable != 'inProgress' &&
                  viewable != 'Home' &&
                  viewable != 'Integrations' &&


                  viewable != 'MyProjectTasks' &&
                  viewable != 'Events Lead Report' &&
                  viewable != 'Campaign Budget Report' &&
                  viewable != 'Bank Accounts' &&
                  viewable != 'Virtual Accounts' &&
                  viewable != 'unitsInventory' &&
                  viewable != 'Setup' &&
                  viewable != 'Marketing' &&
                  viewable != 'userProfile' &&
                  viewable != 'projectReports' && (
                    <>
                      <div className="">
                        <div className="flex items-center justify-between mt-1   pb-8 ">
                          <div className="w-full flex-grow   items-center  bg-blue h-[98%]  py-300 ">
                            <div className="px-1">
                              {viewable != 'inProgress' &&
                                viewable != 'Events Lead Report' &&
                                viewable != 'Campaign Budget Report' &&
                                viewable != 'Bank Accounts' &&
                                viewable != 'Virtual Accounts' &&
                                viewable != 'unitsInventory' && (
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
                                                  <ProjectCard key={project.uid}
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
                                              </section>


                                              {/* copy of upper section */}
                                              <section className="grid gap-6">
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
                                              </section>

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




                                        {/* card to change */}
                                        {/* 
                                      <div className="min-h-screen bg-[#FFFFFF] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
   
        <div className="mb-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-normal  text-[#2BC2F6] mb-6">All Events</h1>
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow h-auto"
            >
        
              <div className="relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-[#31C0F0] text-white px-3 py-2 rounded-[10px] text-sm font-medium">
                  {event.category}
                </span>
              </div>


              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#484848] mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center font-semibold text-[#484848]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center font-semibold text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-[#484848]"  />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

         
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-baseline bg-[#F5FCFE] justify-between">
                  <div className="flex items-baseline ml-3">
                    <span className="text-[#000000]">₹</span>
                    <span className="text-[#000000] font-bold text-[16px] ml-1">{event.price}</span>
                    <span className="text-[#000000] font-semibold uppercase text-[16px] ml-1">onwards</span>
                  </div>
                  <button className="text-[#000000] px-4 py-2 uppercase rounded text-[16px] font-semibold  transition-colors border-l-[3px] border-[#31C0F0] h-full flex items-center">
                   BOOK NOW
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}
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
              </div>


            </div>




          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
