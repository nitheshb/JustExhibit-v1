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
  streamGetAllUnitTransactions,
  updateCancelProjectCounts,
  updateTransactionStatus,
  updateStallAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

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
  const [selectedReason, setSelectedReason] = useState('')
  const [showOtherReason, setShowOtherReason] = useState(false)

  const cancellationReasons = [
    'Payment Not Received',
    'Stall No Longer Available',
    'Payment Confirmation Pending',
    'Interested in other expo',
    'Lead Requested Cancellation',
    'Awaiting Client Response',
    'Other reasons'
  ]

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

  const handleReasonSelection = (reason, formik) => {
    if (reason === 'Other reasons') {
      setShowOtherReason(true)
      setSelectedReason(reason)
      formik.setFieldValue('blockReason', '')
    } else {
      setShowOtherReason(false)
      setSelectedReason(reason)
      formik.setFieldValue('blockReason', reason)
    }
  }

  const handleClearSelection = (formik) => {
    setSelectedReason('')
    setShowOtherReason(false)
    formik.setFieldValue('blockReason', '')
    formik.resetForm()
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
      <section className="">
        <div className="w-full  mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6  ">
            <div className="mx-2 o my-10 mt-4 ">
              <div className="bg-white p-10 rounded-xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-lg mr-2">₹</span>
                    <span className="text-gray-600">Refund amount will be added to customer wallet for withdrawal</span>
                  </div>
                </div>

                <h1 className="text-center text-xl font-semibold text-gray-500 mb-6">
                  Are you Sure to Cancel this booking?
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
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reason for cancellation</h3>
                        
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {cancellationReasons.map((reason, index) => (
                            <div 
                              key={index}
                              className="flex items-center cursor-pointer py-1"
                              onClick={() => handleReasonSelection(reason, formik)}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                                selectedReason === reason 
                                  ? 'border-orange-500 bg-white' 
                                  : 'border-orange-500 bg-white'
                              }`}>
                                {selectedReason === reason && (
                                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                )}
                              </div>
                              <span className="text-gray-700 text-sm">{reason}</span>
                            </div>
                          ))}
                        </div>

                        {showOtherReason && (
                          <div className="mb-4 mt-4">
                            <input
                              type="text"
                              name="blockReason"
                              placeholder="Type your reason here..."
                              className="w-full p-3 border border-gray-300 rounded-lg outline-none text-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                              onChange={(e) => {
                                formik.setFieldValue('blockReason', e.target.value)
                              }}
                              value={formik.values.blockReason}
                            />
                          </div>
                        )}

                        <ErrorMessage
                          component="div"
                          name={'blockReason'}
                          className="error-message text-red-600 text-sm mt-1"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <button
                          type="button"
                          onClick={() => handleClearSelection(formik)}
                          className="text-gray-600 font-medium px-8 py-3 rounded-lg text-md hover:bg-gray-50 border border-gray-300"
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg text-md shadow-sm"
                        >
                          Cancel booking
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* {bookingProgress && (
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
            )} */}
          </div>
        </div>
      </section>
    </>
  )
}

export default CancelUnitForm