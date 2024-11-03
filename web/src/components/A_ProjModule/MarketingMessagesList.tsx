/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import PencilIcon from '@heroicons/react/solid/PencilIcon'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import { useSnackbar } from 'notistack'

import { sourceListItems } from 'src/constants/projects'
import {
  deleteBankAccount,
  steamBankDetailsList,
  steamVirtualAccountsList,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'

import SiderForm from '../SiderForm/SiderForm'

import SourceAddTemplate from './SourceAddTemplate'

const MarkeingMessagesList = ({ title, pId, data }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [testPhNo, setTestPhNo] = useState('')
  const [wbSelPayload, setWbSelPayload] = useState({})
  const [selCat, setSelCat] = useState('enquiry_journey_status')

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: 'Bank Account',
    sliderData: {},
    widthClass: 'max-w-xl',
  })

  const phKeyFieldFun = (e) => {
    setTestPhNo(e.target.value)
  }
  const triggerWhatsAppFun = (data) => {
    setIsOpenSideView(true)

    console.log('i was here', data, isOpenSideView)
    const { event } = data
    const payload = {
      event: event,
      target: 'customer',
      type: 'wa',
      scope: 'allProjects',
    }

    setWbSelPayload(payload)
  }

  const triggerEmailFun = (txt) => {}

  return (
    <>
      <div className="flex overflow-x-auto ml-2  border-b pb-2">
        <section className="mt-4">Templates</section>
        {[
          { label: 'Enquiry Journey Status', value: 'enquiry_journey_status' },
          { label: 'Stalls', value: 'CRM_status' },
          { label: 'Legal', value: 'Legal_status' },
          { label: 'Finance', value: 'Finance_status' },
          { label: 'HR', value: 'hr_status' },
          { label: 'Sources', value: 'source' },
        ].map((data, i) => {
          return (
            <section
              key={i}
              className="flex  mt-[18px]"
              onClick={() => {
                console.log('am i clicked', data.value)
                setSelCat(data.value)
              }}
            >
              <button>
                <span
                  className={`flex ml-2 items-center h-6 px-3 text-xs  ${
                    selCat === data.value
                      ? 'font-normal text-green-800 bg-[#FFEDEA]'
                      : 'font-normal text-black-100 bg-[#f0f8ff]'
                  }  rounded-full`}
                >
                  {/* <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" /> */}
                  <img alt="" src="/temp2.png" className="h-3 w-3 mr-1" />
                  {data?.label}
                </span>
              </button>
            </section>
          )
        })}
      </div>
      {selCat === 'source' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {'Source List'}
              </h2>
              <SourceAddTemplate phase={{}} source={sourceListItems} />
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="border-b">
                    <th></th>
                    <th className="text-left p-[10px] pr-[12px] pl-0 text-xs text-green-800 ">
                      Source Name
                    </th>
                    <th className="text-center p-[10px] pl-[20px] text-xs text-green-800">
                      {' '}
                      Tags List
                    </th>
                    {/* <th className="text-center p-[10px] text-xs text-green-800">
               Registration Executive
             </th>
             <th className="text-center p-[10px] text-xs text-green-800">
               Registration Manager
             </th> */}
                  </tr>
                </thead>
                <tbody>
                  {sourceListItems.map((data, i) => {
                    return (
                      <tr key={i} className="mt-4">
                        <td className=" w-[34px]">
                          <div className="ml-5">
                            <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center text-xs relative">
                              {i + 1}
                              {')'}
                            </div>
                          </div>
                        </td>
                        <td className="py-2 pr-2  font-medium text-xs leading-6  whitespace-nowrap">
                          {data.label}
                        </td>
                        <td className="ml-2 pl-6">
                          {data.rep.map((d, i) => (
                            <span
                              key={i}
                              className=" items-center cursor-pointer h-6  text-xs  text-green-800"
                            >
                              {d}
                              {','}
                            </span>
                          ))}
                        </td>

                        <td className="ml-2 pl-6">
                          <span
                            className=" ml-2 items-center cursor-pointer text-xs  text-green-800"
                            onClick={() => {
                              triggerWhatsAppFun(data)
                            }}
                          >
                            <img
                              className="w-[25px] h-[25px] inline mr-"
                              alt=""
                              src="/wa3.png"
                            />
                          </span>
                          <span className=" items-center cursor-pointer h-6 px-3 text-xs  text-green-800">
                            <img
                              className="w-[20px] h-[20px] inline mr-2"
                              alt=""
                              src="/g1.png"
                            />
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
      {selCat === 'enquiry_journey_status' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {'Registration Executive Notifications'}
              </h2>
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="border-b">
                    <th></th>
                    <th className="text-left p-[10px] pr-[12px] pl-0 text-xs text-green-800 ">
                      Event
                    </th>
                    <th className="text-center p-[10px] pl-[20px] text-xs text-green-800">
                      {' '}
                      Customer
                    </th>
                    <th className="text-center p-[10px] text-xs text-green-800">
                      Registration Executive
                    </th>
                    <th className="text-center p-[10px] text-xs text-green-800">
                      Registration Manager
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      btnTxt: 'On Enquiry',
                      target: 'customer',
                      event: 'on_enquiry',
                    },
                    {
                      btnTxt: 'Lead Assigned',
                      target: 'customer',
                      event: 'on_lead_assign',
                    },
                    {
                      btnTxt: 'Lead Re-Assigned',
                      target: 'customer',
                      event: 'on_reassign',
                    },
                    {
                      btnTxt: 'On Site Visit fix',
                      target: 'customer',
                      event: 'on_sitevisit_fix',
                    },
                    {
                      btnTxt: 'On Site Visit Reschedule',
                      target: 'customer',
                      event: 'on_sitevisit_reschedule',
                    },
                    {
                      btnTxt: 'On Site Visit Cancellation',
                      target: 'customer',
                      event: 'on_sitevisit_cancel',
                    },
                    {
                      btnTxt: 'On Site Visit Completion',
                      target: 'customer',
                      event: 'on_sitevisit_done',
                    },
                    {
                      btnTxt: 'On Lead Not-Interested',
                      target: 'customer',
                      event: 'on_not_interested',
                    },
                    {
                      btnTxt: 'On Booking',
                      target: 'customer',
                      event: 'on_booking',
                    },
                  ].map((data, i) => (
                    <tr key={i} className="mt-4">
                      <td className=" w-[34px]">
                        <div className="ml-5">
                          <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center text-xs relative">
                            {i + 1}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 pr-2  font-medium text-xs leading-6  whitespace-nowrap">
                        {data.btnTxt}
                      </td>
                      <td className="ml-2 pl-6">
                        <span
                          className=" ml-2 items-center cursor-pointer text-xs  text-green-800"
                          onClick={() => {
                            console.log('iw as clicked')
                            triggerWhatsAppFun(data)
                          }}
                        >
                          <img
                            className="w-[25px] h-[25px] inline mr-"
                            alt=""
                            src="/wa3.png"
                          />
                        </span>
                        <span className=" items-center cursor-pointer h-6 px-3 text-xs  text-green-800">
                          <img
                            className="w-[20px] h-[20px] inline mr-2"
                            alt=""
                            src="/g1.png"
                          />
                        </span>
                      </td>

                      <td className="ml-2 pl-6">
                        <span
                          className=" ml-2 items-center cursor-pointer text-xs  text-green-800"
                          onClick={() => {
                            triggerWhatsAppFun(data)
                          }}
                        >
                          <img
                            className="w-[25px] h-[25px] inline mr-"
                            alt=""
                            src="/wa3.png"
                          />
                        </span>
                        <span className=" items-center cursor-pointer h-6 px-3 text-xs  text-green-800">
                          <img
                            className="w-[20px] h-[20px] inline mr-2"
                            alt=""
                            src="/g1.png"
                          />
                        </span>
                      </td>
                      <td className="ml-2 pl-6">
                        <span
                          className=" ml-2 items-center cursor-pointer text-xs  text-green-800"
                          onClick={() => {
                            triggerWhatsAppFun(data)
                          }}
                        >
                          <img
                            className="w-[25px] h-[25px] inline mr-"
                            alt=""
                            src="/wa3.png"
                          />
                        </span>
                        <span className=" items-center cursor-pointer h-6 px-3 text-xs  text-green-800">
                          <img
                            className="w-[20px] h-[20px] inline mr-2"
                            alt=""
                            src="/g1.png"
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
      {/* <div className="w-full  flex flex-row">
        {selCat === 'enquiry_journey_status' && (
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {'Lead/Client Notifications'}
              </h2>

              <div className=" justify-between mb-4">
                {[
                  { btnTxt: 'On Payment Request', target: 'Registration Customer' },
                  { btnTxt: 'On Payment Receival', target: 'Registration Customer' },
                  {
                    btnTxt: 'On Payament Accepted',
                    target: 'Registration Customer',
                  },
                  {
                    btnTxt: 'On CostSheet Approval',
                    target: 'Registration Customer',
                  },
                ].map((data, i) => (
                  <section key={i}>
                    <div className="flex flex-row justify-between">
                      <section className="flex  mt-[18px]">
                        <button>
                          <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                            <PencilIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            {data?.btnTxt}
                          </span>
                        </button>
                      </section>

                      <section className="flex  mt-[18px]">
                        <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                          {data?.target}
                        </span>
                      </section>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        )}
      </div> */}

      {/* Crm block */}
      {selCat === 'CRM_status' && (
        <div className="w-full  flex flex-row">
          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Customer Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      { btnTxt: 'On Payment', target: 'Stalls Customer' },
                      { btnTxt: 'On Customer Assign', target: 'Stalls Customer' },
                      {
                        btnTxt: 'On Construction Update',
                        target: 'Stalls Customer',
                      },
                      { btnTxt: 'On Payment Approval', target: 'Stalls Customer' },
                      { btnTxt: 'On Payment Rejected', target: 'Stalls Customer' },
                      { btnTxt: 'On Payment', target: 'Stalls Customer' },
                      { btnTxt: 'On Payment', target: 'Stalls Customer' },
                      { btnTxt: 'On Deletion', target: 'Stalls Customer' },
                      { btnTxt: 'On Booking', target: 'Stalls Customer' },
                      { btnTxt: 'On Payment Request', target: 'Stalls Customer' },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>

          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Stalls Executive Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      { btnTxt: 'On Payment', target: 'Stalls Executive' },
                      { btnTxt: 'On Customer Assign', target: 'Stalls Executive' },
                      {
                        btnTxt: 'On Construction Update',
                        target: 'Stalls Executive',
                      },
                      {
                        btnTxt: 'On Payment Approval',
                        target: 'Stalls Executive',
                      },
                      {
                        btnTxt: 'On Payment Rejected',
                        target: 'Stalls Executive',
                      },
                      { btnTxt: 'On Booking', target: 'Stalls Customer' },
                      { btnTxt: 'On Payment Request', target: 'Stalls Executive' },
                      {
                        btnTxt: 'On Payment Receival',
                        target: 'Stalls Executive',
                      },
                      { btnTxt: 'On Payment Accepted', target: 'Stalls Customer' },
                      {
                        btnTxt: 'On CostSheet Approval',
                        target: 'Stalls Executive',
                      },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>
          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Stalls Manager Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      { btnTxt: 'On Payment', target: 'Stalls Manager' },
                      { btnTxt: 'On Customer Assign', target: 'Stalls Manager' },
                      {
                        btnTxt: 'On Construction Update',
                        target: 'Stalls Manager',
                      },
                      { btnTxt: 'On Payment Approval', target: 'Stalls Manager' },
                      { btnTxt: 'On Payment Rejected', target: 'Stalls Manager' },
                      { btnTxt: 'On Payment', target: 'Stalls Manager' },
                      { btnTxt: 'On Booking', target: 'Stalls Manager' },
                      { btnTxt: 'On Payment Receival', target: 'Stalls Manager' },
                      { btnTxt: 'On Payment Accepted', target: 'Stalls Manager' },
                      { btnTxt: 'On Payment Request', target: 'Stalls Manager' },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>
        </div>
      )}

      {/* Finance Block  */}
      {selCat === 'Finance_status' && (
        <div className="w-full  flex flex-row">
          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Legal Team Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      {
                        btnTxt: 'On Enquiry Receival',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On Registration Agent Assign',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On Site Visit fix',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On Site Visit Completion',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On NotInterested',
                        target: 'Finance Customer',
                      },
                      { btnTxt: 'On Booking', target: 'Finance Customer' },
                      {
                        btnTxt: 'On Payment Request',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On Payment Receival',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On Payament Accepted',
                        target: 'Finance Customer',
                      },
                      {
                        btnTxt: 'On CostSheet Approval',
                        target: 'Finance Customer',
                      },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>

          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Finance Executive Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      {
                        btnTxt: 'On Enquiry Receival',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On Registration Agent Assign',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On Site Visit fix',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On Site Visit Completion',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On NotInterested',
                        target: 'Finance Executive',
                      },
                      { btnTxt: 'On Booking', target: 'Finance Executive' },
                      {
                        btnTxt: 'On Payment Request',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On Payment Receival',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On Payament Accepted',
                        target: 'Finance Executive',
                      },
                      {
                        btnTxt: 'On CostSheet Approval',
                        target: 'Finance Executive',
                      },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>

          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Finace Manager Notifications'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      {
                        btnTxt: 'On Enquiry Receival',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On Registration Agent Assign',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On Site Visit fix',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On Site Visit Completion',
                        target: 'Finance Manager',
                      },
                      { btnTxt: 'On NotInterested', target: 'Finance Manager' },
                      { btnTxt: 'On Booking', target: 'Finance Manager' },
                      {
                        btnTxt: 'On Payment Request',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On Payment Receival',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On Payament Accepted',
                        target: 'Finance Manager',
                      },
                      {
                        btnTxt: 'On CostSheet Approval',
                        target: 'Finance Manager',
                      },
                    ].map((data, i) => (
                      <section key={i}>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>
        </div>
      )}
      {/* Legal_status */}
      {selCat === 'Legal_status' && (
        <div className="w-full  flex flex-row">
          <div className="lg:col-span-2 mr-4">
            <div>
              <section className="m-4 inline-block">
                <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
                  <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                    {'Registration Templates'}
                  </h2>

                  <div className=" justify-between mb-4">
                    {[
                      { btnTxt: 'On Payment', target: 'Registration Executive' },
                      { btnTxt: 'On testing', target: 'Executive' },
                      { btnTxt: 'On Lead Assign', target: 'Registration Executive' },
                      { btnTxt: 'On Creation', target: 'Customer' },
                      { btnTxt: 'On Creation', target: 'Registration Executive' },
                      { btnTxt: 'On Creation', target: 'Manager' },
                      { btnTxt: 'On Creation', target: 'Administrator' },
                      { btnTxt: 'On Assignment', target: 'Customer' },
                      { btnTxt: 'On Assignment', target: 'Registration Executive' },
                      { btnTxt: 'On Assignment', target: 'Manager' },
                      { btnTxt: 'On Assignment', target: 'Administrator' },
                      { btnTxt: 'On Transfer', target: 'Customer' },
                      { btnTxt: 'On Transfer', target: 'Registration Executive' },
                      { btnTxt: 'On Transfer', target: 'Manager' },
                      { btnTxt: 'On Transfer', target: 'Administrator' },
                      { btnTxt: 'On De-assignment', target: 'Customer' },

                      { btnTxt: 'On De-assignment', target: 'Registration Executive' },

                      { btnTxt: 'On De-assignment', target: 'Manager' },

                      { btnTxt: 'On De-assignment', target: 'Administrator' },
                      { btnTxt: 'On Next Follow Up', target: 'Customer' },
                      {
                        btnTxt: 'On Next Follow Up',
                        target: 'Registration Executive',
                      },
                      { btnTxt: 'On Next Follow Up', target: 'Manager' },
                      { btnTxt: 'On Next Follow Up', target: 'Administrator' },
                      { btnTxt: 'On Delete Follow Up', target: 'Customer' },
                      {
                        btnTxt: 'On Delete Follow Up',
                        target: 'Registration Executive',
                      },
                      { btnTxt: 'On Delete Follow Up', target: 'Manager' },
                      {
                        btnTxt: 'On Delete Follow Up',
                        target: 'Administrator',
                      },
                      { btnTxt: 'On Cancel', target: 'Customer' },
                      { btnTxt: 'On Cancel', target: 'Registration Executive' },
                      { btnTxt: 'On Cancel', target: 'Manager' },
                      { btnTxt: 'On Cancel', target: 'Administrator' },
                      { btnTxt: 'On Complete', target: 'Customer' },
                      { btnTxt: 'On Complete', target: 'Registration Executive' },
                      { btnTxt: 'On Complete', target: 'Manager' },
                      { btnTxt: 'On Complete', target: 'Administrator' },
                      { btnTxt: 'On Creation', target: 'Customer' },
                      { btnTxt: 'On Creation', target: 'Registration Executive' },
                      { btnTxt: 'On Creation', target: 'Manager' },
                      { btnTxt: 'On Creation', target: 'Administrator' },
                      { btnTxt: 'On Update', target: 'Customer' },
                      { btnTxt: 'On Update', target: 'Registration Executive' },
                      { btnTxt: 'On Update', target: 'Manager' },
                      { btnTxt: 'On Update', target: 'Administrator' },
                      { btnTxt: 'On Transfer Charge', target: 'Customer' },
                      {
                        btnTxt: 'On Transfer Charge',
                        target: 'Registration Executive',
                      },
                      { btnTxt: 'On Transfer Charge', target: 'Manager' },
                      { btnTxt: 'On Transfer Charge', target: 'Administrator' },
                      { btnTxt: 'On Block', target: 'Customer' },
                      { btnTxt: 'On Block', target: 'Registration Executive' },
                      { btnTxt: 'On Block', target: 'Manager' },
                      { btnTxt: 'On Block', target: 'Administrator' },
                    ].map((data, i) => (
                      <section>
                        <div className="flex flex-row justify-between">
                          <section className="flex  mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {data?.btnTxt}
                              </span>
                            </button>
                          </section>

                          <section className="flex  mt-[18px]">
                            <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                              {data?.target}
                            </span>
                          </section>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div></div>
          </div>
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {'Stalls Templates'}
              </h2>

              <div className=" justify-between mb-4">
                {[
                  { btnTxt: 'On Booking', target: 'Stalls Customer' },
                  { btnTxt: 'On Payment Request', target: 'Stalls Customer' },
                  ,
                  { btnTxt: 'On Payment Receival', target: 'Stalls Customer' },
                  { btnTxt: 'On Payment Receival', target: 'Customer' },
                  { btnTxt: 'On Creation', target: 'Customer' },
                  { btnTxt: 'On Creation', target: 'Registration Executive' },
                  { btnTxt: 'On Creation', target: 'Manager' },
                  { btnTxt: 'On Creation', target: 'Administrator' },
                  { btnTxt: 'On Update', target: 'Customer' },
                  { btnTxt: 'On Update', target: 'Registration Executive' },
                  { btnTxt: 'On Update', target: 'Manager' },
                  { btnTxt: 'On Update', target: 'Administrator' },
                  { btnTxt: 'On Delete Info', target: 'Customer' },
                  { btnTxt: 'On Delete Info', target: 'Registration Executive' },
                  { btnTxt: 'On Delete Info', target: 'Manager' },
                  { btnTxt: 'On Delete Info', target: 'Administrator' },
                  { btnTxt: 'On Status Change', target: 'Customer' },
                  { btnTxt: 'On Status Change', target: 'Registration Executive' },
                  { btnTxt: 'On Status Change', target: 'Manager' },
                  { btnTxt: 'On Status Change', target: 'Administrator' },
                  { btnTxt: 'On Re-assignment', target: 'Customer' },
                  { btnTxt: 'On Re-assignment', target: 'Registration Executive' },
                  { btnTxt: 'On Re-assignment', target: 'Manager' },
                  { btnTxt: 'On Re-assignment', target: 'Administrator' },
                  { btnTxt: 'On First Follow Up', target: 'Customer' },
                  { btnTxt: 'On First Follow Up', target: 'Registration Executive' },
                  { btnTxt: 'On First Follow Up', target: 'Manager' },
                  { btnTxt: 'On First Follow Up', target: 'Administrator' },

                  { btnTxt: 'On Dead Status', target: 'Customer' },

                  { btnTxt: 'On Dead Status', target: 'Registration Executive' },

                  { btnTxt: 'On Dead Status', target: 'Manager' },

                  { btnTxt: 'On Dead Status', target: 'Administrative' },
                  { btnTxt: 'Bring To Live', target: 'Customer' },
                  { btnTxt: 'Bring To Live', target: 'Registration Executive' },
                  { btnTxt: 'Bring To Live', target: 'Manager' },
                  { btnTxt: 'Bring To Live', target: 'Administrator' },
                  { btnTxt: 'On Delete Booking', target: 'Customer' },
                  { btnTxt: 'On Delete Booking', target: 'Registration Executive' },
                  { btnTxt: 'On Delete Booking', target: 'Manager' },
                  { btnTxt: 'On Delete Booking', target: 'Administrator' },
                  { btnTxt: 'On Cancel Booking', target: 'Customer' },
                  { btnTxt: 'On Cancel Booking', target: 'Registration Executive' },
                  { btnTxt: 'On Cancel Booking', target: 'Manager' },
                  { btnTxt: 'On Cancel Booking', target: 'Administrator' },
                  {
                    btnTxt: 'On Initialize Approve Reject',
                    target: 'Customer',
                  },
                  {
                    btnTxt: 'On Initialize Approve Reject',
                    target: 'Registration Executive',
                  },
                  { btnTxt: 'On Initialize Approve Reject', target: 'Manager' },
                  {
                    btnTxt: 'On Initialize Approve Reject',
                    target: 'Administrator',
                  },
                ].map((data, i) => (
                  <section>
                    <div className="flex flex-row justify-between">
                      <section className="flex  mt-[18px]">
                        <button>
                          <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                            <PencilIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            {data?.btnTxt}
                          </span>
                        </button>
                      </section>

                      <section className="flex  mt-[18px]">
                        <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                          {data?.target}
                        </span>
                      </section>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 w-96">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {'Finance Templates'}
              </h2>

              <div className=" justify-between mb-4">
                {[
                  { btnTxt: 'On Payment', target: 'Registration Executive' },
                  { btnTxt: 'On Payment', target: 'Customer' },
                  { btnTxt: 'On Payment', target: 'Manager' },
                  { btnTxt: 'On Payment', target: 'Registration Executive' },
                  { btnTxt: 'On Payment', target: 'Administrator' },
                  { btnTxt: 'On Delete', target: 'Customer' },
                  { btnTxt: 'On Delete', target: 'Registration Executive' },
                  { btnTxt: 'On Delete', target: 'Manager' },
                  { btnTxt: 'On Delete', target: 'Administrator' },
                  { btnTxt: 'On Refund Pay', target: 'Customer' },
                  { btnTxt: 'On Refund Pay', target: 'Registration Executive' },
                  { btnTxt: 'On Refund Pay', target: 'Manager' },
                  { btnTxt: 'On Refund Pay', target: 'Administrator' },
                  { btnTxt: 'On Booking', target: 'Customer' },
                  { btnTxt: 'On Booking', target: 'Registration Executive' },
                  { btnTxt: 'On Booking', target: 'Manager' },
                  { btnTxt: 'On Booking', target: 'Administrator' },
                  { btnTxt: 'On Prepone', target: 'Customer' },
                  { btnTxt: 'On Prepone', target: 'Registration Executive' },
                  { btnTxt: 'On Prepone', target: 'Manager' },
                  { btnTxt: 'On Prepone', target: 'Administrator' },
                  { btnTxt: 'On Postpone', target: 'Customer' },
                  { btnTxt: 'On Postpone', target: 'Registration Executive' },
                  { btnTxt: 'On Postpone', target: 'Manager' },
                  { btnTxt: 'On Postpone', target: 'Administrator' },
                  { btnTxt: 'On Payment', target: 'Customer' },
                  { btnTxt: 'On Payment', target: 'Registration Executive' },
                  { btnTxt: 'On Payment', target: 'Manager' },
                  { btnTxt: 'On Payment', target: 'Administrator' },

                  { btnTxt: 'On Delete Payment', target: 'Customer' },
                  { btnTxt: 'On Delete Payment', target: 'Registration Executive' },
                  { btnTxt: 'On Delete Payment', target: 'Manager' },
                  { btnTxt: 'On Delete Payment', target: 'Administrator' },
                  { btnTxt: 'On Refund Pay', target: 'Customer' },
                  { btnTxt: 'On Refund Pay', target: 'Registration Executive' },
                  { btnTxt: 'On Refund Pay', target: 'Manager' },
                  { btnTxt: 'On Refund Pay', target: 'Administrator' },
                  { btnTxt: 'On Refund Delete', target: 'Customer' },
                  { btnTxt: 'On Refund Delete', target: 'Registration Executive' },
                  { btnTxt: 'On Refund Delete', target: 'Manager' },
                  { btnTxt: 'On Refund Delete', target: 'Administrator' },
                  { btnTxt: 'On Refund Pay', target: 'Customer' },
                  { btnTxt: 'On Refund Pay', target: 'Registration Executive' },
                  { btnTxt: 'On Refund Pay', target: 'Manager' },
                  { btnTxt: 'On Refund Pay', target: 'Administrator' },
                ].map((data, i) => (
                  <section>
                    <div className="flex flex-row justify-between">
                      <section className="flex  mt-[18px]">
                        <button>
                          <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                            <PencilIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            {data?.btnTxt}
                          </span>
                        </button>
                      </section>

                      <section className="flex  mt-[18px]">
                        <span className="flex ml-2 items-center h-6 px-3 text-xs  text-green-800">
                          {data?.target}
                        </span>
                      </section>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'Notification Setup'}
        widthClass="max-w-2xl"
        wbPayload={wbSelPayload}
      />
    </>
  )
}

export default MarkeingMessagesList
