/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import ReportSideWindow from 'src/components/SiderForm/ReportSideView'

const CrmInventorySummaryTable = ({ projects }) => {
  const [selectedOption, setSelectedOption] = useState('All')
  const [isOpenSideForm, setReportSideForm] = React.useState(false)
  const [isImportLeadsOpen, setisImportLeadsOpen] = React.useState(false)
  const [customerDetails, setCustomerDetails] = React.useState({})
  const [drillDownPayload, setDrillDownPayload] = React.useState([])
  const [subTitle, setSubTitle] = React.useState('false')
  const [selUnitStatus, seTUnitStatus] = React.useState('false')

  const showDrillDownFun = async (text, data, typeA) => {
    // Display sideForm
    setReportSideForm(true)
    setDrillDownPayload(data)
    setSubTitle(text)
    seTUnitStatus(typeA)
  }


  const calculateTotal = (data, key) => {
    return data.reduce((acc, item) => {
      return acc + (item[key] || 0)
    }, 0)
  }

  const totalUnitsSummary = calculateTotal(projects, 'totalUnitCount')
  const totalAvailableSummary = calculateTotal(projects, 'availableCount')
  const totalSoldSummary = calculateTotal(projects, 'soldUnitCount')
  const totalBlockedSummary = calculateTotal(projects, 'blockedUnitCount')
  const totalMortgagedSummary = calculateTotal(projects, 'mortgaged')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="bg-white flex justify-start rounded-lg">
      <div className="overflow-x-auto mx-4">
        <div className="">
          <div className="flex justify-between mb-4 mt-2">
            <div>
              <p className="font-bold text-black p-1 m-1">
                CRM Inventory Report
              </p>
            </div>
            <select
              className="mr-2"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="All">Event Name</option>
              <option value="Unit Type">Unit Type</option>
              <option value="Unit Facing">Unit Facing</option>
              <option value="Unit Status">Unit Status</option>
              <option value="Unit Area">Unit Area</option>
            </select>
          </div>

          <div className="rounded my-3 overflow-x-auto">
            <table className=" border-collapse">
              <thead>
                <tr className="bg-blue-200 text-gray-900  text-sm leading-normal">
                  <th
                    className="py-3 px-2 text-center border border-black"
                    colSpan="6"
                  >
                    Inventory Summary Report By Event
                  </th>
                </tr>
                <tr className="bg-white text-gray-900  text-sm leading-normal">
                  <th className="py-3 px-3 text-left border border-black">
                    Event Name
                  </th>
                  <th
                    className="py-3 px-3 text-left border border-black"
                    colSpan="1"
                  >
                    Total Stalls
                  </th>
                  <th
                    className="py-3 px-3 text-center border border-black"
                    colSpan="1"
                  >
                    Available
                  </th>
                  <th
                    className="py-3 px-3 text-center border border-black"
                    colSpan="1"
                  >
                    Sold
                  </th>
                  <th
                    className="py-3 px-3 text-center border border-black"
                    colSpan="1"
                  >
                    Blocked
                  </th>
                  <th
                    className="py-3 px-3 text-center border border-black"
                    colSpan="1"
                  >
                    Mortgaged
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-900 text-sm font-light">
                {projects.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td
                      className="py-3 px-3 text-left border border-black text-blue-800 cursor-pointer font-semibold"
                      onClick={() => {
                        showDrillDownFun(`Total ${item?.stausTitle}`, item, [
                          'available',
                          'booked',
                          'blockedUnitCount',
                          'blocked',
                          'management_blocked',
                        ])
                      }}
                    >
                      {item.eventName}
                    </td>
                    <td
                      className="py-3 px-6 text-right border border-black text-blue-800 cursor-pointer font-semibold"
                      onClick={() => {
                        showDrillDownFun(`Total ${item?.stausTitle}`, item, [
                          'available',
                          'booked',
                          'blockedUnitCount',
                          'blocked',
                          'management_blocked',
                        ])
                      }}
                    >
                      {item.totalUnitCount}
                    </td>
                    <td
                      className="py-3 px-6 text-right border border-black text-blue-800 cursor-pointer font-semibold"
                      onClick={() => {
                        showDrillDownFun(`Total ${item?.stausTitle}`, item, [
                          'available',

                        ])
                      }}
                    >
                      {item.availableCount}
                    </td>
                    <td
                      className="py-3 px-6 text-right border border-black text-blue-800 cursor-pointer font-semibold"
                      onClick={() => {
                        showDrillDownFun(`Total ${item?.stausTitle}`, item, [

                          'booked',
                          'allotment',
                          'agreement_pipeline',
                          'agreement',
                          'registered',
                          'construction',
                          'possession'

                        ])
                      }}
                    >
                      {item.soldUnitCount}
                    </td>
                    <td
                      className="py-3 px-6 text-right border border-black text-blue-800 cursor-pointer font-semibold hover:underline-offset-4"
                      onClick={() => {
                        showDrillDownFun(`Total ${item?.stausTitle}`, item, [

                          'blockedUnitCount',
                          'blocked',
                          'management_blocked',
                        ])
                      }}
                    >
                      {item?.blockedUnitCount ||
                        0 + item.management_blocked ||
                        0}
                    </td>
                    <td className="py-3 px-6 text-right border border-black font-semibold">
                      {item.mortgaged}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-200 text-gray-900  text-sm leading-normal">
                  <td className="py-3 px-6 text-left border border-black">
                    Totals:
                  </td>
                  <td className="py-3 px-6 text-right border border-black">
                    {totalUnitsSummary}
                  </td>
                  <td className="py-3 px-6 text-right border border-black">
                    {totalAvailableSummary}
                  </td>
                  <td className="py-3 px-6 text-right border border-black">
                    {totalSoldSummary}
                  </td>
                  <td className="py-3 px-6 text-right border border-black">
                    {totalBlockedSummary}
                  </td>
                  <td className="py-3 px-6 text-right border border-black">
                    {totalMortgagedSummary}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReportSideWindow
        open={isOpenSideForm}
        setOpen={setReportSideForm}
        title="Unit Inventory"
        subtitle={subTitle}
        setCustomerDetails={setCustomerDetails}
        setisImportLeadsOpen={setisImportLeadsOpen}
        leadsLogsPayload={drillDownPayload}
        widthClass="max-w-7xl"
        unitsViewMode={undefined}
        setIsClicked={undefined}
        selUnitStatus={selUnitStatus}
      />
    </div>
  )
}

export default CrmInventorySummaryTable
