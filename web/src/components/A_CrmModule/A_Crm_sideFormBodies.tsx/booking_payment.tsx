/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import {
  ChartPieIcon,
  OfficeBuildingIcon,
  PlusIcon,
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
import { useSnackbar } from 'notistack'

import { Link, routes } from '@redwoodjs/router'

import BankSelectionSwitchDrop from 'src/components/A_LoanModule/BankSelectionDroopDown'
import CaptureUnitPayment from 'src/components/FinanceModule/CapturePayment'
import DocRow from 'src/components/LegalModule/Docu_row'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  capturePaymentS,
  streamGetAllUnitTransactions,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { supabase } from 'src/context/supabase'
import { prettyDateTime } from 'src/util/dateConverter'

import CrmPaymentSummary from '../CrmPaymentSummary'
import CrmUnitPaymentGraph from '../CrmUnitPaymentGraph'

import PaymentDocUtility from './paymentDocUtility'
import CrmUnitPaymentSchedule from '../CrmPaymentSchedule'
import CrmUnitFinanceHistory from '../CrmUnitFinanceHistory'
import SiderForm from 'src/components/SiderForm/SiderForm'

// import BankSelectionSwitchDrop from './BankSelectionDroopDown'

export default function BookingPaymentFlow({
  type,
  setStatusFun,
  selUnitPayload,
}) {
  const [selLoanBank, setLoanBank] = useState({})
  const [preSanctionReview, SetPreSanctionReview] = useState('In-Review')
  const [newDemands, SetNewDemands] = useState('active_demands')
  const [newPayment, SetNewPayment] = useState(false)
  const [allPayment, SetAllPayment] = useState('active_payments')
  const [unitTransactionsA, setUnitTransactionsA] = useState([])
  const [openCapturePayment, setOpenCapturePayment] = useState(false)

  const [postSanctionReview, SetPostSanctionReview] = useState('In-Review')
  const [S1, setS1] = useState(false)
  const [S2, setS2] = useState(false)
  const [S3, setS3] = useState(true)
  const [S4, setS4] = useState(true)
  const [S5, setS5] = useState(true)
  const [S6, setS6] = useState(true)

  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }

  useEffect(() => {
    console.log('yo yo yo', selUnitPayload)
  }, [selUnitPayload])

  useEffect(() => {
    streamTransactions()
  }, [])
  useEffect(() => {
    getAllTransactionsUnit()
  }, [])

  const getAllTransactionsUnit = async () => {
    const { access, uid } = user

    const steamLeadLogs = await streamGetAllUnitTransactions(
      orgId,
      'snap',
      {
        unit_id: selUnitPayload?.id,
      },
      (error) => []
    )
    await setUnitTransactionsA(steamLeadLogs)
    return
  }
  const streamTransactions = () => {
    // Subscribe to real-time changes in the `${orgId}_accounts` table
    const subscription = supabase
      .from(`${orgId}_accounts`)
      .on('*', (payload) => {
        // When a change occurs, update the 'leadLogs' state with the latest data
        console.log('account records', payload)
        // Check if the updated data has the id 12
        const updatedData = payload.new
        const { id } = payload.old
        const updatedLeadLogs = [...unitTransactionsA]
        setUnitTransactionsA((prevLogs) => {
          const existingLog = prevLogs.find(
            (log) => log.id === id && log.unit_id === selUnitPayload?.id
          )

          if (existingLog) {
            console.log('Existing record found!')
            const updatedLogs = prevLogs.map((log) =>
              log.id === id ? payload.new : log
            )
            return [...updatedLogs]
          } else {
            console.log('New record added!', [...prevLogs, payload.new])
            if (payload?.new.unit_id === selUnitPayload?.id) {
              return [...prevLogs, payload.new]
            }
          }
        })
      })
      .subscribe()

    // Clean up the subscription when the component unmounts
    return () => {
      supabase.removeSubscription(subscription)
    }
  }
  const paymentCaptureFun = async (data, resetForm) => {
    const {
      pId: projectId,
      id: unitId,
      phaseId,
      customerDetailsObj,
    } = selUnitPayload
    const customLeadObj = { Name: customerDetailsObj?.customerName1 }
    data.category = 'Payment'
    const x = await capturePaymentS(
      orgId,
      true,
      projectId,
      unitId,
      8,
      customLeadObj,
      data,
      user?.email,
      enqueueSnackbar
    )
    await SetAllPayment('active_payments')
  }
  const openPaymentFun = () => {
    setOpenCapturePayment(true)
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
            <h2 className="font-medium flex-grow">Payments</h2>
            <p className="text-md text-[13px] flex-grow text-right">
              <span className="font-semibold text-blue-600">
                Unit-{selUnitPayload?.unit_no}
              </span>
              /{selUnitPayload?.projName}{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <CrmUnitPaymentGraph selCustomerPayload={selUnitPayload} />
        </div>
        <div className="ml-1">
          <CrmPaymentSummary selCustomerPayload={selUnitPayload} />
        </div>
      </div>
      <div className="flex flex-row">
        {/* 4 */}
        <div
          className={`border border-gray-200 w-[154px] cursor-pointer mt-2 ml-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
            allPayment === 'new_payments'
              ? 'bg-gradient-to-r from-violet-100 to-pink-100'
              : ''
          }`}
          onClick={() => {
            SetAllPayment('new_payments')
            openPaymentFun()


          }}
        >
          <div
            className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
              allPayment === 'new_payments' ? 'group-hover:bg-white' : ''
            }  `}
          >
            <PlusIcon
              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                allPayment === 'new_payments' ? 'text-indigo-600' : ''
              }`}
              aria-hidden="true"
            />
          </div>
          <div className="flex-auto">
            <a
              className={`block font-semibold text-gray-900 ${
                allPayment === 'new_payments' ? 'text-indigo-600' : ''
              } group-hover:text-indigo-600`}
            >
              {'New Payment'}
              <span className="absolute inset-0" />
            </a>
            {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
          </div>
        </div>
      </div>

      <div>

      <div>
          <CrmUnitPaymentSchedule
            selCustomerPayload={selUnitPayload}

          />
        </div>
        {/* Finance History */}
        <div>
          <CrmUnitFinanceHistory
            selCustomerPayload={selUnitPayload}

            unitTransactionsA={unitTransactionsA}
          />
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
        <section className="flex flex-col">
          <section className=" cursor-pointer " onClick={() => setS1(!S1)}>
            <section className="flex flex-row justify-between">
              <section className="flex flex-row w-full">
                <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                  <span className="text-[14px] mb-[2px]">1</span>
                </div>
                <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px] mb-2 border-b w-full">
                  Raise Demand
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
            <div className="flex flex-row">
              <div
                className={`border border-gray-200 w-[152px] group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  newDemands === 'all_demands'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetNewDemands('all_demands')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    newDemands ? 'group-hover:bg-white' : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      newDemands === 'all_demands' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      newDemands === 'all_demands' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'All Demands'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
              <div
                className={`border border-gray-200 ml-2 w-[152px] group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  newDemands === 'active_demands'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetNewDemands('active_demands')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    newDemands === 'active_demands'
                      ? 'group-hover:bg-white'
                      : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      newDemands === 'active_demands' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      newDemands === 'active_demands' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'Active Demand'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
              <div
                className={`border border-gray-200 ml-2 w-[152px] group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  newDemands === 'new_demands'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetNewDemands('new_demands')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    newDemands === 'new_demands' ? 'group-hover:bg-white' : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      newDemands === 'new_demands' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      newDemands === 'new_demands' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'New Demand'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
            </div>
          )}
          {S1 &&
            newDemands === 'all_demands' &&
            selUnitPayload.fullPs?.map((doc, i) => (
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
                <PaymentDocUtility
                  id={doc?.id}
                  key={doc?.id}
                  fileName={doc?.stage?.label}
                  date={doc?.elgFrom}
                />
              </section>
            ))}
          {S1 &&
            newDemands === 'active_demands' &&
            selUnitPayload.fullPs
              ?.filter((dataObj) => dataObj?.elgFrom != undefined)
              .map((doc, i) => (
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
                  <PaymentDocUtility
                    id={doc?.id}
                    key={doc?.id}
                    fileName={doc?.stage?.label}
                    date={doc?.elgFrom}
                  />
                </section>
              ))}
          {S1 &&
            newDemands === 'new_demands' &&
            selUnitPayload.fullPs
              ?.filter((dataObj) => dataObj?.elgFrom == undefined)
              .map((doc, i) => (
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
                  <PaymentDocUtility
                    id={doc?.id}
                    key={doc?.id}
                    fileName={doc?.stage?.label}
                    date={doc?.elgFrom}
                  />
                </section>
              ))}
        </section>
      </div>
      <div className="max-w-3xl mx-auto py-3 text-sm text-gray-700">
        <section className="flex flex-col">
          <section className="cursor-pointer" onClick={() => setS2(!S2)}>
            <section className="flex flex-row ">
              <div className="rounded-full font-bold bg-gradient-to-r from-violet-200 to-pink-200 h-7 w-7 flex items-center justify-center mr-2">
                <span className="text-[14px] mb-[2px]">2</span>
              </div>
              <section className=" w-full border-b">
                <section className="flex flex-row justify-between">
                  <section className="flex flex-row w-full">
                    <p className="mt- pb-2 font-semibold text-gray-600  mt-[4px]   w-full">
                      Capture Payments
                    </p>
                  </section>
                  {!S2 && (
                    <p className="mt- pb-2 font-semibold text-blue-600  mt-[4px]  mr-2  w-[300px] text-right">
                      {`${unitTransactionsA?.length} Payments`}
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
            <div className="flex flex-row ">
              <div
                className={`border border-gray-200 w-[154px] cursor-pointer mt-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  allPayment === 'all_payments'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetAllPayment('all_payments')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    allPayment === 'all_payments' ? 'group-hover:bg-white' : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      allPayment === 'all_payments' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      allPayment === 'all_payments' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'All Payments'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
              <div
                className={`border border-gray-200 w-[170px] cursor-pointer mt-2 ml-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  allPayment === 'active_payments'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetAllPayment('active_payments')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    allPayment === 'active_payments'
                      ? 'group-hover:bg-white'
                      : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      allPayment === 'active_payments' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      allPayment === 'active_payments' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'Active Payments'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
              <div
                className={`border border-gray-200 w-[154px] cursor-pointer mt-2 ml-2 group relative flex items-center gap-x-2 rounded-lg p-1 pr-4  text-sm leading-6 hover:bg-gray-50 ${
                  allPayment === 'new_payments'
                    ? 'bg-gradient-to-r from-violet-100 to-pink-100'
                    : ''
                }`}
                onClick={() => {
                  SetAllPayment('new_payments')
                }}
              >
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-50 ${
                    allPayment === 'new_payments' ? 'group-hover:bg-white' : ''
                  }  `}
                >
                  <PlusIcon
                    className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 ${
                      allPayment === 'new_payments' ? 'text-indigo-600' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <a
                    className={`block font-semibold text-gray-900 ${
                      allPayment === 'new_payments' ? 'text-indigo-600' : ''
                    } group-hover:text-indigo-600`}
                  >
                    {'New Payment'}
                    <span className="absolute inset-0" />
                  </a>
                  {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                </div>
              </div>
            </div>
          )}
          {S2 && allPayment === 'all_payments' && (
            <section className="mt-1 ml-5 container">
              {unitTransactionsA?.length === 0 ? (
                <div className="w-full text-center py-5">No documents</div>
              ) : (
                ''
              )}
              {unitTransactionsA
                ?.sort((a, b) => {
                  return b.txt_dated - a.txt_dated
                })
                .map((doc, i) => (
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
                      amount={doc?.totalAmount}
                      fileName={doc?.payReason}
                      status={doc?.status}
                      date={doc?.created_at}
                    />
                  </section>
                ))}
            </section>
          )}
          {S2 && allPayment === 'active_payments' && (
            <section className="mt-1 ml-5 container">
              {unitTransactionsA?.map((doc, i) => (
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
                    amount={doc?.totalAmount}
                    fileName={doc?.payReason}
                    status={doc?.status}
                    date={doc?.created_at}
                  />
                </section>
              ))}
            </section>
          )}
          {S2 && allPayment === 'new_payments' && (
            <section className="mt-1 container">
              <CaptureUnitPayment
                selUnitDetails={selUnitPayload}
                onSubmitFun={paymentCaptureFun}
              />
            </section>
          )}
        </section>
      </div>
      <SiderForm
        open={openCapturePayment}
        setOpen={setOpenCapturePayment}
        title={'capturePayment'}
        unitsViewMode={false}
        widthClass="max-w-xl"
        selUnitDetails={selUnitPayload}
        paymentCaptureFun={paymentCaptureFun}
      />
    </section>
  )
}
