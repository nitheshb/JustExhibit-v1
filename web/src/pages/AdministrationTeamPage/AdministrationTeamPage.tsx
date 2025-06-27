import { useState, useEffect } from 'react'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import { useFileUpload } from 'src/components/useFileUpload'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'
import AdminSupportHome from 'src/components/A_AdminSupportModule/AdminSupportHome'
import AdminSummaryReport from 'src/components/A_AdminSupportModule/AdminSummaryReport'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'

const AdministrationTeamPage = (props) => {
  const { user } = useAuth()
  const [uploadedFileLink, handleFileUpload] = useFileUpload()
  const [loading, setLoading] = useState(true)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState(
    props.type === 'inProgress' ? 'inProgress' : 'Today1'
  )
  const [isClicked, setIsClicked] = useState(false)
  const [selModule, setSelModule] = useState('Admin')

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
        setViewable(props.type === 'inProgress' ? 'inProgress' : 'Today1')
      }
    }
  }, [user])


  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          { }
          <div className="flex flex-col text-gray-700  overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] ">
            {/* <div
              className={`${
                showDetailedSideBar
                  ? 'flex flex-row  w-[20vw]   no-scrollbar text-gray-700 '
                  : 'flex flex-row  no-scrollbar  text-gray-700 '
              }`}
            > */}


            <HeadNavBar2 selModule={selModule} setSelModule={setSelModule} setViewable={setViewable} />
            <div className='flex overflow-y-auto mb-1 mx-14'>
              <SlimSideMenuBar
                pgName={'marketingModule'}
                sourceLink={'marketingModule'}
                showSideView1={undefined}
                setViewable={setViewable}
                viewable={viewable}
              />
              <div className="flex-grow  items-center overflow-y-auto  overflow-auto no-scrollbar px-300  py-300">
                {viewable === 'userProfile' && <ProfileSummary />}

                {viewable === 'Today1' && (
                  <AdminSupportHome leadsTyper={undefined} />
                )}
                {viewable === 'Team Lead Report' && (
                  <>
                    <AdminSummaryReport />
                    {/* <ReportMain /> */}
                    {/* <LeadsTeamReportBody
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      eventName: 'Team Leads Report',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  /> */}
                  </>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdministrationTeamPage



