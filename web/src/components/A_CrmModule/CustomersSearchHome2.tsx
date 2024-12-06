/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'
import SiderForm from 'src/components/SiderForm/SiderForm'
import {
  getCRMCustomer,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'
import { useSnackbar } from 'notistack'
import { motion } from 'framer-motion'
import { PencilIcon } from '@heroicons/react/solid'
const CustomersSearchHome2 = ({ project }) => {
  const { eventName } = project
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const { orgId } = user
  const [customerRawData, setCustomerRawData] = useState([])
  const [payments, setPayments] = useState([])

  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [selCustomerIs, setCustomerIs] = useState({})

  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])

  const paymentsA = [
    {
      label: 'Demands',
      eventName: 'Demands',
      value: 'demands',
    },
    {
      label: 'Review',
      eventName: 'review',
      value: 'review',
    },
    {
      label: 'Received',
      eventName: 'received',
      value: 'received',
    },
    {
      label: 'Rejected',
      eventName: 'rejected',
      value: 'rejected',
    },
  ]
  const registerA = [
    {
      label: 'Booking',
      eventName: 'Booking',
      value: 'booking',
    },
    {
      label: 'Agreement',
      eventName: 'Agreement',
      value: 'agreement',
    },
    {
      label: 'Registered',
      eventName: 'registered',
      value: 'registered',
    },
    {
      label: 'Rejected',
      eventName: 'rejected',
      value: 'rejected',
    },
  ]

  useEffect(() => {
    getProjects()
  }, [])
  const getProjects = async () => {
    const { access, uid } = user

    // const streamrawData = await streamGetCustomersS(
    //   orgId,
    //   'snap',
    //   {
    //     uid,
    //   },
    //   (error) => []
    // )
    // await setCustomerRawData(streamrawData)

    const unsubscribe = getCRMCustomer(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        setCustomerRawData([...projects])
        console.log('project are ', projects)
      },
      () => setCustomerRawData([]),
      (error) => setCustomerRawData([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }

  const dispDoc = (docData) => {
    setCustomerIs(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }

  return (
    <div className="">
      <div className="flex flex-col mt-2 rounded-lg bg-white py-4 border-b border-gray-200">
        <span className="px-4 font-bold mb-3">Customers</span>
        <div className="-my-2 overflow-x-auto ">
          <div className="py-2 align-middle inline-block min-w-full ">
            <div className="shadow overflow-hidden   bg-white pb-4  px-2   ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                    >
                      KYC
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider  text-right"
                    >
                      Wallet
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider  text-right"
                    >
                      Review
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider  text-right"
                    >
                      Utilised
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                    >
                      Stalls
                    </th> <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500  tracking-wider"
                    >
                      Action
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerRawData.map((person, i) => (
                    <motion.tr key={i} onClick={() => dispDoc(person)} className='cursor-pointer'>
                      <td
                        className="px-6 py-4 whitespace-nowrap"

                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={'/avatar_1.png'}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person?.companyName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person?.co_Name1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {person?.kyc_status ? 'Done' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-right">
                        <div className="text-sm text-gray-900">
                          {person?.remaining_money?.toLocaleString('en-IN')}
                        </div>

                      </td> <td className="px-6 py-4 whitespace-nowrap  text-right">

                        <div className="text-sm text-gray-900">
                          {person?.input_money?.toLocaleString('en-IN')}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {person?.utilized_money?.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {person?.my_assets?.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <PencilIcon
                          className="w-5 h-5 ml-[6px] mb-[4px] inline cursor-pointer"
                          onClick={() => {}}
                        />

                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'upload_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-2xl"
        projectsList={customerRawData}
      />
      <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'customer_summary_full_view'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-3xl"
        selCustomerPayload={selCustomerIs}
      />
    </div>
  )
}

export default CustomersSearchHome2
