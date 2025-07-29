import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ExcelJS from 'exceljs'

import { prettyDate, prettyDateTime } from './dateConverter'

export default function ExcelDownloader({
  downloadRows,
  fromLeadsBank = false,
  sourceTab,
}) {
  const downloadExcel = async () => {
    let processedData = [...downloadRows]

    // Process data based on sourceTab
    if (fromLeadsBank) {
      processedData = downloadRows.map((item) => {
        return {
          ...item,
          cT: prettyDateTime(item.cT),
        }
      })
    }

    if (sourceTab == 'leadsList') {
      processedData = downloadRows.map((item) => {
        return {
          ...item,
          Date: prettyDate(item?.Date),
          assignT: prettyDate(item.assignT),
          leadUpT: prettyDate(item.leadUpT),
          schTime: prettyDate(item.schTime),
          stsUpT: prettyDate(item.stsUpT),
          assignedTo: item?.assignedToObj?.name,
        }
      })
    }

    if (sourceTab == 'visitsReport') {
      processedData = downloadRows.map((item) => {
        return {
          Event: item.Event,
          Name: item.Name,
          Mobile: item.Mobile?.toString(),
          Status: item.Status,
          from: item.from,
          to: item?.coverA?.includes('visitdone') ? 'visitdone' : item?.to,
          Source: item?.Source,
          Assigned_to: item?.assignedToObj?.name,
          Date: item.Time,
          Visit_Fixed_On: prettyDate(item?.assignT || item?.Date),
          Visit_Fixed_By: item?.visitFixedBy,
          Visited_On: item.Time,
          Visit_Done_By: item?.by,
          Executive: item?.leadOwner,
        }
      })
    }

    if (sourceTab == 'Booking Summary') {
      processedData = downloadRows.map((item) => {
        const x = { ...item }
        x.booked_on = prettyDate(x.booked_on)
        x.ats_date = prettyDate(x.ats_date)
        x.atb_date = prettyDate(x.atb_date)
        x.ats_target_date = prettyDate(x.ats_target_date)
        x.atb_target_date = prettyDate(x.atb_target_date)
        x.sd_date = prettyDate(x.sd_date)
        x.sd_target_date = prettyDate(x.sd_target_date)

        delete x.mode
        delete x.constructCS
        delete x.fullPs
        delete x.constructPS

        delete x.secondaryCustomerDetailsObj
        delete x.addChargesCS
        delete x.pId
        delete x.customerDetailsObj
        delete x.constAdditionalChargesCS
        delete x.possessionAdditionalCostCS
        delete x.plotPS
        delete x.aggrementDetailsObj
        delete x.Date
        delete x.plotCS
        delete x.blockId

        // Delete all unwanted columns as specified by user
        delete x.bathrooms_c
        delete x.PID_no
        delete x.construct_price_sqft
        delete x.state1
        delete x.intype
        delete x.facing
        delete x.relation2
        delete x.relation1
        delete x.min_rate_per_sqft
        delete x.north_sch_by
        delete x.T_review
        delete x.txt_dated
        delete x.investorName
        delete x.email2
        delete x.sqft_rate
        delete x.east_west_d
        delete x.car_parkings_c
        delete x.unit_d
        delete x.survey_no
        delete x.east_sch_by
        delete x.uds_sqft
        delete x.phaseId
        delete x.landOwnerName
        delete x.phoneNo2
        delete x.countryName1
        delete x.north_d
        delete x.tower_no
        delete x.countryCode1
        delete x.size
        delete x.min_rate_per_sqft_c
        delete x.city1
        delete x.construct_area
        delete x.floor_no
        delete x.south_sch_by
        delete x.address1
        delete x.floor_plan
        delete x.south_d
        delete x.west_d
        delete x.block_no
        delete x.bedrooms_c
        delete x.T_elgible_balance
        delete x.west_sch_by
        delete x.sharingType
        delete x.companyDocId
        delete x.Katha_no
        delete x.cartpet_area_sqft
        delete x.co_Name2
        delete x.receive_by
        delete x.mortgage_type
        delete x.release_status
        delete x.pincode1
        delete x.north_south_d
        delete x.dimension
        delete x.plc_per_sqft
        delete x.countryCode2
        delete x.by
        // Remove additional columns as per latest user request
        delete x.booked_on
        delete x.ats_date
        delete x.atb_date
        delete x.ats_target_date
        delete x.atb_target_date
        delete x.sd_date
        delete x.sqm_rate
        delete x.plc_per_sqm
        delete x.area_sqm
        delete x.east_d
        delete x.gstValue
        delete x.charges
        delete x.TotalNetSaleValueGsT
        delete x.sd_target_date
        delete x.T_paid
        delete x.id
        delete x.status
        delete x.area

        // Reorder columns for collection agent workflow
        const reorderedData = {
          unit_no: x.unit_no,
          projName: x.projName,
          companyName: x.companyName,
          co_Name1: x.co_Name1,
          T_total: x.T_total,
          T_received: x.T_received,
          T_balance: x.T_balance,
          phoneNo1: x.phoneNo1,
          email1: x.email1,
        }

        return reorderedData
      })
    }

    if (sourceTab == 'Stall Enquiries') {
      processedData = downloadRows.map((item) => {
        const x = { ...item }

        // Format dates
        x.Date = prettyDate(x.Date)
        x.cT = prettyDateTime(x.cT)

        // Clean up nested objects and extract relevant data
        x.customerName =
          x?.customerDetailsObj?.customerName1 || x?.customerName1 || 'NA'
        x.phoneNumber = x?.customerDetailsObj?.phoneNo1 || x?.phoneNo1 || 'NA'
        x.email = x?.customerDetailsObj?.email1 || x?.email1 || 'NA'
        x.assignedTo = x?.assignedToObj?.name || x?.assignedTo || 'NA'
        x.eventName = x?.Event || x?.eventName || 'NA'
        x.stallNumber = x?.unit_no || x?.stallNumber || 'NA'
        x.status = x?.Status || x?.status || 'NA'
        x.source = x?.Source || x?.source || 'NA'
        x.notes = x?.Note || x?.notes || 'NA'
        x.followupDate = x?.['Followup date'] || x?.followupDate || 'NA'
        x.visitDoneNotes = x?.visitDoneNotes || x?.VisitDoneNotes || 'NA'
        x.visitDoneReason = x?.visitDoneReason || x?.VisitDoneReason || 'NA'
        x.notInterestedNotes = x?.notInterestedNotes || 'NA'
        x.notInterestedReason = x?.notInterestedReason || 'NA'
        x.empId = x?.EmpId || x?.empId || 'NA'
        x.countryCode = x?.CountryCode || x?.countryCode || 'NA'
        x.mode = x?.mode || 'NA'
        x.from = x?.from || 'NA'

        // Remove unwanted nested objects and properties
        delete x.customerDetailsObj
        delete x.assignedToObj
        delete x.Note
        delete x.AssignedTo
        delete x.AssignTo
        delete x.AssignedBy
        delete x['Country Code']
        delete x.CT
        delete x.visitDoneNotes
        delete x.VisitDoneNotes
        delete x.VisitDoneReason
        delete x.EmpId
        delete x.CountryCode
        delete x.from
        delete x['Followup date']
        delete x.mode
        delete x.notInterestedNotes
        delete x.notInterestedReason
        delete x.Event
        delete x.unit_no
        delete x.Status
        delete x.Source
        delete x.customerName1
        delete x.phoneNo1
        delete x.email1
        delete x.assignedTo
        delete x.eventName
        delete x.stallNumber
        delete x.source
        delete x.notes
        delete x.followupDate
        delete x.visitDoneNotes
        delete x.visitDoneReason
        delete x.notInterestedNotes
        delete x.notInterestedReason
        delete x.empId
        delete x.countryCode
        delete x.mode
        delete x.from
        delete x.coveredA
        delete x.id
        delete x.uid
        delete x.orgId
        delete x.pId
        delete x.leadOwner
        delete x.by
        delete x.Time
        delete x.visitFixedBy
        delete x.cT
        delete x.Date

        // Reorder columns for stall enquiries
        const reorderedData = {
          customerName: x.customerName,
          phoneNumber: x.phoneNumber,
          email: x.email,
          eventName: x.eventName,
          stallNumber: x.stallNumber,
          status: x.status,
          source: x.source,
          assignedTo: x.assignedTo,
          notes: x.notes,
          followupDate: x.followupDate,
          visitDoneNotes: x.visitDoneNotes,
          visitDoneReason: x.visitDoneReason,
          notInterestedNotes: x.notInterestedNotes,
          notInterestedReason: x.notInterestedReason,
          empId: x.empId,
          countryCode: x.countryCode,
          mode: x.mode,
          from: x.from,
        }

        return reorderedData
      })
    }

    // Create workbook and worksheet using ExcelJS
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sourceTab || 'Data')

    // Get headers from the first row
    const headers = Object.keys(processedData[0] || {})

    // Add headers to worksheet
    worksheet.addRow(headers)

    // Add data rows
    processedData.forEach((row) => {
      const rowData = headers.map((header) => row[header])
      worksheet.addRow(rowData)
    })

    // Style headers (first row)
    const headerRow = worksheet.getRow(1)
    headerRow.height = 25 // Set header row height
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }, // Blue background
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' }, // White text
      }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
      }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      }
    })

    // Set column widths
    if (sourceTab === 'Booking Summary') {
      headers.forEach((header, index) => {
        const column = worksheet.getColumn(index + 1)
        switch (header) {
          case 'id':
            column.width = 30
            break
          case 'unit_no':
            column.width = 10
            break
          case 'projName':
            column.width = 20
            break
          case 'companyName':
            column.width = 25
            break
          case 'co_Name1':
            column.width = 15
            break
          case 'T_total':
          case 'T_received':
          case 'T_balance':
            column.width = 15
            break
          case 'phoneNo1':
            column.width = 15
            break
          case 'email1':
            column.width = 30
            break
          case 'status':
            column.width = 12
            break
          case 'area':
            column.width = 12
            break
          default:
            column.width = 15
        }
      })
    }

    if (sourceTab === 'Stall Enquiries') {
      headers.forEach((header, index) => {
        const column = worksheet.getColumn(index + 1)
        switch (header) {
          case 'customerName':
            column.width = 25
            break
          case 'phoneNumber':
            column.width = 15
            break
          case 'email':
            column.width = 30
            break
          case 'eventName':
            column.width = 20
            break
          case 'stallNumber':
            column.width = 12
            break
          case 'status':
            column.width = 12
            break
          case 'source':
            column.width = 15
            break
          case 'assignedTo':
            column.width = 20
            break
          case 'notes':
            column.width = 40
            break
          case 'followupDate':
            column.width = 15
            break
          case 'visitDoneNotes':
            column.width = 40
            break
          case 'visitDoneReason':
            column.width = 20
            break
          case 'notInterestedNotes':
            column.width = 40
            break
          case 'notInterestedReason':
            column.width = 20
            break
          case 'empId':
            column.width = 12
            break
          case 'countryCode':
            column.width = 12
            break
          case 'mode':
            column.width = 12
            break
          case 'from':
            column.width = 15
            break
          default:
            column.width = 15
        }
      })
    }

    // Style data rows
    for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
      const row = worksheet.getRow(rowIndex)
      row.height = 20 // Set data row height
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1]

        // Add borders to all cells
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        }

        // Right align unit_no and phoneNo1 columns
        if (header === 'unit_no' || header === 'phoneNo1') {
          cell.alignment = { horizontal: 'right' }
        }

        // Right align phoneNumber column for stall enquiries
        if (header === 'phoneNumber') {
          cell.alignment = { horizontal: 'right' }
        }

        // Highlight T_balance column
        if (header === 'T_balance') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFD966' }, // Gold background
          }
          cell.font = { bold: true }
        }

        // Conditional formatting for Status column
        if (header === 'status' && cell.value) {
          const status = cell.value.toString().toLowerCase()
          if (status.includes('booked') || status.includes('sold')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFC6EFCE' }, // Light green
            }
            cell.font = { color: { argb: 'FF006100' } }
          } else if (status.includes('blocked')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFEB9C' }, // Light yellow
            }
            cell.font = { color: { argb: 'FF9C6500' } }
          } else if (status.includes('available')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFC7CE' }, // Light red
            }
            cell.font = { color: { argb: 'FF9C0006' } }
          }
        }

        // Conditional formatting for stall enquiry status
        if (
          sourceTab === 'Stall Enquiries' &&
          header === 'status' &&
          cell.value
        ) {
          const status = cell.value.toString().toLowerCase()
          if (status.includes('booked') || status.includes('sold')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFC6EFCE' }, // Light green
            }
            cell.font = { color: { argb: 'FF006100' }, bold: true }
          } else if (status.includes('new') || status.includes('followup')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFEB9C' }, // Light yellow
            }
            cell.font = { color: { argb: 'FF9C6500' }, bold: true }
          } else if (
            status.includes('visitfixed') ||
            status.includes('negotiation')
          ) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFE1D5E7' }, // Light purple
            }
            cell.font = { color: { argb: 'FF4A148C' }, bold: true }
          } else if (status.includes('unassigned')) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFC7CE' }, // Light red
            }
            cell.font = { color: { argb: 'FF9C0006' }, bold: true }
          }
        }

        // Highlight important columns for stall enquiries
        if (sourceTab === 'Stall Enquiries') {
          if (header === 'customerName') {
            cell.font = { bold: true }
          }
          if (header === 'stallNumber') {
            cell.font = { bold: true }
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF0F8FF' }, // Light blue
            }
          }
          if (header === 'assignedTo') {
            cell.font = { bold: true }
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF0F0F0' }, // Light gray
            }
          }
        }
      })
    }

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `${sourceTab || 'Data'}_${timestamp}.xlsx`

    // Download the file
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Tooltip
      title={`Download ${sourceTab} ${downloadRows?.length} Rows as Excel`}
    >
      <IconButton onClick={downloadExcel}>
        <DownloadTwoToneIcon style={{ height: '20px', width: '20px' }} />
      </IconButton>
    </Tooltip>
  )
}
