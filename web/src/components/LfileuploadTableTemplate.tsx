import * as React from 'react'
import { Timestamp } from '@firebase/firestore'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import { ConnectingAirportsOutlined, X } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import Highlighter from 'react-highlight-words'

import {
  addStallLeads,
  addStall,
  addUnit,
  capturePaymentS,
  createBookedCompany,
  getLedsData1,
  getProjById1,
  getProject,
  getProjectByUid,
  updateStallAsBooked,
  upSertMortgageUnit,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { prettyDate } from 'src/util/dateConverter'

import CSVDownloader from '../util/csvDownload'

// function createData(
//   Date,
//   Name,
//   Mobile,
//   Email,
//   Event,
//   Source,
//   Empmobile,
//   Note
// ) {
//   return {
//     Date,
//     Name,
//     Mobile,
//     Email,
//     Event,
//     Source,
//     Empmobile,
//     Note,
//   }
// }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'Date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'Currentstatus',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'Email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'Event',
    numeric: false,
    disablePadding: false,
    label: 'Event',
  },

  {
    id: 'Source',
    numeric: true,
    disablePadding: false,
    label: 'Source',
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    searchKey,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  searchkey: PropTypes.number.isRequired || PropTypes.string.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    selStatus,
    filteredData,
    setSearchKey,
    rows,
    sourceTab,
    title,
    pId,
    myBlock,
  } = props
  const d = new window.Date()
  const { enqueueSnackbar } = useSnackbar()

  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)
  const [myProject, setProject] = React.useState({})

  const [unitUploadMessage, setUnitUploadMessage] = React.useState(
    sourceTab === 'validR' ? true : false
  )

  const [uploadedLeadsCount, setUploadedLeadsCount] = React.useState(0)
  const [uploadedUnitsCount, setUploadedUnitsCount] = React.useState(0)
  const [builderbankId, setBuilderbankId] = React.useState('')

  const [uploadIcon, setUploadIcon] = React.useState(
    sourceTab === 'validR' ? true : false
  )

  React.useEffect(() => {
    setRowsAfterSearchKey(rows)
  }, [rows])

  React.useEffect(() => {
    getProjectDetails(pId)
  }, [])
  const { user } = useAuth()

  const { orgId } = user
  const searchKeyField = (e) => {
    // console.log('searched values is ', e.target.value)
    setSearchKey(e.target.value)
    const searchString = e.target.value

    const rowsR = rows.filter((item) => {
      if (searchString == '' || !searchString) {
        console.log('ami here')
        return item
      } else if (
        item.Assignedto.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Mobile.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Event.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Source.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Status.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return item
      }
    })
    setRowsAfterSearchKey(rowsR)
    // setRows(rowsR)
  }
  const addLeadsToDB = async (records) => {
    setUploadIcon(false)
    getLedsData1(orgId)
    const mappedArry = await Promise.all(
      rows.map(async (data, index) => {
        const newData = data
        newData['intype'] = 'bulk'
        newData['by'] = 'bulk'
        // newData['Status'] = 'unassigned'
        console.log('am inside addLeadstoDB', newData)

        await addStallLeads(orgId, newData, user?.email, 'Lead Created by csv')
        setUploadedLeadsCount(index + 1)
        return
        console.log('am inside addLeadstoDB')
      })
    )
    console.log('mappedArry', mappedArry)
  }

  const getProjectDetails = async (id) => {
    const unsubscribe = await getProjectByUid(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProject(projects[0])

        const { builderBankDocId, landlord } = myProject
        if (builderBankDocId) {
          setBuilderbankId(builderBankDocId)
        } else {
          // show bank details not available error
          // vedant
        }
        console.log('set project value is ', projects[0])
      },
      () =>
        setProject({
          eventName: '',
        })
    )

    return unsubscribe
  }
  const insertStallToDb = async (records) => {
    console.log('check it', records.length)
    const mappedArry = await Promise.all(
      records.map(async (data, index) => {
        // console.log()
        await addStall(orgId, data, user?.email, `Unit Created by bulk `)
        await setUploadedUnitsCount(index + 1)
        //   return await addUnit(orgId, newData, user?.email, 'Unit Created by csv')

        console.log('am inside addLeadstoDB', index + 1)
      })
    )
    // await setUnitUploadMessage(true)
  }
  const insertBookedUnitToDb = async (records, projectDetails) => {
    const {
      fullCs,
      additonalChargesObj,
      constructOtherChargesObj,
      ConstructPayScheduleObj,
      paymentScheduleObj,
    } = projectDetails[0]
    const costSqftA = fullCs?.filter(
      (row) => row.component.value === 'sqft_cost_tax'
    )
    const costConstructSqftA = fullCs?.filter(
      (row) => row.component.value === 'sqft_construct_cost_tax'
    )
    console.log(
      'check it',
      records.length,
      costSqftA,
      costConstructSqftA,
      projectDetails
    )

    const mappedArry = await Promise.all(
      records.map(async (data, index) => {
        const {
          sqft_rate,
          plc_per_sqft,
          plot_cost_sqf,
          construct_cost_sqf,
          construct_price_sqft,
          area,
          construct_area,
        } = data

        // console.log()
        // await addPlotUnit(orgId, data, user?.email, `Unit Created by bulk `)
        // await setUploadedUnitsCount(index + 1)
        //   return await addUnit(orgId, newData, user?.email, 'Unit Created by csv')

        // cost sheet
        // part A
        const plotSaleValue = area * sqft_rate
        const plcSaleValue = Math.round(area * plc_per_sqft || 0)
        const plc_gstValue = Math.round(plcSaleValue * 0.0)
        const plot_gstValue = Math.round(plotSaleValue * 0.0)
        const constSaleValue =
          Number(construct_price_sqft) * Number(construct_area)

        // part A
        const x = [
          {
            myId: '1',
            units: {
              value: 'fixedcost',
              label: 'Fixed cost',
            },
            component: {
              value: 'unit_cost_charges',
              label: 'Unit Cost',
            },
            others: data?.sqft_rate,
            charges: data?.sqft_rate,
            TotalSaleValue: plotSaleValue,
            gstValue: plot_gstValue,
            gst: {
              label: '0',
              value: 0,
            },
            TotalNetSaleValueGsT: plotSaleValue + plot_gstValue,
          },
          {
            myId: '2',
            units: {
              value: 'fixedcost',
              label: 'Fixed cost',
            },
            component: {
              value: 'plc_cost_sqft',
              label: 'PLC',
            },
            others: data?.plc_per_sqft,
            charges: data?.plc_per_sqft,

            TotalSaleValue: plcSaleValue,
            // charges: y,
            gstValue: plc_gstValue,
            gst: {
              label: '0',
              value: 0,
            },
            TotalNetSaleValueGsT: plcSaleValue + plc_gstValue,
          },
        ]
        // part C
        const constructionCS = [
          {
            myId: '3',
            units: {
              value: 'fixedcost',
              label: 'Fixed cost',
            },
            component: {
              value: 'villa_construct_cost',
              label: 'Villa Construction Cost  ',
            },
            others: construct_cost_sqf || construct_price_sqft,
            charges: Number(construct_cost_sqf || construct_price_sqft),
            TotalSaleValue: constSaleValue,
            // charges: y,
            gstValue: 0,
            gst: {
              label: '0',
              value: 0,
            },
            TotalNetSaleValueGsT: Number(constSaleValue) + Number(0),
          },
        ]
        // part B
        const gstTaxIs = 0
        const partB = additonalChargesObj?.map((data1, inx) => {
          const dataObj = { ...data1 }
          //  check if data1  component a
          // console.log('check the additonalCahrgesObj', data1)
          const x = dataObj?.component?.value
          if (x === 'garden_area_cost') {
            let total = 0
            let gstTotal = 0
            console.log('found it', data['unit_no'], data)
            total = data?.garden_area_cost || 0
            gstTotal = Math.round(
              data?.garden_area_cost * (Number(dataObj?.gst?.value) * 0.01)
            )

            dataObj.TotalSaleValue = total
            dataObj.gst.label = gstTaxIs
            // data.gst.value = gstTotal
            dataObj.gstValue = gstTotal
            dataObj.TotalNetSaleValueGsT = total + gstTotal
            dataObj.totalSaleValued = total
          }

          if (x === 'legal_charges') {
            let total = 0
            let gstTotal = 0
            total = Number(data?.legal_charges || 0)
            gstTotal = Math.round(total * (Number(data1?.gst?.value) * 0.01))
            console.log(
              'found it',
              data['unit_no'],
              data1,
              Number(data?.legal_charges || 0),
              total,
              data1.TotalSaleValue
            )

            dataObj.TotalSaleValue = Number(data?.legal_charges || 0)
            dataObj.gst.label = gstTaxIs
            // data.gst.value = gstTotal
            dataObj.gstValue = gstTotal
            dataObj.TotalNetSaleValueGsT = total + gstTotal
            dataObj.totalSaleValued = Number(data?.legal_charges || 0)
          }

          const isChargedPerSqft = [
            'costpersqft',
            'cost_per_sqft',
            'price_per_sft',
          ].includes(data1?.units.value)

          console.log(
            'found it ==>',
            data['unit_no'],
            data.legal_charges,
            dataObj.TotalSaleValue,
            dataObj
          )
          return dataObj
        })

        const partB1 = projectDetails[0]?.additonalChargesObj?.map(
          (data1, inx) => {
            //  check if data1  component a
            // console.log('check the additonalCahrgesObj', data1)
            const dataObj = { ...data1 }
            const x = data1?.component?.value
            if (x === 'garden_area_cost') {
              let total = 0
              let gstTotal = 0
              console.log('found it', data['unit_no'], data)
              total = Number(data?.garden_area_cost || 0)
              gstTotal = Math.round(
                data?.garden_area_cost * (Number(data1?.gst?.value) * 0.01)
              )

              dataObj.TotalSaleValue = total
              dataObj.gst.label = gstTaxIs
              // data.gst.value = gstTotal
              dataObj.gstValue = gstTotal
              dataObj.TotalNetSaleValueGsT = total + gstTotal
              dataObj.totalSaleValued = total
            }

            if (x === 'legal_charges') {
              let total = 0
              let gstTotal = 0
              total = Number(data?.legal_charges || 0)
              gstTotal = Math.round(total * (Number(data1?.gst?.value) * 0.01))
              console.log(
                'found it',
                data['unit_no'],
                data1,
                Number(data?.legal_charges || 0),
                total,
                data1.TotalSaleValue
              )

              dataObj.TotalSaleValue = Number(data?.legal_charges || 0)
              dataObj.gst.label = gstTaxIs
              // data.gst.value = gstTotal
              dataObj.gstValue = gstTotal
              dataObj.TotalNetSaleValueGsT = total + gstTotal
              dataObj.totalSaleValued = Number(data?.legal_charges || 0)
            }

            const isChargedPerSqft = [
              'costpersqft',
              'cost_per_sqft',
              'price_per_sft',
            ].includes(data1?.units.value)

            console.log(
              'found it ==>',
              data['unit_no'],
              data.legal_charges,
              dataObj.TotalSaleValue,
              dataObj
            )
            return dataObj
          }
        )

        console.log('my additional charges', data['unite_no'], partB)
        // part D
        const partD = projectDetails[0]?.constructOtherChargesObj?.map(
          (data4, inx) => {
            let total = 0
            let gstTotal = 0
            let charges = 0
            const dataNewObj = { ...data4 }
            const isChargedPerSqft = [
              'costpersqft',
              'cost_per_sqft',
              'price_per_sft',
            ].includes(data4?.units.value)

            // const gstTaxIs =
            //   gstTaxForProjA.length > 0 ? gstTaxForProjA[0]?.gst?.value : 0
            const x = data4?.component?.value
            if (x === 'bwssb_cost') {
              console.log('found it')
              total = Number(data?.bwssd_cost)
              gstTotal = Math.round(total * (Number(data4?.gst?.value) * 0.01))

              // gstTotal = data?.garden_area_cost * 0.12
            }

            if (x === 'garden_area_cost') {
              charges = Number(data?.garden_area_cost)
              total = Number(data?.garden_area_cost)
              gstTotal = Math.round(total * (Number(data4?.gst?.value) * 0.01))
            }
            if (x === 'club_house') {
              charges = Number(data?.club_house)
              total = Number(data?.club_house)
              gstTotal = Math.round(total * (Number(data4?.gst?.value) * 0.01))
            }
            if (x === 'legal_charges') {
              charges = Number(data?.legal_charges)
              total = Number(data?.legal_charges)
              gstTotal = Math.round(total * (Number(data4?.gst?.value) * 0.01))
            }

            const gstPercent =
              Number(data4?.gst?.value) > 1
                ? Number(data4?.gst?.value) * 0.01
                : Number(data4?.gst?.value)
            // total = isChargedPerSqft
            //   ? Number(construct_area) * Number(data4?.charges)
            //   : Number(data4?.charges)

            // gstTotal = Math.round(total * gstPercent)

            console.log('myvalue is ', data4)
            dataNewObj.charges = charges
            dataNewObj.TotalSaleValue = total
            dataNewObj.gst.label = gstTaxIs
            // data.gst.value = gstTotal
            dataNewObj.gstValue = gstTotal
            dataNewObj.TotalNetSaleValueGsT = total + gstTotal
            return dataNewObj
          }
        )

        // part E
        const partE = [
          {
            myId: '1',
            units: {
              value: 'fixedcost',
              label: 'Fixed cost',
            },
            component: {
              value: 'maintenance_cost',
              label: 'Maintenance Cost',
            },
            others: 120,
            charges: 120,
            TotalSaleValue: Number(construct_area) * 120,
            gstValue: Number(construct_area) * 120 * 0.18,
            gst: {
              label: '18',
              value: 18,
            },
            TotalNetSaleValueGsT:
              Number(construct_area) * 120 +
              Number(construct_area) * 120 * 0.18,
          },
          {
            myId: '2',
            units: {
              value: 'fixedcost',
              label: 'Fixed cost',
            },
            component: {
              value: 'corpus_fund',
              label: 'Corpus Fund',
            },
            others: 50,
            charges: 50,

            TotalSaleValue: Number(construct_area) * 50,
            // charges: y,
            gstValue: 0,
            gst: {
              label: '0',
              value: 0,
            },
            TotalNetSaleValueGsT: Number(construct_area) * 50,
          },
        ]
        // if (data.status === 'booked') {
        //   // get cost sheet
        // }
        const partATotal = await x.reduce(
          (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
          0
        )
        const partCTotal = await constructionCS.reduce(
          (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
          0
        )

        const partBTotal = await partB1.reduce(
          (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
          0
        )
        const partDTotal = await partD.reduce(
          (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
          0
        )
        const partETotal = await partE.reduce(
          (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
          0
        )

        const plotTotalCost = partATotal + partBTotal
        const constructTotalCost = partCTotal + partDTotal
        let plotPs = []
        let constructPs = []

        plotPs = paymentScheduleObj?.map((d1, inx) => {
          console.log('d1 is', d1)
          const z = d1
          z.value = ['fixedcost'].includes(d1?.units?.value)
            ? Number(d1?.percentage)
            : Number((plotTotalCost * (d1?.percentage / 100)).toFixed(2))
          if (['fixedcost'].includes(d1?.units?.value)) {
            z.elgible = true
            z.elgFrom = Timestamp.now().toMillis()
            return z
          }
          // data['unitStatus'] = d1?.units?.value
          if (data['unitStatus'] == 'Registered') {
            z.elgible = true
            z.elgFrom = Timestamp.now().toMillis()
          }
          if (data['unitStatus'] == 'Booked') {
            if (inx < 1) {
              z.elgible = true
              z.elgFrom = Timestamp.now().toMillis()
            }
          }
          if (data['unitStatus'] == 'ATS') {
            if (inx < 2) {
              z.elgible = true
              z.elgFrom = Timestamp.now().toMillis()
            }
          }

          d1.schDate =
            d1?.schDate ||
            d.getTime() +
              (ConstructPayScheduleObj.slice(0, inx).reduce(
                (sum, prevItem) => sum + (Number(prevItem.zeroDay) || 0),
                0
              ) +
                Number(d1?.zeroDay || 0)) *
                86400000
          return z
        })
        constructPs = ConstructPayScheduleObj?.map((d1, inx) => {
          console.log('d1 is => ', d1, constructTotalCost)
          const z = d1
          const z0 = { ...d1 }
          z0.myPercent = d1?.percentage / 100
          z0.trueCheck = ['fixedcost'].includes(d1?.units?.value)
          z0.check = Number(constructTotalCost * (d1?.percentage / 100))
          z0.check1 = Number(
            (constructTotalCost * (d1?.percentage / 100)).toFixed(2)
          )
          z0.value1 = z0.trueCheck
            ? Number(d1?.percentage)
            : Number((constructTotalCost * (d1?.percentage / 100)).toFixed(2))
          z0.value = z0.value1

          console.log(
            'log it',
            data['unit_no'],
            constructionCS[0]['TotalNetSaleValueGsT'],
            x,
            constSaleValue,
            Number(construct_price_sqft),
            Number(construct_area)
          )

          console.log(
            'log it',
            data['unit_no'],
            data['T_received'],
            'value',
            partCTotal,
            z.value,
            x,
            z,
            'full value',
            d1,
            z0
          )
          return z0
        })

        setTimeout(async () => {
          // putToDb(constructPs,data,pId, partATotal,partBTotal, partCTotal, partDTotal  )

          const newTotal =
            (partATotal || 0) +
            (partBTotal || 0) +
            (partCTotal || 0) +
            (partDTotal || 0)
          // constructionCS

          const categorizedNewPlotPS = plotPs?.map((item) => ({
            ...item,
            category: 'plotPS',
          }))
          const categorizedNewConstructPS =
            constructPs?.map((item) => ({
              ...item,
              category: 'constructPS',
            })) || []
          const fullPs1 = [
            ...categorizedNewPlotPS,
            ...categorizedNewConstructPS,
          ]
          let T_elgible = 0
          const T_transaction = 0
          const T_review = data['T_received'] || 0
          let stepsComp = 0
          let T_balance = 0
          let T_elgible_balance = 0
          const T_total = newTotal

          const paidAmount = data['paidAmount']
          fullPs1?.map((dataObj) => {
            if (dataObj?.elgible) {
              T_elgible = dataObj?.value + T_elgible
              stepsComp = stepsComp + 1
              // T_transaction = T_transaction + (paidAmount || undefined)
              // T_review = T_review + (paidAmount || undefined)
            }
          })
          T_balance = newTotal - T_review
          T_elgible_balance = T_elgible - T_review

          data.plotCS = [...x]
          data.addChargesCS = partB1
          data.constAdditionalChargesCS = partD
          data.constructCS = [...constructionCS]
          data.fullPs = fullPs1
          data.plotPS = plotPs
          data.constructPS = constructPs
          data.possessionAdditionalCostObj = partE
          data.T_possession = partETotal

          data[`T_elgible`] = T_elgible
          data[`stepsComp`] = stepsComp
          data[`T_transaction`] = data['T_received']
          data[`T_review`] = T_review
          data[`T_balance`] = T_balance
          data[`T_elgible_balance`] = T_elgible_balance
          data['T_cleared'] = data['T_cleared'] || 0
          data['T_rejected'] = data['T_rejected'] || 0

          const finalUnitObj = {
            status: data['status'],
            unitStatus: data['unitStatus'],
            Katha_no: data['Katha_no'] || '',
            survey_no: data['survey_no'] || '',
            landOwnerName: data['landOwnerName'] || '',
            T_total: newTotal,
            T_balance: T_balance,
            T_received: data['T_received'] || 0,
            T_elgible: T_elgible,
            T_elgible_balance: T_elgible_balance,
            T_approved: data['T_received'] || 0,
            T_transaction: data['T_received'] || 0,

            T_review: 0,
            T_A: partATotal,
            T_B: partBTotal,
            T_C: partCTotal,
            T_D: partDTotal,
            T_E: partETotal,
            plotCS: [...x],
            constructCS: [...constructionCS],
            addChargesCS: partB1,
            constAdditionalChargesCS: partD,
            possessionAdditionalCostCS: partE,
            plotPS: plotPs,
            constructPS: constructPs,
            fullPs: fullPs1,
            PID_no: data['PID_no'] || '',
            customerDetailsObj: {
              phoneNo1: data['phoneNo1'] || '',
              marital1: {
                value: 'Single',
                label: 'Single',
              },
              pincode1: '',
              co_Name1: '',
              city1: '',
              address1: data['address1'],
              phoneNo3: '',
              aadharNo1: data['aadharNo1'],
              email1: data['email1'],
              annualIncome1: '',
              panNo1: data['panNo1'],
              state1: {
                label: 'Karnataka',
                value: 'KA',
              },
              aadharUrl1: '',
              countryName1: 'country',
              companyName1: '',
              panDocUrl1: '',
              relation1: {
                label: 'S/O',
                value: 'S/O',
              },
              dob1: data['dob1'],
              occupation1: '',
              countryCode1: '',
              customerName1: data['customerName1'],
              countryCode2: '',
            },
            secondaryCustomerDetailsObj: {
              phoneNo1: data['phoneNo2'] || '',
              marital1: {
                value: 'Single',
                label: 'Single',
              },
              pincode1: '',
              co_Name1: '',
              city1: '',
              address1: data['address2'] || '',
              phoneNo3: '',
              aadharNo1: data['aadharNo2'] || '',
              email1: data['email2'] || '',
              annualIncome1: '',
              panNo1: data['panNo2'] || '',
              state1: {
                label: 'Karnataka',
                value: 'KA',
              },
              aadharUrl1: '',
              countryName1: 'country',
              companyName1: '',
              panDocUrl1: '',
              relation1: {
                label: 'S/O',
                value: 'S/O',
              },
              dob1: data['dob1'],
              occupation1: '',
              countryCode1: '',
              customerName1: data['customerName2'],
              countryCode2: '',
            },
            aggrementDetailsObj: {},
            booked_on: data['booked_on'],
            plc_per_sqft: data['plc_per_sqft'],
            sqft_rate: data['sqft_rate'],
            construct_price_sqft: data['construct_price_sqft'],
            by: data['by'],
            crm_executive: data['crm_executive'] || '',
            ats_date: data['ats_date'],
            atb_date: data['atb_date'],
            sd_date: data['sd_date'],
            ats_target_date: data['ats_target_date'],
            sd_target_date: data['sd_target_date'],
            source: data['source'],
            sub_source: data['sub_source'],
            remarks: data['remarks'],
            fund_type: data['fund_type'],
            Bank: data['Bank'],
            loanStatus: data['loanStatus'],
            annualIncome: data['annualIncome'] || '',
            intype: 'Bulk',
          }

          // const x2 =  createBookedCustomer(
          //   orgId,
          //   id,
          //   {
          //     leadId: id,
          //     eventName: leadDetailsObj2?.Event || projectDetails?.eventName,
          //     ProjectId: leadDetailsObj2?.ProjectId || selUnitDetails?.pId,
          //     // ...customerDetailsObj,
          //     Name: customerDetailsObj?.customerName1,
          //     Mobile: customerDetailsObj?.phoneNo1,
          //     Email: customerDetailsObj?.email1,
          //     secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
          //     assets: arrayUnion(uid),

          //     [`${uid}_unitDetails`]: selUnitDetails || {},
          //     [`${uid}_plotCS`]: newPlotCostSheetA,
          //     [`${uid}_AddChargesCS`]: newAdditonalChargesObj,
          //     [`${uid}_constructCS`]: newConstructCostSheetA || [],
          //     [`${uid}_fullPs`]: fullPs,
          //     [`${uid}_newPlotPS`]: newPlotPS,
          //     [`${uid}_newConstructPS`]: newConstructPS || [],
          //     [`${uid}_T_elgible`]: T_elgible,
          //     [`${uid}_stepsComp`]: stepsComp,
          //     [`${uid}_T_transaction`]: T_transaction,
          //     [`${uid}_T_review`]: T_review,
          //     [`${uid}_T_balance`]: T_balance,
          //     [`${uid}_T_elgible_balance`]: T_elgible_balance,

          //     booked_on: data?.dated,
          //     ct: Timestamp.now().toMillis(),
          //     Date: Timestamp.now().toMillis(),

          //     //paymentScheduleObj
          //   },
          //   user?.email,
          //   enqueueSnackbar
          // )

          await updateStallAsBooked(
            orgId,
            pId,
            data['unitUid'],
            'id',
            finalUnitObj,
            user?.email,
            enqueueSnackbar,
            'resetForm'
          )
          await setUploadedUnitsCount(index + 1)

          console.log(
            'finalUnitObj',
            // partB1,
            data['unit_no'],
            data['T_received'],

            newTotal,
            partATotal,
            partBTotal,
            partCTotal,
            partDTotal,
            finalUnitObj
          )
          console.log(
            'payment schedule is ',
            data,
            'plot-total',
            partATotal,
            'construct-total',
            partCTotal,
            'unit-total',
            newTotal,
            'plot-ps',
            plotPs,
            'construct-ps',
            constructPs,
            'payment-schedule',
            paymentScheduleObj
            // 'constructOtherChargesObj',
            // index + 1,
            // data['unit_no'],
            // partATotal,

            // partCTotal,
            // partBTotal + partDTotal,
            // newTotal,
            // partD
            // )
            // constructPs,
            // ConstructPayScheduleObj,
            // paymentScheduleObj
          )
          console.log(
            'am inside addLeadstoDB==>',
            constructOtherChargesObj,
            index + 1,
            data['unit_no'],
            partATotal,

            partCTotal,
            partBTotal + partDTotal,
            newTotal,
            partD
          )
        }, 3500)
      })
    )
    // await setUnitUploadMessage(true)
  }
  const insertMortgageUnitToDb = async (records, projectDetails) => {
    // return insert to mortage table
    // we need unit Id

    const { projectId } = projectDetails[0]
    console.log('inserting mortgage unit to db', records, projectDetails)
    const mappedArry = await Promise.all(
      records.map(async (data, index) => {
        await upSertMortgageUnit(orgId, data['unitUid'], data, user?.email)
        await setUploadedUnitsCount(index + 1)
      })
    )

    return
  }

  const insertTransactionUnitToDb = async (records, projectDetails) => {
    // return insert to mortage table
    // we need unit Id

    const { projectId } = projectDetails[0]
    console.log('inserting mortgage unit to db', records, projectDetails)
    const mappedArry = await Promise.all(
      records.map(async (data, index) => {
        data.uploadType = 'bulk'
        if (data?.status?.toLowerCase() === 'Cancelled') {
          data.status = 'cancelled'
          const date2 = new Date(data['cancelledDate'])
          data.cancelledDate = data['Cancelled Date'] === '' ? '' : date2.getTime() + 21600000
        } else {
          data.status =
            data.status.toLowerCase() === 'active' ? 'received' : 'review'
        }
        const date = new Date(data['dated']) // some mock date
        const milliseconds = date.getTime() + 21600000
        const date1 = new Date(data['date_of_entry']) // some mock date
 // some mock date

        data.dated = milliseconds
        data.date_of_entry = date1.getTime() + 21600000
        data.mode = data?.payment_mode  || ''

        await capturePaymentS(
          orgId,
          false,
          projectId,
          data['unitUid'],
          data['unitUid'],
          {},
          data,
          user?.email,
          enqueueSnackbar
        )
        await upSertMortgageUnit(orgId, data['unitUid'], data, user?.email)
        await setUploadedUnitsCount(index + 1)
      })
    )

    return
  }

  const addUnitsToDB = async (records, pId) => {
    setUnitUploadMessage(false)
    // upload successfully

    // get additionalCharges obj
    //   additonalChargesObj,
    // ConstructOtherChargesObj,
    const projPayload = await getProjById1(orgId, pId)
    // const projPayload = await getProject(orgId, pId)

    // phase details of zero
    console.log('proj details is', projPayload)
    // const { ConstructOtherChargesObj, additonalChargesObj } = projPayload[0]

    if (title === 'Import Stalls') {
      insertStallToDb(records)
    }  else if (
      [
        'Import Booked Villas',
        'Import Booked Plots',
        'Import Booked Apartments',
      ].includes(title)
    ) {
      console.log('hello==>', records)
      insertBookedUnitToDb(records, projPayload)
    } else if (title === 'Upload Mortgage') {
      console.log('hello==>', records)
      insertMortgageUnitToDb(records, projPayload)
    } else if (title === 'Upload Unit Transactions') {
      console.log('hello==>', records)
      insertTransactionUnitToDb(records, projPayload)
    }
    return
    const mappedArry = await Promise.all(
      records.map(async (data, index) => {
        const newData = data
        newData['intype'] = 'bulk'
        newData['pId'] = pId
        newData['blockId'] = myBlock?.uid || 0
        newData['status'] = data?.status?.toLowerCase() || 'available'
        newData['by'] = 'bulk'
        newData['rate_per_sqft'] = data?.price || data?.plot_cost_sqf || 0
        newData['construct_price'] = data?.construct_price || 0
        newData['builtup_area'] = data?.builtup_area || 0
        newData['area'] = data?.area || 0
        newData['plc'] = data?.plc || 0
        newData['ct'] = Timestamp.now().toMillis() + 10800000
        newData['revised_area'] = data?.revised_area || 0
        newData['additional_area'] = data?.additional_area || 0
        newData['plot_cost_sqf'] = data?.plot_cost_sqf || 0
        newData['construct_cost_sqf'] = data?.construct_cost_sqf || 0
        newData['ownerName'] = data?.ownerName || ''
        newData['type'] = data?.type || 'sellable'
        newData['remarks'] = data?.remarks || ''
        newData['builderbankId'] = data?.builderbankId || ''

        delete newData['']
        console.log('am inside addUnitstoDB', newData)
        setUploadedUnitsCount(index + 1)

        return await addUnit(orgId, newData, user?.email, 'Unit Created by csv')

        console.log('am inside addLeadstoDB')
      })
    )
    await setUnitUploadMessage('Upload Successfull')
    console.log('mappedArry', mappedArry)
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <span className="relative  p-1 border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-0 ml-1 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={`Search...${selStatus}`}
          onChange={searchKeyField}
          className="ml-6 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none"
        />
      </span>

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {' '}
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="subtitle2"
          id="tableTitle"
          component="div"
        >
          <span className="ml-3">Showing {rowsAfterSearchKey.length}</span>

          <span></span>
          <span className="ml-3">{unitUploadMessage}</span>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : sourceTab != 'all' &&
        [
          'Import Stalls',
          'Import Stalls',
          'Import Apartment Stalls',
          'Import Plot Stalls',
          'Import Villas',
          'Import Booked Villas',
          'Upload Mortgage',
          'Upload Unit Transactions'
        ].includes(title) ? (
        <span style={{ display: 'flex' }}>
          {sourceTab === 'validR' && !unitUploadMessage && (
            <span className="ml-3">
              Uploaded {uploadedUnitsCount} of {rows.length}
            </span>
          )}
          {unitUploadMessage && (
            <IconButton
              aria-label="done"
              onClick={() => {
                addUnitsToDB(rowsAfterSearchKey, pId)
              }}
            >
              <FileUploadTwoToneIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="done"
            onClick={() => onToggleEditMode(row.id)}
          >
            <RevertIcon></RevertIcon>
          </IconButton>
        </span>
      ) : sourceTab != 'all' ? (
        <span style={{ display: 'flex' }}>
          {sourceTab === 'validR' && !uploadIcon && (
            <span className="ml-3">
              Uploaded {uploadedLeadsCount} of {rows.length}
            </span>
          )}
          {uploadIcon && (
            <IconButton
              aria-label="done"
              onClick={() => addLeadsToDB(rowsAfterSearchKey)}
            >
              <FileUploadTwoToneIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="done"
            onClick={() => onToggleEditMode(row.id)}
          >
            <RevertIcon></RevertIcon>
          </IconButton>
        </span>
      ) : (
        <span></span>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selStatus: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchKey: PropTypes.string || PropTypes.number,
  title: PropTypes.string,
  pId: PropTypes.string,
  myBlock: PropTypes.object,
}

const HighlighterStyle = (props) => {
  const { searchKey, source } = props
  return (
    <Highlighter
      highlightStyle={{
        backgroundColor: '#ffc069',
        padding: 0,
      }}
      searchWords={[searchKey]}
      autoEscape
      textToHighlight={source?.toString()}
    />
  )
}
let columns

// title
export default function LfileuploadTableTemplate({
  selStatus,
  rowsParent,
  sourceTab,
  title,
  pId,
  myBlock,
}) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')

  React.useEffect(() => {
    if (title === 'Import Stalls') {
      columns = [
        { id: 'unit_no', label: 'Stall No', minWidth: 80 },
        {
          id: 'status',
          label: 'status',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'type',
          label: 'Stall Type*',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'facing',
          label: 'Facing*',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },

        {
          id: 'area',
          label: 'area *(Sq.Ft)',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'area_sqm',
          label: 'Area*(Sq.m)',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'sqft_rate',
          label: 'Rate/Sqm',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'plc_per_sqft',
          label: 'PLC Per Sqft',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Size*',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'release_status',
          label: 'Release Status',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },

        {
          id: 'sharing',
          label: 'sharing',
          minWidth: 10,
          align: 'left',
        },
      ]
    } else if (title === 'Import Stalls') {
      columns = [
        { id: 'unit_no', label: 'unit_no', minWidth: 80 },
        { id: 'floor', label: 'floor', minWidth: 100 },
        {
          id: 'unit_type',
          label: 'unit_type',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'facing',
          label: 'facing',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'bed_rooms',
          label: 'bed_rooms',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'carpet_area',
          label: 'carpet_area',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'carpet_area_uom',
          label: 'carpet_area_uom',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
      ]
    } else if (
      [
        'Import Booked Villas',
        'Import Booked Plots',
        'Import Booked Apartments',
      ].includes(title)
    ) {
      columns = [
        { id: 'unit_no', label: 'unit_no', minWidth: 80 },
        {
          id: 'status',
          label: 'Available Status',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'unitStatus',
          label: 'Unit Status',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'booked_on',
          label: 'Booking Date',
          minWidth: 80,
          format: (value) => new Date(value)?.getTime(),
        },
        {
          id: 'by',
          label: 'Booked By',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'sqft_rate',
          label: 'Plot per sqft',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'construct_price_sqft',
          label: 'Construction per sqft',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'plc_per_sqft',
          label: 'PLC per sqft',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'legal_charges',
          label: 'Legal Charges',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'construct_cost',
          label: 'Construct Cost',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'garden_area_cost',
          label: 'Garden Area Cost',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'bwssd_cost',
          label: 'BWSSD Cost',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'club_house',
          label: 'Club House',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'source',
          label: 'Source',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'sub_source',
          label: 'Sub-Source',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },

        {
          id: 'customerName1',
          label: 'Applicant Name-1',
          minWidth: 100,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'phoneNo1',
          label: 'Phone No-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'dob1',
          label: 'DOB-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'address1',
          label: 'Address-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'email1',
          label: 'email-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'aadharNo1',
          label: 'Aadhar-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'panNo1',
          label: 'Pan No-1',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'customerName2',
          label: 'Applicant Name-2',
          minWidth: 100,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'phoneNo2',
          label: 'Phone No-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'dob2',
          label: 'DOB-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'address2',
          label: 'Address-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'email2',
          label: 'email-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'aadharNo2',
          label: 'Aadhar-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'panNo2',
          label: 'Pan No-2',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
      ]
    } else if (title === 'Upload Mortgage') {
      columns = [
        { id: 'unit_no', label: 'Unit_No', minWidth: 80 },
        {
          id: 'survey_no',
          label: 'Survey No',
          minWidth: 10,
          align: 'center',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'land_owner_name',
          label: 'Land Owner Name',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'doc_type',
          label: 'Doc Type',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'date_of_registration',
          label: 'Date of Registration',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'to_whom',
          label: 'To Whom',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'doc_no',
          label: 'Document No',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'status',
          label: 'Status',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'remarks',
          label: 'Remarks',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
      ]
    } else if (title === 'Upload Unit Transactions') {
      columns = [
        { id: 'unit_no', label: 'Unit_No', minWidth: 80 },
        {
          id: 'date_of_entry',
          label: 'Date of Entry',
          minWidth: 10,
          align: 'center',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'payment_mode',
          label: 'Payment Mode',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'bank_ref_no',
          label: 'Transaction ID',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'payto',
          label: 'Payment Towards',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'builderName',
          label: 'Payment Against',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'dated',
          label: 'Payment Date',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'amount',
          label: 'Amount',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'receive_by',
          label: 'Received By',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'status',
          label: 'Status',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'cancelDate',
          label: 'Cancelled Date',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        {
          id: 'remarks',
          label: 'Remarks',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
      ]
    } else {
      columns = [
        {
          id: 'Date',
          label: 'Date',
          minWidth: 80,
          format: (value) => value.toLocaleString(),
        },
        { id: 'Status', label: 'Status', minWidth: 100 },
        {
          id: 'Name',
          label: 'Name',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'Mobile',
          label: 'Mobile',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'Email',
          label: 'Email',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'Event',
          label: 'Event',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'Source',
          label: 'Source',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'EmpId',
          label: 'Assigned To',
          minWidth: 10,
          align: 'left',
          format: (value) => value.toFixed(2),
        },
      ]
    }
  }, [])

  React.useEffect(() => {
    filterStuff(rowsParent)
    // let x = rowsParent.filter((item) => {
    //   if (selStatus === 'all') {
    //     return item
    //   } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
    //     console.log('All1', item)
    //     return item
    //   } else if (item.Status.toLowerCase().includes(selStatus.toLowerCase())) {
    //     return item
    //   } else {
    //     return item
    //   }
    // })
    // // console.log('All2', x)

    // console.log('what is x', rows)

    // return () => {
    //   second
    // }
    console.log('rows parent is ', rowsParent)
  }, [selStatus, rowsParent])

  React.useEffect(() => {
    console.log('search on is', searchKey)
    filterSearchString(rows)
  }, [searchKey])

  const filterStuff = async (parent) => {
    const x = await parent.filter((item) => {
      if (selStatus === 'all') {
        return item
      } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
        console.log('All1', item)
        return item
      } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  const filterSearchString = async (parent) => {
    return
    const x = await parent.filter((item) => {
      if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
      //  else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
      //   console.log('All1', item)
      //   return item
      // } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
      //   return item
      // }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }} style={{ display: 'flex', overflowX: 'auto' }}>
      <Paper sx={{ width: '100%', mx: 3, my: 2 }}>
        <EnhancedTableToolbar
          sourceTab={sourceTab}
          numSelected={selected.length}
          selStatus={selStatus}
          filteredData={rows}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          sourceTab={sourceTab}
          rows={rows}
          title={title}
          pId={pId}
          myBlock={myBlock}
        />
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>sNO</TableCell>
                {columns?.map((column, ind) => (
                  <TableCell
                    key={ind}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(rows, getComparator(order, orderBy)).map( */}

              {rows
                ?.filter((item) => {
                  if (searchKey == '' || !searchKey) {
                    return item
                  } else if (
                    item?.Assignedto.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Email.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Mobile.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Name.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Event.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Source.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item?.Status.toLowerCase().includes(searchKey.toLowerCase())
                  ) {
                    return item
                  }
                })
                ?.slice()
                ?.sort(getComparator(order, orderBy))
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row.Name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{
                        background:
                          (index == 0 && sourceTab === 'duplicateR') ||
                          sourceTab === 'validR'
                            ? '#e8fde8'
                            : '',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      {columns?.map((column) => {
                        const value = ['Date', 'booked_on'].includes(column.id)
                          ? prettyDate(row[column.id]).toLocaleString()
                          : row[column.id]

                        console.log('insert date value is', row[column.id], row)

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value} */}
                            {value}
                            {/* <HighlighterStyle
                              searchKey={searchKey}
                              source={value}
                            /> */}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )

                  // return (
                  //   <TableRow
                  //     hover
                  //     onClick={(event) => handleClick(event, row.Name)}
                  //     role="checkbox"
                  //     aria-checked={isItemSelected}
                  //     tabIndex={-1}
                  //     key={row.Name}
                  //     selected={isItemSelected}
                  //   >
                  //     {sourceTab == 'all' && (
                  //       <TableCell padding="checkbox">
                  //         <Checkbox
                  //           color="primary"
                  //           checked={isItemSelected}
                  //           inputProps={{
                  //             'aria-labelledby': labelId,
                  //           }}
                  //         />
                  //       </TableCell>
                  //     )}
                  //     <TableCell
                  //       component="th"
                  //       id={labelId}
                  //       scope="row"
                  //       padding="none"
                  //     >
                  //       {row.Date}
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <section>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Name.toString()}
                  //           />
                  //         </div>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Email.toString()}
                  //           />
                  //         </div>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Mobile.toString()}
                  //           />
                  //         </div>
                  //       </section>
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Assignedto.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Source.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="left">{row.Event}</TableCell>
                  //     <TableCell align="center">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Status.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="center">{row.Note}</TableCell>
                  //   </TableRow>
                  // )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
