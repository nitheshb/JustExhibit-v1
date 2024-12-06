/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { ErrorMessage, Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import {
  updateUnitAsBlocked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const BlockingUnitForm = ({
  title,
  dialogOpen,
  leadDetailsObj2,
  selUnitDetails,
  stepIndx,
  StatusListA,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [selDays, setSelDays] = useState(5)

  const onSubmitFun = async (data, resetForm) => {
    const { id, purpose, customerDetailsObj, secondaryCustomerDetailsObj } =
      leadDetailsObj2
    const { uid } = selUnitDetails

    const unitUpdate = {
      blocked_leadId: id || '',
      status: 'customer_blocked',
      blocked_by: customerDetailsObj?.Name || '',
      blockedOn: Timestamp.now().toMillis(),
      ct: Timestamp.now().toMillis(),
      Date: Timestamp.now().toMillis(),
    }
    updateUnitAsBlocked(
      orgId,
      leadDetailsObj2?.ProjectId,
      uid,
      id,
      unitUpdate,
      user?.email,
      enqueueSnackbar,
      resetForm
    )
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
                  How many days you want to block?
                </h1>
                <div className="flex flex-wrap justify-center mt-10 space-x-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((days, i) => (
                    <option
                      key={i}
                      value={days}
                      onMouseEnter={() => setSelDays(days)}
                      onClick={() => setSelDays(days)}
                      className={`${
                        days === selDays ? 'bg-[#FFCD3E]  text-green-50 ' : ''
                      } flex items-center justify-center w-10 h-10 bg-gray--100 text-gray-600 hover:bg-[#FFCD3E]  transition duration-150 rounded-full font-bold hover:text-green-50 cursor-pointer`}
                    >
                      {days}
                    </option>
                  ))}
                  <span className="mt-[12px] text-sm text-gray-700 ">days</span>
                </div>
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
                          placeholder="Write a blocking reason"
                          className="w-full outline-none text-gray-700 text-lg"
                          onChange={(e) => {
                            formik.setFieldValue('blockReason', e.target.value)
                            // handleFileUploadFun(
                            //   e.target.files[0],
                            //   'panCard1'
                            // )
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
                          Block
                        </button>
                      </div>
                      <span className="text-center block mt-6 text-gray-400 text-md font-semibold">
                        Blocking unit for
                        <span className="text-[#FFCD3E] ml-2 text-xl w-10 ">
                          {selDays}
                        </span>{' '}
                        days
                      </span>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* <div className="flex justify-end">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-green-50 rounded-full text-[#FFCD3E]  mb-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlockingUnitForm
