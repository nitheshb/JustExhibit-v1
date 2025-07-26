import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useCSVDownloader } from 'react-papaparse'

import { prettyDate, prettyDateTime } from './dateConverter'

export default function CSVDownloader({
  downloadRows,
  fromLeadsBank = false,
  sourceTab,
}) {
  const { CSVDownloader, Type } = useCSVDownloader()
  let downloadData
  if (fromLeadsBank) {
    downloadData = downloadRows.map((item) => {
      return {
        ...item,
        cT: prettyDateTime(item.cT),
      }
    })
  }
  if (sourceTab == 'leadsList') {
    downloadRows = downloadRows.map((item) => {
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
    downloadRows = downloadRows.map((item) => {
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
    downloadRows = downloadRows.map((item) => {
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
      delete x.id
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

      return x
    })
  }

  // Handle case when sourceTab is undefined but we still want to delete unwanted columns
  if (!sourceTab && downloadRows && downloadRows.length > 0) {
    downloadRows = downloadRows.map((item) => {
      const x = { ...item }

      // Delete all unwanted columns
      delete x.bathrooms_c
      delete x.pId
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
      delete x.blockId
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
      delete x.unit_type
      delete x.gstValue
      delete x.mode
      delete x.east_d
      delete x.TotalNetSaleValueGsT
      delete x.T_paid
      delete x.by

      return x
    })
  }

  return (
    <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      data={fromLeadsBank ? downloadData : downloadRows}
    >
      <Tooltip title={`Download ${sourceTab} ${downloadRows?.length} Rows`}>
        <IconButton>
          {/* style={{ background: '#f9f9f9' }} */}
          <DownloadTwoToneIcon style={{ height: '20px', width: '20px' }} />
        </IconButton>
      </Tooltip>
    </CSVDownloader>
  )
}
