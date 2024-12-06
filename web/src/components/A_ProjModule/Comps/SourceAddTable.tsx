import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
import {
  addNewSourceComp,
  deleteSourceList,
  getAllSources,
  updateLeadSourcesItem,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const SourceAddTable = ({ title, data, source, blocksViewFeature }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [editOpitionsObj, setEditOptions] = useState({})
  const [leadSourcesList, setLeadSourcesList] = useState([])

  useEffect(() => {
    // if (source === 'projectManagement') {
    setEditOptions({
      onRowAdd: async (newData) => await handleRowAdd(newData),
      onRowUpdate: async (newData, oldData) =>
        await handleRowUpdate(newData, oldData),
      onRowDelete: async (oldData) => await handleRowDelete(oldData),
    })
    // /}
  }, [source, data, tableData])

  useEffect(() => {
    // const { phase } = data
    // const { additonalChargesObj, ConstructOtherChargesObj } = phase
    // const x =
    //   blocksViewFeature === 'Construction_Other_Charges'
    //     ? ConstructOtherChargesObj
    //     : additonalChargesObj
    // setTableData(x)
    // console.log('phase is ', phase, x)
    getSourcesListFun()
  }, [])
  const getSourcesListFun = () => {
    const unsubscribe = getAllSources(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        console.log('fetched proejcts list is', projectsListA)
        setLeadSourcesList(projectsListA)
      },
      (error) => setLeadSourcesList([])
    )
    return unsubscribe
  }
  const { enqueueSnackbar } = useSnackbar()
  const defaultValue = (options, value) => {
    return (
      (options
        ? options.find((option) => option.value === value?.value)
        : '') || ''
    )
  }
  // paymentScheduleA
  const columns = [
    // {
    //   title: 'Charges For*',
    //   field: 'component',
    //   headerStyle: {
    //     padding: '0.25rem',
    //   },
    //   cellStyle: {
    //     padding: '0.25rem',
    //   },
    //   render: (rowData) => {
    //     return rowData?.component?.label
    //   },
    //   editComponent: ({ value, onChange, rowData }) => {
    //     return (
    //       <Select
    //         name="component"
    //         onChange={(value_x) => {
    //           onChange(value_x)
    //         }}
    //         options={
    //           blocksViewFeature === 'Construction_Other_Charges'
    //             ? csConstruAdditionalChargesA
    //             : costSheetAdditionalChargesA
    //         }
    //         value={defaultValue(
    //           blocksViewFeature === 'Construction_Other_Charges'
    //             ? csConstruAdditionalChargesA
    //             : costSheetAdditionalChargesA,
    //           value
    //         )}
    //         className="text-md mr-2"
    //       />
    //     )
    //   },

    // },

    {
      title: 'Source*',
      field: 'label',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <input
            placeholder="Charges"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type="text"
          />
        )
      },
    },
    {
      title: 'Keywords*',
      field: 'value',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.value,
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Keywords"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
  ]

  // const getCharges = async () => {
  //   const { projectId, uid } = data?.phase || {}

  //   const unsubscribe = getAdditionalCharges(
  //     { projectId, phaseId: uid },
  //     (querySnapshot) => {
  //       const response = querySnapshot.docs.map((docSnapshot) =>
  //         docSnapshot.data()
  //       )
  //       console.log('before', response)

  //       setTableData(response)
  //     },
  //     (e) => {
  //       console.log('error', e)
  //       setTableData([])
  //     }
  //   )
  //   return unsubscribe
  // }

  // useEffect(() => {
  //   getCharges()
  // }, [])

  const errors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.label) {
      errorList.push("Try Again, You didn't enter the Source Label For field")
    }
    if (!formData.value) {
      errorList.push("Try Again, You didn't enter the source Keyword field")
    }

    // if (!formData.description) {
    //   errorList.push("Try Again, description field can't be blank")
    // }
    return errorList
  }
  //function for updating the existing row details
  const handleRowUpdate = async (newData, oldData) => {
    console.log('check this stuff', tableData, newData, oldData)
    const { myId: uid } = newData
    await updateLeadSourcesItem(orgId, uid, newData, enqueueSnackbar)

    return
    const c = await tableData.map((e) => {
      console.log(e.myId, oldData.myId, e.myId === oldData.myId)
      if (e.myId === oldData.myId) {
        return newData
      }
      return e
    })
    console.log('check this stuff', tableData, c)
  }

  //function for deleting a row
  const handleRowDelete = async (oldData) => {
    const { myId } = oldData
    const c = tableData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await deleteSourceList(orgId, myId, enqueueSnackbar)

    // await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  }

  //function for adding a new row to the table
  const handleRowAdd = async (newData) => {
    console.log('newData is', newData)

      setIserror(false)
      setErrorMessages([])
      const errorList = errors(newData)
      if (errorList.length < 1) {

         addNewSourceComp(orgId, newData, enqueueSnackbar)
      } else {
        setErrorMessages(errorList)
        setIserror(true)
      }

  }

  return (
    <div className="h-full  flex flex-col  mb-6 bg-[#F1F5F9] ">
      <div className="z-10">
        <div className=" min">
          <MaterialCRUDTable
            title=""
            columns={columns}
            data={leadSourcesList}
            options={{
              headerStyle: {
                borderRadius: 0,
                borderBottomWidth: '2px',
              },
              actionsColumnIndex: -1,
              paging: false,
              minBodyHeight: '100px',
              doubleHorizontalScroll: true,
            }}
            style={{
              padding: '30px',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
            actionsCellStyle={{
              width: 'auto',
              justifyCenter: 'center',
            }}
            source={source}
            editable={editOpitionsObj}
          />
        </div>
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
    </div>
  )
}

export default SourceAddTable
