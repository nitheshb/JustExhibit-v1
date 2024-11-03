import { useState } from 'react'

import { Switch } from '@headlessui/react'

import { MetaTags } from '@redwoodjs/web'

import HrModuleHome from 'src/components/A_HrModule/HrModuleHome'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import MyActivityHome from 'src/components/MyActivityHome/MyActivityHome'
import SUserSignup from 'src/components/SUserSignup/SUserSignup'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import UserManageTable from 'src/components/UserManageTable/UserManageTable'
import AssetsManageTable from 'src/components/A_HrModule/AssetsManagementTable'
import HrSummaryReport from 'src/components/A_HrModule/HrSummaryReport'
import SiderForm from 'src/components/SiderForm/SiderForm'
import ProfileSummary from 'src/components/A_SalesModule/Reports/profileSummary'


const UsersAdminPage = () => {
  const [isEmpDetailsOpen, setIsEmpDetailsOpen] = useState(false)
  const [isAssetViewer, setAssetViewerOpen] = useState(false)
  const handleEmployeeOnClose = () => setIsEmpDetailsOpen(false)
  const handleAssetOnClose = () => setAssetViewerOpen(false)
  const [viewable, setViewable] = useState('User Management')
  const [empData, setEmpData] = useState({})
  const [assetData, setAssetData] = useState({})
  const [selModule, setSelModule] = useState('HR')
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  const changeFun = () => {
    setShowCompletedTasks(!showCompletedTasks)
  }
  const editEmployeeFun = (empData) => {
    setEmpData(empData)
    setIsEmpDetailsOpen(true)
  }
  const addEditAsset = (assetPayload) => {
    setAssetData(assetPayload)
    setAssetViewerOpen(true)
  }
  return (
    <>
      <MetaTags title="UsersAdmin" description="UsersAdmin page" />

      <div className="flex w-screen h-screen text-gray-700">
        <SlimSideMenuBar
          pgName={'hrModule'}
          sourceLink={'hrModule'}
          showSideView1={undefined}
          setViewable={setViewable}
          viewable={viewable}
        />

        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          <HeadNavBar2 selModule={selModule} setSelModule={setSelModule}  setViewable={setViewable} />
              {viewable === 'userProfile' && <ProfileSummary />}
          <div className="flex-grow px-6 overflow-auto no-scrollbar  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex flex-row justify-between items-center flex-shrink-0 h-10 mt-2 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
         

              {viewable === 'User Management' && (
                <div className="flex flex-row">
                  <div className="flex flex-row mt-2 mr-2">
                    <span className="text-[10px] mt-1 mr-1">Show InActive</span>
                    <Switch
                      checked={showCompletedTasks}
                      onChange={changeFun}
                      className={`${
                        showCompletedTasks ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          showCompletedTasks ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>

                  <button
                    onClick={() => editEmployeeFun({})}
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
                    <span className="ml-1 leading-none">Add Employee</span>
                  </button>
                </div>
              )}
              {viewable === 'AssetsManagement' && (
                <div className="flex flex-row">
                  <div className="flex flex-row mt-2 mr-2">
                    <span className="text-[10px] mt-1 mr-1">Show InActive</span>
                    <Switch
                      checked={showCompletedTasks}
                      onChange={changeFun}
                      className={`${
                        showCompletedTasks ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          showCompletedTasks ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>

                  <button
                    onClick={() => addEditAsset({})}
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
                    <span className="ml-1 leading-none">Add Asset</span>
                  </button>
                </div>
              )}
            </div>
            {viewable === 'AssetsManagement' && (
              <AssetsManageTable
                editEmployeeFun={editEmployeeFun}
                showCompletedTasks={showCompletedTasks}
              />
            )}
            {viewable === 'User Management' && (
              <UserManageTable
                editEmployeeFun={editEmployeeFun}
                showCompletedTasks={showCompletedTasks}
              />
            )}
            {viewable === 'MyHR' && <HrModuleHome leadsTyper={undefined} />}
            {viewable === 'Roles Management' && (
              <>
                <UserAccessTable showCompletedTasks={showCompletedTasks} />
              </>
            )}

            {viewable === 'My Activity' && (
              <>
                <MyActivityHome source={'individual'} />
              </>
            )}

            {viewable === 'Team Activity' && (
              <>
                <MyActivityHome source={'team'} />
              </>
            )}


            {viewable === 'projectReports' && (
              <>
              <HrSummaryReport/>
              </>
            )}






            <SUserSignup
              open={isEmpDetailsOpen}
              setOpen={handleEmployeeOnClose}
              title="User"
              empData={empData}
            />
            {/* Import Assets */}

            <SiderForm
        open={isAssetViewer}
        setOpen={handleAssetOnClose}
        title="ImportAssets"
        widthClass="max-w-4xl"
      />
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersAdminPage
