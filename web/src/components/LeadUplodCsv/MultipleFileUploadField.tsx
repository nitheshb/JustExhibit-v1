/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { Timestamp } from '@firebase/firestore'
import { DownloadIcon } from '@heroicons/react/solid'
import { Grid, makeStyles } from '@material-ui/core'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useField } from 'formik'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import {
  checkIfLeadAlreadyExists,
  checkIfUnitAlreadyExists,
  createPhaseAssets,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import { TextField } from 'src/util/formFields/TextField'

import { LAddLeadTable } from '../LAddLeadTable'
import LfileUploadTableHome from '../LfileUploadTableHome'
import Loader from '../Loader/Loader'

import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress'
import { UploadError } from './UploadError'

let currentId = 0

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId
}

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number
  file: File
  errors: FileError[]
  url?: string
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}))

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  lineHeight: '70px',

  // background: 'yellow',
  // textAlign: 'center',
  // lineHeight: '100px',
  // background: 'linear-gradient(to right, orange 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(blue 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(to right, green 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(red 50%, rgba(255, 255, 255, 0) 0%)',
  // backgroundPosition: 'top, right, bottom, left',
  // backgroundRepeat: 'repeat-x, repeat-y',
  // backgroundSize: '10px 1px, 1px 10px',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

