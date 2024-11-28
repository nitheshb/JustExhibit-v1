/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { UserGroupIcon } from '@heroicons/react/outline'

import { Link, routes } from '@redwoodjs/router'

import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

const SlimSideMenuBar = (props) => {
  const { pgName, sourceLink, showSideView1, setViewable, viewable } = props
  const { user } = useAuth()

  // if (!user?.role?.includes(USER_ROLES.ADMIN)) {
  //   return null
  // }

  return (
    <div className="flex flex-col items-center w-20 min-w-[83px] pb-4  overflow-auto no-scrollbar bg-white bg-opacity-75  bg-[#f0f3ff] h-screen w-[83px] max-w-[83px] shadow border rounded-2xl m-2">
      {[
        'hrModule',
        'financeModule',
        'crmModule',
        'projectModule',
        'marketingModule',
        'salesModule',
        'constructModule',
        'legalModule',
      ].includes(sourceLink) && (
        <a
          className="flex items-center justify-center flex-shrink-0 w-full py-[9px] mr-4  border-b mt-[4px] pt-[10px]"
          href="#"
        >
          <img
            src="https://yt3.googleusercontent.com/f0Ffx-wDWloHZSxH2ksegEkJ-r3gQgDxMxwiyyYyYj7V-TCXwHicF4dcJcwnZ2MDQDQU7zW9=s160-c-k-c0x00ffffff-no-rj"
            className="w-10 h-10 ml-4"
          />
        </a>
      )}
      <section className="mb-4"></section>
      {['crmModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'CrmHome'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('CrmHome')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Home</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'units_inventory'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('units_inventory')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Stalls</span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 ">
              <span
                className={
                  'flex items-center text-sm py-1   overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'crmSpace-I'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('crmSpace-I')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Bookings</span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'stallEnquiries'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('stallEnquiries')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">
                    Stall Enquiry
                  </span>
                </span>
              </span>
            </li>
            {(user?.role?.includes(USER_ROLES.SALES_MANAGER) ||
              user?.role?.includes(USER_ROLES.ADMIN)) && (
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'leadslake'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('leadslake')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#058527' }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-[9px] font-bold  pl-1">
                      Online Enquiry
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            )}
               <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'leadsController'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('leadsController')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Leads Transfer</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>


            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('MyCustomers-II')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                    <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Exhibitors</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'crmAnalytics'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('crmAnalytics')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'eventsDisplay'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('eventsDisplay')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">
                    Events
                  </span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}
      {['constructModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Today1')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Tasks</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'ConstructUnits'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('ConstructUnits')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Stalls</span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'ConstructQueries'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('ConstructQueries')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Modify</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Roles Management'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Roles Management')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Gallery</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'projectReports'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('projectReports')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}

      {['projectModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'ongoing_projects'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('ongoing_projects')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Events</span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Integrations'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Integrations')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">
                    Integration
                  </span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Setup'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Setup')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Setup</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Marketing'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Marketing')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                    <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Templates</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Bank Accounts'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Bank Accounts')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Bank</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'projectReports'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('projectReports')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}
      {['marketingModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Today1')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Tasks</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            {/* start  */}

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'MarketingSocial'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('MarketingSocial')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Marketing</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            {/* end */}
            {(user?.role?.includes(USER_ROLES.MARKETING_MANAGER) ||
              user?.role?.includes(USER_ROLES.MARKETING_EXECUTIVE) ||
              user?.role?.includes(USER_ROLES.ADMIN)) && (
              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Team Lead Report'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Team Lead Report')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold  pl-1">Reports</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>
            )}
          </ul>
        </>
      )}
      {['salesModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Today1')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Home</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'inProgress'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('inProgress')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">
                    Visitors
                  </span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'archieveLeads'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('archieveLeads')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                    <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Archieve</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>


            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'units_inventory'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('units_inventory')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Stalls</span>
                </span>
              </span>
            </li>





              <li className="relative mt-1">
                <span
                  className={
                    'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                    (viewable === 'Team Lead Report'
                      ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                      : '')
                  }
                  onClick={() => setViewable('Team Lead Report')}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <span className="flex items-center flex-col pt-[8px]">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>

                    <span className="text-[9px] font-bold  pl-1">
                      Visitor Report
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                  </span>
                </span>
              </li>

          </ul>
        </>
      )}
      {['legalModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Today1')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Tasks</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'legalDocuments'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('legalDocuments')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Documents</span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Team Lead Report'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Team Lead Report')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">
                    Team Reports
                  </span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}

      {['financeModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Today1'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Today1')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Tasks</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Payments'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Payments')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Payments</span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Bank Accounts'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Bank Accounts')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Bank</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Dashboard'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Dashboard')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}
      {['hrModule'].includes(sourceLink) && (
        <>
          <ul className="w-full">
            <li className="relative justify-center ">
              <span
                className={
                  'flex items-center justify-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'MyHR'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('MyHR')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-xs pl-1">Tasks</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'User Management'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('User Management')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}

                    <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Employees</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1 pt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'AssetsManagement'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('AssetsManagement')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#eb8909' }}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Assets</span>
                </span>
              </span>
            </li>

            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Bank Accounts'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Bank Accounts')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Bank</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'Roles Management'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('Roles Management')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#058527' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[9px] font-bold  pl-1">Access</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
            <li className="relative mt-1">
              <span
                className={
                  'flex items-center text-sm py-1  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded  rounded-tl-[30px] rounded-bl-[30px]  hover:text-blue-600 hover:bg-[#ecdbd1] transition duration-300 ease-in-out cursor-pointer ' +
                  (viewable === 'projectReports'
                    ? 'bg-[#ecdbd1] w-100 rounded-tl-[30px] rounded-bl-[30px] '
                    : '')
                }
                onClick={() => setViewable('projectReports')}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <span className="flex items-center flex-col pt-[8px]">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span className="text-[9px] font-bold  pl-1">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                </span>
              </span>
            </li>
          </ul>
        </>
      )}

      {/* <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 mt-auto rounded hover:bg-gray-300 ' +
          (pgName === 'erpAccount' ? 'bg-gray-300' : '')
        }
        // to={routes.erpAccount()}
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link> */}
    </div>
  )
}

export default SlimSideMenuBar
