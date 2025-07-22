/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import * as React from 'react'

import '../../styles/myStyles.css'
import {
  Rating,
} from '@mui/material'
import Section from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import PropTypes from 'prop-types'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
} from 'src/util/dateConverter'
import 'react-datepicker/dist/react-datepicker.css'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import Highlighter from 'react-highlight-words'

import CSVDownloader from '../../util/csvDownload'
import { prettyDate } from '../../util/dateConverter'
import DropCompUnitStatus from '../dropDownUnitStatus'



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
  if ((b[orderBy] || b['stsUpT'] || b['Date']) < (a[orderBy] || a['stsUpT'] || a['Date'])) {
    return -1
  }
  if ((b[orderBy] || b['stsUpT'] || b['Date']) > (a[orderBy] || a['stsUpT'] || a['Date'])) {
    return 1
  }
  return 0
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
  // {
  //   id: 'S.No',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'S.No',
  // },
  {
    id: 'Date',
    numeric: false,
    disablePadding: true,
    label: 'Created On',
  },
  // {
  //   id: 'AssignedOn',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Visited On',
  // },

  {
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Visitor Details',
  },
  {
    id: 'Event',
    numeric: false,
    disablePadding: false,
    label: 'Event',
  },

  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Assigned To',
  },
  {
    id: 'Source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'Currentstatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'leadUpT',
    numeric: false,
    disablePadding: true,
    label: 'Registered By',
  },
  {
    id: 'schTime',
    numeric: false,
    disablePadding: true,
    label: 'Next Sch',
  },

  {
    id: 'Notes',
    numeric: true,
    disablePadding: false,
    label: 'Comments',
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
    viewUnitStatusA,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  const displayHeadersFun = (headCell) => {

    if (['Assigned', 'schTime', 'leadUpT'].includes(headCell)) {
      switch (headCell) {
        case 'Assigned':
          return viewUnitStatusA.includes('Assigned To') ? '' : 'none'
        case 'leadUpT':
          return viewUnitStatusA.includes('Registerd By') ? '' : 'none'
        case 'schTime':
          return viewUnitStatusA.includes('Next Sch') ? '' : 'none'
        default:
          break;
      }
    } else {
      return ''
    }
    //   if(viewUnitStatusA.includes('Assigned To') &&
    //   headCell === 'Assigned'){
    //   return ''
    //   }else{
    //     return 'none'
    //   }
    // }else {
    //   return ''
    // }


  }
  return (
    <TableHead style={{ height: '5px' }}>
      <TableRow selected={true}
          sx={{
        height: '5px',
        maxHeight: '5px',
      }}
      >
        <TableCell
          align="center"
          component="th"
          scope="row"
          padding="none"
          size="small"
          style={{
            backgroundColor: '#FAFAFA',
            color: '#1a91eb',
            maxHeight: '5px',
            height: '5px',
            lineHeight: '5px',
            maxWidth: '5px',
            minWidth: '5px',
            paddingLeft: '34px',
            paddingRight: '29px',
            marginRight: '10px',
          }}
        >
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
          <TableSortLabel
            sx={{
    color: '#1A1A1A',
    '&.Mui-active': {
      color: '#1A1A1A',
      backgroundColor: '#FAFAFA',
       height: '5px',
                maxHeight: '5px',
    },
  }}
  className="font-inter font-medium text-[12px] leading-[18px] tracking-[0] text-black"
          
          >S.No</TableSortLabel>
        </TableCell>
        {headCells.map((headCell) => (
          <>
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                  backgroundColor: '#FAFAFA',
                color: '#1a91eb',
                height: '5px',
                maxHeight: '10px',
                lineHeight: '10px',
                display: displayHeadersFun(headCell.id)
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{
                  // backgroundColor: '#F7F9FB',
                  color: '#1a91eb',
                  fontFamily: 'inherit',
                }}
              >
                <span className="font-inter font-medium text-[12px] leading-[18px] tracking-[0] text-black whitespace-nowrap">
                  {headCell.label}
                </span>
                {orderBy === headCell.id ? (
                  <Section component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Section>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </>
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
    viewUnitStatusA,
    pickCustomViewer,
    setViewUnitStatusA,
    startDate,
    endDate,
    setDateRange,
    leadsFetchedData,
    searchVal,
    searchKey,
  } = props
  const d = new window.Date()
  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)
  const [downloadFormatRows, setDownloadFormatRows] = React.useState([])
  const [cutOffDate, setCutOffDate] = React.useState(d.getTime() + 60000)

  const [isOpened, setIsOpened] = React.useState(false)
  React.useEffect(() => {
    setRowsAfterSearchKey(rows)
  }, [rows])
  // React.useEffect(() => {
  //  console.log('calendar state', isOpened, startDate?.getTime())
  //  if(startDate !== null && endDate !=null){
  //   console.log('inside you1')
  //   let rowsR = rows.filter((item) => {
  //    return item.Date >=startDate.getTime() && item.Date <=endDate.getTime()
  //   })
  //   setRowsAfterSearchKey(rowsR)
  //  }else if(startDate !==null) {
  //   console.log('inside you')
  //   let rowsR = rows.filter((item) => {
  //     console.log('inside you wjat os tjo filter', item.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000,startDate.getTime()+ 86399999,startDate.getTime(),   item.Name)
  //     return item.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000
  //    })
  //    console.log('inside you wjat os tjo filter', rowsR.length)
  //    setRowsAfterSearchKey(rowsR)
  //    console.log('inside you wjat os tjo filter 1', rowsAfterSearchKey)
  //  }
  // }, [startDate,endDate ])

  React.useEffect(() => {
    let downRows = []
    rowsAfterSearchKey?.map((data) => {
      let row = {}
      let remark
      if (data?.Remarks) {
        remark =
          data?.Remarks?.charAt(0) == '-'
            ? data?.Remarks.substring(1)
            : data?.Remarks
      } else {
        remark = data?.Remarks
      }
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.countryCode = data?.countryCode
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Event = data?.Event
      row.Remarks = remark

      downRows.push(row)
    })

    setDownloadFormatRows(downRows)
  }, [rowsAfterSearchKey])
React.useEffect(()=>{
  setSearchKey(searchVal)
  // searchKeyField({target:{value:searchVal}})
},[searchVal])
  const searchKeyField = (e) => {
    // console.log('searched values is ', e.target.value)
    setSearchKey(e.target.value)
    let searchString = e.target.value

    let rowsR = leadsFetchedData.filter((item) => {
      if (searchString == '' || !searchString) {
        console.log('ami here')
        return item
      } else if (
        // item.Assignedto.toLowerCase().includes(searchString.toLowerCase()) ||
        // item.Date.toLowerCase().includes(searchString.toLowerCase()) ||
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
  return (
    <section className="flex flex-row justify-between  rounded p-4">
      <span className="w-full flex items-center ">
        <span className="flex w-[298px] h-[44px] gap-[6px] rounded-lg border-[1.5px] border-[#E5E7EA] px-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 absolute left-0 ml-1 mt-2"
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
            value={searchKey}
            className="w-4/5 bg-transparent focus:border-transparent focus:ring-0 focus:outline-none text-sm leading-7 text-gray-900 placeholder:font-Manrope placeholder:font-medium placeholder:text-[12px] placeholder:leading-none placeholder:tracking-[0] placeholder:text-[#AEAEAE]"
          />
        </span>
        {/* <span className="max-h-[42px] mt-[2px] ml-3">

          <label className="bg-green   pl-   flex flex-row cursor-pointer">
            <CalendarMonthTwoToneIcon className="mr-1" />
            <span className="inline">
              <DatePicker
                className="z-10 pl- py-1  inline text-xs text-[#0091ae] bg-white cursor-pointer min-w-[170px]"

                onCalendarOpen={() => setIsOpened(true)}
                onCalendarClose={() => setIsOpened(false)}
                onChange={(update) => setDateRange(update)}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                isClearable={true}

                dateFormat="MMM d, yyyy "
              />
            </span>
          </label>
        </span> */}
      </span>

      {/* <span className="inline mt-[4px] pl-2">
                    <DatePicker
                      className=" pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white cursor-pointer"
                      selected={cutOffDate}
                      onChange={(date) =>{ setCutOffDate(date.getTime())}}
                      showTimeSelect
                      timeFormat="HH:mm"

                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </span> */}

      {/* {numSelected > 0 ? (
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
          <span className="ml-3 pt-[7px] font-light font-bodyLato block text-xs ">
            <span className="ml-1 mr-1 pt-2 font-thick font-bodyLato text-[12px] text-blue-800">
              {rowsAfterSearchKey.length}
            </span>
            Results{' '}
          </span>
        </Typography>
      )} */}
      <span style={{ display: 'flex' }}>
        <section className="pt-1">
          <DropCompUnitStatus
            type={'show'}
            id={'id'}
            setStatusFun={{}}
            viewUnitStatusA={viewUnitStatusA}
            pickCustomViewer={pickCustomViewer}
          />
        </section>
        {/* <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>

          <IconButton className="bg-gray-200 ">
            <EventNoteTwoToneIcon
              className="h-[20px] w-[20px]"
              style={{ height: '20px', width: '20px' }}
            />
          </IconButton>
        </Tooltip> */}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton className="bg-gray-200">
              <DeleteIcon
                className="h-[20px] w-[20px]"
                style={{ height: '20px', width: '20px' }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`Download ${leadsFetchedData?.length} Row`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader
              className="mr-6 h-[20px] w-[20px]"
              downloadRows={leadsFetchedData}
              sourceTab= {"leadsList"}
              style={{ height: '20px', width: '20px' }}
            />
          </Tooltip>
        )}
      </span>
    </section>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selStatus: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchKey: PropTypes.string || PropTypes.number,
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
      textToHighlight={source}
    />
  )
}
export default function LLeadsTableBody({
  fetchLeadsLoader,
  selStatus,
  rowsParent,
  selUserProfileF,
  newArray,
  leadsFetchedData,
  mySelRows,
  searchVal,
}) {
  const { user } = useAuth()
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('Date')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [searchKey, setSearchKey] = React.useState(searchVal?searchVal:'')
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange
  React.useEffect(() => {
    // filterStuff(rowsParent)
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
  }, [selStatus, rowsParent])
  console.log(searchKey, "cdsvfeg")
  React.useEffect(() => {
    filterSearchString(rows)
  }, [searchKey])

  const filterStuff = async (parent) => {
    console.log('filter value stuff', parent)


    let x = selStatus === 'all'
      ? parent['all'] : selStatus === 'archieve_all' ? parent['archieve_all'] : parent[selStatus]

    await setRows(newArray)
  }
  const filterByDate = () => {
    rows.filter((item) => {
      {
        /* console.log('inside xxxx ==>', item?.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000,startDate.getTime()+ 86399999,startDate.getTime(),   item.Name) */
      }
      if (startDate !== null && endDate != null) {
        console.log('inside you1', startDate, endDate, item)
        let x = rows.filter((item) => {
          return (
            item?.Date >= startDate?.getTime() &&
            item?.Date <= endDate?.getTime()
          )
        })
        setRows(x)
      } else if (startDate !== null) {
        console.log('inside you1 x')
        console.log(
          'iinside you1 x',
          item?.Date >= startDate?.getTime() &&
          item?.Date <= startDate?.getTime() + 86400000,
          startDate?.getTime() + 86399999,
          startDate?.getTime(),
          item.Name
        )

        let x = rows.filter((item) => {
          console.log(
            'inside you wjat os tjo filter',
            item?.Date >= startDate?.getTime() &&
            item?.Date <= startDate?.getTime() + 86400000,
            startDate?.getTime() + 86399999,
            startDate?.getTime(),
            item.Name
          )
          return (
            item?.Date >= startDate?.getTime() &&
            item?.Date <= startDate?.getTime() + 86400000
          )
        })
        setRows(x)
      } else {
        return item
      }
    })
  }
  const filterSearchString = async (parent) => {
    return
    let x = await parent.filter((item) => {
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
    console.log('property is', property)
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

  const handleClick = (event, row) => {
    // const selectedIndex = selected.indexOf(name)
    let newSelected = []

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name)
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1))
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1))
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   )
    // }
    selUserProfileF('Visitor Profile', row)
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [selBlock, setSelBlock] = React.useState({})
  const [viewUnitStatusA, setViewUnitStatusA] = React.useState([
    'Phone No',
    'Registerd By',

    // 'Blocked',
    // 'Booked',
    // 'Total',
  ])
  React.useEffect(() => {
    if (user) {
      const { role } = user

      if (role[0] === 'sales-manager') {
        setViewUnitStatusA(['Phone No', 'Assigned To'])
      }
    }
  }, [user])

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
    <Section 
      sx={{ width: '100%', mx: 'auto' }}
  style={{ border: 'none', borderRadius: 0 }}
    >
      <EnhancedTableToolbar
        numSelected={selected.length}
        selStatus={selStatus}
        filteredData={rows}
        searchKey={searchKey}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        setSearchKey={setSearchKey}
        rows={rows}
        viewUnitStatusA={viewUnitStatusA}
        pickCustomViewer={pickCustomViewer}
        setViewUnitStatusA={setViewUnitStatusA}
        leadsFetchedData={leadsFetchedData}
        searchVal={searchVal}
      />
      <section
        style={{ borderTop: '1px solid #efefef', background: '#fefafb' }}
      >
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table
            sx={{ minWidth: 750, minHeight: 260 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              searchkey={searchKey}
              viewUnitStatusA={viewUnitStatusA}
            />

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(rows, getComparator(order, orderBy)).map( */}

              {/* item.Assignedto.toLowerCase().includes(
                    searchKey.toLowerCase()
                  ) || */}
              {

                leadsFetchedData
                  ?.filter((item) => {
                    if (searchKey == '' || !searchKey) {
                      return item
                    }
                    else if (
                      item.Email.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Mobile.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Name.toLowerCase().includes(searchKey.toLowerCase()) ||
                      item.Source.toLowerCase().includes(
                        searchKey.toLowerCase()
                      )
                    ) {
                      return item
                    }
                  })


                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.Name)
                    const labelId = `enhanced-table-checkbox-${index}`
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          align="center"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          size="small"
                        >
                          {index + 1}
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <section>
                            <span className="font-bodyLato">
                              {prettyDate(row.Date).toLocaleString()}
                            </span>

                          </section>
                        </TableCell>
{/*

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <section>
                            <span className="font-bodyLato">
                            {row.assignT != undefined
                          ? prettyDate(row.assignT)
                          : prettyDate(row.Date)}
                            </span>

                          </section>
                        </TableCell> */}




                        <TableCell align="left">
                          <section>
                            <div>
                              <div
                                className="relative flex flex-col  group"
                              // style={{ alignItems: 'end' }}
                              >
                                <div
                                  className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex"
                                  // style={{  width: '300px' }}
                                  style={{ 'zIndex': '9' }}
                                >
                                  <span
                                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                    style={{
                                      color: 'black',
                                      background: '#e2c062',
                                      maxWidth: '300px',
                                    }}
                                  >
                                    <div className="italic flex flex-col">
                                      <div className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                        <HighlighterStyle
                                          searchKey={searchKey}
                                          source={row.Name.toString()}
                                        />
                                      </div>
                                      <div className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                        <HighlighterStyle
                                          searchKey={searchKey}
                                          source={row.Email.toString()}
                                        />
                                      </div>
                                      <div>



                                      <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
    <HighlighterStyle
      searchKey={searchKey}
      source={row?.countryCode}
    />
  </span>
  {' '}

                                      <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                          <HighlighterStyle
                                            searchKey={searchKey}
                                            source={row?.Mobile?.toString()?.replace(
                                              /(\d{3})(\d{3})(\d{4})/,
                                              '$1-$2-$3'
                                            )}
                                          />
                                        </span>
                                        <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                          <HighlighterStyle
                                            searchKey={searchKey}
                                            source={row?.assignedToObj?.label}
                                          />
                                        </span>




                                      </div>
                                    </div>
                                  </span>
                                  <div
                                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                    style={{
                                      background: '#e2c062',
                                      marginRight: '12px',
                                    }}
                                  ></div>
                                </div>
                                <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                  <HighlighterStyle
                                    searchKey={searchKey}
                                    source={row.Name.toString()}
                                  />
                                </span>
                              </div>
                            </div>
                            {viewUnitStatusA.includes('Email Id') && (
                              <div>
                                <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                  <HighlighterStyle
                                    searchKey={searchKey}
                                    source={row.Email.toString()}
                                  />
                                </span>
                              </div>
                            )}
                            {viewUnitStatusA.includes('Phone No') && (
                              <div>


                              <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
    <HighlighterStyle
      searchKey={searchKey}
      source={row?.countryCode}
    />
  </span>

  {' '}
                                <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                  <HighlighterStyle
                                    searchKey={searchKey}
                                    source={row?.Mobile?.toString()?.replace(
                                      /(\d{3})(\d{3})(\d{4})/,
                                      '$1-$2-$3'
                                    )}
                                  />
                                </span>



                              </div>
                            )}
                            {   <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                                  <HighlighterStyle
                                    searchKey={searchKey}
                                    source={row?.assignedToObj?.label}
                                  />
                                </span>}
                          </section>
                        </TableCell>

                        <TableCell align="left">{row.Event}</TableCell>
                        {/* display:
                  viewUnitStatusA.includes('Assigned To') &&
                  headCell.id === 'Assigned'
                    ? 'none'
                    : '', */}
                        {viewUnitStatusA.includes('Assigned To') && (
                          <TableCell align="left">
                            {/* <HighlighterStyle
                        searchKey={searchKey}
                        source={row.Assignedto}
                      /> */}
                            <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                              {row?.assignedToObj?.label}
                            </span>
                          </TableCell>
                        )}

                        <TableCell align="center">
                          <section className="flex flex-col">
                            <span className="px-2 font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]  ">
                              {row?.Source?.toString() || 'NA'}
                            </span>
                            {/* <Rating name="size-small half-rating-read" defaultValue={2.5} size="small" precision={0.5} readOnly /> */}

                          </section>
                        </TableCell>

                        <TableCell align="left">


                          <span className="px-2 font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                            <HighlighterStyle
                              searchKey={searchKey}
                              source={row?.assignedToObj?.label?.toString()}
                            />
                          </span>
                        </TableCell>
                        {viewUnitStatusA.includes('Registerd By') && (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <>
                              {/* <span className="font-bodyLato">
                          {prettyDate(row?.stsUpT || row.Date).toLocaleString()}
                        </span> */}
                        <span className="px-2 font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-[#667085]">
                            <HighlighterStyle
                              searchKey={searchKey}
                              source={row?.by}
                            />
                          </span>
                            </>
                          </TableCell>)}
                        {viewUnitStatusA.includes('Next Sch') && <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <>
                            {/* <span className="font-bodyLato">
                          {prettyDate(row?.stsUpT || row.Date).toLocaleString()}
                        </span> */}
                            <span className="px- py-[1px]  min-w-[100px] inline-flex text-xs leading-5 tracking-wide  rounded-full  text-green-800">
                              {Math.abs(
                                getDifferenceInMinutes(
                                  (row?.schTime),
                                  ''
                                )
                              ) > 60
                                ? Math.abs(
                                  getDifferenceInMinutes(
                                    (row?.schTime),
                                    ''
                                  )
                                ) > 1440
                                  ? `${Math.abs(getDifferenceInDays(
                                    (row?.schTime),
                                    ''
                                  ))} Days `
                                  : `${Math.abs(getDifferenceInHours(
                                    (row?.schTime),
                                    ''
                                  ))} Hours `
                                : `${Math.abs(getDifferenceInMinutes(
                                  (row?.schTime),
                                  ''
                                ))} Min`}{' '}
                              {getDifferenceInMinutes(
                                (row?.schTime),
                                ''
                              ) < 0
                                ? 'ago'
                                : 'Left'}
                            </span>
                          </>
                        </TableCell>
                        }
                        <TableCell
                          align="left"
                          style={{ maxWidth: '100px', maxHeight: '100px', textOverflow: 'ellipsis' }}
                        >
                          {' '}
                          <span className="font-bodyLato" style={{ maxWidth: '100px', maxHeight: '100px', textOverflow: 'ellipsis' }}>{row.Note}</span>
                        </TableCell>
                      </TableRow>
                    )
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
      </section>
    </Section>
  )
}
