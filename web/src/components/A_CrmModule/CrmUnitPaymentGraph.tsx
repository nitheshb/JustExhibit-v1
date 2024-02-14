import { useState, useEffect, useRef } from 'react'

import { LinearProgress } from '@mui/material'

import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from 'src/util/computeCsTotals'

const CrmUnitPaymentGraph = ({ selCustomerPayload }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [partATotal, setPartA] = useState(0)
  const [partBTotal, setPartB] = useState(0)
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
                selCustomerPayload?.area
            )
          ),
        0
      ) || 0
    setPartA(a)
    setPartB(b)
    console.log('value is ', a, b)
    setUnitTotal(a + b)
  }, [selCustomerPayload])

  return (
    <section className="flex flex-col  rounded-md ">
      <>
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[260px]">
          <div className="flex flex-row justify-between mx-">
            <h6 className="font-bodyLato font-semibold text-xs m-1">
            <span className="text-[#637381] tracking-wide font-thin">Paid:</span> ₹
              {(selCustomerPayload?.T_review || 0 + selCustomerPayload?.T_approved || 0 )?.toLocaleString('en-IN') || 0}
            </h6>
            <h6 className="font-bodyLato font-semibold text-xs m-1">
            <span className="text-[#637381] tracking-wide font-thin">Left:</span> ₹
              {(selCustomerPayload?.T_balance)?.toLocaleString(
                'en-IN'
              ) || 0}
            </h6>
          </div>
          <div className="flex flex-row mx-1 pt-">
            {[{ item: 'Paid', value: 6 }].map((data, i) => (
              <div
                className=" w-3/4  "
                style={{
                  display: 'inline-block',
                  alignSelf: 'flex-end',
                }}
                key={i}
              >
                <div className="">
                  <LinearProgress
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ffab00',
                      },
                    }}
                    variant="determinate"
                    value={100}
                    style={{
                      backgroundColor: '#E5EAF2',
                      borderRadius: '3px',
                      borderTopRightRadius: '0px',
                      borderBottomRightRadius: '0px',
                      height: `${data.value}px`,
                      width: `100%`,
                    }}
                  />
                </div>
              </div>
            ))}
            {[{ item: 'Due', value: 6 }].map((data, i) => (
              <div
                className=" w-2/4  "
                style={{
                  display: 'inline-block',
                  alignSelf: 'flex-end',
                }}
                key={i}
              >
                <div className="">
                  <LinearProgress
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ffab003d',
                      },
                    }}
                    variant="determinate"
                    value={100}
                    style={{
                      backgroundColor: '#ffab003d',
                      borderRadius: '3px',
                      borderTopLeftRadius: '0px',
                      borderBottomLeftRadius: '0px',
                      height: `${data.value}px`,
                      width: `100%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between mx-">
          <h6 className="font-bodyLato font-semibold text-xs m-1">

            </h6>
            <section className="flex flex-row">
              {/* <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                {selCustomerPayload?.T_elgible?.toLocaleString('en-IN')}
              </h6> */}

              <h6 className="font-bodyLato font-semibold text-xs m-1">
              <span className="text-[#637381] tracking-wide font-thin">Total Cost  :</span> ₹{unitTotal?.toLocaleString('en-IN') || 0}
              </h6>
            </section>
          </div>
        </div>
      </>
    </section>
  )
}

export default CrmUnitPaymentGraph
