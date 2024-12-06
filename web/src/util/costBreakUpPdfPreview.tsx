import { useState, useEffect, createRef } from 'react'
import { PDFExport } from '@progress/kendo-react-pdf'
import { Timestamp } from 'firebase/firestore'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CrmUnitHeader from 'src/components/A_CrmModule/CrmUnitHeader'
import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from './computeCsTotals'
import { TextFieldFlat } from './formFields/TextFieldFlatType'

import '../styles/myStyles.css'

const CostBreakUpPdfPreview = ({
  csMode,
  costSheetA,
  headerContent,
  leadDetailsObj1,
  projectDetails,
  pdfExportComponent,
  selPhaseObj,
  selUnitDetails,
  newPlotPS,
  setNewPlotCsObj,
  setCostSheetA,
  setNewPS,
  showGstCol,
  partATotal,
  partBTotal,
  netTotal
}) => {
  const { user } = useAuth()
  const ref = createRef()

  useEffect(() => {
    console.log('sel unti detials ', selUnitDetails)
  }, [])
  const [initialValuesA, setInitialValuesA] = useState({})

  const [newSqftPrice, setNewSqftPrice] = useState(0)

  const [netTotal_new, setNetTotal] = useState(0)
  const [partATotalNew, setPartATotal] = useState(0)
  const [partBTotal_new, setPartBTotal] = useState(0)
  const [plotBookingAdv, setPlotBookingAdv] = useState(0)
  const [partBPayload, setPartBPayload] = useState([])
  const [psPayload, setPSPayload] = useState([])

  const { unit_no, katha_no, plc_per_sqft, sqft_rate, area } = selUnitDetails

  useEffect(() => {
    setTotalFun()
  }, [costSheetA, selPhaseObj])

  useEffect(() => {
    // setNewPlotCsObj(costSheetA)
  }, [newSqftPrice])
  useEffect(() => {
   console.log('first', costSheetA)
  }, [])


  useEffect(() => {
    const {
      additonalChargesObj,
      ConstructOtherChargesObj,
      ConstructPayScheduleObj,
      paymentScheduleObj,
    } = selPhaseObj
    const { uid } = selUnitDetails
    const y = leadDetailsObj1[`${uid}_cs`]?.newSqftPrice || sqft_rate
    const z = leadDetailsObj1[`${uid}_cs`]?.newPLC || plc_per_sqft

    const plotTotalSaleValue = Number.isFinite(y)
      ? Number(selUnitDetails?.area * y)
      : Number(selUnitDetails?.area * selUnitDetails?.rate_per_sqft)

    const plot_gstValue = Math.round(plotTotalSaleValue) * 0.05

    let x = []
    if (csMode === 'plot_cs') {
      setPartBPayload(additonalChargesObj)
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
          others: selUnitDetails?.rate_per_sqft || sqft_rate,
          charges: sqft_rate,
          TotalSaleValue: plotTotalSaleValue,
          gst: {
            label: '0.05',
            value: plot_gstValue,
          },
          TotalNetSaleValueGsT: plotTotalSaleValue + plot_gstValue,
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
          charges: Number.isFinite(z) ? z : selUnitDetails?.plc || plc_per_sqft,
          TotalSaleValue: Math.round(
            selUnitDetails?.super_built_up_area ||
              area * (selUnitDetails?.plc || plc_per_sqft)
          ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Math.round(
              Number(
                selUnitDetails?.super_built_up_area ||
                  area * (selUnitDetails?.plc || 200)
              ) * 0.05
            ),
          },
          TotalNetSaleValueGsT:
            Math.round(
              selUnitDetails?.super_built_up_area ||
                area * (selUnitDetails?.plc || 200)
            ) +
            Math.round(
              Number(
                selUnitDetails?.super_built_up_area ||
                  area * (selUnitDetails?.plc || 200)
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
      ]
    }
    // const x = costSheetA
    let merged = []
    try {
      if (leadDetailsObj1) {
        if (leadDetailsObj1[`${uid}_cs`]['costSheetA']) {
          const removeFulCostFieldA = leadDetailsObj1[`${uid}_cs`][
            'costSheetA'
          ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
          merged = [...x, ...removeFulCostFieldA]
        } else {
          merged = [...x, ...additonalChargesObj]
        }
      }
    } catch (error) {
      console.log('error at feching the leadDetails Obj')
      merged = [...x, ...additonalChargesObj]
    }

    const initformValues = {}
    merged.map((d) => {
      const x = d['component']['value']
      initformValues[`${x}`] = d?.charges
    })
    setInitialValuesA(initformValues)

    // setCostSheetA(x)
  }, [selPhaseObj, leadDetailsObj1, csMode])

  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [])
  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [netTotal, plotBookingAdv, csMode])

  const CreateNewPsFun = (netTotal, plotBookingAdv, csMode) => {
    console.log('was this executed', newPlotPS)
    const newPs = psPayload.map((d1) => {
      const z = d1
      // if (csMode === 'plot_cs') {
      if (csMode === 'plot_cs') {

        z.value = ['on_booking'].includes(d1?.stage?.value)
          ? Number(d1?.percentage)
          : Math.round((netTotal - plotBookingAdv) * (d1?.percentage / 100))
        if (['on_booking'].includes(d1?.stage?.value)) {
          z.elgible = true
          z.elgFrom = Timestamp.now().toMillis()
          return z
        }
        z.oldDate= Timestamp.now().toMillis()
        z.schDate= Timestamp.now().toMillis()


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
  const validate = Yup.object({})

  const setTotalFun = async () => {
    const partBTotal = selPhaseObj?.additonalChargesObj.reduce(
      (partialSum, obj) =>
        partialSum +
        Number(computeTotal(obj, selUnitDetails?.super_built_up_area)),
      0
    )

    const partATotal = costSheetA.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    // setPartBTotal(partBTotal)
    // setPartATotal(partATotal)
    // setNetTotal(partATotal + partBTotal)
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
    const gstTaxForProjA = selPhaseObj?.partATaxObj.filter((d)=> d?.component.value === 'sqft_cost_tax')
    const gstTaxIs = gstTaxForProjA.length >0 ? gstTaxForProjA[0]?.gst?.value: 0
    const plcGstForProjA = selPhaseObj?.partATaxObj.filter((d)=> d?.component.value === 'plc_tax')
    const plcGstIs = plcGstForProjA.length >0 ? plcGstForProjA[0]?.gst?.value: 0

    if (csMode === 'plot_cs') {
      total = Math.round(selUnitDetails?.area * newValue)
      gstTotal = Math.round(total * gstTaxIs)
    } else {
      total = Math.round(selUnitDetails?.super_built_up_area * newValue)
      gstTotal = Math.round(
        Number(selUnitDetails?.super_built_up_area * newValue) * gstTaxIs
      )
    }

    y[inx].charges = newValue
    y[inx].TotalSaleValue = total
    y[inx].gst.label = gstTaxIs
    y[inx].gst.value = gstTotal
    y[inx].TotalNetSaleValueGsT = total + gstTotal

    setCostSheetA(y)
    setTotalFun()
  }
  return (
    <div>
      <div
      // style={{
      //   position: 'absolute',
      //   left: '-1000px',
      //   top: 0,
      // }}
      //
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialState}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, resetForm)
          }}
        >
          {(formik) => (
            <PDFExport
              paperSize="A4"
              margin="0.5cm"
              fileName={`${unit_no}_${leadDetailsObj1?.Name}_Nirvana`}
              ref={pdfExportComponent}
            >
              <div className="px-4 bg-white">
                <div>
                  {/* upper part */}
                  <CrmUnitHeader projectDetails={projectDetails} />

                  <div className="flex flex-row justify-between my-4 border border-gray">
                    <div className="p-[8px]">
                      <h1 className="font-semibold  text-gray-800 text-[8px] mb-[2px]">
                        Addressed To
                      </h1>
                      <p className="font-playfair font-semibold  text-gray-600 text-[9px]">
                        {leadDetailsObj1?.Name}
                      </p>
                      <p className="font-playfair  text-gray-600 text-[9px]">
                        {leadDetailsObj1?.Mobile}
                      </p>
                      <p className="font-playfair  text-gray-800 text-[9px] max-w-[140px]">
                        29, 1st Floor, 5th Main, KG Road, Kaveri Nagar, BSK 3rd
                        Stage, Bangelore-560085
                      </p>
                    </div>

                    <div className=" w-[194px] justify-start">
                      <div className="p-[8px] border-l border-gray">
                        <div className="flex flex-row justify-between">
                          <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
                            Plot No
                          </h1>
                          <p className="text-bodyLato font-bold text-right text-gray-800 text-[8px]">
                            {unit_no}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
                            Plot Area
                          </h1>
                          <p className="text-bodyLato font-bold text-right text-gray-800 text-[8px]">
                            {area}{' '}
                            <span className="text-xs text-gray-800 text-[6px]">
                              sqft
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
                            Total Amount
                          </h1>
                          <p className="text-bodyLato font-bold text-right text-gray-800 text-[8px]">
                            Rs. {netTotal?.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <h1 className=" font-semibold  text-gray-800 text-[8px] ">
                            Issued By
                          </h1>
                          <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                            {leadDetailsObj1?.assignedToObj?.name}
                          </p>
                          <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                            Maa Homes LLP
                          </p>
                          <p className="font-playfair  text-gray-800 text-[8px]">
                            Sector-2,HSR Layout, Banglore,India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="">
                      <h1 className="text-bodyLato text-center text-gray-800 font-semibold text-[8px] border-b border-gray">
                        COST SHEET
                      </h1>
                      <div className="border border-black">
                        <table className="w-[100%]">
                          <thead>
                            <tr className="h-1 mb-1 border-none w-[100%] bg-[#318b96] text-white">
                              <th className="min-w-[35%] px-2  text-[8px] text-left  tracking-wide ">
                                Particulars
                              </th>
                              <th className="w-[15%] px-2 text-[8px] text-right  tracking-wide ">
                                Rate/Sqm
                              </th>
                              <th
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 text-[8px] text-right  tracking-wide`}
                              >
                                Sale Value
                              </th>
                              <th
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                }  w-[15%] px-2 text-[8px] text-right  tracking-wide`}
                              >
                                GST
                              </th>
                              <th className="w-[15%] px-2 text-[8px] text-right  tracking-wide  ">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {' '}
                            {costSheetA?.map((d1, inx) => (
                              <tr key={inx} className="py-1 mt-1 h-[22px]">
                                <th className="w-[40%] px-2 text-[8px] text-left text-gray-700  ">
                                  {d1?.component?.label}
                                </th>
                                <td className="w-[15%] px-2 text-[8px] text-right text-gray-700 ">
                                  <TextFieldFlat
                                    label=""
                                    className="w-[100%] text-[8px] text-right text-gray-800"
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
                                      // formik.setFieldValue(
                                      //   'ratePerSqft',
                                      //   e.target.value
                                      // )
                                      // console.log(
                                      //   'what is =it',
                                      //   value.value
                                      // )
                                      // formik.setFieldValue(
                                      //   `${d1?.component?.value}`,
                                      //   value
                                      // )
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
                                    // onChange={(value) => {
                                    //   console.log('what is =it', value.value)
                                    //   formik.setFieldValue(
                                    //     `${d1?.component?.value}`,
                                    //     value
                                    //   )
                                    // }}
                                    // value={
                                    //   formik.values[`${d1?.component?.value}`]
                                    // }
                                    // value={d1?.charges}
                                    type="number"
                                  />
                                </td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 text-[8px] text-right text-gray-700 `}
                                >
                                  {d1?.TotalSaleValue?.toLocaleString('en-IN')}
                                </td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 text-[8px] text-right text-gray-700 `}
                                >
                                  {d1?.gst?.value?.toLocaleString('en-IN')}
                                </td>
                                <td className="w-[15%] px-2 text-[8px] text-right text-gray-800 ">
                                  {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                    'en-IN'
                                  )}
                                </td>
                              </tr>
                            ))}
                            <tr className=" border-[#fab56c]  bg-[#e3fcff]">
                              <th className="w-[40%] text-[8px] text-left text-gray-600 pl-2 ">
                                Total (A)
                              </th>
                              <td className="w-[15%] px-2 font-bold text-[8px] text-right text-gray-800 ">
                                {costSheetA
                                  .reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.charges),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 font-bold  text-[8px] text-right text-gray-800 `}
                              >
                                {costSheetA
                                  .reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.TotalSaleValue),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td
                                className={`${
                                  !showGstCol ? 'hidden' : ''
                                } w-[15%] px-2 font-bold  text-[8px] text-right text-gray-800 `}
                              >
                                {costSheetA
                                  .reduce(
                                    (partialSum, obj) =>
                                      partialSum + Number(obj?.gst?.value),
                                    0
                                  )
                                  ?.toLocaleString('en-IN')}
                              </td>
                              <td className="w-[15%] px-2 font-bold  text-[8px] text-right text-gray-800 ">
                                {partATotal?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="w-full mt-1">
                          {/* <thead>
                            {' '}
                            <tr className=" h-6  border-b-[0.2px] border-gray-300">
                              <th className="w-[50%] text-[8px] text-left text-gray-700 text-[#8993a4] tracking-wide uppercase ">
                                Particulars
                              </th>
                              <th className="w-[35%] text-[8px] text-left text-gray-700 text-[#8993a4] tracking-wide uppercase ">
                                Timeline
                              </th>
                              <th className="w-[15%] text-[8px] text-right text-gray-700  text-[#8993a4] tracking-wide uppercase">
                                Total Inc GST
                              </th>
                            </tr>
                          </thead> */}
                          <tbody>
                            {partBPayload?.map((d1, inx) => (
                              <tr key={inx} className="h-[22px]">
                                <th className=" text-[8px] px-2 text-left text-gray-700 ">
                                  {d1?.component?.label} (0.05% Plor Sale value)
                                </th>
                                <td className="text-[8px] px-2 text-left text-gray-700 ">
                                  {d1?.description}
                                </td>
                                <td className="text-[8px] px-2 text-right text-gray-700 ">
                                  {/* {Number(d1?.charges)?.toLocaleString('en-IN')} */}
                                  {Number(
                                    computeTotal(
                                      d1,
                                      selUnitDetails?.super_built_up_area
                                    )
                                  )?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                            <tr className=" h-[22px]">
                              <th className="text-[8px] px-2 text-left text-gray-700 ">
                                Total (B)
                              </th>
                              <td className="text-[8px] px-2 text-right text-gray-400 "></td>
                              <td className="text-[8px] px-2 text-right text-gray-800 font-bold ">
                                {partBTotal?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <section className="flex flex-row justify-between  bg-[#318b96]  ">
                          <h1 className="px-2  text-[8px] text-left text-white text-[8px] pt-[3px] font-bold ">
                            Total Plot Sale Value(A+B)
                          </h1>
                          <section className=" px-2 d-md  text-white ">
                            {netTotal?.toLocaleString('en-IN')}
                          </section>
                        </section>
                      </div>
                      <div className=" mt-4 ">
                        <h1 className="text-bodyLato text-center text-gray-800 font-semibold text-[8px] border-b border-gray">
                          PAYMENT SCHEDULE
                        </h1>
                        <table className="w-full border-x border-black">
                          <thead className="">
                            {' '}
                            <tr className="border-none bg-[#318b96] text-white ">
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
                            {newPlotPS?.map((d1, inx) => (
                              <tr
                                key={inx}
                                className="border-b-[0.05px] border-gray-300"
                              >
                                <th className=" px-2  text-[8px] text-left text-gray-700 ">
                                  {d1?.stage?.label}
                                </th>
                                <td className="text-[8px] px-2  text-left text-gray-700 ">
                                  {d1?.description}
                                </td>
                                <td className="text-[8px] px-2  text-right text-gray-800 ">
                                  {d1?.value?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}

                            <tr className="border-b-[0.05px] border-black">
                              <th className="text-[8px] px-2  text-left text-gray-800 ">
                                Plot Value Total Rs.:
                              </th>
                              <td className="text-[8px] px-2  text-right text-gray-400 "></td>
                              <th className="text-[8px] px-2  text-right text-gray-800 ">
                                {netTotal?.toLocaleString('en-IN')}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h1 className=" mt-10 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * Registration & Stamp Duty charges and any taxes apart
                      from GST are to be paid based on the prevailing
                      guidelines.
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * GST are calculated as per current norms & the same may
                      change as per government guidlines. Presently @ 5% on
                      Construction Cost and 18% on Other Charges (Amenities)
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * As per Income Tax rules, please deduct TDS as applicable
                      from all the payments made towards your unit(including the
                      PDCs). If your bank disburses the full smount, then you
                      will have to pay the TDS seperately
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * Provide us the duly signed Form 16B to pass the credit
                      for TDS amount.
                    </h1>
                  </div>
                  {/* end of paper */}
                </div>
                <div className="flex flex-col mt-2 p-4 ">
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                    {/* <Pdf targetRef={ref} filename="post.pdf">
                              {({ toPdf }) => (
                                <button
                                  onClick={toPdf}
                                  type="button"
                                  className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                >
                                  {' '}
                                  Download{' '}
                                </button>
                              )}
                            </Pdf> */}
                    <button
                      className="mb-2 md:mb-0  hover:scale-110 focus:outline-none              hover:bg-[#5671fc]
                                  bg-[#5671fc]
                                  text-teal-100
                                  border duration-200 ease-in-out
                                  border-[#5671fc] transition
                                   px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
                      type="submit"
                      // disabled={loading}
                      // onClick={() => submitFormFun(formik)}
                    >
                      {/* {loading && <Loader />} */}
                      Save & Close
                    </button>
                    <button
                      onClick={() => {
                        if (
                          pdfExportComponent.current &&
                          csMode === 'plot_cs'
                        ) {
                          pdfExportComponent.current.save()
                        } else if (
                          // pdfExportComponentConstruct.current &&
                          csMode != 'plot_cs'
                        ) {
                          // pdfExportComponentConstruct.current.save()
                        }
                      }}
                      type="button"
                      className="mb-4 md:mb-0 hover:scale-110 focus:outline-none bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100         hover:bg-teal-200
                                  bg-teal-100
                                  text-teal-700
                                  border duration-200 ease-in-out
                                  border-[#5671fc] transition"
                    >
                      {' '}
                      Download{' '}
                    </button>

                    <button
                      onClick={() => {
                        // setisImportLeadsOpen(true)
                        // dialogOpen(false)
                      }}
                      type="button"
                      className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                    >
                      {' '}
                      WhatsApp to customer{' '}
                    </button>
                  </div>
                </div>
              </div>
            </PDFExport>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CostBreakUpPdfPreview
