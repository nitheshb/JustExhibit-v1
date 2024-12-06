import { useState, useEffect, createRef } from 'react'
import { PDFExport } from '@progress/kendo-react-pdf'
import { Timestamp } from 'firebase/firestore'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { updateLeadCostSheetDetailsTo } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'src/styles/myStyles.css'
import CostBreakUpPdfPreview from 'src/util/costBreakUpPdfPreview'
import { prettyDate } from 'src/util/dateConverter'

const BookingSummaryView = ({
  projectDetails,
  csMode,
  myBookingPayload,
  setMyBookingPayload,
  customerInfo,
  costSheet,
  pdfExportComponent,
  selPhaseObj,
  selUnitDetails,
  leadDetailsObj1,
  setNewPlotCsObj,
  newPlotCsObj,
  costSheetA,
  constructCostSheetA,
  newAdditonalChargesObj,
  newAdditonalConstChargesObj,
  setCostSheetA,
  setAddiChargesObj,
  setNewAdditonalConstChargesObj,
  setNewPS,
  newPlotPS,
  newConstructPS,

  newPlotCostSheetA,
  setNewPlotCostSheetA,
  setNewPlotPS,
  netTotal,
  setNetTotal,
  partATotal,
  partBTotal,
  partCTotal,
  partDTotal,
  setPartATotal,
  setPartBTotal,
  setPartCTotal,
  setPartDTotal,
  showOnly,
  section1Ref,
  section2Ref,
  section3Ref,
  section4Ref,
  stepIndx,
  StatusListA,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const ref = createRef()

  useEffect(() => {
    console.log('sel unti detials ', selUnitDetails)
    console.log('my imported details is  ', customerInfo)
    console.log('my imported details is CS  ', costSheet)
    console.log('my imported details is CS  ', costSheetA)
  }, [])
  const [initialValuesA, setInitialValuesA] = useState({})

  const [newSqftPrice, setNewSqftPrice] = useState(0)

  const [plotBookingAdv, setPlotBookingAdv] = useState(0)
  const [partBPayload, setPartBPayload] = useState([])
  const [psPayload, setPSPayload] = useState([])
  const [pdfPreview, setpdfPreview] = useState(false)
  const [showGstCol, setShowGstCol] = useState(true)

  useEffect(() => {
    console.log('gen costSheetA', costSheetA, customerInfo)

    setTotalFun()
  }, [costSheetA, selPhaseObj])

  useEffect(() => {
    console.log('what is this ', costSheetA)
    setNewPlotCsObj(costSheetA)
  }, [newSqftPrice])

  useEffect(() => {
    const {
      additonalChargesObj,
      constructOtherChargesObj,
      ConstructOtherChargesObj,
      ConstructPayScheduleObj,
      paymentScheduleObj,
    } = selPhaseObj
    const { uid } = selUnitDetails
    const y =
      leadDetailsObj1[`${uid}_cs`]?.newSqftPrice || selUnitDetails?.sqft_rate
    const z =
      leadDetailsObj1[`${uid}_cs`]?.newPLC || selUnitDetails?.plc_per_sqft

    const plotSaleValue = Number.isFinite(y)
      ? Number(
          selUnitDetails?.selUnitDetails?.area?.toString()?.replace(',', '') * y
        )
      : Number(
          selUnitDetails?.area?.toString()?.replace(',', '') *
            (selUnitDetails?.rate_per_sqft || selUnitDetails?.sqft_rate)
        )
    const plcSaleValue = Math.round(
      selUnitDetails?.super_built_up_area ||
        selUnitDetails?.area?.toString()?.replace(',', '') *
          (selUnitDetails?.plc || selUnitDetails?.plc_per_sqft)
    )
    const gstTaxForProjA = selPhaseObj?.partATaxObj?.filter(
      (d) => d?.component.value === 'sqft_cost_tax'
    )
    const gstTaxIs =
      gstTaxForProjA?.length > 0 ? gstTaxForProjA[0]?.gst?.value : 0
    const plcGstForProjA = selPhaseObj?.partATaxObj?.filter(
      (d) => d?.component.value === 'plc_tax'
    )
    const plcGstIs =
      plcGstForProjA?.length > 0 ? plcGstForProjA[0]?.gst?.value : 0
    const plot_gstValue = Math.round(plotSaleValue) * gstTaxIs
    const plc_gstValue = Math.round(plcSaleValue * plcGstIs)
    console.log(
      'gen costSheetA values are ',
      Number.isFinite(y),
      y,
      selUnitDetails?.selUnitDetails?.area?.toString()?.replace(',', ''),
      selUnitDetails?.rate_per_sqft,
      selUnitDetails
    )
    let x = []
    // if (csMode === 'plot_cs') {
    if ('plot_cs' === 'plot_cs') {
      additonalChargesObj?.map((data, inx) => {
        let total = 0
        let gstTotal = 0
        const isChargedPerSqft = data?.units?.value === 'costpersqft'
        // const gstTaxIs =
        //   gstTaxForProjA.length > 0 ? gstTaxForProjA[0]?.gst?.value : 0
        const gstPercent =
          Number(data?.gst?.value) > 1
            ? data?.gst?.value * 0.01
            : data?.gst?.value
        total = isChargedPerSqft
          ? Number(
              selUnitDetails?.super_built_up_area ||
                selUnitDetails?.area.toString()?.replace(',', '')
            ) * Number(data?.charges)
          : Number(data?.charges)

        gstTotal = Math.round(total * gstPercent)

        console.log('myvalue is ', data)
        data.TotalSaleValue = total
        data.gst.label = gstTaxIs
        // data.gst.value = gstTotal
        data.gstValue = gstTotal
        data.TotalNetSaleValueGsT = total + gstTotal
        return data
      })
      console.log('mytest',ConstructOtherChargesObj, constructOtherChargesObj, selPhaseObj )
      setPartBPayload(additonalChargesObj)
      setAddiChargesObj(additonalChargesObj)
      setNewAdditonalConstChargesObj(constructOtherChargesObj)
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
          charges: selUnitDetails?.sqft_rate,
          TotalSaleValue: plotSaleValue,
          gstValue: plot_gstValue,
          gst: {
            label: '0.05',
            value: gstTaxIs,
          },
          TotalNetSaleValueGsT: plotSaleValue + plot_gstValue,
        },
        {
          myId: '2',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'plc_cost_sqft',
            label: 'PLC',
          },
          others: selUnitDetails?.plc || 200,
          charges: Number.isFinite(z)
            ? z
            : selUnitDetails?.plc || selUnitDetails?.plc_per_sqft,
          TotalSaleValue: plcSaleValue,
          // charges: y,
          gstValue: plc_gstValue,
          gst: {
            label: '0.05',
            value: plcGstIs,
          },
          TotalNetSaleValueGsT: plcSaleValue + plc_gstValue,
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
      if (leadDetailsObj1) {
        if (additonalChargesObj) {
          if (leadDetailsObj1[`${uid}_cs`]['costSheetA']) {
            const removeFulCostFieldA = leadDetailsObj1[`${uid}_cs`][
              'costSheetA'
            ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
            merged = [...x, ...removeFulCostFieldA]
          } else {
            merged = [...x, ...additonalChargesObj]
          }
        } else {
          merged = [...x]
        }
      }
    } catch (error) {
      console.log('error at feching the leadDetails Obj')
      console.log('gen costSheetA', x)
      merged = [...x, ...additonalChargesObj]
    }

    const initformValues = {}
    merged.map((d) => {
      const x = d['component']['value']
      initformValues[`${x}`] = d?.charges
    })
    setInitialValuesA(initformValues)
    console.log('gen costSheetA', x)
    // setCostSheetA(x)
  }, [selPhaseObj, leadDetailsObj1, csMode])

  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [])
  useEffect(() => {
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  }, [netTotal, plotBookingAdv, csMode])

  const CreateNewPsFun = (netTotal, plotBookingAdv, csMode) => {
    const newPs = psPayload.map((d1) => {
      const z = d1
      // if (csMode === 'plot_cs') {
      if ('plot_cs' === 'plot_cs') {
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
    // const partBTotal = selPhaseObj?.additonalChargesObj?.reduce(
    //   (partialSum, obj) =>
    //     partialSum +
    //     Number(
    //       computeTotal(
    //         obj,
    //         selUnitDetails?.super_built_up_area ||
    //           selUnitDetails?.area?.toString()?.replace(',', '')
    //       )
    //     ),
    //   0
    // )

    const partATotal = costSheetA.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    const partBTotal = newAdditonalChargesObj.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    const partCTotal = constructCostSheetA.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    const partDTotal = newAdditonalConstChargesObj.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )

    setPartBTotal(partBTotal)
    setPartATotal(partATotal)
    setPartCTotal(partCTotal)
    setPartDTotal(partDTotal)
    setNetTotal(partATotal + partBTotal +partCTotal + partDTotal)
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
      soldPrice: Number(selUnitDetails?.sqft_rate),
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
    const gstTaxForProjA = selPhaseObj?.partATaxObj.filter(
      (d) => d?.component.value === 'sqft_cost_tax'
    )
    const gstTaxIs =
      gstTaxForProjA.length > 0 ? gstTaxForProjA[0]?.gst?.value : 0
    const plcGstForProjA = selPhaseObj?.partATaxObj.filter(
      (d) => d?.component.value === 'plc_tax'
    )
    if (csMode === 'plot_cs') {
      total = Math.round(selUnitDetails?.area.replace(',', '') * newValue)
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
    console.log('gen costSheetA', y)
    console.log(costSheetA)

    // setCostSheetA(y)
    setTotalFun()
  }
  return (
    <div
      className=" overflow-y-scroll no-scrollbar"
      style={{ height: `calc(100vh - 120px)` }}
    >
      {!pdfPreview && (
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={initialState}
            validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
              console.log('new value is ', resetForm)
              onSubmit(values, resetForm)
            }}
          >
            {(formik) => (
              <PDFExport
                paperSize="A4"
                margin="0.5cm"
                fileName={`${selUnitDetails?.unit_no}_${leadDetailsObj1?.Name}_Nirvana`}
                ref={pdfExportComponent}
              >
                {' '}
                <div>
                  <section
                    className="w-full flex flex-col  p-4 rounded-md   bg-[#fff]"
                    style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                  >
                    {/* section-1 */}

                    <article className="mb-6" ref={section1Ref} id="section1">
                      <div className="w-full  flex flex-row justify-between ">
                        {/* col-1 */}
                        <section className="flex flex-row justify-between w-48">
                          <div></div>

                          <div className="border rounded-lg shadow-lg w-full">
                            <section className="flex flex-row justify-between mt-2   ">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-semibold ">
                                Unit Owner {newAdditonalConstChargesObj?.length}
                              </h1>
                            </section>
                            <section className="flex flex-col  mt-2 mb-2">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                {customerInfo?.customerDetailsObj
                                  ?.customerName1 || 'NA'}
                              </h1>
                              <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                              {customerInfo?.customerDetailsObj
                                    ?.relation1?.label || ''}{' '}
                                {customerInfo?.customerDetailsObj?.co_Name1 ||
                                  'NA'}
                              </span>
                              <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                {customerInfo?.customerDetailsObj?.address1}
                              </span>
                              <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                {customerInfo?.customerDetailsObj?.phoneNo1}
                              </span>
                              <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                {customerInfo?.customerDetailsObj?.email1}
                              </span>
                            </section>
                          </div>
                        </section>
                        {/* col-2 */}

                        {
                          <section className="flex flex-row justify-between w-48 mx-2">
                            <div></div>

                            <div className="border rounded-lg shadow-lg w-full">
                              <section className="flex flex-row justify-between mt-2   ">
                                <h1 className="px-3 text-[12px] text-left  text-[12px] font-semibold ">
                                  Secondary Owner
                                </h1>
                              </section>
                              <section className="flex flex-col  mt-2 mb-2">
                                <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                  {customerInfo?.secondaryCustomerDetailsObj
                                    ?.customerName2 || 'NA'}
                                </h1>
                                <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                {customerInfo?.secondaryCustomerDetailsObj
                                    ?.relation2?.label || ''}{' '}
                                  {customerInfo?.secondaryCustomerDetailsObj
                                    ?.co_Name2 || 'NA'}
                                </span>
                                <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                  {
                                    customerInfo?.secondaryCustomerDetailsObj
                                      ?.address2
                                  }
                                </span>
                                <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                  {
                                    customerInfo?.secondaryCustomerDetailsObj
                                      ?.phoneNo2
                                  }
                                </span>
                                <span className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                  {
                                    customerInfo?.secondaryCustomerDetailsObj
                                      ?.email2
                                  }
                                </span>
                              </section>
                            </div>
                          </section>
                        }
                        {/* col-3 */}

                        <section className="flex flex-row justify-between w-2/4">
                          <div></div>

                          <div className="border rounded-lg shadow-lg w-full">
                            <section className="flex flex-row mt-2 px-2  ">
                              <div className="bg-violet-100   items-center rounded-2xl shadow-xs flex flex-col px-2 py-1 ">
                                <div className="font-semibold text-[#053219]  text-[22px]  mb-[1] tracking-wide">
                                  {selUnitDetails?.unit_no}
                                </div>
                                <div
                                  className={`items-center h-6 whitespace-nowrap  text-xs font-semibold text-gray-500  rounded-full
                                  `}
                                >
                                  Stall No
                                </div>
                              </div>
                              <article className="flex flex-col ml-2 w-full ">
                                <section className="flex flex-row ml-2 justify-between w-full">
                                  <div className="flex flex-col justify-center w-full">
                                    <div className="self-stretch justify-center items-center  inline-flex">
                                      <div className="text-zinc-800 text-[10px]  font-bold font-['Lato'] tracking-wide">
                                        {selUnitDetails?.area} sqft
                                      </div>
                                    </div>
                                    <span className="  text-[12px] text-left  justify-center items-center text-[12px] font-normal font-['Lato'] flex">
                                      Area:
                                    </span>
                                  </div>

                                  <div className="flex flex-col justify-center items-center w-full">
                                    <div className="self-stretch justify-center items-center gap-3 inline-flex">
                                      <div className="text-zinc-800 text-[10px]  font-bold font-['Lato'] tracking-wide">
                                        {selUnitDetails?.facing}
                                      </div>
                                    </div>
                                    <span className="  text-[12px] text-left  text-[12px] font-normal font-['Lato']">
                                      Facing:
                                    </span>
                                  </div>

                                  <div className="flex flex-col justify-center items-center w-full">
                                    <div className="self-stretch justify-center items-center gap-3 inline-flex">
                                      <div className="text-zinc-800 text-[10px] ml-1 font-bold font-['Lato'] tracking-wide">
                                        {selUnitDetails?.size}
                                      </div>
                                    </div>
                                    <span className="  text-[12px] text-left justify-center items-center  text-[12px] font-normal font-['Lato']">
                                      Size
                                    </span>
                                  </div>
                                </section>
                                {['Villas', 'Apartment'].includes(
                                  projectDetails?.projectType?.name
                                ) && (
                                  <section className="flex flex-row ml-2 mt-2 justify-between w-full">
                                    <div className="flex flex-col justify-center w-full">
                                      <div className="self-stretch justify-center items-center  inline-flex">
                                        <div className="text-zinc-800 text-[10px]  font-bold font-['Lato'] tracking-wide">
                                          {selUnitDetails?.construct_area} sqft
                                        </div>
                                      </div>
                                      <span className="  text-[12px] text-left  justify-center items-center text-[12px] font-normal font-['Lato'] flex">
                                        BUA
                                      </span>
                                    </div>

                                    <div className="flex flex-col justify-center items-center w-full">
                                      <div className="self-stretch justify-center items-center gap-3 inline-flex">
                                        <div className="text-zinc-800 text-[10px]  font-bold font-['Lato'] tracking-wide">
                                          {selUnitDetails?.bathrooms_c}
                                        </div>
                                      </div>
                                      <span className="  text-[12px] text-left  text-[12px] font-normal font-['Lato']">
                                        Bedrooms
                                      </span>
                                    </div>

                                    <div className="flex flex-col justify-center items-center w-full">
                                      <div className="self-stretch justify-center items-center gap-3 inline-flex">
                                        <div className="text-zinc-800 text-[10px] ml-1 font-bold font-['Lato'] tracking-wide">
                                          {selUnitDetails?.bedrooms_c}
                                        </div>
                                      </div>
                                      <span className="  text-[12px] text-left justify-center items-center  text-[12px] font-normal font-['Lato']">
                                        Bathrooms
                                      </span>
                                    </div>
                                  </section>
                                )}
                              </article>
                            </section>
                            <section className="flex flex-col  mt-1 mb-2">
                              {/* <article className="flex flex-row w-full justify-between mt-1  mb-1">
                                <section className="flex flex-col px-3">
                                  <div className="flex flex-row">
                                    <div className="self-stretch text-zinc-500 text-sm font-medium font-['Lato'] tracking-wide text-[9px]">
                                      Booked By
                                    </div>
                                  </div>
                                  <div className="self-stretch justify-start items-center gap-3 inline-flex">
                                    <div className="text-zinc-800 text-[10px] font-bold font-['Lato'] tracking-wide">
                                      Manjunath
                                    </div>
                                  </div>
                                </section>
                                <section className="flex flex-col px-3">
                                  <div className="flex flex-row">
                                    <div className="self-stretch text-zinc-500 text-sm font-medium font-['Lato'] tracking-wide text-[9px]">
                                      Date
                                    </div>
                                  </div>
                                  <div className="self-stretch justify-start items-center gap-3 inline-flex">
                                    <div className="text-zinc-800 text-[10px] font-bold font-['Lato'] tracking-wide">
                                      12-Dec-2023
                                    </div>
                                  </div>
                                </section>
                              </article> */}
                              <section className="flex flex-col px-3">
                                <div className="flex flex-row">
                                  <div className="self-stretch text-zinc-500  font-medium font-['Lato'] tracking-wide text-[10px]">
                                    Unit Cost
                                  </div>
                                </div>
                                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                                  <div className="text-zinc-800 text-[16px] font-bold font-['Lato'] tracking-wide">
                                    ₹{myBookingPayload?.T_total?.toLocaleString('en-IN')}
                                  </div>
                                  <div className=" h-[19px] rounded justify-center items-center gap-2 flex">
                                    <div className="text-right">
                                      <span className="text-emerald-600 text-xs font-medium font-['Lato'] tracking-wide">
                                        ▴{' '}
                                      </span>
                                      <span className="text-emerald-600 text-[9px] font-bold font-['Lato'] tracking-wide">
                                        ₹{' '}
                                        {myBookingPayload?.sqft_rate?.toLocaleString(
                                          'en-IN'
                                        )}
                                        /sqft{' '}
                                      </span>
                                      <span className="text-emerald-600 text-xs font-medium font-['Lato'] tracking-wide">
                                        ▴{' '}
                                      </span>
                                       <span className="text-emerald-600 text-[9px] font-bold font-['Lato'] tracking-wide">
                                        ₹{' '}
                                        {myBookingPayload?.construct_price_sqft?.toLocaleString(
                                          'en-IN'
                                        )}
                                        /sqft{' '}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </section>
                          </div>
                        </section>
                      </div>
                    </article>
                    {/* section-2 */}
                    <div
                      className="w-full  flex flex-row justify-between"
                      ref={section2Ref}
                      id="section2"
                    >
                      <div className="w-full  flex flex-row">
                        <div className="w-[63.80px] h-[57px] bg-zinc-100 rounded-[5px]"></div>
                        <div className="w-full flex flex-col ml-3">
                          <h6 className="w-full lg:w-12/12 text-blueGray-400 text-[13px] mt-[9px] mb- font-bold uppercase">
                            Cost sheet
                          </h6>
                          <div className="border-t-4 rounded-xl w-16 mt-1 mb-2 border-[#8b5cf6]"></div>
                          <div className=" opacity-50 text-blue-950  text-[12px] font-normal ">
                            Quotation or estimate of unit
                          </div>
                        </div>
                      </div>
                      <div>
                        <section className="flex flex-row justify-between w-52">
                          <div></div>

                          <div className="border rounded-lg shadow-lg w-full">
                            <section className="flex flex-row justify-between mt-2   ">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                              {selPhaseObj?.projectType?.name ===
                                      'Apartment'
                                        ? 'Flat'
                                        : 'Plot'}
                              </h1>
                              <section className="flex flex-row mt-[2px]">
                                <section className="px-2 d-md font-semibold text-[12px] text-[#000000e6] leading-none">
                                  ₹{myBookingPayload?.T_A?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>
                            <section className="flex flex-row justify-between  mt-2">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                Additonal Charges
                              </h1>
                              <section className="flex flex-row mt-[2px]">
                                <section className="px-2 d-md font-semibold text-[12px] text-[#000000e6] leading-none">
                                  ₹{myBookingPayload?.T_B?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>
                            {selPhaseObj?.projectType?.name === 'Villas' &&  <section className="flex flex-row justify-between  mt-2">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                Construction
                              </h1>
                              <section className="flex flex-row mt-[2px]">
                                <section className="px-2 d-md font-semibold text-[12px] text-[#000000e6] leading-none">
                                  ₹{myBookingPayload?.T_C?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>}
                            {selPhaseObj?.projectType?.name === 'Villas' &&  <section className="flex flex-row justify-between  mt-2">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                Additonal Charges-II
                              </h1>
                              <section className="flex flex-row mt-[2px]">
                                <section className="px-2 d-md font-semibold text-[12px] text-[#000000e6] leading-none">
                                  ₹{myBookingPayload?.T_E?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>}
                            <section className="flex flex-row justify-between rounded-b-lg  bg-[#E8E6FE]  mt-2 py-2   ">
                              <h1 className="px-3 text-[12px] text-left  text-[12px] font-semibold pr-8 ">
                                Total Cost
                              </h1>
                              <section className="flex flex-row mt-[2px]">
                                <section className="px-2 d-md font-bold text-[12px] text-[#0D027D] leading-none">
                                  ₹{netTotal?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>
                          </div>
                        </section>
                      </div>
                    </div>
                    {/* section-3 */}
                    <div className="mt-4">
                      <div>
                        <div>
                          <div className="">
                            <section className="flex flex-row justify-between bg-[#f3fff2] rounded-t-lg">
                            </section>
                            {'costsheet' === 'costsheet' && (
                              <section>
                                <div className=" border rounded-lg shadow-md overflow-hidden ">
                                  <table className="min-w-full divide-y ">
                                    <thead>
                                      <tr className="h-8 mb-1 border-none w-[100%] bg-[#E8E6FE] text-[#0D027D]  font-[600] ">
                                        <th className="min-w-[35%] px-2  text-[12px] text-left text-[#0D027D]  tracking-wide">
                                        {selPhaseObj?.projectType?.name ===
                                      'Apartment'
                                        ? 'Flat'
                                        : 'Plot'}{' '} Particulars
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-right   tracking-wide">
                                          Rate/Sqm
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 text-[12px] text-right  tracking-wide`}
                                        >
                                          Cost
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          }  w-[15%] px-2 text-[12px] text-right  tracking-wide`}
                                        >
                                          GST
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-right  tracking-wide ">
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 ">
                                      {' '}
                                      {myBookingPayload?.plotCS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="py-1 my-2 h-[32px]  py-[24px]"
                                        >
                                          <th className="w-[40%] px-2 text-[12px] text-left  font-normal  ">
                                            {d1?.component?.label}
                                          </th>
                                          <td className="w-[15%]  px-2 text-[12px] text-right  ">
                                            {Number(
                                              d1?.charges
                                            )?.toLocaleString('en-IN')}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500  `}
                                          >
                                            ₹
                                            {d1?.TotalSaleValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500  `}
                                          >
                                            ₹
                                            {d1?.gstValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td className="w-[15%] px-2 text-[12px] text-right text-slate-900  ">
                                            ₹
                                            {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                      <tr className=" border-[#fab56c]   h-[32px]">
                                        <th className="w-[40%] text-[11px] font-semibold text-left text-[#0D027D] pl-2 ">
                                        {selPhaseObj?.projectType?.name ===
                                      'Apartment'
                                        ? 'Flat'
                                        : 'Plot'} Cost
                                        </th>
                                        <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 pr-3"></td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-500 `}
                                        >
                                          ₹
                                          {costSheetA
                                            .reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.TotalSaleValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-500 `}
                                        >
                                          ₹
                                          {costSheetA
                                            .reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.gstValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td className="w-[15%] px-2  font-semibold text-[12px] text-right  text-[#0D027D] ">
                                          ₹{myBookingPayload?.T_A?.toLocaleString('en-IN')}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className=" border rounded-lg shadow-md overflow-hidden mt-4">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="h-8 mb-1 border-none w-[100%]  bg-[#E8E6FE] text-[#0D027D] text-[#0D027D]  font-[600] ">
                                        <th className="min-w-[35%] px-2  text-[12px] text-left font-bold tracking-wide">
                                          Additional Charges
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide ">
                                          Rate/Sqm
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          Cost
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          }  w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          GST
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide">
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {myBookingPayload?.addChargesCS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="h-[32px] border-b border-dashed"
                                        >
                                          <th className=" text-[12px] px-2 text-left  font-normal ">
                                            {d1?.component?.label}
                                            {/* {d1?.units?.value === 'costpersqft' && `(${d1?.charges}% on Sale value)`} */}
                                          </th>
                                          <td className="w-[15%]  px-2 text-[12px] text-right   ">
                                            ₹{' '}
                                            {Number(
                                              d1?.charges
                                            )?.toLocaleString('en-IN')}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.TotalSaleValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.gstValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td className="text-[12px] px-2 text-right   ">
                                            {/* {Number(d1?.charges)?.toLocaleString('en-IN')} */}
                                            ₹
                                            {d1?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}
                                          </td>
                                        </tr>
                                      ))}
                                      <tr className=" h-[32px] ">
                                        <th className="w-[40%] text-[11px] px-2 font-semibold text-left  text-[#0D027D] ">
                                          Additional Charges
                                        </th>
                                        <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 pr-3"></td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {partBPayload
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.TotalSaleValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {partBPayload
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.gstValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td className="text-[12px] px-2 text-right text-[#0D027D] font-semibold">
                                          ₹{myBookingPayload?.T_B?.toLocaleString('en-IN')}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                {/* section- 3 */}

                                {selPhaseObj?.projectType?.name === 'Villas' &&  <div className=" border rounded-lg shadow-md overflow-hidden mt-4">
                                  <table className="w-full">

                                    <thead>
                                      <tr className="h-8 mb-1 border-none w-[100%]  bg-[#E8E6FE] text-[#0D027D] text-[#0D027D]  font-[600] ">
                                        <th className="min-w-[35%] px-2  text-[12px] text-left font-bold tracking-wide">
                                          Construction
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide ">
                                          Rate/Sqm
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          Cost
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          }  w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          GST
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide">
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {myBookingPayload?.constructCS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="h-[32px] border-b border-dashed"
                                        >
                                          <th className=" text-[12px] px-2 text-left  font-normal ">
                                            {d1?.component?.label}
                                            {/* {d1?.units?.value === 'costpersqft' && `(${d1?.charges}% on Sale value)`} */}
                                          </th>
                                          <td className="w-[15%]  px-2 text-[12px] text-right   ">
                                            ₹{' '}
                                            {Number(
                                              d1?.charges
                                            )?.toLocaleString('en-IN')}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.TotalSaleValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.gstValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td className="text-[12px] px-2 text-right   ">
                                            {/* {Number(d1?.charges)?.toLocaleString('en-IN')} */}
                                            ₹ {d1?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}

                                          </td>
                                        </tr>
                                      ))}
                                      <tr className=" h-[32px] ">
                                        <th className="w-[40%] text-[11px] px-2 font-semibold text-left  text-[#0D027D] ">
                                          Construction Cost
                                        </th>
                                        <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 pr-3"></td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {constructCostSheetA
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.TotalSaleValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {constructCostSheetA
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.gstValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td className="text-[12px] px-2 text-right text-[#0D027D] font-semibold">
                                          ₹{myBookingPayload?.T_C?.toLocaleString('en-IN')}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>}
                                {/* section- 4 */}
                                {selPhaseObj?.projectType?.name === 'Villas' &&
                                 <div className=" border rounded-lg shadow-md overflow-hidden mt-4">
                                  <table className="w-full">

                                  <thead>
                                      <tr className="h-8 mb-1 border-none w-[100%]  bg-[#E8E6FE] text-[#0D027D] text-[#0D027D]  font-[600] ">
                                        <th className="min-w-[35%] px-2  text-[12px] text-left font-bold tracking-wide">
                                          Additional Charges -II
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide ">
                                          Rate/Sqm
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          Cost
                                        </th>
                                        <th
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          }  w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide`}
                                        >
                                          GST
                                        </th>
                                        <th className="w-[15%] px-2 text-[12px] text-left font-bold text-right  tracking-wide">
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {myBookingPayload?.constAdditionalChargesCS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="h-[32px] border-b border-dashed"
                                        >
                                          <th className=" text-[12px] px-2 text-left  font-normal ">
                                            {d1?.component?.label}
                                            {/* {d1?.units?.value === 'costpersqft' && `(${d1?.charges}% on Sale value)`} */}
                                          </th>
                                          <td className="w-[15%]  px-2 text-[12px] text-right   ">
                                            ₹{' '}
                                            {Number(
                                              d1?.charges
                                            )?.toLocaleString('en-IN')}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.TotalSaleValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td
                                            className={`${
                                              !showGstCol ? 'hidden' : ''
                                            } w-[15%] px-2 text-[12px] text-right text-slate-500   `}
                                          >
                                            ₹
                                            {d1?.gstValue?.toLocaleString(
                                              'en-IN'
                                            )}
                                          </td>
                                          <td className="text-[12px] px-2 text-right   ">
                                            {/* {Number(d1?.charges)?.toLocaleString('en-IN')} */}
                                            ₹
                                            {d1?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}
                                          </td>
                                        </tr>
                                      ))}
                                      <tr className=" h-[32px] ">
                                        <th className="w-[40%] text-[11px] px-2 font-semibold text-left  text-[#0D027D] ">
                                          Additional Cahrges -II Cost
                                        </th>
                                        <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 pr-3"></td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {newAdditonalConstChargesObj
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.TotalSaleValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td
                                          className={`${
                                            !showGstCol ? 'hidden' : ''
                                          } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-800 `}
                                        >
                                          ₹
                                          {newAdditonalConstChargesObj
                                            ?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(obj?.gstValue),
                                              0
                                            )
                                            ?.toLocaleString('en-IN')}
                                        </td>
                                        <td className="text-[12px] px-2 text-right text-[#0D027D] font-semibold">
                                          ₹{myBookingPayload?.T_E?.toLocaleString('en-IN')}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </div>}
                              </section>
                            )}
                            {'payment_schedule' === 'payment_schedule' && (
                              <section className="mt-6">
                                <div className="w-full  flex flex-row justify-between">
                                  <div className="w-full  flex flex-row">
                                    <div className="w-[63.80px] h-[57px] bg-zinc-100 rounded-[5px]"></div>
                                    <div className="w-full flex flex-col ml-3">
                                      <h6 className="w-full lg:w-12/12 text-blueGray-400 text-[13px] mt-[9px] mb- font-bold uppercase">
                                        Payment Schedule
                                      </h6>
                                      <div className="border-t-4 rounded-xl w-16 mt-1 mb-2 border-[#8b5cf6]"></div>
                                      <div className=" opacity-50 text-blue-950  text-[12px] font-normal ">
                                        Quotation or estimate of unit
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <section className="flex flex-row justify-between w-52">
                                      <div></div>

                                      <div className="border rounded-lg shadow-lg w-full">
                                        <section className="flex flex-row justify-between  mt-2">
                                          <h1 className="px-3 text-[12px] text-left  text-[12px] font-normal ">
                                            Elgible
                                          </h1>
                                          <section className="flex flex-row">
                                            <section className="px-2 d-md font-semibold text-[12px] text-[#000000e6] leading-none">
                                              ₹
                                              {myBookingPayload?.T_elgible?.toLocaleString(
                                                'en-IN'
                                              )}
                                            </section>
                                          </section>
                                        </section>
                                        <section className="flex flex-row justify-between rounded-b-lg  bg-[#E8E6FE]  mt-2 py-2   ">
                                          <h1 className="px-3 text-[12px] text-left  text-[12px] font-semibold pr-8 ">
                                            Balance
                                          </h1>
                                          <section className="flex flex-row mt-2">
                                            <section className="px-2 d-md font-bold text-[12px] text-[#0D027D] leading-none">
                                              ₹
                                              {netTotal?.toLocaleString(
                                                'en-IN'
                                              )}
                                            </section>
                                          </section>
                                        </section>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                                <div className=" mt-4 border rounded-lg shadow-md overflow-hidden ">
                                  <table className="w-full border-b border-dashed">
                                    <thead className="">
                                      {' '}
                                      <tr className=" h-8  border-none bg-[#E8E6FE] text-[#0D027D]  font-[600]  ">
                                        <th className="w-[50%] px-2   text-left  tracking-wide  text-[12px]   ">
                                          Plot Payment Schedule
                                        </th>
                                        <th className="w-[30%] px-2   text-left  tracking-wide  text-[12px] ">
                                          Payment Timeline
                                        </th>
                                        <th className="w-[20%] px-2   text-right  tracking-wide  text-[12px]">
                                          Total inc GST
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {myBookingPayload.plotPS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="border-b-[0.05px] border-gray-300 py-1 my-2 h-[32px]  py-[24px]"
                                        >
                                          {/* <th className=" px-2  text-[11px] text-left  font-normal tracking-wide uppercase ">
                                            {d1?.stage?.label}
                                          </th> */}
                                           <th className=" px-2  text-[10px] text-left text-bold   tracking-wide  text-grey-900 ">
                                      {d1?.stage?.label}
                                      <div className="text-[9px] text-left   text-slate-500 ">
                                        {d1?.description} ({d1?.zeroDay} days)
                                      </div>
                                    </th>
                                          <td className="text-[11px] px-2  text-left font-normal tracking-wide uppercase ">
                                          {prettyDate(d1?.schDate)}
                                          </td>
                                          <td className="text-[12px] px-2  text-right tracking-wide uppercase ">
                                            ₹
                                            {d1?.value?.toLocaleString('en-IN')}
                                          </td>
                                        </tr>
                                      ))}

                                      <tr className="h-[32px]">
                                        <th className="text-[12px] px-2  text-left text-gray-800 ">
                                          Plot Value Total Rs.:
                                        </th>
                                        <td className="text-[12px] px-2  text-right text-gray-400 "></td>
                                        <th className="text-[12px] px-2  text-right text-gray-800 ">
                                          ₹{netTotal?.toLocaleString('en-IN')}
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                {selPhaseObj?.projectType?.name === 'Villas' && (
                                  <div className=" mt-4 border rounded-lg shadow-md overflow-hidden ">
                                  <table className="w-full border-b border-dashed">
                                    <thead className="">
                                      {' '}
                                      <tr className=" h-8  border-none bg-[#E8E6FE] text-[#0D027D]  font-[600]  ">
                                        <th className="w-[50%] px-2   text-left  tracking-wide  text-[12px]   ">
                                          Construction Payment Schedule
                                        </th>
                                        <th className="w-[30%] px-2   text-left  tracking-wide  text-[12px] ">
                                          Payment Timeline
                                        </th>
                                        <th className="w-[20%] px-2   text-right  tracking-wide  text-[12px]">
                                          Total inc GST
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {myBookingPayload.constructPS?.map((d1, inx) => (
                                        <tr
                                          key={inx}
                                          className="border-b-[0.05px] border-gray-300 py-1 my-2 h-[32px]  py-[24px]"
                                        >
                                         <th className=" px-2  text-[10px] text-left text-bold   tracking-wide  text-grey-900 ">
                                      {d1?.stage?.label}
                                      <div className="text-[9px] text-left   text-slate-500 ">
                                        {d1?.description} ({d1?.zeroDay} days)
                                      </div>
                                    </th>
                                          <td className="text-[11px] px-2  text-left font-normal tracking-wide uppercase ">
                                          {prettyDate(d1?.schDate)}
                                          </td>
                                          <td className="text-[12px] px-2  text-right tracking-wide uppercase ">
                                            ₹
                                            {d1?.value?.toLocaleString('en-IN')}
                                          </td>
                                        </tr>
                                      ))}

                                      <tr className="h-[32px]">
                                        <th className="text-[12px] px-2  text-left text-gray-800 ">
                                          Plot Value Total Rs.:
                                        </th>
                                        <td className="text-[12px] px-2  text-right text-gray-400 "></td>
                                        <th className="text-[12px] px-2  text-right text-gray-800 ">
                                          ₹{netTotal?.toLocaleString('en-IN')}
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                )}
                              </section>
                            )}
                          </div>
                        </div>
                        {/* end of paper */}
                      </div>
                    </div>
                  </section>
                </div>
              </PDFExport>
            )}
          </Formik>
        </div>
      )}

      {pdfPreview && (
        <CostBreakUpPdfPreview
          projectDetails={projectDetails}
          csMode={csMode}
          // costSheetA={costSheetA}
          pdfExportComponent={pdfExportComponent}
          selPhaseObj={selPhaseObj}
          leadDetailsObj1={leadDetailsObj1}
          selUnitDetails={selUnitDetails}
          setNewPlotCsObj={setNewPlotCsObj}
          newPlotCsObj={newPlotCsObj}
          costSheetA={newPlotCostSheetA || []}
          setCostSheetA={setNewPlotCostSheetA}
          setNewPS={setNewPlotPS}
          newPlotPS={newPlotPS}
          showGstCol={showGstCol}
          partATotal={partATotal}
          partBTotal={partBTotal}
          netTotal={netTotal}
        />
      )}
    </div>
  )
}

export default BookingSummaryView
