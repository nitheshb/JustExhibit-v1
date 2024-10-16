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
  getUnits,
  getUnitsAllBlocks,
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

const ProjectInventorySummaryReport = ({
  title,
  subtitle,
  leadsLogsPayload,
  dialogOpen,
  setCustomerDetails,
  setisImportLeadsOpen,
  selUnitStatus
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [selectedOption, setSelectedOption] = useState('All')

  const { enqueueSnackbar } = useSnackbar()
  const [usersList, setusersList] = useState([])

  const [leadsData, setLeadsData] = useState([])
  const [loadingIcon, setLoadingIcon] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [leadsFilA, setLeadsFilA] = useState([])
  const [unitsFeed, setUnitsFeed] = useState([])
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
    getUnitsFun()
    getProjectsListFun()
  }, [leadsLogsPayload])
  const getUnitsFun = async () => {

    const todoData = await getUnitsAllBlocks(
      orgId,
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeed([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          x.uid = docSnapshot.id
          x.id = docSnapshot.id
          const { staDA } = x
          y.push(x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
console.log('units feed is ', y);
        setUnitsFeed(y)
      },
      { pId: leadsLogsPayload?.uid, blockId:  1, type: 'today', selUnitStatus },
      (error) => {
        console.log('error', error)
      }
    )
    await console.log('what are we', todoData)
  }
  const getProjectsListFun = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setprojectList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
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
  const inventoryListData = [
    {
      unitNo: 'A101',
      unitType: '2BHK',
      unitFacing: 'North',
      unitArea: '950',
      releaseStatus: 'Available',
      pricePerSft: '5000',
      plc: '200',
      dimensions: {
        north: '10m',
        south: '10m',
        east: '8m',
        west: '8m',
      },
      schedule: {
        north: '2m',
        south: '4m',
        east: '7m',
        west: '8m',
      },
      sNo: '001',
      khataha: 'XX123',
      pid: 'PID001',
      unitCost: '5250000',
      unitStatus: 'Ready',
    },
    {
      unitNo: 'B202',
      unitType: '3BHK',
      unitFacing: 'South',
      unitArea: '1200',
      releaseStatus: 'Sold',
      pricePerSft: '6000',
      plc: '250',
      dimensions: {
        north: '12m',
        south: '12m',
        east: '10m',
        west: '10m',
      },
      schedule: {
        north: '25m',
        south: '25m',
        east: '25m',
        west: '5m',
      },
      sNo: '002',
      khataha: 'YY456',
      pid: 'PID002',
      unitCost: '6300000',
      unitStatus: 'Occupied',
    },
  ]
  const filteredInventoryList = inventoryListData.filter((item) => {
    switch (selectedOption) {
      case 'Unit Type':
        return item.unitType === selectedOption
      case 'Unit Facing':
        return item.unitFacing === selectedOption
      case 'Unit Status':
        return item.unitStatus === selectedOption
      case 'Unit Area':
        return item.unitArea === selectedOption
      default:
        return true
    }
  })
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 flex flex-row justify-between">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3  font-Playfair tracking-wider">
          {subtitle || title} ({leadsFilA.length || 0})
        </Dialog.Title> */}
         {leadsLogsPayload?.projectName || title} Units-({unitsFeed.length})
        <section className="flex flex-row">
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


          <Tooltip title={`Download ${unitsFeed?.length} Row`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader
              className="mr-6 h-[20px] w-[20px]"
              downloadRows={unitsFeed}
              sourceTab="visitsReport"
              style={{ height: '20px', width: '20px' }}
            />
          </Tooltip>
        </section>
      </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className="min-w-max w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-200 text-gray-900  text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-center border border-black"
                    colSpan="9"
                  >
                    Inventory List of {leadsLogsPayload?.projectName}
                  </th>
                  <th
                    className="py-3 px-6 text-center border border-black  bg-white"
                    colSpan="4"
                  >
                    Dimensions *(m)
                  </th>
                  <th
                    className="py-3 px-6 text-center border border-black bg-white"
                    colSpan="4"
                  >
                    Schedule
                  </th>
                  <th
                    className="py-3 px-6 text-center border border-black bg-white"
                    colSpan="1"
                  ></th>
                  <th
                    className="py-3 px-6 text-center border border-black bg-white"
                    colSpan="1"
                  ></th>
                  <th
                    className="py-3 px-6 text-center border border-black bg-white"
                    colSpan="1"
                  ></th>
                </tr>
                <tr className="bg-blue-100 text-gray-900  text-sm leading-normal">
                  <th className="py-3 px-6 text-left border border-black">
                    Unit No.
                  </th>
                  <th className="py-3 px-6 text-left border border-black">
                    Unit Type
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Unit Facing
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Unit Area
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Release Status
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Price Per Sft
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    PLC
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Unit Cost
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Unit Status
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    North
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    South
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    East
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    West
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    North
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    South
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    East
                  </th>
                  <th className="py-2 px-3 text-center border border-black">
                    West
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    S No.
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    Khataha
                  </th>
                  <th className="py-3 px-6 text-center border border-black">
                    PID
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-900 text-sm font-light">
                {unitsFeed.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-6 text-left border border-black">
                      {item?.unit_no}
                    </td>
                    <td className="py-3 px-6 text-left border border-black">
                      {item?.size}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.facing}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.area}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.release_status}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.sqft_rate}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.plc_per_sqft}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.unitCost || 'NA'}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.status}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.north_d}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.south_d}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.east_d}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.west_d}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.north_sch_by}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.south_sch_by}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.east_sch_by}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.west_sch_by}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.sNo || 'na'}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.Katha_no}
                    </td>
                    <td className="py-3 px-6 text-center border border-black">
                      {item?.PID_no}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-200 text-gray-900  text-sm leading-normal">
                  <td className="py-3 px-6 text-left border border-black">
                    Totals:
                  </td>
                  <td className="py-3 px-6 text-left border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                  <td className="py-3 px-6 text-center border border-black"></td>
                </tr>
              </tbody>
            </table>
          </div>

    </div>
  )
}

export default ProjectInventorySummaryReport
