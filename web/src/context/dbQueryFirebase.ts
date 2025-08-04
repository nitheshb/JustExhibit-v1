import { IdentificationIcon } from '@heroicons/react/outline'
import { WhereToVote } from '@mui/icons-material'
import {
  setDoc,
  doc,
  orderBy,
  addDoc,
  // getFirestore,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  increment,
  updateDoc,
  deleteDoc,
  limit,
  arrayUnion,
  deleteField,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { getDirectiveName } from '@redwoodjs/testing/api'

import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'
import { getWeekMonthNo, prettyDateTime } from 'src/util/dateConverter'

import { db } from './firebaseConfig'
import { supabase } from './supabase'

// import { userAccessRoles } from 'src/constants/userAccess'

// **********************************************
// getF
// **********************************************

// get users list
export const steaminactiveUsersList = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('userStatus', '==', 'Inactive')
  )
  console.log('orgname is ====>', orgId)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const steamUsersList = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('userStatus', '==', 'active')
  )
  console.log('orgname is ====>', orgId)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const streamMortgageList = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_unit_mortgage`)
    // where('pId', '==', pId),
  )
  console.log('orgname is ====>', orgId)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get users list
export const steamUsersListByRole = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('userStatus', '==', 'active'),
    where('roles', 'array-contains-any', ['sales-manager', 'sales-executive'])
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
// get users list by Dept
export const steamUsersListByDept = (orgId, dept, snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('userStatus', '==', 'active'),
    where('department', 'array-contains-any', dept)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
// get users list by Dept
export const steamUsersListByDeptWithInactive = (
  orgId,
  dept,
  snapshot,
  error
) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('department', 'array-contains-any', dept)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
// get all bank detials list
export const steamBankDetailsList = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_BankDetails`))
  return onSnapshot(itemsQuery, snapshot, error)
}
export const streamProjectDetails = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_BankDetails`))
  return onSnapshot(itemsQuery, snapshot, error)
}
// get all project master cost sheet template list
export const streamProjectCSMaster = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_project`))
  return onSnapshot(itemsQuery, snapshot, error)
}
// get all project master cost sheet template list
export const streamMasters = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_Masters`))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const steamUsersProjAccessList = (orgId, snapshot, data, error) => {
  const itemsQuery = query(
    collection(db, `users`),
    where('orgId', '==', orgId),
    where('userStatus', '==', 'active'),
    where('creditNoteIssuersA', 'array-contains-any', data?.pId)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const steamUsersCreditNotesList = (orgId, snapshot, data, error) => {
  const itemsQuery = query(
    collection(db, `users`),
    where('orgId', '==', orgId),
    where('T_credit_note_units', '>', 0)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
// get matched rows details
export const getWbNotifyTemplate = async (payload) => {
  const { event, target, type, scope } = payload
  //{ event: 'on_enquiry', target: 'customer', 'template': payload , type: 'wa', scope: 'allProjects'}
  const { data, error } = await supabase
    .from('maahomes_notifyTemplates')
    .select('*')
    .eq('event', event)
    .eq('target', target)
    .eq('type', type)
    .in('scope', scope)

  return data
}

// get matched rows details
export const getWbAllNotifyTemplates = async (event, scope, type, target) => {
  //{ event: 'on_enquiry', target: 'customer', 'template': payload , type: 'wa', scope: 'allProjects'}
  const { data, error } = await supabase
    .from('maahomes_notifyTemplates')
    .select('*')
    .eq('event', event)
    .eq('type', type)
    .in('scope', scope)

  return data
}
// get all Virtual Accounts detials list
export const steamVirtualAccountsList = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_VirtualAccounts`))
  return onSnapshot(itemsQuery, snapshot, error)
}

//  get users activity list
export const steamUsersActivityLog = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_user_log`),
    orderBy('time', 'desc')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

// get users activity of user list
export const steamUsersActivityOfUser = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_user_log`),
    where('by', '==', 'nithe.nithesh@gmail.com')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
// get all leadLogs from supabase
export const steamAllLeadsActivity = async (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate, dateRange } = data
  console.log('logs range data is', dateRange, cutoffDate)

  const { data: lead_logs_visit_fixed, error2 } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('projectId, type,subtype,T, by, from, to, uid, Luid, payload')
    //.eq('Luid', uid)
    .eq('type', 'sts_change')
    .eq('to', 'visitfixed')
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  if (dateRange?.[0] == null) {
    const { data: lead_logs, error1 } = await supabase
      .from(`${orgId}_lead_logs`)
      .select('projectId, type,subtype,T, by, from, to, uid, Luid, payload')
      //.eq('Luid', uid)
      .eq('type', 'sts_change')
      .eq('from', 'visitfixed')
      .gte('T', cutoffDate)

    // .gte('T', cutoffDate)
    console.log('value is', lead_logs)
    const result = Object.values(
      lead_logs.reduce((obj, item) => {
        const vistFixedObj = lead_logs_visit_fixed.filter(
          (d) => d.Luid === item.Luid
        )
        const z = vistFixedObj?.[0]?.by || ''
        //
        console.log('value is 0', obj, item)
        if (!obj[item.Luid]) {
          console.log('value is 1', obj, item)

          obj[item.Luid] = { ...item, coverA: [item.to], visitFixedBy: z }
        } else {
          console.log('value is 2', obj, item)

          obj[item.Luid].coverA.push(item.to)
          obj[item.Luid].visitFixedBy = z
        }
        return obj
      }, {})
    )
    console.log('value is result', result)
    return result
  } else if (dateRange?.[1] != null) {
    const { data: lead_logs, error1 } = await supabase
      .from(`${orgId}_lead_logs`)
      .select('projectId, type,subtype,T, by, from, to, uid, Luid, payload')
      //.eq('Luid', uid)
      .eq('type', 'sts_change')
      .eq('from', 'visitfixed')
      .gte('T', cutoffDate)
      .lte('T', dateRange?.[1]?.getTime() + 86400000)
    const result = Object.values(
      lead_logs.reduce((obj, item) => {
        const vistFixedObj = lead_logs_visit_fixed.filter(
          (d) => d.Luid === item.Luid
        )
        const z = vistFixedObj?.[0]?.by || ''
        //
        console.log('value is 0', obj, item)
        if (!obj[item.Luid]) {
          console.log('value is 1', obj, item)

          obj[item.Luid] = { ...item, coverA: [item.to], visitFixedBy: z }
        } else {
          console.log('value is 2', obj, item)

          obj[item.Luid].coverA.push(item.to)
          obj[item.Luid].visitFixedBy = z
        }
        return obj
      }, {})
    )
    return result
  } else {
    const { data: lead_logs, error1 } = await supabase
      .from(`${orgId}_lead_logs`)
      .select('projectId, type,subtype,T, by, from, to, uid, Luid, payload')
      //.eq('Luid', uid)
      .eq('type', 'sts_change')
      .eq('from', 'visitfixed')
      .gte('T', cutoffDate)
      .lte('T', cutoffDate + 86400000)
    const result = Object.values(
      lead_logs.reduce((obj, item) => {
        const vistFixedObj = lead_logs_visit_fixed.filter(
          (d) => d.Luid === item.Luid
        )
        const z = vistFixedObj?.[0]?.by || ''
        //
        console.log('value is 0', obj, item)
        if (!obj[item.Luid]) {
          console.log('value is 1', obj, item)

          obj[item.Luid] = { ...item, coverA: [item.to], visitFixedBy: z }
        } else {
          console.log('value is 2', obj, item)

          obj[item.Luid].coverA.push(item.to)
          obj[item.Luid].visitFixedBy = z
        }
        return obj
      }, {})
    )
    return result
  }

  //  below logic merges the duplicate logs with Luid and from 'visitfixed'
  // coverA contains all merge from array

  // return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}

// get all leadLogs from supabase
export const streamLeadLogdWithNullProj = async (
  orgId,
  snapshot,
  data,
  error
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate } = data
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error1: countError } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('projectId, type,subtype,T, by, from, to, uid, Luid, payload')
    .eq('type', 'sts_change')
    .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')

  if (countError) {
    console.error(countError)
    return
  }
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}

// get all AccountTransactions from supabase
export const streamGetAllTransactions = async (
  orgId,
  snapshot,
  data,
  error
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate } = data
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error: countError } = await supabase
    .from(`${orgId}_accounts`)
    .select('*')
  // .eq('type', 'sts_change')
  // .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')

  if (countError) {
    console.error(countError)
    return
  }
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const streamGetAllUnitTransactions = async (
  orgId,
  snapshot,
  data,
  error
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate, unit_id } = data
  console.log('unit_id is ', uid, unit_id)
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error: countError } = await supabase
    .from(`${orgId}_accounts`)
    .select('*')
    .eq('unit_id', unit_id)
  // .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')

  if (countError) {
    console.error(countError)
    return
  }
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
// get all TaskManTasks from supabase
export const streamGetAllTaskManTasks = async (
  orgId,
  snapshot,
  data,
  error
) => {
  // [{"uid":"4daHzWw8zSUZqYlvRGrfYwzC8al1","name":"Nithesh Reddy"}]
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate, statusVAl, showOnlyDone } = data
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)

  let query = supabase.from(`maahomes_TM_Tasks`).select('*')
  if (showOnlyDone) {
    query = query.eq('status', 'Done')
  } else if (!statusVAl) {
    query = query.eq('status', 'InProgress')
  }
  const { data: lead_logs, error: countError } = await query

  // .containedBy('participantsA',{"uid":"4daHzWw8zSUZqYlvRGrfYwzC8al1","name":"Nithesh Reddy"})
  // .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')
  //.order('due_date', { ascending: false })

  if (countError) {
    console.error(countError)
    return
  }
  console.log(' added data is ', lead_logs)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
// get all TaskManTasks from supabase
export const streamGetAllParticipantTasks = async (
  orgId,
  snapshot,
  data,
  error
) => {
  // [{"uid":"4daHzWw8zSUZqYlvRGrfYwzC8al1","name":"Nithesh Reddy"}]
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate, statusVAl, showOnlyDone } = data
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)

  const query = supabase
    .from(`maahomes_TM_Tasks`)
    .select('*')
    .textSearch('followersUid', `${uid}`, { config: 'english' })
  //  if(showOnlyDone){
  //   query = query.eq('status', 'Done')
  //  }
  //   else if (!statusVAl) {
  //     query = query.eq('status', 'InProgress')
  //   }
  const { data: lead_logs, error: countError } = await query

  // .containedBy('participantsA',{"uid":"4daHzWw8zSUZqYlvRGrfYwzC8al1","name":"Nithesh Reddy"})
  // .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')
  //.order('due_date', { ascending: false })

  if (countError) {
    console.error('added followers data is', countError)
    return
  }
  console.log(' added followers data is ', lead_logs)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
// get all Get Customers from supabase
export const streamGetCustomersS = async (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid, cutoffDate } = data
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error: countError } = await supabase
    .from(`${orgId}_company`)
    .select('*')
  // .eq('type', 'sts_change')
  // .is('projectId', null)
  // .isNull('projectId')
  // .eq('from', 'visitfixed')

  if (countError) {
    console.error(countError)
    return
  }
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const getEmployeesTaskProgressDept = async (
  orgId,
  snapshot,
  data,
  error
) => {
  try {
    const { dateFull } = data
    const itemsQuery = query(
      collection(db, `${orgId}_emp_performance`),
      where('date', '==', dateFull)
    )
    return onSnapshot(itemsQuery, snapshot, error)
  } catch (error) {
    console.log('erro in emp performance Upate getemployee')
  }
}
export const updateWalletTransactionStatus = async (
  orgId,
  data1,
  by,
  enqueueSnackbar
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { id, status, custId, Uuid, projectId, totalAmount } = data1
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error } = await supabase
    .from(`${orgId}_accounts`)
    .update({ status: status })
    .eq('id', id)

  const { data: data4, error: error4 } = await supabase
    .from(`${orgId}_customer_logs`)
    .insert([
      {
        type: 'accounts',
        subtype: data1?.subtype || 'wallet_reviewer',
        T: Timestamp.now().toMillis(),
        Uuid: Uuid,
        by,
        payload: { comments: '' },
        from: data1?.oldStatus || 'review',
        to: status,
        projectId: projectId || '',
      },
    ])
  console.log(
    'check it ',
    status,
    status === 'received',
    status === 'Failed',
    totalAmount,
    data1
  )
  if (status === 'Failed') {
    await updateDoc(doc(db, `${orgId}_company`, custId), {
      input_money: increment(-totalAmount),

      cancelled: increment(totalAmount),
    })
    await enqueueSnackbar('Marked as payment rejected', {
      variant: 'success',
    })
  }
  if (status === 'received') {
    await updateDoc(doc(db, `${orgId}_company`, custId), {
      input_money: increment(-totalAmount),
      remaining_money: increment(totalAmount),
    })
    await enqueueSnackbar('Marked as payment received', {
      variant: 'success',
    })
  }
  console.log('check it ', data4, error4)
  if (lead_logs) {
    await enqueueSnackbar('Marked as Amount Recived', {
      variant: 'success',
    })
  }
  if (error) {
    await enqueueSnackbar('Transaction Updation Failed', {
      variant: 'error',
    })
  }

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const updateTransactionStatus = async (
  orgId,
  data1,
  by,
  enqueueSnackbar
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { id, status, Uuid, projectId, totalAmount } = data1
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error } = await supabase
    .from(`${orgId}_accounts`)
    .update({ status: status })
    .eq('id', id)

  const { data: data4, error: error4 } = await supabase
    .from(`${orgId}_unit_logs`)
    .insert([
      {
        type: 'accounts',
        subtype: data1?.subtype || 'pay_reviewer',
        T: Timestamp.now().toMillis(),
        Uuid: Uuid,
        by,
        payload: { comments: '' },
        from: data1?.oldStatus || 'review',
        to: status,
        projectId: projectId || '',
      },
    ])
  console.log(
    'check it ',
    status,
    status === 'received',
    status === 'Failed',
    totalAmount,
    data1
  )
  if (status === 'Failed') {
    await updateDoc(doc(db, `${orgId}_stalls`, Uuid), {
      T_review: increment(-totalAmount),
      T_balance: increment(totalAmount),
      T_elgible_balance: increment(totalAmount),
      T_cancelled: increment(totalAmount),
    })
    await enqueueSnackbar('Marked as payment rejected', {
      variant: 'success',
    })
  }

  if (status === 'received') {
    await updateDoc(doc(db, `${orgId}_stalls`, Uuid), {
      T_review: increment(-totalAmount),
      T_approved: increment(totalAmount),
    })
    await enqueueSnackbar('Marked as payment received', {
      variant: 'success',
    })
  }
  console.log('check it ', data4, error4)
  if (lead_logs) {
    await enqueueSnackbar('Marked as Amount Recived', {
      variant: 'success',
    })
  }
  if (error) {
    await enqueueSnackbar('Transaction Updation Failed', {
      variant: 'error',
    })
  }

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const updateLeadsLogWithProject = async (
  orgId,
  snapshot,
  data1,
  error1
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { pId, LeadId } = data1
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error } = await supabase
    .from(`${orgId}_lead_logs`)
    .update({ projectId: pId })
    .eq('Luid', LeadId)
    .eq('type', 'sts_change')

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}

