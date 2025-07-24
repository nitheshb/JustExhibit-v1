/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect, useRef } from 'react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { AttachFile } from '@mui/icons-material'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { format } from 'date-fns'
import { setHours, setMinutes } from 'date-fns'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'
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
  steamUsersProjAccessList,
  updateEventsStallBookCounts,
  updateStallAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'
import { TextField2 } from 'src/util/formFields/TextField2'
import { TextFieldFlat } from 'src/util/formFields/TextFieldFlatType'
import PdfReceiptGenerator from 'src/util/PdfReceiptGenerator'
import RupeeInWords from 'src/util/rupeeWords'

import NoBorderDropDown from '../comps/noBorderDropDown'
import Loader from '../Loader/Loader'
import { validate_capturePayment } from '../Schemas'
import PdfInvoiceGenerator from 'src/util/PdfInvoiceGenerator'
import { Building2, MapPin } from 'lucide-react'

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

    if (title === 'capturePayment') {
console.log('inside supabase capturePayment', selUnitDetails?.pId)

      capturePaymentS(
        orgId,
        true,
        selUnitDetails?.pId,
        selUnitDetails?.id,
        selUnitDetails?.companyDocId,
        leadDetailsObj2,
        data,
        user?.email,
        enqueueSnackbar
      )
      // capturePayment(data)
    } else {
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
        phoneNo1: data?.phoneNo1 || '',
        phoneNo2: data?.phoneNo2 || '',
        email1: data?.email1 || '',
        email2: data?.email2 || '',
        address1: data?.address1 || '',
        city1: data?.city1 || '',
        state1: data?.state1 || '',
        countryName1: data?.countryName1 || '',
        pincode1: data?.pincode1 || '',
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
          phoneNo1: data?.phoneNo1 || '',
          phoneNo2: data?.phoneNo2 || '',
          email1: data?.email1 || '',
          email2: data?.email2 || '',
          address1: data?.address1 || '',
          city1: data?.city1 || '',
          state1: data?.state1 || '',
          countryName1: data?.countryName1 || '',
          pincode1: data?.pincode1 || '',
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
    }
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

          <div className="relative mx-4 max-h-[65%]  rounded-xl  px-2 pb-14">


            <div className="grid gap-8 grid-cols-1 mt-2">
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

                                {/* <div className='px-3 my-3'>
                                  <h2 className='font-manrope font-semibold text-[20px] leading-[20px] tracking-[0] text-[#F44D21]'>Booking conformation</h2>
                                </div> */}

                                {/* Hidden Booking Confirmation Section - can be enabled by removing the false && */}
                                {false && (
                                  <div className='px-3 my-3'>
                                    <h2 className='font-manrope font-semibold text-[20px] leading-[20px] tracking-[0] text-[#F44D21]'>
                                      Booking conformation
                                    </h2>
                                  </div>
                                )}

                                <div className=" flex flex-row px-0 py-2  overflow-y-scroll overflow-auto no-scrollbar">
                                  <section className=" p- rounded-md  ">
                                    {/* <article className="">

                                      <div className="flex flex-row justify-between">
                                        <section className="flex flex-row">
                                          <span className="text-[38px] mt-[2px]">
                                            🎊
                                          </span>
                                          <div className="inline ml-3">
                                            <div className="mt-[4px]">
                                              <label className="text-[22px] font-semibold text-[#053219]  text-sm  mb-1  ">
                                                {title === 'capturePayment'
                                                  ? 'Capture Payment'
                                                  : 'Booking Confirmation'}
                                                <abbr title="required"></abbr>
                                              </label>
                                            </div>
                                            <div className="w-100 opacity-50 text-blue-950  text-[12px] font-normal ">
                  Stall will be blocked.
                </div>
                                            <div className="border-t-4 mt-1 rounded-xl w-100 border-[#8B5CF6]"></div>
                                          </div>
                                        </section>


                                        <section className="flex flex-col ">


                                          <div className="flex flex-col mr-2 mt-2">

                                            <span className="text-right text-[13px] font-normal">
                                              {format(new Date(), 'dd-MMMM-yy')}
                                            </span>
                                          </div>
                                          <div className="inline-block mt- ml-4">
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
                                        </section>
                                      </div>
                                    </article> */}

                                    <div className="  mt-4 px-6">
                                      {!bookingProgress && (
                                        <section>
                                          <div className="flex flex-wrap mt-1">
                                            <div className="justify-center w-full mx-auto"></div>


                                            <section className=' w-full lg:w-12/12  mb-3'>
                                              {title !== 'capturePayment' && <section className=" ">

                                                <div className="flex items-center gap-3 mb-4">
                                                  <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M1.3335 7C1.3335 4.17157 1.3335 2.75736 2.30981 1.87868C3.28612 1 4.85747 1 8.00016 1C11.1429 1 12.7142 1 13.6905 1.87868C14.6668 2.75736 14.6668 4.17157 14.6668 7C14.6668 9.82843 14.6668 11.2426 13.6905 12.1213C12.7142 13 11.1429 13 8.00016 13C4.85747 13 3.28612 13 2.30981 12.1213C1.3335 11.2426 1.3335 9.82843 1.3335 7Z" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M5.6 4.3335H5.06667C4.56384 4.3335 4.31242 4.3335 4.15621 4.48971C4 4.64592 4 4.89733 4 5.40016V5.9335C4 6.43633 4 6.68774 4.15621 6.84395C4.31242 7.00016 4.56384 7.00016 5.06667 7.00016H5.6C6.10283 7.00016 6.35425 7.00016 6.51046 6.84395C6.66667 6.68774 6.66667 6.43633 6.66667 5.9335V5.40016C6.66667 4.89733 6.66667 4.64592 6.51046 4.48971C6.35425 4.3335 6.10283 4.3335 5.6 4.3335Z" stroke="#F44D21" stroke-width="1.25" stroke-linejoin="round" />
                                                      <path d="M4 9.6665H6.66667" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M9.3335 4.3335H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M9.3335 7H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M9.3335 9.6665H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                  </div>
                                                  <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]"> Customer Details</h2>
                                                </div>

                                                <div className='border border-[#E5E5E5] p-[20px]  rounded-[12px]'>

                                                  {/* customer details */}
                                                  <section className="bg-white   ">
                                                    <section className="flex flex-row  ">
                                                      <span className=" ">
                                                        <div className="flex items-center gap-2 ">
                                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 8C5.53043 8 6.03914 7.78929 6.41421 7.41421C6.78929 7.03914 7 6.53043 7 6C7 5.46957 6.78929 4.96086 6.41421 4.58579C6.03914 4.21071 5.53043 4 5 4C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6C3 6.53043 3.21071 7.03914 3.58579 7.41421C3.96086 7.78929 4.46957 8 5 8ZM9 5.5C9 5.36739 9.05268 5.24021 9.14645 5.14645C9.24021 5.05268 9.36739 5 9.5 5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5C14 5.63261 13.9473 5.75979 13.8536 5.85355C13.7598 5.94732 13.6326 6 13.5 6H9.5C9.36739 6 9.24021 5.94732 9.14645 5.85355C9.05268 5.75979 9 5.63261 9 5.5ZM9 8C9 7.86739 9.05268 7.74021 9.14645 7.64645C9.24021 7.55268 9.36739 7.5 9.5 7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H9.5C9.36739 8.5 9.24021 8.44732 9.14645 8.35355C9.05268 8.25979 9 8.13261 9 8ZM10 10.5C10 10.3674 10.0527 10.2402 10.1464 10.1464C10.2402 10.0527 10.3674 10 10.5 10H13.5C13.6326 10 13.7598 10.0527 13.8536 10.1464C13.9473 10.2402 14 10.3674 14 10.5C14 10.6326 13.9473 10.7598 13.8536 10.8536C13.7598 10.9473 13.6326 11 13.5 11H10.5C10.3674 11 10.2402 10.9473 10.1464 10.8536C10.0527 10.7598 10 10.6326 10 10.5Z" fill="#AD3717" />
                                                            <path d="M2 2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4L0 12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H14C14.5304 14 15.0391 13.7893 15.4142 13.4142C15.7893 13.0391 16 12.5304 16 12V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H2ZM1 4C1 3.73478 1.10536 3.48043 1.29289 3.29289C1.48043 3.10536 1.73478 3 2 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V12C15 12.2652 14.8946 12.5196 14.7071 12.7071C14.5196 12.8946 14.2652 13 14 13H8.96C8.98667 12.8367 9 12.67 9 12.5C9 10.567 7.21 9 5 9C2.914 9 1.2 10.398 1.016 12.181C1.00518 12.1213 0.999829 12.0607 1 12V4Z" fill="#AD3717" />
                                                          </svg>

                                                          <span className="font-manrope font-semibold text-sm leading-5 tracking-normal text-[#AD3717]">Company Details</span>
                                                        </div>

                                                      </span>
                                                    </section>
                                                    {/* row 1 */}
                                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-4 ">
                                                      <div className="space-y-2 w-full text-xs mt-">
                                                        <TextField
                                                          label="Company Name*"
                                                          name="companyName"
                                                          type="text"
                                                          placeholder="Enter company name"

                                                        />
                                                      </div>
                                                    </div>
                                                    {/* row 2 */}
                                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                                                      <div className=" space-y-2 w-full text-xs  lg:w-6/12">
                                                        <div className="relative  flex flex-col space-y-[10px]">
                                                          <label className="label font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]">
                                                            Contact Person 1{' '}
                                                          </label>
                                                          <MuiTextField
                                                            id="area"
                                                            className={`w-ful text-grey-darker border border-[#E5E5E5] rounded-[8px] h-10 mt-1 p-0`}
                                                            size="small"
                                                            placeholder="Enter contact person name"
                                                            InputProps={{
                                                              style: {
                                                                height: 42,
                                                                paddingLeft: '7px',
                                                                borderRadius: '8px',
                                                                fontFamily: 'Manrope',
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                lineHeight: '24px',
                                                                letterSpacing: '0%',
                                                                color: '#1A1A1A',

                                                              },
                                                              startAdornment: (
                                                                <InputAdornment
                                                                  position="start"
                                                                  sx={{ height: 42 }}
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



                                                            sx={{
                                                              '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                borderColor: '#E5E5E5',
                                                                backgroundColor: '#fff',
                                                              },
                                                              '& .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '& input::placeholder': {
                                                                fontFamily: 'Manrope',
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                lineHeight: '24px',
                                                                letterSpacing: '0%',
                                                                color: '#CCCCCC',
                                                              },
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="w-full lg:w-3/12 mb-2 ">
                                                        <div className="relative w-full">
                                                          <div className="space-y-[10px] w-full text-xs">
                                                            <label
                                                              htmlFor="countryCode"
                                                              className="inline-block font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]"
                                                            >
                                                              Primary Phone No
                                                            </label>

                                                            <div className="flex border mb-6 mt-0 border-[#E5E5E5] rounded-[8px]">
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
                                                                  className="
    w-11 h-[40px] px-2 border-none rounded-l-md focus:outline-none
    bg-grey-lighter text-grey-darker
    placeholder:font-manrope placeholder:font-normal
    placeholder:text-[14px] placeholder:leading-[24px]
    placeholder:tracking-[0%] placeholder:text-[#000]
  "
                                                                  placeholder="+91"
                                                                  style={{
                                                                    margin: '0',
                                                                    padding: '0',
                                                                    paddingLeft: '0.5rem',
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

                                                              {/* <div className="border-l border-gray-400 mt-1 mb-1"></div> */}

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
                                                                className="text-[10px] h-[40px] flex items-center"
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
                                                            placeholder="Enter email id"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* row 2 */}
                                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2 ">
                                                      <div className=" space-y-2 w-full text-xs mt- lg:w-6/12">
                                                        <div className="relative flex flex-col space-y-[10px] ">
                                                          <label className="label font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]">
                                                            Contact Person 2{' '}
                                                          </label>
                                                          <MuiTextField
                                                            id="area"
                                                            className={`w-full  text-grey-darker border border-[#E5E5E5] rounded-[8px]  mt-1 p-0`}
                                                            size="small"
                                                            placeholder="Enter contact person name"
                                                            InputProps={{
                                                              style: {
                                                                height: 42,
                                                                paddingLeft: '7px',
                                                                borderRadius: '8px',
                                                                fontFamily: 'Manrope',
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                lineHeight: '24px',
                                                                letterSpacing: '0%',
                                                                color: '#1A1A1A',

                                                              },

                                                              startAdornment: (
                                                                <InputAdornment
                                                                  position="start"
                                                                  sx={{ height: 42 }}

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



                                                            sx={{
                                                              '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                borderColor: '#E5E5E5',
                                                                backgroundColor: '#fff',
                                                              },
                                                              '& .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E5E5E5',
                                                              },
                                                              '& input::placeholder': {
                                                                fontFamily: 'Manrope',
                                                                fontWeight: 400,
                                                                fontSize: '14px',
                                                                lineHeight: '24px',
                                                                letterSpacing: '0%',
                                                                color: '#CCCCCC',
                                                              },
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="w-full lg:w-3/12 mb-2 ">
                                                        <div className="relative w-full">
                                                          <div className="space-y-[10px] w-full text-xs">
                                                            <label
                                                              htmlFor="countryCode"
                                                              className="inline-block font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]"
                                                            >
                                                              Secondary Phone No
                                                            </label>

                                                            <div className="flex border mb-6 mt-0 border-[#E5E5E5] rounded-[8px]">
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
                                                                  className="
    w-11 h-[40px] px-2 border-none rounded-l-md focus:outline-none
    bg-grey-lighter text-grey-darker
    placeholder:font-manrope placeholder:font-normal
    placeholder:text-[14px] placeholder:leading-[24px]
    placeholder:tracking-[0%] placeholder:text-[#000]
  "
                                                                  placeholder="+91"
                                                                  style={{
                                                                    margin: '0',
                                                                    padding: '0',
                                                                    paddingLeft: '0.5rem',
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

                                                              {/* <div className="border-l border-gray-400 mt-1 mb-1"></div> */}

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
                                                                className="text-[10px] h-[40px] flex items-center"
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
                                                            placeholder="Enter email id"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* row 3 */}

                                                  </section>


                                                  {/* section-2 */}

                                                  {/* section-3 */}
                                                  <section className="mt-2   py-2 bg-white ">
                                                    <section className="flex flex-row  mt-1 ">
                                                      <span className=" leading-[15px] ">

                                                        <div className="flex items-center gap-2 mb-2">
                                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.5 12H19.389M19.389 12C19.389 13.9598 18.611 15.8389 17.2252 17.2247C15.8394 18.6105 13.9598 19.389 12 19.389M19.389 12C19.389 10.0402 18.611 8.16013 17.2252 6.77433C15.8394 5.38853 13.9598 4.611 12 4.611M12 2.5V4.611M12 4.611C10.0403 4.611 8.16089 5.38848 6.77519 6.77419C5.38948 8.15989 4.611 10.0393 4.611 11.999C4.611 13.9587 5.38948 15.8381 6.77519 17.2238C8.16089 18.6095 10.0403 19.389 12 19.389M2.5 12H4.611M12 21.5V19.389" stroke="#AD3717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                            <path d="M11.9998 16.2218C13.1196 16.2218 14.1935 15.777 14.9852 14.9852C15.777 14.1935 16.2218 13.1196 16.2218 11.9998C16.2218 10.8801 15.777 9.80621 14.9852 9.01443C14.1935 8.22265 13.1196 7.77783 11.9998 7.77783C10.8801 7.77783 9.80621 8.22265 9.01443 9.01443C8.22265 9.80621 7.77783 10.8801 7.77783 11.9998C7.77783 13.1196 8.22265 14.1935 9.01443 14.9852C9.80621 15.777 10.8801 16.2218 11.9998 16.2218Z" stroke="#AD3717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                          </svg>
                                                          <span className="font-manrope font-semibold text-sm leading-5 tracking-normal text-[#AD3717]">Address</span>
                                                        </div>

                                                      </span>
                                                    </section>
                                                    {/* row 1 */}
                                                    <div className="w-full lg:w-12/12 ">
                                                      <div className="relative w-full mb-3 mt-2">
                                                        <TextField
                                                          label="Address"
                                                          name="address1"
                                                          type="text"
                                                          placeholder="Enter Address"
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
                                                            placeholder="Enter city"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="w-full lg:w-12/12 pl-4">
                                                        <div className="relative w-full mb-3 mt-">
                                                          <div className="w-full flex flex-col mb-3">
                                                            <CustomSelect
                                                              name="state1"
                                                              label="State"
                                                              className="input h-[42px]"

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
                                                      <div className="w-full lg:w-12/12 pl-4">
                                                        {/* Pincode 2 */}
                                                        <div className="relative w-full mb-3">
                                                          <TextField
                                                            label="Pincode"
                                                            name="pincode1"
                                                            type="text"
                                                            placeholder="Enter picode"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>


                                                  </section>

                                                </div>





                                              </section>}


                                            </section>

                                            <section className=" rounded-md w-full lg:w-12/12  mt-2 mb-1 ">




                                              {title !== 'capturePayment' && (

                                                <div>
                                                  <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                                                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.3335 7C1.3335 4.17157 1.3335 2.75736 2.30981 1.87868C3.28612 1 4.85747 1 8.00016 1C11.1429 1 12.7142 1 13.6905 1.87868C14.6668 2.75736 14.6668 4.17157 14.6668 7C14.6668 9.82843 14.6668 11.2426 13.6905 12.1213C12.7142 13 11.1429 13 8.00016 13C4.85747 13 3.28612 13 2.30981 12.1213C1.3335 11.2426 1.3335 9.82843 1.3335 7Z" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M5.6 4.3335H5.06667C4.56384 4.3335 4.31242 4.3335 4.15621 4.48971C4 4.64592 4 4.89733 4 5.40016V5.9335C4 6.43633 4 6.68774 4.15621 6.84395C4.31242 7.00016 4.56384 7.00016 5.06667 7.00016H5.6C6.10283 7.00016 6.35425 7.00016 6.51046 6.84395C6.66667 6.68774 6.66667 6.43633 6.66667 5.9335V5.40016C6.66667 4.89733 6.66667 4.64592 6.51046 4.48971C6.35425 4.3335 6.10283 4.3335 5.6 4.3335Z" stroke="#F44D21" stroke-width="1.25" stroke-linejoin="round" />
                                                        <path d="M4 9.6665H6.66667" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M9.3335 4.3335H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M9.3335 7H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M9.3335 9.6665H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                      </svg>

                                                    </div>
                                                    <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">Cost Sheet</h2>
                                                  </div>


                                                  <div className="border-y-1 border border-[#E5E5E5] rounded-[12px]  overflow-hidden ">
                                                    <table className="min-w-full divide-y ">
                                                      <thead>
                                                        <tr className=" mb-1 border-none w-[100%] bg-[#FEEDE9] text-[#0D027D]">
                                                          <th className="min-w-[35%] py-[13px] px-[20px] font-manrope text-[14px] text-left text-[#1A1A1A]  tracking-wide">
                                                            Stall Charges (
                                                            {selUnitDetails?.area?.toLocaleString(
                                                              'en-IN'
                                                            ) || 0}{' '}
                                                            sqm)
                                                          </th>
                                                          <th className="w-[15%] font-manrope py-[13px] px-[20px] text-[14px] text-right text-[#1A1A1A] tracking-wide">
                                                            Rate/Sqm
                                                          </th>
                                                          <th
                                                            className={`${!true ? 'hidden' : ''
                                                              } w-[15%] font-manrope py-[13px] px-[20px] text-[14px] text-right text-[#1A1A1A] tracking-wide `}
                                                          >
                                                            Cost
                                                          </th>
                                                          <th
                                                            className={`${!true ? 'hidden' : ''
                                                              }  w-[15%] font-manrope py-[13px] px-[20px] text-[14px] text-right text-[#1A1A1A]  tracking-wide `}
                                                          >
                                                            GST
                                                          </th>
                                                          <th className="w-[15%] font-manrope py-[13px] px-[20px] text-[14px] text-right text-[#1A1A1A]  tracking-wide ">
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
                                                              className="py-1 my-2 h-10  py-[24px]"
                                                            >
                                                              <th className="w-[40%] py-[13px] px-[20px] text-[14px] text-left  font-manrope font-medium text-sm leading-[100%] tracking-normal text-[#1A1A1A]  ">
                                                                {
                                                                  d1?.component
                                                                    ?.label
                                                                }
                                                              </th>
                                                              <td className="w-[15%]  py-[13px] px-[20px] text-[12px] text-right  ">
                                                                <TextFieldFlat
                                                                  label=""
                                                                  className="w-[90%] text-[14px] text-right font-semibold border-b  border-[#666666]  pr-1 py-[4px] text-[#666666]"
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
                                                                className={`${!true
                                                                  ? 'hidden'
                                                                  : ''
                                                                  } w-[15%] py-[13px] px-[20px] text-[14px] text-right text-[#666666] `}
                                                              >
                                                                ₹
                                                                {d1?.TotalSaleValue?.toLocaleString(
                                                                  'en-IN'
                                                                )}
                                                              </td>
                                                              <td
                                                                className={`${!true
                                                                  ? 'hidden'
                                                                  : ''
                                                                  } w-[15%] py-[13px] px-[20px] text-[14px] text-right text-[#666666]  `}
                                                              >
                                                                ₹
                                                                {d1?.gstValue?.toLocaleString(
                                                                  'en-IN'
                                                                )}
                                                              </td>
                                                              <td className="w-[15%] py-[13px] px-[20px] text-[14px] text-right text-[#666666]  ">
                                                                ₹
                                                                {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                                                  'en-IN'
                                                                )}
                                                              </td>
                                                            </tr>
                                                          )
                                                        )}
                                                        {/* for construction cost  */}
                                                        <tr className=" border-[#fab56c]   h-10">
                                                          <th className="w-[40%] text-[14px] py-[13px] px-[20px]  text-left text-[#1A1A1A] font-semibold  ">
                                                            Total
                                                          </th>
                                                          <td className="w-[15%] px-2 font-semibold text-[12px] text-right text-gray-600 "></td>
                                                          <td
                                                            className={`${!true ? 'hidden' : ''
                                                              } w-[15%] px-2 font-semibold  py-[13px] px-[20px] text-[14px] text-right text-[#1A1A1A] `}
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
                                                            className={`${!true ? 'hidden' : ''
                                                              } w-[15%] px-2 font-semibold  text-[14px] text-right text-[#1A1A1A] `}
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
                                                          <td className="w-[15%] py-[13px] px-[20px] font-semibold text-[12px] text-right  text-[#1A1A1A] ">
                                                            ₹
                                                            {partATotal?.toLocaleString(
                                                              'en-IN'
                                                            )}
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>



                                                </div>


                                              )}
                                            </section>

                                            <div className='w-full lg:w-12/12  mt-2 mb-1'>


                                              <div className="flex items-center gap-3 mb-4">
                                                <div className="w-[30px] h-[30px]  rounded-[7.5px] border border-[#E5E5E5] shadow-[0px_0.75px_4px_0px_#0000001A] text-white flex items-center justify-center">
                                                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.3335 7C1.3335 4.17157 1.3335 2.75736 2.30981 1.87868C3.28612 1 4.85747 1 8.00016 1C11.1429 1 12.7142 1 13.6905 1.87868C14.6668 2.75736 14.6668 4.17157 14.6668 7C14.6668 9.82843 14.6668 11.2426 13.6905 12.1213C12.7142 13 11.1429 13 8.00016 13C4.85747 13 3.28612 13 2.30981 12.1213C1.3335 11.2426 1.3335 9.82843 1.3335 7Z" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5.6 4.3335H5.06667C4.56384 4.3335 4.31242 4.3335 4.15621 4.48971C4 4.64592 4 4.89733 4 5.40016V5.9335C4 6.43633 4 6.68774 4.15621 6.84395C4.31242 7.00016 4.56384 7.00016 5.06667 7.00016H5.6C6.10283 7.00016 6.35425 7.00016 6.51046 6.84395C6.66667 6.68774 6.66667 6.43633 6.66667 5.9335V5.40016C6.66667 4.89733 6.66667 4.64592 6.51046 4.48971C6.35425 4.3335 6.10283 4.3335 5.6 4.3335Z" stroke="#F44D21" stroke-width="1.25" stroke-linejoin="round" />
                                                    <path d="M4 9.6665H6.66667" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M9.3335 4.3335H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M9.3335 7H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M9.3335 9.6665H12.0002" stroke="#F44D21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                  </svg>

                                                </div>
                                                <h2 className="font-playfair font-bold text-[12px] leading-[20px] tracking-[2px] uppercase text-[#1A1A1A]">Payment</h2>
                                              </div>





                                              <section className="border p-[20px] rounded-[12px] border-[#E5E5E5] ">



                                                <div className="w-full lg:w-12/12 ">
                                                  <div className="relative w-full mb-3">
                                                    <TextField2
                                                      label="Paying"
                                                      name="amount"
                                                      type="number"
                                                      placeholder="00000"
                                                    // onChange={(e) => {
                                                    //   setAmount(e.target.value)
                                                    //   console.log('changed value is ', e.target.value)
                                                    //   formik.setFieldValue('amount', e.target.value)
                                                    // }}
                                                    />
                                                  </div>
                                                </div>





                                                <div className="text-xs  mb-3">
                                                  {' '}
                                                  Paying{' '}
                                                  <RupeeInWords
                                                    amount={
                                                      formik?.values?.amount || 0
                                                    }
                                                  />
                                                </div>

                                                {/* section -2 */}


                                                <div className='py-4'>

                                                  <div className=' '>
                                                    <h2 className='font-semibold text-[14px] leading-[100%] tracking-[0] text-[#333333] font-manrope'>Mode of payment</h2>
                                                  </div>

                                                  <div className="w-full  mb-4 mt-8 flex flex-row gap-x-6">
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


                                                        <div>


                                                          <div
                                                            className="flex items-center gap-x-4"
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
                                                              style={{ accentColor: '#F44D21' }}
                                                              checked={
                                                                paymentModex ==
                                                                dat.value
                                                              }
                                                              className="h-5 w-5 border-[#E5E5E5] text-[#F44D21] focus:ring-[#F44D21]"
                                                            />
                                                            <label
                                                              htmlFor="push-everything"
                                                              className="block font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#333333] font-manrope"
                                                            >
                                                              {dat.label}
                                                            </label>
                                                          </div>


                                                        </div>
                                                      )
                                                    })}
                                                  </div>
                                                </div>


                                                {/* section last */}

                                                {/* <section className="flex flex-row">
                                                <div className="w-full lg:w-10/12 px-3">
                                                  <div className="relative w-full mb-5">
                                                    <TextField2
                                                      label="Cheque/Ref No"
                                                      name="bank_ref_no"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="w-full  ">
                                                  <div className="relative ">
                                                    <span className="inline">

                                                      <div className="space-y-[10px] flex flex-col  w-full text-xs">
                                                            <label
                                                              htmlFor="countryCode"
                                                              className="inline-block font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]"
                                                            >
                                                              Primary Phone No
                                                            </label>


                                                      <CustomDatePicker
                                                        className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#E5E5E5] px-4 h-[42px] rounded-md"
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

                                                      </div>

                                                    </span>
                                                  </div>
                                                </div>
                                              </section> */}

                                                <section className="flex lg:w-12/12  flex-row gap-x-[25px]">
                                                  {/* Left Field */}
                                                  <div className="w-full">
                                                    <div className="relative w-full mb-5">
                                                      <TextField2
                                                        label="Cheque/Ref No"
                                                        name="bank_ref_no"
                                                        type="text"
                                                        placeholder="00000"
                                                      />
                                                    </div>
                                                  </div>

                                                  {/* Right Field */}
                                                  <div className="w-full">
                                                    <div className="relative">
                                                      <div className="space-y-[10px] flex flex-col w-full text-xs">
                                                        <label
                                                          htmlFor="countryCode"
                                                          className="inline-block font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]"
                                                        >
                                                         Date
                                                        </label>

                                                        <CustomDatePicker
                                                          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#E5E5E5] px-4 h-[42px] rounded-md"
                                                          label="Dated"
                                                          name="dated"
                                                          selected={formik.values.dated}
                                                          onChange={(date) => {
                                                            formik.setFieldValue('dated', date.getTime());
                                                          }}
                                                          timeFormat="HH:mm"
                                                          injectTimes={[
                                                            setHours(setMinutes(d, 1), 0),
                                                            setHours(setMinutes(d, 5), 12),
                                                            setHours(setMinutes(d, 59), 23),
                                                          ]}
                                                          dateFormat="MMM dd, yyyy"
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </section>


                                                <div className="w-full  ">
                                                  <div className="relative w-full ">
                                                    <TextField2
                                                      label="Notes"
                                                      name="payReason"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                              </section>
                                            </div>



                                          </div>
                                          {/* <div>
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
                                          )} */}
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
                                        <div className="text-center space-x-4 my-6">



                                          <button
                                            className="bg-[#F44D21] text-white inline-flex items-center justify-center w-[261px] h-[48px] px-[20px] py-[14px] rounded-lg"
                                            type="submit"
                                            disabled={loading}
                                          >
                                            <span>
                                              {title === 'capturePayment' ? 'Confirm Payment' : 'Book Stall'}
                                            </span>
                                          </button>
                                        </div>
                                      )}
                                    </div>
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