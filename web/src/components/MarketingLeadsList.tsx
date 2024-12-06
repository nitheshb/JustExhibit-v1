import React, { useEffect, useState } from 'react'
import SiderForm from './SiderForm/SiderForm'
import { getAllCampaigns } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { prettyDate } from 'src/util/dateConverter'

const initialCampaigns = [
  {
    id: 1,
    name: 'Campaign 1',
    category: 'Facebook',
    owner: 'John Doe',
    budgetSpent: 500,
    budgetAllocated: 1000000,
    startDate: '2024-04-01',
    endDate: '2024-04-30',
  },
  {
    id: 2,
    name: 'Campaign 2',
    category: 'Instagram',
    owner: 'Jane Smith',
    budgetSpent: 700,
    budgetAllocated: 1599900,
    startDate: '2024-04-05',
    endDate: '2024-04-25',
  },
]

const CampaignTable = ({ campaigns }) => {
  const { user } = useAuth()
  const { orgId } = user
  const [showForm, setShowForm] = useState(false)
  const [campaignsList, setCampaignsList] = useState([])
  const [fetchedCampaignsList, setfetchedCampaignsList] = useState([])


  const [campaignPaylaod, setCampaignPaylaod] = useState({})
  const [mode, setMode] = useState('add')



  const [isImportLeadsOpen1, setisImportLeadsOpen1] = React.useState(false)
  useEffect(() => {
    const unsubscribe = getAllCampaigns(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
         {return { ...docSnapshot.data(), ...{ docId: docSnapshot.id } } }
        )
        setfetchedCampaignsList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched users list is', projectsListA)
        setCampaignsList(projectsListA)
      },
      () => setfetchedCampaignsList([])
    )
    return unsubscribe
  }, [])

  return (
    <>
      <div
        className="relative bg-[white] min-w-full"
        style={{ height: '90vh' }}
      >
        <div className="flex m-2 py-4 px-4 justify-between">
          <h2 className="text-lg font-semibold text-black leading-light">
            Marketing Campaigns
          </h2>
          <button
            className="flex items-center bg-[#C2D7FE] text-black  py-2 px-4 rounded-full z-10"
            onClick={() => {
              setMode('add')
              setisImportLeadsOpen1(true)}
            }
          >
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Campaign</span>
          </button>
        </div>

        <div
          className=" table-container ml-4   bg-white shadow overflow-hidden sm:rounded-lg"
          style={{ width: '90%' }}
        >
          <table className="min-w-full border  border-gray-200">
            <thead className="bg-[#C4D6FE]">
              <tr>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Campaign Name
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Category
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Owner
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Spent Budget
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '120px', height: '50px' }}
                >
                  Allocated Budget
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Start Date
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  End Date
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '100px', height: '50px' }}
                >
                  Efficency
                </th>

                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border  border-gray-200"
                  style={{ width: '80px', height: '50px' }}
                >
                  Leads
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '80px', height: '50px' }}
                >
                  InProgress
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '80px', height: '50px' }}
                >
                  Booked
                </th>
                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '80px', height: '50px' }}
                >
                  NotInterested
                </th>

                <th
                  className="px-3 py-3 text-left text-xs font-medium text-gray-700  tracking-wider border border-gray-200"
                  style={{ width: '80px', height: '50px' }}
                >
                  Junk
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaignsList.map((campaign, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100"
                  style={{ height: '40px' }}
                  onClick={()=> {
                    setMode('edit')
                    setisImportLeadsOpen1(true)
                    setCampaignPaylaod(campaign)}}
                >
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {campaign?.campaignTitle}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {campaign?.source}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {campaign?.project}
                  </td>
                  <td
                    className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {Number(campaign?.budget)?.toLocaleString('en-IN')}
                  </td>
                  <td
                    className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right border border-gray-200"
                    style={{ width: '120px' }}
                  >
                    {campaign?.budgetAllocated?.toLocaleString('en-IN')}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {prettyDate(campaign?.start_date)}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {prettyDate(campaign?.end_date)}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 border border-gray-200"
                    style={{ width: '100px' }}
                  >
                    {'NA'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <CampaignForm
            addCampaign={() => {}}
            closeForm={() => setShowForm(false)}
          />
        )}
      </div>
      <SiderForm
        open={isImportLeadsOpen1}
        setOpen={setisImportLeadsOpen1}
        title={'Add Campaign'}
        mode={mode}
        // customerDetails={selUserProfile}
        campaignPaylaod={campaignPaylaod}
        widthClass="max-w-xl"
      />
    </>
  )
}

const CampaignForm = ({ addCampaign, closeForm }) => {
  const [campaign, setCampaign] = useState({
    name: '',
    category: '',
    owner: '',
    budgetSpent: '',
    budgetAllocated: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCampaign({ ...campaign, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addCampaign(campaign)
    closeForm()
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-lg">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Add New Campaign
        </h2>
        <button
          onClick={closeForm}
          className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.707a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 101.414-1.414L11.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586l-2.293-2.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Campaign Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={campaign.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Campaign Category
          </label>
          <select
            name="category"
            id="category"
            value={campaign.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select a category</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="owner"
            className="block text-sm font-medium text-gray-700"
          >
            Campaign Owner
          </label>
          <input
            type="text"
            name="owner"
            id="owner"
            value={campaign.owner}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="budgetSpent"
            className="block text-sm font-medium text-gray-700"
          >
            Budget Spent
          </label>
          <input
            type="number"
            name="budgetSpent"
            id="budgetSpent"
            value={campaign.budgetSpent}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="budgetAllocated"
            className="block text-sm font-medium text-gray-700"
          >
            Budget Allocated
          </label>
          <input
            type="number"
            name="budgetAllocated"
            id="budgetAllocated"
            value={campaign.budgetAllocated}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={campaign.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={campaign.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Campaign
          </button>
        </div>
      </form>
    </div>
  )
}

// Main component
const MarketingLeadsList = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showForm, setShowForm] = useState(false)

  const addCampaign = (newCampaign) => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }])
    setShowForm(false)
  }

  return (
    <div className="relative min-h-screen">
      <div className=" sm:px-6 lg:px-2  relative">
        <CampaignTable campaigns={campaigns} />
      </div>
    </div>
  )
}

export default MarketingLeadsList
