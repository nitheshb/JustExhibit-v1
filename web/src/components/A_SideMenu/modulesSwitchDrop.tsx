import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChartPieIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  PuzzleIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
} from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

export default function ModuleSwitchDrop({
  type,
  id,
  setStatusFun,
  viewUnitStatusA,
  pickCustomViewer,
  filteredUnits,
  pickedValue,
}) {
  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  return (
    <div className="text-right inline-block ml-2 mt-[px] ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-[148px] px-0 py-0 text-sm font-semibold text-black-500 bg- rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-slate-400/10 dark:highlight-white/5 flex font-semibold hover:bg-slate-400/20 items-center leading-5 px-3 py-1 rounded-full space-x-2 text-xs px-4 py-1.5">
            <span className=" w-[130px]  text-[12px] leading-[10px] tracking-wide text-[#0091ae]  ">
              <span className="flex flex-row w-[25px]">
                <span>{`${type} `} </span>{' '}
                <span className="ml-[2px]">Module</span>
              </span>
            </span>
            <ChevronDownIcon className="w-5 h-5 mr-3 mt-[2px] inline text-[#058527]" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${
              ['Facing', 'show'].includes(type) ? 'right-0' : 'left-0'
            }  absolute w-[594px]   origin-top-left bg-white rounded-[6px] shadow-[0px_20px_35px_-10px_#2f32643b]`}
            style={{ zIndex: '12' }}
          >
            <div className="px-3 py-6 ">
              <>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.home()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#ffeff2]"
                            onClick={() => {
                              setStatusFun('1', 'Events')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#ffeff2] group-hover:bg-[#ffeff2]">
                              <OfficeBuildingIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Events Setup
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3 text-gray-600">
                                Events & Stalls Setup, Insights ...
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.crmModule()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#eff1ff]"
                            onClick={() => {
                              setStatusFun('1', 'Stalls')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#eff1ff]  group-hover:bg-[#eff1ff]">
                              <ChartPieIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Stalls Management
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3  text-gray-600">
                                Bookings, Payments,...
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.leadsManager()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#e8faec]"
                            onClick={() => {
                              setStatusFun('1', 'Registration')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#e8faec] group-hover:bg-[#e8faec]">
                              <NewspaperIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Registrations
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3 text-gray-600">
                                Walk-Ins, Participants,Archieve
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.marketingModule()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#faf2e2]"
                            onClick={() => {
                              setStatusFun('1', 'Marketing')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#faf2e2] group-hover:bg-[#faf2e2]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
                              </svg>
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Marketing
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3  text-gray-600">
                                Campaign, Branding & Insights
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="flex flex-col ml-5">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.financeModule()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#e8faec]"
                            onClick={() => {
                              setStatusFun('1', 'Finance')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#e8faec] group-hover:bg-[#e8faec]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                />
                              </svg>
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Finance
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3 text-gray-600">
                                Payments...
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.usersAdmin()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#eff1ff]"
                            onClick={() => {
                              setStatusFun('1', 'HR')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#eff1ff] group-hover:bg-[#eff1ff]">
                              <UserGroupIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                HR
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3  text-gray-600">
                                Users, Roles, Access
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={routes.administrationTeam()}>
                          <div
                            className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-[#ffeff2]"
                            onClick={() => {
                              setStatusFun('1', 'ADMINTEAM')
                            }}
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#ffeff2] group-hover:bg-[#ffeff2]">
                              <PuzzleIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <a className="block font-semibold text-gray-900">
                                Admin Team
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt- pb-3  text-gray-600">
                                Facilitators, Help
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </div>

                {/* <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.constructModule()}>
                      <div
                        className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
                        onClick={() => {
                          setStatusFun('1', 'Construction')
                        }}
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <PuzzleIcon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <a className="block font-semibold text-gray-900">
                            Construction
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt- pb-2 border-b text-gray-600">
                            Gallery, Status, Site Visits..
                          </p>
                        </div>
                      </div>
                    </Link>
                  )}
                </Menu.Item> */}
              </>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
