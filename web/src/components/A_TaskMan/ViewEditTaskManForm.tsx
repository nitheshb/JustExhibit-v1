/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef } from 'react'
import {
  CalendarIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { FireIcon } from '@heroicons/react/solid'
import { ArrowCircleDownIcon } from '@heroicons/react/solid'
import { AttachFile } from '@mui/icons-material'
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'


import {
  AddCommentTaskManData,
  CompleteTaskManData,
  ReOpenTaskManData,
  addTaskBusiness,
  editTaskManData,
  getAllProjects,
  steamUsersList,
  editTaskManAttachmentsData,
  deleteTaskManData,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'

import FileList from './FilesList'
import FileUpload from './FileUpload'

const customStyles = {
  control: (base) => ({
    ...base,
    height: 30,
    minHeight: 25,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    alignItems: 'initial',
    paddingTop: 0,
    padding: 0,
    paddingLeft: 5,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 5,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    marginTop: 4,
    marginBottom: 8,
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 14,
    marginTop: 3,
  }),
  menu: (provided) => ({ ...provided, marginTop: 0, zIndex: 9999 }),
}

import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDateTime,
} from 'src/util/dateConverter'



import Confetti from '../shared/confetti'

import { CustomSelectNew } from 'src/util/formFields/selectBoxFieldNew'
const people = [
  { name: 'Priority 1' },
  { name: 'Priority 2' },
  { name: 'Priority 3' },
  { name: 'Priority 4' },
]

const formatOptionLabel = ({ value, label, dept }) => (
  <div style={{ display: 'flex' }}>
    <div>{label}</div>
    <div
      style={{
        marginLeft: '10px',
        color: '#118d57',
        background: '#22c55e29',
        padding: '0px 8px',
        paddingBottom: '2px',
        borderRadius: '10px',
        fontSize: '10px',
        height: '16px',
      }}
    >
      {dept}
    </div>
  </div>
)
const ViewEditTaskManForm = ({ title, dialogOpen, taskManObj }) => {
  const { user } = useAuth()
  const { orgId } = user
  const d = new window.Date()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [myTaskObj, setMyTaskObj] = useState([])
  const [myTaskStatus, setMyTaskStatus] = useState('')
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))
  const [selected1, setSelected1] = useState(people[0])
  const [showEditTask, selShowEditTask] = useState(false)
  const [addCommentTitle, setAddCommentTitle] = useState('')
  const [addCommentPlusTask, setAddCommentPlusTask] = useState(false)
  const [closeTask, setCloseTask] = useState(false)
  const [error, setError] = useState(false)
  const [prior, setPrior] = useState(false)
  const [files, setFiles] = useState([])
  const [commentAttachUrl, setCommentAttachUrl] = useState('')
  const [cmntFileType, setCmntFileType] = useState('')
  const [progress, setProgress] = useState(0)

  const removeFile = (filename) => {
    console.log(
      'removing files ',
      files.filter((file) => file.name !== filename)
    )
    setFiles(files.filter((file) => file.name !== filename))
    const data = {}
    data.id = taskManObj.id
    data.attachments = files.filter((file) => file.name !== filename)
    editTaskManAttachmentsData(orgId, data, user)
  }

  useEffect(() => {
    console.log('taskManObj', taskManObj)
    setFiles(taskManObj?.attachmentsA || [])
  }, [])

  useEffect(() => {
    const unsubscribe = steamUsersList(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
          user.dept = user?.roles[0]
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    setMyTaskObj(taskManObj?.comments || [])
    setMyTaskStatus(taskManObj?.status)
    setPrior(taskManObj?.priority === 'high')
    console.log('priority is o', taskManObj)
  }, [taskManObj])

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

  const [takTitle, setTakTitle] = useState('')
  const confettiRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const downloadFile = (url) => {
    window.location.href = url
  }
  const [imageUrl, setImageUrl] = useState(null)
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

          setProgress(prog)
          file.isUploading = false
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // createAttach(orgId, url, by, file.name, id, attachType)
            file.url = url
            setCmntFileType(file.name.split('.').pop())
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

  const uploadHandler = (event) => {
    const file = event.target.files[0]
    if (!file) return
    file.isUploading = true
    // setFiles([...files, file])

    // upload file
    const formData = new FormData()
    formData.append('newFile', file, file.name)
    // uploadStuff(file)
  }
  const onSubmitFun = async (data, resetForm) => {
    console.log('edit task and button taskManObj',startDate, taskManObj, data)
    data.id = taskManObj.id
    data.priorities = prior ? 'high' : 'medium'
    data.attachments = files
    if(startDate instanceof Date){
      data.due_date = startDate.getTime()
    }


    await editTaskManData(orgId, data, user)
    await setFormMessage('Task Edited..!')

    return
    data.due_date = startDate.getTime()
    setLoading(true)
    await addTaskBusiness(orgId, data, user)

    await resetForm()
    await setFormMessage('Saved Successfully..!')
    await setLoading(false)
    return
  }
  useEffect(() => {
    console.log('selcted taskmANOBJ IS', taskManObj)
    setStartDate(taskManObj?.due_date)
  }, [])

  const validate = Yup.object({
    taskTitle: Yup.string().required('Task Title is Required'),
    assignedTo: Yup.string().required('Required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  const setTitleFun = (e) => {
    console.log('title value is', e.target.value)
    setTakTitle(e.target.value)
  }
  return (
    <div className="h-full flex flex-col pb-6 bg-white shadow-xl overflow-y-scroll bg-[#eef2eb]">
      {/* <div className="px-4 sm:px-6  z-10 flex items-center justify-between">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div> */}
      <div className="bg-gradient-to-r flex flex-row justify-between from-blue-200 to-cyan-200">
        <section className="flex flex-row mx-4 py-4">
          <span className="ml-2 mt-[1px] ">
            <label className="font-semibold text-[#053219]  text-[18px]  mb-1  ">
              {showEditTask ? 'Edit Task' : 'View Task'}
              {} 🍉
              <abbr title="required"></abbr>
            </label>
          </span>
        </section>
      </div>

      {!showEditTask && (
        <div className=" flex flex-row justify-between ">
          <div className=" px-3 m-4 mt-2 mr-1 w-full rounded-lg bg-white border border-gray-100 ">
            <div className="my-1 flex flex-row justify-between align-right items-right  border- border-[#e5e7f8]">
              <section></section>
            </div>
            <div className="">
              <section className="flex flex-col justify-between">
                <div
                  className={`${
                    myTaskStatus === 'Done'
                      ? 'cursor-not-allowed '
                      : 'cursor-pointer'
                  }  mt-1 block w-full flex flex-row justify-between`}
                  onClick={() => {}}
                >
                  <label className="inline-flex items-center">
                    {myTaskStatus != 'Done' && (
                      <span
                        className="px-[2px] py-[2px]  rounded-full border border-2 cursor-pointer text-[#cdcdcd] hover:text-green-800 hover:border-green-700 hover:bg-green-100"
                        // onClick={() => doneFun(data)}
                        // onClick={() => closeTaskFun(data)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-2 w-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    {myTaskStatus === 'Done' && (
                      <CheckCircleIcon className="w-4 h-4 inline text-[#058527]" />
                    )}
                    <div
                      className={`${
                        myTaskStatus === 'Done'
                          ? 'line-through'
                          : 'cursor-pointer'
                      }  ml-2 text-[18px] inline font-bodyLato font-brand tracking-wider `}
                      onClick={() => {
                        // if (myTaskStatus === 'InProgress') {
                        //   setAddTaskCommentObj(data)
                        // }
                      }}
                    >
                      <span className="block pb-[3px]">
                        {taskManObj?.title}
                      </span>
                    </div>
                  </label>
                </div>
                <section className="flex flex-row justify-between  ml-1 mb-1">
                  <span className="text-[#7e92a2]  text-[13px]">
                    {' '}
                    {/* <svg
                viewBox="0 0 12 12"
                className="notes_icon inline w-2 h-2 mr-1"
                aria-label="2 comments"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="currentColor"
                    fillRule="nonzero"
                    d="M9.5 1A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9H7.249L5.28 10.97A.75.75 0 0 1 4 10.44V9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h7zm0 1h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H5v1.836L6.835 8H9.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"
                  ></path>
                </g>
              </svg>{' '} */}
                    <span className="">{taskManObj?.desc}</span>
                  </span>
                  <span> {/* {prettyDateTime(commentObj?.t)} */}</span>
                </section>
                <section className="pb-3   ml-1 mt-2 text-[13px] flex">
                  <div className="relative flex flex-col  group rounded-xl border border-[#ecc5c4] bg-[#f9e4e4] px-2">
                    <span className="font-bodyLato flex flex-row text-[#9b504d]">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="calendar_icon inline mr-1 mt-[4px]"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <span className="italic">{taskManObj?.priority} </span>
                    </span>
                  </div>
                  <span className="text-xs font-bodyLato  font-normal text-[#b03d32] text-gray-500 ml-3 mt-[2px] rounded-xl border border-[#56b06a] bg-[#cdfbd3] px-2">
                    <div className="flex flex-row">
                      <div className="relative flex flex-col  group">
                        <span className="font-bodyLato flex flex-row text-[#56b06a] mt-[1px]">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="calendar_icon inline mr-1 mt-[2px]"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <span className=" ">
                            {prettyDateTime(taskManObj?.due_date)}{' '}
                          </span>
                        </span>
                      </div>
                    </div>
                  </span>
                </section>
                <Confetti ref={confettiRef} />
                <section className="my-2 border-t py-2 flex flex-row">
                  {myTaskStatus === 'Done' && (
                    <button
                      className={`flex mt-2  cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium  text-[#535c69]  bg-[#bbed21]   hover:shadow-lg `}
                      onClick={() => {
                        // setActionMode('unitBookingMode')
                        setMyTaskStatus('InProgress')
                        ReOpenTaskManData(
                          orgId,
                          taskManObj,
                          user,
                          'InProgress'
                        )
                      }}
                      // disabled={loading}
                    >
                      <span className="ml-1 ">Re-Open Task</span>
                    </button>
                  )}
                  {myTaskStatus === 'InProgress' &&
                    (taskManObj?.to_uid === user?.uid ||
                      taskManObj?.by_uid === user?.uid) && (
                      <button
                        className={`flex mt-2  cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium  text-[#535c69]  bg-[#bbed21]   hover:shadow-lg `}
                        onClick={() => {
                          // setActionMode('unitBookingMode')
                          setMyTaskStatus('Done')
                          confettiRef.current.fire()
                          CompleteTaskManData(orgId, taskManObj, user, 'Done')
                        }}
                        // disabled={loading}
                      >
                        <span className="ml-1 ">Close Task</span>
                      </button>
                    )}
                  {taskManObj?.by_email === user?.email &&
                    taskManObj?.status != 'Done' && (
                      <button
                        className={`flex mt-2 ml- rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium   `}
                        onClick={() => {
                          selShowEditTask(!showEditTask)
                        }}
                      >
                        <span className="ml-1 ">Edit</span>
                      </button>
                    )}
                  {taskManObj?.by_email === user?.email &&
                    taskManObj?.status != 'Done' && (
                      <button
                        className={`flex mt-2 ml- rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium   `}
                        onClick={() => {
                          // selShowEditTask(!showEditTask)
                          deleteTaskManData(orgId, taskManObj, user)
                          dialogOpen(false)
                        }}
                      >
                        <span className="ml-1 ">Delete</span>
                      </button>
                    )}
                </section>

                <span className="mt-1 text-sm text-semibold ml-[2px]">
                  Comments
                </span>
                <section className="  mr-4 mt-1 p-2 mb-3  border rounded  w-full flex flex-col">
                  {commentAttachUrl != '' && (
                    <img
                      src={
                        ['PNG', 'JPEG', 'png', 'jpeg', 'jpg'].includes(
                          cmntFileType
                        )
                          ? commentAttachUrl
                          : 'https://minimals.cc/assets/icons/files/ic_word.svg'
                      }
                      alt=""
                      className="h-[140px]"
                    />
                  )}
                  <section className="  mt-1 p-2  w-full flex flex-row min-h-[36px]">
                    <input
                      // onChange={setTakTitle()}
                      // autoFocus
                      name="commentTitle"
                      type="text"
                      value={addCommentTitle}
                      onChange={(e) => {
                        console.log('any error ', e, e.target.value)

                        // if (e.target.value === '') {
                        //   setClicked(false)
                        //   setHover(true)
                        // }
                        setAddCommentTitle(e.target.value)
                      }}
                      placeholder="Type Comment"
                      className={`w-full  pb-1 pt-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd]${
                        true ? ' text-[33475b] ' : ' text-[33475b]'
                      } bg-white`}
                    ></input>

                    {/* <div className="sm-file-card">
                    <div className="sm-file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>

              <PaperClipIcon className="w-4 h-4 cursor-pointer mt-[10px] mr-[2px] inline-block text-gray-400 " />
          </button>
        </div>

        </div> */}

                    <div>
                      <label
                        htmlFor="formFile1"
                        className="form-label cursor-pointer inline-block mt-2  font-regular text-xs bg-[#efef] rounded-2xl  py-1 "
                      >
                        <AttachFile
                          className="w-4 h-4 text-[18px]"
                          style={{ fontSize: '18px' }}
                        />
                      </label>
                      {/* {panCard1 != '' && (
                        <button
                          onClick={() =>
                            downloadImage(panCard1, 'pancard1.PNG')
                          }
                        >
                          {' '}
                          <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer ml-1 mb-[9px] mr-2 inline-block text-gray-400 " />
                        </button>
                      )} */}
                      <input
                        type="file"
                        className="hidden"
                        id="formFile1"
                        onChange={(e) => {
                          handleFileUploadFun(e.target.files[0], 'panCard1')
                        }}
                      />
                    </div>
                    {!addCommentPlusTask && (
                      <button
                        type="submit"
                        onClick={() => {
                          if (
                            addCommentTitle === 'undefined' ||
                            addCommentTitle === ''
                          ) {
                            // cancelResetStatusFun()
                            setError(true)
                          }
                          if (
                            !error &&
                            !(
                              addCommentTitle === 'undefined' ||
                              addCommentTitle === ''
                            )
                          ) {
                            // addTaskCommentFun(data)
                            // addCommentTitle
                            const x = []

                            if (commentAttachUrl === '') {
                              x.push({
                                typ: 'text',
                                msg: addCommentTitle,
                                by: user?.displayName,
                                T: Timestamp.now().toMillis(),
                              })
                            } else {
                              x.push({
                                typ: cmntFileType,
                                url: commentAttachUrl,
                                msg: addCommentTitle,
                                by: user?.displayName,
                                T: Timestamp.now().toMillis(),
                              })
                            }

                            const newCommentA = [...x, ...(myTaskObj || [])]
                            const dta = taskManObj
                            setMyTaskObj(newCommentA)
                            dta.comments = newCommentA
                            AddCommentTaskManData(orgId, dta, user)
                            setAddCommentTitle('')
                            setCommentAttachUrl('')
                            setCmntFileType('')
                          }
                        }}
                        className={`flex mt-2 ml-4 cursor-pointer rounded-xs text-bodyLato items-center  pl-1 h-[28px] pr-1 rounded py-1 text-xs font-medium  ${
                          addCommentTitle === 'undefined' ||
                          addCommentTitle === ''
                            ? ''
                            : 'bg-[#21C55D]'
                        }  `}
                      >
                        <span className="text-md">
                          {/* {(addCommentTitle === 'undefined' ||
                      addCommentTitle === '') && <CloseTwoToneIcon />} */}
                          {!closeTask &&
                            !addCommentPlusTask &&
                            !(
                              addCommentTitle === 'undefined' ||
                              addCommentTitle === ''
                            ) && <SendTwoToneIcon />}{' '}
                          {closeTask &&
                            !(
                              addCommentTitle === 'undefined' ||
                              addCommentTitle === ''
                            ) && <CheckTwoToneIcon />}
                          {/* {closeTask && (
                <span className="text-[#4b4a4a]">Close This Task </span>
              )}{' '}
              {addCommentPlusTask && (
                <>
                  & <span className="text-[#4b4a4a]">Create New Task</span>
                </>
              )} */}
                        </span>
                      </button>
                    )}
                  </section>
                  <ol className="relative border-gray-200 ">
                    {myTaskObj?.map((commentObj, k) => {
                      console.log('comment is ', commentObj)
                      return (
                        <li
                          key={k}
                          className={`ml-2 mt-4 text-[13px] text-[#7E92A2] tracking-wide ${
                            myTaskObj?.length - 1 === k ? 'mb-1' : ''
                          }`}
                        >
                          <div className="chat-message">
                            <div
                              className={`flex ${
                                user.displayName == commentObj?.by
                                  ? ' justify-end'
                                  : ''
                              } `}
                            >
                              <div className="flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start">
                                <div>
                                  <span
                                    className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${
                                      user.displayName == commentObj?.by
                                        ? ' bg-[#c8fad6] text-[#212b36]'
                                        : 'bg-gray-300 text-gray-600'
                                    } `}
                                  >
                                    {commentObj?.typ != 'text' && (
                                      <>
                                        <img
                                          src={commentObj?.url}
                                          alt=""
                                          className="cursor-pointer mb-1"
                                          onClick={() =>
                                            downloadImage(
                                              commentObj?.url,
                                              `comment.${commentObj?.typ}`
                                            )
                                          }
                                        />
                                        <button
                                          onClick={() =>
                                            downloadImage(
                                              commentObj?.url,
                                              `comment.${commentObj?.typ}`
                                            )
                                          }
                                        >
                                          {' '}
                                          <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer mr-2 inline-block text-gray-400 " />
                                        </button>
                                      </>
                                    )}
                                    {commentObj?.msg}
                                  </span>
                                </div>
                                <section className="flex flex-row justify-between  ml-4">
                                  <span className="font-thin text-[#867777]   font-bodyLato text-[12px]  ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 12 12"
                                      className="inline mr-1"
                                    >
                                      <path
                                        d="M9.357 1C10.264 1 11 1.736 11 2.643V6.07c0 .436-.173.854-.481 1.162L7.232 10.52a1.643 1.643 0 01-2.323 0L1.48 7.09c-.64-.64-.64-1.68.001-2.322L4.768 1.48C5.076 1.173 5.494 1 5.93 1h3.427zm-.07.91H5.93a.805.805 0 00-.569.235L2.145 5.362a.805.805 0 000 1.138L5.5 9.855a.805.805 0 001.138 0l3.217-3.217a.805.805 0 00.236-.569V2.713a.804.804 0 00-.804-.804zM7.364 3.726a.91.91 0 110 1.818.91.91 0 010-1.818z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                      ></path>
                                    </svg>
                                    {commentObj?.by}
                                  </span>
                                  <span className="text-[8px] text-orange-700 ml-3">
                                    {' '}
                                    {prettyDateTime(commentObj?.T)}
                                  </span>
                                </section>
                              </div>
                              <img
                                src="/avatar_1.png"
                                alt="My profile"
                                className="w-6 h-6 mt-1 rounded-full order-1"
                              />
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </section>
              </section>
            </div>
          </div>
          <section className="w-[350px] h-full bg-white rounded-lg border border-gray-100 mr-2 mt-2">
            <div className="flex flex-col w-full">
              {taskManObj?.status != 'Done' && (
                <div className="w-full bg-[#56d1e0] px-2 py-3 flex flex-row justify-between rounded-t-lg text-white text-xs text-semibold">
                  <section>Pending Since</section>
                  <section className="font-semibold">
                    {Math.abs(
                      getDifferenceInMinutes(taskManObj?.due_date, '')
                    ) > 60
                      ? Math.abs(
                          getDifferenceInMinutes(taskManObj?.due_date, '')
                        ) > 1440
                        ? `${getDifferenceInDays(
                            taskManObj?.due_date,
                            ''
                          )} Days `
                        : `${getDifferenceInHours(
                            taskManObj?.due_date,
                            ''
                          )} Hours `
                      : `${getDifferenceInMinutes(
                          taskManObj?.due_date,
                          ''
                        )} Min`}
                    {getDifferenceInMinutes(taskManObj?.due_date, '') < 0
                      ? 'Due'
                      : 'Left'}
                  </section>
                </div>
              )}
              {taskManObj?.status == 'Done' && (
                <div className="w-full bg-[#56d1e0] px-2 py-3 flex flex-row justify-between rounded-t-lg text-white text-xs text-semibold">
                  <section>Closed On</section>
                  <section className="font-semibold">
                    {prettyDateTime(taskManObj?.closedOn)}
                  </section>
                </div>
              )}
              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold p-4  border-b border-[#eef2f4]">
                <div className="w-[110px]">Deadline:</div>
                <div>{prettyDateTime(taskManObj?.due_date)}</div>
              </div>

              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold border-b p-4 border-[#eef2f4]">
                <div className="w-[110px]">Created On:</div>
                <div>{prettyDateTime(taskManObj?.created_on)}</div>
              </div>
              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold border-b p-4 pb-1 border-[#eef2f4]">
                <div className="w-[110px]">Created By</div>
              </div>
              <div className="text-[#0b66c3] ml-2 mt-1 text-sm">
                {taskManObj?.by_email}
              </div>
              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold border-b p-4 pb-1 border-[#eef2f4]">
                <div className="w-[110px]">Responsible person</div>
              </div>
              <div className="text-[#0b66c3] ml-2 text-sm mt-1">
                {taskManObj?.to_email}
              </div>
              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold border-b p-4 pb-1 border-[#eef2f4]">
                <div className="w-[110px]">Participants</div>
              </div>
              <div className="text-[#0b66c3] ml-2 text-sm mt-1 mb-2">
                {taskManObj?.participantsA?.map((data, i) => {
                  return (
                    <div key={i} className="text-[#0b66c3]  text-sm mt-1">
                      {data?.label}{' '}
                    </div>
                  )
                })}
              </div>
              <div className="w-[100%]  px-2 py-3 rounded-t-lg flex flex-row text-xs text-semibold border-b p-4 pb-1 border-[#eef2f4]">
                <div className="w-[110px]">Attachments</div>
              </div>
              <div className="text-[#0b66c3] ml-2 text-sm mt-1">
                {taskManObj?.attachmentsA?.map((data, i) => {
                  console.log('attachments', data)
                  return (
                    <div className="flex flex-row justify-between" key={i}>
                      <div key={i} className="text-[#0b66c3]  text-xs mt-1">
                        {data?.name}
                      </div>
                      {/* <a
                        href={data?.url}
                        download="MyExampleDoc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer mt-[8px] mr-2 inline-block text-gray-400 " />
                      </a> */}
                      <button
                        onClick={() => downloadImage(data?.url, data?.name)}
                      >
                        {' '}
                        <ArrowCircleDownIcon className="w-4 h-4 cursor-pointer mt-[8px] mr-2 inline-block text-gray-400 " />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {showEditTask && (
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col  rounded-lg bg-white  ">
            <div className="mt-0">
              {/* new one */}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  taskTitle: taskManObj?.title || '',
                  taskdesc: taskManObj?.desc || '',
                  assignedTo: taskManObj?.to_uid || '',
                  assignedToObj:
                    {
                      uid: taskManObj?.to_uid,
                      email: taskManObj?.to_email,
                      name: taskManObj?.to_name,
                    } || {},
                  followers: taskManObj?.participantsA || [],
                  priorities: taskManObj?.priority === 'high',
                  file: '',
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
                    <div className="mt-  rounded-lg bg-white mx-4 py-1">
                      <div className="flex flex-col pt-0 my-10 mx-4 mt-[10px] rounded">
                        <div className="  outline-none">
                          <div className="flex flex-row border-b border-gray border-b pb-1 border-[#edeef0]">
                            <div className="w-full flex flex-col mt-1 ">
                              <Field
                                name="taskTitle"
                                type="text"
                                value={formik?.values?.taskTitle}
                                onChange={(value) => {
                                  console.log('vaue is ', value.target.value)
                                  formik.setFieldValue(
                                    'taskTitle',
                                    value.target.value
                                  )
                                }}
                                // value={taskTitle}
                                // onChange={(e) => {
                                //   console.log('any error ', e, e.target.value)

                                //   // if (e.target.value === '') {
                                //   //   setClicked(false)
                                //   //   setHover(true)
                                //   // }
                                //   setAddCommentTitle(e.target.value)
                                // }}
                                placeholder="Things to do"
                                className={`w-full  pb-2 pt-1 outline-none text-[18px] font-bodyLato focus:border-blue-600 hover:border-blue-600  ${
                                  true ? ' text-[33475b] ' : ' text-[33475b]'
                                } bg-white`}
                              ></Field>
                            </div>

                            <div className="flex flex-row">
                              <input
                                data-bx-id="task-edit-priority-cb"
                                type="checkbox"
                                name="priorities"
                                checked={prior}
                                className="mb-[5px]"
                                onChange={(value) => {
                                  setPrior(!prior)
                                  const priorTxt = prior ? 'high' : 'medium'
                                  formik.setFieldValue('priorities', priorTxt)
                                  console.log('is this checked ', priorTxt)
                                }}
                              />

                              <div className="w-[85px] ml-1 mt-[8px] text-sm text-[#00000080]">
                                High Priority
                              </div>
                              <FireIcon
                                className={`w-4 h-4 mt-[11px] ${
                                  prior ? 'text-[#f36b00]' : 'text-[#00000080] '
                                } `}
                              />
                            </div>
                          </div>

                          <ErrorMessage
                            component="div"
                            name={'taskTitle'}
                            className="error-message text-red-700 text-xs mt-[1px]  "
                          />
                          <div className="flex flex-row border-b border-gray border-b pb-1 border-[#edeef0]">
                            <textarea
                              name="taskdesc"
                              type="text"
                              value={formik?.values?.taskdesc}
                              onChange={(value) => {
                                console.log('vaue is ', value.target.value)
                                formik.setFieldValue(
                                  'taskdesc',
                                  value.target.value
                                )
                              }}
                              placeholder="Description"
                              className={`w-full h-[170px] pb-2 pt-2 outline-none text-[14px] font-bodyLato focus:border-blue-600 hover:border-blue-600  ${
                                true ? ' text-[33475b] ' : ' text-[33475b]'
                              } bg-white`}
                            ></textarea>
                          </div>
                          <section className="mt-1 px-4 rounded-lg bg-[#f8f9fa] border border-gray-100 ">
                            <section className="flex flex-row mt-3">
                              <label className="label mt-3 w-[92px] font-regular text-[12px] block mb-1 text-gray-700">
                                {'Responsible person*'}
                              </label>

                              <div className="w-full flex flex-col mt-1 ">
                                <CustomSelectNew
                                  name="assignedTo"
                                  label="Assigned To"
                                  showLabel={false}
                                  placeholder="Name"
                                  className="input mt-[3px]"
                                  onChange={(value) => {
                                    formik.setFieldValue(
                                      'assignedTo',
                                      value.value
                                    )
                                    formik.setFieldValue('assignedToObj', value)
                                  }}
                                  value={formik.values.assignedTo}
                                  // options={aquaticCreatures}
                                  options={usersList}
                                />

                                <p
                                  className="text-sm text-red-500 hidden mt-3"
                                  id="error"
                                >
                                  Please fill out this field.
                                </p>
                              </div>
                            </section>
                            <section className="flex flex-row mt-3">
                              <label className="label mt-3 w-[92px] font-regular text-[12px] block mb-1 text-gray-700">
                                {'Participants'}
                              </label>

                              <div className="w-full flex flex-col mt-1 ">
                                <Select
                                  isMulti
                                  placeholder="Add Participants"
                                  name="followers"
                                  onChange={(value) => {
                                    // const {uid, name} = value
                                    console.log('followers are', value)

                                    formik.setFieldValue('followers', value)
                                  }}
                                  options={usersList}
                                  formatOptionLabel={formatOptionLabel}
                                  value={formik?.values?.followers || []}
                                  className="basic-multi-select w-full"
                                  classNamePrefix="myselect"
                                  styles={customStyles}
                                />

                                <p
                                  className="text-sm text-red-500 hidden mt-3"
                                  id="error"
                                >
                                  Please fill out this field.
                                </p>
                              </div>
                            </section>

                            <div className="md:flex flex-row md:space-x-4 mt-3 w-full text-xs mt-3 ">
                              {/* <div className="mb-3 space-y-2 w-full text-xs mt-">
                            <TextField label="Size*" name="size" type="text" />
                          </div> */}
                              <div className="flex flex-row">
                                <label className="label font-regular text-[12px] block mb-1 text-gray-700">
                                  Deadline
                                </label>
                                <div className="bg-green border ml-[32px] pl-2 rounded flex flex-row h-[32px] ">
                                  <CalendarIcon className="w-4  inline text-[#058527]" />
                                  <span className="inline">
                                    <CustomDatePicker
                                      className="mt-[5px] pl- px-2  inline text-sm "
                                      selected={startDate}
                                      onChange={(date) => setStartDate(date)}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      injectTimes={[
                                        setHours(setMinutes(d, 1), 0),
                                        setHours(setMinutes(d, 5), 12),
                                        setHours(setMinutes(d, 59), 23),
                                      ]}
                                      dateFormat="MMM d, yyyy h:mm aa"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="w-full flex flex-row my-3 mt-6">
                                {/* <TextField
                              type="file"
                              name="file"
                              label="Add file"
                              className="mt-[-3px] border border-gray-300 w-full rounded h-[36px] pt-0.5 pl-1"
                            /> */}

                                {/* <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="file_input"
                            >
                              Upload file
                            </label> */}
                                {/* <input
                                  className="block w-full text-sm text-gray-900 border border-blue-300 rounded-sm cursor-pointer bg-blue-50  focus:outline-none "
                                  id="file_input"
                                  type="file"
                                  name="file"
                                /> */}
                              </div>
                            </div>
                            <div className=" mt-3">
                              <FileList files={files} removeFile={removeFile} />

                              <FileUpload
                                files={files}
                                setFiles={setFiles}
                                removeFile={removeFile}
                              />
                            </div>
                          </section>
                          {/* <div className="w-full flex flex-col  ">
                          <CustomSelect
                            name="priorities"
                            label="Priority"
                            className="input mt-"
                            onChange={(value) => {
                              formik.setFieldValue('priorities', value.value)
                            }}
                            value={formik.values.priorities}
                            // options={aquaticCreatures}
                            options={[
                              { label: 'Low', value: 'low' },
                              { label: 'Medium', value: 'medium' },
                              { label: 'High', value: 'high' },
                            ]}
                          />
                          <p
                            className="text-sm text-red-500 hidden mt-3"
                            id="error"
                          >
                            Please fill out this field.
                          </p>
                        </div> */}
                        </div>
                        {/* <span className="text-[#0091ae]">
                    Save
                    <ArrowRightIcon className="w-5 ml-5" />
                  </span> */}
                      </div>
                    </div>
                    <div className="flex flex-row z-10 justify-between mt-4 pb-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
                      <section></section>
                      <section className="flex flex-row ">
                        {formMessage === 'Task Edited..!' && (
                          <p className=" flex text-md text-slate-800 mt-4">
                            <img
                              className="w-[18px] h-[18px] inline mr-2"
                              alt=""
                              src="/ok.gif"
                            />
                            <span className="mt- text-[12px]">
                              {formMessage}
                            </span>
                          </p>
                        )}
                        <button
                          // onClick={() => fAddSchedule()}
                          className={`flex mt-2 ml-4 cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium  text-[#535c69]  bg-[#bbed21]   hover:shadow-lg `}
                        >
                          <span className="ml-1 ">Edit Task</span>
                        </button>
                        {/* <button
                        // onClick={() => fAddSchedule()}
                        className={`flex mt-2 ml-4 cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium  border border-[#c6cdd3] text-[#535b69] hover:shadow-lg   `}
                      >
                        <span className="ml-1 ">
                          Add Task & Close
                        </span>
                      </button> */}

                        <button
                          // onClick={() => fSetLeadsType('Add Lead')}
                          // onClick={() => cancelResetStatusFun()}
                          onClick={() => dialogOpen(false)}
                          className={`flex mt-2 ml- rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium `}
                        >
                          <span className="ml-1 ">Cancel</span>
                        </button>
                      </section>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewEditTaskManForm
