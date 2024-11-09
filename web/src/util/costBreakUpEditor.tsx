import { useState, useEffect, createRef, useRef } from 'react'

import { InformationCircleIcon } from '@heroicons/react/outline'
import { Checkbox } from '@mui/material'
import { PDFExport } from '@progress/kendo-react-pdf'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { Field, Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'

import CrmUnitHeader from 'src/components/A_CrmModule/CrmUnitHeader'
import {
  updateCrmExecutiveAgreegations,
  updateManagerApproval,
  updateProjectionsAgreegations,
  updateUnitStatus,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import { computeTotal } from './computeCsTotals'
import CostBreakUpPdfPreview from './costBreakUpPdfPreview'
import { TextFieldFlat } from './formFields/TextFieldFlatType'

import '../styles/myStyles.css'
import { getWeekMonthNo, prettyDate } from './dateConverter'
import CustomDatePicker from './formFields/CustomDatePicker'

const CostBreakUpEditor = ({
  projectDetails,
  csMode,
  pdfExportComponent,
  selPhaseObj,
  selUnitDetails,
  netTotal,
  setNetTotal,
  leadDetailsObj1,
  setNewPlotCsObj,
  newPlotCsObj,
  costSheetA,
  setCostSheetA,
  setAddiChargesObj,
  setNewPS,
  newPlotPS,
  newPlotCostSheetA,
  setNewPlotCostSheetA,
  setNewPlotPS,
  bootedPs,
}) => {
  const d = new window.Date()

  const { user } = useAuth()
  const { orgId } = user

  const { enqueueSnackbar } = useSnackbar()

  const ref = createRef()

  const [initialValuesA, setInitialValuesA] = useState({})

  const [newSqftPrice, setNewSqftPrice] = useState(0)

  const [partATotal, setPartATotal] = useState(0)
  const [partBTotal, setPartBTotal] = useState(0)
  const [partCTotal, setPartCTotal] = useState(0)
  const [partDTotal, setPartDTotal] = useState(0)
  const [partETotal, setPartETotal] = useState(0)
  const [plotTotal, setPlotTotal] = useState(0)
  const [plotBookingAdv, setPlotBookingAdv] = useState(0)
  const [partBPayload, setPartBPayload] = useState([])
  const [partCPayload, setPartCPayload] = useState([])
  const [partDPayload, setPartDPayload] = useState([])
  const [partEPayload, setPartEPayload] = useState([])
  const [psPayload, setPSPayload] = useState([])
  const [pdfPreview, setpdfPreview] = useState(false)
  const [showGstCol, setShowGstCol] = useState(true)
  const [startDate, setStartDate] = useState(d)

  useEffect(() => {
    boot()
  }, [selUnitDetails, selPhaseObj])

  useEffect(() => {
    console.log('data is===> 0', selUnitDetails?.fullPs)
    newPlotPS.map((d) => {
      console.log('data max is', d)
      const newObj = d
      newObj.oldSchDate = d?.schDate
      return newObj
    })
    const z = selUnitDetails?.fullPs
  }, [])

  // useEffect(() => {
  //   CreateNewPsFun(netTotal, plotBookingAdv, csMode)
  // }, [netTotal, plotBookingAdv, csMode])

  const boot = async () => {
    console.log('sel unti detials ', selUnitDetails)
    const {
      addChargesCS,
      plotCS,
      constructCS,
      constAdditionalChargesCS,
      possessionAdditionalCostCS,
      fullPs,
    } = selUnitDetails

    const { additonalChargesObj, constructOtherChargesObj } = selPhaseObj
    const zeroAdditionalChargesObj = additonalChargesObj?.map((item) => {
      return { ...item, charges: 0 }
    })
    let constructCost = []

    // let constructOtherChargesFull =

    constructCost = [
      {
        others: 2540,
        component: {
          value: 'villa_construct_cost',
          label: 'Villa Construction Cost  ',
        },
        charges: 2540,
        myId: '3',
        units: {
          label: 'Fixed cost',
          value: 'fixedcost',
        },
        gst: {
          value: 0,
          label: '0',
        },
        TotalSaleValue: 0,
        gstValue: 0,
        TotalNetSaleValueGsT: 0,
      },
    ]

    await setCostSheetA(plotCS)
    await setPartBPayload(
      addChargesCS?.length > 0 ? addChargesCS || [] : additonalChargesObj || []
    )
    await setPartCPayload(
      constructCS?.length > 0 ? constructCS || [] : constructCost || []
    )
    await setPartDPayload(
      constAdditionalChargesCS?.length > 0
        ? constAdditionalChargesCS || []
        : constructOtherChargesObj || []
    )
    await setPartEPayload(possessionAdditionalCostCS)
    await setTotalFun(plotCS, addChargesCS)
    await setNewPS(fullPs)
    await setPSPayload(fullPs)
    await fullPs?.map((data) => {
      if (data.stage?.value === 'on_booking') {
        setPlotBookingAdv(data?.percentage)
      }
    })
  }
  const handlePriceChangePartB = (index, price) => {
    console.log('changed price is ', price)
    const updatedRows = [...partBPayload]
    console.log('new value is ', partBPayload)
    updatedRows[index].charges = price

    let total = 0
    let gstTotal = 0
    const isChargedPerSqft = updatedRows[index]?.units.value === 'costpersqft'

    const gstPercent =
      Number(updatedRows[index]?.gst?.value) > 1
        ? updatedRows[index]?.gst?.value * 0.01
        : updatedRows[index]?.gst?.value
    total = isChargedPerSqft
      ? Number(
          selUnitDetails?.super_built_up_area?.toString()?.replace(',', '') ||
            selUnitDetails?.area?.toString()?.replace(',', '')
        ) * Number(updatedRows[index]?.charges)
      : Number(updatedRows[index]?.charges)

    gstTotal = Math.round(total * gstPercent)

    // console.log('myvalue is ', data)
    updatedRows[index].TotalSaleValue = total
    // updatedRows[index].gst.label = gstTaxIs

    updatedRows[index].gstValue = gstTotal
    updatedRows[index].TotalNetSaleValueGsT = total + gstTotal
    setPartBPayload(updatedRows)
    setTotalFun(costSheetA, partBPayload)
  }
  const handlePriceChangePartC = (index, price) => {
    console.log('changed price is ', price)
    const updatedRows = [...partCPayload]
    console.log('new value is ', partCPayload)
    updatedRows[index].charges = price

    let total = 0
    let gstTotal = 0
    console.log('price view is', updatedRows[index])
    // const isChargedPerSqft = updatedRows[index]?.units.value === 'costpersqft'
    const isChargedPerSqft = true

    const gstPercent =
      Number(updatedRows[index]?.gst?.value) > 1
        ? updatedRows[index]?.gst?.value * 0.01
        : updatedRows[index]?.gst?.value
    total = isChargedPerSqft
      ? Number(selUnitDetails?.construct_area?.toString()?.replace(',', '')) *
        Number(updatedRows[index]?.charges)
      : Number(updatedRows[index]?.charges)

    gstTotal = Math.round(total * gstPercent)

    // console.log('myvalue is ', data)
    updatedRows[index].TotalSaleValue = total
    // updatedRows[index].gst.label = gstTaxIs

    updatedRows[index].gstValue = gstTotal
    updatedRows[index].TotalNetSaleValueGsT = total + gstTotal
    setPartCPayload(updatedRows)
    setTotalFun(costSheetA, partCPayload)
  }
  const handlePriceChangePartD = (index, price) => {
    console.log('changed price is ', price)
    const updatedRows = [...partCPayload]
    console.log('new value is ', partCPayload)
    updatedRows[index].charges = price

    let total = 0
    let gstTotal = 0
    const isChargedPerSqft = updatedRows[index]?.units.value === 'costpersqft'

    const gstPercent =
      Number(updatedRows[index]?.gst?.value) > 1
        ? updatedRows[index]?.gst?.value * 0.01
        : updatedRows[index]?.gst?.value
    total = isChargedPerSqft
      ? Number(selUnitDetails?.construct_area?.toString()?.replace(',', '')) *
        Number(updatedRows[index]?.charges)
      : Number(updatedRows[index]?.charges)

    gstTotal = Math.round(total * gstPercent)

    // console.log('myvalue is ', data)
    updatedRows[index].TotalSaleValue = total
    // updatedRows[index].gst.label = gstTaxIs

    updatedRows[index].gstValue = gstTotal
    updatedRows[index].TotalNetSaleValueGsT = total + gstTotal
    setPartDPayload(updatedRows)
    setTotalFun(costSheetA, partCPayload)
  }
  const handlePriceChangePartA = (inx, newValue) => {
    console.log('changed price is ', newValue)
    const updatedRows = [...costSheetA]

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
      total = Math.round(
        selUnitDetails?.area?.toString()?.replace(',', '') * newValue
      )
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

    updatedRows[inx].charges = newValue
    setCostSheetA(y)
    setTotalFun(costSheetA, partBPayload)
  }

  useEffect(() => {
    setTotalFun(costSheetA, partBPayload)
  }, [partBPayload, partCPayload, partDPayload])

  const setTotalFun = async (costSheetA, partBPayload) => {
    console.log('ami here', partBPayload, costSheetA, selUnitDetails)

    // const partBTotal = partBPayload?.reduce(
    //   (partialSum, obj) =>
    //     partialSum +
    //     Number(
    //       computeTotal(
    //         obj,
    //         selUnitDetails?.super_built_up_area || selUnitDetails?.area?.toString()?.replace(',', '')
    //       )
    //     ),
    //   0
    // )

    const partBTotal = partBPayload?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT || 0),
      0
    )
    const partATotal = costSheetA?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT || 0),
      0
    )
    const partCTotal = partCPayload?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT || 0),
      0
    )
    const partDTotal = partDPayload?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT || 0),
      0
    )
    const partETotal = partEPayload?.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT || 0),
      0
    )
    setPartBTotal(partBTotal)
    setPartCTotal(partCTotal)
    setPartDTotal(partDTotal)
    setPartETotal(partBTotal)
    console.log('sel unti details =>', partBTotal)
    setPartATotal(partATotal)
    CreateNewPsFun(netTotal, plotBookingAdv, csMode)
    setPlotTotal(partATotal + partBTotal)
    setNetTotal(partATotal + partBTotal + partCTotal + partDTotal)
    selUnitDetails?.fullPs?.map((data) => {
      if (data?.stage?.value === 'on_booking') {
        setPlotBookingAdv(data?.percentage)
      }
    })
  }
  const CreateNewPsFun = (netTotal, plotBookingAdv, csMode) => {
    console.log('sel unti details', psPayload, netTotal, partATotal, partBTotal)
    const newPs = psPayload.map((d1) => {
      const z = d1
      console.log('sel unti details')
      if (csMode === 'plot_cs') {
        z.value = ['on_booking'].includes(d1?.stage?.value)
          ? Number(d1?.percentage)
          : Math.round((netTotal - plotBookingAdv) * (d1?.percentage / 100))

        z.preCheck = ['on_booking'].includes(d1?.stage?.value)
          ? Number(netTotal)
          : Math.round(netTotal - plotBookingAdv)

        if (['on_booking'].includes(d1?.stage?.value)) {
          z.elgible = true
          z.elgFrom = Timestamp.now().toMillis()
          return z
        }
        console.log('z value is ', d1?.stage?.value, '=>', z.value)
        return z
      } else {
        z.value = ['Total_Other_Charges_Amenities:\t']?.includes(
          d1?.stage?.value
        )
          ? Number(partBTotal)
          : Math.round((netTotal - partBTotal) * (d1?.percentage / 100))

        return z
      }
    })
    console.log('new ps is ', newPs)
    setNewPS(newPs)
  }
  const submitManagerApproval = (status) => {
    console.log('data max is', selUnitDetails)

    // project1WweeknoMmonthnoYyearno

    newPlotPS.map((d, i) => {
      console.log(
        'data is===>',
        prettyDate(newPlotPS[i]['schDate']),
        prettyDate(d['oldDate']),
        d?.stage.value,
        prettyDate(bootedPs[i]['schDate']),
        prettyDate(d?.schDate),
        bootedPs[i]['schDate'] == d?.schDate
      )
      //
      // this will set the previous date immutable as current date

      if (d?.oldDate != d?.schDate) {
        const dataPayload = {
          pId: selUnitDetails?.pId,
          oldDate: d?.oldDate,
          schDate: d?.schDate,
          stageId: d?.stage.value,
          newPrice: d?.value,
          used: d?.used,
          assignedTo: selUnitDetails?.assignedTo || 'unassigned',
        }

        updateProjectionsAgreegations(
          orgId,
          dataPayload,
          user.email,
          enqueueSnackbar
        )

        updateCrmExecutiveAgreegations(
          orgId,
          dataPayload,
          user.email,
          enqueueSnackbar
        )
      }
    })
    const fullPsPayload = newPlotPS.map((d) => {
      const newPayload = d
      newPayload.oldDate = d?.schDate
      return newPayload
    })
    let T_elgible = 0
    let T_elgible_balance = 0
    let plotPsNew = []
    let constructPsNew = []

   plotPsNew  = newPlotPS?.map((d1, inx) => {
      console.log('d1 is', d1)
      const z = d1
      z.value = ['fixedcost'].includes(d1?.units?.value)
        ? Number(d1?.percentage)
        : Number((plotTotal * (d1?.percentage / 100)).toFixed(2))
      if (['fixedcost'].includes(d1?.units?.value)) {
        z.elgible = true
        z.elgFrom = Timestamp.now().toMillis()
        return z
      }
      // data['unitStatus'] = d1?.units?.value
      if (status == 'Registered') {
        z.elgible = true
        z.elgFrom = Timestamp.now().toMillis()
      }
      if (status == 'Booked') {
        if (inx < 1) {
          z.elgible = true
          z.elgFrom = Timestamp.now().toMillis()
        }
      }
      if (status == 'ATS') {
        if (inx < 2) {
          z.elgible = true
          z.elgFrom = Timestamp.now().toMillis()
        }
      }

      d1.schDate =
        d1?.schDate ||
        d.getTime() +
          (newPlotPS.slice(0, inx).reduce(
            (sum, prevItem) => sum + (Number(prevItem.zeroDay) || 0),
            0
          ) +
            Number(d1?.zeroDay || 0)) *
            86400000
      return z
    })
    const T_review = selUnitDetails['T_received'] || 0

    fullPsPayload?.map((dataObj) => {
      if (dataObj?.elgible) {
        T_elgible = dataObj?.value + T_elgible
      }
    })

    T_elgible_balance = T_elgible - T_review
    const dataObj = {
      status: status,
      // plotCS: costSheetA,
      // fullPs: fullPsPayload,
      // addChargesCS: partBPayload,
      // T_balance:
      //   netTotal -
      //   (selUnitDetails?.T_review + (selUnitDetails?.T_cleared || 0)),
      // T_Total: netTotal,
      // T_review: selUnitDetails?.T_review,
      // T_cleared: selUnitDetails?.T_cleared || 0,
      // T_rejected: selUnitDetails?.T_rejected || 0,
      // T_elgible_balance: selUnitDetails?.T_elgible_balance || 0,
      // T_elgible_balance:
      //   selUnitDetails?.T_elgible -
      //   (selUnitDetails?.T_review + (selUnitDetails?.T_cleared || 0)),
      // T_elgible: selUnitDetails?.T_elgible || 0,

      T_total: netTotal,
      T_balance: netTotal - selUnitDetails?.T_review,
      T_elgible: T_elgible,
      T_elgible_balance: T_elgible_balance,

      T_A: partATotal,
      T_B: partBTotal,
      T_C: partCTotal,
      T_D: partDTotal,
      T_E: partETotal,
      plotCS: [...costSheetA],
      constructCS: [...partCPayload],
      addChargesCS: partBPayload,
      constAdditionalChargesCS: partBPayload,
      possessionAdditionalCostCS: partEPayload,
      // plotPS: plotPsNew,
      // constructPS: constructPs,
      // fullPs: fullPsPayload,
    }

    updateManagerApproval(
      orgId,
      selUnitDetails?.id,
      dataObj,
      user.email,
      enqueueSnackbar
    )
  }
  const handlePSdateChange = (index, newDate) => {
    const updatedRows = [...newPlotPS]
    // updatedRows[index].oldDate = updatedRows[index].schDate
    updatedRows[index].schDate = newDate
    // setNewPS(updatedRows)
  }
  return (
    <div>
      {!pdfPreview && (
        <div>
          <Formik
            enableReinitialize={true}
            // initialValues={initialState}
            // validationSchema={validate}
            onSubmit={(values, { resetForm }) => {
              // onSubmit(values, resetForm)
            }}
          >
            {(formik) => (
              <PDFExport
                paperSize="A4"
                margin="0.5cm"
                fileName={`${selUnitDetails?.unit_no}`}
                ref={pdfExportComponent}
              >
                <div className="">
                  <div>
                    <div>
                      <div className="">
                        <section className="flex flex-row justify-between bg-[#f3fff2] p-2 py-1 border-b rounded-t-lg">
                          <h1 className="text-bold font-bold text-center text-gray-800  text-[14px] mt-[10px] ">
                            COST SHEET
                          </h1>
                          <section className="">
                            <div className="w-full flex items-center ">
                              <label
                                htmlFor="area"
                                className="label font-regular text-sm font-bodyLato"
                              >
                                Show Gst
                              </label>
                              <Field
                                name="isGSTChecked"
                                type="checkbox"
                                component={() => (
                                  <Checkbox
                                    color="primary"
                                    checked={showGstCol}
                                    onClick={() => setShowGstCol(!showGstCol)}
                                  />
                                )}
                              />
                            </div>
                          </section>
                        </section>
                        <div className=" rounded-md">
                          <table className="w-[100%]">
                            <thead>
                              <tr className="h-8 mb-1 border-none w-[100%] bg-[#f3fff2] ">
                                <th className="min-w-[35%] px-2  text-[10px] text-left  tracking-wide">
                                  Particulars
                                </th>
                                <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide ">
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
                              {costSheetA?.map((d1, inx) => (
                                <tr
                                  key={inx}
                                  className="py-1 my-2 h-[40px]  py-[24px]"
                                >
                                  <th className="w-[40%] px-2 text-[11px] text-left text-gray-700  ">
                                    {d1?.component?.label}
                                  </th>
                                  <td className="w-[15%]  px-2 text-[12px] text-right text-gray-700 border">
                                    <TextFieldFlat
                                      label=""
                                      className="w-[100%] text-[12px] text-right font-bold border-b  border-[#B76E00] border-dashed pr-1 py-[4px] text-[#B76E00] "
                                      name="ratePerSqft"
                                      onChange={(e) => {
                                        // setNewSqftPrice(e.target.value)

                                        setNewSqftPrice(Number(e.target.value))
                                        handlePriceChangePartA(
                                          inx,
                                          e.target.value
                                        )
                                        // changeOverallCostFun(
                                        //   inx,
                                        //   d1,
                                        //   e.target.value
                                        // )
                                      }}
                                      value={d1?.charges}
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
                                    } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border `}
                                  >
                                    ₹
                                    {d1?.TotalSaleValue?.toLocaleString(
                                      'en-IN'
                                    )}
                                  </td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border `}
                                  >
                                    ₹{d1?.gst?.value?.toLocaleString('en-IN')}
                                  </td>
                                  <td className="w-[15%] px-2 text-[12px] text-right text-slate-900 border ">
                                    ₹
                                    {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                      'en-IN'
                                    )}
                                  </td>
                                </tr>
                              ))}
                              <tr className="  border  h-[32px]">
                                <th className="w-[40%] text-[12px] text-left text-[#118D57] pl-2 border-0 border">
                                  Total (A)
                                </th>
                                <td className="w-[15%] px-2 font-bold text-[12px] text-right text-gray-600 pr-3 "></td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800  `}
                                >
                                  ₹
                                  {costSheetA
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
                                  } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800  `}
                                >
                                  ₹
                                  {costSheetA
                                    ?.reduce(
                                      (partialSum, obj) =>
                                        partialSum + Number(obj?.gst?.value),
                                      0
                                    )
                                    ?.toLocaleString('en-IN')}
                                </td>
                                <td className="w-[15%] px-2 font-bold  text-[12px] text-right  text-[#118D57]  ">
                                  ₹{partATotal?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="w-full mt-1">
                          <thead>
                              <tr className="h-8 mb-1 border-none w-[100%] bg-[#f3fff2] ">
                                <th className="min-w-[35%] px-2  text-[10px] text-left  tracking-wide">
                                  Additonal Charges
                                </th>
                                <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide ">
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
                              {partBPayload?.map((d1, inx) => (
                                <tr key={inx} className="py-1 my-2 h-[32px]  ">
                                  <th className="w-[40%] px-2 text-[11px] text-left text-gray-700   ">
                                    {d1?.component?.label}
                                  </th>
                                  <td className="w-[15%]  px-2 text-[12px] text-right text-gray-700 border ">
                                    <TextFieldFlat
                                      label=""
                                      className="w-[100%] text-[12px] text-right font-bold border-b  border-[#B76E00] border-dashed pr-1 py-[4px] text-[#B76E00]"
                                      name="ratePerSqft"
                                      onChange={(e) => {
                                        // setNewSqftPrice(e.target.value)

                                        setNewSqftPrice(Number(e.target.value))
                                        handlePriceChangePartB(
                                          inx,
                                          e.target.value
                                        )
                                        // changeOverallCostFun(
                                        //   inx,
                                        //   d1,
                                        //   e.target.value
                                        // )
                                      }}
                                      value={d1?.charges}
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
                                    } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border `}
                                  >
                                    ₹
                                    {d1?.TotalSaleValue?.toLocaleString(
                                      'en-IN'
                                    )}
                                  </td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border  `}
                                  >
                                    ₹{d1?.gstValue?.toLocaleString('en-IN')}
                                  </td>
                                  <td className="w-[15%] px-2 text-[12px] text-right text-slate-900 border ">
                                    ₹{' '}
                                    {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                      'en-IN'
                                    )}
                                  </td>
                                </tr>
                              ))}
                              <tr className="   h-[32px] border">
                                <th className="w-[40%] text-[12px] text-left text-[#118D57] pl-2 border ">
                                  Total (B)
                                </th>
                                <td className="w-[15%] px-2 font-bold text-[12px] text-right text-gray-600 pr-3"></td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                >
                                  ₹
                                  {partBPayload
                                    ?.reduce(
                                      (partialSum, obj) =>
                                        partialSum +
                                        Number(obj?.TotalSaleValue || 0),
                                      0
                                    )
                                    ?.toLocaleString('en-IN')}
                                </td>
                                <td
                                  className={`${
                                    !showGstCol ? 'hidden' : ''
                                  } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                >
                                  ₹
                                  {partBPayload
                                    ?.reduce(
                                      (partialSum, obj) =>
                                        partialSum + Number(obj?.gstValue || 0),
                                      0
                                    )
                                    ?.toLocaleString('en-IN')}
                                </td>
                                <td className="w-[15%] px-2 font-bold  text-[12px] text-right  text-[#118D57]  ">
                                  ₹{partBTotal?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {['Villas'].includes(
                            selPhaseObj?.projectType?.name
                          ) && (
                            <section className="flex flex-row justify-between  bg-[#dff6dd]  h-[34px] py-[7px] mt-2 ">
                              <h1 className="px-2 text-[12px] text-left  text-[12px] font-bold ">
                                Total Unit Cost (A+B)
                              </h1>
                              <section className="flex flex-row">
                                <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                  ₹{partATotal?.toLocaleString('en-IN')}
                                </section>
                                <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                  +
                                </section>

                                <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                  ₹{partBTotal?.toLocaleString('en-IN')}
                                </section>
                                <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                  =
                                </section>
                                <section className="px-2 d-md font-bold text-[16px] text-[#000000e6] leading-none">
                                  ₹{plotTotal?.toLocaleString('en-IN')}
                                </section>
                              </section>
                            </section>
                          )}
                          {/* Table C */}
                          {['Villas'].includes(
                            selPhaseObj?.projectType?.name
                          ) && (
                            <table className="w-full mt-1">
                                 <thead>
                              <tr className="h-8 mb-1 border-none w-[100%] bg-[#f3fff2] ">
                                <th className="min-w-[35%] px-2  text-[10px] text-left  tracking-wide">
                                  Construction Particulars
                                </th>
                                <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide ">
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
                                {partCPayload?.map((d1, inx) => (
                                  <tr
                                    key={inx}
                                    className="py-1 my-2 h-[32px]  "
                                  >
                                    <th className="w-[40%] px-2 text-[11px] text-left text-gray-700   ">
                                      {d1?.component?.label}
                                    </th>
                                    <td className="w-[15%]  px-2 text-[12px] text-right text-gray-700 border ">
                                      <TextFieldFlat
                                        label=""
                                        className="w-[100%] text-[12px] text-right font-bold border-b  border-[#B76E00] border-dashed pr-1 py-[4px] text-[#B76E00]"
                                        name="ratePerSqft"
                                        onChange={(e) => {
                                          // setNewSqftPrice(e.target.value)

                                          setNewSqftPrice(
                                            Number(e.target.value)
                                          )
                                          handlePriceChangePartC(
                                            inx,
                                            e.target.value
                                          )
                                          // changeOverallCostFun(
                                          //   inx,
                                          //   d1,
                                          //   e.target.value
                                          // )
                                        }}
                                        value={d1?.charges}
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
                                      } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border `}
                                    >
                                      ₹
                                      {d1?.TotalSaleValue?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </td>
                                    <td
                                      className={`${
                                        !showGstCol ? 'hidden' : ''
                                      } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border  `}
                                    >
                                      ₹{d1?.gstValue?.toLocaleString('en-IN')}
                                    </td>
                                    <td className="w-[15%] px-2 text-[12px] text-right text-slate-900 border ">
                                      ₹{' '}
                                      {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </td>
                                  </tr>
                                ))}
                                <tr className="   h-[32px] border">
                                  <th className="w-[40%] text-[12px] text-left text-[#118D57] pl-2 border ">
                                    Total (C)
                                  </th>
                                  <td className="w-[15%] px-2 font-bold text-[12px] text-right text-gray-600 pr-3"></td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                  >
                                    ₹
                                    {partCPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(obj?.TotalSaleValue || 0),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                  >
                                    ₹
                                    {partCPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(obj?.gstValue || 0),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                  <td className="w-[15%] px-2 font-bold  text-[12px] text-right  text-[#118D57]  ">
                                    ₹
                                    {partCPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(
                                            obj?.TotalNetSaleValueGsT || 0
                                          ),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {/* Table D */}
                          {['Villas'].includes(
                            selPhaseObj?.projectType?.name
                          ) && (
                            <table className="w-full mt-1">
                                 <thead>
                              <tr className="h-8 mb-1 border-none w-[100%] bg-[#f3fff2] ">
                                <th className="min-w-[35%] px-2  text-[10px] text-left  tracking-wide">
                                  Construction Additional Charges
                                </th>
                                <th className="w-[15%] px-2 text-[10px] text-right  tracking-wide ">
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
                                {partDPayload?.map((d1, inx) => (
                                  <tr
                                    key={inx}
                                    className="py-1 my-2 h-[32px]  "
                                  >
                                    <th className="w-[40%] px-2 text-[11px] text-left text-gray-700   ">
                                      {d1?.component?.label}
                                    </th>
                                    <td className="w-[15%]  px-2 text-[12px] text-right text-gray-700 border ">
                                      <TextFieldFlat
                                        label=""
                                        className="w-[100%] text-[12px] text-right font-bold border-b  border-[#B76E00] border-dashed pr-1 py-[4px] text-[#B76E00]"
                                        name="ratePerSqft"
                                        onChange={(e) => {
                                          // setNewSqftPrice(e.target.value)

                                          setNewSqftPrice(
                                            Number(e.target.value)
                                          )
                                          handlePriceChangePartD(
                                            inx,
                                            e.target.value
                                          )
                                          // changeOverallCostFun(
                                          //   inx,
                                          //   d1,
                                          //   e.target.value
                                          // )
                                        }}
                                        value={d1?.charges}
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
                                      } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border `}
                                    >
                                      ₹
                                      {d1?.TotalSaleValue?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </td>
                                    <td
                                      className={`${
                                        !showGstCol ? 'hidden' : ''
                                      } w-[15%] px-2 text-[12px] text-right text-slate-500 text-sm border  `}
                                    >
                                      ₹{d1?.gstValue?.toLocaleString('en-IN')}
                                    </td>
                                    <td className="w-[15%] px-2 text-[12px] text-right text-slate-900 border ">
                                      ₹{' '}
                                      {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </td>
                                  </tr>
                                ))}
                                <tr className="   h-[32px] border">
                                  <th className="w-[40%] text-[12px] text-left text-[#118D57] pl-2 border ">
                                    Total (D)
                                  </th>
                                  <td className="w-[15%] px-2 font-bold text-[12px] text-right text-gray-600 pr-3"></td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                  >
                                    ₹
                                    {partDPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(obj?.TotalSaleValue || 0),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                  <td
                                    className={`${
                                      !showGstCol ? 'hidden' : ''
                                    } w-[15%] px-2 font-bold  text-[12px] text-right text-gray-800 `}
                                  >
                                    ₹
                                    {partDPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(obj?.gstValue || 0),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                  <td className="w-[15%] px-2 font-bold  text-[12px] text-right  text-[#118D57]  ">
                                    ₹{' '}
                                    {partDPayload
                                      ?.reduce(
                                        (partialSum, obj) =>
                                          partialSum +
                                          Number(
                                            obj?.TotalNetSaleValueGsT || 0
                                          ),
                                        0
                                      )
                                      ?.toLocaleString('en-IN')}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                          <section className="flex flex-row justify-between  bg-[#dff6dd]  h-[34px] py-[7px] mt-2 ">
                            <h1 className="px-2 text-[12px] text-left  text-[12px] font-bold ">
                              Total Unit Cost (A+B
                              {['Villas'].includes(
                                selPhaseObj?.projectType?.name
                              ) && '+C+D'}
                              )
                            </h1>
                            <section className="flex flex-row">
                              <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                ₹{partATotal?.toLocaleString('en-IN')}
                              </section>
                              <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                +
                              </section>
                              <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                ₹{partBTotal?.toLocaleString('en-IN')}
                              </section>
                              {['Villas'].includes(
                                selPhaseObj?.projectType?.name
                              ) && (
                                <>
                                  {' '}
                                  <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                    +
                                  </section>
                                  <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                    ₹{partCTotal?.toLocaleString('en-IN')}
                                  </section>{' '}
                                  <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                    +
                                  </section>
                                  <section className="px-2 d-md font-bold text-[12px] text-[#0000008c] ">
                                    ₹{partDTotal?.toLocaleString('en-IN')}
                                  </section>{' '}
                                </>
                              )}
                              <section className=" d-md font-bold text-[12px] text-[#0000008c] ">
                                =
                              </section>
                              <section className="px-2 d-md font-bold text-[16px] text-[#000000e6] leading-none">
                                ₹{netTotal?.toLocaleString('en-IN')}
                              </section>
                            </section>
                          </section>
                        </div>
                        <div className=" mt-4 ">
                          <section className="flex p-2">
                            <h1 className="text-bodyLato text-center text-gray-800 font-bold text-[14px] border-b ">
                              PAYMENT SCHEDULE
                            </h1>
                          </section>
                          <table className="w-full border-b border-dashed">
                            <thead className="">
                              {' '}
                              <tr className=" h-8  border-none bg-[#f3fff2]  ">
                                <th className="w-[50%] px-2   text-left  tracking-wide uppercase d-xsm  ">
                                  Particulars
                                </th>
                                <th className="w-[30%] px-2   text-left  tracking-wide uppercase d-xsm ">
                                  Payment Timeline
                                </th>
                                <th className="w-[20%] px-2   text-right  tracking-wide uppercase d-xsm ">
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
                                  <th className=" px-2  text-[12px] text-left text-gray-700 ">
                                    {d1?.stage?.label}
                                  </th>
                                  <td className="text-[12px] px-2 py-2  text-right text-gray-700 ">
                                    <CustomDatePicker
                                      id="bmrdaStartDate"
                                      name="bmrdaStartDate"
                                      className="pl- px-1 h-8 rounded-md mt-1 min-w-[200px] inline text-[#0091ae] flex bg-grey-lighter text-grey-darker border border-[#cccccc] px-2"
                                      selected={d1?.schDate}
                                      onChange={(date) => {
                                        // formik.setFieldValue(
                                        //   'bmrdaStartDate',
                                        //   date.getTime()
                                        // )
                                        console.log('data', date.getTime())
                                        setStartDate(date)
                                        handlePSdateChange(inx, date.getTime())
                                      }}
                                      timeFormat="HH:mm"
                                      injectTimes={[
                                        setHours(setMinutes(d, 1), 0),
                                        setHours(setMinutes(d, 5), 12),
                                        setHours(setMinutes(d, 59), 23),
                                      ]}
                                      //dateFormat="MMMM d, yyyy"
                                      dateFormat="MMM dd, yyyy"
                                    />
                                    <span className="text-right">
                                      {d1?.description}
                                    </span>
                                  </td>

                                  <td className="text-[12px] px-2  text-right text-gray-800 ">
                                    ₹{d1?.value?.toLocaleString('en-IN')}
                                  </td>
                                </tr>
                              ))}

                              <tr className="h-[32px]">
                                <th className="text-[12px] px-2  text-left text-gray-800 ">
                                  Total Unit Value Rs.:
                                </th>
                                <td className="text-[12px] px-2  text-right text-gray-400 "></td>
                                <th className="text-[12px] px-2  text-right text-gray-800 ">
                                  ₹{netTotal?.toLocaleString('en-IN')}
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
              </PDFExport>
            )}
          </Formik>
          <div className="mt-5 left-0 text-right md:space-x-3 md:block flex flex-col-reverse py-3 mr-6 flex flex-col mt-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
            <button
              className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
              onClick={() => {
                submitManagerApproval('rejected')
              }}
              // disabled={loading}
            >
              {'Reject'}
            </button>
            <button
              className="bg-green-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
              // disabled={loading}
              onClick={() => {
                // mark man_cs_approval as true
                console.log('node aa is ')
                submitManagerApproval('approved')
              }}
            >
              {'Approvee'}
            </button>
          </div>
        </div>
      )}

      {/* {pdfPreview && (
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
        />
      )} */}
    </div>
  )
}

export default CostBreakUpEditor
