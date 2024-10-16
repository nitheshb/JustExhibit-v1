/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import AppsIcon from '@mui/icons-material/Apps'
import SortIcon from '@mui/icons-material/Sort'
import { Card, Grid } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { Link } from '@redwoodjs/router'

import FileCardAnim from 'src/components/A_LegalModule/fileCard'
import DropDownSearchBar from 'src/components/dropDownSearchBar'
import DropCompUnitStatus from 'src/components/dropDownUnitStatus'
import DummyBodyLayout from 'src/components/DummyBodyLayout/DummyBodyLayout'
import SiderForm from 'src/components/SiderForm/SiderForm'
import { LegalFolders } from 'src/constants/projects'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'

import { PlusIcon } from '@heroicons/react/outline'
const LegalDocsHome = ({ project }) => {
  const { projectName } = project
  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [viewDocData, setViewDocData] = useState({})

  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])
  const [formats, setFormats] = React.useState('list')

  // interface files{
  //   name:string
  //   size:string,
  //   type:string,
  //   modified:string,
  //   shared:string[],
  //   id:number
  // }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 340,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.img}
            style={{ width: 35, height: 40, marginRight: 10 }}
          />
          {params.row.name}
        </div>
      ),
    },
    { field: 'size', headerName: 'Size', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'modified', headerName: 'Modified', width: 140 },
    { field: 'shared', type: 'string[]', headerName: 'Shared', width: 120 },
  ]

  useEffect(() => {
    getProjects()
  }, [])
  const LegalTab = [
    { lab: 'Name', val: 'name' },
    { lab: 'Size', val: 'size ' },
    { lab: 'Type', val: 'type' },
    { lab: 'Modified', val: 'modified' },
    { lab: 'Shared', val: 'shared' },
  ]
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.projectName
          user.value = user?.uid
        })
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }

  const dispDoc = (docData) => {
    setViewDocData(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }

  return (
    <div>
      <section className=" mt-1 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 mx-1 pr-10 rounded-lg px-6  w-[1430px]">
        <div className="  mx-auto border-solid sm:px-6 md:px-6 px-6  ">
          {/* <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0   mb-2">
              <Link
                className="flex items-center"
                // to={routes.projectEdit({ uid })}
              >
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  Documents
                </span>
              </Link>
            </div>
          </div> */}
          <span className="relative z-10 flex items-center w-auto text-lg font-bold leading-none pl-0 mt-[18px]">
            Documents
          </span>
          <div className=" mt-2">
            <form className="">
              <div className="flex">
                <div className="relative w-full ">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-1/4 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={` Search Documents,Categories, Agreements...`}
                    required
                  />
                  <section className="absolute top-0 right-0  flex flex-row  w-1/4  ">
                    <DropDownSearchBar
                      type={'All Events'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={projects}
                    />
                    <button
                      type="submit"
                      className="p-2.5 px-8 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </section>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-4">
            {' '}
            <ToggleButtonGroup
              value={formats}
              // onChange={()=>{console.log(formats)}}
              aria-label="text formatting"
            >
              <ToggleButton
                value="list"
                aria-label="List"
                onClick={() => {
                  setFormats('list')
                }}
              >
                <SortIcon />
              </ToggleButton>
              <ToggleButton
                value="grid"
                aria-label="Grid"
                onClick={() => {
                  setFormats('grid')
                }}
              >
                <AppsIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* <ul className="">
              <li className="py-2">
                <div className='border border-green rounded-xl mt-10 ml-2 mr-2 bg-gray-100 w-[1318px] h-16'>
                <section className="mt-2 flex flex-row ">
                  {LegalTab?.map((d, i) => (

                    <>
                      <div className={`text-md pt-3 ml-32 text-gray-700 leading-normal ${
                        d.lab==="Name"? "mr-80"
                        :""
                      }` } key={i}>{`${d.lab} `}
                      </div>
                    </>
                  ))}
                </section>
                </div>
              </li>
            </ul> */}

          {formats === 'list' ? (
            <div style={{ width: '98%' }} className="mt-16 h-auto">
              <DataGrid
                rows={LegalFolders}
                columns={columns}
                rowHeight={75}
                sx={{
                  fontWeight: 400,
                  // width:300,
                  // height:"820px",
                  fontSize: 14,
                  borderRadius: 3,
                  marginTop: 5,
                  paddingTop: 10,
                  padding: 5,
                  // borderColor:"#FFFFFF",

                  // marginRight:5,
                  paddingRight: 5,
                  '& .MuiDataGrid-row': {
                    height: 80,
                    border: 1,
                    borderColor: '#EDEFF1',
                    width: '99.5%',
                    // borderRight:1,
                    // marginRight:1,

                    marginTop: 2,
                    // paddingRight:5,
                    borderRadius: 3,
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    // border: 1,
                    width: '99.5%',
                    marginBottom: 2,
                    // borderTop: 1,
                    boxShadow: 2,
                    backgroundColor: '#F4F6F8',
                    borderRadius: 3,
                  },
                  '& .MuiDataGrid-footerContainer': {
                    // border: 1
                  },
                  '& .MuiTablePagination-selectLabel': {
                    color: 'rgba(0, 54, 101, 0.6)',
                  },
                  '& .MuiSelect-select': {
                    color: '#003665',
                  },
                  '& .MuiTablePagination-displayedRows': {
                    color: '#003665',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#003665',
                  },
                  '&>.MuiDataGrid-main': {
                    // '&>.MuiDataGrid-columnHeaders': {
                    //     borderBottom: 'none'
                    // },

                    '& div div div div >.MuiDataGrid-cell': {
                      borderBottom: 'none',
                    },
                  },
                }}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          ) : null}
          {formats === 'grid' ? (
            <div style={{ width: '98%' }} className="mt-16 h-auto">
              <div className="ml-3 mt-5 font-bold">Master Documents</div>
              <ul className="">
                <li className="py-2">
                  <section className="flex flex-row mt-5 grid grid-cols-5 ">
                    {LegalFolders?.map((project, i) => (
                      // <span key={i}>{project?.projectName}</span>
                      <>
                        {project.type === 'folder' ? (
                          <>
                            <div
                              key={i}
                              className=" cursor-pointer relative mx-auto break-words bg-white  mb-6  rounded-xl  transition duration-300 ease-in-out  "
                              onClick={() => dispDoc(project)}
                            >
                              {/* <FileCardAnim projectDetails={project} /> */}
                              <Card
                                sx={{
                                  borderRadius: 4,
                                }}
                                variant="outlined"
                                className="w-[230px] m-3 p-3"
                              >
                                <img
                                  alt=""
                                  className="h-12 w-10 bg-white "
                                  src={project.img}
                                />
                                <div className="font-semibold	">
                                  {project.name}
                                </div>
                                <div className="text-xs">{project.size}</div>
                                <div className="text-xs">{project.shared}</div>
                              </Card>
                            </div>
                          </>
                        ) : null}
                      </>

                      // <ProjectsMHomeBody
                      //   key={project.uid}
                      //   project={project}
                      //   onSliderOpen={() => {
                      //     // setProject(project)
                      //     // setIsEditProjectOpen(true)
                      //   }}
                      //   isEdit={false}
                      // />
                    ))}
                  </section>
                </li>
              </ul>

              <div className="ml-2 mt-5 font-bold">Unit Wise Documents</div>
              <ul className="">
                <li className="py-2">
                  <section className="flex flex-row mt-5 grid grid-cols-5 ">
                    {LegalFolders?.map((project, i) => (
                      // <span key={i}>{project?.projectName}</span>
                      <>
                        {project.type !== 'folder' ? (
                          <>
                            <div
                              key={i}
                              className=" cursor-pointer relative mx-auto break-words bg-white  mb-2  rounded-xl  transition duration-300 ease-in-out  "
                              onClick={() => dispDoc(project)}
                            >
                              {/* <FileCardAnim projectDetails={project} /> */}
                              <Card
                                sx={{
                                  borderRadius: 4,
                                }}
                                variant="outlined"
                                className="w-[230px] m-3 p-3"
                              >
                                <img
                                  alt=""
                                  className="h-12 w-10 bg-white "
                                  src={project.img}
                                />
                                <div className="font-semibold	">
                                  {project.name}
                                </div>
                                <div className="text-xs">{project.size}</div>
                                <div className="text-xs">{project.shared}</div>
                              </Card>
                            </div>
                          </>
                        ) : null}
                      </>

                      // <ProjectsMHomeBody
                      //   key={project.uid}
                      //   project={project}
                      //   onSliderOpen={() => {
                      //     // setProject(project)
                      //     // setIsEditProjectOpen(true)
                      //   }}
                      //   isEdit={false}
                      // />
                    ))}
                  </section>
                </li>
              </ul>
            </div>
          ) : null}

          <section className=" flex">
            {/* <div
              className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-sm inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
              onClick={() => {
                setSliderInfo({
                  open: true,
                  title: ['Apartments'].includes(
                    projectDetails?.projectType?.name
                  )
                    ? 'Import Units'
                    : 'Import Apartment Units',
                  sliderData: {
                    phase: {},
                    block: {},
                  },
                  widthClass: 'max-w-6xl',
                })
              }}
            >

              <div
                className="flex flex-col items-center justify-between"
                onClick={() => setIsOpenSideView(!isOpenSideView)}
              >
                <PlusIcon className="h-8 w-8 mr-1 mt-14" aria-hidden="true" />
                <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 text-xl ">
                  Upload Document
                </h3>
              </div>
              <div className="flex flex-row justify-between px-2">
                <span className="flex flex-row items-center justify-between mr-2">
                  <span className="text-sm font-"></span>
                </span>
              </div>
            </div> */}

            {/* <ul className="">
              <li className="py-2"> */}
            {/* <section className="flex flex-col"> */}
            {/* {projects?.map((project, i) => (
                    // <span key={i}>{project?.projectName}</span>
                    <>
                      <div
                        key={i}
                        // className=" cursor-pointer relative max-w-md mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6  rounded-xl  mr-8 transition duration-300 ease-in-out  "
                        onClick={() => dispDoc(project)}
                      >
                        <FileCardAnim projectDetails={project} />
                      </div>
                    </>

                    // <ProjectsMHomeBody
                    //   key={project.uid}
                    //   project={project}
                    //   onSliderOpen={() => {
                    //     // setProject(project)
                    //     // setIsEditProjectOpen(true)
                    //   }}
                    //   isEdit={false}
                    // />
                  ))} */}
            {/* </section> */}
            {/* </li>
            </ul> */}
          </section>
          {/* <div className="grid grid-cols-1 gap-7 mt-10">
            <span>
              <div
                className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                style={{ backgroundColor: '#f3f5ff' }}
              >
                <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                  <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 ">
                    {'Payslips'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                  {'This gets generated after 10 days of salary credit'}
                </div>
                <ul className="flex-1 p-0 mt-8 ml-2 mr-2  border   rounded-md leading-7 text-gray-900  border-gray-200">
                  {valueFeedData.map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                      >
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.k}
                          </span>
                        </span>

                        <div
                          className="relative flex flex-col items-center group"
                          style={{ alignItems: 'end' }}
                        >
                          <div
                            className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                            style={{ alignItems: 'end', width: '300px' }}
                          >
                            <span
                              className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                              style={{
                                color: 'black',
                                background: '#e2c062',
                                maxWidth: '300px',
                              }}
                            ></span>
                            <div
                              className="w-3 h-3  -mt-2 rotate-45 bg-black"
                              style={{
                                background: '#e2c062',
                                marginRight: '12px',
                              }}
                            ></div>
                          </div>
                          <span className="text-[16px] font-medium text-gray-900">
                            <DownloadIcon
                              className="h-5 w-5 mr-1 mt-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          </div> */}
        </div>
      </section>
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'upload_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-2xl"
        projectsList={projects}
      />
      <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'disp_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-xl"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      />
    </div>
  )
}

export default LegalDocsHome
