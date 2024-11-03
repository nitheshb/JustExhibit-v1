/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable react/jsx-key */
// // src/App.js
// import React from 'react'

// import {
//   ColumnDef,
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   flexRender,
// } from '@tanstack/react-table'

// const data = [{
//   id: "728ed52f",
//   amount: 100,
//   status: "pending",
//   email: "m@example.com",
// },]

// const columns = [
//   {
//     Header: 'ID',
//     accessor: 'id',
//   },
//   {
//     Header: 'Email',
//     accessor: 'email',
//   },
//   {
//     Header: 'Amount',
//     accessor: 'amount',
//   },
//   {
//     Header: 'Status',
//     accessor: 'status',
//   },
//   // Add more columns as needed
// ]

// function AdvancedDataTableTest() {
//   return (
//     <div className="App">
//       <h1>Advanced React Table Example</h1>
//       <AdvancedDataTable columns={columns} data={data} />
//     </div>
//   )
// }

// export default AdvancedDataTableTest

// // src/AdvancedDataTable.js

// export function AdvancedDataTable({ columns, data }) {

//   return (
//     <table {...getTableProps()} className="table">
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

import { useState, useCallback, useEffect } from 'react'

// @mui
import { SearchIcon } from '@heroicons/react/solid'
import { BookTwoTone } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper, { PaperProps } from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import { startOfDay } from 'date-fns'
import isEqual from 'lodash/isEqual'

// routes
// _mock
// hooks
// components
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
// import { ConfirmDialog } from 'src/components/custom-dialog'
// import Iconify from 'src/components/iconify'
// import Label from 'src/components/label'
// import Scrollbar from 'src/components/scrollbar'
// import { useSettingsContext } from 'src/components/settings'

// import { useBoolean } from 'src/hooks/use-boolean'
// import { RouterLink } from 'src/routes/components'
// import { useRouter } from 'src/routes/hook'
// import { paths } from 'src/routes/paths'
// types
// import {
//   IUserItem,
//   IUserTableFilters,
//   IUserTableFilterValue,
// } from 'src/types/user'

//
// import UserTableFiltersResult from '../user-table-filters-result'
// import UserTableRow from '../user-table-row'
// import UserTableToolbar from '../user-table-toolbar'

import {
  getAllProjects,
  getBookedUnitsByProject,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import CSVDownloader from 'src/util/csvDownload'
import { prettyDate, prettyDateTime, timeConv } from 'src/util/dateConverter'
import {
  SlimDateSelectBox,
  SlimSelectBox,
} from 'src/util/formFields/slimSelectBoxField'

import { _userList, _roles, USER_STATUS_OPTIONS } from './_mock'
import ConfirmDialog from './_mock/comps/confirm-dialog'
import CustomBreadcrumbs from './_mock/comps/custom-breadcrumbs'
import { useBoolean } from './_mock/comps/hook-form/use-boolean'
import Iconify from './_mock/comps/iconify'
import Label from './_mock/comps/Label'
import Scrollbar from './_mock/comps/scrollbar'
import { useSettingsContext } from './_mock/comps/settings-context'
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from './_mock/comps/table'
import { IUserItem } from './_mock/comps/usersTable/user-quick-edit-form'
import UserTableFiltersResult from './_mock/comps/usersTable/user-table-filters-result'
import UserTableRow from './_mock/comps/usersTable/user-table-row'
// import { useBoolean } from './_mock/comps/hook-form/use-boolean'
import UserTableToolbar, {
  IUserTableFilters,
  IUserTableFilterValue,
} from './_mock/comps/usersTable/user-table-toolbar'
import zIndex from '@mui/material/styles/zIndex'

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'booked', label: 'Booked' },
  { value: 'agreement_pipeline', label: 'Agreements' },
  { value: 'sd_pipeline', label: 'Sale Deeds' },
  { value: 'registered', label: 'Registered' },
]

const TABLE_HEAD = [
  { id: 'name', label: 'CustomerName', width: 300, minWidth: 200 },
  { id: 'unit_details', label: 'Unit', width: 180, align: 'center' },
  { id: 'status', label: 'Status', width: 100, align: 'center' },
  { id: 'role', label: 'BMRDA/STRR', width: 180, align: 'center' },
  { id: 'booked_on', label: 'Booked On', width: 120, align: 'center' },
  { id: 'land_C', label: 'Land Cost', width: 120 },
  { id: 'infra_C', label: 'Infrastructure', width: 120 },
  { id: 'clubhouse_C', label: 'Clubhouse Charges', width: 120 },
  { id: 'maintenace_C', label: 'Maintenance Charges', width: 120 },
  { id: 'legal_C', label: 'Legal Charges', width: 120 },
  { id: 'sale_c', label: 'Sale Value', width: 120, align: 'right' },
  { id: 'sft_C', label: 'sftCost', width: 120 },
  { id: 'sv_C', label: 'SV/sft', width: 120 },
  { id: 'received', label: 'Received', width: 120, align: 'right' },
  { id: 'balance', label: 'Balance', width: 120, align: 'right' },
  { id: 'crm_exect', label: 'Stalls Executive', width: 120 },
  { id: '', width: 88 },
]

