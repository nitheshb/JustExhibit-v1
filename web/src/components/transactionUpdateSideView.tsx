/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  BadgeCheckIcon,
  DocumentIcon,
  EyeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/solid'
import { CheckIcon, SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import { VerticalAlignBottom } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TimePicker from '@mui/lab/TimePicker'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import DatePicker from 'react-datepicker'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import {
  addLeadScheduler,
  addSchedulerLog,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadPhoneLog,
  steamLeadScheduleLog,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  steamLeadNotes,
  createAttach,
  getCustomerDocs,
  getAllProjects,
  updateLeadProject,
  updateTransactionStatus,
  updateWalletTransactionStatus,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDate,
  prettyDateTime,
  timeConv,
} from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import StatusDropComp from './statusDropComp'
import AssigedToDropComp from './assignedToDropComp'
import Loader from './Loader/Loader'
import ProjPhaseHome from './ProjPhaseHome/ProjPhaseHome'
import AddApplicantDetails from './AddApplicantDetails'

import { useSnackbar } from 'notistack'

// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
const people = [
  { name: 'Priority 1' },
  { name: 'Priority 2' },
  { name: 'Priority 3' },
  { name: 'Priority 4' },
]

export default function TransactionUpdateSideView({
  openUserProfile,
  customerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
  transactionData,
}) {
  console.log('customer Details', customerDetails)
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('notes')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [leadAttachFetchedData, setLeadsFetchedAttachData] = useState([])
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)

  const d = new window.Date()
  const [value, setValue] = useState(d)

  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))
  const [selected, setSelected] = useState(people[0])
  const [taskDetails, setTaskDetails] = useState('')
  const [schPri, setSchPri] = useState(1)
  const [schTime, setSchTime] = useState()
  const [schStsA, setschStsA] = useState([])
  const [schStsMA, setschStsMA] = useState([])
  const [selFilterVal, setSelFilterVal] = useState('pending')
  const [addNote, setAddNote] = useState(false)
  const [addSch, setAddSch] = useState(false)
  const [attach, setAttach] = useState(false)
  const [loader, setLoader] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)

  const [projectList, setprojectList] = useState([])

  const [selProjectIs, setSelProjectIs] = useState({
    eventName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
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
    attachments,
    mode,
    chequeno,
    dated,
    amount,
    fromObj,
    toAccount,
  } = customerDetails





  const downloadFile = (url) => {
    window.location.href = url
  }


  const selFun = () => {
    console.log('i was selcted')
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }



  const docUploadHandler = async (e) => {
    e.preventDefault()
    console.log('filer upload stuff', e.target[0].files[0])
    uploadStuff(e.target[0].files[0])
  }

  const uploadStuff = async (file) => {
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${Name}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress(prog)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createAttach(orgId, url, by, file.name, id, attachType)
            console.log('file url i s', url)
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  const updateTnxStatus = (status, id) => {
    // const data = {status, id}
    const data = transactionData
    data.Uuid = data?.unit_id
    data.status = status
    console.log('transactionData', transactionData)
    if(data?.unit_id === 'wallet'){
      updateWalletTransactionStatus(orgId,data, user?.email,  enqueueSnackbar )
    }else{
      updateTransactionStatus(orgId,data, user?.email,  enqueueSnackbar )
    }
  }

  useEffect(() => {
  console.log('value si ', transactionData)
  }, [])

  return (
    <div
      className={`bg-white   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
      <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
        <div className="text-center flex justify-between">
          <p className="text-xs font-extrabold tracking-tight uppercase font-body my-[2px] p-1 ml-2">
            Transaction
          </p>
          <section>
            <div
              className=" flex flex-col"
              onClick={() => setViewDetails(!viewDetails)}
            >
              <span
                className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
              >
                {'In-Review'}
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-screen overflow-y-auto overflow-auto no-scrollbar">
        <div className="mt-2  grid grid-cols-2 ">
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                From
              </div>
              <div className="font-md text-xs mt-1 tracking-wide font-semibold text-slate-900 ">
                {transactionData?.customerName}
              </div>
            </section>
          </section>
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Trxn Id
              </div>
              <div className="font-md text-xs mt-1 tracking-wide font-semibold text-slate-900 ">
                {transactionData?.bank_ref || transactionData?.txt_id}
              </div>
            </section>
          </section>
        </div>
        <div className="mt-2  grid grid-cols-2 border-t border-[#e5e7f8]">
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Towards
              </div>
              <div className="font-md text-xs mt-1 tracking-wide font-semibold text-[#462c52]  bg-[#f4e1fc] py-1 px-2">
                {transactionData?.towards}
              </div>
            </section>
          </section>
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Mode
              </div>
              <div className="font-md text-xs mt-[6px] tracking-wide font-semibold text-slate-900 ">
                {transactionData?.mode}
              </div>
            </section>
          </section>
        </div>
        <div className="mt-2  grid grid-cols-2 border-t border-[#e5e7f8]">
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Value
              </div>
              <div className="font-md text-xl mt-1 tracking-wide font-semibold text-[#245949] ">
                ₹{transactionData?.totalAmount || 0}
              </div>
            </section>
          </section>
          <section className=" flex flex-col  p-3   ">
            <section className="flex flex-col justify-between  ">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Date
              </div>
              <div className="font-md text-xs mt-1 tracking-wide font-semibold text-[#68582e] p-2  bg-[#feeacc]">
                {timeConv(transactionData?.txt_dated)}
              </div>
            </section>
          </section>
        </div>
        <div className="my-2  grid grid-cols-2 mt-4 border-t border-[#e5e7f8]">
          <button
            className="mb-2 md:mb-0 mr-2 hover:scale-110 focus:outline-none              hover:bg-green-100


                                  h-8
                                  border duration-200 ease-in-out
                                  border-green-700 transition
                                   px-5  text-sm shadow-sm font-medium tracking-wider text-black rounded-sm hover:shadow-lg hover:bg-green-500"
            onClick={() => {
              // setActionMode('unitBookingMode')
              updateTnxStatus('Failed', transactionData?.id, user)

            }}
            // disabled={loading}
          >
            Reject
          </button>
          <button
            className="mb-2 md:mb-0  hover:scale-110 focus:outline-none              hover:bg-green-700
                                  bg-green-700
                                  text-teal-100
                                  h-8
                                  border duration-200 ease-in-out
                                  border-green-700 transition
                                   px-5  text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
            onClick={() => {
              // setActionMode('unitBookingMode')
              // update the transaction details along with the apporver deatils and comments
              // Increment the reviewed cost and decrement the unReviewed
              updateTnxStatus('received', transactionData?.id)
            }}
            // disabled={loading}

          >
            Received
          </button>
        </div>

      </div>
    </div>
  )
}
