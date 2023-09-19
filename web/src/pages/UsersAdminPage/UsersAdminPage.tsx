import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import HrModuleHome from 'src/components/A_HrModule/HrModuleHome'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import MyActivityHome from 'src/components/MyActivityHome/MyActivityHome'
import SUserSignup from 'src/components/SUserSignup/SUserSignup'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import UserManageTable from 'src/components/UserManageTable/UserManageTable'

const UsersAdminPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnClose = () => setIsOpen(false)
  const [viewable, setViewable] = useState('User Management')
  const [empData, setEmpData] = useState({})
  const [selModule, setSelModule] = useState('HR')

  const editEmployeeFun = (empData) => {
    setEmpData(empData)
    setIsOpen(true)
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
          <HeadNavBar2 selModule={selModule} setSelModule={setSelModule} />
          <div className="flex-grow px-6 overflow-auto no-scrollbar  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 h-10 mt-2 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative  flex items-center w-auto text-xl font-bold leading-none pl-0">
                {viewable}
              </span>

              {viewable === 'User Management' && (
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
              )}
            </div>

            {viewable === 'User Management' && (
              <UserManageTable editEmployeeFun={editEmployeeFun} />
            )}
            {viewable === 'MyHR' && <HrModuleHome leadsTyper={undefined} />}
            {viewable === 'Roles Management' && (
              <>
                <UserAccessTable />
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

            <SUserSignup
              open={isOpen}
              setOpen={handleOnClose}
              title="User"
              empData={empData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersAdminPage
