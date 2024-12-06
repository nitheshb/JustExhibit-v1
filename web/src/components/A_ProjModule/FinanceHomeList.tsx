import { useState } from 'react'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { updateMoreDetails } from 'src/context/dbQueryFirebase'
import PaymentScheduleForm from '../PaymentScheduleForm/PaymentScheduleForm'
import PaymentLeadAccess from '../PaymentScheduleForm/ProjectLeadAccess'

const FinanceHomeList = ({
  title,
  dialogOpen,
  data,
  setSubView,
  subView,
  source,
  projectDetails,
}) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      editMode: true,
    }
    setLoading(true)
    await updateMoreDetails(data?.phase?.uid, updatedData, enqueueSnackbar)
    setLoading(false)
    resetForm()
    dialogOpen(false)
  }

  const initialState = {
    highlights: data?.phase?.moreDetails?.highlights || '',
    amenities: data?.phase?.moreDetails?.amenities || '',
    remarks: data?.phase?.moreDetails?.remarks || '',
  }

  const schema = Yup.object({
    highlights: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col   bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 z-10">
        <div className="flex flex-row">
          <div className="mr-4 templateList">
            <div className=" flex">
              <div className="flex flex-col">
            
                <button
                  className={`templateItem ${
                    subView === 'bankerdetails' ? 'hightlightItem' : ''
                  }`}
                  tabIndex="0"
                  type="button"
                  onClick={() => setSubView('bankerdetails')}
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18,10V8A6,6,0,0,0,6,8v2a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V12A2,2,0,0,0,18,10ZM8,8a4,4,0,0,1,8,0v2H8Zm7,7.5a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,0a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,1v-1a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1A.5.5,0,0,1,7,16.5Z"></path>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Loan Details</span>
                </button>
              </div>
            </div>
          </div>

          {subView === 'bankdetails' && (
            <PaymentScheduleForm
              title={'Payment Schedule'}
              data={{ phase: data }}
              source={source}
            />
          )}
          {subView === 'financeAccessTeam' && (
            <PaymentLeadAccess
              title={'Leads Access'}
              data={{ phase: data, project: projectDetails }}
              source={source}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FinanceHomeList
