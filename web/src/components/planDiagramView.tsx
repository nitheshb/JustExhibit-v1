/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import { DownloadIcon, EyeIcon } from '@heroicons/react/outline'
import AppsIcon from '@mui/icons-material/Apps'
import SortIcon from '@mui/icons-material/Sort'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { deleteAsset, getPlanDiagramByPhase } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import ProjectDocRow from './A_ProjModule/Docu_row'
import SiderForm from './SiderForm/SiderForm'
const PlanDiagramView = ({
  title,
  blocks = [],
  phaseFeed,
  pId,
  category,
  projectDetails,
  phaseDetails,
  data,
  source,
}) => {
  const { user } = useAuth()

  const { orgId } = user
  console.log('piddd is ', pId, blocks, phaseFeed, data)
  const [planDiagramsA, setPlanDiagramsA] = useState([])
  const [showAssetLink, setShowAssetLink] = useState('')
  const [editOpitionsObj, setEditOptions] = useState(false)
  const [formats, setFormats] = React.useState('grid')

  useEffect(() => {
    if (['projectManagement', 'projectOnboard'].includes(source)) {
      setEditOptions(true)
    }
  }, [source])
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: 'Plan Diagram',
    sliderData: {},
    widthClass: 'max-w-xl',
  })
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
      widthClass: 'max-w-xl',
    })
  }

  useEffect(() => {
    if (pId && title === 'Plan Diagram') {
      getPlanDiagrams(data?.uid, 'plan_diagram')
    } else if (pId && (title === 'Brouchers' || category === 'Brouchers') ) {
      getPlanDiagrams(data?.uid, 'broucher')
    }  else if (
      pId &&
      (title === 'projectApprovals' || category === 'projectApprovals')
    ) {
      getPlanDiagrams(data?.uid, 'approval')
    } else if (pId && category === 'legalDocs') {
      getPlanDiagrams(data?.uid, 'approval')
    }
    else if (pId && category === 'others') {
      getPlanDiagrams(data?.uid, 'others')
    }
  }, [pId, title])
  const getPlanDiagrams = async (phaseId, type) => {
    const unsubscribe = getPlanDiagramByPhase(
      orgId,
      { pId: pId, phaseId, type: type },
      (querySnapshot) => {
        const response = querySnapshot.docs.map((docSnapshot) => {
          return { ...docSnapshot.data(), ...{ docId: docSnapshot.id } }
        })
        console.log('plan_diagram data is ', response)
        setPlanDiagramsA(response)
      },
      (e) => {
        console.log('error', e)
      }
    )
    return unsubscribe
  }
  const deleteAssetFun = async (docId) => {
    console.log('assert details ', docId)
    // create a delete query for assetDetails
    // where url = assetDetails?.url
    deleteAsset(orgId, docId, '', '', '')
  }

  const url =
    'https://firebasestorage.googleapis.com/v0/b/redefine-erp.appspot.com/o/spark_files%2F_1ee556d8-a0c0-4be1-a4bd-841a85807eab?alt=media&token=3ca92b26-ed31-4205-b006-acba3bb5951a'
  const handleDownload = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch(console.error)
  }
  return (
    <section className="flex flex-col w-full">
      <div className="">
        <div className="inline ">
          <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
            <section className="flex flex-row mx-4 py-4">
              <span className="ml-2 mt-[1px] ">
                <label className="font-semibold text-[#053219]  text-[18px]  mb-1  ">
                  {title}
                  <abbr title="required"></abbr>
                </label>
              </span>
            </section>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row px-4">
        <div className="w-full">
          <section className="justify-between">
            <section className="flex flex-row justify-between">
              <div className="mt-4">
                {' '}
                <ToggleButtonGroup
                  value={formats}
                  // onChange={()=>{console.log(formats)}}
                  aria-label="text formatting"
                  sx={{ height: '28px' }}
                >
                  <ToggleButton
                    value="list"
                    aria-label="List"
                    onClick={() => {
                      setFormats('list')
                    }}
                  >
                    <SortIcon sx={{ height: '12px' }} />
                  </ToggleButton>
                  <ToggleButton
                    value="grid"
                    aria-label="Grid"
                    onClick={() => {
                      setFormats('grid')
                    }}
                  >
                    <AppsIcon sx={{ height: '12px' }} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {editOpitionsObj && (
                <button
                  className="text-right"
                  onClick={() => {
                    setSliderInfo({
                      open: true,
                      title: title,
                      sliderData: {},
                      widthClass: 'max-w-xl',
                    })
                  }}
                >
                  {planDiagramsA.length > 0 && (
                    <time className="block mb-2 mt-3 text-sm font-normal leading-none text-gray-400 ">
                      <span className="text-blue-600">
                        {' '}
                        <PlusCircleIcon
                          className="h-4 w-4 mr-1 mb-[2px] inline"
                          aria-hidden="true"
                        />
                        <span>Add New</span>
                      </span>
                    </time>
                  )}
                </button>
              )}
            </section>
          </section>
          <ul className="max-h-[500px] w-full">
            {formats === 'list' &&
              planDiagramsA.map((doc, i) => {
                return (
                  <section
                    key={i}
                    className="w-full"
                    onClick={() => {
                      // show sidebar and display the worddoc
                      setSliderInfo({
                        open: true,
                        title: 'viewDocx',
                        sliderData: {},
                        widthClass: 'max-w-xl',
                      })
                    }}
                  >
                    <ProjectDocRow
                      id={doc?.url}
                      url={doc?.url}
                      fileName={doc?.name}
                      date={doc?.cTime}
                    />
                  </section>
                )
              })}
            {/* <ProjectDocRow
                                    id={doc?.id}
                                    fileName={doc?.name}
                                    date={doc?.time}
                                  /> */}
            {formats === 'grid' && (
              <section className="grid gap-4 grid-cols-2">
                {planDiagramsA.map((planDiagram, i) => {
                  return (
                    <li key={i} className="mt-4 cursor-pointer">
                      {planDiagram?.url != undefined && (
                        <>
                          <section className="border-b-2 border-[#525659]">
                            <object
                              data={planDiagram?.url}
                              type="application/pdf"
                              width="100%"
                              height="100%"
                            >
                              <p>
                                Alternative text - include a link{' '}
                                <a href="https://firebasestorage.googleapis.com/v0/b/redefine-erp.appspot.com/o/spark_files%2F_1ee556d8-a0c0-4be1-a4bd-841a85807eab?alt=media&token=3ca92b26-ed31-4205-b006-acba3bb5951a">
                                  to the PDF!
                                </a>
                              </p>
                            </object>
                          </section>
                        </>
                      )}
                      <div
                        style={{ textAlign: '' }}
                        className="flex flex-row justify-between"
                      >
                        <span
                          className="block mt-3 text-sm text-green-600 uppercase"
                          onClick={() => setShowAssetLink(planDiagram?.url)}
                        >
                          {planDiagram?.name}
                        </span>
                        <section>
                          <a
                            href={planDiagram?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={planDiagram?.name}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            // onClick={() => setShowAssetLink(planDiagram?.url)}
                          >
                            <EyeIcon
                              className="h-4 w-4 mr-2  mt-3 inline"
                              aria-hidden="true"
                            />
                          </a>
                          <span
                            onClick={() =>
                              handleDownload(
                                planDiagram?.url,
                                planDiagram?.name
                              )
                            }
                          >
                            <DownloadIcon
                              className="h-4 w-4 mr-2  mt-3 inline"
                              aria-hidden="true"
                            />
                          </span>
                          {editOpitionsObj && (
                            <span
                              onClick={() => deleteAssetFun(planDiagram?.docId)}
                            >
                              <TrashIcon
                                className="h-4 w-4 mr-1  mt-3 inline"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </section>
                      </div>
                      {/* <span>{planDiagram?.url}</span> */}
                      {/* <BlockStatsCards
                  kind={block?.blockName}
                  feedData={block}
                  bg={selBlock?.uid === block?.uid ? '#efefef' : '#fef7f7'}
                  setSelBlock={setSelBlock}
                /> */}
                    </li>
                  )
                })}
              </section>
            )}
          </ul>
        </div>
        {planDiagramsA.length > 0 && (
          <>
            {/* <iframe
              src="http://docs.google.com/gview?url=https://firebasestorage.googleapis.com/v0/b/redefine-erp.appspot.com/o/spark_files%2F_1ee556d8-a0c0-4be1-a4bd-841a85807eab?alt=media&token=3ca92b26-ed31-4205-b006-acba3bb5951a&embedded=true"
              style={{ width: '718px', height: '700px' }}
              frameBorder="0"
            ></iframe> */}
            {/* <section className="h-[600px] w-[51%]">
              <object
                data={showAssetLink}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{' '}
                  <a href="https://firebasestorage.googleapis.com/v0/b/redefine-erp.appspot.com/o/spark_files%2F_1ee556d8-a0c0-4be1-a4bd-841a85807eab?alt=media&token=3ca92b26-ed31-4205-b006-acba3bb5951a">
                    to the PDF!
                  </a>
                </p>
              </object>
            </section> */}
          </>
        )}
        {planDiagramsA.length === 0 && (
          <div className="py-8 px-8 flex flex-col items-center mt-5 w-full">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[180px] h-[180px] inline"
                alt=""
                src="/note-widget.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
              No {title} Available
            </h3>
            <button
              onClick={() => {
                setSliderInfo({
                  open: true,
                  title: title,
                  sliderData: {},
                  widthClass: 'max-w-xl',
                })
              }}
            >
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                Better always attach a string
                {editOpitionsObj && (
                  <span className="text-blue-600"> Add {title}</span>
                )}
              </time>
            </button>
          </div>
        )}
      </div>
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        pId={pId}
        phaseDetails={data}
      />
    </section>
  )
}

export default PlanDiagramView
