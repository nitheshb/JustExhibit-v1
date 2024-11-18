import { useState, useEffect, useRef } from 'react'

import { LinearProgress } from '@mui/material'

import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from 'src/util/computeCsTotals'
import DoughnutChartWithRoundedSegments from '../A_SalesModule/Reports/charts/piechartRounded'
import RoundedProgressBar from './Reports/RoundedProgressBar'

const CrmUnitPaymentGraph = ({ selCustomerPayload }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [partATotal, setPartA] = useState(0)
  const [partBTotal, setPartB] = useState(0)
  const [addOnTotal, setPartAddOn] = useState(0)

  const [unitTotal, setUnitTotal] = useState(0)

  console.log('payload is ', selCustomerPayload)
  useEffect(() => {
    const a =
      selCustomerPayload?.plotCS?.reduce(
        (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
        0
      ) || 0
    const b =
      selCustomerPayload?.addChargesCS?.reduce(
        (partialSum, obj) =>
          partialSum +
          Number(
            computeTotal(
              obj,
              selCustomerPayload?.super_built_up_area ||
                selCustomerPayload?.area?.toString()?.replace(',', '')
            )
          ),
        0
      ) || 0

      const c = selCustomerPayload?.addOnCS?.reduce(
        (partialSum, obj) =>
          partialSum +
          Number(
            computeTotal(
              obj,
              selCustomerPayload?.super_built_up_area || selCustomerPayload?.area?.toString()?.replace(',', '')
            )
          ),
        0
      ) || 0
    setPartA(a)
    setPartB(b)
    setPartAddOn(c)
    console.log('value is ', a, b)
    setUnitTotal(a + b + c)
  }, [selCustomerPayload])

  return (
    <section className="flex flex-col  rounded-md ">
      <>
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[260px]">
          <div className="flex flex-row justify-between mx-">
            <h6 className="font-bodyLato font-semibold text-xs m-1 flex flex-col">
            <span className="tracking-wide  font-semibold text-[16px]"> ₹
              {(selCustomerPayload?.T_balance)?.toLocaleString(
                'en-IN'
              ) || 0}</span><span className="text-[#637381] tracking-wide font-thin">Stall Balance</span>

            </h6>
            <h6 className="font-bodyLato font-semibold text-xs m-1 flex flex-col text-right">
    ₹
              {((selCustomerPayload?.T_paid || 0) +(selCustomerPayload?.T_approved || 0 ))?.toLocaleString('en-IN') || 0}
              <span className="text-[#637381] tracking-wide font-thin">Paid</span>
            </h6>
          </div>
          <div className="flex flex-row mx-1 pt-">
          <RoundedProgressBar
                                    progress={
                                      (selCustomerPayload?.T_paid / selCustomerPayload?.T_total) *
                                      100
                                    }
                                  />
          </div>
          <div className="flex flex-row justify-between mx-">
          <h6 className="font-bodyLato font-semibold text-xs m-1">

            </h6>
            <section className="flex flex-row">
              {/* <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                {selCustomerPayload?.T_elgible?.toLocaleString('en-IN')}
              </h6> */}

              <h6 className="font-bodyLato font-semibold text-xs m-1">
              <span className="text-[#637381] tracking-wide font-thin">Total Cost  :</span> ₹{selCustomerPayload?.T_total?.toLocaleString('en-IN') || 0}
              </h6>
            </section>
          </div>
        </div>
      </>
    </section>
  )
}

export default CrmUnitPaymentGraph