export function MultipleFileUploadField({
  name,
  title,
  pId,
  myPhase,
  myBlock,
  source,
}) {
  const { user } = useAuth()

  const { orgId } = user
  const [_, __, helpers] = useField(name)
  const classes = useStyles()

  const [files, setFiles] = useState<UploadableFile[]>([])
  const [fileRecords, setfileRecords] = useState([])
  const [fileName, setFileName] = useState('')
  const [projectList, setprojectList] = useState([])
  const [salesTeamList, setSalesTeamList] = useState([])

  const [uploadedUrl, setUploadedUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    // get sales Team details
    if (title === 'Import Leads') {
      getAllProjects(
        orgId,
        async (querySnapshot) => {
          const usersListA = await querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          await setprojectList(usersListA)
          await console.log('fetched users list is', usersListA, projectList)
        },
        (error) => setprojectList([])
      )
      steamUsersListByRole(
        orgId,
        (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          usersListA.map((user) => {
            user.label = user.displayName || user.name
            user.value = user.uid
          })
          console.log('fetched users list is', usersListA)

          setSalesTeamList(usersListA)
        },
        (error) => setSalesTeamList([])
      )
    }
  }, [])

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }))
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }))
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
  }, [])

  useEffect(() => {
    helpers.setValue(files)
    // helpers.setTouched(true);
  }, [files])

  function uploadFile(file: File) {
    console.log('cloud it 1 ', file)
    setLoading(true)
    if (!file) return
    try {
      const uid = uuidv4()

      const storageRef = ref(storage, `/${orgId}_files/_${uid}.docx`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      // const uploadTask = storageRef.put(file);
      return uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          // setProgress(prog)
        },
        (err) => console.log(err),
        async () => {
          const { projectId, uid } = myPhase || {}
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          let type
          let format
          switch (title) {
            case 'Plan Diagram':
              type = 'plan_diagram'
              format = 'pdf'
              break
            case 'Brouchers':
              type = 'broucher'
              format = 'pdf'
              break
            case 'legal_doc_upload':
              type = 'legal_doc_upload'
              format = 'doc'

              break
            case 'Approvals':
              type = 'approval'
              format = 'pdf'
              break

            default:
              break
          }

          createPhaseAssets(
            orgId,
            url,
            'nithe.nithesh@gmail.com',
            fileName || file.name,
            pId,
            uid,
            type,
            format
          )
          // setUploadedUrl(url)
          setLoading(false)
          setFormMessage('Uploaded Successfully..!')
          await console.log('file url i s', url, myPhase)
          return url
          //  save this doc as a new file in spark_leads_doc
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  function onUpload(file: File, url: string) {
    console.log('field uploaded successfully', file, url, uploadedUrl)

    parse(file, {
      header: true,
      // download: true,
      complete: async function (input) {
        const records = input.data
        console.log('import stuff is', records)
        // await setfileRecords((existing) => [...existing, ...input.data])
        // set All records
        if (['Import Stalls'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => row['unit_no'] != '')

          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              console.log('input date is ', dRow)
              const foundLength = await checkIfUnitAlreadyExists(
                `${orgId}_units`,
                pId,
                myPhase?.uid || '',
                myBlock?.uid || '',
                dRow['unit_no']
              )
              dRow['mode'] = await makeMode(foundLength)
              await console.log(
                'foundLength is',
                foundLength,
                dRow,
                foundLength,
                dRow['Mobile']
              )
              return await dRow
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log('Finished: records', serialData, fileRecords)
        } else if (['Import Stalls'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => {
            return (
              (row['Stall No*'] != '' && row['Stall No*'] != undefined)
            )
          })
          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              const foundLength = await checkIfUnitAlreadyExists(
                `${orgId}_stalls`,
                pId,
                myPhase?.uid || '',
                myBlock?.uid || '',
                dRow['Stall No*'] || dRow['Stall No.*']
              )
              // Plot Type*
              const computPlotObj = {
                mode: await makeMode(foundLength),
                pId,
                phaseId: dRow[''] || 1,
                blockId: dRow[''] || 1,
                Date: Timestamp.now().toMillis(),
                unit_no: dRow['Stall No*'] || dRow['Stall No.*'],

                area: Number(dRow['Area sqft*']?.replace(',', '')),
                sqft_rate: dRow['Price per sqft*'],
                plc_per_sqft: dRow['PLC per sqft*'],
                area_sqm: dRow['Area sqm*'],
                sqm_rate: dRow['Price per sqm*'],
                plc_per_sqm: dRow['PLC per sqm*'],
                dimension: dRow['Dimension'] || '',
                size: dRow['Type*']?.toLowerCase(),


                status: dRow['Status*']?.toLowerCase() || 'available',
                release_status: dRow['Release Status*']?.toLowerCase(),

                intype: 'bulk',
                by: user?.email,
              }
              return await computPlotObj
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log('Finished: records', serialData, fileRecords)
        }  else if (['Import Booked Villas','Import Booked Plots','Import Booked Apartments'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => {
            return (
              (row['Plot No*'] != '' && row['Plot No*'] != undefined) ||
              (row['Villa No*'] != '' && row['Villa No*'] != undefined) ||
              (row['Stall No.*'] != '' && row['Stall No.*'] != undefined)
            )
          })
          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email

          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              const currentStatus = dRow['Availability Status']
              let newCurrentStatus = ''
              if (currentStatus == 'Available') {
                newCurrentStatus = 'available'
              } else if (currentStatus == 'Sold') {
                newCurrentStatus = 'booked'
              } else if (currentStatus == 'Blocked_M') {
                newCurrentStatus = 'management_blocked'
              } else if (currentStatus == 'Blocked') {
                newCurrentStatus = 'blocked'
              } else {
                newCurrentStatus = 'available'
              }

              const foundLength = await checkIfUnitAlreadyExists(
                `${orgId}_units`,
                pId,
                myPhase?.uid || '',
                myBlock?.uid || '',
                dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*']
              )
              // Apartment Type*
              console.log('my data value is ', foundLength, dRow)

              let unitDetails = {}
              if (foundLength.length > 0) {
                unitDetails = foundLength[0]
              }

              const computPlotObj = {
                unit_no:
                  dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*'],
                mode: newCurrentStatus != 'available' ? 'valid' : 'duplicate',
                Katha_no: dRow['Katha No'],
                PID_no: dRow['PID No'],
                survey_no: dRow['Survey No'],
                landOwnerName: dRow['Land Owner Name'],

                status: newCurrentStatus, //filter and send valid values
                unitStatus: dRow['Unit Status'],
                //filter and send valid values
                // booked_on: dRow['Booking Date']?.getTime(),
                booked_on: new Date(dRow['Booking Date'])?.getTime(),
                by: dRow['Sales Manager Name'],
                crm_executive: dRow['CRM Executive'],
                // ATS Date	ATB Date	SD Date
                ats_date: new Date(dRow['ATS Date'])?.getTime(),
                atb_date: new Date(dRow['ATB Date'])?.getTime(),
                sd_date: new Date(dRow['SD Date'])?.getTime(),
                // ATS Target date	SD Target Date
                ats_target_date: new Date(dRow['ATS Target Date'])?.getTime(),
                sd_target_date: new Date(dRow['SD Target Date'])?.getTime(),

                legal_charges: dRow['Legal Charges'],
                construct_cost: dRow['Construction Cost'],
                garden_area_cost: dRow['Garden Area Cost'],
                bwssd_cost: dRow['BWSSB Cost'],
                club_house: dRow['Club House'],

                // posession Charges
                corpus_fund: dRow['Corpus Fund'],
                maintenance_cost: dRow['Maintenance Cost'],

                source: dRow['Source'],
                sub_source: dRow['Sub-Source'],
                remarks: dRow['Last remarks'],
                fund_type: dRow['Funding Type'],
                Bank: dRow['Bank'],
                loanStatus: dRow['Loan Status'],

                customerName1: dRow['Applicant - 1 - Name']
                  .replace(/(Mr\.|Mr.|Miss|Mrs\.|Mrs.|Ms\.|Dr\.|MR\.|MISS)/gi, '')
                  ?.trim(),
                phoneNo1: dRow['Customer Number - 1'],
                dob1: dRow['DOB-1'],
                address1: dRow['Customer Address'],
                email1: dRow['Customer Email ID-1'],
                aadharNo1: dRow['Aadhaar Number-1'],
                panNo1: dRow['PAN Number-1'],
                // second applicant
                customerName2: dRow['Applicant 2 Name'],
                phoneNo2: dRow['Customer Number - 2'],
                dob2: dRow['DOB-2'],
                address2: dRow['Address-2'],
                email2: dRow['Email-2'],
                aadharNo2: dRow['Aadhaar Number-2'],
                panNo2: dRow['PAN Number-2'],

                customerDetailsObj: '',
                // {
                //   "relation1": {
                //     "value": "S/O",
                //     "label": "S/O"
                //   },
                //   "dob1": 1681322870000,
                //   "occupation1": "Business",
                //   "customerName1": "Allu Siva Rama krishna Reddy",
                //   "state1": "KA",
                //   "annualIncome1": "6000000",
                //   "panNo1": "",
                //   "phoneNo3": "9844167699",
                //   "countryName1": "India",
                //   "phoneNo1": "7760959579",
                //   "city1": "Bangalore",
                //   "email1": "allusivaram@gmail.com",
                //   "panDocUrl1": "",
                //   "pincode1": "560076",
                //   "aadharUrl1": "",
                //   "co_Name1": "Allu Nagi reddy",
                //   "countryCode1": "+91",
                //   "marital1": {
                //     "value": "Married",
                //     "label": "Married"
                //   },
                //   "address1": "N1103, Munivenkatappa layout, Belikhalli",
                //   "aadharNo1": "",
                //   "countryCode2": "+91",
                //   "companyName1": ""
                // }
                secondaryCustomerDetailsObj: '',
                // {
                //   "panDocUrl2": "",
                //   "annualIncome2": "6000000",
                //   "panNo2": "",
                //   "companyName2": "",
                //   "city2": "Bangalore",
                //   "countryName2": "India",
                //   "co_Name2": "Allu Siva Rama krishna Reddy",
                //   "phoneNo4": "",
                //   "email2": "swethaadem@gmail.com",
                //   "state2": "KA",
                //   "marital2": {
                //     "value": "Single",
                //     "label": "Single"
                //   },
                //   "relation2": {
                //     "label": "W/O",
                //     "value": "W/O"
                //   },
                //   "address2": "N 1103, SNN Raj lake View Phase 1, BTM Layout 2nd Stage, Munivenkatappa Layout, Belekhalli",
                //   "occupation2": "Business",
                //   "pincode2": "560076",
                //   "countryCode4": "+91",
                //   "customerName2": "Swetha",
                //   "countryCode3": "+91",
                //   "dob2": 1721671670689,
                //   "aadharUrl2": "",
                //   "phoneNo2": "9008191110",
                //   "aadharNo2": ""
                // },

                // addChargesCS:   [
                //   {
                //     "gst": {
                //       "label": 0,
                //       "value": "18"
                //     },
                //     "TotalNetSaleValueGsT": 354000,
                //     "component": {
                //       "value": "clubhouse_membership",
                //       "label": "Club House Membership"
                //     },
                //     "TotalSaleValue": 300000,
                //     "myId": "2c7bcd74-d334-471e-9138-5de5c96ee484",
                //     "section": {
                //       "label": "Additional Charges",
                //       "value": "additionalCost"
                //     },
                //     "units": {
                //       "value": "fixedcost",
                //       "label": "Fixed cost"
                //     },
                //     "charges": "300000",
                //     "tableData": {
                //       "id": 1
                //     },
                //     "id": "6081067e-daf9-4144-b520-877a2275c113",
                //     "gstValue": 54000,
                //     "description": "Car parking"
                //   },
                //   {
                //     "units": {
                //       "value": "fixedcost",
                //       "label": "Fixed cost"
                //     },
                //     "myId": "2c7bcd74-d334-471e-9138-5de5c96ee484",
                //     "TotalNetSaleValueGsT": 59000,
                //     "charges": "50000",
                //     "TotalSaleValue": 50000,
                //     "gstValue": 9000,
                //     "description": "Car parking",
                //     "component": {
                //       "value": "legalcharges",
                //       "label": "Legal"
                //     },
                //     "section": {
                //       "label": "Additional Charges",
                //       "value": "additionalCost"
                //     },
                //     "id": "47d12515-61f8-4dc3-b2e0-014692e6e7db",
                //     "gst": {
                //       "label": 0,
                //       "value": "18"
                //     },
                //     "tableData": {
                //       "id": 2
                //     }
                //   },
                //   {
                //     "gst": {
                //       "value": "18",
                //       "label": 0
                //     },
                //     "TotalSaleValue": 315000,
                //     "id": "fd43d308-8f47-4f1f-a4fc-693fe116a07d",
                //     "TotalNetSaleValueGsT": 371700,
                //     "units": {
                //       "value": "costpersqft",
                //       "label": "Cost Per sqft"
                //     },
                //     "component": {
                //       "label": "Electricity/Water Sewage",
                //       "value": "electricity_watersewage"
                //     },
                //     "tableData": {
                //       "id": 3
                //     },
                //     "description": "Car parking",
                //     "charges": "200",
                //     "section": {
                //       "value": "additionalCost",
                //       "label": "Additional Charges"
                //     },
                //     "myId": "2c7bcd74-d334-471e-9138-5de5c96ee484",
                //     "gstValue": 56700
                //   }
                // ],
                fullPs: [],
                plotCS: [],
                constructCS: [],
                constructPS: [],
                sqft_rate: Number(dRow['Plot rate/sqft']?.replace(/,/g, '') || 0),
                construct_price_sqft: Number(dRow['Const rate/sqft']?.replace(/,/g, '') || 0),
                plc_per_sqft: dRow['PLC rate/sqft'],
                T_received: Number(dRow['Collected']?.replace(/,/g, '') || 0),

                // // Date: Timestamp.now().toMillis(),
                // pId,
                // phaseId: dRow[''] || 1,
                // blockId: myBlock?.uid || 1,
                // size: dRow['Type*']?.toLowerCase() || '',
                // facing: dRow['Facing*'] || '',
                // bedrooms_c: dRow['Bedrooms'] || 0,
                // bathrooms_c: dRow['Bathrooms'] || 0,
                // car_parkings_c: dRow['Car Parkings'] || 0,
                // // cartpet_area_uom: dRow['CARPET SFT'] || 0,
                // area: Number(dRow['Land Area(sqft)*']?.replace(',', '')) || 0,
                // area_sqm:
                //   Number(dRow['Land Area(sqm)*']?.replace(',', '')) || 0,
                // sqft_rate:
                //   dRow['Price per sqft*'] || dRow['Price per sqft'] || 0,
                // plc_per_sqft: dRow['PLC per sqft*'] || 0,
                // construct_area:
                //   Number(dRow['BUA sqft*']?.replace(',', '')) ||
                //   Number(dRow['BUA (sqft)*']?.replace(',', '')) ||
                //   0,
                // construct_price_sqft:
                //   dRow['Construction Price per sqft'] ||
                //   dRow['Construction Price per sqft*'] ||
                //   0,
                // // super_built_up_area: dRow[''] || 0,
                // cartpet_area_sqft: dRow['Carpet Area(sqft)'] || 0,

                // // construct_price: dRow['Construction price'] || 0,

                // east_d: dRow['East Dimension*(m)'] || 0,
                // west_d: dRow['West Dimension*(m)'] || 0,
                // north_d: dRow['North Dimension*(m)'] || 0,
                // south_d: dRow['South Dimension*(m)'] || 0,
                // east_west_d: dRow['East-West Dimension*(m)'] || 0,
                // north_south_d: dRow['North-South Dimension*(m)'] || 0,
                // north_sch_by: dRow['North Schedule*'],
                // south_sch_by: dRow['South Schedule*'],
                // east_sch_by: dRow['East Schedule*'],
                // west_sch_by: dRow['West Schedule*'],
                // status: dRow['Status*']?.toLowerCase() || 'available',
                // release_status: dRow['Release Status*']?.toLowerCase() || '',
                // mortgage_type: dRow['Mortgage Type']?.toLowerCase() || '',
                // survey_no: dRow['Survey No'] || '',
                // Katha_no: dRow['Katha No'] || '',
                // PID_no: dRow['PID No'] || '',
                // sharing: dRow['Sharing'] || '',
                // intype: 'bulk',
                // unit_type: 'Villa',
              }

              const unitDetailsFull = { ...unitDetails, ...computPlotObj }

              console.log('unitDetailsFull', unitDetailsFull)
              return await unitDetailsFull
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log(
            'Finished: records',
            clean1,
            serialData,
            fileRecords
          )
        } else if (['Upload Mortgage'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => {
            return (
              (row['Plot No*'] != '' && row['Plot No*'] != undefined) ||
              (row['Villa No*'] != '' && row['Villa No*'] != undefined) ||
              (row['Stall No.*'] != '' && row['Stall No.*'] != undefined)
            )
          })
          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
// valid
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              const currentStatus = dRow['Availability Status']
              let newCurrentStatus = ''
              if (currentStatus == 'Available') {
                newCurrentStatus = 'available'
              } else if (currentStatus == 'Sold') {
                newCurrentStatus = 'booked'
              } else if (currentStatus == 'Blocked_M') {
                newCurrentStatus = 'management_blocked'
              } else if (currentStatus == 'Blocked') {
                newCurrentStatus = 'blocked'
              } else {
                newCurrentStatus = 'available'
              }

              const foundLength = await checkIfUnitAlreadyExists(
                `${orgId}_units`,
                pId,
                myPhase?.uid || '',
                myBlock?.uid || '',
                dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*']
              )
              // Apartment Type*
              // console.log('my data value is ', foundLength, dRow)

              let unitDetails = {}
              if (foundLength.length > 0) {
                unitDetails = foundLength[0]
              }
              console.log('my data value is ', foundLength,unitDetails,  dRow)
              const computPlotObj = {
                unit_no:
                  dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*'],
                mode: foundLength.length > 0 ? 'valid' : 'duplicate',
                unitUid: unitDetails?.unitUid,
                pId: pId,
                survey_no: dRow['Survey No'],
                land_owner_name: dRow['Land Owner Name'],
                doc_type: dRow['Doc Type'],
                date_of_registration: dRow['Date of Registration'],
                to_whom: dRow['To Whom'],
                doc_no: dRow['Document No'],
                status: dRow['Status']?.toLowerCase(),
                remarks: dRow['Remarks'],
              }

              // const unitDetailsFull = {...unitDetails, ...computPlotObj}

              // console.log('unitDetailsFull', unitDetailsFull)
              return await computPlotObj
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log(
            'Finished: records',
            clean1,
            serialData,
            fileRecords
          )
        } else if (['Upload Unit Transactions'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => {
            return (
              (row['Plot No*'] != '' && row['Plot No*'] != undefined) ||
              (row['Villa No*'] != '' && row['Villa No*'] != undefined) ||
              (row['Stall No.*'] != '' && row['Stall No.*'] != undefined)
            )
          })
          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
// valid
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {


              const foundLength = await checkIfUnitAlreadyExists(
                `${orgId}_units`,
                pId,
                myPhase?.uid || '',
                myBlock?.uid || '',
                dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*']
              )
              // Apartment Type*
              // console.log('my data value is ', foundLength, dRow)

              let unitDetails = {}
              if (foundLength.length > 0) {
                unitDetails = foundLength[0]
              }
              console.log('my data value is ', foundLength,unitDetails,  dRow)
              const computPlotObj = {
                unit_no:
                  dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Villa No*'],
                mode: foundLength.length > 0 ? 'valid' : 'duplicate',
                unitUid: unitDetails?.unitUid,
                customerName : unitDetails?.customerDetailsObj?.customerName1,
                pId: pId,
                date_of_entry: dRow['Date of Entry'],
                payment_mode: dRow['Payment Mode'],
                bank_ref_no: dRow['Transaction ID'],
                payto: dRow['Payment Towards'],
                builderName: dRow['Payment Against'],
                dated: dRow['Payment Date'],
                amount: Number(dRow['Amount']?.replace(/,/g, '') || 0),
                status: dRow['Status'],
                cancelledDate: dRow['Cancelled Date'] || '',
                receive_by: dRow['Received By'],
                remarks: dRow['Remarks'],
              }

              // const unitDetailsFull = {...unitDetails, ...computPlotObj}

              // console.log('unitDetailsFull', unitDetailsFull)
              return await computPlotObj
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log(
            'Finished: records',
            clean1,
            serialData,
            fileRecords
          )
        } else if (['ImportAssets'].includes(title)) {
          console.log('import stuff is ', records)
          const clean1 = records.filter((row) => {
            return (
              (row['Assets_Type'] != '' && row['Assets_Type'] != undefined) ||
              (row['Model'] != '' && row['Model'] != undefined)
            )
          })
          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              // const foundLength = await checkIfUnitAlreadyExists(
              //   `${orgId}_assets`,
              //   pId,
              //   myPhase?.uid || '',
              //   myBlock?.uid || '',
              //   dRow['Stall No.*'] || dRow['Flat No.*'] || dRow['Plot No*']
              // )
              // Apartment Type*
              console.log('my data value is ', dRow)
              const foundLength = 0
              const computPlotObj = {
                mode: await makeMode(foundLength),
                pId,
                phaseId: dRow[''] || 1,
                blockId: myBlock?.uid || 1,
                Date: Timestamp.now().toMillis(),
                Assets_Type: dRow['Assets_Type'],
                Model: dRow['Model'] || '',
                Asset_Description: dRow['Asset_Description'] || '',
                Serial_No: dRow['Serial_No'] || '',
                Date_of_Allocation: dRow['Date_of_Allocation'] || '',
                Return_Date: dRow['Return_Date'] || '',

                intype: 'bulk',
                unit_type: 'Apartment',
                by: user?.email,
              }
              return await computPlotObj
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log('Finished: records', serialData, fileRecords)
        } else if (['Plan Diagram', 'Brouchers', 'Approvals'].includes(title)) {
          console.log('data os jere', records)
          // uploadFile(file)
          // upload pdf to cloud
        } else {
          const clean1 = records.filter((row) => row['Date'] != '')

          // set duplicate & valid records
          // check in db if record exists with matched phone Number & email
          const serialData = await Promise.all(
            clean1.map(async (dRow) => {
              console.log('found row is ', dRow)
              const foundLength = await checkIfLeadAlreadyExists(
                `${orgId}_leads`,
                dRow['Mobile']
              )
              // modify date
              const date = new Date(dRow['Date']) // some mock date
              const milliseconds = date.getTime() + 21600000 // adding 21600000 ms == 6hrs to match local time with utc + 6hrs
              console.log('milliseconds is', milliseconds)
              // dRow['Date'] = prettyDate(milliseconds).toLocaleString()
              dRow['Date'] = milliseconds
              dRow['Status'] = dRow['Status']?.toLowerCase() || ''
              dRow['Source'] = dRow['Source']?.toLowerCase() || ''
              dRow['mode'] = await makeMode(foundLength)
              if (dRow['mode'] === 'valid' && dRow['EmpId'] != '') {
                console.log('found row is 1', dRow)
                // check & get employee details and push it to dRow
                // project Id
                const MatchedValA = await salesTeamList.filter((data) => {
                  return data.empId == dRow['EmpId']
                })
                if (MatchedValA.length === 1) {
                  console.log('found row is 2', dRow)
                  const { offPh } = MatchedValA[0]
                  dRow['assignedTo'] = MatchedValA[0]['uid']
                  dRow['assignedToObj'] = {
                    empId: MatchedValA[0]['empId'],
                    label: MatchedValA[0]['name'],
                    name: MatchedValA[0]['name'],
                    offPh: offPh || 0,
                  }
                }
              }

              if (dRow['Status'] == '' || dRow['Status'] === undefined) {
                dRow['Status'] = 'unassigned'
              }

              if (dRow['Event'] != '') {
                console.log('found row is 3', dRow, projectList)
                const projectFilA = projectList.filter((data) => {
                  console.log('found row is 3.1', data)
                  return data.eventName == dRow['Event']
                })
                if (projectFilA.length >= 1) {
                  console.log('found row is 4', dRow)
                  dRow['ProjectId'] = projectFilA[0]['uid']
                }
              }

              dRow['CT'] = Timestamp.now().toMillis()
              console.log('found row is 5', dRow)
              await console.log(
                'foundLength is',
                foundLength,
                dRow,
                foundLength,
                dRow['Mobile']
              )
              return await dRow
            })
          )

          await setfileRecords(serialData)
          // let x =   await getLedsData()

          await console.log('Finished: records', serialData, fileRecords)
        }
      },
    })
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw
      })
    )
  }

  function makeMode(foundLength) {
    console.log('foundder is ', foundLength)
    if (foundLength == undefined || foundLength?.length === 0) {
      console.log('foundLength is==> ', foundLength)
      return 'valid'
    } else {
      return 'duplicate'
    }
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: [
        'Plan Diagram',
        'Brouchers',
        'Approvals',
        'legal_doc_upload',
      ].includes(title)
        ? ['legal_doc_upload'].includes(title)
          ? '.doc, .docx'
          : '.pdf'
        : '.csv, text/csv, .xlsx',
      maxSize: 40000 * 1024, // 1200KB
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  const validate = Yup.object({
    file_name: Yup.string()
      // .max(15, 'Must be 15 characters or less')
      .required('file_name is Required'),
  })

  const handleSubmit = (file) => {
    uploadFile(file)
  }
  const clearUploadDocs = () => {
    setFiles([])
  }
  return (
    <React.Fragment>
      {files.length === 0 && (
        <div className="mx-3" {...getRootProps({ style })}>
          {title === 'Import Leads' && (
            <div className="w-full flex flex-row justify-between ">
              <span></span>
              <a
                download="leadTemplate.csv"
                target="_blank"
                href="/leadTemplate.csv"
              >
                <span className="text-xs text-blue-500">
                  <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                  Sample Template
                </span>
              </a>
            </div>
          )}

          {title === 'ImportAssets' && (
            <div className="w-full flex flex-row justify-between ">
              <span></span>
              <a
                download="unitTemplate.csv"
                target="_blank"
                href="/assetsTemplate.csv"
              >
                <span className="text-xs text-blue-500">
                  <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                  Sample Assets Template
                </span>
              </a>
            </div>
          )}

          <input {...getInputProps()} />
          {/* <DocumentAddIcon className="h-20 w-60 " aria-hidden="true" /> */}
          {/* <span>sample template</span> */}
          <div className="pt-2 pb-8 px-8 flex flex-col items-center">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[200px] h-[200px] inline"
                alt=""
                src="/empty-dashboard.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Drag & drop
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              or
              <span className="text-blue-600"> pick from local computer </span>
              {[
                'Plan Diagram',
                'Brouchers',
                'Approvals',
                'legal_doc_upload',
              ].includes(title)
                ? '*.pdf'
                : '*.csv'}
              {/* <span className="text-blue-600"> get sample template</span> */}
            </time>
          </div>
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-30 mt-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg> */}
          {/* <p>
          {' '}
          Drag & drop or <span className="text-blue-600">click to choose </span>
          <span className="text-black-600">*.csv</span>
        </p> */}
        </div>
      )}
      {files.length >= 1 && (
        <div className="flex flex-row justify-between">
          <span></span>
          <span
            onClick={() => {
              clearUploadDocs()
            }}
            className="text-blue-500"
          >
            Clear
          </span>
        </div>
      )}

      {files.length >= 1 &&
        files.map((fileWrapper, inx) => (
          <div className="mt-6 p-6 bg-white border border-gray-100" key={inx}>
            {fileWrapper.errors.length ? (
              <UploadError
                file={fileWrapper.file}
                errors={fileWrapper.errors}
                onDelete={onDelete}
              />
            ) : (
              <section>
                <SingleFileUploadWithProgress
                  onDelete={onDelete}
                  onUpload={onUpload}
                  file={fileWrapper.file}
                />
                {[
                  'Plan Diagram',
                  'Brouchers',
                  'Approvals',
                  'legal_doc_upload',
                ].includes(title) && (
                  <Formik
                    initialValues={{
                      file_name: '',
                    }}
                    // validationSchema={validate}
                    onSubmit={(values, { resetForm }) => {
                      console.log('ami submitted', values)
                      uploadFile(fileWrapper.file)
                      // onSubmitFun(values, resetForm)
                    }}
                  >
                    {(formik) => (
                      <Form>
                        {/* 2 */}
                        <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-1">
                          <div className="mb-3 space-y-2 w-full text-xs mt-4">
                            <TextField
                              label="File Name*"
                              name="file_name"
                              value={fileName}
                              type="text"
                              onChange={(e) => {
                                setFileName(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <p className="text-xs text-red-400 text-right my-3">
                            <abbr title="Required field">*</abbr> fields are
                            mandatory
                          </p>
                          {formMessage === 'Saved Successfully..!' ||
                            (formMessage === 'Uploaded Successfully..!' && (
                              <p className=" flex text-md text-slate-800 text-right my-3">
                                <img
                                  className="w-[40px] h-[40px] inline mr-2"
                                  alt=""
                                  src="/ok.gif"
                                />
                                <span className="mt-2">{formMessage}</span>
                              </p>
                            ))}
                          {formMessage === 'Unit Already Exists' && (
                            <p className=" flex text-md text-pink-800 text-right my-3">
                              <img
                                className="w-[40px] h-[40px] inline mr-2"
                                alt=""
                                src="/error.gif"
                              />
                              <span className="mt-2">{formMessage}</span>
                            </p>
                          )}
                          <div className="mt-5 mt-8 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <button
                              className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                              type="reset"
                              onClick={() => resetter()}
                            >
                              Reset
                            </button>

                            <button
                              className="mb-2 md:mb-0 bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-green-500"
                              type="reset"
                              onClick={() => handleSubmit(fileWrapper.file)}
                              disabled={loading}
                            >
                              {loading && <Loader />}
                              Add
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}

                {/* this is for csv file upload */}

                {!['Plan Diagram', 'Brouchers', 'Approvals'].includes(
                  title
                ) && (
                  <div className="mt-2 p-6 bg-white border border-gray-100">
                    <LfileUploadTableHome
                      fileRecords={fileRecords}
                      title={title}
                      pId={pId}
                      myBlock={myBlock}
                    />
                  </div>
                )}
              </section>
            )}
          </div>
        ))}

      {/* <div className="mt-4 text-bold text-lg">or</div> */}
      {/* <div className="mt-2 p-6 bg-white border border-gray-100">
        <LAddLeadTable />
      </div> */}
    </React.Fragment>
  )
}
