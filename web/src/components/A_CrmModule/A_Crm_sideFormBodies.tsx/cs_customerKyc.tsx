/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import AddApplicantDetails from 'src/components/AddApplicantDetails'
import { USER_ROLES } from 'src/constants/userRoles'
import { updateKycApproval } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'


export default function Cs_customerKyc({ selUnitPayload }) {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  useEffect(() => {
    console.log('yo yo ', selUnitPayload)
  }, [])
  const submitManagerApproval = (status) => {
    const dataObj = {
      status: status,
      // plotCS: costSheetA,
      // fullPs: newPlotPS,
      // addChargesCS: partBPayload,
      // T_balance: netTotal - selUnitDetails?.T_review,
      // T_Total: netTotal,
    }
    updateKycApproval(
      orgId,
      selUnitPayload?.id,
      dataObj,
      user.email,
      enqueueSnackbar
    )
  }
  return (
    <section className="bg-white w-full md:px-10 md:mb-20 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
      <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
        <div className="mt-1">
          <div className="p-2 bg-gradient-to-r from-violet-50 to-pink-50 rounded-md flex flex-row justify-between">
            <h2 className="font-medium flex-grow">Customer Kyc</h2>
            <p className="text-md text-[10px] flex-grow text-right">
              Waiting for banker sanction{' '}
            </p>
          </div>
        </div>
      </div>
      <AddApplicantDetails
        title="Booking Form"
        selUnitDetails={selUnitPayload}
        leadDetailsObj2={selUnitPayload}
      />
      <div className="mt-5 left-0 text-right md:space-x-3 md:block flex flex-col-reverse py-3 mr-6 flex flex-col mt-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
        <button
          className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="submit"
          onClick={() => {
            submitManagerApproval('rejected')
          }}
          // disabled={loading}
        >
          {'Reject'}
        </button>
        <button
          className="bg-green-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="submit"
          // disabled={loading}
          onClick={() => {
            // mark man_cs_approval as true
            submitManagerApproval('approved')
          }}
        >
          {'Approve'}
        </button>
      </div>
    </section>
  )
}
