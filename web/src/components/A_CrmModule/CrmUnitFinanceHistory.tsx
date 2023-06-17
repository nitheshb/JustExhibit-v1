import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'
import { prettyDate, timeConv, prettyDateTime } from 'src/util/dateConverter'

const CrmUnitFinanceHistory = ({
  selCustomerPayload,
  assets,
  totalIs,
  unitTransactionsA,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <>


      <div className="mt-2">
        <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
          <div>
            <h1 className=" text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
              Payment History
            </h1>
            <table className="w-full mb-10">
              <thead>
                {' '}
                <tr className=" h-6 border-b-[0.2px] border-gray-300">
                  <th className="w-[12%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Paid On
                  </th>
                  <th className="w-[8%] text-[10px] text-center text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Mode
                  </th>
                  <th className="w-[15%] text-[10px] text-center text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Bank Ref Id
                  </th>
                  <th className="w-[10%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Amount
                  </th>
                  <th className="w-[10%] text-[10px] text-center text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Event
                  </th>
                  <th className="w-[10%] text-[10px] text-center text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Status
                  </th>

                  <th className="w-[8%] text-[10px] text text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    From
                  </th>
                  <th className="w-[15%] text-[10px] text text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    To
                  </th>
                  <th className="w-[15%] text-[10px] text-center text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Tx Id
                  </th>
                  <th className="w-[15%] text-[10px] text-center text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Reviewer
                  </th>
                </tr>
              </thead>

              <tbody>
                {unitTransactionsA?.map((d1, inx) => {
                  totalIs = 0
                    // selCustomerPayload?.[`${assets[0]}_T_review`] - d1?.value
                  return (
                    <tr key={inx} className="border-b-[0.05px] border-gray-300">
                      <th className=" text-[10px] text-left text-gray-700 ">
                        {timeConv(d1?.txt_dated ||d1?.dated).toLocaleString() }
                      </th>
                      <td className="text-[10px] text-center  text-gray-800 ">
                        {d1?.mode}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.bank_ref || d1?.chequeno}
                      </td>
                      <td className="text-[10px] text-right text-gray-700 ">
                        {d1?.totalAmount?.toLocaleString('en-IN') || d1?.amount?.toLocaleString('en-IN')}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.payReason}
                      </td>

                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.status}
                      </td>

                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.customerName}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.towards ||d1?.builderName}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.created}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.Reviewer || "NA"}
                      </td>
                    </tr>
                  )
                })}

                <tr className="border-b-[0.05px] border-gray-300">
                  <th className="text-[10px] text-left text-gray-800 ">
                    Plot Value Total Rs.:
                  </th>
                  <td className="text-[10px] text-right text-gray-400 "></td>
                  <th className="text-[10px] text-right text-gray-800 "></th>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default CrmUnitFinanceHistory
