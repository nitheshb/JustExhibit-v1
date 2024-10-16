import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
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
  console.log('i was clicked')
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
