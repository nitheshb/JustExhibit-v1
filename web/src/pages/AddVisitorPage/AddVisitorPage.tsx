import React from 'react'
import AddNewVisitorForm from 'src/components/AddNewVisitorForm'

const AddVistorPage = () => {
  console.log('AddCpLeadsPage rendered')
  return (
   <div>
      {/* <HeadNavBar2 /> */}
      <AddNewVisitorForm title='Add Visitor' customerDetails={undefined} />

    </div>

  )
}

export default AddVistorPage
