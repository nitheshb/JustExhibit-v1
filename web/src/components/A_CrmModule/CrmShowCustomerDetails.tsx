/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { RadioGroup } from '@headlessui/react'
import { ArrowCircleDownIcon } from '@heroicons/react/solid'
import { Box } from '@mui/material'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Form, Formik, Field } from 'formik'
import { useSnackbar } from 'notistack'
import DatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import { useRouterStateSetter } from '@redwoodjs/router/dist/router-context'

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
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'
import { prettyDate } from 'src/util/dateConverter'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { PhoneNoField2 } from 'src/util/formFields/phNoField2'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'
import { TextField2 } from 'src/util/formFields/TextField2'

import NoBorderDropDown from '../comps/noBorderDropDown'
import { useFileUpload } from '../useFileUpload'

import Loader from './Loader/Loader'

const ShowCustomerDetails = ({
  source,
  title,
  leadDetailsObj2,
  selUnitDetails,
  dialogOpen,
  setShowApplicantEdit,
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

  useEffect(() => {
    console.log('yo yo ', selUnitDetails, leadDetailsObj2)
    setPanCard1(leadDetailsObj2?.customerDetailsObj?.panDocUrl1)
    setPanCard2(leadDetailsObj2?.secondaryCustomerDetailsObj?.panDocUrl2)
    setAadharUrl1(leadDetailsObj2?.customerDetailsObj?.aadharUrl1)
    setAadharUrl2(leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharUrl2)
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
    console.log('new customer object', leadDetailsObj2)
  }, [leadDetailsObj2])

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
  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]
  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: 'Bangalore,KA' },
    { label: '10 - 20 Lacs', value: 'Cochin,KL' },
    { label: '20 - 30 Lacs', value: 'Mumbai,MH' },
    { label: '30 - 40 Lacs', value: 'Mumbai,MH' },
    { label: '40 - 50 Lacs', value: 'Mumbai,MH' },
    { label: '50 - 60 Lacs', value: 'Mumbai,MH' },
    { label: '60 - 70 Lacs', value: 'Mumbai,MH' },
    { label: '70 - 80 Lacs', value: 'Mumbai,MH' },
    { label: '80 - 90 Lacs', value: 'Mumbai,MH' },
    { label: '90 - 100 Lacs', value: 'Mumbai,MH' },
    { label: '1.0 Cr - 1.1 Cr', value: 'Mumbai,MH' },
    { label: '1.1 Cr - 1.2 Cr', value: 'Mumbai,MH' },
    { label: '1.2 Cr - 1.3 Cr', value: 'Mumbai,MH' },
    { label: '1.3 Cr - 1.4 Cr', value: 'Mumbai,MH' },
    { label: '1.4 Cr - 1.5 Cr', value: 'Mumbai,MH' },
    { label: '1.5 + Cr', value: 'Mumbai,MH' },
  ]

  const plans = [
    {
      name: 'Apartment',
      img: '/apart1.svg',
    },
    {
      name: 'Plots',
      img: '/plot.svg',
    },
    {
      name: 'WeekendVillas',
      img: '/weekend.svg',
    },
    {
      name: 'Villas',
      img: '/villa.svg',
    },
  ]

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
  const [startDate, setStartDate] = useState(new Date())
  const [selRef1, setRefDataFun1] = useState({ label: 'S/O', value: 'S/O' })
  const [selRef2, setRefDataFun2] = useState({ label: 'S/O', value: 'S/O' })

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
  const onSubmitFun = async (data, resetForm) => {
    console.log(data)
    setLoading(true)

    const {
      email,
      name,
      mobileNo,
      assignedTo,
      assignedToObj,
      source,
      project,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfLeadAlreadyExists('spark_leads', mobileNo)
    const leadData = {
      Date: Timestamp.now().toMillis(),
      Email: email,
      Mobile: mobileNo,
      Name: name,
      Note: '',
      Event: project,
      Source: source,
      Status: assignedTo === '' ? 'unassigned' : 'new',
      intype: 'Form',
      assignedTo: assignedToObj?.value || '',
      assignedToObj: {
        department: assignedToObj?.department || [],
        email: assignedToObj?.email || '',
        label: assignedToObj?.label || '',
        name: assignedToObj?.name || '',
        namespace: orgId,
        roles: assignedToObj?.roles || [],
        uid: assignedToObj?.value || '',
        value: assignedToObj?.value || '',
      },
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('Lead Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addLead(
        orgId,
        leadData,
        user?.email,
        `lead created and assidged to ${assignedTo}`
      )

      await sendWhatAppTextSms(
        mobileNo,
        `Thank you ${name} for choosing the world className ${
          project || 'project'
        }`
      )

      // msg2
      await sendWhatAppMediaSms(mobileNo)
      const smg =
        assignedTo === ''
          ? 'You Interested will be addressed soon... U can contact 9123456789 mean while'
          : 'we have assigned dedicated manager to you. Mr.Ram as ur personal manager'

      // msg3
      sendWhatAppTextSms(mobileNo, smg)
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }

  // const { uid } = selUnitDetails
  const uid = selUnitDetails?.uid || selUnitDetails?.id
  const datee = new Date().getTime()
  const initialState = {
    customerName1:
      leadDetailsObj2?.customerDetailsObj?.customerName1 ||
      leadDetailsObj2?.Name ||
      '',
    customerName2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.customerName2 || '',
    co_Name1: leadDetailsObj2?.customerDetailsObj?.co_Name1 || '',
    co_Name2: leadDetailsObj2?.secondaryCustomerDetailsObj?.co_Name2 || '',
    phoneNo1:
      leadDetailsObj2?.customerDetailsObj?.phoneNo1 ||
      leadDetailsObj2?.Mobile ||
      '',
    phoneNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.phoneNo2 || '',
    email1:
      leadDetailsObj2?.customerDetailsObj?.email1 ||
      leadDetailsObj2?.Email ||
      '',
    email2: leadDetailsObj2?.secondaryCustomerDetailsObj?.email2 || '',
    dob1: leadDetailsObj2?.customerDetailsObj?.dob1 || datee,
    dob2: leadDetailsObj2?.secondaryCustomerDetailsObj?.dob2 || datee,
    marital1: leadDetailsObj2?.customerDetailsObj?.marital1 || {
      label: 'Married',
      value: 'Married',
    },
    marital2: leadDetailsObj2?.secondaryCustomerDetailsObj?.marital2 || {
      label: 'Married',
      value: 'Married',
    },
    panNo1: leadDetailsObj2?.customerDetailsObj?.panNo1 || '',
    panNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.panNo2 || '',
    panDocUrl1: leadDetailsObj2?.customerDetailsObj?.panDocUrl1 || '',

    panDocUrl2: leadDetailsObj2?.secondaryCustomerDetailsObj?.panDocUrl2 || '',
    aadharNo1: leadDetailsObj2?.customerDetailsObj?.aadharNo1 || '',
    aadharNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharNo2 || '',
    aadharUrl1: leadDetailsObj2?.customerDetailsObj?.aadharUrl1 || '',
    aadharUrl2: leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharUrl2 || '',
    occupation1: leadDetailsObj2?.customerDetailsObj?.occupation1 || '',
    companyName1: leadDetailsObj2?.customerDetailsObj?.companyName1 || '',

    occupation2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.occupation2 || '',
    companyName2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.companyName2 || '',

    aggrementAddress:
      leadDetailsObj2?.aggrementDetailsObj?.aggrementAddress || '',
    industry: leadDetailsObj2?.industry || '',
    designation: leadDetailsObj2?.designation || '',
    annualIncome: leadDetailsObj2?.annualIncome || '',
    leadSource:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.leadSource
        : '',
    sourceOfPay:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.sourceOfPay
        : '',
    purpose:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.purpose
        : '',
    // leadSource: "",
    // sourceOfPay: "",
    // purpose: "",
    bookingSource: leadDetailsObj2?.bookingSource || '',
    bookedBy:
      leadDetailsObj2?.bookedBy || leadDetailsObj2?.assignedToObj?.label || '',
    purchasePurpose: leadDetailsObj2?.purchasePurpose || '',
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
    // customerName1: Yup.string().required('Required'),
    // co_Name1: Yup.string().required('Required'),
    panNo1: Yup.string().test('pan', 'Invalid PAN card number', isValidPAN),
    panNo2: Yup.string().test('pan', 'Invalid PAN card number', isValidPAN),
    // panDocUrl1: Yup.string().required('Required'),
    aadharNo1: Yup.string().test(
      'aadhar',
      'Invalid Aadhar card number',
      isValidAadhar
    ),
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

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  const onSubmit = async (data, resetForm) => {
    console.log('customer details form', data)
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
    const { uid } = selUnitDetails
    const customerDetailsObj = {
      customerName1: customerName1,
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
    }
    const secondaryCustomerDetailsObj = {
      customerName2,
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
    const { id } = leadDetailsObj2
    console.log('did you find my id', id, leadDetailsObj2)

    if (source === 'fromBookedUnit') {
      updateUnitCustomerDetailsTo(
        orgId,
        id,
        updateDoc,
        'nitheshreddy.email@gmail.com',
        enqueueSnackbar,
        resetForm
      )
    } else {
      updateLeadCustomerDetailsTo(
        orgId,
        id,
        updateDoc,
        'nitheshreddy.email@gmail.com',
        enqueueSnackbar,
        resetForm
      )
    }

    // const updatedData = {
    //   ...data,
    // }

    // setLoading(true)
    // addCustomer(
    // orgId,
    //   updatedData,
    //   'nithe.nithesh@gmail.com',
    //   enqueueSnackbar,
    //   resetForm
    // )
    // setLoading(false)
  }
  const handleFileUploadFun = async (file, type) => {
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

          setProgress(prog)
          file.isUploading = false
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // createAttach(orgId, url, by, file.name, id, attachType)
            file.url = url
            // setFiles([...files, file])
            if (type === 'panCard1') {
              setPanCard1(url)
            } else if (type === 'panCard2') {
              setPanCard2(url)
            } else if (type === 'aadharNo1Url') {
              setAadharUrl1(url)
            } else if (type === 'aadharNo2Url') {
              setAadharUrl2(url)
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

  return (
    <>
      <div className="">
        <div className="z-10">
          {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        </div>
        <div className="grid gap-2 grid-cols-2 bg-[#EBECED] pt-2 py-3">
          <div
            className="flex flex-col p-4 mx-2  rounded-md   mt- bg-[#fff] hover:shadow-2xl"
            style={{
              boxShadow: '0 1px 12px #f2f2f2',
            }}
          >
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-[14px] ">
                  {leadDetailsObj2?.customerDetailsObj?.customerName1 ||
                    leadDetailsObj2?.Name ||
                    '?'}
                </span>
                <span className="font-semibold text-[12px] px-2 bg-[#E6E7E8] rounded-md mt-[2px]">
                  {leadDetailsObj2?.customerDetailsObj?.phoneNo1 ||
                    leadDetailsObj2?.Mobile ||
                    '?'}
                </span>
              </div>
              <div className="flex flex-row">
                <div
                  className="flex flex-col cursor-pointer"
                  onClick={() => setShowApplicantEdit(true)}
                >
                  <span className="font-semibold text-[12px] px-4 py-[1px] border border-[#F04A2D] bg-[#FFF0EB] text-[#D96038] rounded-md mt-[2px]">
                    Edit
                  </span>
                </div>
                <div className="flex flex-col ml-1 ">
                  <span className="font-semibold text-[12px] px-4 py-[1px] border border-[#F04A2D] bg-[#FFF0EB] text-[#D96038] rounded-md mt-[2px]">
                    Primary
                  </span>
                </div>
              </div>
            </div>
            {/* info panel */}
            <div className="flex flex-col mt-4 px-4 py-1 border border-[#E6E7E8]  rounded-md ">
              <section className="flex flex-row justify-between">
                <span className="font-semibold text-[12px]  py-1 ">
                  Details
                </span>
                <span className="font-semibold text-[12px] px-4  border border-[#3266F5] bg-[#EAF0FE] text-[#3266F5] rounded-md mt-[2px]">
                  @
                </span>
              </section>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]"> {leadDetailsObj2?.customerDetailsObj?.relation1?.value || ''}:</span>{' '}
                {leadDetailsObj2?.customerDetailsObj?.co_Name1 || '?'}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">D.O.B:</span>{' '}
                {prettyDate(leadDetailsObj2?.customerDetailsObj?.dob1 || datee)}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">Marital Status:</span>{' '}
                {leadDetailsObj2?.customerDetailsObj?.marital1?.value}
              </span>
              <section className="flex flex-row justify-between mt-4">
                <span className="font-semibold text-[12px]  py-1 ">
                  Documents
                </span>
                <span className="font-semibold text-[12px] px-4  border border-[#3266F5] bg-[#EAF0FE] text-[#3266F5] rounded-md mt-[2px]">
                  @
                </span>
              </section>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">Pan:</span>{' '}
                {leadDetailsObj2?.customerDetailsObj?.panNo1 || '?'}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px] mb-2">
                <span className="text-[#99488e]">Aadhar:</span>{' '}
                {leadDetailsObj2?.customerDetailsObj?.aadharNo1 || '?'}
              </span>
            </div>
          </div>
          <div
            className="flex flex-col p-4 mx-2  rounded-md   mt- bg-[#fff] hover:shadow-2xl"
            style={{
              boxShadow: '0 1px 12px #f2f2f2',
            }}
          >
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-[14px]">
                  {leadDetailsObj2?.secondaryCustomerDetailsObj
                    ?.customerName1 || '?'}
                </span>
                <span className="font-semibold text-[12px] px-2 bg-[#E6E7E8] rounded-md mt-[2px]">
                  {leadDetailsObj2?.secondaryCustomerDetailsObj?.phoneNo1 ||
                    '?'}
                </span>
              </div>
              <div className="flex flex-row">
                <div
                  className="flex flex-col cursor-pointer"
                  onClick={() => setShowApplicantEdit(true)}
                >
                  <span className="font-semibold text-[12px] px-4 py-[1px] border border-[#F04A2D] bg-[#FFF0EB] text-[#D96038] rounded-md mt-[2px]">
                    Edit
                  </span>
                </div>
                <div className="flex flex-col ml-1">
                  <span className="font-semibold text-[12px] px-4 py-[1px] border border-[#F04A2D] bg-[#FFF0EB] text-[#D96038] rounded-md mt-[2px]">
                    Secondary
                  </span>
                </div>
              </div>
            </div>
            {/* info panel */}
            <div className="flex flex-col mt-4 px-4 py-1 border border-[#E6E7E8]  rounded-md ">
              <section className="flex flex-row justify-between">
                <span className="font-semibold text-[12px]  py-1 ">
                  Details
                </span>
                <span className="font-semibold text-[12px] px-4  border border-[#3266F5] bg-[#EAF0FE] text-[#3266F5] rounded-md mt-[2px]">
                  @
                </span>
              </section>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">  {leadDetailsObj2?.secondaryCustomerDetailsObj?.relation2?.value || '?'}:</span>{' '}
                {leadDetailsObj2?.secondaryCustomerDetailsObj?.co_Name1 || '?'}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">D.O.B:</span>{' '}
                {prettyDate(
                  leadDetailsObj2?.secondaryCustomerDetailsObj?.dob1 || datee
                )}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">Marital Status:</span>{' '}
                {leadDetailsObj2?.secondaryCustomerDetailsObj?.marital1?.value}
              </span>
              <section className="flex flex-row justify-between mt-4">
                <span className="font-semibold text-[12px]  py-1 ">
                  Documents
                </span>
                <span className="font-semibold text-[12px] px-4  border border-[#3266F5] bg-[#EAF0FE] text-[#3266F5] rounded-md mt-[2px]">
                  @
                </span>
              </section>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px]">
                <span className="text-[#99488e]">Pan:</span>{' '}
                {leadDetailsObj2?.secondaryCustomerDetailsObj?.panNo1 || '?'}
              </span>
              <span className="font-semibold text-[12px] px-4 py-1 border border-[#EA84DD] bg-[#FCEEFA]  rounded-md mt-[8px] mb-2">
                <span className="text-[#99488e]">Aadhar:</span>{' '}
                {leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharNo1 || '?'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* old form  */}
    </>
  )
}

export default ShowCustomerDetails
