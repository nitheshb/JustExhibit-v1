import { useState, useEffect } from 'react'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import ConstructUnitsHome from 'src/components/ConstructModule/ConstructUnitsHome'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'

const ConstructModulePage = () => {
  const { user } = useAuth()

  const [showSideBar, setShowSideBar] = useState(false)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState('Today1')
  const [selModule, setSelModule] = useState('Construction')

  const showSideView1 = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    if (user) {
      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        setViewable('inProgress')
      } else {
        setViewable('Today1')
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
          {}
          <div className="flex flex-row  h-[100vh]  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div
              className={`${
                showDetailedSideBar
                  ? 'flex flex-row overflow-auto w-[20vw]   text-gray-700 '
                  : 'flex flex-row overflow-auto   text-gray-700 '
              }`}
            >
              <SlimSideMenuBar
              pgName={'constructModule'}
              sourceLink={'constructModule'}
              showSideView1={undefined}
              setViewable={setViewable}
              viewable={viewable}
            />

            </div>

            <div className="flex-grow  items-center overflow-y-auto  px-300  py-300">
            <HeadNavBar2 selModule={selModule} setSelModule={setSelModule}  setViewable={setViewable} />
              {viewable === 'userProfile' && <ProfileSummary />}

              {viewable === 'ConstructUnits' && (
                <ConstructUnitsHome
                  project={{
                    eventName: 'Events',
                  }}
                  isEdit={undefined}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default ConstructModulePage
