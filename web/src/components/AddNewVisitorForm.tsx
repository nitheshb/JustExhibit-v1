/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { DeviceMobileIcon, MailIcon, TrashIcon } from '@heroicons/react/outline'
import { setHours, setMinutes } from 'date-fns'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import {
  leadBinReasonList,
  sourceList,
  sourceListItems,
  visitorsCategory
} from 'src/constants/projects'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  addCpLead,
  addVisitorRegistrations,
  checkIfLeadAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
  updateLeadLakeStatus,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'
import { prettyDateTime } from 'src/util/dateConverter'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField } from 'src/util/formFields/TextField'
import { currentStatusDispFun } from 'src/util/leadStatusDispFun'

import AssigedToDropComp from './assignedToDropComp'
import Loader from './Loader/Loader'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'
import { navigate, routes } from '@redwoodjs/router'

const AddNewVisitorForm = ({ title, customerDetails }) => {
  const d = new window.Date()
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [closeWindowMode, setCloseWindowMode] = useState(false)
  const [trashMode, setTrashMode] = useState(false)
  const [binReason, setBinreason] = useState('DUPLICATE_ENTRY')
  const customPhoneNoFieldStyles = {
    border: 'none',
    borderRadius: '10px',
    outline: 'none'
  };

  const [startDate, setStartDate] = useState(d)
  const [customerDetailsTuned, setCustomerDetailsTuned] = useState({})

  useEffect(() => {
    console.log('my project data is ', customerDetails)
    loadDataFun(customerDetails, sourceList, projectList)
  }, [customerDetails, sourceList, projectList])

  const loadDataFun = async (customerDetails, sourceList, projectList) => {
    if (customerDetails) {
      const custObj = customerDetails
      const {
        responderName,
        responderEmail,
        responderPhone,
        cT,
        source,
        eventName,
      } = customerDetails
      const sourceListMatch = await sourceListItems?.filter((sourObj) => {
        return sourObj?.rep.includes(source)
      })
      const projectListMatch = await projectList?.filter((projObj) => {
        console.log(
          'my project data is',
          eventName,
          'mnd',
          projObj.value.replace(/\s/g, ''),
          'cd',
          eventName?.replace(/\s/g, '')
        )
        return (
          projObj?.value?.replace(/\s/g, '') == eventName?.replace(/\s/g, '')
        )
      })

      console.log(
        'my project data is ',
        eventName,
        customerDetails,
        projectListMatch
      )
      custObj.name = responderName
      custObj.email = responderEmail
      custObj.phone = responderPhone?.slice(-10)
      custObj.Date = cT
      custObj.source = sourceListMatch[0]?.value || ''
      custObj.project = projectListMatch[0]?.eventName || ''
      custObj.projectId = projectListMatch[0]?.uid || ''
      custObj.value = projectListMatch[0]?.eventName || ''
      await setCustomerDetailsTuned(custObj)
      await console.log('my project data is ', customerDetailsTuned, custObj)
    }
  }

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
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )
    return unsubscribe
  }, [])

  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: '5-10L' },
    { label: '10 - 20 Lacs', value: '10-20L' },
    { label: '20 - 30 Lacs', value: '20-30L' },
    { label: '30 - 40 Lacs', value: '30-40L' },
    { label: '40 - 50 Lacs', value: '40-50L' },
    { label: '50 - 60 Lacs', value: '50-60L' },
    { label: '60 - 70 Lacs', value: '60-70L' },
    { label: '70 - 80 Lacs', value: '70-80L' },
    { label: '80 - 90 Lacs', value: '80-90L' },
    { label: '90 - 100 Lacs', value: '90-100L' },
    { label: '1.0 Cr - 1.1 Cr', value: '1-1.1C' },
    { label: '1.1 Cr - 1.2 Cr', value: '1.1-1.2C' },
    { label: '1.2 Cr - 1.3 Cr', value: '1.2-1.3C' },
    { label: '1.3 Cr - 1.4 Cr', value: '1.3-1.4C' },
    { label: '1.4 Cr - 1.5 Cr', value: '1.4-1.5C' },
    { label: '1.5 + Cr', value: '1.5+' },
  ]

  const plans = [
    {
      name: 'Fashion and Accessories',
      img: '/apart1.svg',
    },
    {
      name: 'Kids',
      img: '/plot.svg',
    },
    {
      name: 'Art and Craft Supplies',
      img: '/weekend.svg',
    },
    {
      name: 'Technology and Gadgets',
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

  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [founDocs, setFoundDocs] = useState([])

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
    setLoading(true)
    const {
      email,
      name,
      mobileNo,
      countryCode,
      assignedTo,
      assignedToObj,
      source,
      project,
      projectId,
    } = data

    const foundLength = await checkIfLeadAlreadyExists(
      `${orgId}_visitors`,
       mobileNo
    )

    const leadData = {
      Date: startDate.getTime(),
      Email: email,
      Mobile: mobileNo,
      countryCode: countryCode,
      Name: name,
      Note: data?.comment,
      Event: project,
      ProjectId: projectId,
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
        offPh: assignedToObj?.offPh || '',
      },
      by: user?.email,
    }

    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFoundDocs(foundLength)
      setFormMessage('Lead Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        await addCpLead(
          orgId,
          leadData,
          user?.email,
          `lead created and assidged to ${assignedToObj?.email || assignedTo}`
        )
      } else {
        await addVisitorRegistrations(
          orgId,
          leadData,
          user?.email,
          `lead created and assidged to ${assignedToObj?.email || assignedTo}`
        )
        if (customerDetailsTuned?.id && title == 'Edit to Push Lead') {
          await updateLeadLakeStatus(orgId, customerDetailsTuned?.id, {
            status: 'added',
          })
        }
      }

      await sendWhatAppTextSms(
        mobileNo,
        `Thank you ${name} for choosing the world class ${project || 'project'}`
      )

      await sendWhatAppMediaSms(mobileNo)
      const smg =
        assignedTo === ''
          ? 'You Interested will be addressed soon... U can contact 9123456789 mean while'
          : 'we have assigned dedicated manager to you. Mr.Ram as ur personal manager'

      sendWhatAppTextSms(mobileNo, smg)
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)

      setTimeout(() => {
        navigate(routes.leadsManager());
      }, 1000);
    }
  }

  const validate = Yup.object({
    name: Yup.string()
      .max(45, 'Must be 45 characters or less')
      .required('Name is Required'),
    project: Yup.string()
      .min(3, 'Event Selection is required')
      .required('Event is Required'),
    assignedTo: Yup.string()
      .min(3, 'Event Selection is required')
      .required('Assigner is Required'),
    email: Yup.string().email('Email is invalid'),
    countryCode: Yup.string().required('Country Code is required'),
    mobileNo: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'to short')
      .max(10, 'to long'),
  })

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#053219]">
          Add Visitor
        </h1>
        {title == 'Edit to Push Lead' && (
          <button
            className="text-[#053219]"
            onClick={() => setTrashMode(true)}
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: customerDetailsTuned?.name || '',
            cDate: customerDetailsTuned?.Date || '',
            mobileNo: customerDetailsTuned?.phone || '',
            countryCode: customerDetailsTuned?.countryCode || '+91',
            email: customerDetailsTuned?.email || '',
            source: customerDetailsTuned?.source || '',
            project: customerDetailsTuned?.eventName || '',
            projectId: customerDetailsTuned?.projectId || '',
            assignedTo: customerDetailsTuned?.name || '',
            comment: customerDetailsTuned?.Note || '',
            budget: '20-30L',
            deptVal: '',
            myRole: '',
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            console.log('ami submitted', values)
            console.log('ami submitted 1', values.assignedTo === '')
            onSubmitFun(values, resetForm)
          }}
        >
          {(formik) => (
            <Form>
              {trashMode ? (
                <>
                  <div className="mb-8">
                    <h2 className="font-semibold text-[#053219] text-sm mb-1">
                      More Details<abbr title="required">*</abbr>
                    </h2>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="w-full">
                      <CustomSelect
                        name="source"
                        label="Bin Reason*"
                        className="input"
                        onChange={(value) => {
                          setBinreason(value.value)
                        }}
                        value={binReason}
                        options={leadBinReasonList}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      className="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                      type="button"
                      onClick={() => {
                        setTrashMode(false)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
                      type="button"
                      disabled={loading}
                      onClick={async () => {
                        await setLoading(true)
                        await updateLeadLakeStatus(
                          orgId,
                          customerDetailsTuned?.id,
                          {
                            status: binReason,
                          }
                        )
                        await setLoading(false)
                        await enqueueSnackbar('Lead moved Successfuly', {
                          variant: 'success',
                        })
                      }}
                    >
                      {loading && <Loader />}
                      Bin
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="font-semibold text-[#053219] text-sm mb-1">
                      Visitor Details
                    </h2>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <TextField
                        label="Visitor Name"
                        name="name"
                        type="text"
                      />
                    </div>

                    <div>
                      <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile No
                      </label>
                      <div className="flex border border-[#cccccc] rounded-md">
                        <div className="inline-block">
                          <input
                            type="text"
                            id="countryCode"
                            name="countryCode"
                            value={formik.values.countryCode}
                            onChange={(e) => {
                              formik.setFieldValue('countryCode', e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            className="w-11 bg-grey-lighter text-grey-darker h-7 px-2 border-none rounded-l-md focus:outline-none"
                          />
                          {formik.errors.countryCode && formik.touched.countryCode && (
                            <div className="text-red-500 text-xs">{formik.errors.countryCode}</div>
                          )}
                        </div>
                        <div className='border-l border-gray-400 mt-1 mb-1 mr-2'></div>
                        <PhoneNoField
                          name="mobileNo"
                          className="input w-full h-8 !rounded-none !rounded-r-md focus:outline-none"
                          customStyles={customPhoneNoFieldStyles}
                          onChange={(value) => {
                            formik.setFieldValue('mobileNo', value.value)
                          }}
                          value={formik.values.mobileNo}
                          options={sourceList}
                        />
                      </div>
                    </div>

                    <div>
                      <TextField label="Email" name="email" type="text" />
                    </div>

                    <div>
                      <label className="label font-regular mb-1 text-xs block">
                        Visit Date
                      </label>
                      <CustomDatePicker
                        className="h-8 w-full rounded-md text-[#0091ae] flex bg-grey-lighter text-grey-darker border border-[#cccccc] px-4"
                        selected={startDate}
                        onChange={(date) => {
                          formik.setFieldValue('enquiryDat', date.getTime())
                          setStartDate(date)
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

                  <div className="mt-8 mb-6">
                    <h2 className="font-semibold text-[#053219] text-sm mb-1">
                      More Details<abbr title="required">*</abbr>
                    </h2>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CustomSelect
                        name="source"
                        label="Visit Source*"
                        className="input"
                        onChange={(value) => {
                          formik.setFieldValue('source', value.value)
                        }}
                        value={formik.values.source}
                        options={sourceList}
                      />
                    </div>

                    <div>
                      <CustomSelect
                        name="project"
                        label="Select Event"
                        className="input"
                        onChange={(value) => {
                          console.log('value of project is ', value)
                          formik.setFieldValue('projectId', value.uid)
                          formik.setFieldValue('project', value.value)
                        }}
                        value={formik.values.project}
                        options={projectList}
                      />
                    </div>

                    {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                      <div>
                        <CustomSelect
                          name="assignedTo"
                          label="Visitor Category"
                          className="input"
                          onChange={(value) => {
                            console.log('value is ', value, user)
                            formik.setFieldValue('assignedTo', value.value)
                            formik.setFieldValue('assignedToObj', value)
                          }}
                          value={formik.values.assignedTo}
                          options={visitorsCategory}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-8 mb-6">
                    <h2 className="font-semibold text-[#053219] text-sm mb-1">
                      Advanced
                    </h2>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                  </div>

                  <div className="mb-6">
                    <label className="font- text-[#053219] text-sm mb-2 block">
                      Interested In
                    </label>
                    <RadioGroup value={selected} onChange={typeSel}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {plans.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? 'ring-2 ring-offset-2 ring-white ring-opacity-60'
                                  : ''
                              }
                              ${
                                selected.name == plan.name
                                  ? 'ring-1 ring-green-400 bg-opacity-75 text-black'
                                  : 'bg-[#f7f9f8]'
                              }
                              relative rounded-lg px-5 py-2 cursor-pointer flex focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <div className="flex items-center w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label as="p" className={`font-medium ${selected.name == plan.name ? 'text-gray-900' : 'text-gray-900'}`}>
                                      <img className="w-8 h-8 inline" alt="" src={plan.img}></img>
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                <div className="ml-2 text-sm">{plan.name}</div>
                                {checked && (
                                  <div className={`${selected.name == plan.name ? 'flex-shrink-0 text-white ml-auto' : 'flex-shrink-0 text-black ml-auto'}`}>
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                      <circle cx={11} cy={11} r={11} fill={selected.name == plan.name ? '#61d38a' : ''} />
                                      <path d="M6 11l3 3 7-7" stroke={selected.name == plan.name ? '#fff' : ''} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CustomSelect
                        name="budget"
                        label="Budget"
                        className="input"
                        onChange={(value) => {
                          formik.setFieldValue('budget', value.value)
                        }}
                        value={formik.values.budget}
                        options={budgetList}
                      />
                    </div>

                    <div>
                      <TextField label="Comments" name="comment" type="text" />
                    </div>
                  </div>

                  {formMessage === 'Saved Successfully..!' && (
                    <div className="mt-4 flex items-center text-green-700">
                      <img className="w-10 h-10 inline mr-2" alt="" src="/ok.gif" />
                      <span>{formMessage}</span>
                    </div>
                  )}

                  {formMessage === 'Lead Already Exists with Ph No' && (
                    <div className="mt-4">
                      <div className="flex items-center text-red-600">
                        <img className="w-10 h-10 inline mr-2" alt="" src="/error.gif" />
                        <span>{formMessage}</span>
                      </div>
                      <div className="mt-4 space-y-4">
                        {founDocs.map((customDetails, i) => {
                          const {
                            id,
                            Name,
                            Event,
                            ProjectId,
                            Source,
                            Status,
                            by,
                            Mobile,
                            Date,
                            Email,
                            Assigned,
                            AssignedBy,
                            Notes,
                            Timeline,
                            documents,
                            Remarks,
                            notInterestedReason,
                            notInterestedNotes,
                            stsUpT,
                            assignT,
                            leadDetailsObj,
                            assignedToObj,
                            CT,
                          } = customDetails
                          return (
                            <div key={i} className="bg-[#F2F5F8] p-4 rounded">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div className="mb-2 sm:mb-0">
                                  <div className="text-xl font-semibold uppercase">{Name}</div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    <MailIcon className="w-4 h-4 inline text-[#058527] mr-1" />
                                    {Email}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  <DeviceMobileIcon className="w-4 h-4 inline text-[#058527] mr-1" />
                                  {Mobile?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                                </div>
                              </div>

                              <div className="mt-4 bg-white p-3 rounded">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <div className="text-xs text-gray-500">Event</div>
                                    {!user?.role?.includes(USER_ROLES.CP_AGENT) &&
                                      ['junk', 'notinterested', 'dead'].includes(Status) && (
                                        <AssigedToDropComp
                                          assignerName={Event}
                                          id={id}
                                          align="right"
                                          usersList={projectList}
                                        />
                                      )}
                                    {!user?.role?.includes(USER_ROLES.CP_AGENT) &&
                                      !['junk', 'notinterested', 'dead'].includes(Status) && (
                                        <div className="font-semibold text-[#053219] text-sm">
                                          {Event}
                                        </div>
                                      )}
                                  </div>

                                  <div>
                                    <div className="text-xs text-gray-500">Assigned To</div>
                                    {!user?.role?.includes(USER_ROLES.CP_AGENT) &&
                                      ['junk', 'notinterested', 'dead'].includes(Status) && (
                                        <AssigedToDropComp
                                          assignerName={assignedToObj?.label}
                                          id={id}
                                          usersList={usersList}
                                        />
                                      )}
                                    {!user?.role?.includes(USER_ROLES.CP_AGENT) &&
                                      !['junk', 'notinterested', 'dead'].includes(Status) && (
                                        <div className="font-semibold text-[#053219] text-sm">
                                          {assignedToObj?.label}
                                        </div>
                                      )}
                                    {user?.role?.includes(USER_ROLES.CP_AGENT) && (
                                      <span className="text-sm">{assignedToObj?.label}</span>
                                    )}
                                  </div>

                                  <div>
                                    <div className="text-xs text-gray-500">Current Status</div>
                                    <div className="font-semibold text-[#053219] text-sm">
                                      {currentStatusDispFun(Status)}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 border-t border-[#ebebeb] pt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500">
                                  <div>
                                    <span className="font-thin">
                                      Created On: <span className="text-[#867777] ml-1">
                                        {CT != undefined ? prettyDateTime(CT) : prettyDateTime(Date)}
                                      </span>
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-thin">
                                      Updated On: <span className="text-[#867777] ml-1">
                                        {stsUpT === undefined ? 'NA' : prettyDateTime(stsUpT) || 'NA'}
                                      </span>
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-thin text-[#867777]">
                                      Assigned On: <span className="ml-1">
                                        {assignT != undefined ? prettyDateTime(assignT) : prettyDateTime(Date)}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 flex justify-between items-center text-xs">
                                <div className="text-gray-500">
                                  Recent Comments: <span className="text-[#867777] ml-1">{Remarks || 'NA'}</span>
                                </div>
                                <div className="relative group">
                                  <span className="text-[#867777]">{Source?.toString() || 'NA'}</span>
                                  <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 z-10 w-48 bg-yellow-200 rounded p-2 text-xs shadow-lg">
                                    {Source?.toString() || 'NA'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                      className="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                      type="button"
                      onClick={() => resetter()}
                    >
                      Reset
                    </button>
                    <button
                      className="bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <Loader />}
                      Add Visitor
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewVisitorForm