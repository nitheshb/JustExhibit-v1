/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import {
  ChartPieIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
  PuzzleIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  FireIcon,
  CurrencyRupeeIcon,
  DotsVerticalIcon,
  CheckIcon,
  DocumentTextIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

import BankSelectionSwitchDrop from 'src/components/A_LoanModule/BankSelectionDroopDown'
import DocRow from 'src/components/LegalModule/Docu_row'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'
import CostBreakUpSheet from 'src/components/costBreakUpSheet'
import CSManagerApprovalBody from './cs_manager_approval_body'

// import BankSelectionSwitchDrop from './BankSelectionDroopDown'

export default function CsMangerApprovalFlow({ type, setStatusFun , selUnitPayload}) {
  const [selLoanBank, setLoanBank] = useState({})
  const [preSanctionReview, SetPreSanctionReview] = useState('In-Review')
  const [postSanctionReview, SetPostSanctionReview] = useState('In-Review')
  const [S1, setS1] = useState(true)
  const [S2, setS2] = useState(true)
  const [S3, setS3] = useState(true)
  const [S4, setS4] = useState(true)
  const [S5, setS5] = useState(true)
  const [S6, setS6] = useState(true)

  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  return (
    <section className="bg-white w-full md:px-10 md:mb-20 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
      <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
        {/* <div className="flex p-4 items-center justify-between">
          <div className="flex flex-row">
            <h2 className="font-medium flex-grow">Bank Loan Process</h2>

            <span
              className=" ml-2 text-blue-500 hover:underline"
              onClick={() => {

              }}
            >
              Add Doc
            </span>
          </div>
          <p className="mr4">Date Created</p>

        </div> */}
        <div className="mt-1">
          <div className="p-2 bg-gradient-to-r from-violet-50 to-pink-50 rounded-md flex flex-row justify-between">
            <h2 className="font-medium flex-grow">Cost Sheet Approval</h2>
            <p className="text-md text-[10px] flex-grow text-right">
              Waiting for banker sanction{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
        <section className="flex flex-col">
          <section className=" ">
            <section className="flex flex-row justify-between">
              <section className="flex flex-row w-full">
                <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                  <span className="text-[14px] mb-[2px]">1</span>
                </div>
                <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px] mb-2 border-b w-full">
                  Manager Approval
                </p>
              </section>

              {!S1 && (
                <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px] mb-2 mr-2 border-b w-[300px] text-right">
                  {selLoanBank?.bName || 'NA'}
                </p>
              )}
              {S1 && (
                <ArrowUpIcon
                  className="w-[14px] h-[14px]  mt-[8px] text-blue-600"
                  onClick={() => setS1(!S1)}
                />
              )}
              {!S1 && (
                <ArrowDownIcon
                  className="w-[18px] h-[18px] mt-[7px]"
                  onClick={() => setS1(!S1)}
                />
              )}
            </section>
          </section>
          {S1 && (
            <section className="mt-1 ml-9 container">
              <CSManagerApprovalBody selUnitPayload={selUnitPayload} />
                     {/* <CostBreakUpSheet
                  selMode={'Detail View'}
                  title="Cost Break Up Sheetx"
                  leadDetailsObj1={{}}
                  selPhaseObj={{}}
                  unitDetails={selUnitPayload}
                  projectDetails={{}}
                  setShowCostSheetWindow={()=>{}}
                  selUnitDetails={selUnitPayload}
                /> */}
            </section>
          )}
        </section>
      </div>
      <div className="max-w-3xl mx-auto py-3 text-sm text-gray-700">
        <section className="flex flex-col">
          <section className=" ">
            <section className="flex flex-row ">
              <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                <span className="text-[14px] mb-[2px]">2</span>
              </div>
              <section className=" w-full border-b">
                <section className="flex flex-row justify-between">
                  <section className="flex flex-row w-full">
                    <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px]   w-full">
                      Capture Payment
                    </p>
                  </section>
                  {!S2 && (
                    <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px]  mr-2  w-[300px] text-right">
                      {'0 Docs Uploaded'}
                    </p>
                  )}
                  {S2 && (
                    <ArrowUpIcon
                      className="w-[14px] h-[14px]  mt-[6px] text-blue-600"
                      onClick={() => setS2(!S2)}
                    />
                  )}
                  {!S2 && (
                    <ArrowDownIcon
                      className="w-[18px] h-[18px] mt-[5px]"
                      onClick={() => setS2(!S2)}
                    />
                  )}
                </section>
              </section>
            </section>
          </section>
          {S2 && (
            <section className="mt-1 ml-5 container">
              {[
                { id: 1234, name: 'EC', time: '22-Nov-2022' },
                {
                  id: 1235,
                  name: 'Agreement',
                  time: '24-Nov-2022',
                },
                {
                  id: 1236,
                  name: 'Register Doc',
                  time: '2-Dec-2022',
                },
              ].length === 0 ? (
                <div className="w-full text-center py-5">No documents</div>
              ) : (
                ''
              )}
              {[
                { id: 1234, name: 'Payslips', time: '22-Nov-2022' },
                {
                  id: 1235,
                  name: 'Bank Statement',
                  time: '24-Nov-2022',
                },
                {
                  id: 1236,
                  name: 'ITR/Form-16',
                  time: '2-Dec-2022',
                },
                {
                  id: 1236,
                  name: 'Present Address Proof',
                  time: '2-Dec-2022',
                },
                {
                  id: 1236,
                  name: 'Appointment letter from HR',
                  time: '2-Dec-2022',
                },
              ]?.map((doc, i) => (
                <section
                  key={i}
                  onClick={() => {
                    // show sidebar and display the worddoc
                    setSliderInfo({
                      open: true,
                      title: 'viewDocx',
                      sliderData: {},
                      widthClass: 'max-w-xl',
                    })
                  }}
                >
                  <DocRow
                    id={doc?.id}
                    fileName={doc?.name}
                    date={doc?.time}
                  />
                </section>
              ))}
            </section>
          )}
        </section>
      </div>
      <div className="max-w-3xl mx-auto py-3 text-sm text-gray-700">
        <section className="flex flex-col">
          <section className=" ">
            <section className="flex flex-row ">
              <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                <span className="text-[14px] mb-[2px]">3</span>
              </div>
              <section className=" w-full border-b">
                <section className="flex flex-row justify-between">
                  <section className="flex flex-row w-full">
                    <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px]   w-full">
                      Finance Review
                    </p>
                  </section>
                  {!S3 && (
                    <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px]  mr-2  w-[300px] text-right">
                      {preSanctionReview}
                    </p>
                  )}
                  {S3 && (
                    <ArrowUpIcon
                      className="w-[14px] h-[14px]  mt-[6px] text-blue-600"
                      onClick={() => setS3(!S3)}
                    />
                  )}
                  {!S3 && (
                    <ArrowDownIcon
                      className="w-[18px] h-[18px] mt-[5px]"
                      onClick={() => setS3(!S3)}
                    />
                  )}
                </section>
              </section>
            </section>
          </section>
          {S3 && (
            <section className="mt-3 ml-9 container">
              <div className="flex flex-row">
                <div
                  className={`border border-gray-200  group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                    preSanctionReview === 'In-Review'
                      ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                      : ''
                  }`}
                  onClick={() => {
                    SetPreSanctionReview('In-Review')
                  }}
                >
                  <div
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                      preSanctionReview === 'In-Review'
                        ? 'group-hover:bg-white'
                        : ''
                    }  `}
                  >
                    <OfficeBuildingIcon
                      className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                        preSanctionReview === 'In-Review'
                          ? 'text-indigo-600'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto">
                    <a
                      className={`block font-semibold text-gray-900 ${
                        preSanctionReview === 'In-Review'
                          ? 'text-indigo-600'
                          : ''
                      } group-hover:text-indigo-600`}
                    >
                      {'In-Review'}
                      <span className="absolute inset-0" />
                    </a>
                    {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                  </div>
                </div>

                <div
                  className={`border border-gray-200 ml-2  group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                    preSanctionReview === 'Approved'
                      ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                      : ''
                  }`}
                  onClick={() => {
                    SetPreSanctionReview('Approved')
                  }}
                >
                  <div
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                      preSanctionReview === 'Approved'
                        ? 'group-hover:bg-white'
                        : ''
                    }  `}
                  >
                    <OfficeBuildingIcon
                      className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                        preSanctionReview === 'Approved'
                          ? 'text-indigo-600'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto">
                    <a
                      className={`block font-semibold text-gray-900 ${
                        preSanctionReview === 'Approved'
                          ? 'text-indigo-600'
                          : ''
                      } group-hover:text-indigo-600`}
                    >
                      {'Approved'}
                      <span className="absolute inset-0" />
                    </a>
                    {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                  </div>
                </div>
                <div
                  className={`border border-gray-200 ml-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                    preSanctionReview === 'Rejected'
                      ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                      : ''
                  }`}
                  onClick={() => {
                    SetPreSanctionReview('Rejected')
                  }}
                >
                  <div
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                      preSanctionReview === 'Rejected'
                        ? 'group-hover:bg-white'
                        : ''
                    }  `}
                  >
                    <OfficeBuildingIcon
                      className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                        preSanctionReview === 'Rejected'
                          ? 'text-indigo-600'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto">
                    <a
                      className={`block font-semibold text-gray-900 ${
                        preSanctionReview === 'Rejected'
                          ? 'text-indigo-600'
                          : ''
                      } group-hover:text-indigo-600`}
                    >
                      {'Rejected'}
                      <span className="absolute inset-0" />
                    </a>
                    {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                  </div>
                </div>
              </div>
              {preSanctionReview === 'In-Review' && (
                <div className="mt-2">
                  <div className="p-4 bg-gray-200 rounded-md">
                    Under Bank review from last 32 days
                  </div>
                </div>
              )}
              {preSanctionReview === 'Approved' && (
                <div className="mt-2">
                  {[
                    { id: 1234, name: 'Sanction Letter', time: '22-Nov-2022' },
                  ]?.map((doc, i) => (
                    <section
                      key={i}
                      onClick={() => {
                        // show sidebar and display the worddoc
                      }}
                    >
                      <DocRow
                        id={doc?.id}
                        fileName={doc?.name}
                        date={doc?.time}
                      />
                    </section>
                  ))}
                </div>
              )}

              {preSanctionReview === 'Rejected' && (
                <div className="mt-2">
                  <div className="p-4 bg-gray-200 rounded-md">
                    Enter Rejected Reason
                  </div>
                </div>
              )}
            </section>
          )}
        </section>
      </div>
      {preSanctionReview === 'Approved' && (
        <div className="max-w-3xl mx-auto py-3 text-sm text-gray-700">
          <section className="flex flex-col">
            <section className="flex flex-row ">
              <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                <span className="text-[14px] mb-[2px]">4</span>
              </div>
              <section className=" w-full border-b">
                <section className="flex flex-row justify-between">
                  <section className="flex flex-row w-full">
                    <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px]   w-full">
                      Documents for post-sanction banker review
                    </p>
                  </section>
                  {!S4 && (
                    <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px]  mr-2  w-[300px] text-right">
                      {'0 Docs Uploaded'}
                    </p>
                  )}
                  {S4 && (
                    <ArrowUpIcon
                      className="w-[14px] h-[14px]  mt-[6px] text-blue-600"
                      onClick={() => setS4(!S4)}
                    />
                  )}
                  {!S4 && (
                    <ArrowDownIcon
                      className="w-[18px] h-[18px] mt-[5px]"
                      onClick={() => setS4(!S4)}
                    />
                  )}
                </section>
              </section>
            </section>
            {S4 && (
              <section className="mt-1 ml-5 container">
                {[
                  {
                    id: 1235,
                    name: 'ATS',
                    time: '24-Nov-2022',
                  },

                  {
                    id: 1236,
                    name: 'Cost break-up',
                    time: '2-Dec-2022',
                  },
                  {
                    id: 1236,
                    name: 'Demand Letter',
                    time: '2-Dec-2022',
                  },
                  {
                    id: 1236,
                    name: 'Payment Receipts',
                    time: '2-Dec-2022',
                  },
                  {
                    id: 1236,
                    name: 'Builder Noc',
                    time: '2-Dec-2022',
                  },
                  {
                    id: 1236,
                    name: 'ATB',
                    time: '2-Dec-2022',
                  },
                  {
                    id: 1236,
                    name: 'TPA',
                    time: '2-Dec-2022',
                  },
                ]?.map((doc, i) => (
                  <section
                    key={i}
                    onClick={() => {
                      // show sidebar and display the worddoc
                      setSliderInfo({
                        open: true,
                        title: 'viewDocx',
                        sliderData: {},
                        widthClass: 'max-w-xl',
                      })
                    }}
                  >
                    <DocRow
                      id={doc?.id}
                      fileName={doc?.name}
                      date={doc?.time}
                    />
                  </section>
                ))}
              </section>
            )}
          </section>
        </div>
      )}
      {preSanctionReview === 'Approved' && (
        <div className="max-w-3xl mx-auto py-3 text-sm text-gray-700">
          <section className="flex flex-col">
            <section className=" ">
              <section className=" ">
                <section className="flex flex-row ">
                  <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                    <span className="text-[14px] mb-[2px]">5</span>
                  </div>
                  <section className=" w-full border-b">
                    <section className="flex flex-row justify-between">
                      <section className="flex flex-row w-full">
                        <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px]   w-full">
                          Post-Sanction Banker Review
                        </p>
                      </section>
                      {!S5 && (
                        <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px]  mr-2  w-[300px] text-right">
                          {postSanctionReview}
                        </p>
                      )}
                      {S5 && (
                        <ArrowUpIcon
                          className="w-[14px] h-[14px]  mt-[6px] text-blue-600"
                          onClick={() => setS5(!S5)}
                        />
                      )}
                      {!S5 && (
                        <ArrowDownIcon
                          className="w-[18px] h-[18px] mt-[5px]"
                          onClick={() => setS5(!S5)}
                        />
                      )}
                    </section>
                  </section>
                </section>
              </section>
            </section>
            {S5 && (
              <section className="mt-1 ml-9 container">
                <div className="flex flex-row">
                  <div
                    className={`border border-gray-200  group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                      postSanctionReview === 'In-Review'
                        ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                        : ''
                    }`}
                    onClick={() => {
                      SetPostSanctionReview('In-Review')
                    }}
                  >
                    <div
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                        postSanctionReview === 'In-Review'
                          ? 'group-hover:bg-white'
                          : ''
                      }  `}
                    >
                      <OfficeBuildingIcon
                        className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                          postSanctionReview === 'In-Review'
                            ? 'text-indigo-600'
                            : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        className={`block font-semibold text-gray-900 ${
                          postSanctionReview === 'In-Review'
                            ? 'text-indigo-600'
                            : ''
                        } group-hover:text-indigo-600`}
                      >
                        {'In-Review'}
                        <span className="absolute inset-0" />
                      </a>
                      {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                    </div>
                  </div>

                  <div
                    className={`border border-gray-200 ml-2  group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                      postSanctionReview === 'Approved'
                        ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                        : ''
                    }`}
                    onClick={() => {
                      SetPostSanctionReview('Approved')
                    }}
                  >
                    <div
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                        postSanctionReview === 'Approved'
                          ? 'group-hover:bg-white'
                          : ''
                      }  `}
                    >
                      <OfficeBuildingIcon
                        className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                          postSanctionReview === 'Approved'
                            ? 'text-indigo-600'
                            : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        className={`block font-semibold text-gray-900 ${
                          postSanctionReview === 'Approved'
                            ? 'text-indigo-600'
                            : ''
                        } group-hover:text-indigo-600`}
                      >
                        {'Approved'}
                        <span className="absolute inset-0" />
                      </a>
                      {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                    </div>
                  </div>
                  <div
                    className={`border border-gray-200 ml-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                      postSanctionReview === 'Rejected'
                        ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                        : ''
                    }`}
                    onClick={() => {
                      SetPostSanctionReview('Rejected')
                    }}
                  >
                    <div
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                        postSanctionReview === 'Rejected'
                          ? 'group-hover:bg-white'
                          : ''
                      }  `}
                    >
                      <OfficeBuildingIcon
                        className={`h-6 w-6 text-gray-600 group-hover:text-indigo-600 ${
                          postSanctionReview === 'Rejected'
                            ? 'text-indigo-600'
                            : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        className={`block font-semibold text-gray-900 ${
                          postSanctionReview === 'Rejected'
                            ? 'text-indigo-600'
                            : ''
                        } group-hover:text-indigo-600`}
                      >
                        {'Rejected'}
                        <span className="absolute inset-0" />
                      </a>
                      {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                    </div>
                  </div>
                </div>
                {postSanctionReview === 'In-Review' && (
                  <div className="mt-4">
                    <div className="p-4 bg-gray-200 rounded-md">
                      Under Bank review from last 32 days
                    </div>
                  </div>
                )}
                {postSanctionReview === 'Approved' && (
                  <>
                    <div className="mt-4">
                      {[
                        {
                          id: 1234,
                          name: 'Loan Approval',
                          time: '22-Nov-2022',
                        },
                      ]?.map((doc, i) => (
                        <section
                          key={i}
                          onClick={() => {
                            // show sidebar and display the worddoc
                          }}
                        >
                          <DocRow
                            id={doc?.id}
                            fileName={doc?.name}
                            date={doc?.time}
                          />
                        </section>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="p-4 bg-gradient-to-r from-violet-100 to-pink-100 rounded-md">
                        {'Congrulations on Loan Approval  :-)'}
                      </div>
                    </div>
                  </>
                )}

                {postSanctionReview === 'Rejected' && (
                  <div className="mt-4">
                    <div className="p-4 bg-gray-200 rounded-md">
                      Enter Rejected Reason
                    </div>
                  </div>
                )}
              </section>
            )}
          </section>
        </div>
      )}
    </section>
  )
}
