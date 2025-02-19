/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import TodayLeadsActivityListHomeView from './TodayLeadsAcivityListHome'
import AdminPage from './AdminPage'

const TodayLeadsHomePage = ({ taskType }) => {
  const [, setisImportLeadsOpen] = useState(false)

  const [ready, setReady] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')

  const selUserProfileF = (title) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
  }
  return (
    <>

      <div className="flex  flex-row  text-gray-700">
        <div className="flex-1 overflow-auto">
          <div className="pr-2">


          <TodayLeadsActivityListHomeView
setisImportLeadsOpen={setisImportLeadsOpen}
selUserProfileF={selUserProfileF}
taskType={taskType}
/> 

            {/* <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Today Activity
                </h2>
              </div>
              <div className="flex">
                <h1> hello</h1>
              </div>
            </div> */}
{/* 
            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
            {!ready && (





       



      
    
            )} */}
  {/* <div className='bg-[#fff] rounded-2xl'>
  <AdminPage/>
</div> */}

          </div>
        </div>
      </div>
    </>
  )
}

export default TodayLeadsHomePage
