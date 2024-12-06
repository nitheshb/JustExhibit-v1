import { useState, useEffect, createRef } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from 'src/util/computeCsTotals'
import "src/styles/myStyles.css"

const CSBody = ({
  csMode,
  selUnitDetails,
  leadDetailsObj1,
  selPhaseObj,
  setSelPhaseObj,
  setNewPlotCsObj,
  costSheetA,
  setCostSheetA,
  setAddiChargesObj,

  showGstCol,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  const ref = createRef()

  useEffect(() => {
    console.log('sel unti detials ', selUnitDetails, selPhaseObj)
  }, [])
  const [initialValuesA, setInitialValuesA] = useState({})

  const [newSqftPrice, setNewSqftPrice] = useState(0)

  const [netTotal, setNetTotal] = useState(0)
  const [partATotal, setPartATotal] = useState(0)
  const [partBTotal, setPartBTotal] = useState(0)
  const [plotBookingAdv, setPlotBookingAdv] = useState(0)
  const [partBPayload, setPartBPayload] = useState([])
  const [psPayload, setPSPayload] = useState([])
  const [pdfPreview, setpdfPreview] = useState(false)



  const [newPlotPS, setNewPS ] = useState({})
  useEffect(() => {
    console.log('gen costSheetA', costSheetA)

    setTotalFun()

  }, [costSheetA, selPhaseObj])

  useEffect(() => {
    // setNewPlotCsObj(costSheetA)
  }, [newSqftPrice])


  useEffect(() => {
    const {
      additonalChargesObj,
      ConstructOtherChargesObj,
      ConstructPayScheduleObj,
      paymentScheduleObj,
    } = selPhaseObj
    // const { uid } = selUnitDetails
    const y = selUnitDetails?.rate_per_sqft
    const z = selUnitDetails?.plc

    const plotTotalSaleValue = Number.isFinite(y)
      ? Number(selUnitDetails?.plot_Sqf * y)
      : Number(
          selUnitDetails?.plot_Sqf *
            (selUnitDetails?.rate_per_sqft || selUnitDetails?.sqft_rate)
        )

    const plot_gstValue = Math.round(plotTotalSaleValue) * 0.05
    console.log(
      'gen costSheetA values are ',
      Number.isFinite(y),
      y,
      selUnitDetails?.plot_Sqf,
      selUnitDetails?.rate_per_sqft
    )
    let x = []
    if (csMode === 'plot_cs') {
      setPartBPayload(additonalChargesObj)
      setAddiChargesObj(additonalChargesObj)
      setPSPayload(paymentScheduleObj)
      x = [
        {
          myId: '1',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'unit_cost_charges',
            label: 'Unit Cost',
          },
          others: selUnitDetails?.rate_per_sqft || selUnitDetails?.sqft_rate,
          charges: selUnitDetails?.rate_per_sqft,
          TotalSaleValue: plotTotalSaleValue,
          gst: {
            label: '0.05',
            value: plot_gstValue,
          },
          TotalNetSaleValueGsT: plotTotalSaleValue + plot_gstValue,
          // others: selUnitDetails?.rate_per_sqft || selUnitDetails?.sqft_rate,
          // charges: Number.isFinite(y) ? y : selUnitDetails?.rate_per_sqft || selUnitDetails?.sqft_rate,
          // TotalSaleValue: Number.isFinite(y)
          //   ? Number(selUnitDetails?.plot_Sqf * y)
          //   : Number(selUnitDetails?.plot_Sqf * selUnitDetails?.rate_per_sqft),
          // // charges: y,
          // gst: {
          //   label: '0.05',
          //   value: Number.isFinite(y)
          //     ? Number(selUnitDetails?.plot_Sqf * y)
          //     : Math.round(
          //         selUnitDetails?.plot_Sqf * selUnitDetails?.rate_per_sqft
          //       ) * 0.05,
          // },
          // TotalNetSaleValueGsT:
          //   (Number.isFinite(y)
          //     ? Number(selUnitDetails?.plot_Sqf * y)
          //     : Number(
          //         selUnitDetails?.plot_Sqf * selUnitDetails?.rate_per_sqft
          //       )) +
          //   (Number.isFinite(y)
          //     ? Number(selUnitDetails?.plot_Sqf * y)
          //     : Math.round(
          //         selUnitDetails?.plot_Sqf * selUnitDetails?.rate_per_sqft
          //       ) * 0.05),
        },
        {
          myId: '2',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'plc_cost_sqft',
            label: 'PLC ',
          },
          others: selUnitDetails?.plc || 200,
          charges: Number.isFinite(z)
            ? z
            : selUnitDetails?.plc || selUnitDetails?.plc_per_sqft,
          TotalSaleValue: Math.round(
            selUnitDetails?.super_built_up_area ||
              selUnitDetails?.plot_Sqf *
                (selUnitDetails?.plc || selUnitDetails?.plc_per_sqft)
          ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Math.round(
              Number(
                selUnitDetails?.super_built_up_area ||
                  selUnitDetails?.plot_Sqf * (selUnitDetails?.plc || 200)
              ) * 0.00
            ),
          },
          TotalNetSaleValueGsT:
            Math.round(
              selUnitDetails?.super_built_up_area ||
                selUnitDetails?.plot_Sqf * (selUnitDetails?.plc || 200)
            ) +
            Math.round(
              Number(
                selUnitDetails?.super_built_up_area ||
                  selUnitDetails?.plot_Sqf * (selUnitDetails?.plc || 200)
              ) * 0.05
            ),
        },
      ]
    } else {
      setPartBPayload(ConstructOtherChargesObj)
      setPSPayload(ConstructPayScheduleObj)
      x = [
        {
          myId: '1',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'villa_construct_cost',
            label: 'Villa Construction Cost',
          },
          others: selUnitDetails?.construct_price,
          charges: Number.isFinite(y) ? y : selUnitDetails?.construct_price,
          TotalSaleValue: Number.isFinite(y)
            ? Number(selUnitDetails?.builtup_area * y)
            : Number(
                selUnitDetails?.builtup_area * selUnitDetails?.construct_price
              ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Math.round(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                ) * 0.05,
          },
          TotalNetSaleValueGsT:
            (Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Number(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                )) +
            (Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Math.round(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                ) * 0.05),
        },
        // {
        //   myId: '2',
        //   units: {
        //     value: 'fixedcost',
        //     label: 'Fixed cost',
        //   },
        //   component: {
        //     value: 'Bescom_Sewage_Charges',
        //     label: 'Bescom & Sewage Charges ',
        //   },
        //   others: selUnitDetails?.PLC,
        //   charges: Number.isFinite(y) ? y : selUnitDetails?.PLC || 200,
        //   TotalSaleValue: Math.round(
        //     selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
        //   ),
        //   gst: {
        //     label: '0.05',
        //     value: Math.round(
        //       Number(
        //         selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
        //       ) * 0.05
        //     ),
        //   },
        //   TotalNetSaleValueGsT:
        //     Math.round(
        //       selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
        //     ) +
        //     Math.round(
        //       Number(
        //         selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
        //       ) * 0.05
        //     ),
        // },
        // {
        //   myId: '3',
        //   units: {
        //     value: 'fixedcost',
        //     label: 'Fixed cost',
        //   },
        //   component: {
        //     value: 'clubhouse',
        //     label: 'Club House ',
        //   },
        //   others: selUnitDetails?.PLC,
        //   charges: 0,
        //   TotalSaleValue: 354000,
        //   // charges: y,
        //   gst: {
        //     label: '0.05',
        //     value: Math.round(354000 * 0.0),
        //   },
        //   TotalNetSaleValueGsT: 354000,
        // },
      ]
    }
    // const x = costSheetA
    let merged = []
    try {
      // if (leadDetailsObj1) {
      //   if (leadDetailsObj1[`${uid}_cs`]['costSheetA']) {
      //     const removeFulCostFieldA = leadDetailsObj1[`${uid}_cs`][
      //       'costSheetA'
      //     ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
      //     merged = [...x, ...removeFulCostFieldA]
      //   } else {
      //     merged = [...x, ...additonalChargesObj]
      //   }
      // }
      merged = [...x, ...additonalChargesObj]

    } catch (error) {
      console.log('error at feching the leadDetails Obj')
      console.log('gen costSheetA', x, additonalChargesObj)
      merged = [...x, ...additonalChargesObj]
    }


    const initformValues = {}
    merged.map((d) => {
      const x = d['component']['value']
      initformValues[`${x}`] = d?.charges
    })
    setInitialValuesA(initformValues)
    console.log('gen costSheetA', x)
    setCostSheetA(x)
  // }, [selPhaseObj, leadDetailsObj1, csMode])
  },[])

  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [])
  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [netTotal, plotBookingAdv, csMode])

  const CreateNewPsFun = (netTotal, plotBookingAdv, csMode) => {
    const newPs = psPayload.map((d1) => {
      const z = d1
      if (csMode === 'plot_cs') {
        z.value = ['on_booking'].includes(d1?.stage?.value)
          ? Number(d1?.percentage)
          : Math.round((netTotal - plotBookingAdv) * (d1?.percentage / 100))
        if (['on_booking'].includes(d1?.stage?.value)) {
          z.elgible = true
          z.elgFrom = Timestamp.now().toMillis()
          return z
        }
        return z
      } else {
        z.value = ['Total_Other_Charges_Amenities:\t'].includes(
          d1?.stage?.value
        )
          ? Number(partBTotal)
          : Math.round((netTotal - partBTotal) * (d1?.percentage / 100))
        return z
      }
    })
    setNewPS(newPs)
  }

  const initialState = initialValuesA
  const validate = Yup.object({
    // blockReason: Yup.number()
    //   .max(15, 'Must be 15 characters or less')
    //   .required('Name is Required'),
  })

  const setTotalFun = async () => {
    const partBTotal = selPhaseObj?.additonalChargesObj.reduce(
      (partialSum, obj) =>
        partialSum +
        Number(computeTotal(obj, selUnitDetails?.super_built_up_area)),
      0
    )

    const partATotal = costSheetA?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    setPartBTotal(partBTotal)
    setPartATotal(partATotal)
    setNetTotal(partATotal + partBTotal)
    selPhaseObj?.paymentScheduleObj.map((data) => {
      if (data.stage?.value === 'on_booking') {
        setPlotBookingAdv(data?.percentage)
      }
    })
  }
  const onSubmit = async (data, resetForm) => {
    const { uid } = selUnitDetails
    const { id } = leadDetailsObj1
    // const x = {
    //   myId: '2',
    //   units: {
    //     value: 'fixedcost',
    //     label: 'Fixed cost',
    //   },
    //   component: {
    //     value: 'ratePerSqft',
    //     label: 'sqftCost',
    //   },
    //   charges: Number(newSqftPrice),
    //   gst: {
    //     label: '0',
    //     value: '0',
    //   },
    // }

    const newCostSheetA = costSheetA.map((dat) => {
      dat.charges = data[dat?.component?.value]
      return dat
    })
    // newCostSheetA.push(x)
    // i need unit_uID & unit details
    const xData = {}

    xData[`${uid}${'_cs'}`] = {
      oldUnitDetailsObj: selUnitDetails,
      newSqftPrice: Number(newSqftPrice),
      soldPrice: Number(soldPrice),
      costSheetA: newCostSheetA,
    }

    updateLeadCostSheetDetailsTo(
      orgId,
      id,
      xData,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )
  }
  const changeOverallCostFun = async (inx, payload, newValue) => {
    const y = costSheetA
    let total = 0
    let gstTotal = 0

    if (csMode === 'plot_cs') {
      total = Math.round(selUnitDetails?.selUnitDetails?.area * newValue)
      gstTotal = Math.round(total * 0.05)
    } else {
      total = Math.round(selUnitDetails?.super_built_up_area * newValue)
      gstTotal = Math.round(
        Number(selUnitDetails?.super_built_up_area * newValue) * 0.05
      )
    }

    y[inx].charges = newValue
    y[inx].TotalSaleValue = total
    y[inx].gst.value = gstTotal
    y[inx].TotalNetSaleValueGsT = total + gstTotal
    console.log('gen costSheetA', y)

    setCostSheetA(y)
    setTotalFun()
  }
  return (
    <div>
      {!pdfPreview && (
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={initialState}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values, resetForm)
            }}
          >
            {(formik) => (
              <div className="px-4">
                <div>
                  <div>
                    <div className="">
                      <h1 className="text-bodyLato text-center text-gray-800 font-semibold text-[12px] border-b ">
                        COST SHEET
                      </h1>
                      <div className="border rounded-md">
                        <table className="w-[100%]">
                          <thead>
                            <tr className="h-8 mb-1 border-none w-[100%] bg-[#318b96] text-white ">
                              <th className="min-w-[35%] px-2  text-[10px] text-left  tracking-wide  ">
                                Particulars
                              </th>
                              <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide">
                                Rate/Sqm
                              </th>
                              <th
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 text-[10px] text-right  tracking-wide `}
                              >
                                Sale Value
                              </th>
                              <th
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                }  w-[15%] px-2 text-[10px] text-right  tracking-wide `}
                              >
                                GST
                              </th>
                              <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide ">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {' '}
                            {/* {costSheetA?.map((d1, inx) => (
                              <tr key={inx} className="py-1 my-2 h-[24px]">
                                <th className="w-[40%] px-2 text-[11px] text-left text-gray-700  ">
                                  {d1?.component?.label}
                                </th>
                                <td className="w-[15%]  px-2 text-[12px] text-right text-gray-700 ">
                                  <TextFieldFlat
                                    label=""
                                    className="w-[100%] text-[12px] text-right text-gray-800 border  border-black"
                                    name="ratePerSqft"
                                    onChange={(e) => {
                                      // setNewSqftPrice(e.target.value)

                                      formik.setFieldValue(
                                        'unit_cost_charges',
                                        e.target.value
                                      )
                                      setNewSqftPrice(Number(e.target.value))
                                      changeOverallCostFun(
                                        inx,
                                        d1,
                                        e.target.value
                                      )
                                    }}
                                    // value={formik.values[`unit_cost_charges`]}
                                    value={d1?.charges}
                                    // value={newSqftPrice}
                                    // type="number"
                                  />
                                  <TextFieldFlat
                                    className=" hidden  "
                                    label=""
                                    name={d1?.component?.value}
                                    type="number"
                                  />
                                </td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 text-[12px] text-right text-gray-700 `}
                                >
                                  {d1?.TotalSaleValue?.toLocaleString('en-IN')}
                                </td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 text-[12px] text-right text-gray-700 `}
                                >
                                  {d1?.gst?.value?.toLocaleString('en-IN')}
                                </td>
                                <td className="w-[15%] px-2 text-[12px] text-right text-gray-800 ">
                                  {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                    'en-IN'
                                  )}
                                </td>
                              </tr>
                            ))} */}
                            <tr className=" border-[#fab56c]  bg-[#e3fcff]">
                              <th className="w-[40%] text-[12px] text-left text-gray-600 pl-2 ">
                                Total (A)
                              </th>
                              <td className="w-[15%] px-2 font-bold text-[12px] text-right text-gray-800 ">
                                {costSheetA
                                  ?.reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.charges),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                              >
                                {costSheetA
                                  ?.reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.TotalSaleValue),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                              >
                                {costSheetA
                                  ?.reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.gst?.value),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td className="w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 ">
                                {partATotal?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="w-full mt-1">
                          {/* <thead>
                            {' '}
                            <tr className=" h-6  border-b-[0.2px] border-gray-300">
                              <th className="w-[50%] text-[12px] text-left text-gray-700 text-[#8993a4] tracking-wide uppercase ">
                                Particulars
                              </th>
                              <th className="w-[35%] text-[12px] text-left text-gray-700 text-[#8993a4] tracking-wide uppercase ">
                                Timeline
                              </th>
                              <th className="w-[15%] text-[12px] text-right text-gray-700  text-[#8993a4] tracking-wide uppercase">
                                Total Inc GST
                              </th>
                            </tr>
                          </thead> */}
                          <tbody>
                            {partBPayload?.map((d1, inx) => (
                              <tr key={inx} className="h-[22px]">
                                <th className=" text-[12px] px-2 text-left text-gray-700 ">
                                  {d1?.component?.label} (0.05% Plor Sale value)
                                </th>
                                <td className="text-[12px] px-2 text-left text-gray-700 ">
                                  {d1?.description}
                                </td>
                                <td className="text-[12px] px-2 text-right text-gray-700 ">
                                  {/* {Number(d1?.charges)?.toLocaleString('en-IN')} */}
                                  {Number(
                                    computeTotal(
                                      d1,
                                      selUnitDetails?.super_built_up_area||
                                      selUnitDetails?.area?.toString()?.replace(',', '')
                                    )
                                  )?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                            <tr className=" h-[22px]">
                              <th className="text-[12px] px-2 text-left text-gray-700 ">
                                Total (B)
                              </th>
                              <td className="text-[12px] px-2 text-right text-gray-400 "></td>
                              <td className="text-[12px] px-2 text-right text-gray-800 font-bold ">
                                {partBTotal?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <section className="flex flex-row justify-between  bg-[#318b96]  ">
                          <h1 className="px-2  text-[12px] text-left text-white text-[12px] pt-[3px] font-bold ">
                            Total Plot Sale Value(A+B)
                          </h1>
                          <section className=" px-2 d-md  text-white ">
                            {netTotal?.toLocaleString('en-IN')}
                          </section>
                        </section>
                      </div>
                      <div className=" mt-4 ">
                        <h1 className="text-bodyLato text-center text-gray-800 font-semibold text-[12px] border-b border-gray">
                          PAYMENT SCHEDULE
                        </h1>
                        <table className="w-full border-x border-black">
                          <thead className="">
                            {' '}
                            <tr className=" h-8  border-none bg-[#318b96] text-white ">
                              <th className="w-[50%] px-2   text-left  tracking-wide uppercase d-xsm text-white ">
                                Particulars
                              </th>
                              <th className="w-[30%] px-2   text-left  tracking-wide uppercase d-xsm text-white">
                                Payment Timeline
                              </th>
                              <th className="w-[20%] px-2   text-right  tracking-wide uppercase d-xsm text-white">
                                Total inc GST
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {/* {newPlotPS?.map((d1, inx) => (
                              <tr
                                key={inx}
                                className="border-b-[0.05px] border-gray-300"
                              >
                                <th className=" px-2  text-[12px] text-left text-gray-700 ">
                                  {d1?.stage?.label}
                                </th>
                                <td className="text-[12px] px-2  text-left text-gray-700 ">
                                  {d1?.description}
                                </td>
                                <td className="text-[12px] px-2  text-right text-gray-800 ">
                                  {d1?.value?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))} */}

                            <tr className="border-b-[0.05px] border-black">
                              <th className="text-[12px] px-2  text-left text-gray-800 ">
                                Plot Value Total Rs.:
                              </th>
                              <td className="text-[12px] px-2  text-right text-gray-400 "></td>
                              <th className="text-[12px] px-2  text-right text-gray-800 ">
                                {netTotal?.toLocaleString('en-IN')}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* end of paper */}
                </div>
              </div>
            )}
          </Formik>
        </div>
      )}
    </div>
  )
}

export default CSBody
