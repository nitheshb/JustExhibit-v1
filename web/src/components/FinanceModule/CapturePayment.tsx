/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect, useRef } from 'react'

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { AttachFile } from '@mui/icons-material'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { format } from 'date-fns'
import { setHours, setMinutes } from 'date-fns'
import { arrayUnion } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Form, Formik, ErrorMessage, useField } from 'formik'
import { useSnackbar } from 'notistack'
import DatePicker from 'react-datepicker'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import { useParams } from '@redwoodjs/router'

import Confetti from 'src/components/shared/confetti'
import { paymentMode, statesList } from 'src/constants/projects'
import {
  addPaymentReceivedEntry,
  addPaymentReceivedEntrySup,
  capturePaymentS,
  createBookedCompany,
  createNewCustomerS,
  getProject,
  steamBankDetailsList,
  steamUsersProjAccessList,
  streamMasters,
  streamProjectCSMaster,
  updateLeadStatus,
  updateEventsStallBookCounts,
  updateStallAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import { TextField } from 'src/util/formFields/TextField'
import { TextField2 } from 'src/util/formFields/TextField2'
import { TextFieldFlat } from 'src/util/formFields/TextFieldFlatType'
import PdfReceiptGenerator from 'src/util/PdfReceiptGenerator'
import RupeeInWords from 'src/util/rupeeWords'

import NoBorderDropDown from '../comps/noBorderDropDown'
import Loader from '../Loader/Loader'
import { validate_capturePayment } from '../Schemas'
import PdfInvoiceGenerator from 'src/util/PdfInvoiceGenerator'

const CaptureUnitPayment = ({
  title,
  customerInfo,
  selUnitDetails,
  leadDetailsObj2,
  onSubmitFun,
  bookCompSteps,
  bookCurentStep,
  dialogOpen,
  newPlotCsObj,
  newPlotCostSheetA,
  newPlotPS,
  newConstructPS,
  newConstructCsObj,
  newConstructCostSheetA,
  phase,
  projectDetails,
  stepIndx,
  StatusListA,
}) => {
  const d = new window.Date()

  const { user } = useAuth()
  const { orgId, displayName, email, phone } = user
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const [bookingProgress, setBookingProgress] = useState(false)
  const [bankDetailsA, setBankDetailsA] = useState([])
  const [paymentScheduleA, setPaymentScheduleA] = useState([])
  const [payingForA, setPayingForA] = useState([])
  const [creditNotersA, setCreditNoters] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])
  const [statesListA, setStatesList] = useState([])
  const [costSheetA, setCostSheetA] = useState([])
  const [newSqftPrice, setNewSqftPrice] = useState(0)
  const [partATotal, setPartATotal] = useState(0)
  const [netTotal, setNetTotal] = useState(0)

  // const [formattedValue, setFormattedValue] = useState('');

  // const handleChange = (e) => {
  //   const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  //   const formatted = value ? `Rs.${parseInt(value, 10).toLocaleString('en-IN')}` : '';
  //   setFormattedValue(formatted);
  // };

  const [startDate, setStartDate] = useState(d)

  const [paymentModex, setPaymentModex] = useState('cheque')
  const [payementDetails, setPayementDetails] = useState([])
  const [files, setFiles] = useState([])

  const [commentAttachUrl, setCommentAttachUrl] = useState('')
  const [cmntFileType, setCmntFileType] = useState('')
  const [amount, setAmount] = useState(0)

  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()
  const bankData = {}
  const confettiRef = useRef(null)

  const handleClick = () => {
    console.log(' projectDetails', projectDetails, selUnitDetails)
    confettiRef.current.fire()
  }

  useEffect(() => {
    console.log('unit details are ', selUnitDetails, newPlotPS)

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
        others: 0,
        charges: 0,
        TotalSaleValue: 0,
        gstValue: 0,
        gst: {
          label: 12,
          value: 0,
        },
        TotalNetSaleValueGsT: 0,
      },
    ]
    setCostSheetA(x)
  }, [])

  useEffect(() => {
    getProjectFun()
  }, [])
  useEffect(() => {
    // const unsubscribe = streamMasters(
    //   orgId,
    //   (querySnapshot) => {
    //     const bankA = querySnapshot.docs.map((docSnapshot) => {
    //       const x = docSnapshot.data()
    //       return x
    //     })

    //     console.log('fetched users list is', bankA)
    //     // step 3: filter and set values to each title
    //     if (bankA?.length > 0) {
    //       const dA = bankA.filter((item) => item.title == 'State')

    //       setStatesList(
    //         dA.sort((a, b) => {
    //           return a.order - b.order
    //         })
    //       )
    //     }
    //   },
    //   () => {}
    // )

    // return unsubscribe
    setStatesList(statesList)
  }, [])
  useEffect(() => {
    let fullPs = []
    const newConstructPSA = newConstructPS || []
    if (newPlotPS) {
      fullPs = [...newPlotPS, ...newConstructPSA]
    } else {
      fullPs = selUnitDetails?.fullPs
    }
    setPaymentScheduleA(
      fullPs?.map((user) => {
        user.label = user?.stage?.label
        return user
      })
    )
    if (newPlotPS?.length > 0) {
      setPayingForA([newPlotPS[0]])
    }
  }, [newPlotPS])

  const changeOverallCostFun = async (inx, payload, newValue) => {
    const y = costSheetA
    let total = 0
    let gstTotal = 0
    // const gstTaxForProjA = selPhaseObj?.partATaxObj?.filter(
    //   (d) => d?.component.value === 'sqft_cost_tax'
    // )
    const gstTaxIs = 0.18

    // const plcGstForProjA = selPhaseObj?.partATaxObj?.filter(
    //   (d) => d?.component.value === 'plc_tax'
    // )
    if ('plot_cs' === 'plot_cs') {
      total = Math.round(
        selUnitDetails?.area?.toString()?.replace(',', '') * newValue
      )
      gstTotal = Math.round(total * gstTaxIs)
    } else {
      total = Math.round(
        Number(selUnitDetails?.super_built_up_area || selUnitDetails?.area) *
          newValue
      )
      gstTotal = Math.round(total * (gstTaxIs / 100))
    }

    y[inx].charges = newValue
    y[inx].TotalSaleValue = total
    y[inx].gst.label = gstTaxIs
    // y[inx].gst.value = gstTotal
    y[inx].gstValue = gstTotal
    y[inx].TotalNetSaleValueGsT = total + gstTotal
    console.log('gen costSheetA', y)
    console.log(costSheetA)

    setCostSheetA(y)
    setTotalFun()
  }
  const setTotalFun = async () => {
    const partATotal = costSheetA.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )

    setPartATotal(partATotal)

    setNetTotal(partATotal || 0)
  }
  const getProjectFun = async () => {
    const additionalUserInfo = await getProject(orgId, selUnitDetails?.pId)
    const bankA = await additionalUserInfo?.bankAccounts?.map((user) => {
      user.label = user?.accountName
      user.value = user?.accountNo
    })
    await console.log(
      'fetched users list is ==>',
      additionalUserInfo,
      additionalUserInfo?.bankAccounts,
      additionalUserInfo?.bankAccounts?.map((user) => {
        user.label = user?.accountName
        user.value = user?.accountNo
        return user
      })
    )

    await setBankDetailsA(
      additionalUserInfo?.bankAccounts?.map((user) => {
        user.label = user?.accountName
        user.value = user?.accountNo
        return user
      })
    )
    await console.log('selected value is xxx ', additionalUserInfo)
  }

  useEffect(() => {
    const unsubscribe = steamUsersProjAccessList(
      orgId,
      (querySnapshot) => {
        const bankA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        bankA.map((user) => {
          user.label = user?.name
          user.value = user?.email
        })
        console.log('fetched users list is', bankA)
        setCreditNoters([...bankA])
      },
      { pId: [selUnitDetails?.pId] },
      (error) => setCreditNoters([])
    )

    return unsubscribe
  }, [])
  const handleFileUploadFun = async (file, type) => {
    console.log('am i inside handle FileUpload')
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${'taskFiles'}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          // setProgress(prog)
          file.isUploading = false
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // createAttach(orgId, url, by, file.name, id, attachType)
            file.url = url
            // setCmntFileType(file.name.split('.').pop())
            // setFiles([...files, file])

            setCommentAttachUrl(url)
            return url
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  const capturePayment = async (custNo, data, resetForm) => {
    // enter payment log
    data.category = 'BookingAdvance'
    const x = await capturePaymentS(
      orgId,
      true,
      projectDetails?.uid,
      selUnitDetails?.uid,
      custNo,
      leadDetailsObj2,
      data,
      user?.email,
      enqueueSnackbar
    )

    return x
  }
  const onSubmitSupabase = async (data, resetForm) => {
    console.log('inside supabase support', data)
    let y = {}
    y = data

    await handleFileUploadFun(data?.fileUploader, 'panCard1')
    const z = await commentAttachUrl
    const companyDocId = uuidv4()

    const stallPayload = {
      companyName: data?.companyName,
      relation1: data?.relation1,
      relation2: data?.relation2,
      co_Name1: data?.co_Name1 || '',
      co_Name2: data?.co_Name2 || '',
      countryCode1: data?.countryCode1 || '',
      countryCode2: data?.countryCode2 || '',
      phoneNo1: data?.phoneNo1|| '',
      phoneNo2: data?.phoneNo2|| '',
      email1: data?.email1|| '',
      email2: data?.email2|| '',
      address1: data?.address1|| '',
      city1: data?.city1|| '',
      state1: data?.state1|| '',
      countryName1: data?.countryName1|| '',
      pincode1: data?.pincode1|| '',
      charges: costSheetA[0]['charges'],
      gstValue: costSheetA[0]['gstValue'],
      TotalNetSaleValueGsT: netTotal,
      T_total: netTotal,
      T_paid: data?.amount,
      T_balance: netTotal - data?.amount,
      mode: data?.mode,
      receive_by: user?.email,
      // date_of_entry: data?.dated,
      txt_dated: data?.dated,
      companyDocId: companyDocId,
      status: 'booked',
      // status: data?.status || 'review',
      // payReason: data?.payReason,
      // totalAmount: data?.amount,
      // bank_ref: data?.bank_ref_no,
    }
    // costSheetA, setCostSheetA
    console.log('submitting values are ')
    setPayementDetails(data)

    // create customer
    // capture payment entry
    // update stall status as book
    // update project agreegations

    // createBookedCustomer
    // capturePayment
    // updateUnitAsBooked
    // updateProjectCounts

    // 1
    const x2 = await createBookedCompany(
      orgId,
      companyDocId,
      {
        companyName: data?.companyName,
        eventName: leadDetailsObj2?.Event || projectDetails?.eventName,
        ProjectId: leadDetailsObj2?.ProjectId || selUnitDetails?.pId,
        // ...customerDetailsObj,
        relation1: data?.relation1,
        relation2: data?.relation2,
        co_Name1: data?.co_Name1 || '',
      co_Name2: data?.co_Name2 || '',
      countryCode1: data?.countryCode1 || '',
      countryCode2: data?.countryCode2 || '',
      phoneNo1: data?.phoneNo1|| '',
      phoneNo2: data?.phoneNo2|| '',
      email1: data?.email1|| '',
      email2: data?.email2|| '',
      address1: data?.address1|| '',
      city1: data?.city1|| '',
      state1: data?.state1|| '',
      countryName1: data?.countryName1|| '',
      pincode1: data?.pincode1|| '',
        T_total: netTotal,
        T_paid: data?.amount,
        T_balance: netTotal - data?.amount,
        booked_on: data?.dated,
        //paymentScheduleObj
      },
      user?.email,
      enqueueSnackbar
    )
    // 2 capture payment entry
    const x = await capturePaymentS(
      orgId,
      true,
      projectDetails?.uid,
      selUnitDetails?.uid,
      companyDocId,
      leadDetailsObj2,
      data,
      user?.email,
      enqueueSnackbar
    )

    // 3 update stall as booked
    await updateStallAsBooked(
      orgId,
      selUnitDetails?.pId,
      selUnitDetails?.uid,
      stallPayload,
      user?.email,
      enqueueSnackbar,
      resetForm
    )

    // 4 update event counts
    updateEventsStallBookCounts(
      orgId,
      selUnitDetails?.pId,
      { soldVal: netTotal, t_collect: amount },
      user?.email,
      enqueueSnackbar
    )

    return
    await onSubmitFun(y, resetForm)

    await confettiRef?.current?.fire()

    return
    // get booking details, leadId, unitDetails,
    //  from existing object send values of
    //  booking
    // copy unit data as it is
    // copy lead data as it is
    //  unit details

    // 1)Make an entry to finance Table {source: ''}
    // 2)Create new record in Customer Table
    // 3)Update unit record with customer record and mark it as booked
    // 4)update lead status to book

    //   const x = await addDoc(collection(db, 'spark_leads'), data)
    // await console.log('x value is', x, x.id)

    const { uid } = selUnitDetails
    // 1)Make an entry to finance Table {source: ''}

    // create customer

    // update unit record with booked status

    // update payment schedule
    // log cost sheet
    // capture transaction
    // entry  payment log
    // entry payment sheet

    console.log('check this value ', user, leadDetailsObj2)
    const { Status } = leadDetailsObj2
    createNewCustomerS(
      orgId,
      projectDetails?.uid,
      selUnitDetails?.uid,
      leadDetailsObj2,
      Status,
      'booked',
      user?.email,
      enqueueSnackbar
    )

    return

    const x1 = await addPaymentReceivedEntrySup(
      orgId,
      uid,
      { leadId: 'id' },
      data,
      'leadsPage',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    // add phaseNo , projName to selUnitDetails
    // 2)Create('')

    // 3)Update unit record with customer record and mark it as booked

    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)
  }

  const onSubmit = async (data, resetForm) => {
    // get booking details, leadId, unitDetails,
    //  from existing object send values of
    //  booking
    // copy unit data as it is
    // copy lead data as it is
    //  unit details

    // 1)Make an entry to finance Table {source: ''}
    // 2)Create new record in Customer Table
    // 3)Update unit record with customer record and mark it as booked
    // 4)update lead status to book

    //   const x = await addDoc(collection(db, 'spark_leads'), data)
    // await console.log('x value is', x, x.id)

    const { uid } = selUnitDetails
    // 1)Make an entry to finance Table {source: ''}

    const x1 = await addPaymentReceivedEntry(
      orgId,
      uid,
      { leadId: 'id' },
      data,
      'leadsPage',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    // add phaseNo , projName to selUnitDetails
    // 2)Create('')

    // 3)Update unit record with customer record and mark it as booked

    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)
  }

  const datee = new Date().getTime()
  const initialState = {
    amount: bankData?.amount || '',
    towardsBankDocId: '',
    mode: bankData?.mode || paymentModex,
    payto: bankData?.payto || '',
    payReason: bankData?.payReason || '',
    bank_ref_no: bankData?.bank_ref_no || '',
    dated: bankData?.dated || datee,
    bookingSource: '',
    bookedBy: bankData?.bookedBy || email,
    status: 'review',
    fileUploader: '',
    companyName: '',
    customerName1: '',
    customerName2: '',
    relation1: customerInfo?.relation1 || {
      label: 'Mr',
      value: 'mr',
    },
    relation2: customerInfo?.relation2 || {
      label: 'Mr',
      value: 'mr',
    },

    co_Name1: '',
    co_Name2: '',

    phoneNo1: '',

    phoneNo2: '',

    email1: '',
    email2: '',
    dob1: datee,

    marital1: {
      label: 'Single',
      value: 'Single',
    },

    address1: '',

    city1: '',

    countryName1: '',

    pincode1: '',

    countryCode1: '',

    countryName2: '',

    pincode2: '',

    countryCode3: '',

    countryCode4: '',

    state1: '',
    state2: '',

    panNo1: '',
    panNo2: '',
    panDocUrl1: '',
    panDocUrl2: '',
    aadharNo1: '',
    aadharNo2: '',
    aadharUrl1: '',
    aadharUrl2: '',
    occupation1: '',
    occupation2: '',
    companyName1: '',
    designation1: '',
    designation2: '',
    annualIncome1: '',
    annualIncome2: '',

    companyName2: '',
  }

  // const validateSchema = Yup.object({
  // date: Yup.string().required('Bank Required'),
  // amount: Yup.string().required('Required'),
  // payto: Yup.string().required('Required'),
  // mode: Yup.string().required('Bank Required'),
  // drawnonbank: Yup.string().required('Required'),
  // bank_ref_no: Yup.string().required('Required'),
  // dated: Yup.string().required('Required'),
  // })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  const setDateFun = (date) => {
    setStartDate(date)
  }
  const bgImgStyle = {
    backgroundImage:
      'url("httpsss://images.unsplash.com/photo-1605106715994-18d3fecffb98?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dtest")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  const customPhoneNoFieldStyles = {
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    margin: '0',
    padding: '0',
    paddingLeft: '0.5rem',
  }
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div id="bg-img" className="flex  w-full flex-col" style={bgImgStyle}>
          {StatusListA?.length > 0 && (
            <section className="text-white text-right w-full  pr-5">
              {' '}
              {stepIndx} of {StatusListA?.length} steps
            </section>
          )}
          <div className="relative mx-4 max-h-[65%]  rounded-xl  px-2 pb-14 border ">
            {/* <div className="space-y-4 text-white">
              <h3 className="font-bold text-2xl">Confirm Booking</h3>

            </div> */}

            <div className="grid gap-8 grid-cols-1">
              <div className="flex flex-col ">
                <div className="mt-0">
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialState}
                    validationSchema={validate_capturePayment}
                    onSubmit={(values, { resetForm }) => {
                      console.log(values)

                      setBookingProgress(true)
                      onSubmitSupabase(values, resetForm)
                      console.log(values)
                    }}
                  >
                    {(formik, setFieldValue) => (
                      <Form>
                        <div className="form">
                          {/* Phase Details */}

                          <section className=" ">
                            <div className="w-full mx-auto ">
                              <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-white ">
                                <div className=" flex flex-row px-0 py-2  overflow-y-scroll overflow-auto no-scrollbar">
                                  <section className=" p- rounded-md ">
                                    <article className="mt-3">
                                      <div className="flex flex-row justify-between">
                                        <section className="flex flex-row">
                                          <span className="text-[38px] mt-[-16px]">
                                            🎊
                                          </span>
                                          <div className="inline">
                                            <div className="mt-[4px]">
                                              <label className="text-[22px] font-semibold text-[#053219]  text-sm  mb-1  ">
                                                {title === 'capturePayment'
                                                  ? 'Capture Payment'
                                                  : 'Booking Confirmation'}
                                                <abbr title="required"></abbr>
                                              </label>
                                            </div>
                                            {/* <div className="border-t-4 rounded-xs w-100 border-[#8B5CF6]"></div> */}
                                          </div>
                                        </section>
                                        <section className="flex flex-row justify-between">

                                        <div className="inline-block mt-4 ml-4">
                                      <PdfInvoiceGenerator
                                        user={user}
                                        selUnitDetails={selUnitDetails}
                                        myObj={newPlotCostSheetA}
                                        newPlotPS={newPlotPS}

                                        netTotal={netTotal}
                                        setNetTotal={setNetTotal}
                                        partATotal={partATotal}
                                        partBTotal={0}
                                        setPartATotal={setPartATotal}
                                        projectDetails={{}}
                                      />
                                    </div>
                                          <div className="flex flex-col mr-2 mt-2">
                                            {/* <h6 className="text-blueGray-400 text-sm mt- ml-6 mb- font-weight-[700]  font-uppercase">
                                              Payment
                                            </h6> */}
                                            <span className="text-center text-[13px] font-normal">
                                              {format(new Date(), 'dd-MMMM-yy')}
                                            </span>
                                          </div>
                                        </section>
                                      </div>
                                      <hr className="mt-1 border-b-1 border-blueGray-300" />
                                    </article>
                                    {!bookingProgress && (
                                      <section>
                                        <div className="flex flex-wrap mt-3">
                                          <div className="justify-center w-full mx-auto"></div>

                                          <section className="border rounded-md w-full lg:w-12/12 mx-3 mb-3">
                                            {paymentModex != 'credit_note' && (
                                              <div className="border-y-1 rounded-t-md  overflow-hidden ">
                                                <table className="min-w-full divide-y ">
                                                  <thead>
                                                    <tr className="h-8 mb-1 border-none w-[100%] bg-[#E8E6FE] text-[#0D027D]  font-[600] ">
                                                      <th className="min-w-[35%] px-2  text-[12px] text-left text-[#0D027D]  tracking-wide">
                                                        Stall Particulars (
                                                        {selUnitDetails?.area?.toLocaleString(
                                                          'en-IN'
                                                        ) || 0}{' '}
                                                        sqft)
                                                      </th>
                                                      <th className="w-[15%] px-2 text-[12px] text-right  tracking-wide">
                                                        Rate/Sqft
                                                      </th>
                                                      <th
                                                        className={`${
                                                          !true ? 'hidden' : ''
                                                        } w-[15%] px-2 text-[12px] text-right  tracking-wide `}
                                                      >
                                                        Cost
                                                      </th>
                                                      <th
                                                        className={`${
                                                          !true ? 'hidden' : ''
                                                        }  w-[15%] px-2 text-[12px] text-right  tracking-wide `}
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
                                                    {costSheetA?.map(
                                                      (d1, inx) => (
                                                        <tr
                                                          key={inx}
                                                          className="py-1 my-2 h-[32px]  py-[24px]"
                                                        >
                                                          <th className="w-[40%] px-2 text-[12px] text-left  font-normal  ">
                                                            {
                                                              d1?.component
                                                                ?.label
                                                            }
                                                          </th>
                                                          <td className="w-[15%]  px-2 text-[12px] text-right  ">
                                                            <TextFieldFlat
                                                              label=""
                                                              className="w-[90%] text-[12px] text-right font-semibold border-b  border-[#B76E00]  pr-1 py-[4px] text-[#B76E00]"
                                                              name="ratePerSqft"
                                                              onChange={(e) => {
                                                                // setNewSqftPrice(e.target.value)
                                                                console.log(
                                                                  'iam hre'
                                                                )
                                                                if (
                                                                  d1?.component
                                                                    ?.value ===
                                                                  'unit_cost_charges'
                                                                ) {
                                                                  formik.setFieldValue(
                                                                    'unit_cost_charges',
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                if (
                                                                  d1?.component
                                                                    ?.value ===
                                                                  'plc_cost_sqft'
                                                                ) {
                                                                  formik.setFieldValue(
                                                                    'plc_cost_sqft',
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                setNewSqftPrice(
                                                                  Number(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                )
                                                                changeOverallCostFun(
                                                                  inx,
                                                                  d1,
                                                                  e.target.value
                                                                )
                                                              }}
                                                              // value={formik.values[`unit_cost_charges`]}
                                                              value={
                                                                d1?.charges
                                                              }
                                                              // value={newSqftPrice}
                                                              // type="number"
                                                            />
                                                            <TextFieldFlat
                                                              className=" hidden  "
                                                              label=""
                                                              name={
                                                                d1?.component
                                                                  ?.value
                                                              }
                                                              type="number"
                                                            />
                                                          </td>
                                                          <td
                                                            className={`${
                                                              !true
                                                                ? 'hidden'
                                                                : ''
                                                            } w-[15%] px-2 text-[12px] text-right text-slate-500  `}
                                                          >
                                                            ₹
                                                            {d1?.TotalSaleValue?.toLocaleString(
                                                              'en-IN'
                                                            )}
                                                          </td>
                                                          <td
                                                            className={`${
                                                              !true
                                                                ? 'hidden'
                                                                : ''
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
                                                      )
                                                    )}
                                                    {/* for construction cost  */}
                                                    <tr className=" border-[#fab56c]   h-[32px]">
                                                      <th className="w-[40%] text-[11px] font-semibold text-left text-[#0D027D] pl-2 ">
                                                        Stall Total (A)
                                                      </th>
                                                      <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 pr-3"></td>
                                                      <td
                                                        className={`${
                                                          !true ? 'hidden' : ''
                                                        } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-500 `}
                                                      >
                                                        ₹
                                                        {costSheetA
                                                          .reduce(
                                                            (partialSum, obj) =>
                                                              partialSum +
                                                              Number(
                                                                obj?.TotalSaleValue
                                                              ),
                                                            0
                                                          )
                                                          ?.toLocaleString(
                                                            'en-IN'
                                                          )}
                                                      </td>
                                                      <td
                                                        className={`${
                                                          !true ? 'hidden' : ''
                                                        } w-[15%] px-2 font-semibold  text-[12px] text-right text-gray-500 `}
                                                      >
                                                        ₹
                                                        {costSheetA
                                                          .reduce(
                                                            (partialSum, obj) =>
                                                              partialSum +
                                                              Number(
                                                                obj?.gstValue
                                                              ),
                                                            0
                                                          )
                                                          ?.toLocaleString(
                                                            'en-IN'
                                                          )}
                                                      </td>
                                                      <td className="w-[15%] px-2  font-semibold text-[12px] text-right  text-[#0D027D] ">
                                                        ₹
                                                        {partATotal?.toLocaleString(
                                                          'en-IN'
                                                        )}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                          </section>
                                          <section className="border rounded-md w-full lg:w-12/12 mx-3 mb-3">
                                            <article className="border-b w-full bg-[#F9FAFB] px-3 py-1 rounded-t-md">
                                              <span className="text-sm font-semibold text-gray-500">
                                                Payment Details
                                              </span>
                                            </article>
                                            <div className="w-full lg:w-12/12 px-3">
                                              <div className="relative w-full mb-3">
                                                <TextField2
                                                  label="Paying"
                                                  name="amount"
                                                  type="number"
                                                  // onChange={(e) => {
                                                  //   setAmount(e.target.value)
                                                  //   console.log('changed value is ', e.target.value)
                                                  //   formik.setFieldValue('amount', e.target.value)
                                                  // }}
                                                />
                                              </div>
                                            </div>

                                            <div className="text-xs px-3 mb-3">
                                              {' '}
                                              Paying{' '}
                                              <RupeeInWords
                                                amount={
                                                  formik?.values?.amount || 0
                                                }
                                              />
                                            </div>

                                            {/* section -2 */}
                                            <div className="w-full px-3 mb-4 mt-8 flex flex-row gap-x-6">
                                              {paymentMode.map((dat, i) => {
                                                return (
                                                  // <span
                                                  //   className={` mr-2 border rounded-xl px-2 py-2 cursor-pointer hover:bg-violet-400 hover:text-white text-sm ${
                                                  //     paymentModex == dat.value
                                                  //       ? 'bg-violet-400 text-white'
                                                  //       : ''
                                                  //   }`}
                                                  //   key={i}
                                                  //   onClick={() => {
                                                  //     setPaymentModex(dat.value)
                                                  //     formik.setFieldValue(
                                                  //       'mode',
                                                  //       dat.value
                                                  //     )
                                                  //   }}
                                                  // >
                                                  //   {dat.label}
                                                  // </span>
                                                  <div
                                                    className="flex items-center gap-x-1"
                                                    key={i}
                                                    onClick={() => {
                                                      setPaymentModex(dat.value)
                                                      formik.setFieldValue(
                                                        'mode',
                                                        dat.value
                                                      )
                                                    }}
                                                  >
                                                    <input
                                                      id="push-everything"
                                                      name="push-notifications"
                                                      type="radio"
                                                      checked={
                                                        paymentModex ==
                                                        dat.value
                                                      }
                                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label
                                                      htmlFor="push-everything"
                                                      className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                      {dat.label}
                                                    </label>
                                                  </div>
                                                )
                                              })}
                                            </div>

                                            {/* section last */}

                                            <section className="flex flex-row">
                                              <div className="w-full lg:w-10/12 px-3">
                                                <div className="relative w-full mb-5">
                                                  <TextField2
                                                    label="Cheque/Ref No"
                                                    name="bank_ref_no"
                                                    type="text"
                                                  />
                                                </div>
                                              </div>
                                              <div className="w-full mt-3 lg:w-4/12 px-  ">
                                                <div className="relative w-full mb-5 mt-[-1px] ">
                                                  <span className="inline">
                                                    <CustomDatePicker
                                                      className="h-8 outline-none border-t-0 border-l-0 border-r-0 border-b border-gray-500  border-solid mt-[-4px] pb-1  min-w-[125px]  inline  text-[#0091ae]   lg:w-11/12 w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] "
                                                      label="Dated"
                                                      name="dated"
                                                      // selected={startDate}
                                                      selected={
                                                        formik.values.dated
                                                      }
                                                      onChange={(date) => {
                                                        // setFieldValue('dated')
                                                        formik.setFieldValue(
                                                          'dated',
                                                          date.getTime()
                                                        )
                                                        // setStartDate(date)
                                                        console.log(startDate)
                                                      }}
                                                      timeFormat="HH:mm"
                                                      injectTimes={[
                                                        setHours(
                                                          setMinutes(d, 1),
                                                          0
                                                        ),
                                                        setHours(
                                                          setMinutes(d, 5),
                                                          12
                                                        ),
                                                        setHours(
                                                          setMinutes(d, 59),
                                                          23
                                                        ),
                                                      ]}
                                                      //dateFormat="MMM d, yyyy"
                                                      dateFormat="MMM dd, yyyy"
                                                    />
                                                  </span>
                                                </div>
                                              </div>
                                            </section>

                                            <div className="w-full  px-3 pb-4">
                                              <div className="relative w-full mb-3">
                                                <TextField2
                                                  label="Notes"
                                                  name="payReason"
                                                  type="text"
                                                />
                                              </div>
                                            </div>
                                          </section>
                                          <section className="border rounded-md w-full lg:w-12/12 mx-3 mb-3">
                                            <article className="border-b w-full bg-[#F9FAFB] px-3 py-1 rounded-t-md">
                                              <span className="text-sm font-semibold text-gray-500">
                                                Customer Details
                                              </span>
                                            </article>

                                            {/* customer details */}
                                            <section className=" px-4  bg-white   ">
                                              <section className="flex flex-row  pt-2 mt-1 ">
                                                <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-[#8b5cf6]"></div>
                                                <span className="ml-1 leading-[15px] ">
                                                  <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                                    Company Details
                                                    <abbr title="required"></abbr>
                                                  </label>
                                                </span>
                                              </section>
                                              {/* row 1 */}
                                              <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-4 ">
                                                <div className="space-y-2 w-full text-xs mt-">
                                                  <TextField
                                                    label="Company Name*"
                                                    name="companyName"
                                                    type="text"
                                                  />
                                                </div>
                                              </div>
                                              {/* row 2 */}
                                              <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                                                <div className=" space-y-2 w-full text-xs mt- lg:w-6/12">
                                                  <div className="relative ">
                                                    <label className="label font-regular text-[12px] block mb-1 mt- text-gray-700">
                                                      Contact Person 1{' '}
                                                    </label>
                                                    <MuiTextField
                                                      id="area"
                                                      className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                                      size="small"
                                                      InputProps={{
                                                        style: {
                                                          height: '2rem',
                                                          paddingLeft: '7px',
                                                        },
                                                        startAdornment: (
                                                          <InputAdornment
                                                            position="start"
                                                            style={{
                                                              height: '32px',
                                                            }}
                                                          >
                                                            <NoBorderDropDown
                                                              name="relation1"
                                                              label=""
                                                              className="input  min-w-[85px] h-[32px]"
                                                              onChange={(
                                                                value
                                                              ) => {
                                                                formik.setFieldValue(
                                                                  'relation1',
                                                                  value
                                                                )
                                                              }}
                                                              value={
                                                                formik?.values
                                                                  ?.relation1
                                                                  ?.value
                                                              }
                                                              options={[
                                                                {
                                                                  label: 'Mr',
                                                                  value: 'mr',
                                                                },
                                                                {
                                                                  label: 'Mrs',
                                                                  value: 'mrs',
                                                                },
                                                                {
                                                                  label: 'Miss',
                                                                  value: 'miss',
                                                                },
                                                              ]}
                                                            />
                                                          </InputAdornment>
                                                        ),
                                                      }}
                                                      label=""
                                                      name="co_Name1"
                                                      type="text"
                                                      value={
                                                        formik.values.co_Name1
                                                      }
                                                      onChange={
                                                        formik.handleChange
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 mb-2 ">
                                                  <div className="relative w-full">
                                                    <div className="space-y-1 w-full text-xs">
                                                      <label
                                                        htmlFor="countryCode"
                                                        className="inline-block"
                                                      >
                                                        Primary Phone No
                                                      </label>

                                                      <div className="flex border mb-6 mt-0 border-[#cccccc] rounded-md">
                                                        <div className="inline-block">
                                                          <input
                                                            type="text"
                                                            id="countryCode1"
                                                            name="countryCode1"
                                                            value={
                                                              formik.values
                                                                .countryCode1
                                                            }
                                                            onChange={(e) =>
                                                              formik.setFieldValue(
                                                                'countryCode1',
                                                                e.target.value
                                                              )
                                                            }
                                                            onBlur={
                                                              formik.handleBlur
                                                            }
                                                            className="w-11 bg-grey-lighter text-grey-darker h-7 px-2 border-none rounded-l-md focus:outline-none"
                                                            placeholder="+91"
                                                            style={{
                                                              margin: '0',
                                                              padding: '0',
                                                              paddingLeft:
                                                                '0.5rem', // Add padding-left
                                                            }}
                                                          />
                                                          {formik.errors
                                                            .countryCode1 &&
                                                            formik.touched
                                                              .countryCode1 && (
                                                              <div className="text-red-500 text-xs ml-2">
                                                                {
                                                                  formik.errors
                                                                    .countryCode1
                                                                }
                                                              </div>
                                                            )}
                                                        </div>

                                                        <div className="border-l border-gray-400 mt-1 mb-1"></div>

                                                        <PhoneNoField
                                                          name="phoneNo1"
                                                          // type="text"
                                                          value={
                                                            formik.values
                                                              .phoneNo1
                                                          }
                                                          customStyles={
                                                            customPhoneNoFieldStyles
                                                          }
                                                          onChange={(value) => {
                                                            // formik.setFieldValue('mobileNo', value.value)
                                                            formik.setFieldValue(
                                                              'phoneNo1',
                                                              value.value
                                                            )
                                                          }}
                                                          // value={formik.values.mobileNo}
                                                          options={{}}
                                                          labelSize="text-[11px]"
                                                          textSize="text-[12px]"
                                                          txtPad="px-2"
                                                          className="text-[10px]"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 ">
                                                  <div className="relative w-full">
                                                    <TextField
                                                      label="Email"
                                                      name="email1"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              {/* row 2 */}
                                              <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                                                <div className=" space-y-2 w-full text-xs mt- lg:w-6/12">
                                                  <div className="relative ">
                                                    <label className="label font-regular text-[12px] block mb-1 mt- text-gray-700">
                                                      Contact Person 2{' '}
                                                    </label>
                                                    <MuiTextField
                                                      id="area"
                                                      className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                                      size="small"
                                                      InputProps={{
                                                        style: {
                                                          height: '2rem',
                                                          paddingLeft: '7px',
                                                        },
                                                        startAdornment: (
                                                          <InputAdornment
                                                            position="start"
                                                            style={{
                                                              height: '32px',
                                                            }}
                                                          >
                                                            <NoBorderDropDown
                                                              name="relation2"
                                                              label=""
                                                              className="input  min-w-[85px] h-[32px]"
                                                              onChange={(
                                                                value
                                                              ) => {
                                                                formik.setFieldValue(
                                                                  'relation2',
                                                                  value
                                                                )
                                                              }}
                                                              value={
                                                                formik?.values
                                                                  ?.relation2
                                                                  ?.value
                                                              }
                                                              options={[
                                                                {
                                                                  label: 'Mr',
                                                                  value: 'mr',
                                                                },
                                                                {
                                                                  label: 'Mrs',
                                                                  value: 'mrs',
                                                                },
                                                                {
                                                                  label: 'Miss',
                                                                  value: 'miss',
                                                                },
                                                              ]}
                                                            />
                                                          </InputAdornment>
                                                        ),
                                                      }}
                                                      label=""
                                                      name="co_Name2"
                                                      type="text"
                                                      value={
                                                        formik.values.co_Name2
                                                      }
                                                      onChange={
                                                        formik.handleChange
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 mb-2 ">
                                                  <div className="relative w-full">
                                                    <div className="space-y-1 w-full text-xs">
                                                      <label
                                                        htmlFor="countryCode"
                                                        className="inline-block"
                                                      >
                                                        Primary Phone No
                                                      </label>

                                                      <div className="flex border mb-6 mt-0 border-[#cccccc] rounded-md">
                                                        <div className="inline-block">
                                                          <input
                                                            type="text"
                                                            id="countryCode2"
                                                            name="countryCode2"
                                                            value={
                                                              formik.values
                                                                .countryCode2
                                                            }
                                                            onChange={(e) =>
                                                              formik.setFieldValue(
                                                                'countryCode2',
                                                                e.target.value
                                                              )
                                                            }
                                                            onBlur={
                                                              formik.handleBlur
                                                            }
                                                            className="w-11 bg-grey-lighter text-grey-darker h-7 px-2 border-none rounded-l-md focus:outline-none"
                                                            placeholder="+91"
                                                            style={{
                                                              margin: '0',
                                                              padding: '0',
                                                              paddingLeft:
                                                                '0.5rem', // Add padding-left
                                                            }}
                                                          />
                                                          {formik.errors
                                                            .countryCode2 &&
                                                            formik.touched
                                                              .countryCode2 && (
                                                              <div className="text-red-500 text-xs ml-2">
                                                                {
                                                                  formik.errors
                                                                    .countryCode2
                                                                }
                                                              </div>
                                                            )}
                                                        </div>

                                                        <div className="border-l border-gray-400 mt-1 mb-1"></div>

                                                        <PhoneNoField
                                                          name="phoneNo1"
                                                          // type="text"
                                                          value={
                                                            formik.values
                                                              .phoneNo2
                                                          }
                                                          customStyles={
                                                            customPhoneNoFieldStyles
                                                          }
                                                          onChange={(value) => {
                                                            // formik.setFieldValue('mobileNo', value.value)
                                                            formik.setFieldValue(
                                                              'phoneNo2',
                                                              value.value
                                                            )
                                                          }}
                                                          // value={formik.values.mobileNo}
                                                          options={{}}
                                                          labelSize="text-[11px]"
                                                          textSize="text-[12px]"
                                                          txtPad="px-2"
                                                          className="text-[10px]"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="w-full lg:w-3/12 ">
                                                  <div className="relative w-full">
                                                    <TextField
                                                      label="Email"
                                                      name="email2"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              {/* row 3 */}
                                              <div className="flex flex-row justify-between pt-2 mb-2">
                                                <section className="w-12/12 w-full">
                                                  <label className="label font-regular text-[12px] block mb-1 mt-1 text-gray-700">
                                                    PAN No{' '}
                                                  </label>
                                                  <MuiTextField
                                                    id="area"
                                                    className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                                    size="small"
                                                    InputProps={{
                                                      style: {
                                                        height: '2rem',
                                                        paddingLeft: '7px',
                                                      },
                                                      endAdornment: (
                                                        <InputAdornment
                                                          position="end"
                                                          style={{
                                                            height: '32px',
                                                          }}
                                                        >
                                                          <div className="flex flex-row-reverse">
                                                            <label
                                                              htmlFor="formFile3"
                                                              className="form-label cursor-pointer inline-block   font-regular text-xs  rounded-2xl px-1 py-1  "
                                                            >
                                                              {`${
                                                                formik.values
                                                                  .panDocUrl1 ===
                                                                  '' ||
                                                                formik.values
                                                                  .panDocUrl1 ==
                                                                  undefined
                                                                  ? 'Upload'
                                                                  : 'Download'
                                                              }`}
                                                            </label>
                                                            {formik.values
                                                              .panDocUrl1 !=
                                                              '' && (
                                                              <button
                                                                onClick={() =>
                                                                  downloadImage(
                                                                    formik
                                                                      .values
                                                                      .panDocUrl1,
                                                                    'pancard1.PNG'
                                                                  )
                                                                }
                                                              >
                                                                {' '}
                                                                {formik.values
                                                                  .panDocUrl1 ===
                                                                  '' ||
                                                                formik.values
                                                                  .panDocUrl1 ==
                                                                  undefined ? (
                                                                  <PlusIcon className="w-4 h-4 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 border rounded-[16px] " />
                                                                ) : (
                                                                  <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                                )}
                                                              </button>
                                                            )}
                                                            <input
                                                              type="file"
                                                              className="hidden"
                                                              id="formFile3"
                                                              onChange={async (
                                                                e
                                                              ) => {
                                                                await handleFileUploadFun(
                                                                  e.target
                                                                    .files[0],
                                                                  'panCard1',
                                                                  formik
                                                                )
                                                              }}
                                                            />
                                                          </div>
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    label=""
                                                    name="panNo1"
                                                    type="text"
                                                    value={formik.values.panNo1}
                                                    onChange={
                                                      formik.handleChange
                                                    }
                                                  />
                                                </section>
                                                <section className="w-full ml-4">
                                                  <label className="label font-regular text-[12px] block mb-1 mt-1 text-gray-700">
                                                    Aadhar No{' '}
                                                  </label>
                                                  <MuiTextField
                                                    id="area"
                                                    className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                                    size="small"
                                                    InputProps={{
                                                      style: {
                                                        height: '2rem',
                                                        paddingLeft: '7px',
                                                      },
                                                      endAdornment: (
                                                        <InputAdornment
                                                          position="end"
                                                          style={{
                                                            height: '32px',
                                                          }}
                                                        >
                                                          <div className=" flex flex-row-reverse">
                                                            <label
                                                              htmlFor="formFile4"
                                                              className="form-label cursor-pointer inline-block font-regular text-xs  rounded-2xl px-1 py-1"
                                                            >
                                                              {`${
                                                                formik.values
                                                                  .aadharUrl1 ===
                                                                  '' ||
                                                                formik.values
                                                                  .aadharUrl1 ==
                                                                  undefined
                                                                  ? 'Upload'
                                                                  : 'Download'
                                                              }`}
                                                            </label>
                                                            {formik.values
                                                              .aadharUrl1 !=
                                                              '' && (
                                                              <button
                                                                onClick={() =>
                                                                  downloadImage(
                                                                    formik
                                                                      .values
                                                                      .aadharUrl1,
                                                                    'Aadhar1.PNG'
                                                                  )
                                                                }
                                                              >
                                                                {' '}
                                                                {formik.values
                                                                  .aadharUrl1 ===
                                                                  '' ||
                                                                formik.values
                                                                  .aadharUrl1 ==
                                                                  undefined ? (
                                                                  <PlusIcon className="w-4 h-4 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 border rounded-[16px] " />
                                                                ) : (
                                                                  <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                                )}
                                                              </button>
                                                            )}
                                                            <input
                                                              type="file"
                                                              className="hidden"
                                                              id="formFile4"
                                                              onChange={(e) => {
                                                                console.log(
                                                                  'iwas clicked aadharno 2'
                                                                )
                                                                handleFileUploadFun(
                                                                  e.target
                                                                    .files[0],
                                                                  'aadharNo1Url',
                                                                  formik
                                                                )
                                                              }}
                                                            />
                                                          </div>
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    label=""
                                                    name="aadharNo1"
                                                    type="text"
                                                    value={
                                                      formik.values.aadharNo1
                                                    }
                                                    onChange={
                                                      formik.handleChange
                                                    }
                                                  />
                                                </section>
                                              </div>
                                            </section>
                                            {/* section-2 */}

                                            {/* section-3 */}
                                            <section className="mt-2 px-4  py-2 bg-white ">
                                              <section className="flex flex-row  mt-1 ">
                                                <div className="border-2  h-3 rounded-xl  mt-[2px] w-1  border-[#8b5cf6]"></div>
                                                <span className="ml-1 leading-[15px] ">
                                                  <label className="font-semibold text-[#053219]  text-[13px] leading-[15px] mb-1  ">
                                                    Address
                                                    <abbr title="required"></abbr>
                                                  </label>
                                                </span>
                                              </section>
                                              {/* row 1 */}
                                              <div className="w-full lg:w-12/12 ">
                                                <div className="relative w-full mb-3 mt-2">
                                                  <TextField
                                                    label="Address"
                                                    name="address1"
                                                    type="text"
                                                  />
                                                </div>
                                              </div>
                                              <div className="w-full  flex flex-row lg:w-12/12 mt-1">
                                                <div className="w-full lg:w-12/12 px- ">
                                                  <div className="relative w-full mb-3 mt-">
                                                    <TextField
                                                      label="City"
                                                      name="city1"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 pl-4">
                                                  <div className="relative w-full mb-3 mt-">
                                                    <div className="w-full flex flex-col mb-3">
                                                      <CustomSelect
                                                        name="state1"
                                                        label="State"
                                                        className="input"
                                                        onChange={(value) => {
                                                          formik.setFieldValue(
                                                            'state1',
                                                            value.value
                                                          )
                                                        }}
                                                        value={
                                                          formik.values.state1
                                                        }
                                                        options={statesListA}
                                                      />
                                                      <p
                                                        className="text-sm text-red-500 hidden mt-3"
                                                        id="error"
                                                      >
                                                        Please fill out this
                                                        field.
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="w-full flex flex-row lg:w-12/12 mt-">
                                                <div className="w-full lg:w-12/12 px-">
                                                  {/* Country Name 2 */}
                                                  <div className="relative w-full mb-3 mt-2">
                                                    <TextField
                                                      label="Country Name"
                                                      name="countryName1"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full lg:w-12/12 pl-4">
                                                  {/* Pincode 2 */}
                                                  <div className="relative w-full mb-3 mt-2">
                                                    <TextField
                                                      label="Pincode"
                                                      name="pincode1"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </section>
                                          </section>
                                        </div>
                                        <div>
                                          <label
                                            htmlFor="formFile1"
                                            className="form-label cursor-pointer inline-block mt-2  font-regular text-xs bg-gray-300 rounded-2xl  py-1 "
                                          >
                                            <AttachFile
                                              className="w-4 h-4 text-[18px]"
                                              style={{ fontSize: '18px' }}
                                            />
                                          </label>

                                          <input
                                            type="file"
                                            className="hidden"
                                            id="formFile1"
                                            name="fileUploader"
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                'fileUploader',
                                                e.target.files[0]
                                              )
                                              // handleFileUploadFun(
                                              //   e.target.files[0],
                                              //   'panCard1'
                                              // )
                                            }}
                                          />
                                        </div>
                                        {formik.values.fileUploader && (
                                          <img
                                            src={URL.createObjectURL(
                                              formik.values.fileUploader
                                            )}
                                            alt="Uploaded File"
                                            className="img-preview"
                                          />
                                        )}
                                      </section>
                                    )}
                                    {title != 'capturePayment' &&
                                      bookingProgress && (
                                        <section className="mb-3">
                                          <div className="mx-auto flex mt-6 flex-row  ">
                                            <section className="ml-3 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'payment_captured'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'payment_captured'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'payment_captured'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'payment_captured'
                                                ) && <Loader />}
                                                <span className="ml-2 text-md font-bold text-navy-700 ">
                                                  Payment Confirmed
                                                </span>
                                              </div>
                                            </section>
                                            {/*  */}
                                            <section className="ml-3 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'CS_updated'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'CS_updated'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'CS_updated'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'CS_updated'
                                                ) && <Loader />}
                                                <span className="ml-4 text-md font-bold text-navy-700 ">
                                                  Costsheet & Payment Updated
                                                </span>
                                              </div>
                                            </section>
                                          </div>
                                          <div className="mx-auto flex mt-6 flex flex-row  ">
                                            <section className="ml-3 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'unit_booked'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'unit_booked'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'unit_booked'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'unit_booked'
                                                ) && <Loader />}
                                                <span className="ml-2 text-md font-bold text-navy-700 ">
                                                  Unit Booked
                                                </span>
                                              </div>
                                            </section>
                                            {/*  */}
                                            <section className="ml-3 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'customer_created'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'customer_created'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'customer_created'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'customer_created'
                                                ) && <Loader />}
                                                <span className="ml-2 text-md font-bold text-navy-700 ">
                                                  Customer Created
                                                </span>
                                              </div>
                                            </section>
                                          </div>
                                          <div className="mx-auto flex mt-6 flex flex-row  ">
                                            <section className="ml-3 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'customer_email_send'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'customer_email_send'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'customer_email_send'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'customer_email_send'
                                                ) && <Loader />}
                                                <span className="ml-2 text-md font-bold text-navy-700 ">
                                                  Send Welcome E-mail
                                                </span>
                                              </div>
                                            </section>
                                            {/*  */}
                                            <section className="ml-4 w-[300px]">
                                              <div className="flex items-center">
                                                {bookCompSteps.includes(
                                                  'notify_to_manager'
                                                ) && (
                                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 ">
                                                    <CheckCircleIcon className="h-6 w-6 text-violet-500 " />
                                                  </div>
                                                )}
                                                {!bookCompSteps.includes(
                                                  'notify_to_manager'
                                                ) &&
                                                  !bookCurentStep.includes(
                                                    'notify_to_manager'
                                                  ) && (
                                                    <ExclamationCircleIcon className="w-6 h-6 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400 " />
                                                  )}
                                                {bookCurentStep.includes(
                                                  'notify_to_manager'
                                                ) && <Loader />}
                                                <span className="ml-2 text-md font-bold text-navy-700 ">
                                                  Notified to Manager
                                                </span>
                                              </div>
                                            </section>
                                          </div>
                                        </section>
                                      )}
                                    {formik?.file?.fileUploader}

                                    {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

                                    {/* <h6 className="text-blueGray-400 text-sm mt-3 ml-3 pt-4 mb-6 font-bold uppercase">
                                Source Of Booking
                              </h6> */}
                                    {/* <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Source"
                                      name="bookingSource"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Booked By"
                                      name="bookedBy"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div> */}
                                    {!bookingProgress && (
                                      <div className="text-center space-x-4 mt-6">
                                        <button
                                          className="bg-[#8B5CF6] translate-y-1 text-[#fff] sm:text-lg text-xs font-bold py-2.5 px-6  rounded-full inline-flex items-center"
                                          type="submit"
                                          disabled={loading}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          &nbsp; &nbsp;
                                          <span>
                                            {' '}
                                            {title === 'capturePayment'
                                              ? 'Confirm Payment'
                                              : 'Book Unit '}{' '}
                                          </span>
                                        </button>
                                      </div>
                                    )}

                                    <Confetti ref={confettiRef} />
                                  </section>
                                </div>
                              </div>
                            </div>
                            {bookingProgress && (
                              <div className="inline-block">
                                <PdfReceiptGenerator
                                  user={user}
                                  selUnitDetails={selUnitDetails}
                                  myObj={newPlotCostSheetA}
                                  newPlotPS={newPlotPS}
                                  payementDetails={payementDetails}
                                  // myAdditionalCharges={
                                  //   newAdditonalChargesObj
                                  // }
                                  // netTotal={netTotal}
                                  // setNetTotal={setNetTotal}
                                  // partATotal={partATotal}
                                  // partBTotal={partBTotal}
                                  // setPartATotal={setPartATotal}
                                  // setPartBTotal={setPartBTotal}
                                  projectDetails={projectDetails}
                                  // leadDetailsObj1={leadDetailsObj1}
                                />
                              </div>
                            )}

                            {/* <div className=" text-right  md:block flex flex-col-reverse py-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg    w-full">
                              <button
                                className=" bg-gradient-to-r from-violet-300 to-indigo-300
                                  text-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                onClick={handleClick}
                                type="button"
                              >
                                Reset
                              </button>
                              <button
                                className=" bg-gradient-to-r from-violet-300 to-indigo-300
                                  text-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                onClick={handleClick}
                                type="button"
                              >
                                Download
                              </button>
                              <button
                                className=" bg-gradient-to-r from-violet-300 to-indigo-300
                                  text-black  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                                disabled={loading}
                              >
                                {'Capture Payment'}
                              </button>
                            </div> */}
                          </section>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptureUnitPayment
