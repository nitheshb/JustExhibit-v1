import { useState, useEffect, useRef } from 'react'
import { ClockIcon } from '@heroicons/react/outline'
import { PDFExport } from '@progress/kendo-react-pdf'
import { steamUnitActivityLog } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { supabase } from 'src/context/supabase'
import { computeTotal } from 'src/util/computeCsTotals'
import { prettyDate, timeConv } from 'src/util/dateConverter'
import CrmUnitCostSheetView from './CrmCostSheetView'
import CrmUnitPaymentGraph from './CrmUnitPaymentGraph'

const CrmUnitSummary = ({
  selCustomerPayload: selUnitPayload,
  assets,
  totalIs,
  unitTransactionsA,
}) => {
  const { user } = useAuth()
  const pdfUnitSummaryComp = useRef(null)
  const { orgId } = user
  const [unitFetchedActivityData, setUnitFetchedActivityData] = useState([])
  const [newPlotCostSheetA, setNewPlotCostSheetA] = useState([])
  const [newPlotCsObj, setNewPlotCsObj] = useState([])
  const [newPlotPS, setNewPlotPS] = useState([])
  const [newConstructCsObj, setNewConstructCsObj] = useState([])
  const [newConstructCostSheetA, setNewConstructCostSheetA] = useState([])
  const [newConstructPS, setNewConstructPS] = useState([])
  const [newAdditonalChargesObj, setNewAdditonalChargesObj] = useState([])
  const [StatusListA, setStatusListA] = useState([])

  const [netTotal, setNetTotal] = useState(0)
  const [partATotal, setPartATotal] = useState(0)
  const [partBTotal, setPartBTotal] = useState(0)

  useEffect(() => {
    console.log('unit dta is ', selUnitPayload, selUnitPayload?.id)
    boot()
    setTotalFun()
    const subscription = supabase
      .from(`${orgId}_unit_logs`)
      .on('*', (payload) => {
        console.log('account records', payload)
        const updatedData = payload.new
        const { uid } = payload.old
        const eventType = payload.eventType
        console.log('account records', updatedData.Uuid, selUnitPayload?.id)

        if (updatedData.Uuid === selUnitPayload?.id) {
          if (updatedData.Uuid === selUnitPayload?.id) {
            console.log('account records', updatedData.Uuid, selUnitPayload?.id)
            setUnitFetchedActivityData((prevLogs) => {
              const existingLog = prevLogs.find((log) => log.uid === uid)
              console.log(
                'account records',
                prevLogs,
                existingLog,
                uid,
                payload.old,
                uid
              )
              if (existingLog) {
                console.log('Existing record found!')
                if (payload.new.status === 'Done') {
                  const updatedLogs = prevLogs.filter((log) => log.uid != uid)
                  return [...updatedLogs]
                } else {
                  const updatedLogs = prevLogs.map((log) =>
                    log.uid === uid ? payload.new : log
                  )
                  return [...updatedLogs]
                }
              } else {
                console.log('New record added!')
                return [...prevLogs, payload.new]
              }
            })
          } else {
            if (
              updatedData.by_uid === user?.uid ||
              updatedData?.to_uid === user?.uid
            ) {
              setUnitFetchedActivityData((prevLogs) => {
                const existingLog = prevLogs.find((log) => log.uid === uid)

                if (existingLog) {
                  console.log('Existing record found!')
                  if (payload.new.status === 'Done') {
                    const updatedLogs = prevLogs.filter((log) => log.uid != uid)
                    return [...updatedLogs]
                  } else {
                    const updatedLogs = prevLogs.map((log) =>
                      log.id === uid ? payload.new : log
                    )
                    return [...updatedLogs]
                  }
                } else {
                  console.log('New record added!')
                  return [...prevLogs, payload.new]
                }
              })
            }
          }
        }
      })
      .subscribe()

    // Clean up the subscription when the component unmounts
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])
  const activieLogNamer = (dat) => {
    const { type, subtype, from, to, by } = dat
    let tex = type

    switch (subtype) {
      case 'cs_approval':
        return (tex = 'Cost Sheet')
      case 'pay_capture':
        return (tex = `Payment`)
      case 'assign_change':
        return (tex = `Lead Assigned To`)
      default:
        return (tex = type)
    }
    return tex
  }
  const boot = async () => {
    const unsubscribe = steamUnitActivityLog(orgId, {
      uid: selUnitPayload?.id,
      pId: selUnitPayload?.pId,
    })

    const y = await unsubscribe
    setUnitFetchedActivityData(y)
    await console.log('new setup ', unitFetchedActivityData)
    await console.log('new setup ', y)
  }
  const setTotalFun = async () => {
    const partBTotal = selUnitPayload?.additonalChargesObj?.reduce(
      (partialSum, obj) =>
        partialSum +
        Number(
          computeTotal(
            obj,
            selUnitPayload?.super_built_up_area ||
              selUnitPayload?.area?.toString()?.replace(',', '')
          )
        ),
      0
    )

    const partATotal = selUnitPayload?.plotCS.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )

    console.log('myObj', partATotal)

    setPartBTotal(partBTotal)
    setPartATotal(partATotal)
    setNetTotal(partATotal + partBTotal)
  }

  return (
    <PDFExport paperSize="A4" margin="1cm" ref={pdfUnitSummaryComp}>
      <div
        className="py-1 px-1 m-2 mt-[1px] rounded-lg border border-gray-100  overflow-y-scroll"
        style={{ height: `calc(100vh - 120px)` }}
      >
        {/* customer details */}
        {/* Unit details */}
        {/* payment schedule */}
        {/* Finance History */}
        {/* Payment Summay */}
        {/* Unit Position Summary */}
        <div className="flex flex-col">
        {/* <div className="rounded  py-3 w-full grid  gap-2">
            <div className="flex flex-col bg-white rounded-lg border p-3 ">
              <div className="flex flex-row ">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Payments Summary
                </h1>
              </div>

              <div className="mt-1">
                <CrmUnitPaymentGraph
                  selCustomerPayload={selUnitPayload}
                  assets={assets}
                />
              </div>
            </div>
            <div className="flex flex-col bg-white border rounded-lg p-3  w-full ">
              <div className="flex flex-row ">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Recent Transactions
                </h1>
              </div>

              <div className="bg-white rounded-xl p-6">


      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
            <th className="text-left font-normal pb-3">Amount</th>
              <th className="text-left font-normal pb-3">Date</th>

    
              <th className="text-left font-normal pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {unitTransactionsA.map((d1, idx) => (
              <tr key={idx} className="text-sm border-b border-gray-50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
   
                    <div>
                    <span className='text-[13px] font-semibold'>                        ₹{d1?.totalAmount?.toLocaleString('en-IN') || d1?.amount?.toLocaleString('en-IN')}
</span>
                      <p className="text-xs text-gray-500">{d1?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                  <p className="font-medium">{prettyDate(d1?.txt_dated ||d1?.dated).toLocaleString() }</p>

                  </div>
                </td>

                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    d1?.status === 'In stock'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-green-600'
                  }`}>
                    {d1?.mode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


              <div className="relative col-span-12 pl-6 space-y-2 sm:col-span-9 mt-3">
                {unitFetchedActivityData?.length == 0 && (
                  <div className="py-8 px-8 flex flex-col items-center">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/templates.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      Timeline is Empty
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                      This scenario is very rare to view
                    </time>
                  </div>
                )}
                <div className="col-span-12 space-y-2 relative pl-4 sm:col-span-8  sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-200">
                  {unitFetchedActivityData?.map((data, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-200 bg-white p-3 rounded-lg"
                      >
                        <section>
                          <span className="text-[11px]  font-bold    py-[2px] rounded-lg   ">
                            {activieLogNamer(data)}:
                          </span>
                          <span className="text-[10px] ml-1 text-[#398A58] font-bold  bg-[#D9d8ff] px-[6px] py-[2px] rounded-lg   ">
                            {data?.to} {'  '}
                          </span>
                        </section>
                        <span className="text-[12px] font- text-[#151F2B] flex flex-row">
            
                          By: {data?.by}
                        </span>
                        <span className="inline-flex flex-row items-center text-[12px] font-normal text-gray-500 ">
                          <ClockIcon className=" w-3 h-3 text-gray-300" />
                          <span className="text-gray-500 ml-1 mr-4">
                            {data?.type == 'ph'
                              ? timeConv(Number(data?.time)).toLocaleString()
                              : timeConv(data?.T).toLocaleString()}
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div> */}


                   <div className="rounded  py-3 w-full grid  gap-2">
            <div className="flex flex-col bg-white rounded-lg border p-3 ">
              <div className="flex flex-row ">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Payments Summary
                </h1>
              </div>

              <div className="mt-1">
                <CrmUnitPaymentGraph
                  selCustomerPayload={selUnitPayload}
                  assets={assets}
                />
              </div>
            </div>
            <div className="flex flex-col bg-white border rounded-lg p-3  w-full ">
              <div className="flex flex-row ">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Recent Transactions
                </h1>
              </div>

              <div className="bg-white rounded-xl p-6">


      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
            <th className="text-left font-normal pb-3">Amount</th>
              <th className="text-left font-normal pb-3">Date</th>

    
              <th className="text-left font-normal pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {unitTransactionsA.map((d1, idx) => (
              <tr key={idx} className="text-sm border-b border-gray-50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
   
                    <div>
                    <span className='text-[13px] font-semibold'>                        ₹{d1?.totalAmount?.toLocaleString('en-IN') || d1?.amount?.toLocaleString('en-IN')}
</span>
                      <p className="text-xs text-gray-500">{d1?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                  <p className="font-medium">{prettyDate(d1?.txt_dated ||d1?.dated).toLocaleString() }</p>

                  </div>
                </td>

                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    d1?.status === 'In stock'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-green-600'
                  }`}>
                    {d1?.mode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


              <div className="relative col-span-12 pl-6 space-y-2 sm:col-span-9 mt-3">
                {unitFetchedActivityData?.length == 0 && (
                  <div className="py-8 px-8 flex flex-col items-center">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/templates.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      Timeline is Empty
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                      This scenario is very rare to view
                    </time>
                  </div>
                )}
                <div className="col-span-12 space-y-2 relative pl-4 sm:col-span-8  sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-200">
                  {unitFetchedActivityData?.map((data, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-200 bg-white p-3 rounded-lg"
                      >
                        <section>
                          <span className="text-[11px]  font-bold    py-[2px] rounded-lg   ">
                            {activieLogNamer(data)}:
                          </span>
                          <span className="text-[10px] ml-1 text-[#398A58] font-bold  bg-[#D9d8ff] px-[6px] py-[2px] rounded-lg   ">
                            {data?.to} {'  '}
                          </span>
                        </section>
                        <span className="text-[12px] font- text-[#151F2B] flex flex-row">
            
                          By: {data?.by}
                        </span>
                        <span className="inline-flex flex-row items-center text-[12px] font-normal text-gray-500 ">
                          <ClockIcon className=" w-3 h-3 text-gray-300" />
                          <span className="text-gray-500 ml-1 mr-4">
                            {data?.type == 'ph'
                              ? timeConv(Number(data?.time)).toLocaleString()
                              : timeConv(data?.T).toLocaleString()}
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div> 
          <div className="w-full">
            {/* customer details */}
            <div className="flex flex-row justify-between text-end items-end mr-2"></div>

            {/* 1 } customer details */}
            {/* Unit details */}

            {/* Payment Summay */}

            {/* Unit Position Summary */}
            {/* payment schedule */}
            <div>
              <CrmUnitCostSheetView
                selCustomerPayload={selUnitPayload}
                assets={assets}
                totalIs={totalIs}
              />
            </div>
            <div></div>
          </div>


        </div>
      </div>
    </PDFExport>
  )
}

export default CrmUnitSummary
