/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'

import { ArrowCircleDownIcon, PlusIcon, LinkIcon } from '@heroicons/react/solid'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import DatePicker from 'react-datepicker'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import { statesList } from 'src/constants/projects'
import {
  addLead,
  updateLeadCustomerDetailsTo,
  checkIfLeadAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
  updateUnitCustomerDetailsTo,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { PhoneNoField2 } from 'src/util/formFields/phNoField2'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'

import NoBorderDropDown from './comps/noBorderDropDown'
import { useFileUpload } from './useFileUpload'

const AddApplicantDetails = ({
  source,
  customerInfo,
  setCustomerInfo,
  title,
  leadPayload,
  setLeadPayload,
  selUnitDetails,
  dialogOpen,
  setShowApplicantEdit,
  setOnStep,
  currentMode,
  stepIndx,
  StatusListA,
}) => {
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId } = user
  const [uploadedFileLink, handleFileUpload] = useFileUpload()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [progress, setProgress] = useState(0)
  const [panCard1, setPanCard1] = useState('')
  const [panCard2, setPanCard2] = useState('')
  const [aadhrUrl1, setAadharUrl1] = useState('')
  const [aadhrUrl2, setAadharUrl2] = useState('')
  const [startDate, setStartDate] = useState(d)
  const [showLeadLink, setShowLeadLink] = useState(false)

  useEffect(() => {
    console.log('yo yo ', selUnitDetails, leadPayload)
    setPanCard1(leadPayload?.customerDetailsObj?.panDocUrl1)
    setPanCard2(leadPayload?.secondaryCustomerDetailsObj?.panDocUrl2)
    setAadharUrl1(leadPayload?.customerDetailsObj?.aadharUrl1)
    setAadharUrl2(leadPayload?.secondaryCustomerDetailsObj?.aadharUrl2)
  }, [])

  useEffect(() => {
    console.log('customerInfo yes it is', customerInfo)
  }, [])

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    console.log('new customer object', leadPayload)
  }, [leadPayload])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])

  const downloadImage = (imageUrl, filename) => {
    console.error('Error downloading image:', imageUrl)
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url

        // Extract the filename from the URL
        // const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)

        // Set the download attribute and filename
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        console.log('fetcher url ', filename)
        // Simulate a click on the anchor element to start the download
        link.click()

        // Clean up the temporary anchor element
        link.parentNode.removeChild(link)

        // Set the downloaded image URL to display on the page
        setImageUrl(url)
      })
      .catch((error) => {
        console.error('Error downloading image:', error)
      })
  }

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
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [selRef1, setRefDataFun1] = useState({ label: 'S/O', value: 'S/O' })
  const [selRef2, setRefDataFun2] = useState({ label: 'S/O', value: 'S/O' })
  const [moveNext, setMoveNext] = useState(false)
  const [givenPhNo1, setGivenPhNo1] = useState()
  useEffect(() => {
    if (givenPhNo1?.length == 10) {
      searchFun()
    }
  }, [givenPhNo1])
  const searchFun = async () => {
    const foundLength = await checkIfLeadAlreadyExists(
      `${orgId}_leads`,
      givenPhNo1
    )
    if (foundLength?.length > 0) {
      setLeadPayload(foundLength[0])
    }
  }

  const onSubmitFun = async (data, updateDoc, resetForm) => {
    console.log(data)
    setLoading(true)

    // const { email, name, mobileNo, assignedTo, assignedToObj, project } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')
    const {
      customerName1,
      co_Name1,
      phoneNo1,
      email1,
      dob1,
      marital1,
      panNo1,
      panDocUrl1,
      aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
      customerName2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
      aggrementAddress,
      industry,
      designation,
      annualIncome,
      leadSource,
      sourceOfPay,
      purpose,
      bookingSource,
      bookedBy,
      purchasePurpose,
    } = data

    updateUnitCustomerDetailsTo(
      orgId,
      selUnitDetails?.uid || selUnitDetails?.id,
      updateDoc,
      user?.email,
      enqueueSnackbar,
      resetForm
    )
    return
    const foundLength = await checkIfLeadAlreadyExists(
      `${orgId}_leads`,
      phoneNo1
    )
    const leadData = {
      Date: Timestamp.now().toMillis(),
      Email: email1 || '',
      Mobile: phoneNo1 || '',
      Name: customerName1,
      Note: '',
      Project: '',
      Source: leadSource || '',
      Status: 'unassigned',
      intype: 'DirectBooking',
      assignedTo: '',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength, leadPayload)
      await updateLeadCustomerDetailsTo(
        orgId,
        leadPayload?.id,
        updateDoc,
        'nitheshreddy.email@gmail.com',
        enqueueSnackbar,
        resetForm
      )
      await setLeadPayload(leadData)
      await console.log('lead data is ', leadData, leadPayload)
      setFormMessage('Saved Successfully..!')
      setLoading(false)
      setFormMessage('Lead Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      const createResp = await addLead(
        orgId,
        leadData,
        user?.email,
        `lead created directly from booking`
      )
      leadData.id = await createResp.id
      await updateLeadCustomerDetailsTo(
        orgId,
        createResp.id,
        updateDoc,
        'nitheshreddy.email@gmail.com',
        enqueueSnackbar,
        resetForm
      )
      await setLeadPayload(leadData)
      await console.log('lead data is ', leadData, leadPayload)
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }
  const isValidDate = (time) => {
    return !isNaN(new Date(time).getTime())
  }
  // const { uid } = selUnitDetails
  const uid = selUnitDetails?.uid || selUnitDetails?.id
  const datee = new Date().getTime()
  const initialState = {
    customerName1:
      leadPayload?.customerDetailsObj?.customerName1 ||
      selUnitDetails?.customerDetailsObj?.customerName1 ||
      customerInfo?.customerDetailsObj?.customerName1 ||
      leadPayload?.Name ||
      '',
    customerName2:
      leadPayload?.secondaryCustomerDetailsObj?.customerName2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.customerName2 ||
      customerInfo?.secondaryCustomerDetailsObj?.customerName2 ||
      '',
    relation1: customerInfo?.customerDetailsObj?.relation1 || {
      label: 'S/O',
      value: 'S/O',
    },
    relation2: customerInfo?.secondaryCustomerDetailsObj?.relation2 || {
      label: 'S/O',
      value: 'S/O',
    },
    co_Name1:
      leadPayload?.customerDetailsObj?.co_Name1 ||
      selUnitDetails?.customerDetailsObj?.co_Name1 ||
      customerInfo?.customerDetailsObj?.co_Name1 ||
      '',
    co_Name2:
      leadPayload?.secondaryCustomerDetailsObj?.co_Name2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.co_Name2 ||
      customerInfo?.secondaryCustomerDetailsObj?.co_Name2 ||
      '',

    phoneNo1:
      leadPayload?.customerDetailsObj?.phoneNo1 ||
      selUnitDetails?.customerDetailsObj?.phoneNo1 ||
      customerInfo?.customerDetailsObj?.phoneNo1 ||
      leadPayload?.Mobile ||
      '',
    phoneNo2:
      leadPayload?.secondaryCustomerDetailsObj?.phoneNo2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.phoneNo2 ||
      customerInfo?.secondaryCustomerDetailsObj?.phoneNo2 ||
      '',
    email1:
      leadPayload?.customerDetailsObj?.email1 ||
      selUnitDetails?.customerDetailsObj?.email1 ||
      customerInfo?.customerDetailsObj?.email1 ||
      leadPayload?.Email ||
      '',
    email2:
      leadPayload?.secondaryCustomerDetailsObj?.email2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.email2 ||
      customerInfo?.secondaryCustomerDetailsObj?.email2 ||
      '',
    dob1: isValidDate(selUnitDetails?.customerDetailsObj?.dob1)
      ? selUnitDetails.customerDetailsObj.dob1
      : leadPayload?.customerDetailsObj?.dob1 ||
        customerInfo?.customerDetailsObj?.dob1 ||
        datee,
    dob2:
      leadPayload?.secondaryCustomerDetailsObj?.dob2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.dob2 ||
      customerInfo?.secondaryCustomerDetailsObj?.dob2 ||
      datee,
    marital1: leadPayload?.customerDetailsObj?.marital1 ||
      selUnitDetails?.customerDetailsObj?.marital1 ||
      customerInfo?.customerDetailsObj?.marital1 || {
        label: 'Divorced',
        value: 'Divorced',
      },
    marital2: leadPayload?.secondaryCustomerDetailsObj?.marital2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.marital2 ||
      customerInfo?.secondaryCustomerDetailsObj?.marital2 || {
        label: 'Married',
        value: 'Married',
      },
    address1:
      leadPayload?.customerDetailsObj?.address1 ||
      selUnitDetails?.customerDetailsObj?.address1 ||
      customerInfo?.customerDetailsObj?.address1 ||
      '',
    address2:
      leadPayload?.secondaryCustomerDetailsObj?.address2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.address2 ||
      customerInfo?.secondaryCustomerDetailsObj?.address2 ||
      '',
    city1:
      leadPayload?.customerDetailsObj?.city1 ||
      selUnitDetails?.customerDetailsObj?.city1 ||
      customerInfo?.customerDetailsObj?.city1 ||
      '',
    city2:
      leadPayload?.secondaryCustomerDetailsObj?.city2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.city2 ||
      customerInfo?.secondaryCustomerDetailsObj?.city2 ||
      '',
    state1: leadPayload?.customerDetailsObj?.state1 ||
      selUnitDetails?.customerDetailsObj?.state1 ||
      customerInfo?.customerDetailsObj?.state1 || {
        value: 'KA',
        label: 'Karnataka',
      },
    state2: leadPayload?.secondaryCustomerDetailsObj?.state2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.state2 ||
      customerInfo?.secondaryCustomerDetailsObj?.state2 || {
        value: 'KA',
        label: 'Karnataka',
      },

    panNo1:
      leadPayload?.customerDetailsObj?.panNo1 ||
      selUnitDetails?.customerDetailsObj?.panNo1 ||
      customerInfo?.customerDetailsObj?.panNo1 ||
      '',
    panNo2:
      leadPayload?.secondaryCustomerDetailsObj?.panNo2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.panNo2 ||
      customerInfo?.secondaryCustomerDetailsObj?.panNo2 ||
      '',
    panDocUrl1:
      leadPayload?.customerDetailsObj?.panDocUrl1 ||
      selUnitDetails?.customerDetailsObj?.panDocUrl1 ||
      customerInfo?.customerDetailsObj?.panDocUrl1 ||
      '',

    panDocUrl2:
      leadPayload?.secondaryCustomerDetailsObj?.panDocUrl2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.panDocUrl2 ||
      customerInfo?.secondaryCustomerDetailsObj?.panDocUrl2 ||
      '',
    aadharNo1:
      leadPayload?.customerDetailsObj?.aadharNo1 ||
      selUnitDetails?.customerDetailsObj?.aadharNo1 ||
      customerInfo?.customerDetailsObj?.aadharNo1 ||
      '',
    aadharNo2:
      leadPayload?.secondaryCustomerDetailsObj?.aadharNo2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.aadharNo2 ||
      customerInfo?.secondaryCustomerDetailsObj?.aadharNo2 ||
      '',
    aadharUrl1:
      leadPayload?.customerDetailsObj?.aadharUrl1 ||
      selUnitDetails?.customerDetailsObj?.aadharUrl1 ||
      customerInfo?.customerDetailsObj?.aadharUrl1 ||
      '',
    aadharUrl2:
      leadPayload?.secondaryCustomerDetailsObj?.aadharUrl2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.aadharUrl2 ||
      customerInfo?.secondaryCustomerDetailsObj?.aadharUrl2 ||
      '',
    occupation1:
      leadPayload?.customerDetailsObj?.occupation1 ||
      selUnitDetails?.customerDetailsObj?.occupation1 ||
      customerInfo?.customerDetailsObj?.occupation1 ||
      '',
    occupation2:
      leadPayload?.secondaryCustomerDetailsObj?.occupation2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.occupation2 ||
      customerInfo?.secondaryCustomerDetailsObj?.occupation2 ||
      '',
    companyName1:
      leadPayload?.customerDetailsObj?.companyName1 ||
      selUnitDetails?.customerDetailsObj?.companyName1 ||
      customerInfo?.customerDetailsObj?.companyName1 ||
      '',
    designation1:
      leadPayload?.customerDetailsObj?.designation1 ||
      selUnitDetails?.customerDetailsObj?.designation1 ||
      customerInfo?.customerDetailsObj?.designation1 ||
      '',
    designation2:
      leadPayload?.secondaryCustomerDetailsObj?.designation2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.designation2 ||
      customerInfo?.customerDetailsObj?.designation2 ||
      '',
    annualIncome1:
      leadPayload?.customerDetailsObj?.annualIncome1 ||
      selUnitDetails?.customerDetailsObj?.annualIncome1 ||
      customerInfo?.customerDetailsObj?.annualIncome1 ||
      '',
    annualIncome2:
      leadPayload?.secondaryCustomerDetailsObj?.annualIncome2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.annualIncome2 ||
      customerInfo?.secondaryCustomerDetailsObj?.annualIncome2 ||
      '',

    companyName2:
      leadPayload?.secondaryCustomerDetailsObj?.companyName2 ||
      selUnitDetails?.secondaryCustomerDetailsObj?.companyName2 ||
      customerInfo?.secondaryCustomerDetailsObj?.companyName2 ||
      '',

    aggrementAddress:
      leadPayload?.aggrementDetailsObj?.aggrementAddress ||
      customerInfo?.customerDetailsObj?.aggrementAddress ||
      '',
    industry: leadPayload?.industry || '',
    designation: leadPayload?.designation || '',
    annualIncome: leadPayload?.annualIncome || '',
    leadSource:
      leadPayload?.Status === 'booked'
        ? leadPayload[`${uid}_otherInfo`]?.leadSource
        : '',
    sourceOfPay:
      leadPayload?.Status === 'booked'
        ? leadPayload[`${uid}_otherInfo`]?.sourceOfPay
        : customerInfo?.customerDetailsObj?.aggrementAddress || '',
    purpose:
      leadPayload?.Status === 'booked'
        ? leadPayload[`${uid}_otherInfo`]?.purpose
        : '',
    // leadSource: "",
    // sourceOfPay: "",
    // purpose: "",
    bookingSource: leadPayload?.bookingSource || '',
    bookedBy: leadPayload?.bookedBy || leadPayload?.assignedToObj?.label || '',
    purchasePurpose: leadPayload?.purchasePurpose || '',
  }
  // Custom PAN card validation function
  const isValidPAN = (value) => {
    const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/
    console.log('match value is ', value, value === '', value == undefined)
    if (value === '' || value == undefined) {
      return true
    }
    return regex.test(value)
  }

  const isValidAadhar = (value) => {
    // Aadhar card format: 12 digits
    const regex = /^\d{12}$/
    if (value === '' || value == undefined) {
      return true
    }
    return regex.test(value)
  }
  const validateSchema = Yup.object({
    customerName1: Yup.string().required('Required'),
    // co_Name1: Yup.string().required('Required'),
    panNo1: Yup.string().test('pan', 'Invalid PAN card number', isValidPAN),
    panNo2: Yup.string().test('pan', 'Invalid PAN card number', isValidPAN),
    // panDocUrl1: Yup.string().required('Required'),
    // aadharNo1: Yup.string().test(
    //   'aadhar',
    //   'Invalid Aadhar card number',
    //   isValidAadhar
    // ),
    aadharNo2: Yup.string().test(
      'aadhar',
      'Invalid Aadhar card number',
      isValidAadhar
    ),
    // aadharUrl1: Yup.string().required('Required'),
    // occupation1: Yup.string().required('Required'),
    // phoneNo1: Yup.string().required('Required'),
    email1: Yup.string().email('Email is invalid'),
    email2: Yup.string().email('Email is invalid'),
    // aggrementAddress: Yup.string().required('Required'),
  })

  const onSubmit = async (data, resetForm) => {
    console.log('customer details form', data)

    const {
      customerName1,
      relation1,
      co_Name1,
      phoneNo1,
      email1,
      dob1,
      marital1,
      panNo1,
      panDocUrl1,
      aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
      customerName2,
      relation2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
      aggrementAddress,
      industry,
      designation,
      annualIncome,
      leadSource,
      sourceOfPay,
      purpose,
      bookingSource,
      bookedBy,
      purchasePurpose,
      city1,
      address1,
      city2,
      address2,
      state1,
      state2,
      annualIncome1,
      annualIncome2,
    } = data
    const { uid } = selUnitDetails
    const customerDetailsObj = {
      customerName1: customerName1,
      relation1: relation1,
      co_Name1: co_Name1,
      phoneNo1: phoneNo1,
      email1: email1,
      dob1: dob1,
      marital1: marital1,
      panNo1: panNo1,
      panDocUrl1: panCard1 || '',
      aadharNo1: aadharNo1,
      aadharUrl1: aadhrUrl1 || '',
      occupation1,
      companyName1,
      city1,
      state1,
      address1,
      annualIncome1,
    }
    const secondaryCustomerDetailsObj = {
      customerName2,
      relation2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2: panCard2 || '',
      aadharNo2,
      aadharUrl2: aadhrUrl2 || '',
      occupation2,
      companyName2,
      state2,
      city2,
      address2,
      annualIncome2,
    }
    const aggrementDetailsObj = {
      aggrementAddress,
    }

    const xData = {}
    xData[`${uid}${'_source_of_pay'}`] = { self: 20, bank: 80 } // sourceOfPay
    xData[`${uid}${'_otherInfo'}`] = { leadSource, sourceOfPay, purpose }

    const updateDoc = {
      customerDetailsObj,
      secondaryCustomerDetailsObj,
      aggrementDetailsObj,
      ...xData,
      industry,
      designation,
      annualIncome,
    }
    // local updater
    setCustomerInfo(updateDoc)

    if (source === 'fromBookedUnit' || source === 'Booking') {
      // create lead and call below function

      await onSubmitFun(data, updateDoc, resetForm)
      console.log('am here', leadPayload)
      // await  updateLeadCustomerDetailsTo(
      //   orgId,
      //   leadPayload?.id,
      //   updateDoc,
      //   'nitheshreddy.email@gmail.com',
      //   enqueueSnackbar,
      //   resetForm
      // )
    } else {
      updateLeadCustomerDetailsTo(
        orgId,
        leadPayload?.id,
        updateDoc,
        'nitheshreddy.email@gmail.com',
        enqueueSnackbar,
        resetForm
      )
    }

    if (currentMode == 'unitBookingMode') {
      setOnStep('additonalInfo')
    } else if (currentMode == 'unitBlockMode') {
      setOnStep('blocksheet')
    }
  }
  const handleFileUploadFun = async (file, type, formik) => {
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
            // setFiles([...files, file])
            if (type === 'panCard1') {
              // setPanCard1(url)
              formik.setFieldValue('panDocUrl1', url)
            } else if (type === 'panCard2') {
              // setPanCard2(url)
              formik.setFieldValue('panDocUrl2', url)
            } else if (type === 'aadharNo1Url') {
              // setAadharUrl1(url)
              formik.setFieldValue('aadharUrl1', url)
            } else if (type === 'aadharNo2Url') {
              // setAadharUrl2(url)
              formik.setFieldValue('aadharUrl2', url)
            }
            console.log(
              'file url i s',
              url,
              'dd',
              type,
              type === 'aadharNo1Url',
              aadhrUrl1
            )
            return url
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  const bgImgStyle = {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1605106715994-18d3fecffb98?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  return (
    <>
      <div className="font-['Inter']">
        <div className="z-10">
          {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        </div>
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col rounded-lg bg-white ">
            <div className="mt-0">
              <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={validateSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log('submitted', values)

                  onSubmit(values, resetForm)
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="form">
                      {/* Phase Details */}

                      <section className=" bg-blueGray-50">
                        <div className="w-full mx-auto ">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg  bg-[#F9FBFB] border-0">
                            <div className="flex-auto">
                              <section className=" lg:px-2 py-2">
                                <div className="flex flex-col gap-1">
                                  <section
                                    className="   bg-[#fff] "
                                    style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                  >
                                    <div
                                      className="w-full  flex flex-row justify-between mb-2 p-4 bg-violet-100 rounded-t-md"
                                      style={bgImgStyle}
                                    >
                                      <section className="flex flex-row">
                                        <div className="w-[43.80px] h-[47px] bg-zinc-100 rounded-[5px] mr-2"></div>
                                        <div className="w-full flex flex-col">
                                          <h6 className="w-full lg:w-12/12 text-white text-[13px] mt-[2px] mb- font-bold uppercase">
                                            Applicant
                                          </h6>
                                          <div
                                            className="text-[12px] cursor-pointer  bg-white rounded-full px-2 py-[2px]"
                                            onClick={() =>
                                              setShowLeadLink(!showLeadLink)
                                            }
                                          >
                                            <LinkIcon className="w-4 h-4 cursor-pointer ml-1 mb-[3px] mr-2 inline-block text-gray-400  rounded-[16px] " />
                                            Link with lead
                                          </div>
                                          {/* <div className="w-[455.80px] opacity-50 text-white  text-[12px] font-normal ">
                                            Details of applicant is mandatory
                                          </div> */}
                                        </div>
                                      </section>

                                      <section className="text-white flex flex-col">
                                        <label className="text-right">
                                          {' '}
                                          {stepIndx} of {StatusListA?.length}{' '}
                                          steps
                                        </label>
                                      </section>
                                    </div>
                                    {showLeadLink && (
                                      <div className="bg-[#DCD7FF] rounded-xl p-2 mx-2 flex-col">
                                        <label>Search Lead Phone no</label>
                                        <div className="w-full lg:w-3/12 px- ">
                                          <div className="relative w-full ">
                                            <PhoneNoField
                                              label="Phone No"
                                              name="phoneNo1"
                                              // type="text"
                                              value={formik.values.phoneNo1}
                                              onChange={(value) => {
                                                // formik.setFieldValue('mobileNo', value.value)
                                                console.log('value is ', value)
                                                //
                                                formik.setFieldValue(
                                                  'phoneNo1',
                                                  value.value
                                                )
                                                setGivenPhNo1(value.value)
                                              }}
                                              // value={formik.values.mobileNo}
                                              options={{}}
                                              labelSize="text-[11px]"
                                              textSize="text-[12px]"
                                              txtPad="px-1"
                                              className="text-[10px]"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex flex-wrap p-4 pt-2">
                                      <div className="w-full flex flex-row justify-between lg:w-12/12 ">
                                        <div className="relative lg:w-6/12 mb-3 mt-2">
                                          <TextField
                                            label="Customer Name*"
                                            name="customerName1"
                                            type="text"
                                          />
                                        </div>
                                        <div className="relative lg:w-6/12  mt-1 ml-2">
                                          <label className="label font-regular text-[12px] block mb-1 mt-1 text-gray-700">
                                            Son/Daughter/Wife of{' '}
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
                                                  style={{ height: '32px' }}
                                                >
                                                  <NoBorderDropDown
                                                    name="relation1"
                                                    label=""
                                                    className="input  min-w-[85px] h-[32px]"
                                                    onChange={(value) => {
                                                      formik.setFieldValue(
                                                        'relation1',
                                                        value.value
                                                      )
                                                    }}
                                                    value={
                                                      formik.values.relation1
                                                    }
                                                    options={[
                                                      {
                                                        label: 'D/O',
                                                        value: 'D/O',
                                                      },
                                                      {
                                                        label: 'S/O',
                                                        value: 'S/O',
                                                      },
                                                      {
                                                        label: 'W/O',
                                                        value: 'W/O',
                                                      },
                                                    ]}
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            label=""
                                            name="co_Name1"
                                            type="text"
                                            value={formik.values.co_Name1}
                                            onChange={formik.handleChange}
                                          />
                                        </div>
                                      </div>

                                      <div className="w-full  flex flex-row lg:w-12/12 ">
                                        <div className="w-full lg:w-3/12 px- ">
                                          <div className="relative w-full ">
                                            <PhoneNoField
                                              label="Phone No"
                                              name="phoneNo1"
                                              // type="text"
                                              value={formik.values.phoneNo1}
                                              onChange={(value) => {
                                                // formik.setFieldValue('mobileNo', value.value)
                                                console.log('value is ', value)
                                                //
                                                formik.setFieldValue(
                                                  'phoneNo1',
                                                  value.value
                                                )
                                                // setGivenPhNo1(value.value)
                                              }}
                                              // value={formik.values.mobileNo}
                                              options={{}}
                                              labelSize="text-[11px]"
                                              textSize="text-[12px]"
                                              txtPad="px-1"
                                              className="text-[10px]"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-3/12 pl-4">
                                          <div className="relative w-full">
                                            <TextField
                                              label="Email"
                                              name="email1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-3/12 pl-4  ">
                                          <section className="">
                                            <div className="w-full flex flex-col mb-3">
                                              <CustomSelect
                                                name="MaritualStatus"
                                                label="Status"
                                                className="input"
                                                onChange={(value) => {
                                                  formik.setFieldValue(
                                                    'marital1',
                                                    value
                                                  )
                                                }}
                                                value={
                                                  formik?.values?.marital1.value
                                                }
                                                options={[
                                                  {
                                                    label: 'Divorced',
                                                    value: 'Divorced',
                                                  },
                                                  {
                                                    label: 'Married',
                                                    value: 'Married',
                                                  },
                                                  {
                                                    label: 'Single',
                                                    value: 'Single',
                                                  },
                                                ]}
                                              />
                                              <p
                                                className="text-sm text-red-500 hidden mt-3"
                                                id="error"
                                              >
                                                Please fill out this field.
                                              </p>
                                            </div>
                                          </section>
                                        </div>
                                        <div className="w-full lg:w-3/12 mt-[px] pl-4 mr-3">
                                          <div className="relative w-full mb-3 ">
                                            <label className="text-gray-500 text-[10px]">
                                              Date Of Birth
                                            </label>
                                            <span className="inline">
                                              <DatePicker
                                                className="h-8 outline-none border-radius rounded-md  px-2 border-[#cccccc] border-gray-500 text-sm mt-[-4px] pb-1  w-[90%] inline  w-full flex bg-grey-lighter text-grey-darker border border-gray-500 "
                                                label="Dated"
                                                name="dob1"
                                                selected={formik.values.dob1}
                                                onChange={(date) => {
                                                  formik.setFieldValue(
                                                    'dob1',
                                                    date.getTime()
                                                  )
                                                }}
                                                timeFormat="HH:mm"
                                                injectTimes={[
                                                  setHours(setMinutes(d, 1), 0),
                                                  setHours(
                                                    setMinutes(d, 5),
                                                    12
                                                  ),
                                                  setHours(
                                                    setMinutes(d, 59),
                                                    23
                                                  ),
                                                ]}
                                                dateFormat="MMMM d, yyyy"
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      {}
                                      <div className="w-full">
                                        <div className="flex flex-row justify-between">
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
                                                    style={{ height: '32px' }}
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
                                                        .panDocUrl1 != '' && (
                                                        <button
                                                          onClick={() =>
                                                            downloadImage(
                                                              formik.values
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
                                                        onChange={async (e) => {
                                                          await handleFileUploadFun(
                                                            e.target.files[0],
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
                                              onChange={formik.handleChange}
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
                                                    style={{ height: '32px' }}
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
                                                        .aadharUrl1 != '' && (
                                                        <button
                                                          onClick={() =>
                                                            downloadImage(
                                                              formik.values
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
                                                            e.target.files[0],
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
                                              value={formik.values.aadharNo1}
                                              onChange={formik.handleChange}
                                            />
                                          </section>
                                        </div>
                                        <div className="w-full lg:w-12/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField
                                              label="Address"
                                              name="address1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full  flex flex-row lg:w-12/12">
                                          <div className="w-full lg:w-12/12 px- ">
                                            <div className="relative w-full mb-3 mt-2">
                                              <TextField
                                                label="City"
                                                name="city1"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full lg:w-12/12 pl-4">
                                            <div className="relative w-full mb-3 mt-2">
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
                                                  value={formik.values.state1}
                                                  options={statesList}
                                                />
                                                <p
                                                  className="text-sm text-red-500 hidden mt-3"
                                                  id="error"
                                                >
                                                  Please fill out this field.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* <div className="w-full flex flex-row">
                                          <div className="  px-">
                                            <div className="relative w-[160px] mb-3 mt-2">
                                              <TextField
                                                label="PAN No"
                                                name="panNo1"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className=" border-b border-gray-500 mb-[12px] ">
                                            <div className=" min-w-[140px] mt-3">
                                              <div className="flex flex-row-reverse">
                                                <label
                                                  htmlFor="formFile3"
                                                  className="form-label cursor-pointer inline-block mb-1  font-regular text-xs  rounded-2xl px-1 py-1  "
                                                >
                                                  {`${
                                                    panCard1 === '' ||
                                                    panCard1 == undefined
                                                      ? 'Upload'
                                                      : 'Download'
                                                  }`}
                                                </label>
                                                {panCard2 != '' && (
                                                  <button
                                                    onClick={() =>
                                                      downloadImage(
                                                        panCard1,
                                                        'pancard1.PNG'
                                                      )
                                                    }
                                                  >
                                                    {' '}
                                                    {panCard1 === '' ||
                                                    panCard1 == undefined ? (
                                                      <PlusIcon className="w-4 h-4 cursor-pointer ml-1 mb-[9px] mr-2 inline-block text-gray-400 border rounded-[16px] " />
                                                    ) : (
                                                      <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer ml-1 mb-[9px] mr-2 inline-block text-gray-400 " />
                                                    )}
                                                  </button>
                                                )}
                                                <input
                                                  type="file"
                                                  className="hidden"
                                                  id="formFile3"
                                                  onChange={async (e) => {
                                                    await handleFileUploadFun(
                                                      e.target.files[0],
                                                      'panCard1'
                                                    )
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div> */}

                                        <div className="w-full  flex flex-row lg:w-12/12 ">
                                          <div className="w-full lg:w-12/12 px- ">
                                            <div className="relative w-full mb-3 mt-[10px]">
                                              <TextField
                                                label="Occupation"
                                                name="occupation1"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full lg:w-12/12 pl-4">
                                            <div className="relative w-full mb-3 mt-2">
                                              <TextField
                                                label="Annual Income"
                                                name="annualIncome1"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  {/* section-2 */}
                                  <section
                                    // className="rounded-md   bg-[#fff] lg:w-6/12"
                                    className="rounded-md   bg-[#fff] "
                                    style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                  >
                                    <div
                                      className="w-full  flex flex-row mb-2 p-4 bg-violet-100 rounded-t-md"
                                      style={bgImgStyle}
                                    >
                                      <div className="w-[43.80px] h-[47px] bg-zinc-100 rounded-[5px]"></div>
                                      <div className="w-full flex flex-col">
                                        <h6 className="w-full lg:w-12/12 text-white text-[13px] mt-[9px] mb- font-bold uppercase">
                                          Co-applicant
                                        </h6>
                                        <div className="w-[455.80px] opacity-50 text-gray-100  text-[12px] font-normal ">
                                          Details of co-applicant is not a
                                          mandatory
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap p-4 pt-2 ">
                                      <div className="w-full lg:w-12/12 ">
                                        <div className="relative w-full mb-3 mt-2">
                                          <TextField
                                            label="Co-applicant Name*"
                                            name="customerName2"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                      <label className="label font-regular text-[12px] block mb-1 mt-1 text-gray-700">
                                        Son/Daughter/Wife of{' '}
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
                                              style={{ height: '32px' }}
                                            >
                                              <NoBorderDropDown
                                                name="relation2"
                                                label=""
                                                className="input  min-w-[85px] h-[32px]"
                                                onChange={(value) => {
                                                  formik.setFieldValue(
                                                    'relation2',
                                                    value.value
                                                  )
                                                }}
                                                value={formik.values.relation2}
                                                options={[
                                                  {
                                                    label: 'D/O',
                                                    value: 'D/O',
                                                  },
                                                  {
                                                    label: 'S/O',
                                                    value: 'S/O',
                                                  },
                                                  {
                                                    label: 'W/O',
                                                    value: 'W/O',
                                                  },
                                                ]}
                                              />
                                            </InputAdornment>
                                          ),
                                        }}
                                        label=""
                                        name="co_Name2"
                                        type="text"
                                        value={formik.values.co_Name2}
                                        onChange={formik.handleChange}
                                      />
                                      <div className="w-full  flex flex-row lg:w-12/12 mt-1">
                                        <div className="w-full lg:w-5/12 px- ">
                                          <div className="relative w-full mb-3 mt-[10px]">
                                            <PhoneNoField
                                              label="Phone No"
                                              name="phoneNo2"
                                              // type="text"
                                              value={formik.values.phoneNo2}
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
                                        <div className="w-full lg:w-7/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField
                                              label="Email"
                                              name="email2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {/* col dob etc */}
                                      <div>
                                        <div className="flex flex-wrap mt-3">
                                          <div className="w-full lg:w-5/12 px-">
                                            <section className="">
                                              <div className="w-full flex flex-col mb-3">
                                                <CustomSelect
                                                  name="MaritualStatus"
                                                  label="Status"
                                                  className="input"
                                                  onChange={(value) => {
                                                    formik.setFieldValue(
                                                      'marital2',
                                                      value
                                                    )
                                                  }}
                                                  value={
                                                    formik?.values?.marital2
                                                      ?.value
                                                  }
                                                  options={[
                                                    {
                                                      label: 'Divorced',
                                                      value: 'Divorced',
                                                    },
                                                    {
                                                      label: 'Married',
                                                      value: 'Married',
                                                    },
                                                    {
                                                      label: 'Single',
                                                      value: 'Single',
                                                    },
                                                  ]}
                                                />
                                                <p
                                                  className="text-sm text-red-500 hidden mt-3"
                                                  id="error"
                                                >
                                                  Please fill out this field.
                                                </p>
                                              </div>
                                            </section>
                                          </div>

                                          <div className="w-full lg:w-7/12 mt-[px] pl-4 ">
                                            <div className="relative w-full mb-3 ">
                                              <label
                                                htmlFor={'dob2'}
                                                className="text-gray-500 text-[10px]"
                                              >
                                                Date Of Birth
                                              </label>
                                              <span className="inline">
                                                <DatePicker
                                                  className="h-8 outline-none border-[#cccccc] rounded-md px-2 border-gray-500 text-sm mt-[-4px] pb-1   w-[90%]  inline      w-full flex bg-grey-lighter text-grey-darker border border-gray-500 "
                                                  label="Dated"
                                                  name="dob2"
                                                  selected={formik.values.dob2}
                                                  onChange={(date) => {
                                                    if (date) {
                                                      formik.setFieldValue(
                                                        'dob2',
                                                        date.getTime()
                                                      )
                                                    }
                                                    // setStartDate(date)
                                                    // console.log(startDate)
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
                                                  dateFormat="MMMM d, yyyy"
                                                />
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="w-full lg:w-12/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField
                                              label="Address"
                                              name="address2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full  flex flex-row lg:w-12/12 mt-1">
                                          <div className="w-full lg:w-5/12 px- ">
                                            <div className="relative w-full mb-3 mt-2">
                                              <TextField
                                                label="City"
                                                name="city2"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full lg:w-7/12 pl-4">
                                            <div className="relative w-full mb-3 mt-2">
                                              <div className="w-full flex flex-col mb-3">
                                                <CustomSelect
                                                  name="state2"
                                                  label="State"
                                                  className="input"
                                                  onChange={(value) => {
                                                    formik.setFieldValue(
                                                      'state2',
                                                      value.value
                                                    )
                                                  }}
                                                  value={formik.values.state2}
                                                  options={statesList}
                                                />
                                                <p
                                                  className="text-sm text-red-500 hidden mt-3"
                                                  id="error"
                                                >
                                                  Please fill out this field.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
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
                                                style={{ height: '32px' }}
                                              >
                                                <div className="flex flex-row-reverse">
                                                  <label
                                                    htmlFor="formFile3"
                                                    className="form-label cursor-pointer inline-block   font-regular text-xs  rounded-2xl px-1 py-1  "
                                                  >
                                                    {`${
                                                      formik.values
                                                        .panDocUrl2 === '' ||
                                                      formik.values
                                                        .panDocUrl2 == undefined
                                                        ? 'Upload'
                                                        : 'Download'
                                                    }`}
                                                  </label>
                                                  {formik.values.panDocUrl2 !=
                                                    '' && (
                                                    <button
                                                      onClick={() =>
                                                        downloadImage(
                                                          panCard2,
                                                          'pancard2.PNG'
                                                        )
                                                      }
                                                    >
                                                      {' '}
                                                      {formik.values
                                                        .panDocUrl2 === '' ||
                                                      formik.values
                                                        .panDocUrl2 ==
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
                                                    onChange={async (e) => {
                                                      await handleFileUploadFun(
                                                        e.target.files[0],
                                                        'panCard2',
                                                        formik
                                                      )
                                                    }}
                                                  />
                                                </div>
                                              </InputAdornment>
                                            ),
                                          }}
                                          label=""
                                          name="panNo2"
                                          type="text"
                                          value={formik.values.panNo2}
                                          onChange={formik.handleChange}
                                        />
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
                                                style={{ height: '32px' }}
                                              >
                                                <div className=" flex flex-row-reverse">
                                                  <label
                                                    htmlFor="formFile4"
                                                    className="form-label cursor-pointer inline-block  font-regular text-xs  rounded-2xl px-1 py-1"
                                                  >
                                                    {`${
                                                      formik.values
                                                        .aadharUrl2 === '' ||
                                                      formik.values
                                                        .aadharUrl2 == undefined
                                                        ? 'Upload'
                                                        : 'Download'
                                                    }`}
                                                  </label>
                                                  {formik.values.aadharUrl2 !=
                                                    '' && (
                                                    <button
                                                      onClick={() =>
                                                        downloadImage(
                                                          formik.values
                                                            .aadharUrl2,
                                                          'Aadhar2.PNG'
                                                        )
                                                      }
                                                    >
                                                      {' '}
                                                      {formik.values
                                                        .aadharUrl2 === '' ||
                                                      formik.values
                                                        .aadharUrl2 ==
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
                                                        e.target.files[0],
                                                        'aadharNo2Url',
                                                        formik
                                                      )
                                                    }}
                                                  />
                                                </div>
                                              </InputAdornment>
                                            ),
                                          }}
                                          label=""
                                          name="aadharNo2"
                                          type="text"
                                          value={formik.values.aadharNo2}
                                          onChange={formik.handleChange}
                                        />

                                        <div className="w-full  flex flex-row lg:w-12/12 mt-1">
                                          <div className="w-full lg:w-5/12 px- ">
                                            <div className="relative w-full mb-3 mt-[10px]">
                                              <TextField
                                                label="Occupation"
                                                name="occupation2"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full lg:w-7/12 pl-4">
                                            <div className="relative w-full mb-3 mt-2">
                                              <TextField
                                                label="Annual Income"
                                                name="annualIncome2"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>

                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                  Source Of Booking
                                </h6>
                                <div className="flex flex-wrap">
                                  <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <TextField
                                        label="Source"
                                        name="bookingSource"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <TextField
                                        label="Booked By"
                                        name="bookedBy"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <TextField
                                        label="Purpose of purchase"
                                        name="purchasePurpose"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div> */}

                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                              </section>
                            </div>
                          </div>
                          <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse py-3 mr-6 flex flex-col mt-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full w-[680px]">
                            {setShowApplicantEdit != undefined && (
                              <button
                                className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                disabled={loading}
                                onClick={() => setShowApplicantEdit(false)}
                              >
                                {'Cancel'}
                              </button>
                            )}

                            <button
                              className="mb-2  md:mb-0  hover:scale-110 focus:outline-none              hover:bg-[#5671fc]
bg-gradient-to-r from-violet-300 to-indigo-300
text-black

border duration-200 ease-in-out
transition
 px-5 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-green-500"
                              type="submit"
                              disabled={loading}
                              // onClick={() => submitFormFun(formik)}
                            >
                              {/* {loading && <Loader />} */}
                              <span> {'Save'}</span>
                            </button>
                            {setShowApplicantEdit == undefined && (
                              <button
                                className="mb-2 mr-0 md:mb-0  hover:scale-110 focus:outline-none              hover:bg-[#5671fc]
bg-gradient-to-r from-violet-300 to-indigo-300
text-black

border duration-200 ease-in-out
transition
 px-5 py-1 pb-[5px] text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-green-500"
                                type="submit"
                                disabled={loading}
                                // onClick={() => submitFormFun(formik)}
                              >
                                {/* {loading && <Loader />} */}
                                <span> {'Save & Next'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {/* old form  */}
    </>
  )
}

export default AddApplicantDetails
