/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import PaymentScheduleForm from './PaymentScheduleForm/PaymentScheduleForm'

const PaymentScheduleSetup = ({ phase, source }) => {
  const { user } = useAuth()

  const { orgId } = user

  const [blocksViewFeature, setBlocksViewFeature] = useState(
    'Plot_Payment_Schedule'
  )

  const [otherChargesA, setOtherChargesA] = useState([
    { lab: 'Plot Payment Schedule', val: 'Plot_Payment_Schedule' },
    {
      lab: 'Construction Payment Schedule',
      val: 'Construction_Payment_Schedule',
    },
  ])
  useEffect(() => {
    console.log('values of it ', phase, source, phase?.projectType?.name)
    // projectType.name != 'Plots'
    if (phase?.phase?.projectType?.name === 'Plots') {
      setOtherChargesA([
        { lab: 'Plot Payment Schedule', val: 'Plot_Payment_Schedule' },
      ])
    }
  }, [])

  return (
    <div className="lg:col-span-10 border w-full bg-[#F0F1FF]   ">
      {/* <div className=" border-gray-800 bg-[#D9D8FF]  text-black">
        <ul
          className="flex justify-  rounded-t-lg border-b  "
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {otherChargesA?.map((d, i) => {
            return (
              <li key={i} className="mr-2" role="presentation">
                <button
                  className={`inline-block py-3 px-4 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-black-300   ${
                    blocksViewFeature === d.val
                      ? 'border-black border-b-10 rounded-xs'
                      : 'border-transparent'
                  }`}
                  type="button"
                  role="tab"
                  onClick={() => setBlocksViewFeature(d.val)}
                >
                  {`${d.lab} `}
                </button>
              </li>
            )
          })}
        </ul>
      </div> */}

      <PaymentScheduleForm
        blocksViewFeature={blocksViewFeature}
        title={'Payment Schedule'}
        data={{ phase: phase }}
        source={source}
      />
    </div>
  )
}

export default PaymentScheduleSetup