const defaultFilters: IUserTableFilters = {
  name: '',
  projects: [],
  status: 'all',
}

// ----------------------------------------------------------------------

export default function UserListView() {
  const d = new window.Date()

  const table = useTable()
  const { user } = useAuth()
  const { orgId } = user

  const settings = useSettingsContext()

  // const router = useRouter()

  const confirm = useBoolean()

  const [tableData, setTableData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [dispRows, setDispRows] = useState([])
  const [showSettings, setShowSettings] = useState(true)
  const [sourceDateRange, setSourceDateRange] = useState(
    startOfDay(d).getTime()
  )

  const [selProject, setSelProject] = useState({
    label: 'alltransactions',
    value: '',
    uid: '',
  })
  const [filters, setFilters] = useState(defaultFilters)






  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  })

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  )
  useEffect(() => {
    const z = dataFiltered.filter((data)=>  data?.pId == selProject?.value)
    console.log('filtered values are', z, dataFiltered)
    setDispRows(z)
  }, [dataFiltered, selProject])
  table.dense = true
  const denseHeight = table.dense ? 52 : 72

  const canReset = !isEqual(defaultFilters, filters)

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length

  useEffect(() => {
    boot()
  }, [])

  const boot = async () => {
    await getProjectsListFun()
    const unsubscribe = await getBookedUnitsByProject(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          const y = projectList.filter((proj) => proj?.uid == x?.pId)
          console.log(',my prject sel is  ===> ', projectList)
          if (y.length > 0) {
            console.log(',my prject sel is ', y)
            x.projName = y[0].eventName
          }
          return x
        })
        // setBoardData
        // console.log('my Array data is ', usersListA, crmCustomersDBData)
        // await serealizeData(usersListA)
        await setTableData(usersListA)

        // await setCrmCustomerDBData(usersListA)
        // if (statusFil === 'booked') {
        //   await setBookingReviewA(usersListA)
        //   await setBookingReviewCo(usersListA.length)
        // } else if (statusFil === 'agreement_pipeline') {
        //   await setAgreePipeA(usersListA)
        //   await setAgreePipeCo(usersListA.length)
        // } else if (statusFil === 'sd_pipeline') {
        //   await setSdPipeA(usersListA)
        //   await setSdPipeCo(usersListA.length)
        // } else if (statusFil === 'registered') {
        //   await setRegisteredA(usersListA)
        //   await setRegisteredCo(usersListA.length)
        // } else if (statusFil === 'unassigned') {
        //   await setUnAssignedA(usersListA)
        //   await setUnAssignedCo(usersListA.length)
        // }
        // await console.log('my Array data is set it', crmCustomersDBData)
      },
      {
        status: ['booked', 'agreement_pipeline', 'sd_pipeline', 'registered'],
      },
      () => setTableData([])
    )
    return unsubscribe
  }
  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched proejcts list is', projectsListA)
        let z = [{'label': 'All Events', value: 'allprojects'}, ...projectsListA]
        setprojectList(z)
      },
      (error) => setprojectList([])
    )
    return unsubscribe
  }
  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      table.onResetPage()
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    },
    [table]
  )

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id)
      setTableData(deleteRow)

      table.onUpdatePageDeleteRow(dataInPage.length)
    },
    [dataInPage.length, table, tableData]
  )

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    )
    setTableData(deleteRows)

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    })
  }, [dataFiltered.length, dataInPage.length, table, tableData])

  // const handleEditRow = useCallback(
  //   (id: string) => {
  //     // router.push(paths.dashboard.user.edit(id))
  //   },
  //   [router]
  // )

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue)
    },
    [handleFilters]
  )

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return (
    <>
      <Paper variant="outlined" sx={{ width: '100%', px: 0 }}>
        <Paper
          maxWidth={settings.themeStretch ? false : 'lg'}
          sx={{ width: '100%', px: 0, '!important': { px: 0 } }}
        >
          {/* <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: "/" },
            { name: 'User', href: "/" },
            { name: 'List' },
          ]}
          action={
            <Button

              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New User
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        /> */}

          <Card sx={{ px: 0 }}>
            <div className="flex flex-row ">
              <Tabs
                value={filters.status}
                onChange={handleFilterStatus}
                sx={{
                  px: 0,
                  boxShadow: (theme) =>
                    `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                }}
              >
                {STATUS_OPTIONS.map((tab) => (
                  <Tab
                    sx={{ minHeight: '47px' }}
                    key={tab.value}
                    iconPosition="end"
                    value={tab.value}
                    label={tab.label}
                    icon={
                      <Label
                        variant={
                          ((tab.value === 'all' ||
                            tab.value === filters.status) &&
                            'filled') ||
                          'soft'
                        }
                        color={
                          (tab.value === 'booked' && 'success') ||
                          (tab.value === 'agreement_pipeline' && 'warning') ||
                          (tab.value === 'sd_pipeline' && 'error') ||
                          'default'
                        }
                      >
                        {tab.value === 'all' && tableData.length}
                        {tab.value === 'booked' &&
                          tableData.filter((user) => user.status === 'booked')
                            .length}

                        {tab.value === 'agreement_pipeline' &&
                          tableData.filter(
                            (user) => user.status === 'agreement_pipeline'
                          ).length}
                        {tab.value === 'sd_pipeline' &&
                          tableData.filter(
                            (user) => user.status === 'sd_pipeline'
                          ).length}
                        {tab.value === 'registered' &&
                          tableData.filter(
                            (user) => user.status === 'registered'
                          ).length}
                      </Label>
                    }
                  />
                ))}
              </Tabs>
              <div className="flex flex-row mr-4 mt-2">
                <span
                  className="flex mt-[4px] mr-[0px] justify-center items-center w-6 h-6 bg-gradient-to-r from-violet-200 to-pink-200 rounded-full  cursor-pointer "
                  onClick={() => {
                    setShowSettings(!showSettings)
                  }}
                >
                  <SearchIcon className=" w-3 h-3" />
                </span>
              </div>
            </div>
            <div
              className={`${showSettings ? 'hidden' : ''} flex flex-row py-2  `}
            >
              <div className="flex flex-row w-full">
                <span className="flex ml-2 mr-2 h-[34px] w-[300px] bg-gray-50 border border-gray-300 border-solid box-border w-1/3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4  mt-[9px] mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <input
                    type="text"
                    id="globalSearch"
                    placeholder="Search Stall No, Customer name, Phone no, Dues..."
                    // onChange={searchKeyField}
                    autoComplete="off"
                    // value={searchKey}
                    className="w-52 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none text-sm leading-7 text-gray-900 w-4/5 relative"
                  />
                </span>
                <div className=" mr-2 min-w-[200px] max-w-[200px]">
                  <SlimSelectBox
                    name="project"
                    label=""
                    className="input "
                    onChange={(value) => {
                      console.log('value is ', value)
                      setSelProject({
                        label: value?.value,
                        value: value?.uid,
                        uid: value?.uid,
                      })
                      // formik.setFieldValue('project', value.value)
                    }}
                    value={selProject?.label}
                    // options={aquaticCreatures}
                    options={projectList}
                  />
                </div>

                <span className="mt-2 ml-2 text-red-400 cursor-pointer text-xs">
                  {' '}
                  Clear
                </span>
              </div>
              <span style={{ display: '' }}>
                <CSVDownloader
                  className="mr-6 h-[20px] w-[20px] mt-2"
                  downloadRows={dataFiltered}
                  style={{ height: '20px', width: '20px' }}
                />
              </span>
            </div>

            {/* <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={[
              'booked',
              'agreement_pipeline',
              'sd_pipeline',
              'registered',
            ]}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )} */}

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                }
              />
              <Paper variant="outlined" sx={{ width: '95%' }}>
                <Scrollbar>
                  <Table
                    size={table.dense ? 'small' : 'medium'}
                    sx={{ minWidth: 960 }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          tableData.map((row) => row.id)
                        )
                      }
                    />

                    <TableBody>
                      {dispRows
                        // .slice(
                        //   table.page * table.rowsPerPage,
                        //   table.page * table.rowsPerPage + table.rowsPerPage
                        // )
                        .map((row) => (
                          <UserTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            // onEditRow={() => handleEditRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(
                          table.page,
                          table.rowsPerPage,
                          tableData.length
                        )}
                      />

                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </Paper>
            </TableContainer>
            <Paper variant="outlined" sx={{ width: '95%' }}>
              <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
                //
                dense={true}
                onChangeDense={table.onChangeDense}
              />
            </Paper>
          </Card>
        </Paper>
      </Paper>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete{' '}
            <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows()
              confirm.onFalse()
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  )
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUserItem[]
  comparator: (a: any, b: any) => number
  filters: IUserTableFilters
}) {
  const { name, status, projects } = filters

  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status)
  }

  if (projects.length) {
    inputData = inputData.filter((user) => projects.includes(user?.pId))
  }

  return inputData
}
