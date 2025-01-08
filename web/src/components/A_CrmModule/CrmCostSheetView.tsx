import { useState, useEffect } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import PdfInvoiceGenerator from 'src/util/PdfInvoiceGenerator'

const CrmUnitCostSheetView = ({ selCustomerPayload, assets, totalIs,selUnitDetails,newPlotCostSheetA,   newPlotPS, }) => {
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

  const [partATotals, setPartATotal] = useState(0)

  const [netTotal, setNetTotal] = useState(0)
 


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
    setUnitTotal(a + b + c +d+e)
    setPossessionTotal(f)
    setGrossTotal(a + b + c +d+e+f)

  }, [selCustomerPayload])

  return (
    <>
      <div className="mt-2  ">
        <section className="mr- flex flex-row  ">
          <div className="w-full">
            <div className="border  bg-white  rounded-xl  py-3">
              <div className="flex flex-row  px-3">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Cost Sheet
                </h1>
              </div>
              <div className="grid  grid-row-2  gap-x-2  px-3 py-2">
                <div className="border-[0.05px]  border-gray-300 rounded-md p-[4px]">
                  {/* <h1 className=" mt-2 mb-1 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-1">
                    Part (A)
                  </h1> */}
                  <table className="w-[100%]">
                    <thead>
                      <tr className=" h-8 border-b-[0.2px] border-gray-300 w-[100%]">
                        <th className="min-w-[35%] text-[10px] text-left text-[#04050b] bg-[#D9D8FF]  tracking-wide  px-2">
                          Charges ({ selCustomerPayload?.area?.toLocaleString('en-IN')} sqm)
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#04050b] bg-[#D9D8FF] tracking-wide">
                          Rate/Sqm
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#04050b] bg-[#D9D8FF] tracking-wide ">
                          Sale Value
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#04050b] bg-[#D9D8FF]  tracking-wide px-2">
                          GST
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#04050b] bg-[#D9D8FF]  tracking-wide px-2 ">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {' '}
                      {[''].map((d1, inx) => (
                        <tr
                          key={inx}
                          className="border-b-[0.05px] border-gray-300 h-[32px]"
                        >
                          <th className="w-[40%] text-[12px] text-left text-gray-700 bg-[#F0f1ff] px-2">
                            Stall Cost
                          </th>

                          <td className="w-[15%] text-[12px] text-right text-gray-700 bg-[#F0f1ff]">
                            ₹{selCustomerPayload?.charges?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right text-gray-700 bg-[#F0f1ff] ">
                            ₹{((selCustomerPayload?.TotalNetSaleValueGsT || 0)-(selCustomerPayload?.gstValue || 0))?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right text-gray-700 px-2 bg-[#F0f1ff]">
                            ₹{selCustomerPayload?.gstValue?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[12px] text-right  text-gray-800 bg-[#F0f1ff] px-2">
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

         <div  className='mt-2'>
          
        {/* <PdfInvoiceGenerator
          user={user}
          selUnitDetails={selUnitDetails}
          myObj={newPlotCostSheetA}
          newPlotPS={newPlotPS}

          netTotal={netTotal}
        setNetTotal={setNetTotal}
        partATotal={partATotals}
        partBTotal={0}
        setPartATotal={setPartATotal}
        
          projectDetails={{}}
                                      /> */}
         </div>



      
      </div>

    </>
  )
}

export default CrmUnitCostSheetView
