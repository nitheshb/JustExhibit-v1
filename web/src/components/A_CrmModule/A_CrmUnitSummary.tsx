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



  const INITIAL_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleViewMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 3, unitTransactionsA.length)
    );
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };



  return (
    <PDFExport paperSize="A4" margin="1cm" ref={pdfUnitSummaryComp}>
      <div
        className="py-1  mt-[1px]"
      >

        
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left column - Stall Cost and Transaction History */}
      <div className='grid gap-4'>
        {/* Box 1 - Stall Cost */}
        <div className="bg-white flex justify-between h-[217px] flex-col rounded-2xl px-8 py-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
              <img src="/StallCostbox1.svg" className="w-[16px] h-[16px]" alt="" />
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
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Paid:</span>
              <span className="text-sm font-medium text-gray-800 ml-2">₹ 22,12,22,32,000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
              <span className="text-sm text-gray-600">Balance:</span>
              <span className="text-sm font-medium text-red-500 ml-2">₹ 1,22,32,000</span>
            </div>
          </div>
        </div>

        {/* Box 3 - Transaction History */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${
          unitTransactionsA.length > INITIAL_COUNT ? 'h-auto' : 'h-[200px]'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center p-1.5">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 9.8335C7.36739 9.8335 7.24022 9.78082 7.14645 9.68705C7.05268 9.59328 7 9.4661 7 9.3335C7 9.20089 7.05268 9.07371 7.14645 8.97994C7.24022 8.88617 7.36739 8.8335 7.5 8.8335C7.63261 8.8335 7.75978 8.88617 7.85355 8.97994C7.94732 9.07371 8 9.20089 8 9.3335C8 9.4661 7.94732 9.59328 7.85355 9.68705C7.75978 9.78082 7.63261 9.8335 7.5 9.8335Z" fill="#F44D21"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.143 7.16667C3.20789 7.16667 3.27133 7.16133 3.33333 7.15067V9.83333H2.5C2.4558 9.83333 2.41341 9.85089 2.38215 9.88215C2.35089 9.9134 2.33333 9.9558 2.33333 10V10.3333C2.33333 10.3775 2.35089 10.4199 2.38215 10.4512C2.41341 10.4824 2.4558 10.5 2.5 10.5H13.5C13.5442 10.5 13.5866 10.4824 13.6179 10.4512C13.6491 10.4199 13.6667 10.3775 13.6667 10.3333V10C13.6667 9.9558 13.6491 9.9134 13.6179 9.88215C13.5866 9.85089 13.5442 9.83333 13.5 9.83333H12.6667V7.15067C12.7289 7.16133 12.7923 7.16667 12.857 7.16667C13.491 7.16667 14 6.64933 14 6.017V5.22033C14.0002 5.11461 13.9818 5.00967 13.9457 4.91033L13.219 2.907C13.1759 2.78776 13.0971 2.68471 12.9933 2.61188C12.8895 2.53905 12.7658 2.49999 12.639 2.5H3.36067C3.23395 2.50015 3.11036 2.53933 3.0067 2.61221C2.90304 2.68509 2.82435 2.78814 2.78133 2.90733L2.05467 4.91033C2.01838 5.00965 1.99987 5.11459 2 5.22033V6.017C2 6.64933 2.509 7.16667 3.143 7.16667ZM2.68133 5.13767L3.39633 3.16667H12.6033L13.3183 5.13767C13.3281 5.16433 13.333 5.19189 13.333 5.22033V6.017C13.3338 6.14419 13.2841 6.2665 13.1948 6.35706C13.1055 6.44762 12.9839 6.49903 12.8567 6.5C12.5967 6.5 12.3807 6.28667 12.3807 6.017C12.3807 5.92859 12.3455 5.84381 12.283 5.7813C12.2205 5.71879 12.1357 5.68367 12.0473 5.68367C11.9589 5.68367 11.8741 5.71879 11.8116 5.7813C11.7491 5.84381 11.714 5.92859 11.714 6.017C11.7148 6.14419 11.6651 6.2665 11.5758 6.35706C11.4865 6.44762 11.3649 6.49903 11.2377 6.5C10.9777 6.5 10.7617 6.28667 10.7617 6.01733C10.7617 5.92893 10.7265 5.84414 10.664 5.78163C10.6015 5.71912 10.5167 5.684 10.4283 5.684C10.3399 5.684 10.2551 5.71912 10.1926 5.78163C10.1301 5.84414 10.095 5.92893 10.095 6.01733C10.095 6.28667 9.879 6.5 9.61867 6.5C9.35833 6.5 9.14267 6.28667 9.14267 6.017C9.14267 5.92859 9.10755 5.84381 9.04504 5.7813C8.98252 5.71879 8.89774 5.68367 8.80933 5.68367C8.72093 5.68367 8.63614 5.71879 8.57363 5.7813C8.51112 5.84381 8.476 5.92859 8.476 6.017C8.4768 6.14413 8.42713 6.26639 8.33789 6.35694C8.24865 6.44749 8.12713 6.49894 8 6.5C7.87287 6.49903 7.75132 6.44767 7.66201 6.35718C7.57271 6.26669 7.52296 6.14447 7.52367 6.01733C7.52367 5.92893 7.48855 5.84414 7.42604 5.78163C7.36352 5.71912 7.27874 5.684 7.19033 5.684C7.10193 5.684 7.01714 5.71912 6.95463 5.78163C6.89212 5.84414 6.857 5.92893 6.857 6.01733C6.857 6.28667 6.64133 6.5 6.381 6.5C6.12067 6.5 5.90467 6.28667 5.90467 6.017C5.90467 5.92859 5.86955 5.84381 5.80704 5.7813C5.74452 5.71879 5.65974 5.68367 5.57133 5.68367C5.48293 5.68367 5.39814 5.71879 5.33563 5.7813C5.27312 5.84381 5.238 5.92859 5.238 6.017C5.238 6.28633 5.02233 6.5 4.762 6.5C4.50167 6.5 4.28567 6.28667 4.28567 6.017C4.28567 5.92859 4.25055 5.84381 4.18804 5.7813C4.12552 5.71879 4.04074 5.68367 3.95233 5.68367C3.86393 5.68367 3.77914 5.71879 3.71663 5.7813C3.65412 5.84381 3.619 5.92859 3.619 6.017C3.619 6.28633 3.40333 6.5 3.143 6.5C2.88233 6.5 2.66667 6.28667 2.66667 6.017V5.22033C2.66667 5.19167 2.67156 5.16411 2.68133 5.13767ZM12 6.874C11.7912 7.06281 11.5195 7.16714 11.238 7.16667C11.0874 7.16692 10.9383 7.13717 10.7993 7.07913C10.6604 7.0211 10.5343 6.93595 10.4287 6.82867C10.3229 6.93599 10.1969 7.02116 10.0579 7.0792C9.91885 7.13723 9.76965 7.16697 9.619 7.16667C9.46841 7.16692 9.31927 7.13717 9.18031 7.07913C9.04135 7.0211 8.91535 6.93595 8.80967 6.82867C8.70395 6.93599 8.57789 7.02116 8.43887 7.0792C8.29985 7.13723 8.15065 7.16697 8 7.16667C7.84935 7.16697 7.70015 7.13723 7.56113 7.0792C7.42211 7.02116 7.29605 6.93599 7.19033 6.82867C7.08465 6.93595 6.95865 7.0211 6.81969 7.07913C6.68073 7.13717 6.53159 7.16692 6.381 7.16667C6.064 7.16667 5.77767 7.037 5.57133 6.82867C5.46565 6.93595 5.33965 7.0211 5.20069 7.07913C5.06173 7.13717 4.91259 7.16692 4.762 7.16667C4.46867 7.16667 4.202 7.05567 4 6.874V9.83333H4.83333C4.78913 9.83333 4.74674 9.81577 4.71548 9.78452C4.68423 9.75326 4.66667 9.71087 4.66667 9.66667V9C4.66667 8.9558 4.68423 8.9134 4.71548 8.88215C4.74674 8.85089 4.78913 8.83333 4.83333 8.83333H5.83333C5.87754 8.83333 5.91993 8.85089 5.95119 8.88215C5.98244 8.9134 6 8.9558 6 9V9.16667H6.5C6.5442 9.16667 6.5866 9.18423 6.61785 9.21548C6.64911 9.24674 6.66667 9.28913 6.66667 9.33333V9.66667C6.66667 9.71087 6.64911 9.75326 6.61785 9.78452C6.5866 9.81577 6.5442 9.83333 6.5 9.83333H12V6.874ZM2.66667 11.5C2.66667 11.4116 2.70179 11.3268 2.7643 11.2643C2.82681 11.2018 2.9116 11.1667 3 11.1667H13C13.0884 11.1667 13.1732 11.2018 13.2357 11.2643C13.2982 11.3268 13.3333 11.4116 13.3333 11.5V14.1667C13.3333 14.2551 13.2982 14.3399 13.2357 14.4024C13.1732 14.4649 13.0884 14.5 13 14.5H3C2.9116 14.5 2.82681 14.4649 2.7643 14.4024C2.70179 14.3399 2.66667 14.2551 2.66667 14.1667V11.5ZM3.33333 13.8333V11.8333H12.6667V13.8333H3.33333Z" fill="#F44D21"/>
</svg>

            </div>
            <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">
              TRANSACTION HISTORY
            </h2>
          </div>

          {unitTransactionsA.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-sm text-gray-400 mb-1">No transactions found</div>
              <div className="text-xs text-gray-500">
                Your recent transactions will appear here
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {unitTransactionsA.slice(0, visibleCount).map((d1, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="font-manrope font-medium text-sm leading-[100%] tracking-normal text-[#666666]">
                      {prettyDate(d1?.txt_dated || d1?.dated).toLocaleString()}
                    </div>
                    <div className="flex-grow px-2 flex items-center">
                      <div className="border-t border-dashed border-gray-300 w-full"></div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <div className="font-manrope font-medium text-sm leading-[100%] tracking-normal text-[#666666]">
                        ₹
                        {d1?.totalAmount?.toLocaleString("en-IN") ||
                          d1?.amount?.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-orange-500 ml-1">
                        ({d1?.mode})
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {unitTransactionsA.length > INITIAL_COUNT && (
                <div className="text-center mt-4">
                  {visibleCount < unitTransactionsA.length ? (
                    <button
                      onClick={handleViewMore}
                      className="text-sm font-medium text-orange-500 hover:underline"
                    >
                      View More
                    </button>
                  ) : (
                    <button
                      onClick={handleViewLess}
                      className="text-sm font-medium text-orange-500 hover:underline"
                    >
                      View Less
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right column - Stall Details and Add On */}
      <div className='grid gap-4'>
        {/* Box 2 - Stall Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col h-[160px] justify-between border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
              <img src="/Transactionbox3.svg" className="w-[16px] h-[16px]" alt="" />
            </div>
            <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">STALL DETAILS</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center flex gap-2">
              <div className="w-[30px] h-[30px] rounded-full border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.72598 2.56308C3.94655 2.70804 3.37291 2.96444 2.91941 3.41794C2.46591 3.87145 2.20951 4.44508 2.06455 5.22451M13.276 2.56308C14.0554 2.70804 14.629 2.96444 15.0825 3.41794C15.536 3.87145 15.7924 4.44508 15.9374 5.22451M10.426 2.37823C9.98766 2.37451 9.5139 2.37451 9.00098 2.37451C8.48804 2.37451 8.01428 2.37451 7.57596 2.37823M16.1223 8.07451C16.126 8.51282 16.126 8.98658 16.126 9.49951C16.126 10.0125 16.126 10.4862 16.1223 10.9246M1.87969 8.07451C1.87598 8.51282 1.87598 8.98658 1.87598 9.49951C1.87598 10.0125 1.87598 10.4862 1.87969 10.9246M2.06455 13.7745C2.20951 14.5539 2.46591 15.1276 2.91941 15.5811C3.37291 16.0346 3.94655 16.291 4.72598 16.4359M15.9374 13.7745C15.7924 14.5539 15.536 15.1276 15.0825 15.5811C14.629 16.0346 14.0554 16.291 13.276 16.4359M10.426 16.6208C9.98766 16.6245 9.5139 16.6245 9.00098 16.6245C8.4881 16.6245 8.01437 16.6245 7.57609 16.6208" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666] mb-1">Stall No</p>
                <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">25</p>
              </div>
            </div>

            <div className="text-center flex gap-2">
              <div className="w-[30px] h-[30px] rounded-full border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2911 9.79107C10.5782 9.50388 10.7423 9.121 11.0705 8.35522L12.2379 5.63128C12.3552 5.35758 12.4139 5.22073 12.3466 5.15342C12.2793 5.08611 12.1424 5.14476 11.8687 5.26207L9.14478 6.42947C8.379 6.75766 7.99612 6.92175 7.70893 7.20893M10.2911 9.79107C10.0039 10.0782 9.621 10.2423 8.85522 10.5705L6.13128 11.7379C5.85758 11.8552 5.72073 11.9139 5.65342 11.8466C5.58611 11.7793 5.64476 11.6424 5.76207 11.3687L6.92947 8.64478C7.25766 7.879 7.42175 7.49612 7.70893 7.20893M10.2911 9.79107L7.70893 7.20893" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 8.5C16.5 12.6421 13.1421 16 9 16C4.85786 16 1.5 12.6421 1.5 8.5C1.5 4.35786 4.85786 1 9 1C13.1421 1 16.5 4.35786 16.5 8.5Z" stroke="#F44D21" stroke-width="1.125"/>
<path d="M9 1L9 2.125M9 16L9 14.875" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 8.5L15.375 8.5M1.5 8.5L2.625 8.5" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666] mb-1">Sqft</p>
                <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">1200</p>
              </div>
            </div>

            <div className="text-center flex gap-2">
              <div className="w-[30px] h-[30px] rounded-full border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2911 9.79107C10.5782 9.50388 10.7423 9.121 11.0705 8.35522L12.2379 5.63128C12.3552 5.35758 12.4139 5.22073 12.3466 5.15342C12.2793 5.08611 12.1424 5.14476 11.8687 5.26207L9.14478 6.42947C8.379 6.75766 7.99612 6.92175 7.70893 7.20893M10.2911 9.79107C10.0039 10.0782 9.621 10.2423 8.85522 10.5705L6.13128 11.7379C5.85758 11.8552 5.72073 11.9139 5.65342 11.8466C5.58611 11.7793 5.64476 11.6424 5.76207 11.3687L6.92947 8.64478C7.25766 7.879 7.42175 7.49612 7.70893 7.20893M10.2911 9.79107L7.70893 7.20893" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 8.5C16.5 12.6421 13.1421 16 9 16C4.85786 16 1.5 12.6421 1.5 8.5C1.5 4.35786 4.85786 1 9 1C13.1421 1 16.5 4.35786 16.5 8.5Z" stroke="#F44D21" stroke-width="1.125"/>
<path d="M9 1L9 2.125M9 16L9 14.875" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 8.5L15.375 8.5M1.5 8.5L2.625 8.5" stroke="#F44D21" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              <div>
                <p className="font-manrope font-medium text-[12px] leading-[100%] tracking-normal text-[#666666]mb-1">Facing</p>
                <p className="font-manrope font-medium text-[16px] leading-[100%] tracking-normal text-[#1A1A1A]">North</p>
              </div>
            </div>
          </div>
        </div>

        {/* Box 4 - Add On */}
        <div className="bg-white rounded-2xl p-6 h-[256px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
                  <img src="/Addonsbox4.svg" className="w-[16px] h-[16px]" alt="" />
              </div>
              <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">ADD ON</h2>
            </div>
            <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors text-xs">
              Add more
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {furnitureItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-center aspect-square hover:bg-gray-100 transition-colors cursor-pointer">
                {item.svg}
              </div>
            ))}

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

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="font-inter font-bold text-[14px] leading-6 tracking-normal">Total Pay</span>
            <div className="text-right">
              <span className="text-[14px] font-bold text-orange-500">Rs.5,990</span>
              <span className="text-xs text-gray-400 ml-1">(7 Items)</span>
            </div>
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
