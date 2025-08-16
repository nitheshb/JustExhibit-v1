import { useState, useEffect } from 'react'

import UnitsInventoryHome from 'src/components/A_ProjModule/UnitsInvertoryHome'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import { useFileUpload } from 'src/components/useFileUpload'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

const LeadsManagerPage = (props) => {
  const { user } = useAuth()
  const [uploadedFileLink, handleFileUpload] = useFileUpload()
  const [loading, setLoading] = useState(true)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState(
    props.type === 'inProgress' ? 'inProgress' : 'inProgress'
  )
  const [isClicked, setIsClicked] = useState(false)
  const [selModule, setSelModule] = useState('Registration')

  //

  //confetti
  const a = window.location.pathname
  window.history.pushState('', document.title, a)
  const showSideView1 = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    setIsClicked((prev) => !prev)
  }, [props.clicked])
  useEffect(() => {
    if (user) {
      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        setViewable('inProgress')
      } else {
        setViewable(props.type === 'inProgress' ? 'inProgress' : 'inProgress')
      }
    }
  }, [user])

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
          setViewable={setViewable}
        /> */}
        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          { }
          <div className="flex flex-col text-gray-700  overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none]">
            {/* <div
              className={`${
                showDetailedSideBar
                  ? 'flex flex-row  w-[20vw]   no-scrollbar text-gray-700 '
                  : 'flex flex-row no-scrollbar  text-gray-700 '
              }`}
            > */}
            <HeadNavBar2
              selModule={selModule}
              setSelModule={setSelModule}
              setViewable={setViewable}
            />
            <div className="flex overflow-y-auto mb-1">
              <SlimSideMenuBar
                pgName={'salesModule'}
                sourceLink={'salesModule'}
                showSideView1={undefined}
                setViewable={setViewable}
                viewable={viewable}
              />
              {/* <div className='mb-4'>
              <FinanceChart/>
            </div> */}
              <div className='flex-grow items-cente'>
                {viewable === 'userProfile' && <ProfileSummary />}
                {/*
            <div className='bg-[#fff]'>
              <AdminPage/>
            </div> */}

                {viewable === 'inProgress' && (
                  <ExecutiveHomeViewerPage
                    leadsTyper={'inProgress'}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked}
                  />
                )}
                {viewable === 'booked' && (
                  <ExecutiveHomeViewerPage leadsTyper={'booked'} />
                )}
                {viewable === 'archieveLeads' && (
                  <ExecutiveHomeViewerPage leadsTyper={'archieveLeads'} />
                )}


                {viewable === 'units_inventory' && (
                  <UnitsInventoryHome
                    project={{
                      eventName: 'Events',
                    }}
                    isEdit={undefined}
                  />
                )}
                {viewable === 'Today1' && (
                  <TodayLeadsHomePage taskType={viewable} />
                )}
                {viewable === 'Upcoming' && (
                  <TodayLeadsHomePage taskType={viewable} />
                )}
                {viewable === 'Today1Team' && (
                  <TodayLeadsHomePage taskType={viewable} />
                )}
                {viewable === 'UpcomingTeam' && (
                  <TodayLeadsHomePage taskType={viewable} />
                )}




                {viewable === 'unitsInventory' && (
                  <ProjectsUnitInventory
                    project={{
                      eventName: 'Events',
                    }}
                    isEdit={undefined}
                  />
                )}

                {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
                {viewable === 'Team Lead Report' && (
                  <>
                    {/* <ReportMain /> */}
                    <LeadsTeamReportBody
                      project={{
                        area: 1000,
                        builderName: 'hello',
                        location: 'local',
                        eventName: 'Team Leads Report',
                        projectType: 'aprtment',
                      }}
                      isEdit={false}
                    />
                  </>
                )}

                {viewable === 'My Lead Report' && (
                  <MyLeadsReportHome
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      eventName: 'My Leads Report',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  />
                )}
                {viewable === 'Attendance' && (
                  <MyAttedanceHomeBody
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      eventName: 'Attendance',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  />
                )}
                {viewable === 'Pay' && (
                  <MyPayHomeBody
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      eventName: 'Pay',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  />
                )}
                {viewable === 'LinkWhatsApp' && (
                  <LeadsTeamReportBody
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      eventName: 'Pay',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  />
                )}
              </div>

              {/* <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300"> */}
              {/* {viewable === 'Today' && <ExecutiveHomeViewerPage />} *SS/}
            {/* {viewable === 'Today1' && <TodayLeadsHomePage />} */}
              {/* {viewable === 'LeadsManagerHome' && <LeadsManagementHome />} */}
              {/* </div> */}
              {/* <div
              flex-grow
              p-6
              overflow-auto
              h-screen
              text-gray-700
              bg-gradient-to-tr
              from-blue-200
              via-indigo-200
              to-pink-200
            >
              {viewable === 'Today' && <ExecutiveHomeViewerPage />}
              {viewable === 'Today1' && <TodayLeadsHomePage />}
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
            </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
