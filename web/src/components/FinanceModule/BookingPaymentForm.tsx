/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from 'react'

import { format, parse } from 'date-fns'
import { arrayUnion, Timestamp } from 'firebase/firestore'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import { useParams } from '@redwoodjs/router'

import Confetti from 'src/components/shared/confetti'
import { paymentMode, statesList } from 'src/constants/projects'
import {
  addAccountslogS,
  addModuleScheduler,
  addPaymentReceivedEntry,
  capturePaymentS,
  createBookedCustomer,
  createNewCustomerS,
  insertPSS,
  steamBankDetailsList,
  updateLeadStatus,
  updateProjectCounts,
  updateUnitAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import { TextField2 } from 'src/util/formFields/TextField2'

import CaptureUnitPayment from './CapturePayment'

const AddPaymentDetailsForm = ({
  title,
  selUnitDetails,
  leadDetailsObj2,
  dialogOpen,
  newPlotCsObj,
  newPlotCostSheetA,
  newPlotPS,
  newConstructCsObj,
  newAdditonalChargesObj,
  newConstructCostSheetA,
  newConstructPS,
  phase,
  projectDetails,
}) => {
  const { user } = useAuth()
  const { orgId, email, displayName, department, role, phone } = user
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const [bankDetailsA, setBankDetailsA] = useState([])
  const [paymentModex, setPaymentModex] = useState('Cheque')

  const { enqueueSnackbar } = useSnackbar()

  const bankData = {}
  const confettiRef = useRef(null)
  let T_elgible = 0
  let stepsComp = 0
  let T_transaction = 0
  let T_review = 0
  let T_balance = 0
  const handleClick = () => {
    console.log(' projectDetails', projectDetails)
    confettiRef.current.fire()
  }
  useEffect(() => {
    console.log('leadDetailsObj2 are', leadDetailsObj2)
  }, [])

  useEffect(() => {
    const unsubscribe = steamBankDetailsList(
      orgId,
      (querySnapshot) => {
        const bankA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        bankA.map((user) => {
          user.label = user?.accountName
          user.value = user?.accountNo
        })
        console.log('fetched users list is', bankA)
        setBankDetailsA([...bankA])
      },
      (error) => setBankDetailsA([])
    )

    return unsubscribe
  }, [])

  const createNewCustoreSupa = async (data) => {
    // enter customer details too
    const { Status } = leadDetailsObj2

    return await createNewCustomerS(
      orgId,
      projectDetails?.uid,
      selUnitDetails?.uid,
      leadDetailsObj2,
      Status,
      'booked',
      user?.email,
      enqueueSnackbar
    )
  }

  const updateUnitBooked = async (data, resetForm) => {
    // enter customer details too
  }

  const updatePS = async (data, resetForm) => {
    insertPSS(
      orgId,
      projectDetails?.uid,
      selUnitDetails?.uid,
      leadDetailsObj2,
      data,
      user?.email,
      enqueueSnackbar
    )
  }
  const updateCS = async (data, resetForm) => {}
  const capturePayment = async (custNo, data, resetForm) => {
    // enter payment log
    data.category = 'BookingAdvance'
    const x = await capturePaymentS(
      orgId,
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

  const capturePayment_log = async (data, txId, resetForm) => {
    // enter payment log
    const payload = {
      oldStatus: '',
      newStatus: '',
      amount: data?.amount,
      type: 'l_ctd',
      TransactionUid: txId,
    }
    const x = await addAccountslogS(
      orgId,
      projectDetails?.uid,
      selUnitDetails?.uid,
      leadDetailsObj2,
      payload,
      user?.email,
      enqueueSnackbar
    )
    await console.log('xo o is ', x)
  }

  const onSubmitFun = async (data, resetForm) => {
    console.log(
      'submitted data is ',
      newPlotCostSheetA,
      newConstructCostSheetA,
      newPlotCsObj,
      data,
      leadDetailsObj2,
      phase?.paymentScheduleObj
    )

    console.log('mysetup is', leadDetailsObj2, data)

    const fullPs = [...newPlotPS, ...newConstructPS]
    const { amount } = data
    const { projectName } = projectDetails
    fullPs.map((dataObj) => {
      if (dataObj?.elgible) {
        T_elgible = dataObj?.value + T_elgible
        stepsComp = stepsComp + 1
        T_transaction = T_transaction + (amount || undefined)
        T_review = T_review + (amount || undefined)
      }
    })
    T_balance = T_elgible - T_review
    console.log('newPlotPS', newPlotPS, newConstructPS, fullPs, T_elgible)

    const customerfbA = await createNewCustoreSupa(data, resetForm)

    fullPs.map((dataObj, i) => {
      dataObj.order = i
      updatePS(dataObj, resetForm)
    })

    // customerfbA
    let custNo
    if ((await customerfbA.length) > 0) {
      custNo = customerfbA[0].id
    } else {
      return
    }
    const y = await capturePayment(custNo, data, resetForm)
    // get paymentTxn id
    let txId
    if ((await y.length) > 0) {
      txId = y[0].id
    } else {
      return
    }
    await capturePayment_log(data, txId, resetForm)

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

    // I) createNewCustoreSupa

    const { id, purpose, customerDetailsObj, secondaryCustomerDetailsObj } =
      leadDetailsObj2
    const { uid } = selUnitDetails
    // 1)Make an entry to finance Table {source: ''}
    console.log(
      'secondary value si s',
      customerDetailsObj,
      secondaryCustomerDetailsObj
    )
    const x1 = []

    x1.push('pending')
    const finPayload = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Need to verify a cheque payment of 1,00,000',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const crmPayload = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Assign a CRM Executive to new customer Raju',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const projectPaylaod = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'CostSheet approval request for subhaEcone flat 101',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    addModuleScheduler(
      `${orgId}_fin_tasks`,
      id,
      finPayload,
      x1,
      data.assignedTo
    )
    addModuleScheduler(
      `${orgId}_crm_tasks`,
      id,
      crmPayload,
      x1,
      data.assignedTo
    )
    addModuleScheduler(
      `${orgId}_project_tasks`,
      id,
      projectPaylaod,
      x1,
      data.assignedTo
    )

    // create task in finance
    // create task for crm
    // create whatsApp Alert
    // create task to project manager for cost sheet approval

    // add phaseNo , projName to selUnitDetails
    // 2)Create('')
    console.log('submit doc is ', orgId, uid, {
      leadId: id,
      projectName,
      ...customerDetailsObj,
      secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      assets: arrayUnion(uid),
      // [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
      // [`${uid}_ps`]: phase?.paymentScheduleObj || {},
      [`${uid}_unitDetails`]: selUnitDetails || {},
      [`${uid}_plotCS`]: newPlotCostSheetA,
      [`${uid}_constructCS`]: newConstructCostSheetA,
      [`${uid}_fullPs`]: fullPs,
      [`${uid}_T_elgible`]: T_elgible,
      [`${uid}_stepsComp`]: stepsComp,
      [`${uid}_T_transaction`]: T_transaction,
      [`${uid}_T_review`]: T_review,
      [`${uid}_T_balance`]: T_balance,

      //paymentScheduleObj
    })
    const x2 = await createBookedCustomer(
      orgId,
      id,
      {
        leadId: id,
        projectName: leadDetailsObj2?.Project,
        ProjectId: leadDetailsObj2?.ProjectId,
        // ...customerDetailsObj,
        Name: leadDetailsObj2?.Name,
        Mobile: leadDetailsObj2?.Mobile,
        Email: leadDetailsObj2?.Email,
        secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
        assets: arrayUnion(uid),
        // [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
        // [`${uid}_ps`]: phase?.paymentScheduleObj || {},
        [`${uid}_unitDetails`]: selUnitDetails || {},
        [`${uid}_plotCS`]: newPlotCostSheetA,
        [`${uid}_AddChargesCS`]: newAdditonalChargesObj,
        [`${uid}_constructCS`]: newConstructCostSheetA,
        [`${uid}_fullPs`]: fullPs,
        [`${uid}_T_elgible`]: T_elgible,
        [`${uid}_stepsComp`]: stepsComp,
        [`${uid}_T_transaction`]: T_transaction,
        [`${uid}_T_review`]: T_review,
        [`${uid}_T_balance`]: T_balance,

        //paymentScheduleObj
      },
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    //
    // 3)Update unit record with customer record and mark it as booked
    // customerDetailsObj
    const otherData = leadDetailsObj2[`${uid}_others`]
    const unitUpdate = {
      leadId: id,
      status: 'booked',
      customerDetailsObj: customerDetailsObj || {},
      secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      ...otherData,
    }
    // unitUpdate[`cs`] = leadDetailsObj2[`${uid}_cs`]
    unitUpdate[`plotCS`] = newPlotCostSheetA
    unitUpdate[`addChargesCS`] = newAdditonalChargesObj
    unitUpdate[`constructCS`] = newConstructCostSheetA
    unitUpdate[`fullPs`] = fullPs
    unitUpdate[`T_elgible`] = T_elgible
    unitUpdate[`stepsComp`] = stepsComp
    unitUpdate[`T_transaction`] = T_transaction
    unitUpdate[`T_review`] = T_review
    unitUpdate[`T_balance`] = T_balance
    console.log('unit space is ', uid)
    updateUnitAsBooked(
      orgId,
      uid,
      id,
      unitUpdate,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )

    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)

    updateLeadStatus(
      orgId,
      leadDetailsObj2?.ProjectId,
      id,
      leadDetailsObj2?.Status,
      'booked',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )
    updateProjectCounts(
      orgId,
      leadDetailsObj2?.ProjectId,
      { soldVal: T_elgible, t_collect: amount },
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )
    handleClick()
    const updatedData = {
      ...data,
    }
    console.log('submit data i s', updatedData)
  }

  const initialState = {
    amount: bankData?.amount || '',
    towardsBankDocId: '',
    mode: bankData?.mode || 'cheque',
    payto: bankData?.payto || '',
    chequeno: bankData?.chequeno || '',
    dated: bankData?.dated || '',
    bookingSource: '',
    bookedBy: '',
  }

  const validateSchema = Yup.object({
    // date: Yup.string().required('Bank Required'),
    // amount: Yup.string().required('Required'),
    // payto: Yup.string().required('Required'),
    // mode: Yup.string().required('Bank Required'),
    // drawnonbank: Yup.string().required('Required'),
    // chequeno: Yup.string().required('Required'),
    // dated: Yup.string().required('Required'),
  })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  return (
    <div className="">
      <div className="">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white">
          <div className="mt-0">
            <CaptureUnitPayment
              selUnitDetails={selUnitDetails}
              projectDetails={projectDetails}
              leadDetailsObj2={leadDetailsObj2}
              onSubmitFun={onSubmitFun}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPaymentDetailsForm
