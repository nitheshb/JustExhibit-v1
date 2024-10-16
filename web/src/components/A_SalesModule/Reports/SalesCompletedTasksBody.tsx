import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { Add, Remove } from '@mui/icons-material'
import {
  InputAdornment,
  TextField as MuiTextField,
  Tooltip,
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
  streamBookedLeads,
  sourceBookedLeads,
  streamSalesActitvityLogReportData,
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

const SalesCompletedTasksBody = ({
  title,
  subtitle,
  leadsLogsPayload: projectPayload,
  dialogOpen,
  setCustomerDetails,
  setisImportLeadsOpen,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  const { enqueueSnackbar } = useSnackbar()
  const [usersList, setusersList] = useState([])

  const [leadsData, setLeadsData] = useState([])
  const [loadingIcon, setLoadingIcon] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [leadsFilA, setLeadsFilA] = useState([])

  const [leadsFetchedData, setLeadsFetchedData] = useState([])

  useEffect(() => {
    getLeadsData()
  }, [])
  useEffect(() => {
    console.log('payload is ', projectPayload)
    getLeadsData()
  }, [projectPayload])

  const getLeadsData = async () => {
    console.log('count is ', projectPayload);
    const unsubscribe = await streamSalesActitvityLogReportData(
      orgId,
      {
        pId: projectPayload?.uid,
        startTime: projectPayload.thisMonth['startOfMonth'],
        endTime: projectPayload.thisMonth['endOfMonth'],
      },
    )
    const y = await unsubscribe
    setLeadsFetchedData(y)
    return unsubscribe
  }
  const selLeadFun = (data) => {
    console.log('data is ', data)
    setisImportLeadsOpen(true)
    setCustomerDetails(data)
  }
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 flex flex-row justify-between">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3  font-Playfair tracking-wider">
          {subtitle || title} ({leadsFilA.length || 0})
        </Dialog.Title> */}
        {subtitle || title} ({leadsFilA.length || 0})
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
                    {' '}
                    {[
                      { label: 'sNo', id: 'no' },
                      { label: 'Task Owner', id: 'label' },
                      { label: 'Type', id: 'all' },
                      { label: 'From', id: 'new' },
                      { label: 'To', id: 'all' },
                      { label: 'Time', id: 'all' },
                      { label: 'Lead Id', id: 'new' },

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
                        {d.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {leadsFetchedData?.map((data, i) => {
                    console.log('Employee Tasks', data);
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
                          {i + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                          {data?.by}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap text-left">
                          {data?.type}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {data?.from}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                        {data?.to}
                        </td>
                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {prettyDateTime(data?.T)}
                        </td>

                        <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                          {data?.Luid}
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

export default SalesCompletedTasksBody