export const updateTodaySourceStatsDB = async (
  orgId,
  snapshot,
  data1,
  error1
) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const records = []
  const getAllProjectsQuery = await query(
    collection(db, `${'maahomes'}_leads_lake`),
    where('cT', '>=')
  )
  const counter = 0

  const querySnapshot = await getDocs(getAllProjectsQuery)
  const docs = querySnapshot.docs.slice() // Create a copy of the documents array
  console.log('docs length', docs.length)
  await processDocuments(docs, orgId)
  return
  // return onSnapshot(itemsQuery, snapshot, error)
}
async function processDocuments(docs, orgId) {
  console.log('docs length', docs.length)
  if (docs.length === 0) {
    console.log('All documents processed.')
    return
  }

  const doc = docs.shift()
  const payload = doc.data()
  const {
    cT,
    source: sourceId,
    eventName,
    currentStatus,
    responderPhone,
  } = payload

  const projName = eventName === '' ? 'NA' : eventName
  let customerMobile = ''
  if (responderPhone) {
    customerMobile = responderPhone?.slice(-10)
  } else {
    customerMobile = ''
  }
  const startOfDay = new Date(cT)
  startOfDay.setHours(0, 0, 0, 0)
  const day = startOfDay.getTime()
  const counter = 0

  const foundLength = await checkIfLeadAlreadyExists(
    `${'maahomes'}_leads`,
    customerMobile
  )
  let leadDetails = {}
  let coveredA = []
  let Status = 'unassigned'

  if (foundLength?.length > 0) {
    leadDetails = foundLength[0]
    coveredA = leadDetails['coveredA'] || []
    Status = leadDetails['Status']
  }

  const { data: lead_logs, error: countError } = await supabase
    .from(`${orgId}_sales_leads_source_daily_logs`)
    .select('*')
    .eq('day', day)
    .eq('sourceId', sourceId)
    .eq('eventName', projName)

  if (lead_logs.length > 0) {
    // Update existing record
    const leadsTotal = lead_logs[0]['totalLeads']
    const usedLead = lead_logs[0]['usedLead']
    const revisited = lead_logs[0]['revisited']
    const InProgress = lead_logs[0]['InProgress']
    const InBooked = lead_logs[0]['InBooked']
    const InJunk = lead_logs[0]['InJunk']
    const InFollowup = lead_logs[0]['InFollowup']
    const InNew = lead_logs[0]['InNew']
    const InVisitfixed = lead_logs[0]['InVisitfixed']
    const InNegotiation = lead_logs[0]['InNegotiation']
    const InVisitdone = lead_logs[0]['InVisitdone']

    const InNotInterested = lead_logs[0]['InNotInterested']

    const junk = lead_logs[0]['junk']
    const booked = lead_logs[0]['booked']
    const notinterested = lead_logs[0]['notinterested']
    const visitsfixed = lead_logs[0]['visitsfixed']
    const visitdone = lead_logs[0]['visitdone']
    const followup = lead_logs[0]['followup']
    const new1 = lead_logs[0]['new1']
    const negotiation = lead_logs[0]['negotiation']
    // More properties...
    if (currentStatus === 'added') {
      await supabase
        .from(`${orgId}_sales_leads_source_daily_logs`)
        .update({
          totalLeads: leadsTotal + 1,
          usedLead: usedLead + (currentStatus === 'added' ? 1 : 0),
          InProgress:
            InProgress +
            ([
              'new',
              'followup',
              'visitfixed',
              'visitdone',
              'negotiation',
            ].includes(Status)
              ? 1
              : 0),

          InFollowup: InFollowup + (['followup'].includes(Status) ? 1 : 0),
          InNew: InNew + (['new'].includes(Status) ? 1 : 0),
          InVisitfixed:
            InVisitfixed + (['visitfixed'].includes(Status) ? 1 : 0),
          InNegotiation:
            InNegotiation + (['negotiation'].includes(Status) ? 1 : 0),
          InVisitdone: InVisitdone + (['visitdone'].includes(Status) ? 1 : 0),
          InBooked: InBooked + (['booked'].includes(Status) ? 1 : 0),
          InJunk: InJunk + (['junk'].includes(Status) ? 1 : 0),
          InNotInterested:
            InNotInterested + (['notinterested'].includes(Status) ? 1 : 0),
          junk: junk + coveredA.includes('junk'),
          booked: booked + coveredA.includes('booked'),
          notinterested: notinterested + coveredA.includes('notinterested'),
          visitsfixed: visitsfixed + coveredA.includes('visitfixed'),
          visitdone: visitdone + coveredA.includes('visitdone'),
          followup: followup + coveredA.includes('followup'),
          new1: new1 + coveredA.includes('new'),
          negotiation: negotiation + coveredA.includes('negotiation') ? 1 : 0,
        })
        .eq('day', day)
        .eq('sourceId', sourceId)
        .eq('eventName', projName)
    } else {
      await supabase
        .from(`${orgId}_sales_leads_source_daily_logs`)
        .update({
          totalLeads: leadsTotal + 1,
          revisited: revisited + 1,
        })
        .eq('day', day)
        .eq('sourceId', sourceId)
        .eq('eventName', projName)
    }
  } else {
    // Insert new record
    if (currentStatus === 'added') {
      await supabase
        .from(`${orgId}_sales_leads_source_daily_logs`)
        .insert({
          totalLeads: 1,
          usedLead: currentStatus === 'added' ? 1 : 0,
          InProgress: [
            'new',
            'followup',
            'visitfixed',
            'visitdone',
            'negotiation',
          ].includes(Status)
            ? 1
            : 0,
          InNew: ['new'].includes(Status) ? 1 : 0,
          InVisitfixed: ['visitfixed'].includes(Status) ? 1 : 0,
          InNegotiation: ['negotiation'].includes(Status) ? 1 : 0,
          InVisitdone: ['visitdone'].includes(Status) ? 1 : 0,
          InBooked: ['booked'].includes(Status) ? 1 : 0,
          InJunk: ['junk'].includes(Status) ? 1 : 0,
          InFollowup: ['followup'].includes(Status) ? 1 : 0,
          InNotInterested: ['notinterested'].includes(Status) ? 1 : 0,

          junk: coveredA.includes('junk') ? 1 : 0,
          booked: coveredA.includes('booked') ? 1 : 0,
          notinterested: coveredA.includes('notinterested') ? 1 : 0,
          visitsfixed: coveredA.includes('visitfixed') ? 1 : 0,
          visitdone: coveredA.includes('visitdone') ? 1 : 0,
          followup: coveredA.includes('followup') ? 1 : 0,
          new1: coveredA.includes('new') ? 1 : 0,
          negotiation: coveredA.includes('negotiation') ? 1 : 0,
          day: day,
          sourceId: sourceId,
          eventName: projName,
        })
        .eq('day', day)
        .eq('sourceId', sourceId)
        .eq('eventName', projName)
    } else {
      await supabase
        .from(`${orgId}_sales_leads_source_daily_logs`)
        .insert({
          totalLeads: 1,
          revisited: currentStatus === 'DUPLICAE_ENTRY' ? 1 : 0,
          day: day,
          sourceId: sourceId,
          eventName: projName,
        })
        .eq('day', day)
        .eq('sourceId', sourceId)
        .eq('eventName', projName)
    }
  }

  // Process next document
  await processDocuments(docs, orgId)
}
export const editTaskManData = async (orgId, dta, user) => {
  const {
    id,
    taskTitle,
    taskdesc,
    dept,
    due_date,
    assignedTo,
    assignedToObj,
    followers,
    priorities,
    attachments,
    file,
  } = dta

  console.log('data is ', followers)
  let followA = []
  let attachA = []
  const followAUid = []
  const x = [assignedToObj?.uid || '']
  if (followers) {
    followA = await followers?.map((d) => {
      const y = {}
      y.label = d?.name || d?.label
      y.value = d?.uid || d?.value
      followAUid.push(d?.uid || d?.value)
      x.push(d?.uid)

      return y
    })
  }
  if (attachments) {
    attachA = await attachments?.map((d) => {
      const y = {}
      y.name = d?.name
      y.url = d?.url
      y.type = d?.type
      return y
    })
  }
  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .update({
      created_on: Timestamp.now().toMillis(),
      // dept: assignedToObj?.department[0] || '',
      due_date: due_date,
      priority: priorities,
      status: 'InProgress',
      desc: taskdesc,
      title: taskTitle,
      to_email: assignedToObj?.email,
      to_name: assignedToObj?.name,
      to_uid: assignedToObj?.uid,
      participantsA: followA,
      participantsC: followA.length || 0,
      followersC: followA.length || 0,
      followersUid: followAUid || [],
      attachmentsCount: attachA?.length || 0,
      attachmentsA: attachA,
    })
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const deleteTaskManData = async (orgId, dta, user) => {
  const {
    id,
    taskTitle,
    taskdesc,
    dept,
    due_date,
    assignedTo,
    assignedToObj,
    followers,
    priorities,
    attachments,
    file,
  } = dta
  let followA = []
  let attachA = []
  const followAUid = []
  const x = [assignedToObj?.uid || '']
  if (followers) {
    followA = await followers?.map((d) => {
      const y = {}
      y.label = d?.name || d?.label
      y.value = d?.uid || d?.value
      x.push(d?.uid)
      followAUid.push(d?.uid)
      return y
    })
  }
  if (attachments) {
    attachA = await attachments?.map((d) => {
      const y = {}
      y.name = d?.name
      y.url = d?.url
      y.type = d?.type
      return y
    })
  }
  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .delete()
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const editTaskManAttachmentsData = async (orgId, dta, user) => {
  const { id, attachments } = dta
  let attachA = []

  if (attachments) {
    attachA = await attachments?.map((d) => {
      const y = {}
      y.name = d?.name
      y.url = d?.url
      y.type = d?.type
      return y
    })
  }
  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .update({
      attachmentsCount: attachA?.length || 0,
      attachmentsA: attachA,
    })
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const ReOpenTaskManData = async (orgId, dta, user, status) => {
  await console.log('task details are', dta)
  const {
    id,
    title,

    due_date,
  } = dta

  const x = [dta?.by_uid || '', dta?.to_uid || '']

  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .update({
      closedBy: user.uid,
      status: status,
      closedOn: Timestamp.now().toMillis(),
    })
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  x.map(async (userId) => {
    // get phone no's
    const additionalUserInfo = await getUser(userId)
    await console.log('task details are', dta, additionalUserInfo)
    await sendWhatAppTextSms1(
      additionalUserInfo?.offPh,
      `Task has been *Re-Open* by  ${
        user.displayName
      } \n \n *Due Date*:${prettyDateTime(
        due_date
      )}  \n *Done Date*: ${prettyDateTime(
        Timestamp.now().toMillis()
      )} \n *Creator*:${dta?.by_name} \n *Task*: ${title}`
    )
  })
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const CompleteTaskManData = async (orgId, dta, user, status) => {
  await console.log('task details are', dta)
  const {
    id,
    title,

    due_date,
  } = dta

  const x = [dta?.by_uid || '', dta?.to_uid || '']

  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .update({
      closedBy: user.uid,
      status: status,
      closedOn: Timestamp.now().toMillis(),
    })
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  x.map(async (userId) => {
    // get phone no's
    const additionalUserInfo = await getUser(userId)
    await console.log('task details are', dta, additionalUserInfo)
    await sendWhatAppTextSms1(
      additionalUserInfo?.offPh,
      `Task has been *closed* by  ${
        user.displayName
      } \n \n *Due Date*:${prettyDateTime(
        due_date
      )}  \n *Done Date*: ${prettyDateTime(
        Timestamp.now().toMillis()
      )} \n *Creator*:${dta?.by_name} \n *Task*: ${title}`
    )
  })
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const AddCommentTaskManData = async (orgId, dta, user) => {
  const { id, comments } = dta
  const { data: lead_logs, error } = await supabase
    .from(`maahomes_TM_Tasks`)
    .update({
      comments: comments,
    })
    .eq('id', id)

  console.log('updating error', lead_logs, error)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
//  get lead activity list
export const steamLeadActivityLog = async (orgId, snapshot, data, error) => {
  const { uid } = data
  console.log('is uid g', data, uid)
  const { data: lead_logs, error1 } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('type,subtype,T, by, from, to ')
    .eq('Luid', uid)
    .order('T', { ascending: false })
  return lead_logs
}
export const streamSalesActitvityReport = async (orgId, data) => {
  const { pId, startTime, endTime } = data

  const { data: lead_logs, error1 } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('type,subtype,T, by, from, to ')
    .eq('by', pId)
    .gte('T', startTime)
    .lte('T', endTime)
    .order('T', { ascending: false })
  console.log('counts are ', lead_logs, data, pId)

  return lead_logs.length
}
export const streamSalesActitvityLogReportData = async (orgId, data) => {
  const { pId, startTime, endTime } = data

  const { data: lead_logs, error1 } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('*')
    .eq('by', pId)
    .gte('T', startTime)
    .lte('T', endTime)
    .order('T', { ascending: false })
  console.log('counts are ', lead_logs, data, pId)

  return lead_logs
}
//  get lead activity list
export const steamUnitActivityLog = async (orgId, data) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', data, uid)
  const { data: lead_logs, error1 } = await supabase
    .from(`${orgId}_unit_logs`)
    .select('*')
    .eq('Uuid', uid)
    .order('T', { ascending: false })
  return lead_logs
}
//  get lead activity list
export const steamUnitTasks = async (orgId, data) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', data, uid)
  const { data: lead_logs, error: error1 } = await supabase
    .from(`${orgId}_unit_tasks`)
    .select('*')
    .eq('Uuid', uid)
    .order('created_on', { ascending: false })
  console.log('task value is ', lead_logs, error1)
  return lead_logs
}
//  get legal Tasks All
export const getAllLegalTasks = async (orgId, data) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', data, uid)
  const { data: lead_logs, error: error1 } = await supabase
    .from(`${orgId}_unit_tasks`)
    .select('*')
    .eq('dept', 'legal')
    .order('created_on', { ascending: false })
  console.log('task value is ', lead_logs, error1)
  return lead_logs
}
export const steamLeadNotes = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', uid)
  return onSnapshot(doc(db, `${orgId}_leads_notes`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadPhoneLog = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data

  return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamUserTodayProgress = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const todaydate = new Date()
  const { uid } = data
  const ddMy =
    'D' +
    todaydate.getDate() +
    'M' +
    todaydate.getMonth() +
    'Y' +
    todaydate.getFullYear()
  console.log('is uid g', uid)

  const id = `${uid}DD${ddMy}`

  console.log('is uid g', uid)
  return onSnapshot(doc(db, `${orgId}_emp_performance`, id), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadScheduleLog = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))

  const { uid } = data
  if (uid == undefined) return
  return onSnapshot(doc(db, `${orgId}_leads_sch`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadById = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  return onSnapshot(doc(db, `${orgId}_leads`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const streamUnitById = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  return onSnapshot(doc(db, `${orgId}_stalls`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
// stream
export const getLeadsByStatus = (orgId, snapshot, data, error) => {
  const { projAccessA, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  const itemsQuery = query(
    collection(db, colName),
    where('ProjectId', 'in', projAccessA)
    // where('Status', 'in', status)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadsByUnassigned = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Status', '==', 'unassigned')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadsByAdminStatus = (orgId, snapshot, data, error) => {
  const { status, projAccessA } = data
  const itemsQuery = query(
    collection(db, `${orgId}_visitors`)
    // where('Status', 'in', status)
    //  orderBy('Date')
  )
  console.log('hello by Status', onSnapshot(itemsQuery, snapshot, error))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getStallLeadsByAdminStatus = (orgId, snapshot, data, error) => {
  const { status, projAccessA } = data
  const itemsQuery = query(
    collection(db, `${orgId}_stall_leads`),
    where('Status', 'in', status)
    //  orderBy('Date')
  )
  console.log('hello by Status', onSnapshot(itemsQuery, snapshot, error))
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getCpLeadsByAdminStatus = (orgId, snapshot, data, error) => {
  const { status, projAccessA } = data
  const itemsQuery = query(
    collection(db, `${orgId}_leads_cp`),
    where('Status', 'in', status)
    //  orderBy('Date')
  )
  console.log(
    'hello by Status cpleads',
    onSnapshot(itemsQuery, snapshot, error)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getEmployeesListDept = async (orgId, data) => {
  const { cutoffDate, uid, isCp } = data

  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('roles', 'array-contains-any', ['sales-manager', 'sales-executive'])
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => doc.data())
}

export const getMyLeadsByDate = async (orgId, data) => {
  const { cutoffDate, uid, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  console.log('leads table name cp', colName)
  const itemsQuery = query(
    collection(db, colName),
    where('assignedTo', '==', uid),
    where('Date', '>=', cutoffDate)
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => doc.data())
}
export const getLeadsByDate = async (orgId, data) => {
  const { cutoffDate, dateRange } = data
  console.log('my Array data is delayer 1 inside two ranges', dateRange, data)
  let itemsQuery
  if (dateRange?.[0] == null) {
    console.log('my Array data is delayer 1 inside two ranges', dateRange)
    itemsQuery = query(
      collection(db, `${orgId}_leads`),
      where('Date', '>=', cutoffDate)
    )
  } else if (dateRange?.[1] != null) {
    console.log('my Array data is delayer 1 inside two ranges', dateRange)
    itemsQuery = query(
      collection(db, `${orgId}_leads`),
      where('Date', '>=', cutoffDate),
      where('Date', '<=', dateRange?.[1]?.getTime() + 86400000)
    )
  }
  // else if(dateRange?.[1] == null) {
  //   console.log('my Array data is delayer 1 inside same', dateRange, cutoffDate, cutoffDate)
  //   itemsQuery = query(
  //     collection(db, `${orgId}_leads`),
  //     where('Date', '>=', cutoffDate),
  //     where('Date', '<=', (cutoffDate + 86400000) ))
  // }
  else {
    console.log(
      'my Array data is delayer 1 inside normal',
      dateRange,
      cutoffDate
    )
    itemsQuery = query(
      collection(db, `${orgId}_leads`),
      where('Date', '>=', cutoffDate),
      where('Date', '<=', cutoffDate + 86400000)
    )
  }

  //  const itemsQuery = query(
  //     collection(db, `${orgId}_leads`),
  //     where('Date', '>=', cutoffDate))
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => {
    const x = doc.data()
    x.id = doc.id
    return x
  })
}
export const getLeadsByRange = async (orgId, data) => {
  const { startDate, cutoffDate } = data
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Date', '>=', startDate),
    where('Date', '<=', cutoffDate)
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => {
    const x = doc.data()
    x.id = doc.id
    return x
  })
}
//for global search
export const getLeadsByPhoneNo = async (orgId, data) => {
  const { search } = data
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Mobile', '==', search)
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  await citySnapshot.docs.map((doc) => {
    console.log('value is', doc.id, doc.data())
  })
  return await citySnapshot.docs.map((doc) => {
    const x = doc.data()
    x.id = doc.id
    return x
  })
}
// get crmCustomers list

export const getCRMCustomer = (orgId, snapshot, data, error) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_company`)
    // where('status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getCRMCustomerByProject = (orgId, snapshot, data, error) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_company`)
    // where('status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}

// get crmCustomers list

export const getBookedUnitsByProject = (orgId, snapshot, data, error) => {
  const { status } = data
  // console.log('hello ', status, data, data?.projectId)
  const itemsQuery = query(
    collection(db, `${orgId}_stalls`),
    where('unitStatus', 'in', status)
  )
  // if (data?.projectId) {
  //   itemsQuery = query(
  //     collection(db, `${orgId}_stalls`),
  //     where('unitStatus', 'in', status),
  //     where('pId', '==', data?.projectId)
  //   )
  // } else if (data?.assignedTo) {
  //   console.log('inside value si ', data?.assignedTo)
  //   itemsQuery = query(
  //     collection(db, `${orgId}_stalls`),
  //     where('status', 'in', status),
  //     where('assignedTo', '==', 'bxLExkQcFkfzOD5pXjBtf5uKKS82')
  //   )
  // }

  let q = collection(db, `${orgId}_stalls`)
  const conditions = []

  // Append 'status' condition if it's not undefined
  if (status !== undefined && !status.includes('unassigned')) {
    conditions.push(where('status', 'in', status))
  }

  if (status !== undefined && status.includes('unassigned')) {
    // conditions.push(where('crm_executive', '==', ''))
    conditions.push(where('assignedTo', '==', ''))
  }

  // Append 'projectId' condition if it's not undefined
  if (data?.projectId !== undefined) {
    conditions.push(where('pId', '==', data?.projectId))
  }

  // Append 'assignedTo' condition if it's not undefined
  // if (data?.assignedTo !== undefined) {
  //   conditions.push(where('assignedTo', '==', data?.assignedTo))
  // }

  // If all conditions are defined, append them to the query
  if (conditions.length > 0) {
    console.log('value is ', data)
    q = query(q, ...conditions)
  }

  // console.log('hello ', status, data?.projectId, conditions)
  return onSnapshot(q, snapshot, error)
}
// get crmCustomers list

export const getLeadsTransfer = (orgId, snapshot, data, error) => {
  const { status } = data
  console.log('hello ', status, data?.projectId, data)
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Status', 'in', data?.currentStatus),
    // where('coveredA', 'array-contains-any', data?.coveredStatus),
    where('assignedTo', '==', data?.leadAssignedTo)
  )
  // if (data?.projectId) {
  //   itemsQuery = query(
  //     collection(db, `${orgId}_stalls`),
  //     where('status', 'in', status),
  //     where('pId', '==', data?.projectId)
  //   )
  // } else if (data?.assignedTo) {
  //   console.log('inside value si ', data?.assignedTo)
  //   itemsQuery = query(
  //     collection(db, `${orgId}_stalls`),
  //     where('status', 'in', status),
  //     where('assignedTo', '==', 'bxLExkQcFkfzOD5pXjBtf5uKKS82')
  //   )
  // }

  let q = collection(db, `${orgId}_stalls`)
  const conditions = []

  // Append 'status' condition if it's not undefined
  if (status !== undefined) {
    conditions.push(where('status', 'in', status))
  }

  // Append 'projectId' condition if it's not undefined
  if (data?.projectId !== undefined) {
    conditions.push(where('pId', '==', data?.projectId))
  }

  // Append 'assignedTo' condition if it's not undefined
  if (data?.assignedTo !== undefined) {
    conditions.push(where('assignedTo', '==', data?.assignedTo))
  }

  // If all conditions are defined, append them to the query
  if (conditions.length > 0) {
    q = query(q, ...conditions)
  }

  console.log('hello ', status, data?.projectId, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getAllUnitsByProject = (orgId, snapshot, data, error) => {
  const { status } = data
  console.log('hello ', status, data?.projectId)
  let itemsQuery = query(collection(db, `${orgId}_stalls`))
  if (data?.projectId) {
    itemsQuery = query(
      collection(db, `${orgId}_stalls`),
      where('pId', '==', data?.projectId)
    )
  }

  console.log('hello ', status, data?.projectId, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getUnassignedCRMunits = (orgId, snapshot, data, error) => {
  const { status } = data
  console.log('hello ', status)
  try {
    const itemsQuery = query(
      collection(db, `${orgId}_stalls`),
      where('assignedTo', '>', null)
    )
    console.log('hello ', status, itemsQuery)
    return onSnapshot(itemsQuery, snapshot, error)
  } catch (error) {
    console.log('error in hello', error)
  }
}
// get finance transactions
export const getFinanceTransactionsByStatus = (
  orgId,
  snapshot,
  data,
  error
) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_fincance`),
    where('status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get finance transactions of Unit
export const getFinanceForUnit = (orgId, snapshot, data, error) => {
  const { unitId } = data
  console.log('hello ', unitId)
  const itemsQuery = query(
    collection(db, `${orgId}_fincance`),
    where('unitId', '==', unitId)
  )
  console.log('hello ', unitId, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get unit details Matching to status
export const getCrmUnitsByStatus = (orgId, snapshot, data, error) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_stalls`),
    where('Status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get leads only of a user
export const getLeadsByStatusUser = (orgId, snapshot, data, error) => {
  console.log('orgId is ', orgId)
  const { status, uid, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  const itemsQuery = query(
    collection(db, colName),
    where('Status', 'in', status),
    where('assignedTo', '==', uid)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getTodayTodoLeadsData = (orgId, snapshot, data, error) => {
  const { type } = data

  // type: 'upcoming'

  const itemsQuery = query(
    collection(db, `${orgId}_leads_sch`),
    where('staA', 'array-contains-any', ['pending', 'overdue'])
  )
  // const itemsQuery1 = query(
  //   collection(db, `${orgId}_leads_sch'),
  //   where('staA', 'array-contains-any', ['pending', 'overdue'])
  // )
  // return onSnapshot(itemsQuery, (docSna) => {
  //   console.log('Current data: ', docSna.docs.length)
  //   docSna.docs.map(async (dataSnp) => {
  //     const userRef = doc(db, `${orgId}_leads', dataSnp.id)
  //     const docSnap1 = await getDoc(userRef)
  //     if (docSnap1.exists()) {
  //       return docSnap1.data()
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log('No such document!')
  //       return null
  //     }
  //   })
  // })
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getCRMTeamTasks = (orgId, snapshot, data, error) => {
  const { type } = data

  // type: 'upcoming'

  const itemsQuery = query(
    collection(db, `${orgId}_crm_tasks`),
    where('staA', 'array-contains-any', ['pending', 'overdue'])
  )

  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getFinanceTeamTasks = (orgId, snapshot, data, error) => {
  const { type } = data

  // type: 'upcoming'

  const itemsQuery = query(
    collection(db, `${orgId}_fin_tasks`),
    where('staA', 'array-contains-any', ['pending', 'overdue'])
  )

  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getProjectsTasks = (orgId, snapshot, data, error) => {
  const { type } = data

  // type: 'upcoming'

  const itemsQuery = query(
    collection(db, `${orgId}_project_tasks`),
    where('staA', 'array-contains-any', ['pending', 'overdue'])
  )

  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getTodayTodoLeadsDataByUser = (orgId, snapshot, data, error) => {
  const { status, uid } = data

  const itemsQuery = query(
    collection(db, `${orgId}_leads_sch`),
    where('staA', 'array-contains-any', ['pending', 'overdue']),
    where('assignedTo', '==', uid)
  )

  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadbyId1 = async (orgId, uid) => {
  const docRef = doc(db, `${orgId}_leads`, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}
export const getCRMdocById1 = async (orgId, uid) => {
  const docRef = doc(db, `${orgId}_company`, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}
export const getCrmUnitById1 = async (orgId, uid) => {
  const docRef = doc(db, `${orgId}_stalls`, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}
export const getProjById1 = async (orgId, uid) => {
  const itemsQuery = query(
    collection(db, `${orgId}_phases`),
    where('projectId', '==', uid)
  )

  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => doc.data())
}
export const getLedsData1 = async (orgId) => {
  try {
    const citiesCol = collection(db, `${orgId}_leads`)
    const citySnapshot = await getDocs(citiesCol)
    await citySnapshot.docs.map((doc) => doc.data())
    await console.log(
      'inside getLeadsData1 length',
      `${orgId}leads`,
      citySnapshot.docs.map((doc) => doc.data())
    )
    return citySnapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getLedsData = async () => {
  try {
    const citiesCol = collection(db, 'users')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = citySnapshot.docs.map((doc) => doc.data())
    return cityList
  } catch (error) {
    console.log('error in db', error)
  }
}
export const getUnits = (orgId, snapshot, data, error) => {
  const { status, pId, blockId } = data

  const itemsQuery = query(
    collection(db, `${orgId}_stalls`),
    where('pId', '==', pId),
    // where('blockId', '==', blockId || 1),
    orderBy('unit_no', 'asc')
  )

  console.log('hello ', status, itemsQuery, data)

  return onSnapshot(itemsQuery, snapshot, error)
}

export const getUnitsAllBlocks = (orgId, snapshot, data, error) => {
  const { status, pId, blockId, selUnitStatus } = data

  const itemsQuery = query(
    collection(db, `${orgId}_stalls`),
    where('pId', '==', pId),
    where('status', 'in', selUnitStatus)
    // orderBy('unit_no', 'asc')
  )

  console.log('hello ', status, itemsQuery, data)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getCustomerDocs = async (orgId, uid: string, snapshot, error) => {
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_leads_docs`),
      where('cUid', '==', uid)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getPlanDiagramByPhase = async (orgId, data, snapshot, error) => {
  const { pId, phaseId, type } = data
  console.log('plandiagram data is', data)
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_project_docs`),
      where('pId', '==', pId),
      // where('phaseId', '==', phaseId),
      where('type', '==', type)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}
export const getProject = async (orgId, uid: string) => {
  try {
    const userRef = doc(db, `${orgId}_events`, uid)
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}
export const getUser = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}

export const checkIfLeadAlreadyExists = async (cName, matchVal) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  console.log('matchVal', matchVal)
  const q = await query(collection(db, cName), where('Mobile', '==', matchVal))
  const parentDocs = []
  const cpDocs = []

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  const q1 = await query(
    collection(db, `${cName}_cp`),
    where('Mobile', '==', matchVal)
  )

  const querySnapshot1 = await getDocs(q1)

  querySnapshot1.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })
  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads`).add(data)
}
export const checkIfCampaignAlreadyExists = async (orgId, unitId) => {
  const q = await query(
    collection(db, `${orgId}_campaigns`),
    where('campaignTitle', '==', unitId)
  )
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  return parentDocs
}
export const checkIfUnitAlreadyExists = async (
  cName,
  pId,
  phaseId,
  blockId,
  unitId
) => {
  // db.collection(`${orgId}_leads').doc().set(data)
  // db.collection('')
  console.log('inoinel', pId, phaseId || 1, blockId || 1, unitId)
  const q = await query(
    collection(db, cName),
    where('unit_no', '==', unitId),
    // where('phaseId', '==', phaseId || 1),
    // where('blockId', '==', blockId || 1),
    where('pId', '==', pId)
  )

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', unitId, pId, querySnapshot.docs.length)
  // return await querySnapshot.docs.length
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const x = doc.data()
    x.unitUid = doc.id
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(x)
  })

  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads').add(data)
}
export const checkIfUserAlreadyExists = async (cName, matchVal) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  console.log('matchVal', matchVal)
  const q = await query(collection(db, cName), where('email', '==', matchVal))

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads`).add(data)
}
export const getLeadsDataLake = async (orgId, snapshot, error, data) => {
  const { dateRange } = data
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_leads_lake`),
    where('cT', '>=', dateRange)
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getAllRoleAccess = async (orgId) => {
  // userAccessRoles.forEach(async (element) => {
  //   const r = 'A' + Math.random() * 100000000000000000 + 'Z'
  //   const updated = {
  //     ...element,
  //     uid: r,
  //   }
  //   const ref = doc(db, `${orgId}_roles_access', r)
  //   await setDoc(ref, updated, { merge: true })
  // })
  const records = []
  const getAllRolesQueryById = await query(
    collection(db, `${orgId}_roles_access`)
  )
  const querySnapshot = await getDocs(getAllRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records
}

export const getSelectedRoleAccess = async (orgId, role) => {
  const getRolesQueryById = await query(
    collection(db, `spark_roles_access`),
    where('role', '==', role)
  )
  const records = []
  const querySnapshot = await getDocs(getRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records?.[0]?.access
    ?.filter((item) => item.checked)
    ?.map((elem) => elem.key)
}
export const getMyProjects = async (orgId, data, snapshot, error) => {
  console.log('org is ', orgId)
  const { projAccessA } = data
  console.log('what is this', projAccessA)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_events`),
    // where('uid', 'in', projAccessA),
    orderBy('created', 'desc')
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getAllProjects = async (orgId, snapshot, error) => {
  console.log('org is ', orgId)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_events`),
    orderBy('created', 'desc')
  )
  console.log(getAllProjectsQuery, 'dcavlvblasfjv')
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getAllCampaigns = async (orgId, snapshot, error) => {
  console.log('org is ', orgId)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_campaigns`),
    orderBy('start_date', 'desc')
  )
  console.log(getAllProjectsQuery, 'dcavlvblasfjv')
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getSalesReportsData = async (orgId, snapshot, error) => {
  console.log('org is ', orgId)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_sales_reports`)
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getAllSources = async (orgId, snapshot, error) => {
  console.log('org is ', orgId)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_LeadSources`),
    orderBy('label')
  )
  console.log(getAllProjectsQuery, 'dcavlvblasfjv')
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}

export const getProjectByUid = async (orgId, uid: string, snapshot, error) => {
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_events`),
      where('uid', '==', uid)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getPhasesByProject = async (
  orgId,
  uid: string,
  snapshot,
  error
) => {
  console.log('project details are', uid)
  const getAllPhasesQuery = await query(
    collection(db, `${orgId}_phases`),
    where('projectId', '==', uid)
  )
  return onSnapshot(getAllPhasesQuery, snapshot, error)
}

export const getBlocksByPhase = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  try {
    const getAllPhasesQuery = await query(
      collection(db, 'blocks'),
      where('projectId', '==', projectId),
      where('phaseId', '==', phaseId),
      orderBy('created', 'asc'),
      limit(20)
    )
    return onSnapshot(getAllPhasesQuery, snapshot, error)
  } catch (error) {
    console.log('error at getBlocksByPhase ', error, projectId, phaseId)
    return error
  }
}

export const getPaymentSchedule = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  const getAllPaymentSchedule = await query(
    collection(db, 'paymentSchedule'),
    where('projectId', '==', projectId),
    where('phaseId', '==', phaseId),
    orderBy('created', 'asc')
  )
  return onSnapshot(getAllPaymentSchedule, snapshot, error)
}

export const getAdditionalCharges = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  const getAllAdditionalCharges = await query(
    collection(db, 'additionalCharges'),
    where('projectId', '==', projectId),
    where('phaseId', '==', phaseId),
    orderBy('created', 'asc')
  )
  return onSnapshot(getAllAdditionalCharges, snapshot, error)
}

// **********************************************
// addF
// **********************************************
export const createUser = async (data: any) => {
  try {
    const userRef = doc(db, 'users', data.uid)
    const docSnap = await getDoc(userRef)
    if (!docSnap.exists()) {
      await setDoc(userRef, data, { merge: true })
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}
export const deleteLeadSupabase = async (payload) => {
  const { data, error } = await supabase.from('maahomes_leads').delete()
  await console.log('error as ', error)
}
export const addLeadSupabase = async (payload) => {
  // const { data, error } = await supabase
  //   .from('maahomes_leads')
  //   .insert([payload])
  // await console.log('error as ', error)
}

export const addNotificationSupabase = async (payload, enqueueSnackbar) => {
  // const { data, error } = await supabase
  //   .from('maahomes_leads')
  //   .insert([payload])
  // await console.log('error as ', error)

  const { data, error } = await supabase
    .from('maahomes_notifyTemplates')
    .upsert([{ ...payload }], { upsert: true })

  console.log('created stuff is ', error, data)
  enqueueSnackbar('Notification updated Successful', {
    variant: 'success',
  })
}
export const addTaskBusiness = async (orgId, dta, user) => {
  const {
    taskTitle,
    taskdesc,
    dept,
    due_date,
    assignedTo,
    assignedToObj,
    followers,
    priorities,
    attachments,
  } = dta
  console.log('adding item is ', priorities)
  let followA = []
  let attachA = []
  const followAUid = []
  const x = [assignedToObj?.uid || '']
  if (followers) {
    followA = await followers[0]?.map((d) => {
      const y = {}
      y.label = d?.name
      y.value = d?.uid
      x.push(d?.uid)
      followAUid.push(d?.uid)
      return y
    })
  }
  if (attachments) {
    attachA = await attachments?.map((d) => {
      const y = {}
      y.name = d?.name
      y.url = d?.url
      y.type = d?.type
      return y
    })
  }
  console.log('value is ', followA)

  const { data, error } = await supabase.from(`maahomes_TM_Tasks`).insert([
    {
      created_on: Timestamp.now().toMillis(),
      followersC: followA?.length || 0,
      by_email: user.email,
      by_name: user.displayName,
      by_uid: user.uid,
      dept: assignedToObj?.department[0] || '',
      due_date: due_date,
      priority: priorities,
      status: 'InProgress',
      desc: taskdesc,
      title: taskTitle,
      to_email: assignedToObj?.email,
      to_name: assignedToObj?.name,
      to_uid: assignedToObj?.uid,
      participantsA: followA,
      participantsC: followA?.length || 0,
      followersUid: followAUid || [],
      attachmentsCount: attachA?.length || 0,
      attachmentsA: attachA,
    },
  ])
  x.map(async (userId) => {
    // get phone no's
    const additionalUserInfo = await getUser(userId)
    await console.log('task details are', dta, additionalUserInfo)
    await sendWhatAppTextSms1(
      additionalUserInfo?.offPh,
      `New Task Added By *${user.displayName}*
      \n \n *Due Date*:${prettyDateTime(
        due_date
      )}  \n *Priority*:${priorities} \n *Task*: ${taskTitle}`
    )
  })
  await console.log('data is ', data, error)
}
export const addLegalClarificationTicket = async (orgId, dta, user) => {
  const {
    taskTitle,
    taskdesc,
    dept,
    due_date,
    assignedTo,
    assignedToObj,
    followers,
    priorities,
    attachments,
    Uuid,
  } = dta
  console.log('adding item is ', priorities)
  let followA = []
  let attachA = []
  const followAUid = []
  const x = [assignedToObj?.uid || '']
  if (followers) {
    followA = await followers[0]?.map((d) => {
      const y = {}
      y.label = d?.name
      y.value = d?.uid
      x.push(d?.uid)
      followAUid.push(d?.uid)
      return y
    })
  }
  if (attachments) {
    attachA = await attachments?.map((d) => {
      const y = {}
      y.name = d?.name
      y.url = d?.url
      y.type = d?.type
      return y
    })
  }
  console.log('value is ', followA)

  const { data, error } = await supabase.from(`${orgId}_unit_tasks`).insert([
    {
      created_on: Timestamp.now().toMillis(),
      Uuid: Uuid,
      followersC: followA?.length || 0,
      by_email: user.email,
      by_name: user.displayName,
      by_uid: user.uid,
      dept: 'legal',
      due_date: due_date,
      priority: priorities,
      status: 'InProgress',
      desc: taskdesc,
      title: taskTitle,
      to_email: assignedToObj?.email,
      to_name: assignedToObj?.name,
      to_uid: assignedToObj?.uid,
      participantsA: followA,
      participantsC: followA?.length || 0,
      followersUid: followAUid || [],
      attachmentsCount: attachA?.length || 0,
      attachmentsA: attachA,
    },
  ])
  const { data: data4, error: error4 } = await supabase
    .from(`${orgId}_unit_logs`)
    .insert([
      {
        type: 'task',
        subtype: 'legal',
        T: Timestamp.now().toMillis(),
        Uuid: Uuid,
        by: user?.email,
        payload: { p: priorities },
        from: 'Created',
        to: 'InProgress',
      },
    ])
  x.map(async (userId) => {
    // get phone no's
    const additionalUserInfo = await getUser(userId)
    await console.log('task details are', dta, additionalUserInfo)
    await sendWhatAppTextSms1(
      additionalUserInfo?.offPh,
      `New Legal Task Added By *${user.displayName}*
      \n \n *Due Date*:${prettyDateTime(
        due_date
      )}  \n *Priority*:${priorities} \n *Task*: ${taskTitle}`
    )
  })
  await console.log('data is ', data, error)
}
export const addCampaign = async (orgId, data, by, msg) => {
  try {
    const x = await addDoc(collection(db, `${orgId}_campaigns`), data)
    return x
    // await addLeadLog(orgId, x.id, {
    //   s: 's',
    //   type: 'status',
    //   subtype: 'added',
    //   T: Timestamp.now().toMillis(),
    //   txt: msg,
    //   by,
    // })

    // add task to scheduler to Intro call in 3 hrs
  } catch (error) {
    console.log('error in uploading file with data', data, error)
  }
}
export const addStallLeads = async (orgId, data, by, msg) => {
  try {
    delete data['']
    const x = await addDoc(collection(db, `${orgId}_stall_leads`), data)
    await console.log('add Lead value is ', x, x.id, data)
    const {
      intype,
      Name,
      Mobile,
      countryCode,
      assignedTo,
      Event,
      assignedToObj,
    } = data

    const { data3, errorx } = await supabase
      .from(`${orgId}_stall_lead_logs`)
      .insert([
        {
          type: 'l_ctd',
          subtype: intype,
          T: Timestamp.now().toMillis(),
          Luid: x?.id || '',
          by,
          payload: {},
        },
      ])
    if (Event) {
      // await sendWhatAppTextSms1(
      //   '7760959579',
      //   `Warm Greetings!
      // Thanks for your interest in ${Event},
      // It's a pleasure to be a part of your housing journey. Our team will be in touch with you in a brief period. In the meanwhile, this would help you get to know the project a little more.
      // Warm Regards
      // Maa Homes.`
      // )
    }
    if (assignedTo) {
      const { offPh, name } = assignedToObj
      await sendWhatAppTextSms1(
        offPh,
        `⚡ A new lead- ${Name} Assigned to you @${Event || ''}. 📱${Mobile}`
      )

      // await sendWhatAppTextSms1(
      //   '7760959579',
      //   `Greetings from MAA Homes, I am ${name}

      // This is ${name} from Maa Homes,

      //   Regarding your interest in ${Event}, I’m pleased to be your point of contact throughout this journey. I would like to understand your requirements & do let me know if you have any doubts about ${Event}.
      //   Looking forward to a fruitful relationship.

      // Warm Regards
      // ${name}
      // Maa Homes`
      // )
    }
    await console.log('what is this supbase', data3, errorx)
    // await addLeadLog(orgId, x.id, {
    //   s: 's',
    //   type: 'status',
    //   subtype: 'added',
    //   T: Timestamp.now().toMillis(),
    //   txt: msg,
    //   by,
    // })

    // add task to scheduler to Intro call in 3 hrs

    const data1 = {
      by: by,
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Get into Introduction Call with customer',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }

    const x1 = []

    x1.push('pending')

    await addLeadScheduler(orgId, x.id, data1, x1, data.assignedTo)
    return x
  } catch (error) {
    console.log('error in uploading file with data', data, error)
  }
}
export const addVisitorRegistrations = async (orgId, data, by, msg) => {
  try {
    delete data['']
    const x = await addDoc(collection(db, `${orgId}_visitors`), data)
    await console.log('add Lead value is ', x, x.id, data)
    const {
      intype,
      Name,
      Mobile,
      countryCode,
      assignedTo,
      Event,
      assignedToObj,
    } = data

    const { data3, errorx } = await supabase
      .from(`${orgId}_stall_visitors_logs`)
      .insert([
        {
          type: 'l_ctd',
          subtype: intype,
          T: Timestamp.now().toMillis(),
          Luid: x?.id || '',
          by,
          payload: {},
        },
      ])
    if (Event) {
      // await sendWhatAppTextSms1(
      //   '7760959579',
      //   `Warm Greetings!
      // Thanks for your interest in ${Event},
      // It's a pleasure to be a part of your housing journey. Our team will be in touch with you in a brief period. In the meanwhile, this would help you get to know the project a little more.
      // Warm Regards
      // Maa Homes.`
      // )
    }
    if (assignedTo) {
      const { offPh, name } = assignedToObj
      await sendWhatAppTextSms1(
        offPh,
        `⚡ A new lead- ${Name} Assigned to you @${Event || ''}. 📱${Mobile}`
      )

      // await sendWhatAppTextSms1(
      //   '7760959579',
      //   `Greetings from MAA Homes, I am ${name}

      // This is ${name} from Maa Homes,

      //   Regarding your interest in ${Event}, I’m pleased to be your point of contact throughout this journey. I would like to understand your requirements & do let me know if you have any doubts about ${Event}.
      //   Looking forward to a fruitful relationship.

      // Warm Regards
      // ${name}
      // Maa Homes`
      // )
    }
    await console.log('what is this supbase', data3, errorx)
    // await addLeadLog(orgId, x.id, {
    //   s: 's',
    //   type: 'status',
    //   subtype: 'added',
    //   T: Timestamp.now().toMillis(),
    //   txt: msg,
    //   by,
    // })

    // add task to scheduler to Intro call in 3 hrs

    const data1 = {
      by: by,
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Get into Introduction Call with customer',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }

    const x1 = []

    x1.push('pending')

    await addLeadScheduler(orgId, x.id, data1, x1, data.assignedTo)
    return x
  } catch (error) {
    console.log('error in uploading file with data', data, error)
  }
}
// This function is used to add leads for cp
export const addCpLead = async (orgId, data, by, msg) => {
  const x = await addDoc(collection(db, `${orgId}_leads_cp`), data)
  await console.log('add Lead value is ', x, x.id, data)
  const { intype, Name, Mobile, assignedTo, Event, assignedToObj } = data
  const { data3, errorx } = await supabase.from(`${orgId}_lead_logs`).insert([
    {
      type: 'l_ctd',
      subtype: intype,
      T: Timestamp.now().toMillis(),
      Luid: x?.id || '',
      by,
      payload: {},
    },
  ])
  if (assignedTo) {
    const { offPh } = assignedToObj
    await sendWhatAppTextSms1(
      offPh,
      `⚡ A new lead- ${Name} Assigned to you @${Event}. 📱${Mobile}`
    )
  }
  await console.log('what is this supbase', data3, errorx)
  // await addLeadLog(orgId, x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  // const data1 = {
  //   by: by,
  //   type: 'schedule',
  //   pri: 'priority 1',
  //   notes: 'Get into Introduction Call with customer',
  //   sts: 'pending',
  //   schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
  //   ct: Timestamp.now().toMillis(),
  // }

  // const x1 = []

  // x1.push('pending')

  // await addLeadScheduler(orgId, x.id, data1, x1, data.assignedTo)
  return
}

export const addCustomer = async (
  orgId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  const did = uuidv4()
  data.id = did

  await setDoc(doc(db, `${orgId}_company`, did), data)

  enqueueSnackbar('Customer Details added successfully', {
    variant: 'success',
  })
  resetForm()
  return
}

export const addStall = async (orgId, data, by, msg) => {
  const {
    pId,
    phaseId,
    blockId,
    unit_no,
    survey_no,
    Katha_no,
    PID_no,
    area,
    sqft_rate,
    plc_per_sqft,
    size,
    facing,
    east_d,
    west_d,
    north_d,
    south_d,
    east_west_d,
    north_south_d,

    east_sch_by,
    west_sch_by,
    status,
    release_status,
    mortgage_type,
  } = data

  // get the cost sheet charges obj & successully create total unit cost
  const assetVal = area * sqft_rate + (area * plc_per_sqft || 0)

  data.status = status?.toLowerCase() || 'available'
  const statusVal = status?.toLowerCase() || ''
  console.log('status is ==> ', status)
  const yo = {
    totalUnitCount: increment(1),
    bookUnitCount: ['booked'].includes(statusVal) ? increment(1) : increment(0),
    atsCount: ['ats_pipeline'].includes(statusVal)
      ? increment(1)
      : increment(0),
    s_agreeCount: ['agreement_pipeline'].includes(statusVal)
      ? increment(1)
      : increment(0),
    s_regisCount: ['registered_pipeline'].includes(statusVal)
      ? increment(1)
      : increment(0),
    availableCount: statusVal === 'available' ? increment(1) : increment(0),
    custBlockCount:
      statusVal === 'customer_blocked' ? increment(1) : increment(0),
    mangBlockCount:
      statusVal === 'management_blocked' ? increment(1) : increment(0),
    soldUnitCount: [
      'sold',
      'ats_pipeline',
      'agreement_pipeline',
      'booked',
    ].includes(statusVal)
      ? increment(1)
      : increment(0),
    blockedUnitCount: ['customer_blocked', 'management_blocked'].includes(
      statusVal
    )
      ? increment(1)
      : increment(0),
    // totalValue: increment(assetVal),
    soldValue: [
      'sold',
      'ats_pipeline',
      'agreement_pipeline',
      'booked',
    ].includes(statusVal)
      ? increment(assetVal)
      : increment(0),
    custBlockValue: ['customer_blocked'].includes(statusVal)
      ? increment(assetVal)
      : increment(0),
    mangBlockValue: ['management_blocked'].includes(statusVal)
      ? increment(assetVal)
      : increment(0),
    blockedValue: ['customer_blocked', 'management_blocked'].includes(statusVal)
      ? increment(assetVal)
      : increment(0),
    // totalEstPlotVal: increment(assetVal),
    // totalArea: increment(area),
    soldArea: ['sold', 'ats_pipeline', 'agreement_pipeline', 'booked'].includes(
      statusVal
    )
      ? increment(area)
      : increment(0),
    custBlockArea: ['customer_blocked'].includes(statusVal)
      ? increment(area)
      : increment(0),
    mangBlockArea: ['management_blocked'].includes(statusVal)
      ? increment(area)
      : increment(0),
    blockedArea: ['customer_blocked', 'management_blocked'].includes(statusVal)
      ? increment(area)
      : increment(0),
    // totalPlotArea: increment(area),
  }
  console.log('yo', yo, statusVal === 'available', data)

  const x = await addDoc(collection(db, `${orgId}_stalls`), data)
  const y = await updateProjectComputedData(orgId, pId, yo)

  return
  // await addLeadLog(x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  addUnitComputedValues(
    `${orgId}_events`,
    pId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'phases',
    phaseId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'blocks',
    blockId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  // add data to bank account
  // 1) get bank account id of project
  // 2) convert owner name to something friendly

  // 1) get bank account id of project
  // builderbankId
  addUnitBankComputed(
    orgId,
    `${orgId}_BankDetails`,
    builderbankId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  // 2) convert owner name to something friendly
  const owner_docId = owner_name
    ?.replace(/[^A-Za-z\s!?]/g, '')
    .replaceAll(' ', '')
    .toLocaleLowerCase()

  addUnitBankComputed(
    orgId,
    `${orgId}_VirtualAccounts`,
    owner_docId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  return
}
export const editPlotUnit = async (
  orgId,
  uid,
  data,
  by,
  msg,
  enqueueSnackbar
) => {
  const {
    pId,
    phaseId,
    blockId,
    unit_no,
    survey_no,
    Katha_no,
    PID_no,
    area,
    sqft_rate,
    plc_per_sqft,
    size,
    facing,
    east_d,
    west_d,
    north_d,
    south_d,
    east_west_d,
    north_south_d,

    east_sch_by,
    west_sch_by,
    status,

    release_status,
    mortgage_type,
  } = data

  // get the cost sheet charges obj & successully create total unit cost
  const assetVal = area * sqft_rate + (area * plc_per_sqft || 0)
  // const yo = {

  //   availableCount: status === 'available' ? increment(1) : increment(0),
  //   soldUnitCount: status === 'sold' ? increment(1) : increment(0),
  //   blockedUnitCount: ['customer_blocked', 'management_blocked'].includes(
  //     status
  //   )
  //     ? increment(1)
  //     : increment(0),
  //   totalValue: increment(assetVal),
  //   soldValue: status === 'sold' ? increment(assetVal) : increment(0),
  //   blockedValue: ['customer_blocked', 'management_blocked'].includes(status)
  //     ? increment(assetVal)
  //     : increment(0),
  //   totalEstPlotVal: increment(assetVal),
  //   totalArea: increment(area),
  //   soldArea: status === 'sold' ? increment(area) : increment(0),
  //   blockedArea: ['customer_blocked', 'management_blocked'].includes(status)
  //     ? increment(area)
  //     : increment(0),
  //   totalPlotArea: increment(area),
  // }
  try {
    await updateDoc(doc(db, `${orgId}_stalls`, uid), {
      ...data,
    })
    enqueueSnackbar('Updated successfully', {
      variant: 'success',
    })
  } catch (error) {
    enqueueSnackbar('Updation Failed', {
      variant: 'success',
    })
  }

  // const y = await updateProjectComputedData(orgId, pId, yo)

  return
  // await addLeadLog(x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  addUnitComputedValues(
    `${orgId}_events`,
    pId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'phases',
    phaseId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'blocks',
    blockId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  // add data to bank account
  // 1) get bank account id of project
  // 2) convert owner name to something friendly

  // 1) get bank account id of project
  // builderbankId
  addUnitBankComputed(
    orgId,
    `${orgId}_BankDetails`,
    builderbankId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  // 2) convert owner name to something friendly
  const owner_docId = owner_name
    ?.replace(/[^A-Za-z\s!?]/g, '')
    .replaceAll(' ', '')
    .toLocaleLowerCase()

  addUnitBankComputed(
    orgId,
    `${orgId}_VirtualAccounts`,
    owner_docId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  return
}
export const gretProjectionSum = async (orgId, data) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  const { pId, monthNo, currentYear } = data
  console.log('pushed values are', pId)
  const q = await query(
    collection(db, `${orgId}_payment_projections`),
    where('pId', '==', pId),
    // where('pId', '==', '02dce2f6-f056-4dcb-9819-01b9710781e1'), //
    where('month', '==', monthNo)
    // where('year', '==', currentYear)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + x.receivable
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const greProjectBookingsSum = async (orgId, data) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  const { pId, startTime, endTime } = data
  console.log('pushed values are', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('ProjectId', '==', pId),
    where('Status', '==', 'booked'),
    // where('pId', '==', '02dce2f6-f056-4dcb-9819-01b9710781e1'), //

    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)

    // where('year', '==', currentYear)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + 1
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const getSourceBookingsSum = async (orgId, data) => {
  const { pId, startTime, endTime } = data
  console.log('check it ==>', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('Source', '==', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + 1
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const getEmpBookingsSum = async (orgId, data) => {
  const { pId, startTime, endTime } = data
  console.log('check it ==>', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('assignedTo', '==', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + 1
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const getAllProjectMonthlyBookingsSum = async (orgId, data) => {
  const { pId, startTime, endTime } = data
  console.log('pushed values are', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),

    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
    // where('year', '==', currentYear)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength ==<  @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + 1
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}

export const streamBookedLeads = async (orgId, data, snapshot, error) => {
  const { pId, startTime, endTime } = data
  console.log('pushed values are', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('ProjectId', '==', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
    // where('year', '==', currentYear)
  )

  return onSnapshot(q, snapshot, error)
}
export const streamSourceBookedLeads = async (orgId, data, snapshot, error) => {
  const { pId, startTime, endTime } = data
  console.log('pushed values are', pId, data)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('Source', 'in', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
    // where('year', '==', currentYear)
  )

  return onSnapshot(q, snapshot, error)
}

export const streamEmpBookedLeads = async (orgId, data, snapshot, error) => {
  const { pId, startTime, endTime } = data
  console.log('pushed values are', pId, data)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('assignedTo', '==', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
    // where('year', '==', currentYear)
  )

  return onSnapshot(q, snapshot, error)
}

export const sourceBookedLeads = async (orgId, data, snapshot, error) => {
  const { pId, SourceA, startTime, endTime } = data
  console.log('pushed values are', data)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('Source', '==', SourceA),
    // where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
    // where('year', '==', currentYear)
  )

  return onSnapshot(q, snapshot, error)
}

export const getEmpCompletedTasks = async (orgId, data) => {
  const { pId, startTime, endTime } = data
  console.log('check it ==>', pId)
  const q = await query(
    collection(db, `${orgId}_leads`),
    where('assignedTo', '==', pId),
    where('Status', '==', 'booked'),
    where('stsUpT', '>=', startTime),
    where('stsUpT', '<=', endTime)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + 1
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const getEmpCollectionsSum = async (orgId, data) => {
  const { pId, monthNo, currentYear } = data
  console.log('pushed values are', pId)
  const q = await query(
    collection(db, `${orgId}_emp_collections`),
    where('uId', '==', pId),

    where('month', '==', monthNo)
    // where('year', '==', currentYear)
  )
  const parentDocs = []
  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  let receivable = 0
  querySnapshot.forEach((doc) => {
    const x = doc.data()
    console.log('dc', doc.id, ' => ', doc.data())
    receivable = receivable + x.receivable
    parentDocs.push(doc.data())
  })
  console.log('total is ', receivable)
  return receivable
}
export const editPlotStatusAuditUnit = async (
  orgId,
  uid,
  data,
  by,
  msg,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_stalls`, uid), {
      ...data,
    })
    enqueueSnackbar(`${msg}`, {
      variant: 'success',
    })
  } catch (error) {
    enqueueSnackbar('Plot details Updation Failed', {
      variant: 'success',
    })
  }
  return
}
export const addUnit = async (orgId, data, by, msg) => {
  const {
    pId,
    phaseId,
    blockId,
    builderbankId,
    owner_name,
    builtup_area,
    rate_per_sqft,
    plot_Sqf,
    plot_cost_sqf,
    super_built_up_area,
    construct_cost_sqf,
  } = data
  console.log(
    'loading data is ',
    builtup_area,
    rate_per_sqft,
    plot_Sqf,
    plot_cost_sqf,
    super_built_up_area,
    construct_cost_sqf,
    data
  )

  // get the cost sheet charges obj & successully create total unit cost

  const yo = {
    // totalEstValue: increment(plot_value + construct_value),
    // totalEstPlotVal: increment(plot_value),
    // totalEstConstuctVal: increment(construct_value),
    plotcost: 10,
    constCost: 10,
    plcCharges: 10,
    discount: 10,
    totalUnitCost: 100,
    legal: 10,
    clubhousecharges: 10,
    bescom_bwssb: 10,
    totalPlotArea: plot_Sqf,
    totalConstructArea: super_built_up_area,
    // totalArea: increment(area),
    totalUnitCount: 1,
    availableCount: 1,
  }

  console.log('uplaod unit val', yo)
  return

  const x = await addDoc(collection(db, `${orgId}_stalls`), data)
  await console.log('x value is', x, x.id)
  // await addLeadLog(x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  addUnitComputedValues(
    `${orgId}_events`,
    pId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'phases',
    phaseId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  addUnitComputedValues(
    'blocks',
    blockId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  // add data to bank account
  // 1) get bank account id of project
  // 2) convert owner name to something friendly

  // 1) get bank account id of project
  // builderbankId
  addUnitBankComputed(
    orgId,
    `${orgId}_BankDetails`,
    builderbankId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )
  // 2) convert owner name to something friendly
  const owner_docId = owner_name
    ?.replace(/[^A-Za-z\s!?]/g, '')
    .replaceAll(' ', '')
    .toLocaleLowerCase()

  addUnitBankComputed(
    orgId,
    `${orgId}_VirtualAccounts`,
    owner_docId,
    plot_Sqf || 0,
    super_built_up_area || 0,
    plot_Sqf * plot_cost_sqf || 0,
    super_built_up_area * construct_cost_sqf || 0,
    1
  )

  return
}
export const addBankAccount = async (
  orgId,
  data,
  by,
  msg,
  enqueueSnackbar,
  resetForm
) => {
  const x = await addDoc(collection(db, `${orgId}_BankDetails`), data)
  enqueueSnackbar('Account added successfully', {
    variant: 'success',
  })
  resetForm()
  return
}
export const addVirtualAccount = async (orgId, data, by, msg) => {
  await addDoc(collection(db, `${orgId}_VirtualAccounts`), data)
  return
}
export const addLeadNotes = async (orgId, id, data) => {
  const xo = data?.ct
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_notes`, id)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_leads_notes`, id), yo)
  }
}
export const upsertMasterOption = async (orgId, id, data, enqueueSnackbar) => {
  try {
    const washingtonRef = doc(db, `${orgId}_Masters`, id)

    await updateDoc(washingtonRef, data)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_Masters`, id), data)
  }
  enqueueSnackbar(`${data?.title} Updated successfully`, {
    variant: 'success',
  })
}
export const updateProjectComputedData = async (orgId, id, data) => {
  try {
    const washingtonRef = doc(db, `${orgId}_events`, id)
    console.log('check add LeadLog', washingtonRef, id)
    await updateDoc(washingtonRef, data)
  } catch (error) {
    console.log('error in updation', error)
    // await setDoc(doc(db, `${orgId}_leads_notes`, id), yo)
  }
}
export const updateLeadLakeStatus = async (orgId, id, data) => {
  console.log('what is this', data)
  const { status, by } = data
  const yo = {
    currentStatus: status,
    mT: Timestamp.now().toMillis(),
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_lake`, id)
    console.log('check add LeadLog', id, washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    console.log('check add LeadLog', error, id)
  }
}

export const addUserLog = (orgId, data) => {
  // type    === addUser || updateUserRole || deleteUser
  // subtype === addUser
  // subType === RoleAdd || RoleRemoved
  // subType === deleteUser
  data.time = Timestamp.now().toMillis()
  addDoc(collection(db, `${orgId}_user_log`), data)
}
export const addProjectLog = (orgId, data) => {
  // type    === addUser || updateUserRole || deleteUser
  // subtype === addUser
  // subType === RoleAdd || RoleRemoved
  // subType === deleteUser
  data.time = Timestamp.now().toMillis()
  addDoc(collection(db, `${orgId}_project_log`), data)
}

export const addLeadLog = async (orgId, did, data) => {
  const xo = Timestamp.now().toMillis()
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_log`, did)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_leads_log`, did), yo)
  }

  console.log('am at addLeadLog ')
}

export const addLeadScheduler = async (
  orgId,
  did,
  data,
  schStsA,
  assignedTo
) => {
  const xo = data?.ct
  const yo = {
    staA: schStsA,
    staDA: arrayUnion(xo),
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_sch`, did)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    const y1 = { ...yo }
    yo.assignedTo = assignedTo || ''
    console.log('new log set', yo)
    await setDoc(doc(db, `${orgId}_leads_sch`, did), yo)
  }

  console.log('am at addLeadLog ')
}
export const addModuleScheduler = async (
  tabName,
  did,
  data,
  schStsA,
  assignedTo
) => {
  const xo = data?.ct
  const yo = {
    staA: schStsA,
    staDA: arrayUnion(xo),
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${tabName}`, did)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    const y1 = { ...yo }
    yo.assignedTo = assignedTo || ''
    console.log('new log set', yo)
    await setDoc(doc(db, `${tabName}`, did), yo)
  }

  console.log('am at addLeadLog ')
}

export const addSchedulerLog = async (orgId, did, data) => {
  const xo = Timestamp.now().toMillis()
  data.time = Timestamp.now().toMillis()
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_schedules_log`, did)
    console.log('check add LeadLog', washingtonRef)
    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_schedules_log`, did), yo)
  }
  console.log('am at addLeadLog ')
}

export const createProject = async (
  orgId,
  uid,
  element,
  enqueueSnackbar,
  resetForm
) => {
  try {
    const updated = {
      ...element,
      uid,
      status: 'ongoing',
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, `${orgId}_events`, uid)
    await setDoc(ref, updated, { merge: true })

    enqueueSnackbar('Event added successfully', {
      variant: 'success',
    })
    // resetForm()
  } catch (e) {
    console.log('error is', e, element)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createPhase = async (element, enqueueSnackbar, resetForm) => {
  try {
    const uid = uuidv4()
    const { orgId } = element
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, `${orgId}_phases`, uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Phase added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createBlock = async (element, enqueueSnackbar, resetForm) => {
  console.log('it is ', element)
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'blocks', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Block added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPaymentReceivedEntrySup = async (
  orgId,
  unitDocId,
  customerDetails,
  paymentDetails,
  createdByDept,
  by,
  enqueueSnackbar
) => {
  const logPayload = {
    id: '',
    particular: '',
    date: '',
    amount: '',
    to: '',
    toUidnvoiceNo: '',
    fromName: '',
    fromUi: '',
    mode: '',
    status: '', // review
    dated: '',
    appliedTo: '',
    receivedBy: '',
    receivedByUid: '',
  }
  console.log('Check', logPayload)
  try {
    const updated = {
      ...customerDetails,
      ...paymentDetails,
      createdByDept,
      status: 'review',
      against: 'unit',
      unitId: unitDocId,
      created: Timestamp.now().toMillis(),
    }
    // const ref = doc(db, `${orgId}_fincance', unitDocId)
    // const { data, error } = await supabase.from(`${orgId}_accounts`).insert([
    //   {
    //     projectId,
    //     unit_id: unitId,
    //     towards: builderName,
    //     towards_id: towardsBankDocId,
    //     mode,
    //     custId: custNo,
    //     customerName: Name,
    //     receive_by: paylaod?.bookedBy,
    //     txt_dated: dated, // modify this to dated time entred by user
    //     status: paylaod?.status || 'review',
    //     payReason: paylaod?.payReason,
    //     totalAmount: amount,
    //     bank_ref: bank_ref_no,
    //   },
    // ])
    const x = await addDoc(collection(db, `${orgId}_fincance`), updated)
    // const { data: data4, error: error4 } = await supabase
    // .from(`${orgId}_unit_logs`)
    // .insert([
    //   {
    //     type: 'accounts',
    //     subtype: 'pay_capture',
    //     T: Timestamp.now().toMillis(),
    //     Uuid: unitDocId,
    //     by,
    //     payload: { receivedBy: by, amount: amount, mode, bank_ref_no },
    //     from: 'capture',
    //     to: 'review',
    //   },
    // ])
    enqueueSnackbar('Payment Captured..!', {
      variant: 'success',
    })
    return x.id
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPaymentReceivedEntry = async (
  orgId,
  unitDocId,
  customerDetails,
  paymentDetails,
  createdByDept,
  by,
  enqueueSnackbar
) => {
  const logPayload = {
    id: '',
    particular: '',
    date: '',
    amount: '',
    to: '',
    toUidnvoiceNo: '',
    fromName: '',
    fromUi: '',
    mode: '',
    status: '', // review
    dated: '',
    appliedTo: '',
    receivedBy: '',
    receivedByUid: '',
  }
  const updated = {
    ...customerDetails,
    ...paymentDetails,
    createdByDept,
    status: 'review',
    against: 'unit',
    unitId: unitDocId,
    created: Timestamp.now().toMillis(),
  }
  console.log('Check', logPayload)
  try {
    // const ref = doc(db, `${orgId}_fincance', unitDocId)
    console.log('payment capture failed', updated)

    const x = await addDoc(collection(db, `${orgId}_fincance`), updated)

    enqueueSnackbar('Payment Captured..!', {
      variant: 'success',
    })
    return x.id
  } catch (e) {
    console.log('payment capture failed', e, updated)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const createBookedCompany = async (
  orgId,
  unitDocId,
  element,
  by,
  enqueueSnackbar
) => {
  console.log('unite data is', unitDocId, element)
  try {
    const updated = {
      ...element,
      T_total: increment(element?.T_total || 0),
      T_paid: increment(element?.T_paid || 0),
      T_balance: increment(element?.T_balance || 0),
      uid: unitDocId,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, `${orgId}_company`, unitDocId)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Company added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createPaymentSheduleComp = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'paymentSchedule', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Payment added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createAdditonalCharges = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'additionalCharges', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const createAttach = async (orgId, url, by, name, cUid, type) => {
  try {
    const docRef = await addDoc(collection(db, `${orgId}_leads_docs`), {
      name,
      url,
      by,
      cUid,
      type,
      cTime: Timestamp.now().toMillis(),
    })
    return docRef
  } catch (error) {
    console.log('error in db', error)
  }
}
export const createPhaseAssets = async (
  orgId,
  url,
  by,
  name,
  pId,
  phaseId,
  type,
  format
) => {
  try {
    console.log('docs detals are', pId, phaseId)
    const docRef = await addDoc(collection(db, `${orgId}_project_docs`), {
      name,
      url,
      by,
      pId,
      phaseId: phaseId || 0,
      type,
      format,
      cTime: Timestamp.now().toMillis(),
    })
    return docRef
  } catch (error) {
    console.log('uploaded file url i s', url)
    console.log('error in db', error, url, pId)
  }
}
export const createUserToWorkReport = async (tableName, data) => {
  try {
    const { uid } = data
    const updated = {
      ...data,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, tableName, uid)
    await setDoc(ref, updated, { merge: true })
    return uid
  } catch (e) {
    return e
  }
}
export const createUserToAttendance = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'additionalCharges', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
// **********************************************
// updateF PLsiSl3rnbYxyBxis4r0f5MpX0u1
// **********************************************
export const updateUserRole = async (
  empId,
  orgName,
  orgId,
  uid,
  dept,
  role,
  email,
  offPh,
  perPh,
  userStatus,
  by
) => {
  await updateDoc(doc(db, 'users', uid), {
    empId: empId || 101,
    orgName: orgName,
    orgId: orgId,
    department: [dept],
    roles: [role],
    offPh: offPh || '',
    perPh: perPh || '',
    userStatus: userStatus,
  })
  return await addUserLog(orgId, {
    s: 's',
    type: 'updateRole',
    subtype: 'updateRole',
    txt: `${email} is updated with ${role}`,
    by,
  })
}
export const updateUserAvatar = async (orgId, uid, email, avatarUrl, by) => {
  await updateDoc(doc(db, 'users', uid), {
    avatarUrl: avatarUrl,
  })
  return await addUserLog(orgId, {
    s: 's',
    type: 'updateAvatar',
    subtype: 'updateAvatar',
    txt: `${email} is updated with avatar`,
    by,
  })
}
export const updateUserAccessProject = async (
  orgId,
  uid,
  data,
  eventName,
  email,
  by,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
    })
    enqueueSnackbar(`Access Provided to ${email}`, {
      variant: 'success',
    })
    return await addUserLog(orgId, {
      s: 's',
      type: 'updateRole',
      subtype: 'updateRole',
      txt: `${email} is updated with project ${eventName}`,
      by,
    })
  } catch (error) {
    console.log('error at ', error, data)
    enqueueSnackbar(`Failed ${error}`, {
      variant: 'warning',
    })
  }
}

export const updateAccessRoles = async (
  orgId,
  role,
  accessRoles,
  currentUser,
  enqueueSnackbar,
  currentPage
) => {
  // data.forEach(async (d) => {
  //   await updateDoc(doc(db, `${orgId}_roles_access', d.uid), d)
  // })
  try {
    await updateDoc(doc(db, `${orgId}_roles_access`, role.uid), {
      access: accessRoles,
    })
    await addUserLog(orgId, {
      s: 's',
      type: 'updateRoleAccess',
      subtype: 'updateAccessForPages',
      txt: `${currentUser.email} is updated the user access roles`,
      by: currentUser.email,
    })
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(
      `User roles for ${role.type} & ${currentPage.name} updated successfully`,
      {
        variant: 'success',
      }
    )
  } catch (e) {
    return enqueueSnackbar(e.message, { variant: 'error' })
  }
}
export const addNewSourceComp = async (
  orgId,
  sourcePayload,
  enqueueSnackbar
) => {
  const uuxid = uuidv4()

  sourcePayload.myId = uuxid
  sourcePayload.rep = [sourcePayload.value]
  try {
    await setDoc(doc(db, `${orgId}_LeadSources`, uuxid), { ...sourcePayload })
    enqueueSnackbar('New Source added ...!', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is source addition', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPhaseAdditionalCharges = async (
  orgId,
  uid,
  chargePayload,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  const uuxid = uuidv4()
  usersUpdate[uuxid] = chargePayload
  chargePayload.myId = uuxid
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: arrayUnion(chargePayload),
    })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPhasePartAtax = async (
  orgId,
  uid,
  chargePayload,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  const uuxid = uuidv4()
  usersUpdate[uuxid] = chargePayload
  chargePayload.myId = uuxid
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: arrayUnion(chargePayload),
    })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPhaseFullCs = async (
  orgId,
  uid,
  fullCsA,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      partATaxObj:
        fullCsA?.filter((item) =>
          ['unitCost', 'unitCostNew'].includes(item?.section?.value)
        ) || [],
      partCTaxObj:
        fullCsA?.filter((item) => item?.section?.value == 'otherCharges') || [],
      additonalChargesObj:
        fullCsA?.filter((item) => item?.section?.value == 'additionalCost') ||
        [],
      constructOtherChargesObj:
        fullCsA?.filter(
          (item) => item?.section?.value == 'constadditionalCost'
        ) || [],
      fullCs: fullCsA,
    })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addMastersFull = async (orgId, uid, data, enqueueSnackbar) => {
  // return
  try {
    await setDoc(doc(db, `${orgId}_Masters`, uid), data)
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateCampaign = async (orgId, uid, payload, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, `${orgId}_campaigns`, uid), {
      ...payload,
    })

    enqueueSnackbar('Campaign Edited successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e, payload, uid)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateLeadSourcesItem = async (
  orgId,
  uid,
  payload,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_LeadSources`, uid), {
      ...payload,
    })

    enqueueSnackbar('Source Edited successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updatePhaseAdditionalCharges = async (
  orgId,
  uid,
  chargePayloadA,
  type,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayloadA,
    })
    enqueueSnackbar('Charges updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updatePhasePartACharges = async (
  orgId,
  uid,
  chargePayloadA,
  type,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayloadA,
    })

    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPhasePaymentScheduleCharges = async (
  orgId,
  uid,
  chargePayload,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  console.log('paymentSchedule is ', uid, chargePayload, type, enqueueSnackbar)
  const uuxid = uuidv4()
  usersUpdate[uuxid] = chargePayload
  chargePayload.myId = uuxid
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayload,
    })
    enqueueSnackbar('Schedule added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e, chargePayload, uid)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updatePaymentScheduleCharges = async (
  orgId,
  uid,
  chargePayloadA,
  type,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayloadA,
    })

    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e, orgId, uid, chargePayloadA, type)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateProject = async (
  orgId,
  uid,
  project,
  existingBuildBankId,
  existingLandBankId,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_events`, uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    const {
      eventName,
      builderBankDocId,
      landlordBankDocId,
      landlordShare,
      builderShare,
    } = project
    console.log('my master setup Is', {
      eventName,
      builderBankDocId,
      landlordBankDocId,
      landlordShare,
      builderShare,
    })
    if (builderBankDocId != existingBuildBankId) {
      await removeProjectInBankEntry(orgId, existingBuildBankId, uid, eventName)
      await updateBankEntry(
        orgId,
        builderBankDocId,
        uid,
        eventName,
        builderShare
      )
    }
    if (landlordBankDocId != existingLandBankId) {
      await removeProjectInBankEntry(orgId, existingLandBankId, uid, eventName)
      await updateBankEntry(
        orgId,
        landlordBankDocId,
        uid,
        eventName,
        landlordShare
      )
    }

    enqueueSnackbar('Event updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateBankEntry = async (
  orgId,
  newBankDocId,
  pId,
  eventName,
  share
) => {
  try {
    await updateDoc(doc(db, `${orgId}_BankDetails`, newBankDocId), {
      usedIn: increment(1),
      usedInA: arrayUnion({ pId: pId, pName: eventName, share: share }),
      updated: Timestamp.now().toMillis(),
    })
  } catch (e) {
    console.log('updateBankEntry error', e)
  }
}
export const removeProjectInBankEntry = async (
  orgId,
  oldbankDocId,
  pId,
  eventName
) => {
  try {
    if (oldbankDocId === '') return
    // get the exisiting usedInA from old docId and filter the matched project Id
    console.log('oldbankDocId', oldbankDocId)
    const getBankProfile = doc(db, `${orgId}_BankDetails`, oldbankDocId)
    // let records
    // const docSnap1 = await await getDoc(getBankProfile)
    // if (docSnap1.exists()) {
    //   records = docSnap1.data()
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!')
    //   return null
    // }
    // const { usedInA } = records
    // try {
    //   const removedUsedinA = usedInA?.filter((item) => item.pId != pId)

    //   await updateDoc(doc(db, `${orgId}_BankDetails`, oldbankDocId), {
    //     usedIn: increment(-1),
    //     usedInA: removedUsedinA,
    //     updated: Timestamp.now().toMillis(),
    //   })
    // } catch (error) {
    //   console.log('error1 ', error, usedInA, pId)
    // }
  } catch (e) {
    console.log('updateBankEntry error', e, oldbankDocId)
  }
}
export const updatePhase = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'phases', uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar('Phase updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateBlock = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(
      doc(db, 'blocks', uid),
      {
        ...project,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Block updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateBlock_AddFloor = async (uid, floorName, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'blocks', uid), {
      floorA: arrayUnion(floorName),
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar(`Floor ${floorName} added updated successfully`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateLeadAssigTo = async (
  orgId,
  projectId,
  leadDocId,
  assignedTo,
  oldOwnerId,
  newStatus,
  leadDetailsObj,
  todayTasksIncre,
  txt,
  by
) => {
  const { value, offPh } = assignedTo
  const { Name, Email, Mobile, Status } = leadDetailsObj
  const newSt = newStatus == 'unassigned' || newStatus == '' ? 'new' : newStatus
  console.log(
    'inside updater ',
    assignedTo,
    {
      leadDocId,
      assignedTo: value,
      assignedToObj: assignedTo,
      AssignedBy: by,
      assignT: Timestamp.now().toMillis(),
    },
    {
      assignedTo: value,
      assignedToObj: assignedTo,
      AssignedBy: by,
      assignT: Timestamp.now().toMillis(),
      Status: newSt,
    }
  )

  await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
    assignedTo: value,
    assignedToObj: assignedTo,
    AssignedBy: by,
    assignT: Timestamp.now().toMillis(),
    Status: newSt,
  })
  await updateDoc(doc(db, `${orgId}_leads_sch`, leadDocId), {
    assignedTo: value,
  })

  const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
    {
      type: 'assign_change',
      subtype: oldOwnerId,
      T: Timestamp.now().toMillis(),
      Luid: leadDocId,
      by,
      payload: {},
      from: oldOwnerId,
      to: value,
      projectId: projectId,
    },
  ])
  if (newSt != '') {
    try {
      const todaydate = new Date()

      const ddMy =
        'D' +
        todaydate.getDate() +
        'M' +
        todaydate.getMonth() +
        'Y' +
        todaydate.getFullYear()

      await updateDoc(
        doc(db, `${orgId}_emp_performance`, `${value}DD${ddMy}`),
        {
          [newSt]: increment(todayTasksIncre),
          all: increment(todayTasksIncre),
          recA: arrayUnion({ tx: txt, T: Timestamp.now().toMillis() }),
        }
      )
      await updateDoc(
        doc(db, `${orgId}_emp_performance`, `${oldOwnerId}DD${ddMy}`),
        {
          [newSt]: increment(-todayTasksIncre),
          all: increment(-todayTasksIncre),
        }
      )
    } catch (error) {
      console.log('erro in emp performance LeadAssignTo')
    }
  }

  await sendWhatAppTextSms1(
    offPh,
    `⚡ A new lead- ${Name} Assigned to you. 📱${Mobile}`
  )

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}

export const IncrementTastCompletedCount = async (
  orgId,
  userId,
  ddMy,
  newSt,
  todayTasksIncre,
  txt
) => {
  console.log('IncrementTastCompletedCount')
  try {
    await updateDoc(doc(db, `${orgId}_emp_performance`, `${userId}DD${ddMy}`), {
      [newSt]: increment(todayTasksIncre),
      all_comp: increment(todayTasksIncre),
      recA: arrayUnion({ tx: txt, T: Timestamp.now().toMillis() }),
    })
  } catch (error) {
    console.log('erro in emp performance + complted Count')
  }
}
export const IncrementTastTotalCount = async (
  orgId,
  userId,
  ddMy,
  newSt,
  todayTasksIncre,
  txt
) => {
  // this is used when new task is created for the same day
  console.log('IncrementTastTotalCount')
  try {
    await updateDoc(doc(db, `${orgId}_emp_performance`, `${userId}DD${ddMy}`), {
      [newSt]: increment(todayTasksIncre),
      all: increment(todayTasksIncre),
      recA: arrayUnion({ tx: txt, T: Timestamp.now().toMillis() }),
    })
  } catch (error) {
    console.log('erro in emp performance Upate')
  }
}
export const decreCountOnResheduleOtherDay = async (
  orgId,
  userId,
  ddMy,
  newSt,
  todayTasksIncre,
  txt
) => {
  try {
    await updateDoc(doc(db, `${orgId}_emp_performance`, `${userId}DD${ddMy}`), {
      [newSt]: increment(-todayTasksIncre),
      all: increment(-todayTasksIncre),
      recA: arrayUnion({ tx: txt, T: Timestamp.now().toMillis() }),
    })
  } catch (error) {
    console.log('erro in emp performance Upate decre')
  }
}
export const createNewCustomerS = async (
  orgId,
  projectId,
  unitId,
  leadDetailsObj2,
  customerInfo,
  oldStatus,
  newStatus,
  by,
  enqueueSnackbar
) => {
  try {
    const leadDocId = leadDetailsObj2.id || ''
    const { Name } = leadDetailsObj2

    console.log('wow it should be here', leadDocId, newStatus, Name)

    const { data, error } = await supabase.from(`${orgId}_company`).insert([
      {
        Name:
          leadDetailsObj2?.Name ||
          customerInfo?.customerDetailsObj?.customerName1,
        // id: leadDocId,
        my_assets: [unitId],
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        added_by: by,
        projects: [projectId],
      },
    ])
    // const customerD =     {
    //   Name:
    //     leadDetailsObj2?.Name || customerInfo?.customerDetailsObj?.customerName1,
    //   my_assets: [unitId],
    //   T: Timestamp.now().toMillis(),
    //   Luid: leadDocId,
    //   added_by: by,
    //   projects: [projectId],
    //   input_money: 0,
    //   kyc_status:false,
    //   remaining_money: 0,
    //   utilized_money: 0
    // }
    // addCustomer(orgId, customerD, by, enqueueSnackbar, ()=>({}))

    await console.log('customer data is ', data, error, customerInfo, {
      Name: Name,
      // id: leadDocId,
      my_assets: [unitId],
      T: Timestamp.now().toMillis(),
      Luid: leadDocId,
      added_by: by,
      projects: [projectId],
    })
    return data

    return
    // await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
    //   Status: newStatus,
    //   coveredA: arrayUnion(oldStatus),
    //   stsUpT: Timestamp.now().toMillis(),
    //   leadUpT: Timestamp.now().toMillis(),
    // })

    // const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
    //   {
    //     type: 'sts_change',
    //     subtype: oldStatus,
    //     T: Timestamp.now().toMillis(),
    //     Luid: leadDocId,
    //     by,
    //     payload: {},
    //     from: oldStatus,
    //     to: newStatus,
    //     projectId: projectId,
    //   },
    // ])

    console.log('chek if ther is any erro in supa', data1, error1)
    enqueueSnackbar(`Status Updated to ${newStatus}`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const insertPSS = async (
  orgId,
  projectId,
  unitId,
  leadDetailsObj2,
  paylaod,
  by,
  enqueueSnackbar
) => {
  try {
    const leadDocId = leadDetailsObj2.id
    const { Name } = leadDetailsObj2
    const {
      description,
      elgFrom,
      elgible,
      percentage,
      stage,
      value,
      zeroDay,
      order,
    } = paylaod

    const { datax, errorx } = await supabase.from(`${orgId}_ps_list`).insert([
      {
        projectId,
        unitId,
        status: 'wait',
        payment_status: 'NA',
        description,
        elgFrom,
        elgible,
        percentage,
        stage,
        value,
        zeroDay,
        order,
      },
    ])
    enqueueSnackbar(`Insert Ps`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const unitAuditDbFun = async (
  orgId,
  projectId,
  unitId,
  totalUnitCost,
  totalElgible,
  totalReceivedAmount,
  InReviewAmount,
  totalApprovedAmount,
  totalCancelledAmount
) => {
  await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
    T_total: totalUnitCost,
    T_elgible: totalElgible,
    T_elgible_balance:
      totalElgible - ((InReviewAmount || 0) + (totalApprovedAmount || 0)),
    T_received: totalReceivedAmount,
    T_review: InReviewAmount,
    T_approved: totalApprovedAmount || 0,
    T_cancelled: totalCancelledAmount || 0,
    T_balance:
      totalUnitCost - ((InReviewAmount || 0) + (totalApprovedAmount || 0)),
  })
}

export const captureWalletPayment = async (
  orgId,
  selCustomerDetails,
  payload,
  by,
  enqueueSnackbar
) => {
  try {
    const leadDocId = selCustomerDetails.id
    const { Name } = selCustomerDetails
    const {
      amount,
      builderName,
      chequeno,
      dated,
      landloardBankDocId,
      mode,
      payto,
      towardsBankDocId,
      category,
      bank_ref_no,
    } = payload

    console.log('unit log', payload)
    const { data, error } = await supabase.from(`${orgId}_accounts`).insert([
      {
        projectId: 'wallet',
        unit_id: 'wallet',
        towards: builderName,
        towards_id: towardsBankDocId || '',
        mode,
        custId: leadDocId,
        customerName: Name || '',
        receive_by: payload?.bookedBy,
        txt_dated: dated, // modify this to dated time entred by user
        status: payload?.status || 'review',
        payReason: payload?.payReason,
        totalAmount: amount,
        bank_ref: bank_ref_no,
        attchUrl: payload?.fileUploader?.url || payload?.attchUrl || '',
      },
    ])
    const paymentCB = await addPaymentReceivedEntry(
      orgId,
      'wallet',
      { leadId: leadDocId },
      {
        projectId: 'wallet',
        unit_id: ['wallet'],
        towards: builderName,
        towards_id: towardsBankDocId || '',
        mode,
        custId: leadDocId,
        customerName: Name,
        receive_by: payload?.bookedBy,
        txt_dated: dated, // modify this to dated time entred by user
        status: payload?.status || 'review',
        payReason: payload?.payReason,
        totalAmount: amount,
        bank_ref: bank_ref_no,
      },
      'leadsPage',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )
    // total amount in review increment , project , phase, unit
    // await updateDoc(doc(db, `${orgId}_events`, projectId), {
    //   t_collect: increment(amount),
    // })
    // await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
    //   T_received: increment(amount),
    //   T_review: increment(amount),
    //   T_balance: increment(-amount),
    //   T_elgible_balance: increment(-amount),
    // })

    // if (mode === 'credit_note') {
    //   await updateDoc(doc(db, `users`, towardsBankDocId), {
    //     T_credit_note_review: increment(amount),
    //     T_credit_note_units: increment(1),
    //   })

    await updateDoc(doc(db, `${orgId}_company`, leadDocId), {
      input_money: increment(amount),
    })
    const { data: lead_logs, error: error2 } = await supabase
      .from(`${orgId}_company`)
      .update({ input_money: amount })
      .eq('id', leadDocId)

    const { data: data3, error: error3 } = await supabase
      .from(`${orgId}_customer_logs`)
      .insert([
        {
          type: 'pay_capture',
          subtype: 'wallet',
          T: Timestamp.now().toMillis(),
          custUid: leadDocId,
          by,
          payload: {},
        },
      ])

    enqueueSnackbar(`Captured Payment`, {
      variant: 'success',
    })
    return data
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const capturePaymentS = async (
  orgId,
  boolAgreegate,
  projectId,
  stallId,
  custNo,
  leadDetailsObj2,
  payload,
  by,
  enqueueSnackbar
) => {
  try {
    const amount = payload?.amount
    const paymentCB = await addPaymentReceivedEntry(
      orgId,
      stallId,
      { leadId: custNo },
      {
        projectId,
        stall_id: [stallId],
        // towards: builderName,
        // towards_id: towardsBankDocId,
        mode: payload?.mode,
        custId: custNo,
        customerName: payload?.customerName || '',
        receive_by: payload?.bookedBy || payload?.receive_by,
        date_of_entry: payload?.date_of_entry || payload?.dated,
        txt_dated: payload?.txt_dated || payload?.dated, // modify this to dated time entred by user
        status: payload?.status || 'review',
        payReason: payload?.payReason || '',
        totalAmount: payload?.totalAmount || payload?.amount,
        bank_ref: payload?.bank_ref || '',
      },
      'leadsPage',
      payload?.bookedBy || payload?.receive_by,
      enqueueSnackbar
    )
    // total amount in review increment , project , phase, unit
    if (boolAgreegate) {
      await updateDoc(doc(db, `${orgId}_events`, projectId), {
        t_collect: increment(amount),
      })
      await updateDoc(doc(db, `${orgId}_stalls`, stallId), {
        T_received: increment(amount),
        T_review: increment(amount),
        T_balance: increment(-amount),
        T_elgible_balance: increment(-amount),
      })
    }

    // const { data: data4, error: error4 } = await supabase
    //   .from(`${orgId}_stall_logs`)
    //   .insert([
    //     {
    //       type: 'accounts',
    //       subtype: 'pay_capture',
    //       T: Timestamp.now().toMillis(),
    //       Uuid: unitId,
    //       by,
    //       payload: { receivedBy: by, amount: amount, mode, bank_ref_no },
    //       from: 'review',
    //       to: 'review',
    //     },
    //   ])
    // console.log('unit log', data4, error4, data, error)
    // enqueueSnackbar(`Captured Payment`, {
    //   variant: 'success',
    // })
    // return data
  } catch (e) {
    console.log('error on transaction upload', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const addAccountslogS = async (
  orgId,
  projectId,
  unitId,
  leadDetailsObj2,
  paylaod,
  by,
  enqueueSnackbar
) => {
  try {
    const leadDocId = leadDetailsObj2.id
    const { Name } = leadDetailsObj2

    const { oldStatus, newStatus, amount, type, TransactionUid } = paylaod

    const { data, error } = await supabase
      .from(`${orgId}_account_logs`)
      .insert([
        {
          type,
          subtype: oldStatus,
          T: Timestamp.now().toMillis(),
          TransactionUid,
          by,
          payload: {},
          from: oldStatus,
          to: newStatus,
          unitId,
          amount: 10.0,
        },
      ])

    await console.log('data is ', data, error)
    enqueueSnackbar(`Captured Payment`, {
      variant: 'success',
    })

    return data
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateEventLogo = async (orgId, uid, avatarUrl, by) => {
  await updateDoc(doc(db, `${orgId}_projects`, uid), {
    eventLogoURL: avatarUrl,
  })
}

export const updateLeadCustomerDetailsTo = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is', leadDocId, data)

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    enqueueSnackbar('Customer Details added successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('customer details updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Customer Details updation failed BBB', {
      variant: 'error',
    })
  }

  return
}
export const updateUnitCustomerDetailsTo = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is', unitId, data)

    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      ...data,
    })
    enqueueSnackbar('Customer Details added successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('customer details updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Customer Details updation failed BBB', {
      variant: 'error',
    })
  }

  return
}
export const updateUnitStatus = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      fullPs: data?.fullPs,
      status: data?.status,
      T_elgible: data?.T_elgible_new,
      T_elgible_balance: data?.T_elgible_balance,
      [`${data?.status}_on`]: data[`${data?.status}_on`],
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'sts_change',
          subtype: 'sts_change',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'sts_change',
          to: data?.status,
        },
      ])
    enqueueSnackbar('Unit Status Updated', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Unit Status  updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Unit Status updation failed BBB', {
      variant: 'error',
    })
  }
  return
}
export const updateProjectionsAgreegationsOnBooking = async (
  orgId,
  data,
  by,
  enqueueSnackbar
) => {
  console.log('data is===>', data)
  const { oldDate, schDate, pId, newPrice } = data
  console.log('data is===>', oldDate, schDate)

  const x = getWeekMonthNo(schDate)
  const y = getWeekMonthNo(oldDate)
  console.log('value of schDate', x)
  const docId_d = `${pId}W${x.weekNumberOfYear}M${x.month}Y${x.year}s${data.stageId}`

  const payload = {
    pId: pId,
    block: 1,
    week: x.weekNumberOfYear,
    month: x.month,
    year: x.year,
    receivable: increment(newPrice),
  }

  console.log('Projection  updation failed', docId_d, payload)
  try {
    // await updateDoc(doc(db, `${orgId}_payment_projections`, docId_d), payload)
    await setDoc(doc(db, `${orgId}_payment_projections`, docId_d), payload)
  } catch (error) {
    console.log('Projection  updation failed', error, {
      ...data,
    })
    await setDoc(doc(db, `${orgId}_payment_projections`, docId_d), payload)
    enqueueSnackbar('Projection updation failed BBB', {
      variant: 'error',
    })
  }

  return
}
export const updateProjectionsAgreegations = async (
  orgId,
  data,
  by,
  enqueueSnackbar
) => {
  console.log('data is===>', data)
  const { oldDate, schDate, pId, newPrice } = data
  console.log('data is===>', oldDate, schDate)
  if (oldDate != schDate) {
    const x = getWeekMonthNo(schDate)
    const y = getWeekMonthNo(oldDate)
    console.log('value of schDate', x)
    const docId_d = `${pId}W${x.weekNumberOfYear}M${x.month}Y${x.year}s${data.stageId}`
    const old_doc_Id = `${pId}W${y.weekNumberOfYear}M${y.month}Y${y.year}s${data.stageId}`

    const payload = {
      pId: pId,
      block: 1,
      week: x.weekNumberOfYear,
      month: x.month,
      year: x.year,
      receivable: increment(newPrice),
    }
    const oldPayload = {
      pId: pId,
      block: 1,
      week: y.weekNumberOfYear,
      month: y.month,
      year: y.year,
      receivable: increment(-newPrice),
    }
    console.log('Projection  updation failed', docId_d, payload)
    try {
      await updateDoc(doc(db, `${orgId}_payment_projections`, docId_d), payload)
    } catch (error) {
      console.log('Projection  updation failed', error, {
        ...data,
      })
      await setDoc(doc(db, `${orgId}_payment_projections`, docId_d), payload)
      enqueueSnackbar('Projection updation failed BBB', {
        variant: 'error',
      })
    }
    try {
      await updateDoc(
        doc(db, `${orgId}_payment_projections`, old_doc_Id),
        oldPayload
      )
    } catch (error) {
      console.log('Projection  updation failed', error, {
        ...data,
      })

      enqueueSnackbar('Projection old now found', {
        variant: 'error',
      })
    }
  } else {
    return
  }
  return
}

export const updateCrmExecutiveAgreegations = async (
  orgId,
  data,
  by,
  enqueueSnackbar
) => {
  console.log('data is===>', data)
  const { oldDate, schDate, assignedTo, newPrice } = data
  console.log('data is===>', oldDate, schDate)
  if (oldDate != schDate) {
    const x = getWeekMonthNo(schDate)
    const y = getWeekMonthNo(oldDate)
    console.log('value of schDate', x)
    const docId_d = `${assignedTo}W${x.weekNumberOfYear}M${x.month}Y${x.year}s${data.stageId}`
    const old_doc_Id = `${assignedTo}W${y.weekNumberOfYear}M${y.month}Y${y.year}s${data.stageId}`

    const payload = {
      uId: assignedTo,
      block: 1,
      week: x.weekNumberOfYear,
      month: x.month,
      year: x.year,
      receivable: increment(newPrice),
    }
    const oldPayload = {
      uId: assignedTo,
      block: 1,
      week: y.weekNumberOfYear,
      month: y.month,
      year: y.year,
      receivable: increment(-newPrice),
    }
    console.log('Employee  updation failed', docId_d, payload)
    try {
      await updateDoc(
        doc(db, `${orgId}_emp_collections`, old_doc_Id),
        oldPayload
      )
    } catch (error) {
      console.log('Emp Projection Removal failed', error, {
        ...data,
      })
      enqueueSnackbar('Emp Projection Removal failed', {
        variant: 'error',
      })
    }
    try {
      await updateDoc(doc(db, `${orgId}_emp_collections`, docId_d), payload)
    } catch (error) {
      console.log('Employee  updation failed', error, {
        ...data,
      })
      await setDoc(doc(db, `${orgId}_emp_collections`, docId_d), payload)
      enqueueSnackbar('Emp Projections updation', {
        variant: 'error',
      })
    }
  } else {
    return
  }
  return
}
export const updateCrmExecutiveReAssignAgreegations = async (
  orgId,
  data,
  by,
  enqueueSnackbar
) => {
  console.log('data is===>', data)

  const {
    oldSchDate,
    schDate,
    assignedTo,
    oldAssignedTo,
    value: newPrice,
  } = data
  console.log('data is===>', assignedTo, oldAssignedTo)

  const x = getWeekMonthNo(schDate)
  const y = getWeekMonthNo(schDate)
  console.log('value of schDate', x)
  const docId_d = `${assignedTo}W${x.weekNumberOfYear}M${x.month}Y${x.year}s${data.stage.value}`
  const old_doc_Id = `${oldAssignedTo}W${y.weekNumberOfYear}M${y.month}Y${y.year}s${data.stage.value}`

  const payload = {
    uId: assignedTo,
    block: 1,
    week: x.weekNumberOfYear,
    month: x.month,
    year: x.year,
    receivable: increment(newPrice),
    // receivable: newPrice,
  }
  const oldPayload = {
    uId: oldAssignedTo,
    block: 1,
    week: y.weekNumberOfYear,
    month: y.month,
    year: y.year,
    receivable: increment(-newPrice),
    // receivable: 0,
  }
  console.log('Employee  updation failed', docId_d, payload)
  try {
    await updateDoc(doc(db, `${orgId}_emp_collections`, old_doc_Id), oldPayload)
  } catch (error) {
    console.log('Employee  updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Emp Projections updation failed BBB', {
      variant: 'error',
    })
  }
  try {
    await updateDoc(doc(db, `${orgId}_emp_collections`, docId_d), payload)
  } catch (error) {
    console.log('Employee  updation failed', error, {
      ...data,
    })
    await setDoc(doc(db, `${orgId}_emp_collections`, docId_d), payload)
    enqueueSnackbar('Emp Projections updation failed BBB', {
      variant: 'error',
    })
  }

  return
}
export const updateManagerApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const {
      status,
      plotCS,
      addChargesCS,
      fullPs,
      T_balance,
      T_Total,
      T_elgible_balance,
    } = data

    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      man_cs_approval: status,
      plotCS: plotCS,
      addChargesCS,
      fullPs,
      T_balance,
      T_Total,
      T_elgible_balance,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'approval',
          subtype: 'cs_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'cs_review',
          to: status,
        },
      ])
    enqueueSnackbar('CS Approved..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('CS Approved Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('CS Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const addNewUnitDemand = async (
  orgId,
  selUnitDetails,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status, addOnCS, fullPs, T_balance, T_Total, T_elgible_balance } =
      data

    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      addOnCS: addOnCS,
      fullPs,
      T_balance,
      T_Total,
      T_elgible_balance,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'cs_addon',
          subtype: 'cs_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'cs_review',
          to: status,
        },
      ])
    fullPs.map((d, i) => {
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

        updateProjectionsAgreegations(orgId, dataPayload, by, enqueueSnackbar)

        updateCrmExecutiveAgreegations(orgId, dataPayload, by, enqueueSnackbar)
      }
    })
    enqueueSnackbar('Costsheet & Payment Schedule Updated.', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Costsheet & Payment Schedule Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('Costsheet & Payment Schedule Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updateLegalClarityApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status } = data
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      legal_clarity: status,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'approval',
          subtype: 'legal_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'legal_review',
          to: status,
        },
      ])
    enqueueSnackbar('Legal Clarified..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Legal Clarified Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('Legal Clarified  Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updateATSApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status } = data
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      man_ats_approval: status,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'approval',
          subtype: 'ats_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'ats_review',
          to: status,
        },
      ])
    enqueueSnackbar('ATS Approved..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('ATS Approved Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('ATS Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updateKycApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status } = data
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      kyc_status: status,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'approval',
          subtype: 'kyc_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'kyc_review',
          to: status,
        },
      ])
    enqueueSnackbar('KYC Approved..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('KYC Approved Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('KYC Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updatePosessionApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status } = data
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      posession_status: status,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'unitStatus',
          subtype: 'possession',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'cs_review',
          to: 'posession',
        },
      ])
    enqueueSnackbar('Posession Approved..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Posession Approved Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('Posession Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updateSDApproval = async (
  orgId,
  unitId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is===>', unitId, data)
    const { status } = data
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      both_sd_approval: status,
    })
    const { data: data4, error: error4 } = await supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'approval',
          subtype: 'sd_approval',
          T: Timestamp.now().toMillis(),
          Uuid: unitId,
          by,
          payload: {},
          from: 'sd_review',
          to: status,
        },
      ])
    enqueueSnackbar('Sale Deed Approved..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('SD Approved Updation Failed', error, {
      ...data,
    })
    enqueueSnackbar('SD Approved Updation Failed .', {
      variant: 'error',
    })
  }
  return
}
export const updateUnitCrmOwner = async (
  orgId,
  unitId,
  assignedTo,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is', unitId, assignedTo)
    const { value, offPh } = assignedTo
    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      assignedTo: value,
      assignedToObj: assignedTo,
      AssignedBy: by,
      assignT: Timestamp.now().toMillis(),
    })
    enqueueSnackbar('Unit Crm Owner Updated successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Unit Crm Owner Updated failed', error, {
      ...assignedTo,
    })
    enqueueSnackbar('Unit Crm Owner Updated failed BBB', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadCostSheetDetailsTo = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', leadDocId, data)

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    enqueueSnackbar('Cost Sheet Updated for Customer', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Filed updated Cost sheet', error, {
      ...data,
    })
    enqueueSnackbar('Failed to update Cost sheet', {
      variant: 'error',
    })
  }

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}
export const updateUnitsCostSheetDetailsTo = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', leadDocId, data)

    await updateDoc(doc(db, `${orgId}_stalls`, leadDocId), {
      ...data,
    })
    enqueueSnackbar('Cost Sheet Updated for Customer', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Filed updated Cost sheet', error, {
      ...data,
    })
    enqueueSnackbar('Failed to update Cost sheet', {
      variant: 'error',
    })
  }

  return
}
export const updateStallAsBooked = async (
  orgId,
  projectId,
  stallId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', data, stallId)

    await updateDoc(doc(db, `${orgId}_stalls`, stallId), {
      ...data,
    })
    // const { data1, error1 } = await supabase.from(`${orgId}_unit_logs`).insert([
    //   {
    //     type: 'sts_change',
    //     subtype: data?.status || 'booked',
    //     T: Timestamp.now().toMillis(),
    //     Uuid: stallId,
    //     by,
    //     payload: { bookedBy: by },
    //     from: data?.oldStatus || 'lead',
    //     to: data?.status || 'booked',
    //   },
    // ])
    // enqueueSnackbar(`Cost Seet and Unit ${data?.status}`, {
    //   variant: 'success',
    // })
  } catch (error) {
    console.log('Filed updated Cost sheet', error, {
      ...data,
    })
    enqueueSnackbar('Cost sheet  updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateUnitAsBlocked = async (
  orgId,
  projectId,
  unitId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', leadDocId, data, unitId)

    await updateDoc(doc(db, `${orgId}_stalls`, unitId), {
      ...data,
    })
    const { data1, error1 } = await supabase.from(`${orgId}_unit_logs`).insert([
      {
        type: 'sts_change',
        subtype: 'customer_blocked',
        T: Timestamp.now().toMillis(),
        Uuid: unitId,
        by,
        payload: { blockedBy: by },
        from: 'lead',
        to: 'blocked',
      },
    ])
    enqueueSnackbar('Unit is blocked..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Failed in blocking unit', error, {
      ...data,
    })
    enqueueSnackbar('Failed in blocking unit', {
      variant: 'error',
    })
  }

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}

export const updateLeadRemarks_NotIntrested = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is', leadDocId, data)
    const { from, Status, notInterestedReason, notInterestedNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: Status,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: { reason: notInterestedReason, notes: notInterestedNotes },
        from: from,
        to: Status,
      },
    ])
    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadRemarks = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is visit done', leadDocId, data)
    const { from, Status, VisitDoneReason, VisitDoneNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })

    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadRemarks_VisitDone = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is visit done', leadDocId, data)
    const { from, Status, VisitDoneReason, VisitDoneNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: Status,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: { reason: VisitDoneReason, notes: VisitDoneNotes },
        from: from,
        to: Status,
      },
    ])
    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadLastUpdateTime = async (
  orgId,
  leadDocId,
  time,
  schTime
) => {
  try {
    // console.log('wow it should be here', leadDocId, schTime)
    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      leadUpT: time,
      schTime,
    })
  } catch (e) {
    console.log('failed to throw error at updateLeadLastUpdateTime ', e)
    // enqueueSnackbar(e.message, {
    //   variant: 'error',
    // })
  }
}
export const updateLeadStatus = async (
  orgId,
  projectId,
  leadDocId,
  oldStatus,
  newStatus,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('wow it should be here', leadDocId, newStatus)
    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      Status: newStatus,
      coveredA: arrayUnion(oldStatus),
      stsUpT: Timestamp.now().toMillis(),
      leadUpT: Timestamp.now().toMillis(),
    })
    // await addLeadLog(orgId, x.id, {
    //   s: 's',
    //   type: 'status',
    //   subtype: 'added',
    //   T: Timestamp.now().toMillis(),
    //   txt: msg,
    //   by,
    // })
    const { data, error } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: oldStatus,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: {},
        from: oldStatus,
        to: newStatus,
        projectId: projectId,
      },
    ])

    console.log('chek if ther is any erro in supa', data, error)
    enqueueSnackbar(`Status Updated to ${newStatus}`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateEventsStallBookCounts = async (
  orgId,
  pId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    const { soldVal, t_collect } = data
    await updateDoc(doc(db, `${orgId}_events`, pId), {
      bookUnitCount: increment(1),
      availableCount: increment(-1),
      soldUnitCount: increment(1),
      soldValue: increment(soldVal),
      t_collect: increment(t_collect),
      t_bal: soldVal - t_collect,
    })

    console.log('chek if ther is any erro in supa', data)
    enqueueSnackbar(`Event Status Updated`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateCancelProjectCounts = async (
  orgId,
  pId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    const { soldVal, t_collect } = data
    await updateDoc(doc(db, `${orgId}_events`, pId), {
      bookUnitCount: increment(-1),
      availableCount: increment(1),
      soldUnitCount: increment(-1),
      // s_agreeCount: increment(1),
      // s_registerCount: increment(1),
      // s_constCount: increment(1),
      // s_possCount: increment(1),
      // t_mtd: increment(1),
      // soldValue: increment(soldVal),
      t_collect: increment(t_collect),

      // t_bal: soldVal - t_collect,
      // t_refund: increment(1)
    })

    console.log('chek if ther is any erro in supa', data)
    enqueueSnackbar(`Event Status Updated`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateLeadProject = async (orgId, leadDocId, newProjObj) => {
  console.log('wow it should be here', leadDocId, newProjObj)
  await updateDoc(doc(db, `${orgId}_leads`, leadDocId), newProjObj)
}
export const updateSchLog = async (orgId, uid, kId, newStat, schStsA) => {
  const x = `${kId}.sts`
  const y = `${kId}.comT`
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: newStat,
    [y]: Timestamp.now().toMillis() + 21600000,
  })
}
export const undoSchLog = async (orgId, uid, kId, newStat, schStsA, oldSch) => {
  const { schTime } = oldSch
  const x = `${kId}.sts`
  const y = `${kId}.schTime`
  console.log('undo time is ', schStsA)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: newStat,
    [y]: schTime,
  })
}
export const editTaskDB = async (orgId, uid, kId, newStat, schStsA, oldSch) => {
  const { schTime, notes } = oldSch
  const x = `${kId}.notes`
  const y = `${kId}.schTime`
  console.log('undo time is ', schStsA, schTime)
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: notes,
    [y]: schTime,
  })
}
export const rescheduleTaskDB = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  schTime
) => {
  const y = `${kId}.schTime`
  console.log('new schedule time i s', schTime)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    [y]: schTime,
  })
}
export const editAddTaskCommentDB = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  oldSch
) => {
  const { schTime, comments } = oldSch
  const x = `${kId}.comments`
  const y = `${kId}.schTime`
  console.log('comments are', comments)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    [x]: comments,
    [y]: schTime,
  })

  if (comments.length > 0) {
    const { c } = comments[0]
    await updateDoc(doc(db, `${orgId}_leads`, uid), {
      Remarks: c,
    })
  }
}
export const updateSch = async (
  orgId,
  uid,
  kId,
  newCt,
  schStsA,
  assignedTo,
  actionType,
  existingCount
) => {
  const x = `${kId}.schTime`
  const y = `${kId}.${actionType}`
  // const y = {
  //   [x]: newCt,
  //   [x]: newCt,

  //   assignedTo,
  // }
  const z = `${actionType}`
  console.log('xo xo xo 1', actionType, y)
  try {
    await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
      [x]: newCt,
      [y]: increment(1),
      assignedTo,
    })
  } catch (error) {
    console.log('xo xo xo error', error)
  }
}
export const updateTodayTasksTotal = async (orgId, uid, payload) => {
  try {
    await updateDoc(doc(db, `${orgId}_emp_performance`, uid), {
      ...payload,
    })
  } catch (error) {
    console.log('xo xo xo error', error)
    if (/\No document\b/.test(error)) {
      setDoc(doc(db, `${orgId}_emp_performance`, uid), { ...payload })
      console.log('no such doc baby')
    }
  }
}
export const updateMoreDetails = async (uid, moreDetails, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'phases', uid), {
      moreDetails: {
        ...moreDetails,
        updated: Timestamp.now().toMillis(),
      },
    })
    enqueueSnackbar('Details updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updatePayment = async (uid, element, enqueueSnackbar) => {
  try {
    await updateDoc(
      doc(db, 'paymentSchedule', uid),
      {
        ...element,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Payment updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateAdditionalCharges = async (
  uid,
  element,
  enqueueSnackbar
) => {
  try {
    await updateDoc(
      doc(db, 'additionalCharges', uid),
      {
        ...element,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Payment updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const upSertMortgageUnit = async (orgId, unitUid, data, by) => {
  try {
    const washingtonRef = doc(db, `${orgId}_unit_mortgage`, unitUid)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, data)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_unit_mortgage`, unitUid), data)
  }
}
// **********************************************
// deleteF
// **********************************************

export const deleteUser = async (orgId, uid, by, email, myRole) => {
  await deleteDoc(doc(db, 'users', uid))
  return await addUserLog(orgId, {
    s: 's',
    type: 'deleteRole',
    subtype: 'deleteRole',
    txt: `Employee ${email} as ${myRole} is deleted`,
    by,
  })
}
export const deleteProject = async (orgId, uid, by, Event, enqueueSnackbar) => {
  await deleteDoc(doc(db, `${orgId}_events`, uid))
  const { eventName } = Event
  await addProjectLog(orgId, {
    pId: uid,
    s: 's',
    type: 'deleteProject',
    subtype: 'deleteProject',
    txt: `${eventName} is deleted by ${by}`,
    by,
  })
  enqueueSnackbar('Event deleted successfully', {
    variant: 'success',
  })
}

export const deleteAsset = async (orgId, uid, by, email, myRole) => {
  await deleteDoc(doc(db, `${orgId}_project_docs`, uid))
  // return await addUserLog({
  //   s: 's',
  //   type: 'deleteRole',
  //   subtype: 'deleteRole',
  //   txt: `Employee ${email} as ${myRole} is deleted`,
  //   by,
  // })
}
export const deleteBankAccount = async (
  orgId,
  uid,
  by,
  email,
  myRole,
  enqueueSnackbar
) => {
  try {
    await deleteDoc(doc(db, `${orgId}_BankDetails`, uid))
    enqueueSnackbar('Bank Acount deleted successfully', {
      variant: 'success',
    })
  } catch (error) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }

  // return await addUserLog({
  //   s: 's',
  //   type: 'deleteRole',
  //   subtype: 'deleteRole',
  //   txt: `Employee ${email} as ${myRole} is deleted`,
  //   by,
  // })
}

export const deletePayment = async (uid, enqueueSnackbar) => {
  try {
    await deleteDoc(doc(db, 'paymentSchedule', uid))

    enqueueSnackbar('Payment deleted successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const deleteSourceList = async (orgId, uid, enqueueSnackbar) => {
  try {
    await deleteDoc(doc(db, `${orgId}_LeadSources`, uid))

    enqueueSnackbar('Source deleted successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const deleteAdditionalCharge = async (uid, enqueueSnackbar) => {
  try {
    await deleteDoc(doc(db, 'additionalCharges', uid))

    enqueueSnackbar('Payment deleted successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const deleteSchLog = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  schStsMA
) => {
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    staDA: schStsMA,
    [kId]: deleteField(),
  })
}
export const deleteMasterOption = async (orgId, docId, by, enqueueSnackbar) => {
  console.log('docId', docId)
  await deleteDoc(doc(db, `${orgId}_Masters`, docId))
  enqueueSnackbar('Master Option deleted successfully', {
    variant: 'success',
  })
}

/// **********************************************
// Manipulators
// **********************************************

export const addUnitComputedValues = async (
  c_name,
  docId,
  plot_Sqf,
  super_built_up_area,
  plot_value,
  construct_value,
  unitCount
) => {
  const yo = {
    totalEstValue: increment(plot_value + construct_value),
    totalEstPlotVal: increment(plot_value),
    totalEstConstuctVal: increment(construct_value),
    totalPlotArea: increment(plot_Sqf),
    totalConstructArea: increment(super_built_up_area),
    // totalArea: increment(area),
    totalUnitCount: increment(unitCount),
    availableCount: increment(unitCount),
  }
  try {
    const washingtonRef = doc(db, c_name, docId)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, c_name, docId), yo)
  }
  return
}

export const addUnitBankComputed = async (
  orgId,
  c_name,
  docId,
  plot_Sqf,
  super_built_up_area,
  plot_value,
  construct_value,
  unitCount
) => {
  const yo = {
    totalEstValue: increment(plot_value + construct_value),
    totalEstPlotVal: increment(plot_value),
    totalEstConstuctVal: increment(construct_value),
    totalPlotArea: increment(plot_Sqf),
    totalConstructArea: increment(super_built_up_area),
    [`${docId}_totalUnitCount`]: increment(unitCount),
    [`${docId}_availableCount`]: increment(unitCount),
    [`${docId}_totalEstValue`]: increment(plot_value + construct_value),
    [`${docId}_totalEstPlotVal`]: increment(plot_value),
    [`${docId}_totalEstConstuctVal`]: increment(construct_value),
    [`${docId}_totalPlotArea`]: increment(plot_Sqf),
    [`${docId}_totalConstructArea`]: increment(super_built_up_area),
    [`${docId}_totalUnitCount`]: increment(unitCount),
    [`${docId}_availableCount`]: increment(unitCount),
  }
  try {
    const washingtonRef = doc(db, c_name, docId)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    console.log('error at addUnitBankComputed', error)
    if (c_name === `${orgId}_VirtualAccounts`) {
      await setDoc(doc(db, c_name, docId), yo)
    }
  }
  return
}

export const addAgreegatedSalesValues = async (orgId, docId, data) => {
  try {
    const washingtonRef = doc(db, `${orgId}_sales_reports`, docId)
    await updateDoc(washingtonRef, data)
  } catch (error) {
    console.log('error at addUnitBankComputed', error, data)
    await setDoc(doc(db, `${orgId}_sales_reports`, docId), data)
  }
  return
}
export const addCostSheetMaster = async (
  orgId,
  docId,
  data,
  enqueueSnackbar
) => {
  try {
    const washingtonRef = doc(db, `${orgId}_projectMasters`, docId)
    await updateDoc(washingtonRef, data)
    enqueueSnackbar('Template Updated..!', {
      variant: 'success',
    })
  } catch (error) {
    console.log('error at addUnitBankComputed', error, data)
    await setDoc(doc(db, `${orgId}_projectMasters`, docId), data)
    enqueueSnackbar('Template Added..!', {
      variant: 'success',
    })
  }
  return
}

// reports

//  get leads count vs sources
export const steamLeadsVsSources = async (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', data, uid)
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error1 } = await supabase
    .from(`spark_sales_leads_source_daily_logs`)
    .select('*')

  // .order('T', { ascending: false })
  console.log('my total fetched list is 3', lead_logs)
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
