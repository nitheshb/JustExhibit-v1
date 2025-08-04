import { useEffect, useState } from 'react'

import { Tabs } from '@material-ui/core'
import { Tab } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import { TabList } from '@mui/lab'
import {
  Box as Section,
  Card,
  Grid,
  styled,
  Tooltip,
  IconButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next' // styled components

import DropCompUnitStatus from 'src/components/dropDownUnitStatus'
import LogSkelton from 'src/components/shimmerLoaders/logSkelton'
import { prettyDate } from 'src/util/dateConverter'
import ExcelDownloader from 'src/util/excelDownload'

import UnitSummaryTableBody from './BookingSummaryTable'

const rowsCounter = (parent, searchKey) => {
  return searchKey === 'all'
    ? parent
    : parent.filter(
        (item) =>
          (item?.unitStatus?.toLowerCase() || item?.status?.toLowerCase()) ===
          searchKey.toLowerCase()
      )
}

const UnitBookingSummaryTableLayout = ({
  setFetchLeadsLoader,
  setisImportLeadsOpen,
  fetchLeadsLoader,
  selUserProfileF,
  leadsFetchedData,
  leadsTyper,
  searchVal,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('all')
  const [tableData, setTableData] = useState([])
  const [tabHeadFieldsA, settabHeadFieldsA] = useState([])

  const [statusSepA, setStatusSepA] = useState([])

  // const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [finalKeyA, setFinalKeyA] = useState([])

  useEffect(() => {
    // axios
    //   .get('/api/tableData1/all')
    //   .then(({ data }) => {
    //     setTableData(tableData1)
    //   })
    //   .catch((error) => {
    //     // setTableData(tableData1)
    //     console.log(error)
    //   })

    const tabHeadFieldsA1 = [
      { value: 'all', lab: 'All', val: 'all' },
      { value: 'booked', lab: 'Booked' },
      { value: 'allotment', lab: 'Allotment' },
      { value: 'ATS', lab: 'Agreement' },
      { value: 'registered', lab: 'Registered' },
      { value: 'construction', lab: 'Construction' },
      { value: 'possession', lab: 'Possession' },
    ]

    settabHeadFieldsA(tabHeadFieldsA1)

    leadsTyper === 'inProgress'
      ? setValue('all')
      : leadsTyper === 'archieveLeads'
      ? setValue('archieve_all')
      : setValue('booked')
  }, [])
  const [val, setVal] = React.useState('one')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setVal(newValue)
  }

  const archieveTab = [
    { lab: 'Archieve', val: 'archieve_all' },
    { lab: 'Dead', val: 'dead' },
    { lab: 'Not Interested', val: 'notinterested' },
    { lab: 'Blocked', val: 'blocked' },
    { lab: 'Junk', val: 'junk' },
  ]
  const [activeAll, setactiveAll] = React.useState<boolean>(true)
  const [activeNew, setactiveNew] = React.useState<boolean>(false)
  const [activeFollow, setactiveFollow] = React.useState<boolean>(false)
  const [activeVisitFixed, setactiveVisitFixed] = React.useState<boolean>(false)
  const [activeNeg, setactiveNeg] = React.useState<boolean>(false)
  const [activeUn, setactiveUn] = React.useState<boolean>(false)
  const [activeArch, setactiveArch] = React.useState<boolean>(true)
  const [activeDead, setactiveDead] = React.useState<boolean>(false)
  const [activeBlock, setactiveBlock] = React.useState<boolean>(false)
  const [activeJunk, setactiveJunk] = React.useState<boolean>(false)
  const [activeNotIn, setactiveNotIn] = React.useState<boolean>(false)
  const [activeBook, setactiveBook] = React.useState<boolean>(true)
  const [newStatusA, setNewStatusA] = useState([])
  const [followupA, setfollowupA] = useState([])
  const [mySelRows, setmySelRows] = useState([])
  const [viewUnitStatusA, setViewUnitStatusA] = React.useState([
    'Phone No',
    'Last Activity',
  ])

  const newStatus = []
  const followup = []
  const all = leadsFetchedData
  const visitfixed = []
  const visitdone = []
  const vistcancel = []
  const negotiation = []
  const unassigned = []
  const others = []
  const findCount = (val) => {
    if (val === 'new') {
      return newStatus.length
    } else if (val === 'all') {
      return all.length
    } else if (val === 'followup') {
      return followupA.length
    } else if (val === 'visitfixed') {
      return visitfixed.length
    } else if (val === 'visitdone') {
      return visitdone.length
    } else if (val === 'negotiation') {
      return negotiation.length
    } else if (val === 'unassigned') {
      return unassigned.length
    }
  }
  const CheckActive = () => {}
  useEffect(() => {
    // split data as per
    console.time('query Fetch Time')
    console.timeLog('query Fetch Time')
    console.log('query Fetch Time', leadsFetchedData)
    return
    for (let i = 0; i < leadsFetchedData.length; i++) {
      // your operations

      switch (leadsFetchedData[i].Status.toLowerCase()) {
        case 'new':
          return newStatus.push(leadsFetchedData[i])
        case 'followup':
          console.log('loop for followup')
          followup.push(leadsFetchedData[i])
          return setNewStatusA(followup)
        case 'visitfixed':
          return visitfixed.push(leadsFetchedData[i])
        case 'visitdone':
          return visitdone.push(leadsFetchedData[i])
        case 'vistcancel':
          return vistcancel.push(leadsFetchedData[i])
        case 'negotiation':
          return negotiation.push(leadsFetchedData[i])
        case 'unassigned':
          return unassigned.push(leadsFetchedData[i])
        default:
          return others.push(leadsFetchedData[i])
      }
    }
    return
    const leadsHeadA =
      leadsTyper === 'inProgress'
        ? [
            { lab: 'In Progress', val: 'all' },
            { lab: 'New', val: 'new' },
            { lab: 'Follow Up', val: 'followup' },
            { lab: 'Visit Fixed', val: 'visitfixed' },
            { lab: 'Visit Done', val: 'visitdone' },
            { lab: 'Visit Cancel', val: 'visitcancel' },
            { lab: 'Negotiation', val: 'negotiation' },
            // { lab: 'Reassign', val: 'reassign' },
            // { lab: 'RNR', val: 'RNR' },
            { lab: 'Un Assigned', val: 'unassigned' },
            // { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
        : leadsTyper === 'archieveLeads'
        ? archieveTab
        : [
            { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
    const y = {}

    const z1 = []
    const whole = {
      new: [],
      followup: [],
      all: [],
      visitfixed: [],
      visitdone: [],
      vistcancel: [],
      negotiation: [],
      unassigned: [],
      others: [],
    }
    const bookedArr = {
      booked: [],
      all: [],
      others: [],
    }

    const archieveArr = {
      archieve_all: [],
      all: [],
      dead: [],
      notinterested: [],
      blocked: [],
      junk: [],
      others: [],
    }
    // vedant
    if (leadsTyper === 'inProgress') {
      console.log('my Array data is delayer z2', new Date())
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          whole.all.push(fil)

          switch (statusLowerCase) {
            case 'new':
              return whole.new.push(fil)
            case 'followup':
              return whole.followup.push(fil)
            case 'visitfixed':
              return whole.visitfixed.push(fil)
            case 'visitdone':
              return whole.visitdone.push(fil)
            case 'vistcancel':
              return whole.vistcancel.push(fil)
            case 'negotiation':
              return whole.negotiation.push(fil)
            case 'unassigned':
              return whole.unassigned.push(fil)
            default:
              return whole.others.push(fil)
          }
        })

      console.log('my Array data is delayer z2', z2, z1, whole, new Date())
      setStatusSepA([whole])
    } else if (leadsTyper === 'archieveLeads') {
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          archieveArr.archieve_all.push(fil)

          switch (statusLowerCase) {
            case 'dead':
              return archieveArr.dead.push(fil)
            case 'notinterested':
              return archieveArr.notinterested.push(fil)
            case 'blocked':
              return archieveArr.blocked.push(fil)
            case 'junk':
              return archieveArr.junk.push(fil)
            default:
              return archieveArr.others.push(fil)
          }
        })

      console.log('filter stroke z2', z2, z1, archieveArr)
      setStatusSepA([archieveArr])
    } else {
      const z2 = leadsFetchedData
        .sort((a, b) => b.Date - a.Date)
        .map((fil) => {
          const { Status } = fil

          if (!Status) {
            return
          }

          const statusLowerCase = Status.toLowerCase()

          bookedArr.all.push(fil)

          switch (statusLowerCase) {
            case 'booked':
              return bookedArr.booked.push(fil)
            default:
              return bookedArr.others.push(fil)
          }
        })

      console.log('filter stroke z2', z2, z1, bookedArr)
      setStatusSepA([bookedArr])
    }

    console.log('filter stroke', leadsFetchedData, leadsHeadA, statusSepA)
    console.timeEnd('query Fetch Time')
  }, [leadsFetchedData, tabHeadFieldsA])

  const [filLeadsA, setFilLeadsA] = useState([])
  // useEffect(() => {
  //   setFilLeadsA(leadsFetchedData)
  // }, [leadsFetchedData])
  useEffect(() => {
    console.log('selected value is', value)
    setFetchLeadsLoader(false)
    switch (value) {
      case 'all':
        return setFilLeadsA(leadsFetchedData)
      default:
        return setFilLeadsA(
          leadsFetchedData.filter((dat) => {
            console.log(
              'filtre value is ',
              dat?.unitStatus,
              value,
              (dat?.unitStatus?.toLowerCase() || dat?.status?.toLowerCase()) ==
                'booked'
            )
            return (
              (dat?.unitStatus?.toLowerCase() || dat?.status?.toLowerCase()) ===
              value?.toLowerCase()
            )
          })
        )
    }
  }, [value, leadsFetchedData])
  useEffect(() => {}, [leadsFetchedData])
  const pickCustomViewer = (item) => {
    const newViewer = viewUnitStatusA
    if (viewUnitStatusA.includes(item)) {
      const filtered = newViewer.filter(function (value) {
        return value != item
      })
      setViewUnitStatusA(filtered)
      console.log('reviwed is ', viewUnitStatusA)
    } else {
      setViewUnitStatusA([...newViewer, item])
      console.log('reviwed is add ', viewUnitStatusA)
    }
  }
  return (
    <Section pb={4}>
      <section className="bg-white">
        <Grid container>
          <Grid item xs={12}>
            <div className="border-b border-gray-200 flex flex-row justify-between ">
              <ul
                className="flex flex-wrap -mb-px "
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {tabHeadFieldsA.map((d, i) => {
                  return (
                    <ul
                      value={value}
                      key={i}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example"
                    >
                      <li key={i} className="mr-2" role="presentation">
                        <button
                          className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-700 rounded-t-lg border-b-2   hover:text-gray-600 hover:border-black hover:border-b-2 dark:text-gray-400 dark:hover:text-gray-300  ${
                            value === d.value
                              ? 'border-black text-gray-900 '
                              : 'border-transparent'
                          }`}
                          type="button"
                          role="tab"
                          onClick={() => {
                            setFetchLeadsLoader(true)
                            setValue(d.value)
                            setFetchLeadsLoader(false)
                            setmySelRows(rowsCounter(leadsFetchedData, d.val))
                          }}
                        >
                          <span
                            className={`font-PlayFair text-gray-450 ${
                              value === d.value
                                ? 'text-[#0080ff] text-gray-800 '
                                : ''
                            }`}
                          >
                            {' '}
                            {`${d.lab}`}
                            {
                              <span
                                className={` font-semibold px-2 py-1 rounded-md ml-[4px] active:bg-green-800  ${
                                  activeNew === true
                                    ? 'bg-green-400 text-black '
                                    : 'bg-green-200 text-green-700'
                                } `}
                              >
                                {rowsCounter(leadsFetchedData, d.value).length}
                              </span>
                            }
                          </span>
                        </button>
                      </li>
                    </ul>
                  )
                })}
              </ul>
              <section className="pt-1 mt-2 mx-3">
                <DropCompUnitStatus
                  type={'Show Fields'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={viewUnitStatusA}
                  pickCustomViewer={pickCustomViewer}
                />
                {filLeadsA.length > 0 && (
                  <Tooltip title={`Download ${filLeadsA?.length} Row`}>
                    <ExcelDownloader
                      className="mr-6 h-[20px] w-[20px]"
                      downloadRows={leadsFetchedData}
                      sourceTab="Booking Summary"
                      style={{ height: '20px', width: '20px' }}
                    />
                  </Tooltip>
                )}
              </section>
            </div>

            {fetchLeadsLoader &&
              [1, 2, 3].map((data, i) => <LogSkelton key={i} />)}
            {statusSepA[0]?.[value].length === 0 && (
              <div className="flex items-center py-6">
                <span
                  className="text-xs text-gray-500"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    // width: '50%',
                  }}
                >
                  No Records
                </span>
              </div>
            )}
            {statusSepA[0]?.[value].length != 0 && (
              <UnitSummaryTableBody
                // data={filterTable}
                fetchLeadsLoader={fetchLeadsLoader}
                selStatus={value}
                rowsParent={statusSepA[0]}
                selUserProfileF={selUserProfileF}
                viewUnitStatusA={viewUnitStatusA}
                newArray={statusSepA[0]?.[value]}
                leadsFetchedData={filLeadsA}
                mySelRows={mySelRows}
                searchVal={searchVal}
              />
            )}
          </Grid>
        </Grid>
      </section>
    </Section>
  )
}

export default UnitBookingSummaryTableLayout
