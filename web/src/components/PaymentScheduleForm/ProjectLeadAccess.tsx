import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@mui/lab'
import Checkbox from '@mui/material/Checkbox'
import { useSnackbar } from 'notistack'
import {
  updateUserAccessProject,
  steamUsersList,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const PaymentLeadAccess = ({ title, data, dept, source, }) => {
  const { user } = useAuth()
  const { orgId, email } = user
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [editOpitionsObj, setEditOptions] = useState({})
  const [salesPeopleList, setsalesPeopleList] = useState([])
  const [leadsProjectAccessA, setLeadsProjectAccessA] = useState([])
  const [selProjId, setProjId] = useState('')
  const [selKeyName, setSelKeyName] = useState('')


  useEffect(() => {
    const { project } = data
    setProjId(project?.uid)
    if(dept === 'admin'){
      setSelKeyName('creditNoteIssuersA')
    } else if(dept === 'sales'){
      setSelKeyName('projAccessA')
    }

  }, [data])

  useEffect(() => {
    const unsubscribe = steamUsersList(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setsalesPeopleList(usersListA)
      },
      (error) => setsalesPeopleList([])
    )

    return unsubscribe
  }, [])

  const addRemoveProjectAccessFun = async(value) => {
    console.log('value is', value, data, source)
    const { uid, email: empEmailId, projAccessA } = value
    const { project } = data
    const { eventName, uid: projiD } = project

    //  projId
    // add projectId to users doc
    // const { uid, projAccessA, , email } = value

    let newAccessA = value?.[`${selKeyName}`] || []
    console.log('new porj is', projAccessA)
    if (value?.[`${selKeyName}`]?.includes(projiD)) {
      newAccessA = value?.[`${selKeyName}`]?.filter((d) => d != projiD)
      console.log('new project Access is', newAccessA)
    } else {
      newAccessA = [...(value?.[`${selKeyName}`]  || []), ...[projiD]]
    }
    // eventName
   await  updateUserAccessProject(
      orgId,
      uid,
      { [`${selKeyName}`]: newAccessA },
      eventName,
      empEmailId,
      email,
      enqueueSnackbar
    )

    // setLeadsProjectAccessA(value.target.value)
  }

  return (
    <>
      <div className="h-full w-full shadow-xl flex flex-col pt-6 mb-6  bg-[#F1F5F9] rounded-t overflow-y-scroll">
        <div className="z-10">
          {/* <Dialog.Title className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
          <span className="mr-auto ml-3  text-md font-extrabold tracking-tight uppercase font-body ">
            {title}
          </span>
          <div className="mt-5"></div>

          <div>
            {iserror && (
              <Alert severity="error">
                <AlertTitle>ERROR</AlertTitle>
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            )}
          </div>
        </div>
        <div className="bg-white p-4">
          {salesPeopleList
            .filter((d) => d.department == dept && d?.roles[0] != 'cp-agent')
            ?.map((salesPerson, i) => {
              return (
                <div key={i}>
                  <Checkbox
                    color="primary"
                    checked={salesPerson?.[`${selKeyName}`]?.includes(selProjId)}
                    onChange={(e) => {
                      console.log('earnet')
                      addRemoveProjectAccessFun(salesPerson)
                    }}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                  {salesPerson.label}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default PaymentLeadAccess
