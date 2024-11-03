/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import * as React from 'react'

// import '../../styles/myStyles.css'
import {
  Rating,
} from '@mui/material'
import Section from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'

import { useAuth } from 'src/context/firebase-auth-context'
import {
  prettyDate,
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
} from 'src/util/dateConverter'

import 'react-datepicker/dist/react-datepicker.css'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { visuallyHidden } from '@mui/utils'
import Highlighter from 'react-highlight-words'

import CSVDownloader from 'src/util/csvDownload'
import DropCompUnitStatus from 'src/components/dropDownUnitStatus'
import { computeTotal } from 'src/util/computeCsTotals'
// import { prettyDate } from '../../util/dateConverter'
// import DropCompUnitStatus from '../dropDownUnitStatus'



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
    id: 'name',
    numeric: false,
    disablePadding: true,
    align: 'left',
    label: 'Credit Note From',
  },
  {
    id: 'AssignedOn',
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'On units',
  },


  {
    id: 'received',
    numeric: false,
    disablePadding: false,
    align: 'right',
    label: 'In Review Amount',
  },
  {
    id: 'balance',
    numeric: false,
    disablePadding: false,
    align: 'right',
    label: 'Approved Amount',
  },
  {
    id: 'balance',
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'Approver Status',
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

    if(['partA', 'legal', 'maintenance', 'club', 'infra'].includes(headCell)){
      return viewUnitStatusA.includes('Cost Split') ? '' : 'none'
    }  else if(['avgsft', 'sv_sft', 'bmrda_strr'].includes(headCell)){
      return viewUnitStatusA.includes('Avg sqft Cost') ? '' : 'none'
    } else if(['crm_executive'].includes(headCell)){
      return viewUnitStatusA.includes('Stalls Executive') ? '' : 'none'
    }else if(['sale_executive'].includes(headCell)){
      return viewUnitStatusA.includes('Registration Executive') ? '' : 'none'
    }else if(['Notes'].includes(headCell)){
      return viewUnitStatusA.includes('Remarks') ? '' : 'none'
    }
    else {
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
    <TableHead style={{ height: '10px' }}>
      <TableRow selected={true}>
        <TableCell
          align="center"
          component="th"
          scope="row"
          padding="none"
          size="small"
          style={{
            backgroundColor: '#F7F9FB',
            color: '#1a91eb',
            maxHeight: '10px',
            height: '10px',
            lineHeight: '10px',
            maxWidth: '52px',
            minWidth: '25px',
            paddingLeft: '14px',
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
          <TableSortLabel>S.No</TableSortLabel>
        </TableCell>
        {headCells.map((headCell) => (
          <>
            <TableCell
              key={headCell.id}
              align={headCell?.align ||  'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                backgroundColor: '#F7F9FB',
                color: '#1a91eb',
                height: '10px',
                maxHeight: '10px',
                lineHeight: '7px',
                display: displayHeadersFun(headCell.id)
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{
                  backgroundColor: '#F7F9FB',
                  color: '#1a91eb',
                  fontFamily: 'inherit',
                }}
              >
                <span className="text-black font-bodyLato whitespace-nowrap">
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
    const downRows = []
    rowsAfterSearchKey?.map((data) => {
      const row = {}
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
      row.CountryCode = data['Country Code']
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
    const searchString = e.target.value

    const rowsR = leadsFetchedData.filter((item) => {
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
    <section className="flex flex-row justify-between pb pt-1 px-3 ">
      {/* <span className="flex flex-row">
        <span className="relative  p- border rounded h-7">
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
            // onChange={searchKeyField}
            value={searchKey}
            className="ml-6 bg-transparent text-xs focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none"
          />
        </span>

      </span> */}


      <span style={{ display: 'flex' }}>
        <section className="pt-1">
          <DropCompUnitStatus
            type={'Show Fields'}
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
export default function CreditNoteSummaryTableBody({
  fetchLeadsLoader,
  selStatus,
  rowsParent,
  selUserProfileF,
  newArray,
  leadsFetchedData,
  mySelRows,
  searchVal,
  viewUnitStatusA
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

  console.log(searchKey, "cdsvfeg", leadsFetchedData)
  React.useEffect(() => {
    filterSearchString(rows)
  }, [searchKey])



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
    const newSelected = []

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
    selUserProfileF('User Profile', row)
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [selBlock, setSelBlock] = React.useState({})



  return (
    <Section sx={{ width: '100%' }} style={{ border: 'none', radius: 0 }}>
      {/* <EnhancedTableToolbar
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
      /> */}
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
                          sx={{ whiteSpace: 'nowrap',  background: "#fff",  }}
                        >
                          {index + 1}
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{ whiteSpace: 'nowrap',  paddingRight: '6px' , paddingLeft: '6px', background: "#fff",  }}

                        >
                          <section>
                            <div className="font-bodyLato">
                            {row?.name}
                            </div>
                            {/* <div className="font-bodyLato">
                            {row?.customerDetailsObj?.email1?.toString()}
                            </div> */}

                          </section>
                        </TableCell>


                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                          sx={{background: '#fff', paddingTop: '4px', paddingBottom:'4px', }}

                        >
                          <section>
                            <span className="font-bodyLato">
                            {row?.T_credit_note_units}
                            </span>
                          </section>
                        </TableCell>

                        <TableCell align="right" sx={{ whiteSpace: 'nowrap', background: "#fff", paddingRight: '6px' }} padding="none">
        ₹{row?.T_credit_note_review?.toLocaleString('en-IN')}
        </TableCell>


       <TableCell align="right" sx={{ whiteSpace: 'nowrap', background: "#fff", paddingRight: '6px' }} padding="none" >
        ₹{(row?.T_credit_note_approved?.toLocaleString('en-IN')) || 0}
        </TableCell>


        <TableCell align="center" sx={{background: "#fff"}} padding="none">
                        <span className="px-2 uppercase inline-flex text-[10px] leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <HighlighterStyle
                            searchKey={searchKey}
                            source={row?.userStatus?.toString()}
                          />
                        </span>
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
