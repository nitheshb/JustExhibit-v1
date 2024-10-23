/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from 'react'

import { arrayUnion, Timestamp } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import {
  addAccountslogS,
  addCustomer,
  addLead,
  addModuleScheduler,
  capturePaymentS,
  createBookedCompany,
  createNewCustomerS,
  insertPSS,
  steamBankDetailsList,
  updateLeadStatus,
  updateEventsStallBookCounts,
  updateProjectionsAgreegationsOnBooking,
  updateStallAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import CaptureUnitPayment from './CapturePayment'

const AddPaymentDetailsForm = ({
  title,
  customerInfo,
  myBookingPayload,
  setMyBookingPayload,
  additionalInfo,
  costSheet,
  selUnitDetails,
  leadDetailsObj2,
  dialogOpen,
  newPlotCsObj,
  newPlotCostSheetA,
  newPlotPS,
  newConstructPS,
  newConstructCsObj,
  newAdditonalChargesObj,
  newConstructCostSheetA,
  phase,
  projectDetails,
  stepIndx,
  StatusListA,
}) => {
  const { user } = useAuth()
  const { orgId, email, displayName, department, role, phone } = user
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const [bankDetailsA, setBankDetailsA] = useState([])
  const [paymentModex, setPaymentModex] = useState('Cheque')
  const [bookCompSteps, setBookCompSteps] = useState([])
  const [bookCurentStep, setBookCurentStep] = useState([])

  const [bookingPayloadFinal, setBookingPayloadFinal] = useState({})

  const { enqueueSnackbar } = useSnackbar()

  const bankData = {}
  const confettiRef = useRef(null)
  const T_elgible = 0
  const stepsComp = 0
  const T_transaction = 0
  const T_review = 0
  let T_balance = 0
  let T_elgible_balance = 0
  const handleClick = () => {
    console.log(' projectDetails', projectDetails)
    confettiRef?.current?.fire()
  }
  useEffect(() => {
    // console.log('leadDetailsObj2 are', leadDetailsObj2)
    setBookingPayloadFinal(myBookingPayload)
    console.log('hello it ')
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

    //
    const { customerDetailsObj, secondaryCustomerDetailsObj } = customerInfo

    if (customerDetailsObj) {
      const customerD = {
        Name:
          leadDetailsObj2?.Name ||
          customerInfo?.customerDetailsObj?.customerName1,
        my_assets: [selUnitDetails?.uid],
        T: Timestamp.now().toMillis(),
        Luid: leadDetailsObj2.id || '',
        added_by: email,
        projects: [projectDetails?.uid],
        input_money: 0,
        kyc_status: false,
        remaining_money: 0,
        utilized_money: 0,
      }
      addCustomer(orgId, customerD, email, enqueueSnackbar, () => ({}))
    }
    if (secondaryCustomerDetailsObj) {
      const customerD = {
        Name: customerInfo?.secondaryCustomerDetailsObj?.customerName1,
        my_assets: [selUnitDetails?.uid],
        T: Timestamp.now().toMillis(),
        Luid: secondaryCustomerDetailsObj.Luid || '',
        added_by: email,
        projects: [projectDetails?.uid],
        input_money: 0,
        kyc_status: false,
        remaining_money: 0,
        utilized_money: 0,
      }
      addCustomer(orgId, customerD, email, enqueueSnackbar, () => ({}))
    }
    return await createNewCustomerS(
      orgId,
      projectDetails?.uid,
      selUnitDetails?.uid,
      leadDetailsObj2,
      customerInfo,
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

    const { partBPayload, costSheetA } = selUnitDetails

    // const partBTotal = partBPayload?.reduce(
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
    // const partATotal = newPlotCostSheetA?.reduce(
    //   (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
    //   0
    // )
    // const partBTotal = newAdditonalChargesObj?.reduce(
    //   (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
    //   0
    // )
    // const T_total = partATotal + partBTotal
    // console.log(
    //   'total Cost test',
    //   T_total,
    //   '==> ',
    //   newPlotCostSheetA,
    //   newAdditonalChargesObj
    // )
    const T_total = bookingPayloadFinal?.T_total

    T_balance = T_total - T_review
    T_elgible_balance = T_elgible - T_review
    console.log('newPlotPS', newPlotPS, newConstructPS, fullPs, T_elgible)

    const customerfbA = await createNewCustoreSupa(data, resetForm)

    // customerfbA
    let custNo
    if ((await customerfbA?.length) > 0) {
      custNo = customerfbA[0].id
    } else {
      return
    }
    await setBookCurentStep(['payment_captured'])
    const y = await capturePayment(custNo, data, resetForm)
    // get paymentTxn id
    let txId
    if ((await y?.length) > 0) {
      txId = y[0]?.id
    } else {
      return
    }
    await capturePayment_log(data, txId, resetForm)
    const s1 = await bookCompSteps
    await s1.push('payment_captured')
    await setBookCompSteps(s1)

    await setBookCurentStep(['CS_updated', 'customer_created'])
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
    // const foundLength = await checkIfLeadAlreadyExists('spark_leads', phoneNo1)
    const foundLength = []
    const leadData = {
      Date: Timestamp.now().toMillis(),
      Email: customerInfo?.customerDetailsObj?.email1 || '',
      Mobile: customerInfo?.customerDetailsObj?.email1 || '',
      Name: customerInfo?.customerDetailsObj?.email1,
      Note: '',
      Event: '',
      Source: 'Booking' || '',
      Status: 'unassigned',
      intype: 'DirectBooking',
      assignedTo: '',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
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
    }
    // const { id, purpose,  } =
    //   leadDetailsObj2
    // check if lead already exists
    const { id } = leadData
    // proceed to copy

    const { customerDetailsObj, secondaryCustomerDetailsObj } = customerInfo
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
      by: user?.email,
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Need to verify a cheque payment of 1,00,000',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const crmPayload = {
      by: user?.email,
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Assign a CRM Executive to new customer Raju',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const projectPaylaod = {
      by: user?.email,
      type: 'schedule',
      pri: 'priority 1',
      notes: 'CostSheet approval request for subhaEcone flat 101',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    fullPs.map((d, i) => {
      //
      // this will set the previous date immutable as current date

      const dataPayload = {
        pId: selUnitDetails?.pId,
        oldDate: d?.oldDate,
        schDate: d?.schDate,
        stageId: d?.stage.value,
        newPrice: d?.value,
        used: d?.used,
        assignedTo: selUnitDetails?.assignedTo || 'unassigned',
      }

      updateProjectionsAgreegationsOnBooking(
        orgId,
        dataPayload,
        user.email,
        enqueueSnackbar
      )
    })
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

    const x2 = await createBookedCompany(
      orgId,
      id,
      {
        leadId: id,
        eventName: leadDetailsObj2?.Event || projectDetails?.eventName,
        ProjectId: leadDetailsObj2?.ProjectId || selUnitDetails?.pId,
        // ...customerDetailsObj,
        Name: customerDetailsObj?.customerName1,
        Mobile: customerDetailsObj?.phoneNo1,
        Email: customerDetailsObj?.email1,
        secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
        assets: arrayUnion(uid),
        // [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
        // [`${uid}_ps`]: phase?.paymentScheduleObj || {},
        [`${uid}_unitDetails`]: selUnitDetails || {},
        [`${uid}_plotCS`]: newPlotCostSheetA,
        [`${uid}_AddChargesCS`]: newAdditonalChargesObj,
        [`${uid}_constructCS`]: newConstructCostSheetA || [],
        [`${uid}_fullPs`]: fullPs,
        [`${uid}_newPlotPS`]: newPlotPS,
        [`${uid}_newConstructPS`]: newConstructPS || [],
        [`${uid}_T_elgible`]: T_elgible,
        [`${uid}_stepsComp`]: stepsComp,
        [`${uid}_T_transaction`]: T_transaction,
        [`${uid}_T_review`]: T_review,
        [`${uid}_T_balance`]: T_balance,
        [`${uid}_T_elgible_balance`]: T_elgible_balance,

        booked_on: data?.dated,
        ct: Timestamp.now().toMillis(),
        Date: Timestamp.now().toMillis(),

        //paymentScheduleObj
      },
      user?.email,
      enqueueSnackbar
    )

    const s2 = await bookCompSteps
    await s2.push('CS_updated')
    await s2.push('customer_created')
    await setBookCompSteps(s2)

    await setBookCurentStep(['unit_booked'])

    //
    // 3)Update unit record with customer record and mark it as booked
    // customerDetailsObj
    const otherData = leadDetailsObj2[`${uid}_others`]
    const unitUpdate = {
      leadId: id,
      status: 'booked',
      // customerDetailsObj: customerDetailsObj || {},
      // secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      booked_on: data?.dated,
      ct: Timestamp.now().toMillis(),
      Date: Timestamp.now().toMillis(),
      // ...otherData,
      // T_total: newTotal,
      T_balance: T_balance,
      T_received: data['T_received'] || 0,
      T_elgible: T_elgible,
      T_elgible_balance: T_elgible_balance,
      T_approved: data['T_received'] || 0,
      T_transaction: data['T_received'] || 0,

      T_review: 0,
      // T_A: partATotal,
      // T_B: partBTotal,
      // T_C: partCTotal,
      // T_D: partDTotal,
      // T_E: partETotal,
      // plotCS: [...x],
      // constructCS: [...constructionCS],
      // addChargesCS: partB1,
      // constAdditionalChargesCS: partD,
      // possessionAdditionalCostCS: partE,
      // plotPS: plotPs,
      // constructPS: constructPs,
      // fullPs: fullPs1,
      // plc_per_sqft: data['plc_per_sqft'],
      // sqft_rate: data['sqft_rate'],
      // construct_price_sqft: data['construct_price_sqft'],
      ats_date: data['ats_date'] || '',
      atb_date: data['atb_date'] || '',
      sd_date: data['sd_date'] || '',
      ats_target_date: data['ats_target_date'] || '',
      sd_target_date: data['sd_target_date'] || '',
      source: data['source'] || '',
      sub_source: data['sub_source'] || '',
      remarks: data['remarks'] || '',
      fund_type: data['fund_type'] || '',
      Bank: data['Bank'] || '',
      loanStatus: data['loanStatus'] || '',
      annualIncome: data['annualIncome'] || '',
      intype: 'form',
    }
    // unitUpdate[`cs`] = leadDetailsObj2[`${uid}_cs`]
    unitUpdate[`plotCS`] = newPlotCostSheetA
    unitUpdate[`addChargesCS`] = newAdditonalChargesObj
    unitUpdate[`constructCS`] = newConstructCostSheetA || []
    unitUpdate[`fullPs`] = fullPs
    unitUpdate[`plotPS`] = newPlotPS
    unitUpdate[`constructPS`] = newConstructPS || []
    unitUpdate[`T_elgible`] = T_elgible
    unitUpdate[`stepsComp`] = stepsComp
    unitUpdate[`T_transaction`] = T_transaction
    unitUpdate[`T_review`] = T_review
    unitUpdate[`T_balance`] = T_balance
    unitUpdate[`T_elgible_balance`] = T_elgible_balance

    const uploadPayload = { ...myBookingPayload, ...unitUpdate }

    console.log('unit space is ', uid)
    await updateStallAsBooked(
      orgId,
      leadDetailsObj2?.ProjectId || selUnitDetails?.pId,
      uid,
      id,
      uploadPayload,
      user?.email,
      enqueueSnackbar,
      resetForm
    )
    const s3 = await bookCompSteps
    await s3.push('unit_booked')

    await setBookCompSteps(s3)

    await setBookCurentStep(['customer_email_send', 'notify_to_manager'])
    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)
    updateEventsStallBookCounts(
      orgId,
      selUnitDetails?.pId,
      { soldVal: T_elgible, t_collect: amount },
      user?.email,
      enqueueSnackbar
    )
    updateLeadStatus(
      orgId,
      leadDetailsObj2?.ProjectId || '',
      id,
      leadDetailsObj2?.Status || '',
      'booked',
      user?.email,
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
    <div
      className="overflow-y-scroll no-scrollbar"
      style={{ height: `calc(100vh - 120px)` }}
    >
      <div className=" w-full  flex flex-row justify-between mb-0 p-4 pb-0 bg-white-100 rounded-t-md">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        <section className="flex flex-row">
          <div className="w-[53.80px] h-[58px] bg-zinc-100 rounded-[5px] mr-2"></div>
          <div className="w-full flex flex-col">
            <div className=" flex flex-row justify-between gap-2 ">
              <div>
                <section className="flex flex-row">
                  <h6 className="text-black text-[14px] mt-[2px] mb- font-bold">
                    Booking Amount
                  </h6>
                </section>
                <div className="w-[455.80px] opacity-50 text-blue-950  text-[12px] font-normal ">
                  Unit will be blocked and will be booked on manager approval.
                </div>

                <div className="border-t-4 rounded-xl w-16 mt-[5px] mb-3 border-[#8b5cf6]"></div>
              </div>

              <div className="flex flex-col">
                <div>
                  Total: {bookingPayloadFinal?.T_total?.toLocaleString('en-IN')}
                </div>
                <div>
                  Balance:{' '}
                  {bookingPayloadFinal?.T_balance?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* <div className="w-[455.80px] opacity-50 text-white  text-[12px] font-normal ">
                                            Details of applicant is mandatory
                                          </div> */}
          </div>
        </section>
      </div>

      <div className="grid gap- grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white">
          <div className="mt-0">
            <CaptureUnitPayment
              bookCompSteps={bookCompSteps}
              bookCurentStep={bookCurentStep}
              selUnitDetails={selUnitDetails}
              projectDetails={projectDetails}
              leadDetailsObj2={leadDetailsObj2}
              onSubmitFun={onSubmitFun}
              stepIndx={stepIndx}
              StatusListA={StatusListA}
              newPlotPS={newPlotPS}
              newConstructPS={newConstructPS}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPaymentDetailsForm
