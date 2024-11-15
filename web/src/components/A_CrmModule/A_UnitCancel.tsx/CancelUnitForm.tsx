/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { Timestamp } from 'firebase/firestore'
import { ErrorMessage, Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import Loader from 'src/components/Loader/Loader'
import {
  addStallLeads,
  checkIfLeadAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
  streamGetAllUnitTransactions,
  updateCancelProjectCounts,
  updateTransactionStatus,
  updateUnitAsBlocked,
  updateStallAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { supabase } from 'src/context/supabase'

const CancelUnitForm = ({ selUnitDetails, bookCompSteps, bookCurentStep }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [selDays, setSelDays] = useState(5)
  const [bookingProgress, setBookingProgress] = useState(true)
  const [unitTransactionsA, setUnitTransactionsA] = useState([])

  useEffect(() => {
    getAllTransactionsUnit()
  }, [])

  const getAllTransactionsUnit = async () => {
    const steamLeadLogs = await streamGetAllUnitTransactions(
      orgId,
      'snap',
      {
        unit_id: selUnitDetails?.id,
      },
      (error) => []
    )
    await setUnitTransactionsA(steamLeadLogs)
    return
  }
  const onSubmitFun = async (data, resetForm) => {
    // const { uid } = selUnitDetails
    // const unitUpdate = {
    //   blocked_leadId: id || '',
    //   status: 'customer_blocked',
    //   blocked_by: customerDetailsObj?.Name || '',
    //   blockedOn: Timestamp.now().toMillis(),
    //   ct: Timestamp.now().toMillis(),
    //   Date: Timestamp.now().toMillis(),
    // }
    // updateUnitAsBlocked(
    //   orgId,
    //   leadDetailsObj2?.ProjectId,
    //   uid,
    //   id,
    //   unitUpdate,
    //   user?.email,
    //   enqueueSnackbar,
    //   resetForm
    // )

    // step1: check the status of unit
    // step2: get all transactions of unit
    // step3: update unit details
    // step4: update agreegations

    // step1:  check the status of unit
    console.log('status is', selUnitDetails)

    if (selUnitDetails?.status === 'booked') {
      UpdateAllTransactionsAsCancel()

      const unitUpdate = {
        leadId: 'id',
        status: 'available',
        customerDetailsObj: {},
        secondaryCustomerDetailsObj: {},
        booked_on: data?.dated,
        ct: Timestamp.now().toMillis(),
        Date: Timestamp.now().toMillis(),
      }
      // unitUpdate[`cs`] = leadDetailsObj2[`${uid}_cs`]
      unitUpdate[`plotCS`] = []
      unitUpdate[`addChargesCS`] = []
      unitUpdate[`constructCS`] = []
      unitUpdate[`fullPs`] = []
      unitUpdate[`T_elgible`] = 0
      unitUpdate[`stepsComp`] = []
      unitUpdate[`T_transaction`] = 0
      unitUpdate[`T_review`] = 0
      unitUpdate[`T_balance`] = 0
      unitUpdate[`oldStatus`] = selUnitDetails?.status

      await updateStallAsBooked(
        orgId,
        selUnitDetails?.pId,
        selUnitDetails?.uid,
        'leadId',
        unitUpdate,
        user?.email,
        enqueueSnackbar,
        resetForm
      )

      await updateCancelProjectCounts(   orgId,
        selUnitDetails?.pId,selUnitDetails, user?.email, enqueueSnackbar)
    } else {
      console.log('cannot be cancelled')
      enqueueSnackbar(`${selUnitDetails?.status} unit cannot be cancelled`, {
        variant: 'warning',
      })
    }
  }

  const UpdateAllTransactionsAsCancel = () => {
    unitTransactionsA.map((data) => {
      data.Uuid = data?.unit_id
      data.oldStatus = `${data?.status}`
      data.status = `${data?.oldStatus}_cancelled`
      data.subtype = 'booking_cancel'
      updateTransactionStatus(orgId, data, user?.email, enqueueSnackbar)
    })
  }

  const initialState = {
    blockReason: '',
  }
  const validate = Yup.object({
    blockReason: Yup.string().required('Reason is Required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  return (
    <>
      <section className="bg-blueGray-50 ">
        <div className="w-full  mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F9FBFB] border-0 ">
            <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
              <div className="text-center flex justify-between">
                <p className="text-xs font-extrabold tracking-tight uppercase font-body my-1">
                  Block Unit
                </p>
              </div>
            </div>
            <div className="mx-2 o my-10 mt-4 ">
              <div className="bg-white p-10 rounded-xl">
                <h1 className="text-center text-xl font-semibold text-gray-500">
                  Are you Sure to Canel this booking?
                </h1>

                <Formik
                  initialValues={initialState}
                  validationSchema={validate}
                  onSubmit={(values, { resetForm }) => {
                    onSubmitFun(values, resetForm)
                    //
                    console.log('block unit values are ', values, selDays)
                  }}
                >
                  {(formik) => (
                    <Form className="mt-8">
                      <div className="flex justify-center border-2 py-2 px-6 rounded-xl">
                        <input
                          type="text"
                          name="blockReason"
                          placeholder="Write Cancellation Reason"
                          className="w-full outline-none text-gray-700 text-lg"
                          onChange={(e) => {
                            formik.setFieldValue('blockReason', e.target.value)
                          }}
                        />
                        <ErrorMessage
                          component="div"
                          name={'blockReason'}
                          className="error-message text-red-700 text-xs p-1 mx-auto"
                        />
                        <button
                          type="submit"
                          className="bg-[#FFCD3E]  text-green-50 font-semibold px-6 py-2 rounded-xl text-md"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {bookingProgress && (
              <section className="mb-3">
                <div className="mx-auto flex mt-6 flex-row  ">
                  <section className="ml-3 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('payment_captured') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('payment_captured') &&
                        !bookCurentStep?.includes('payment_captured') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('payment_captured') && (
                        <Loader />
                      )}
                      <span className="ml-2 text-md font-bold text-navy-700 ">
                        Revert Payment
                      </span>
                    </div>
                  </section>
                  {/*  */}
                  <section className="ml-3 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('CS_updated') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('CS_updated') &&
                        !bookCurentStep?.includes('CS_updated') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('CS_updated') && <Loader />}
                      <span className="ml-4 text-md font-bold text-navy-700 ">
                        Reset Unit Booking Info
                      </span>
                    </div>
                  </section>
                </div>
                <div className="mx-auto flex mt-6 flex flex-row  ">
                  <section className="ml-3 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('unit_booked') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('unit_booked') &&
                        !bookCurentStep?.includes('unit_booked') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('unit_booked') && <Loader />}
                      <span className="ml-2 text-md font-bold text-navy-700 ">
                        Update Payment Projections
                      </span>
                    </div>
                  </section>
                  {/*  */}
                  <section className="ml-3 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('customer_created') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('customer_created') &&
                        !bookCurentStep?.includes('customer_created') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('customer_created') && (
                        <Loader />
                      )}
                      <span className="ml-2 text-md font-bold text-navy-700 ">
                        Deattch Asset from Customer
                      </span>
                    </div>
                  </section>
                </div>
                <div className="mx-auto flex mt-6 flex flex-row  ">
                  <section className="ml-3 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('customer_email_send') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('customer_email_send') &&
                        !bookCurentStep?.includes('customer_email_send') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('customer_email_send') && (
                        <Loader />
                      )}
                      <span className="ml-2 text-md font-bold text-navy-700 ">
                        Send Canellation E-mail
                      </span>
                    </div>
                  </section>
                  {/*  */}
                  <section className="ml-4 w-[300px]">
                    <div className="flex items-center">
                      {bookCompSteps?.includes('notify_to_manager') && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                          <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                        </div>
                      )}
                      {!bookCompSteps?.includes('notify_to_manager') &&
                        !bookCurentStep?.includes('notify_to_manager') && (
                          <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                        )}
                      {bookCurentStep?.includes('notify_to_manager') && (
                        <Loader />
                      )}
                      <span className="ml-2 text-md font-bold text-navy-700 ">
                        Notified to Manager
                      </span>
                    </div>
                  </section>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CancelUnitForm
