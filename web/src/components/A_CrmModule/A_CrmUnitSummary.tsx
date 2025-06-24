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
import { Grid3X3, Maximize2, Navigation } from 'lucide-react'
import FinancialSemicircleChart from './FinancialSemicircleChart'

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






  const furnitureItems = [
    {
      id: 1,
      name: 'Chair',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-gray-600">
          <rect x="20" y="20" width="60" height="4" fill="currentColor" rx="2" />
          <rect x="20" y="24" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />
          <line x1="20" y1="64" x2="20" y2="85" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="64" x2="80" y2="85" stroke="currentColor" strokeWidth="3" />
          <line x1="20" y1="85" x2="80" y2="85" stroke="currentColor" strokeWidth="3" />
          <line x1="35" y1="24" x2="35" y2="64" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="24" x2="50" y2="64" stroke="currentColor" strokeWidth="1" />
          <line x1="65" y1="24" x2="65" y2="64" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Round Table',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-gray-600">
          <ellipse cx="50" cy="40" rx="35" ry="15" fill="currentColor" />
          <line x1="25" y1="45" x2="20" y2="80" stroke="currentColor" strokeWidth="3" />
          <line x1="75" y1="45" x2="80" y2="80" stroke="currentColor" strokeWidth="3" />
          <line x1="50" y1="55" x2="50" y2="80" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Shelving Unit',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-gray-600">
          <rect x="25" y="20" width="50" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" strokeWidth="2" />
          <rect x="30" y="25" width="15" height="8" fill="currentColor" />
          <rect x="30" y="40" width="15" height="8" fill="currentColor" />
          <rect x="55" y="55" width="15" height="8" fill="currentColor" />
        </svg>
      )
    }
  ];












  return (
    <PDFExport paperSize="A4" margin="1cm" ref={pdfUnitSummaryComp}>
      <div
        className="py-1 px-1 m-2 mt-[1px]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box 1 - Left Column */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
              </div>
              <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">TRANSACTION HISTORY</h2>
            </div>

            <div className="space-y-4">
              {unitTransactionsA.map((d1, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="font-manrope font-medium text-sm leading-[100%] tracking-normal text-[#666666]">
                    {prettyDate(d1?.txt_dated || d1?.dated).toLocaleString()}
                  </div>

                  <div className="flex-grow px-2 flex items-center">
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                  </div>

                  <div className="flex items-center flex-shrink-0">
                    <div className="font-manrope font-medium text-sm leading-[100%] tracking-normal text-[#666666]">
                      ₹{d1?.totalAmount?.toLocaleString('en-IN') || d1?.amount?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-orange-500 ml-1">
                      ({d1?.mode})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {unitTransactionsA.length === 0 && (
              <div className="text-center py-6">
                <div className="text-sm text-gray-400 mb-1">No transactions found</div>
                <div className="text-xs text-gray-500">Your recent transactions will appear here</div>
              </div>
            )}
          </div>

          {/* Box 2 - Right Column */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
              </div>
              <h2 className=" font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">STALL DETAILS</h2>
            </div>

            <div className="grid grid-cols-3 gap-6">

              <div className="text-center flex gap-2">
                <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                </div>

                <div>
                  <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666] mb-1">Stall No</p>
                  <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">25</p>
                </div>

              </div>

              <div className="text-center flex gap-2">
                <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                </div>

                <div>
                  <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666] mb-1">Sqft</p>
                  <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">1200</p>
                </div>

              </div>

              <div className="text-center flex gap-2">
                <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                </div>

                <div>
                  <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666]mb-1">Facing</p>
                  <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">North</p>
                </div>

              </div>
            </div>
          </div>

          {/* Box 3 - Left Column */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                </div>
                <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">ADD ON</h2>
              </div>
              <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors text-xs">
                Add more
              </button>
            </div>

            {/* Furniture Items Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {furnitureItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-center aspect-square hover:bg-gray-100 transition-colors cursor-pointer">
                  {item.svg}
                </div>
              ))}

              {/* More Items (+3) */}
              <div className="bg-gray-600 rounded-xl p-4 flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-700 transition-colors">
                <svg viewBox="0 0 100 100" className="w-10 h-10 mb-1">
                  <ellipse cx="50" cy="40" rx="25" ry="10" fill="#fff" />
                  <line x1="35" y1="45" x2="30" y2="70" stroke="#fff" strokeWidth="2" />
                  <line x1="65" y1="45" x2="70" y2="70" stroke="#fff" strokeWidth="2" />
                  <line x1="50" y1="50" x2="50" y2="70" stroke="#fff" strokeWidth="2" />
                </svg>
                <span className="text-white text-base font-bold">+3</span>
              </div>
            </div>

            {/* Total Pay */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-inter font-bold text-[14px] leading-6 tracking-normal">Total Pay</span>
              <div className="text-right">
                <span className="text-[14px] font-bold text-orange-500">Rs.5,990</span>
                <span className="text-xs text-gray-400 ml-1">(7 Items)</span>
              </div>
            </div>
          </div>

          {/* Box 4 - Right Column */}







          <div className="bg-white flex justify-between flex-col rounded-2xl px-8 py-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
              </div>
              <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">STALL COST</h2>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <FinancialSemicircleChart
                  paidValue={(selUnitPayload?.T_review || 0) + (selUnitPayload?.T_approved || 0)}
                  remainingValue={selUnitPayload?.T_elgible - ((selUnitPayload?.T_review || 0) + (selUnitPayload?.T_approved || 0))}
                  balance={selUnitPayload?.T_elgible_balance < 0 ? 0 : selUnitPayload?.T_elgible_balance}
                  filledColor="#DBD3FD"
                  emptyColor="#E5E7EB"
                  showPercentage={true}
                  showBalance={false}
                />
              </div>

              <div className="space-y-3">
                <div className="text-right flex gap-1">
                  <div className="font-normal text-[14px] leading-[16px] tracking-[0] text-[#808080] font-body">Stall Cost:</div>
                  <div className="font-normal text-[14px] leading-[16px] tracking-[0] text-[#1A1A1A] font-body">₹ 22,12,22,32,000</div>
                </div>
                <div className="text-right flex gap-1">
                  <div className="font-normal text-[14px] leading-[16px] tracking-[0] text-[#808080] font-body">Unit Cost:</div>
                  <div className="font-normal text-[14px] leading-[16px] tracking-[0] text-[#1A1A1A] font-body">₹ 22,12,22,32,000</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              {/* Left - Paid */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Paid:</span>
                <span className="text-sm font-medium text-gray-800 ml-2">₹ 22,12,22,32,000</span>
              </div>

              {/* Right - Balance */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                <span className="text-sm text-gray-600">Balance:</span>
                <span className="text-sm font-medium text-red-500 ml-2">₹ 1,22,32,000</span>
              </div>
            </div>


          </div>











        </div>



































        {/* customer details */}
        {/* Unit details */}
        {/* payment schedule */}
        {/* Finance History */}
        {/* Payment Summay */}
        {/* Unit Position Summary */}

        <div className="flex flex-col">
          {/* <div className="rounded w-[300px] py-3 w-full grid grid-cols-2 gap-2">
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
       
          </div> */}
          <div className="w-full">

            <div className="flex flex-row justify-between text-end items-end mr-2"></div>


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
