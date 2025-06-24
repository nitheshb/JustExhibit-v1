import { useState, useEffect } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'

const CrmUnitCostSheetView = ({ selCustomerPayload, assets, totalIs }) => {
  const { user } = useAuth()
  const { orgId } = user
  const [partATotal, setPartA] = useState(0)
  const [partBTotal, setPartB] = useState(0)
  const [constructTotalA, setConstructA] = useState(0)
  const [constructTotalB, setConstructB] = useState(0)
  const [possessionTotal, setPossessionTotal] = useState(0)
  const [addOnTotal, setPartAddOn] = useState(0)
  const [unitTotal, setUnitTotal] = useState(0)
  const [grossUnitTotal, setGrossTotal] = useState(0)

  console.log('payload is ', selCustomerPayload)
  useEffect(() => {
    let a = selCustomerPayload?.plotCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    // let b = selCustomerPayload?.addChargesCS?.reduce(
    //   (partialSum, obj) =>
    //     partialSum +
    //     Number(
    //       computeTotal(
    //         obj,
    //         selCustomerPayload?.super_built_up_area ||
    //           selCustomerPayload?.area?.toString()?.replace(',', '')
    //       )
    //     ),
    //   0
    // )
    let b = selCustomerPayload?.addChargesCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    // let c =
    //   selCustomerPayload?.addOnCS?.reduce(
    //     (partialSum, obj) =>
    //       partialSum +
    //       Number(
    //         computeTotal(
    //           obj,
    //           selCustomerPayload?.super_built_up_area ||
    //             selCustomerPayload?.area?.toString()?.replace(',', '')
    //         )
    //       ),
    //     0
    //   ) || 0
    let c = selCustomerPayload?.addOnCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    let d = selCustomerPayload?.constructCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    let e = selCustomerPayload?.constAdditionalChargesCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    let f = selCustomerPayload?.possessionAdditionalCostCS?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )

    if (isNaN(a)) {
      a = 0
    }
    if (isNaN(b)) {
      b = 0
    }
    if (isNaN(c)) {
      c = 0
    }
    if (isNaN(d)) {
      d = 0
    }
    if (isNaN(e)) {
      e = 0
    }
    if (isNaN(f)) {
      f = 0
    }

    setPartA(a)
    setPartB(b)
    setPartAddOn(c)
    setConstructA(d)
    setConstructB(e)
    setUnitTotal(a + b + c + d + e)
    setPossessionTotal(f)
    setGrossTotal(a + b + c + d + e + f)

  }, [selCustomerPayload])

  return (
    <>
      <div className="mt-4">
        <section className="flex flex-row   bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ">
          <div className="w-full">
            <div className="">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
                </div>
                <h1 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">
                  Cost Sheet
                </h1>
              </div>

              
              <div className="grid  grid-row-2  gap-x-2  mt-4">
                <div className="border-[0.05px]  border-gray-300 rounded-md ">
                  {/* <h1 className=" mt-2 mb-1 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-1">
                    Part (A)
                  </h1> */}
                  <table className="w-[100%]">
                    <thead>
                      <tr className="h-10 border-b border-dotted border-gray-300 w-full">
                        <th className="min-w-[35%]  text-left text-[#04050b] bg-[#FEEDE9]  px-2 font-manrope font-semibold text-sm leading-[100%] tracking-normal text-[#1A1A1A]">
                          Charges ({selCustomerPayload?.area?.toLocaleString('en-IN')} sqm)
                        </th>
                        <th className="w-[15%] text-right  bg-[#FEEDE9] font-manrope font-semibold text-sm leading-[100%] tracking-normal text-[#1A1A1A] ">
                          Rate/Sqm
                        </th>
                        <th className="w-[15%]  text-right bg-[#FEEDE9]  font-manrope font-semibold text-sm leading-[100%] tracking-normal text-[#1A1A1A] ">
                          Sale Value
                        </th>
                        <th className="w-[15%]  text-right  bg-[#FEEDE9]   px-2 font-manrope font-semibold text-sm leading-[100%] tracking-normal text-[#1A1A1A]">
                          GST
                        </th>
                        <th className="w-[15%] text-right  bg-[#FEEDE9]   px-2 font-manrope font-semibold text-sm leading-[100%] tracking-normal text-[#1A1A1A] ">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {' '}
                      {[''].map((d1, inx) => (
                        <tr
                          key={inx}
                          className=" border-b border-dotted border-gray-300 h-[42px]"
                        >
                          <th className="w-[40%] text-[12px] text-left text-gray-700  px-2">
                            Stall Cost
                          </th>

                          <td className="w-[15%] text-[12px] text-right text-gray-700 ">
                            ₹{selCustomerPayload?.charges?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right text-gray-700   ">
                            ₹{((selCustomerPayload?.TotalNetSaleValueGsT || 0) - (selCustomerPayload?.gstValue || 0))?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right text-gray-700 px-2 ">
                            ₹{selCustomerPayload?.gstValue?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right  text-gray-800  px-2">
                            ₹{' '}
                            {selCustomerPayload?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                      <tr className="  h-[32px]">
                        <th className="w-[40%] text-[10px] text-left text-gray-800 "></th>
                        <td className="w-[15%] font-bold text-[10px] text-right text-gray-800  "></td>
                        <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800   "></td>
                        <td className="w-[15%] font-bold  text-[14px] text-right text-gray-800 pr-2  ">
                          {' '}
                          Stall Cost:
                        </td>
                        <td className="w-[15%] font-bold  text-[12px] text-right text-gray-800  px-2">
                          ₹{selCustomerPayload?.T_total?.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>


            </div>
          </div>
        </section>
      </div>

    </>
  )
}

export default CrmUnitCostSheetView
