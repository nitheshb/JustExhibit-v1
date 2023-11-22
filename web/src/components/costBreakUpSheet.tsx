/* eslint-disable no-constant-condition */
/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, createRef, useRef } from 'react'
import { ChevronRightIcon,  } from '@heroicons/react/solid'
import { Dialog } from '@headlessui/react'
import { RadioGroup } from '@headlessui/react'
import { Checkbox } from '@mui/material'
import { Timestamp } from 'firebase/firestore'
import { Form, Formik, Field } from 'formik'
import jsPDF from 'jspdf'
import { useSnackbar } from 'notistack'
import { renderToString } from 'react-dom/server'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import * as Yup from 'yup'

import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import { useRouterStateSetter } from '@redwoodjs/router/dist/router-context'

import { apartUnitChargesMock } from 'src/constants/projects'
import {
  getAllProjects,
  steamUsersListByRole,
  updateLeadCostSheetDetailsTo,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'
import CostBreakUpPdf from 'src/util/costBreakUpPdf'
import CostBreakUpPdfAll from 'src/util/costBreakUpPdf_all'
import CostBreakUpPdfConstruct from 'src/util/costBreakUpPdf_construct'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'
import { TextField2 } from 'src/util/formFields/TextField2'
import { TextFieldFlat } from 'src/util/formFields/TextFieldFlatType'
import PdfInvoiceGenerator from 'src/util/PdfInvoiceGenerator'

import AddApplicantDetails from './AddApplicantDetails'
import BlockingUnitForm from './BlockingUnitForm'
import AddPaymentDetailsForm from './FinanceModule/BookingPaymentForm'
import Loader from './Loader/Loader'
import PaymentScheduleSheet from './paymentScheduleSheet'
import SiderForm from './SiderForm/SiderForm'
import UnitTransactionForm from './UnitBillTransactionForm'

const CostBreakUpSheet = ({
  selMode,
  title,
  leadDetailsObj1,
  projectDetails,
  selPhaseObj,
  selUnitDetails,
  unitDetails,
  dialogOpen,
  setShowCostSheetWindow,
  actionMode,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const ref = createRef()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [costSheetA, setCostSheetA] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [initialValuesA, setInitialValuesA] = useState({})
  const [newSqftPrice, setNewSqftPrice] = useState(0)
  const [onStep, setOnStep] = useState('costsheet')
  const [soldPrice, setSoldPrice] = useState(0)
  const [csMode, setCsMode] = useState('plot_cs')
  const [showGstCol, setShowGstCol] = useState(true)

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

  const pdfExportComponent = useRef(null)
  const pdfExportComponentConstruct = useRef(null)

  useEffect(() => {
    console.log('new cost sheet value is ', newPlotCsObj, newPlotCostSheetA)
  }, [newPlotCsObj, newPlotCostSheetA])
  useEffect(() => {
    if (actionMode === 'costSheetMode') {
      setStatusListA([
        {
          label: 'Cost sheet',
          value: 'costsheet',
          logo: 'RefreshIcon',
          color: ' bg-violet-500',
        },
      ])
      setOnStep('costsheet')
    } else if (actionMode === 'unitBlockMode') {
      setStatusListA([

        {
          label: 'Cost sheet',
          value: 'costsheet',
          logo: 'RefreshIcon',
          color: ' bg-violet-500',
        },
        {
          label: 'Customer details',
          value: 'customerDetails',
          logo: 'FireIcon',
          color: ' bg-violet-500',
        },
        {
          label: 'Block Unit',
          value: 'blocksheet',
          logo: 'DuplicateInactiveIcon',
          color: ' bg-violet-500',
        },
      ])
      setOnStep('blocksheet')
    } else if (actionMode === 'unitBookingMode') {
      setStatusListA([
        {
          label: 'Customer info',
          value: 'customerDetails',
          logo: 'FireIcon',
          color: ' bg-violet-500',
        },

        {
          label: 'Cost sheet',
          value: 'costsheet',
          logo: 'RefreshIcon',
          color: ' bg-violet-500',
        },

        {
          label: 'Payment schedule',
          value: 'payment_schedule',
          logo: 'FireIcon',
          color: ' bg-violet-500',
        },
        {
          label: 'Payment',
          value: 'booksheet',
          logo: 'FireIcon',
          color: ' bg-violet-500',
        },
      ])
      setOnStep('costsheet')
    }
  }, [actionMode])

  useEffect(() => {
    console.log('macho is ', projectDetails)
    const { projectType } = projectDetails
    if (projectType.name === 'Plots') {
      setCsMode('plot_cs')
    } else {
      setCsMode('both')
    }
    // projectDetails
  }, [])

  useEffect(() => {
    console.log('new customer object x', title, leadDetailsObj1)
    if (leadDetailsObj1) {
      console.log('it exists')
    } else {
      leadDetailsObj1 = {}
    }
  }, [leadDetailsObj1])

  useEffect(() => {
    console.log('phase details are ', selPhaseObj)
    const {
      additonalChargesObj,
      ConstructOtherChargesObj,
      payment_scheduleObj,
    } = selPhaseObj
    console.log('unit details', selUnitDetails)
    const { uid } = selUnitDetails
    const y = leadDetailsObj1[`${uid}_cs`]?.newSqftPrice || ''

    const x = [
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
        charges: Number.isFinite(y)
          ? selUnitDetails?.super_built_up_area * y
          : selUnitDetails?.super_built_up_area * selUnitDetails?.rate_per_sqft,
        // charges: y,
        gst: {
          label: '0',
          value: '0',
        },
      },
    ]
    // const x = costSheetA
    let merged = []
    try {
      if (leadDetailsObj1) {
        if (leadDetailsObj1[`${uid}_cs`]['costSheetA']) {
          const removeFulCostFieldA = leadDetailsObj1[`${uid}_cs`][
            'costSheetA'
          ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
          merged = [...x, ...removeFulCostFieldA]
          console.log('pending here todo')
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
      console.log('initial values ', x, d?.charges, d)
      initformValues[`${x}`] = d?.charges
    })
    console.log('initial values ', initformValues)
    setInitialValuesA(initformValues)

    setCostSheetA(x)
    console.log('phase details are ', merged, costSheetA)
  }, [selPhaseObj, leadDetailsObj1])

  // useEffect(() => {
  //   console.log('value os costsheet', costSheetA)
  // }, [costSheetA])

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [hover, setHover] = useState(false)
  const [hoverId, setHoverID] = useState(1000)
  const [hoverTasId, setHoverTasId] = useState(2000)
  const [streamCoveredA, setStreamCoveredA] = useState([])
  const [streamCurrentStatus, setStreamCurrentStatus] = useState('new')
  const [streamfrom, setStreamFrom] = useState('')
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }

  const initialState = initialValuesA
  const validate = Yup.object({
    // blockReason: Yup.number()
    //   .max(15, 'Must be 15 characters or less')
    //   .required('Name is Required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  const moveStep = (stepper) => {
    setOnStep(stepper)
  }

  const calTotal = (costSheetA, formik) => {
    const total = costSheetA.reduce(
      (partialSum, obj) =>
        partialSum + Number(formik.values[`${obj['component'].value}`]),
      0
    )
    setSoldPrice(total)
    return total
  }
  const hoverEffectFun = (id) => {
    setHoverID(id)
  }
  const hoverEffectTaskFun = (id) => {
    setHoverTasId(id)
  }
  const styleO = {
    normal: {
      width: '100%',
      height: '28px',
      borderWidth: '3px 10px 3px 3px',
      boxSizing: 'border-box',
      borderStyle: 'solid',
      verticalAlign: 'middle',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      transition: 'all 250ms ease',
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',

      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

      color: 'rgb(51, 51, 51)',
      dataBaseColor: '#2fc6f6',
    },
    completed: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%237BD500%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%237BD500%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },

    hover: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%2347E4C2%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },
  }
  const onSubmit = async (data, resetForm) => {
    console.log('customer sheet form', costSheetA, selUnitDetails, data)

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
    console.log('${uid}', newCostSheetA, uid)
    // newCostSheetA.push(x)
    // i need unit_uID & unit details
    const xData = {}

    xData[`${uid}${'_cs'}`] = {
      oldUnitDetailsObj: selUnitDetails,
      newSqftPrice: Number(newSqftPrice),
      soldPrice: Number(soldPrice),
      costSheetA: costSheetA,
    }

    updateLeadCostSheetDetailsTo(
      orgId,
      id,
      xData,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )
    setOnStep('customerDetails')
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    moveStep(newStatus)
  }
  return (
    <>
      <section className="  bg-black">
        <div className="max-w-5xl mx-auto py-  bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className=" mt-">
                <div className=" flex flex-row justify-center items-center ">
                  <div
                    className="flex flex-row  justify-between  py-3 px-3  mt-[0.5px] mb-0 rounded-xs bg-[#F2F5F8]"
                    style={{ flex: '4 0 100%' }}
                  >
                    <div className="flex flex-row mt-[1px]">
                      {StatusListA.map((statusFlowObj, i) => (
                        <span
                          key={i}
                          className={`font-bodyLato text-sm font-normal px-2 py-[4px] mr-1 cursor-pointer rounded-full ${onStep === statusFlowObj.value ? 'bg-blue-500 text-white' : ''} `}
                          onClick={() => setStatusFun(i, statusFlowObj.value)}
                        >
                          <section className="flex flex-row">
                            <span className= {`w-4 h-4 mt-[3px] text-[9px] mr-1 flex justify-center items-center rounded-full  border ${onStep === statusFlowObj.value ? 'bg-blue-500 text-white' : ''} `}>
                              {i + 1}
                            </span>
                            <div>{statusFlowObj.label}</div>
                          </section>
                        </span>
                      ))}
                    </div>
                    {/* <span className=" w-6 h-6 mt-[3px] text-[9px] mr-2 cursor-pointer flex justify-center items-center rounded-full  border bg-blue-500 text-white">
                    <ChevronRightIcon
                            className="w-3 h-3 "
                            aria-hidden="true"
                          />
                    </span> */}
                  </div>
                </div>


              </div>

              {['costsheet', 'allsheets', 'payment_schedule'].includes(onStep) && (
                <div className="">

                  <div className="flex flex-col mx-0 bg-[#F8FAFC] ">

                    <div className="">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialState}
                        validationSchema={validate}
                        onSubmit={(values, { resetForm }) => {
                          console.log('i was clicked', values)
                          onSubmit(values, resetForm)
                        }}
                      >
                        {(formik) => (
                          <Form ref={ref} className="">
                            <section
                              className="bg-[#fff] rounded-md border m-2"
                              style={{
                                boxShadow: '0 1px 12px #f2f2f2',
                              }}
                            >
                              {csMode === 'both' && (
                                <CostBreakUpPdfAll
                                  projectDetails={projectDetails}
                                  csMode={csMode}
                                  // costSheetA={costSheetA}
                                  pdfExportComponent={
                                    pdfExportComponentConstruct
                                  }
                                  selPhaseObj={selPhaseObj}
                                  leadDetailsObj1={leadDetailsObj1}
                                  selUnitDetails={selUnitDetails}
                                  setNewConstructCsObj={setNewConstructCsObj}
                                  newConstructCsObj={newConstructCsObj}
                                  newConstructCostSheetA={
                                    newConstructCostSheetA
                                  }
                                  setCostSheetA={setNewConstructCostSheetA}
                                  costSheetA={newConstructCostSheetA}
                                  setNewPS={setNewConstructPS}
                                  setNewConstructPS={setNewConstructPS}
                                  newConstructPS={newConstructPS}
                                />
                              )}
                              {/*   const [netTotal, setNetTotal] = useState(0)
  const [partATotal, setPartATotal] = useState(0)
  const [partBTotal, setPartBTotal] = useState(0) */}
                              {csMode === 'plot_cs' && (
                                <CostBreakUpPdf
                                  projectDetails={projectDetails}
                                  csMode={csMode}
                                  // costSheetA={costSheetA}
                                  pdfExportComponent={pdfExportComponent}
                                  selPhaseObj={selPhaseObj}
                                  leadDetailsObj1={leadDetailsObj1}
                                  selUnitDetails={selUnitDetails}
                                  setNewPlotCsObj={setNewPlotCsObj}
                                  newPlotCsObj={newPlotCsObj}
                                  costSheetA={newPlotCostSheetA}
                                  setAddiChargesObj={setNewAdditonalChargesObj}
                                  setCostSheetA={setNewPlotCostSheetA}
                                  setNewPS={setNewPlotPS}
                                  newPlotPS={newPlotPS}
                                  showGstCol={showGstCol}
                                  netTotal={netTotal}
                                  setNetTotal={setNetTotal}
                                  partATotal={partATotal}
                                  partBTotal={partBTotal}
                                  setPartATotal={setPartATotal}
                                  setPartBTotal={setPartBTotal}
                                  showOnly = {onStep}
                                />
                              )}
                              {csMode === 'construct_cs' && (
                                <CostBreakUpPdfConstruct
                                  projectDetails={projectDetails}
                                  csMode={csMode}
                                  // costSheetA={costSheetA}
                                  pdfExportComponent={
                                    pdfExportComponentConstruct
                                  }
                                  selPhaseObj={selPhaseObj}
                                  leadDetailsObj1={leadDetailsObj1}
                                  selUnitDetails={selUnitDetails}
                                  setNewConstructCsObj={setNewConstructCsObj}
                                  newConstructCsObj={newConstructCsObj}
                                  newConstructCostSheetA={
                                    newConstructCostSheetA
                                  }
                                  setCostSheetA={setNewConstructCostSheetA}
                                  costSheetA={newConstructCostSheetA}
                                  setNewPS={setNewConstructPS}
                                  setNewConstructPS={setNewConstructPS}
                                  newConstructPS={newConstructPS}
                                />
                              )}
                            </section>

                            <div className="flex flex-col mt-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
                              <div className="mt-2 text-right md:space-x-3 md:block flex flex-col-reverse mb-3">
                                <div className="inline-block">
                                  <PdfInvoiceGenerator
                                    user={user}
                                    selUnitDetails={selUnitDetails}
                                    myObj={newPlotCostSheetA}
                                    newPlotPS={newPlotPS}
                                    myAdditionalCharges={newAdditonalChargesObj}
                                    netTotal={netTotal}
                                    setNetTotal={setNetTotal}
                                    partATotal={partATotal}
                                    partBTotal={partBTotal}
                                    setPartATotal={setPartATotal}
                                    setPartBTotal={setPartBTotal}
                                    projectDetails={projectDetails}
                                    leadDetailsObj1={leadDetailsObj1}
                                  />
                                </div>
                                <button
                                  className="mb-2 md:mb-0  hover:scale-110 focus:outline-none              hover:bg-[#5671fc]
                                  bg-gradient-to-r from-indigo-400 to-cyan-400
                                  text-black
                                  border duration-200 ease-in-out
                                  transition
                                   px-5 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-green-500"
                                  type="submit"
                                  disabled={loading}
                                  // onClick={() => submitFormFun(formik)}
                                >
                                  {/* {loading && <Loader />} */}
                                  Save
                                </button>
                               {['unitBookingMode', 'unitBlockMode'].includes(actionMode) && <button
                                  className="mb-2 mr-2 md:mb-0  hover:scale-110 focus:outline-none              hover:bg-[#5671fc]
                                  bg-gradient-to-r from-indigo-400 to-cyan-400
                                  text-black

                                  border duration-200 ease-in-out
                                  transition
                                   px-5 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-green-500"
                                  type="submit"
                                  disabled={loading}
                                  // onClick={() => submitFormFun(formik)}
                                >
                                  {/* {loading && <Loader />} */}
                                 <span>Save & Next</span>
                                </button> }
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              )}

              {/* PaymentScheduleSheet */}
              {/* {['payment_sch', 'allsheets'].includes(onStep) && (
                <PaymentScheduleSheet
                  title="Booking Form"
                  leadDetailsObj2={leadDetailsObj1}
                  selUnitDetails={selUnitDetails}
                  phase={selPhaseObj}
                  soldPrice={soldPrice}
                />
              )} */}
              {['customerDetails', 'allsheets'].includes(onStep) && (
                <AddApplicantDetails
                  title="Booking Form"
                  selUnitDetails={selUnitDetails}
                  leadDetailsObj2={leadDetailsObj1}
                  setOnStep={setOnStep}
                  source="Booking"
                  currentMode= {actionMode}
                />
              )}
              {['booksheet', 'allsheets'].includes(onStep) && (
                <AddPaymentDetailsForm
                  title={'undefined'}
                  dialogOpen={undefined}
                  phase={selPhaseObj}
                  leadDetailsObj2={leadDetailsObj1}
                  selUnitDetails={selUnitDetails}
                  newPlotCsObj={newPlotCsObj}
                  newPlotCostSheetA={newPlotCostSheetA}
                  newConstructCsObj={newConstructCsObj}
                  newConstructCostSheetA={newConstructCostSheetA}
                  newAdditonalChargesObj={newAdditonalChargesObj}
                  newConstructPS={newConstructPS}
                  newPlotPS={newPlotPS}
                  projectDetails={projectDetails}
                />
              )}

              {['blocksheet'].includes(onStep) && (
                <BlockingUnitForm
                  title="Blocking Form"
                  leadDetailsObj2={leadDetailsObj1}
                  selUnitDetails={selUnitDetails}
                />
              )}
              {['Detail View'].includes(onStep) && <UnitTransactionForm />}
              <div className="mt-8 p-4">
                {/* <div>
            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Full Name</div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="First Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Last Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Username</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Your Email</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
            </div>
        </div> */}
              </div>
            </div>
          </article>
        </div>
      </section>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title="costSheetPreview"
        widthClass="max-w-4xl"
        csMode={csMode}
        projectDetails={projectDetails}
        pdfExportComponent={pdfExportComponent}
        selPhaseObj={selPhaseObj}
        headerContent={{}}
        leadDetailsObj={leadDetailsObj1}
        selUnitDetails={selUnitDetails}
        newPlotCsObj={newPlotCsObj}
        costSheetA={costSheetA || newPlotCostSheetA || []}
        newPlotCostSheetA={costSheetA || newPlotCostSheetA || []}
        // setNewPlotCsObj={setNewPlotCsObj}
        // setCostSheetA={setNewPlotCostSheetA}
        // setNewPS={setNewPlotPS}
        // newPlotPS={newPlotPS}
        // showGstCol={showGstCol}
      />
    </>
  )
}

export default CostBreakUpSheet
