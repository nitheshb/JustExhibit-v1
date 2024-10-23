import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { Add, Remove } from '@mui/icons-material'
import {
  InputAdornment,
  TextField as MuiTextField,
  Tooltip,
  IconButton,
} from '@mui/material'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import { AreaConverter } from 'src/components/AreaConverter'
import AssigedToDropComp from 'src/components/assignedToDropComp'
import Loader from 'src/components/Loader/Loader'
import LogSkelton from 'src/components/shimmerLoaders/logSkelton'
import {
  developmentTypes,
  projectPlans,
  statesList,
} from 'src/constants/projects'
import {
  createProject,
  getAllProjects,
  getLeadbyId1,
  steamBankDetailsList,
  steamUsersListByRole,
  updateLeadsLogWithProject,
  updateProject,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import SkeletonLoaderPage from 'src/pages/SkeletonLoader/skeletonLoaderPage'
import CSVDownloader from 'src/util/csvDownload'
import { prettyDate, prettyDateTime } from 'src/util/dateConverter'
import { CustomRadioGroup } from 'src/util/formFields/CustomRadioGroup'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import {
  SlimDateSelectBox,
  SlimSelectBox,
} from 'src/util/formFields/slimSelectBoxField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { TextField } from 'src/util/formFields/TextField'

const LeadsTransferTableBody = ({
  title,
  subtitle,
  leadsLogsPayload,
  dialogOpen,
  setCustomerDetails,
  setisImportLeadsOpen,
  setSelectedIds,
  selectedIds,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  const { enqueueSnackbar } = useSnackbar()
  const [usersList, setusersList] = useState([])

  const [leadsData, setLeadsData] = useState([])
  const [loadingIcon, setLoadingIcon] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [leadsFilA, setLeadsFilA] = useState([])
  const [selProjectIs, setSelProject] = useState({
    label: 'All Events',
    value: 'allprojects',
  })
  const [selVisitDoneBy, setVisitDoneBy] = useState({
    label: 'All Executives',
    value: 'allexecutives',
  })
  const [selVisitFixedBy, setVisitFixedBy] = useState({
    label: 'All Executives',
    value: 'allexecutives',
  })

  const [selProjectEmpIs, setSelProjectEmp] = useState({
    label: 'All Events',
    value: 'allprojects',
  })

  useEffect(() => {
    console.log('use effect stuff', leadsLogsPayload)
    getProjectsListFun()
  }, [leadsLogsPayload])

  const getProjectsListFun = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setprojectList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.uid
        })
        console.log('fetched users list is', projectsListA)

        setprojectList([
          ...projectsListA,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }
  useEffect(() => {
    let projectFilAarray = [...leadsLogsPayload]
    if (selProjectIs?.value === 'allprojects') {
      console.log('project list i s', projectList)
      // setFiltProjectListTuned(projectList);

      leadsSerialDatafun()
    } else {
      // projectFilAarray = projectFilAarray.filter((d) => d.projectId === selProjectIs?.value);
      projectFilAarray = projectFilAarray.filter(
        (d) => d.Event === selProjectIs?.label
      )

      leadsSerialDatafun()
      // setFiltProjectListTuned(z);
      // viewSource
    }

    if (selVisitFixedBy?.value === 'allexecutives') {
      console.log('project list i s', projectList)
      // setFiltProjectListTuned(projectList);

      leadsSerialDatafun()
    } else {
      projectFilAarray = projectFilAarray.filter(
        (d) => d.visitFixedBy === selVisitFixedBy?.value
      )

      leadsSerialDatafun()
      // setFiltProjectListTuned(z);
      // viewSource
    }
    if (selVisitDoneBy?.value === 'allexecutives') {
      console.log('project list i s', projectList)
      // setFiltProjectListTuned(projectList);

      leadsSerialDatafun()
    } else {
      projectFilAarray = projectFilAarray.filter(
        (d) => d.by === selVisitDoneBy?.value
      )

      leadsSerialDatafun()
      // setFiltProjectListTuned(z);
      // viewSource
    }

    setLeadsFilA(projectFilAarray)
  }, [projectList, selProjectIs, selVisitDoneBy, selVisitFixedBy])

  const leadsSerialDatafun = async () => {
    const streamedTodo = []
    setLoadingIcon(true)
    try {
      const y = await Promise.all(
        leadsLogsPayload.map(async (logData) => {
          const { Luid } = logData
          const x = await getLeadbyId1(orgId, Luid)
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
            CT,
            assignedTo,
            assignedToObj,
            coveredA,
          } = await x

          logData.Event = Event
          logData.Name = Name
          logData.id = Luid
          logData.ProjectId = ProjectId
          logData.Status = Status
          logData.Source = Source
          logData.leadOwner = by
          logData.Mobile = Mobile
          logData.Date = Date
          logData.Email = Email
          logData.Assigned = Assigned
          logData.AssignedBy = AssignedBy
          logData.Notes = Notes
          logData.Timeline = Timeline
          logData.documents = documents
          logData.Remarks = Remarks
          logData.notInterestedReason = notInterestedReason
          logData.notInterestedNotes = notInterestedNotes
          logData.stsUpT = stsUpT
          logData.assignT = assignT
          logData.CT = CT
          logData.assignedTo = assignedTo
          logData.assignedToObj = assignedToObj
          logData.coveredA = coveredA
          logData.Time = prettyDate(logData?.T).toLocaleString()
          return logData
        })
      )
      const z = { Event: y?.Event, Time: y.Time }
      setLeadsData(y)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingIcon(false)
    }

    console.log('what matters', streamedTodo)
    await setLeadsData(streamedTodo)
  }
  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.email
        })
        setusersList(usersListA)
      },
      (error) => setusersList([])
    )

    return unsubscribe
  }, [])

  const selLeadFun = (data) => {
    console.log('data is ', data)
    setisImportLeadsOpen(true)
    setCustomerDetails(data)
  }
  const setNewProject = (leadDocId, value) => {
    setSelProject(value)
  }
  const setVisitDoneByFun = (leadDocId, value) => {
    setVisitDoneBy(value)
  }
  const setVisitFixedByFun = (leadDocId, value) => {
    setVisitFixedBy(value)
  }

  const idExists = (arr, targetId) => arr.some(({ id }) => id === targetId)
  const handleCheckboxChange = (data) => {
    if (idExists(selectedIds, data?.id)) {
      setSelectedIds(
        selectedIds.filter((selectedId) => selectedId.id !== data?.id)
      )
    } else {
      setSelectedIds([...selectedIds, data])
    }
  }

  const handleSelectAllChange = () => {
    if (checkboxCount === leadsFilA.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(leadsFilA)
    }
  }

  const checkboxCount = selectedIds.length

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">

      <div className="px-4 sm:px-6  z-10 flex flex-row justify-between">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3  font-Playfair tracking-wider">
          {subtitle || title} ({leadsFilA.length || 0})
        </Dialog.Title> */}
        {'Leads'} ({leadsFilA.length || 0})
        <section className="flex flex-row">
          <button className="ml-2 px-3 py-1 rounded-lg bg-transparent text-blue-800 font-bold text-sm">
            {checkboxCount} Selected
          </button>
          <section className="flex flex-col border ml-2 py-1  px-4 text-xs  rounded-full">
            <AssigedToDropComp
              assignerName={selProjectIs?.label}
              id={'id'}
              align="right"
              setAssigner={setNewProject}
              usersList={[
                ...[{ label: 'All Events', value: 'allprojects' }],
                ...projectList,
              ]}
            />
            <div className="font-md text-xs text-gray-500 mb-[px] tracking-wide mr-4">
              Event {}
            </div>
          </section>



          <Tooltip title={`Download ${selectedIds.length} Row`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader
              className="mr-6 h-[20px] w-[20px]"
              downloadRows={selectedIds}
              sourceTab="visitsReport"
              style={{ height: '20px', width: '20px' }}
            />
          </Tooltip>
        </section>
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col m-4">
          <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
            {/* <CustomRadioGroup
              label="Type"
              value={selected}
              options={projectPlans}
              onChange={setSelected}
            /> */}
            {loadingIcon ? (
              <LogSkelton />
            ) : (
              <table className="min-w-full text-center mt-6">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className={`text-sm font-medium text-gray-900 px-6 py-4`}
                      // style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <label
                        htmlFor="selectAllCheckbox"
                        style={{ marginRight: '8px' }}
                      >
                        <input
                          id="selectAllCheckbox"
                          type="checkbox"
                          checked={
                            checkboxCount === leadsFilA.length &&
                            leadsFilA.length > 0
                          }
                          onChange={handleSelectAllChange}
                        />
                      </label>
                    </th>

                    {[
                      { label: 'sNo', id: 'no' },
                      { label: 'Event', id: 'label' },
                      { label: 'Lead Ph', id: 'all' },
                      { label: 'Status', id: 'new' },

                      { label: 'Source', id: 'new' },

                      { label: 'Executive', id: 'all' },
                      { label: 'Created on', id: 'all' },

                    ].map((d, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                          ['Event', 'Lead Name'].includes(d.label)
                            ? 'text-left'
                            : ''
                        }`}
                      >
                        {d?.label?.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {leadsFilA?.map((data, i) => {
                    return (
                      <tr
                        className={`  ${
                          i % 2 === 0
                            ? 'bg-white border-blue-200'
                            : 'bg-gray-100'
                        }`}
                        key={i}
                        onClick={() => selLeadFun(data)}
                      >
                        <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                          <label>
                            <input
                              type="checkbox"
                              checked={idExists(selectedIds, data.id)}
                              onChange={(e) => {
                                e.stopPropagation()
                                handleCheckboxChange(data)
                              }}
                            />
                          </label>
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                          {i + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                          {data?.Event}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap text-left">
                          {data?.Mobile}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {data?.Status}
                        </td>


                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {data?.Source}
                        </td>


                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {data?.assignedToObj?.name}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {prettyDateTime(data?.Date)}
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-0"></div>
        </div>
      </div>
    </div>
  )
}

export default LeadsTransferTableBody
