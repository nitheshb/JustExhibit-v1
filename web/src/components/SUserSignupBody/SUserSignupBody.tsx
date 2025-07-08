/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import * as Yup from 'yup'
import {
  addUserLog,
  checkIfUserAlreadyExists,
  createUserToWorkReport,
  updateUserRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { useForm } from 'react-hook-form'
import { Form, Formik } from 'formik'
import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { DEPARTMENT_LIST, ROLES_LIST } from 'src/constants/userRoles'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import { setHours, setMinutes } from 'date-fns'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'



const SUserSignupBody = ({ title, dialogOpen, empData }) => {
  const d = new window.Date()
  const { register, user } = useAuth()
  const { orgId, orgName } = user

  const formMethods = useForm()
  const [formMessage, setFormMessage] = useState({
    color: 'green',
    message: '',
  })
  const [roles, setroles] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [startDate, setStartDate] = useState(d)
  const [deptIs, setdeptIs] = useState('')
  const [isdeptEmpty, setisdeptEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    empId,
    offPh,
    perPh,
    name,
    email,
    department,
    uid,
    roles: rolees,
    userStatus
  } = empData
  console.log('empData is ', empData)

  useEffect(() => {
    if (name) {
      seteditMode(true)
    }
  }, [])
  useEffect(() => {
    const { department, roles } = empData
    const x = {}

    if (department) {
      x['value'] = department[0]
      changed(x)
      // seteditMode(true)
    }
  }, [empData])

  // const cityList = [
  //   { label: 'Bangalore,KA', value: 'Bangalore,KA' },
  //   { label: 'Cochin,KL', value: 'Cochin,KL' },
  //   { label: 'Mumbai,MH', value: 'Mumbai,MH' },
  // ]

  // const plans = []
  // const [selected, setSelected] = useState(plans[1])

  // const typeSel = async (sel) => {
  //   await console.log('value is', selected)
  //   await setSelected(sel)
  //   await console.log('thsi si sel type', sel, selected)
  // }

  const changed = async (data) => {
    console.log('i was changed', data, data)
    setdeptIs(data.value)
    if (data.value != '') {
      setisdeptEmpty(false)
    }
    const filRoles = ROLES_LIST.filter((item) => item.dept === data.value)

console.log('rolws are ', filRoles)
    setroles(filRoles)
  }
  const onSubmit = async (data) => {
    console.log('check fo this ', data)
    setLoading(true)
    const { empId, email, myRole, deptVal, name, offPh, perPh, userStatus } = data

    if (editMode) {
      updateUserRole(
        empId,
        orgName,
        orgId,
        uid,
        deptVal,
        myRole,
        email,
        offPh,
        perPh,
        userStatus,
        user?.email
      )
      //  add docs to report page

      setLoading(false)
      addUserLog(orgId, {
        s: 's',
        type: 'updateRole',
        subtype: 'updateRole',
        txt: `${email} as ${myRole}`,
        by: user?.email,
      })

      setFormMessage({
        color: 'green',
        message: `User updated Successfully`,
      })
    } else {
      const data = {
        empId: empId,
        email: email,
        name: name,
        password: 'redefine@123',
        dept: deptVal,
        role: myRole,
        orgName: orgName,
        orgId: orgId,
        userStatus: 'active',
        orgStatus: 'active',
        offPh: offPh,
        perPh: perPh,
      }

      //       Invalid Arguments {\"empId\":\"102\",\"uid\":\"71wQrhV54oeWxn5Ha9E8pm93XID3\",\"email\":\"nitheshreddy.email@gmail.com\",\"offPh\":\"\",\"perPh\":\"\",\"userStatus\":\"active\",\"orgStatus\":\"active\",\"orgId\":\"spark\",\"department\":[\"admin\"],\"roles\":[\"admin\"],\"name\":\"nitheshreddy\"}"
      // payload: "{\"code\":\"invalid-argument\",\"name\":\"FirebaseError\"}"

      const config = {
        method: 'post',

        url: 'https://asia-south1-redefine-erp.cloudfunctions.net/erpAddUser',
        headers: {
          'Content-Type': 'text/plain',
        },
        data,
      }
      // url: 'https://redefine-functions.azurewebsites.net/api/Redefine_addUser?code=Ojuk8KF6kkxJMoOF4/XZf2kh8WHN5aMtOMlv0bbveJYZrCbRU1C9CA==',
      axios(config)
        .then(async function (response) {
          if (response.data) {
            setLoading(false)
            const { success, msg, payload } = await response['data']
            // const { id } = payload
            console.log('user payload is ', response)

            if (success) {
              const docDetailsIs = await checkIfUserAlreadyExists(
                'users',
                email
              )

              console.log('docDetailsIs', docDetailsIs, docDetailsIs[0]['uid'])
              updateUserRole(
                empId,
                orgName,
                orgId,
                docDetailsIs[0]['uid'],
                deptVal,
                myRole,
                email,
                offPh,
                perPh,
                'active',
                'nitheshreddy.email@gmail.com'
              )
              const x = {
                name,
                empId,
                email,
                uid: docDetailsIs[0]['uid'],
                userStatus: 'active',
                orgStatus: 'active',
              }
              createUserToWorkReport(`${orgId}_W_Reports`, x)
              createUserToWorkReport(`${orgId}_W_AReports`, x)
              addUserLog(orgId, {
                s: 's',
                type: 'addUser',
                subtype: 'addUser',
                txt: `${email} as ${myRole}`,
                by: 'nitheshreddy.email@gmail.com',
              })
            }
            await formMethods.reset()
            setFormMessage({
              color: success ? 'green' : 'red',
              message: success
                ? `Email ${email} is added with password redefine@123`
                : `${email} already in Use`,
            })
          }
        })
        .catch(function (error) {
          console.log('error is ', error)
          setLoading(false)
          setFormMessage({
            color: 'red',
            message: error?.msg || 'Error in creation',
          })
        })
    }
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validate = Yup.object({
    // empId: Yup.number()
    //   .positive()
    //   .min(3, 'Must be atleast 3 digits')
    //   .max(15, 'Must be 8 characters or less')
    //   .required('Required'),
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    // password: Yup.string()
    //   .min(6, 'Password must be at least 6 charaters')
    //   .required('Password is required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Password must match')
    //   .required('Confirm password is required'),
    // offPh: Yup.string()
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, 'to short')
    //   .max(10, 'to long'),
    // perPh: Yup.string()
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, 'to short')
    //   .max(10, 'to long'),
    deptVal: Yup.string()
      // .oneOf(['Admin', 'Stalls'], 'Required Dept')
      .required('Req Dept'),
    myRole: Yup.string()
      //  .oneOf(['Admin', 'Stalls'], 'DEPT IS REQ')
      .required('Required Role'),
  })
  return (
    <div className="h-full flex flex-col py-[40px] px-[30px] bg-white shadow-xl overflow-y-scroll">
      {/* <div className="px-4 sm:px-6">
        <Dialog.Title className=" font-semibold text-lg mr-auto ml-3">
          {editMode ? 'Edit Employee Details' : 'Create Employee'}
        </Dialog.Title>
      </div> */}
<div className="px-4 sm:px-6">
  <div className="flex justify-center">
    <Dialog.Title className="text-center font-outfit font-medium text-[30px] leading-[100%] tracking-[0] text-black">
      {editMode ? (
        'Edit Employee Details'
      ) : (
        <>
          Just a Few Details to{' '}
          <span className="font-outfit font-medium text-[30px] leading-[100%] tracking-[0] bg-gradient-to-r from-[#E06040] to-[#E04173] text-transparent bg-clip-text">Add Employee</span>
        </>
      )}
    </Dialog.Title>
  </div>
  <p className="mt-2 text-center font-outfit font-normal text-[20px] leading-[100%] tracking-[0] text-[#808080]">
    Fill out the form to add more details
  </p>
</div>



      {formMessage.message && (
        <div className=" w-[30%] bg-[#E9F6ED] ml-9 mr-9 ">
          <p
            className={`text-lg text-${formMessage.color}-500 text-left px-6 my-3`}
          >
            {formMessage.message}
          </p>
        </div>
      )}
      <div className="grid gap-8 grid-cols-1 flex flex-col">
        <Formik
          initialValues={{
            name: name,
            email: email,
            deptVal: department != undefined ? department[0] : '',
            myRole: rolees != undefined ? rolees[0] : '',
            empId: empId,
            perPh: perPh,
            offPh: offPh,
            userStatus: userStatus,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log('ami submitted', values)
            onSubmit(values)
          }}
        >
          {(formik) => (
            <div className="mt-16">
<Form>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
    {/* Row 1 */}
    <div>
      <TextField
        label="Employee ID*"
        name="empId"
        type="text"
        disabled={editMode}
      />
    </div>
    <div>
      <TextField
        label="User Name*"
        name="name"
        type="text"
        disabled={editMode}
      />
    </div>

    {/* Row 2 - Full width email */}
    <div className="md:col-span-2">
      <TextField
        label="Email*"
        name="email"
        type="email"
        disabled={editMode}
      />
    </div>

    {/* Row 3 */}
    <div>


<div className="phone-field-container">
  {/* Separate label with custom styling */}
  <label 
    htmlFor="perPh" 
    className="phone-label"
    style={{
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 400,
      color: '#444446',
      fontFamily: 'Outfit, sans-serif',
      lineHeight: '1.5',
    }}
  >
    Personal Phone Number*
  </label>

  {/* PhoneNoField without built-in label */}
  <PhoneNoField
    name="perPh"
    id="perPh" 
    value={formik.values.perPh}
    onChange={(value) => formik.setFieldValue('perPh', value.value)}
    placeholder="Enter personal phone number"
    customStyles={{
      width: '100%',
      height: '42px',
      padding: '0 16px',
      backgroundColor: '#ffffff',
      border: '1px solid #E5E5E5',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Manrope, sans-serif',
      '::placeholder': {
        color: '#999999',
        opacity: 1,
      }
    }}
    className="phone-input"
  />
</div>
      
    </div>


<div className="phone-input-container">
  {/* Separate label with full styling control */}
  <label 
    htmlFor="offPh"
    className="phone-input-label"
    style={{
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 400,
      color: '#444446',
      fontFamily: 'Outfit, sans-serif',
      lineHeight: '1.5',
    }}
  >
    Official Phone Number*
  </label>

  {/* PhoneNoField without built-in label prop */}
  <PhoneNoField
    name="offPh"
    id="offPh"  
    className="input"
    value={formik.values.offPh}
    onChange={(value) => formik.setFieldValue('offPh', value.value)}
    placeholder="Enter phone number"
    customStyles={{
      width: '100%',
      height: '42px',
      padding: '0 16px',
      backgroundColor: '#ffffff',
      border: '1px solid #E5E5E5',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Manrope, sans-serif',
      '::placeholder': {
        color: '#999999',
        opacity: 1,
      },
      ':placeholder': {
        color: '#999999',
        opacity: 1,
      }
    }}
  />
</div>

    {/* Row 4 */}
    <div>
      <CustomSelect
        name="deptName"
        label="Department"
        className="input"
        onChange={(value) => {
          changed(value);
          formik.setFieldValue('deptVal', value.value);
          formik.setFieldValue('myRole', '');
        }}
        value={formik.values.deptVal}
        options={DEPARTMENT_LIST}
      />
      {formik.errors.deptVal && (
        <div className="error-message text-red-700 text-xs p-2">
          {formik.errors.deptVal}
        </div>
      )}
    </div>
    <div>
      <CustomSelect
        name="roleName"
        label="Role"
        className="input"
        onChange={(value) => formik.setFieldValue('myRole', value.value)}
        value={formik.values.myRole || ''}
        options={roles}
      />
      {formik.errors.myRole && (
        <div className="error-message text-red-700 text-xs p-2">
          {formik.errors.myRole}
        </div>
      )}
    </div>

    {/* Row 5 */}
    <div>
      <TextField
        label="Aadhar No"
        name="aadharNo"
        type="text"
        disabled={editMode}
      />
    </div>
    <div className='space-y-[10px] flex flex-col w-full text-xs'>
      <label className="inline-block font-outfit  text-[14px] leading-[20px] tracking-[0] text-[#444446]">
        Date of Birth
      </label>
      <CustomDatePicker
        className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#E5E5E5] px-4 h-[42px] rounded-md"
        selected={startDate}
        onChange={(date) => {
          formik.setFieldValue('dob', date.getTime());
          setStartDate(date);
        }}
        dateFormat="MMM dd, yyyy"
        name="dob"
      />
    </div>

    {/* Row 6 - User Status (full width) */}
    <div className="md:col-span-2">
      <CustomSelect
        name="userStatus"
        label="User Status"
        className="input"
        onChange={(value) => formik.setFieldValue('userStatus', value.value)}
        value={formik.values.userStatus || ''}
        options={[
          {label: 'Active', value: 'active'}, 
          {label: 'Inactive', value: 'Inactive'}
        ]}
      />
    </div>
  </div>

  <p className="text-xs text-red-500 font-outfit text-right my-3">
    Required fields are marked with an asterisk{' '}
    <abbr title="Required field">*</abbr>
  </p>
  
  <div className="mt-5 flex flex-col md:flex-row justify-between gap-4">
    <button
      className="mb-4 md:mb-0 bg-[#F5F5F5] px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-[#606062] rounded-[8px] s"
      type="reset"
    >
      Reset
    </button>
    <button
      className="mb-2 md:mb-0 bg-[#F44D21] px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-[8px] "
      type="submit"
      disabled={loading}
    >
      {loading && <Loader />}
      {editMode ? 'Edit Employee' : 'Add Employee'}
    </button>
  </div>

  


</Form>
            </div>
          )}
        </Formik>
      </div>

     
    </div>
  )
}

export default SUserSignupBody

