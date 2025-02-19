import { useState } from 'react'
import { useSnackbar } from 'notistack'
import Loader from 'src/components/Loader/Loader'
import {
  editPlotStatusAuditUnit,
  getAllUnitsByProject,
  streamGetAllUnitTransactions,
  unitAuditDbFun,
  updateProjectComputedData,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from 'src/util/computeCsTotals'

const UnitAudit = ({ title, dialogOpen, data, selUnitDetails }) => {
  const [loading, setLoading] = useState(false)
  const [unitDetailsA, setUnitDetailsA] = useState([])
  const [unitTransactionsA, setUnitTransactionsA] = useState([])

  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()
  const { orgId } = user

  const auditFun = async () => {
    console.log('audit begin')
    setLoading(true)

    // get the units with no data or invalid data and mark them as available

    // make all invalid units as available
    // await setInvalidUnitStatus()
    await setProjectComputedCounts()
    // calculate the Unit Status
    //  calculate the values
  }

  const setInvalidUnitStatus = async () => {
    console.log('login role detials', user)
    const { access, uid } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getAllUnitsByProject(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id

            return x
          })
          usersListA.sort((a, b) => {
            return b?.booked_on || 0 - b?.booked_on || 0
          })

          usersListA.map(async (data) => {
            if (data?.status === '') {
              const statusObj = { status: 'available' }
              try {
                await editPlotStatusAuditUnit(
                  orgId,
                  data?.id,
                  statusObj,
                  user?.email,
                  `Unit Status Marked by Audit`,
                  enqueueSnackbar
                )
              } catch (error) {
                enqueueSnackbar('Plot details Updation Failed', {
                  variant: 'success',
                })
              }
            }
          })
          setLoading(false)
        },
        {
          projectId: projectDetails?.uid,
        },
        () => {}
      )
      return unsubscribe
    }

    // await console.log('leadsData', leadsData)
  }

  const getAllTransactionsUnit = async () => {
    const { access, uid } = user

    const steamLeadLogs = await streamGetAllUnitTransactions(
      orgId,
      'snap',
      {
        unit_id: selUnitDetails?.id,
      },
      (error) => []
    )
    console.log('units are', steamLeadLogs)
    await setUnitTransactionsA(steamLeadLogs)
    return steamLeadLogs
  }
  const setProjectComputedCounts = async () => {
    console.log('login role detials', user)
    const { access, uid } = user

    //  get all transactions

    const transactoinsA = await getAllTransactionsUnit()

    // compute and save the details in unit

    await computeAmoounts(transactoinsA)

    return
    const unsubscribe = await getAllUnitsByProject(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id

          return x
        })
        usersListA.sort((a, b) => {
          return b?.booked_on || 0 - b?.booked_on || 0
        })

        setUnitDetailsA(usersListA)

        setLoading(false)
      },
      {
        projectId: projectDetails?.uid,
      },
      () => {}
    )
    const yo = {
      totalUnitCount: 0,
      availableCount: 0,
      bookUnitCount: 0,
      soldUnitCount: 0,
      blockedUnitCount: 0,
      management_blocked: 0,
      soldArea: 0,
      custBlockArea: 0,
      mangBlockArea: 0,
      blockedArea: 0,
    }
    await unitDetailsA.map((data) => {
      yo.totalUnitCount = yo.totalUnitCount + 1
      if (data?.status == 'available') {
        yo.availableCount = yo.availableCount + 1
      } else if (data?.status == 'customer_blocked') {
        yo.blockedUnitCount = yo.blockedUnitCount + 1
        yo.custBlockArea = yo.custBlockArea + (data?.area || 0)
        yo.availableCount = yo.availableCount + 1
      } else if (data?.status == 'management_blocked') {
        yo.blockedUnitCount = yo.blockedUnitCount + 1
        yo.mangBlockArea = yo.mangBlockArea + (data?.area || 0)
        yo.management_blocked = yo.management_blocked + 1
      } else if (data?.status == 'booked') {
        yo.bookUnitCount = yo.bookUnitCount + 1
      }

      if (
        ['sold', 'ats_pipeline', 'agreement_pipeline', 'booked'].includes(
          data?.status
        )
      ) {
        yo.soldUnitCount = yo.soldUnitCount + 1
        yo.soldArea = yo.soldArea + (data?.area || 0)
      }

      if (['customer_blocked', 'management_blocked'].includes(data?.status)) {
        yo.blockedArea = yo.blockedArea + (data?.area || 0)
      }
    })

    await updateProjectComputedData(orgId, projectDetails?.uid, yo)
    return unsubscribe

    // await console.log('leadsData', leadsData)
  }
  const computeAmoounts = async (transactoinsA) => {
    console.log('values are', unitTransactionsA, selUnitDetails?.id)
    const totalUnitCost = (
      (selUnitDetails?.plotCS?.reduce(function (
        _this,
        val
      ) {
        return (
          _this + val.TotalNetSaleValueGsT
        )
      },
      0) || 0) +
      selUnitDetails?.addChargesCS?.reduce(
          (partialSum, obj) =>
            partialSum +
            Number(
              computeTotal(
                obj,
                selUnitDetails?.super_built_up_area ||
                selUnitDetails?.area?.toString()?.replace(',', '')
              )
            ),
          0
        ) || 0
    )

    let InReviewAmount = 0
    let totalReceivedAmount = 0
    let totalApprovedAmount = 0
    let totalCancelledAmount = 0
    transactoinsA.map((d) => {
      totalReceivedAmount =
        totalReceivedAmount + (Number(d?.totalAmount) || Number(d?.amount))

      if (d.status === 'review') {
        InReviewAmount =
          InReviewAmount + (Number(d?.totalAmount) || Number(d?.amount))
      } else if (d.status === 'cancelled') {
        totalCancelledAmount =
          totalCancelledAmount + (Number(d?.totalAmount) || Number(d?.amount))
      } else if (d.status === 'received') {
        totalApprovedAmount =
          totalApprovedAmount + (Number(d?.totalAmount) || Number(d?.amount))
      }
      const elgibleAmount = selUnitDetails?.fullPs.reduce((total, item) => {
        if (item.elgible) {
          return total + item.value
        } else {
          return total
        }
      }, 0)
      console.log('elgible amount is ', elgibleAmount)
      unitAuditDbFun(
        orgId,
        selUnitDetails?.pId,
        selUnitDetails?.id,
        totalUnitCost,
        elgibleAmount,
        totalReceivedAmount,
        InReviewAmount,
        totalApprovedAmount,
        totalCancelledAmount

      )
      console.log(
        'valueare a',
        totalUnitCost,
        InReviewAmount,
        totalReceivedAmount,
        totalApprovedAmount,
        totalCancelledAmount
      )
    })
  }
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4   z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}

        <div className="flex flex-col ">
          <div className="mr-4 templateList flex flex-row">
            <div className=" flex">
              <div className="flex flex-col">
                <button
                  className="templateItem flex"
                  tabIndex="0"
                  type="button"
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon"
                      focusable="false"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <g clipPath="url(#clip0)">
                        <path
                          d="M14.9729 13.3132L12.9893 9.34558C13.6386 8.38794 14.0183 7.2334 14.0183 5.9917C14.0183 2.68787 11.3305 0 8.02663 0C4.7228 0 2.03493 2.68787 2.03493 5.9917C2.03493 7.2334 2.41469 8.38806 3.0641 9.34583L1.08022 13.3132C1.00759 13.4586 1.0154 13.6311 1.10073 13.7693C1.18618 13.9075 1.33705 13.9917 1.49953 13.9917H3.77553L5.14113 15.8125C5.23024 15.9312 5.3694 16 5.51613 16C5.71059 16 5.86379 15.884 5.93544 15.7408L7.8163 11.9792C7.88613 11.9817 7.95619 11.9834 8.02663 11.9834C8.09706 11.9834 8.16713 11.9817 8.23696 11.9792L10.1178 15.7408C10.1892 15.8838 10.3425 16 10.5371 16C10.6837 16 10.823 15.9312 10.912 15.8125L12.2777 13.9917H14.5537C14.7162 13.9917 14.8671 13.9075 14.9524 13.7693C15.0379 13.6311 15.0457 13.4586 14.9729 13.3132ZM5.43618 14.6432L4.38491 13.2417C4.2964 13.1237 4.15749 13.0542 4.00991 13.0542H2.25795L3.71254 10.1453C4.53847 11.0027 5.6166 11.6156 6.82643 11.8625L5.43618 14.6432ZM2.97243 5.9917C2.97243 3.20483 5.23976 0.9375 8.02663 0.9375C10.8135 0.9375 13.0808 3.20483 13.0808 5.9917C13.0808 8.77856 10.8135 11.0459 8.02663 11.0459C5.23976 11.0459 2.97243 8.77856 2.97243 5.9917ZM12.0432 13.0542C11.8958 13.0542 11.7569 13.1237 11.6682 13.2417L10.6171 14.6432L9.2267 11.8625C10.4367 11.6155 11.5149 11.0027 12.3408 10.145L13.7952 13.0541H12.0432V13.0542Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10.4193 6.7691L11.7283 5.2066C11.8321 5.08283 11.8648 4.91437 11.8149 4.7608C11.765 4.60712 11.6395 4.49005 11.4829 4.45087L9.50544 3.95624L8.42378 2.22833C8.33808 2.09137 8.18794 2.00824 8.02644 2.00824C7.86494 2.00824 7.71479 2.09137 7.6291 2.22833L6.54768 3.95624L4.57038 4.45087C4.41365 4.49005 4.28816 4.60712 4.23823 4.76068C4.18843 4.91437 4.22102 5.08283 4.32478 5.2066L5.63386 6.7691L5.49299 8.80243C5.48188 8.96356 5.55439 9.11908 5.68501 9.21405C5.88337 9.35822 6.08515 9.28998 6.13581 9.26959L8.02644 8.50763L9.91706 9.26972C10.0668 9.33002 10.2371 9.30902 10.3677 9.21417C10.4985 9.1192 10.571 8.96369 10.5599 8.80255L10.4193 6.7691ZM9.5793 6.31183C9.50141 6.40485 9.4626 6.52423 9.47102 6.6452L9.57295 8.12018L8.20173 7.56745C8.04975 7.50617 7.91645 7.54108 7.85127 7.56745L6.48005 8.12018L6.58222 6.64533C6.59053 6.52435 6.55171 6.40485 6.47383 6.31183L5.52436 5.17865L6.95857 4.81989C7.07624 4.79047 7.17781 4.71661 7.24214 4.61383L8.02656 3.36054L8.81111 4.61383C8.87544 4.71661 8.977 4.79047 9.09468 4.81989L10.5289 5.17865L9.5793 6.31183Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Unit Commericals</span>
                </button>
              </div>
            </div>
          </div>
          <button
            className="mb-2 md:mb-0 bg-green-400 px-5 py-2  mt-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
            type="submit"
            onClick={() => auditFun()}
            disabled={loading}
          >
            {loading && <Loader />}
            Audit Unit-{selUnitDetails?.unit_no}
          </button>
        </div>
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col m-4">
            <div className="mt-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitAudit
