import React, { useEffect, useState } from 'react'
import { Select as SelectMAT, MenuItem } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import Select from 'react-select'
import EditableTable from 'src/components/comps/EditableComp'
import {
  costSheetAdditionalChargesA,
  csConstruAdditionalChargesA,
  csPartATax,
  gstValesPartA,
  gstValesA,
  unitsCancellation,
  costSheetPartcChargesA,
} from 'src/constants/projects'
import {
  addPhaseAdditionalCharges,
  addPhasePartAtax,
  updatePhaseAdditionalCharges,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const AdditionalChargesForm = ({ title, data, source, blocksViewFeature }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [tableData, setTableData] = useState([])
  const [fullCs, setFullCs] = useState([])
  const [partAData, setPartAData] = useState([])
  const [partCData, setPartCData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [editOpitionsObj, setEditOptions] = useState({})
  const [editOpitionsObjPartA, setEditOptionsPartA] = useState({})
  const [editOpitionsObjPartC, setEditOptionsPartC] = useState({})

  useEffect(() => {
    if (['projectManagement', 'projectOnboard'].includes(source)) {
      setEditOptions({
        onRowAdd: async (newData) => await handleRowAdd(newData),
        onRowUpdate: async (newData, oldData) =>
          await handleRowUpdate(newData, oldData),
        onRowDelete: async (oldData) => await handleRowDelete(oldData),
      })
    }
  }, [source, data, tableData])

  useEffect(() => {
    if (['projectManagement', 'projectOnboard'].includes(source)) {
      setEditOptionsPartC({
        onRowAdd: async (newData) => await handleRowAddPartC(newData),
        onRowUpdate: async (newData, oldData) =>
          await handleRowUpdatePartC(newData, oldData),
        onRowDelete: async (oldData) => await handleRowDeletePartC(oldData),
      })
    }
  }, [source, data, tableData, partCData])
  useEffect(() => {
    console.log('partAData', partAData)
    if (['projectManagement', 'projectOnboard'].includes(source)) {
      setEditOptionsPartA({
        onRowAdd: async (newData) => await handleRowAddPartA(newData),
        onRowUpdate: async (newData, oldData) =>
          await handleRowUpdatePartA(newData, oldData),
        onRowDelete: async (oldData) => await handleRowDeletePartA(oldData),
      })
    }
  }, [source, data, tableData, partAData])

  useEffect(() => {
    const { phase } = data

    const { additonalChargesObj, ConstructOtherChargesObj } = phase
    const x =
      blocksViewFeature === 'Construction_Other_Charges'
        ? ConstructOtherChargesObj
        : additonalChargesObj
    setTableData(x)
    console.log('helolo',phase?.fullCs )
    setFullCs(phase?.fullCs || [])
    setPartAData(phase?.partATaxObj || [])
    setPartCData(phase?.partCTaxObj || [])

    console.log('phase is ', phase, x)
  }, [data, blocksViewFeature])

  const { enqueueSnackbar } = useSnackbar()
  const defaultValue = (options, value) => {
    console.log('vale is', value)
    return (
      (options
        ? options.find((option) => option.value === value?.value)
        : '') || ''
    )
  }

  const defaultValueNew = (options, value) => {
    console.log('vale is', value)
    return (
      (options ? options.find((option) => option.value === value) : value) || ''
    )
  }

  // Part-1
  // paymentScheduleA
  const columns = [
    {
      title: 'Charges For*',
      field: 'component',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => {
        return rowData?.component?.label
      },
      editComponent: ({ value, onChange, rowData }) => {
        return (
          // <select
          //   value={defaultValue(
          //     blocksViewFeature === 'Construction_Other_Charges'
          //       ? csConstruAdditionalChargesA
          //       : costSheetAdditionalChargesA,
          //     value
          //   )}
          //   onChange={(value_x) => {
          //     console.log('onchane ', value_x)
          //     onChange(value_x)
          //   }}
          //   // onChange={(e) => handleEdit(row?.id, 'sex', e.target.value)}>
          // >
          //   {blocksViewFeature === 'Construction_Other_Charges'
          //     ? csConstruAdditionalChargesA
          //     : costSheetAdditionalChargesA.map((data, i) => (
          //         <option key={i} value={data?.value}>
          //           {data?.label}
          //         </option>
          //       ))}
          // </select>
          <SelectMAT
            defaultValue={'Car Parking'}
            // value={'Car Parking'}
            onChange={(e) => {
              const selectedOptionObject =
                blocksViewFeature === 'Construction_Other_Charges'
                  ? csConstruAdditionalChargesA
                  : costSheetAdditionalChargesA.find(
                      (option) => option.value === e.target.value
                    )
              console.log(
                'value is ',
                selectedOptionObject,
                e.target,
                e.target.value,
                value,
                rowData
              )

              onChange(selectedOptionObject)
            }}
          >
            {blocksViewFeature === 'Construction_Other_Charges'
              ? csConstruAdditionalChargesA
              : costSheetAdditionalChargesA.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </SelectMAT>
          // <Select
          //   name="component"
          //   onChange={(value_x) => {
          //     onChange(value_x)
          //   }}
          //   options={
          //     blocksViewFeature === 'Construction_Other_Charges'
          //       ? csConstruAdditionalChargesA
          //       : costSheetAdditionalChargesA
          //   }
          //   value={defaultValue(
          //     blocksViewFeature === 'Construction_Other_Charges'
          //       ? csConstruAdditionalChargesA
          //       : costSheetAdditionalChargesA,
          //     value
          //   )}
          //   className="text-md mr-2"
          //   styles={{
          //     menu: (provided) => ({
          //       ...provided,
          //       zIndex: 9999, // Adjust the z-index value as needed
          //     }),
          //   }}
          // />
        )
      },
      // editComponent: ({ value, onChange }) => (
      //   <input
      //     placeholder="Charges For"
      //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
      //     autoComplete="off"
      //     onChange={(e) => onChange(e.target.value)}
      //     value={value}
      //   />
      // ),
    },
    {
      title: 'Stalls*',
      field: 'units',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.units?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value) => {
              console.log('onchane ', value)
              onChange(value)
            }}
            options={unitsCancellation}
            value={defaultValue(unitsCancellation, value)}
            className="text-md mr-2"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 9,
                position: 'absolute', // Adjust the z-index value as needed
              }),
            }}
          />
        )
      },
    },
    {
      title: 'Charges*',
      field: 'charges',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) =>
        rowData?.units?.value === 'percentage'
          ? `${rowData?.charges} %`
          : `₹ ${rowData?.charges?.toLocaleString('en-IN')}`,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <input
            placeholder="Charges"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) =>
              rowData?.units?.value === 'percentage'
                ? onChange(
                    parseInt(e.target.value) > 100 ? 100 : e.target.value
                  )
                : onChange(e.target.value)
            }
            value={value}
            type="number"
            max="100"
          />
        )
      },
    },
    {
      title: 'GST*',
      field: 'gst',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.gst?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={gstValesA}
            value={defaultValue(gstValesA, value)}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Description*',
      field: 'description',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Description"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
  ]

  // Part-2
  // partA columns
  const partAcolumns = [
    {
      title: 'Charges For*',
      field: 'component',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => {
        return rowData?.component?.label
      },
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="component"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={
              blocksViewFeature === 'Construction_Other_Charges'
                ? csPartATax
                : csPartATax
            }
            value={defaultValue(
              blocksViewFeature === 'Construction_Other_Charges'
                ? csPartATax
                : csPartATax,
              value
            )}
            className="text-md mr-2"
          />
        )
      },
      // editComponent: ({ value, onChange }) => (
      //   <input
      //     placeholder="Charges For"
      //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
      //     autoComplete="off"
      //     onChange={(e) => onChange(e.target.value)}
      //     value={value}
      //   />
      // ),
    },
    {
      title: 'GST*',
      field: 'gst',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.gst?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={gstValesPartA}
            value={defaultValue(gstValesPartA, value)}
            className="text-md mr-2"
          />
        )
      },
    },
  ]

  // Part-3
  // partC columns
  const partCcolumns = [
    {
      title: 'Charges For*',
      field: 'component',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => {
        return rowData?.component?.label
      },
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="component"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={
              blocksViewFeature === 'Construction_Other_Charges'
                ? csConstruAdditionalChargesA
                : costSheetPartcChargesA
            }
            value={defaultValue(
              blocksViewFeature === 'Construction_Other_Charges'
                ? csConstruAdditionalChargesA
                : costSheetPartcChargesA,
              value
            )}
            className="text-md mr-2"
          />
        )
      },
      // editComponent: ({ value, onChange }) => (
      //   <input
      //     placeholder="Charges For"
      //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
      //     autoComplete="off"
      //     onChange={(e) => onChange(e.target.value)}
      //     value={value}
      //   />
      // ),
    },
    {
      title: 'Stalls*',
      field: 'units',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.units?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value) => {
              onChange(value)
            }}
            options={unitsCancellation}
            value={defaultValue(unitsCancellation, value)}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Charges*',
      field: 'charges',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) =>
        rowData?.units?.value === 'percentage'
          ? `${rowData.charges} %`
          : `₹ ${rowData?.charges?.toLocaleString('en-IN')}`,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <input
            placeholder="Charges"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) =>
              rowData?.units?.value === 'percentage'
                ? onChange(
                    parseInt(e.target.value) > 100 ? 100 : e.target.value
                  )
                : onChange(e.target.value)
            }
            value={value}
            type="number"
            max="100"
          />
        )
      },
    },
    {
      title: 'GST*',
      field: 'gst',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.gst?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={gstValesA}
            value={defaultValue(gstValesA, value)}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Description*',
      field: 'description',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Description"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
  ]

  const errors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.component) {
      errorList.push("Try Again, You didn't enter the Charges For field")
    }
    if (!formData.units) {
      errorList.push("Try Again, You didn't enter the Stalls field")
    }
    if (!formData.charges) {
      errorList.push("Try Again, You didn't enter the Charges field")
    }
    if (!formData.gst) {
      errorList.push("Try Again, You didn't enter the gst field")
    }

    // if (!formData.description) {
    //   errorList.push("Try Again, description field can't be blank")
    // }
    return errorList
  }
  const partAerrors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.component) {
      errorList.push("Try Again, You didn't enter the Charges For field")
    }

    if (!formData.gst) {
      errorList.push("Try Again, You didn't enter the gst field")
    }

    return errorList
  }
  //function for updating the existing row details
  const handleRowUpdate = async (newData, oldData) => {
    const { uid, additonalChargesObj } = data?.phase || {}

    console.log('check this stuff', tableData, additonalChargesObj)
    const c = await tableData.map((e) => {
      console.log(e.myId, oldData.myId, e.myId === oldData.myId)
      if (e.myId === oldData.myId) {
        return newData
      }
      return e
    })
    console.log('check this stuff', tableData, c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      blocksViewFeature === 'Construction_Other_Charges'
        ? 'ConstructOtherChargesObj'
        : 'additonalChargesObj',
      enqueueSnackbar
    )
  } //function for updating the existing row details
  const handleRowUpdatePartA = async (newData, oldData) => {
    const { uid, additonalChargesObj } = data?.phase || {}

    console.log('check this stuff', partAData, additonalChargesObj)
    const c = await partAData.map((e) => {
      console.log(
        'check this stuff',
        e.myId,
        oldData.myId,
        e.myId === oldData.myId,
        newData
      )
      if (e.myId === oldData.myId) {
        return newData
      }
      return e
    })
    console.log('check this stuff', tableData, c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      'partATaxObj',
      enqueueSnackbar
    )
  }

  //function for updating the existing row details
  const handleRowUpdatePartC = async (newData, oldData) => {
    const { uid, additonalChargesObj } = data?.phase || {}

    console.log('check this stuff', partAData, additonalChargesObj)
    const c = await partAData.map((e) => {
      console.log(
        'check this stuff',
        e.myId,
        oldData.myId,
        e.myId === oldData.myId,
        newData
      )
      if (e.myId === oldData.myId) {
        return newData
      }
      return e
    })
    console.log('check this stuff', tableData, c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      'partCTaxObj',
      enqueueSnackbar
    )
  }

  //function for deleting a row
  const handleRowDelete = async (oldData) => {
    const { uid } = data?.phase || {}
    const c = tableData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      blocksViewFeature === 'Construction_Other_Charges'
        ? 'ConstructOtherChargesObj'
        : 'additonalChargesObj',
      enqueueSnackbar
    )
    // await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  } //function for deleting a row
  const handleRowDeletePartA = async (oldData) => {
    const { uid } = data?.phase || {}
    const c = partAData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      'partATaxObj',
      enqueueSnackbar
    )
    // await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  } //function for deleting a row
  const handleRowDeletePartC = async (oldData) => {
    const { uid } = data?.phase || {}
    const c = partAData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await updatePhaseAdditionalCharges(
      orgId,
      uid,
      c,
      'partCTaxObj',
      enqueueSnackbar
    )
    // await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  }

  //function for adding a new row to the table
  const handleRowAdd = async (newData) => {
    setIserror(false)
    setErrorMessages([])
    const errorList = errors(newData)
    if (errorList.length < 1) {
      const { projectId, uid } = data?.phase || {}

      const additonalChargesObj = {
        ...newData,
      }
      // await createAdditonalCharges(additonalChargesObj, enqueueSnackbar)
      await addPhaseAdditionalCharges(
        orgId,
        uid,
        additonalChargesObj,
        blocksViewFeature === 'Construction_Other_Charges'
          ? 'ConstructOtherChargesObj'
          : 'additonalChargesObj',
        enqueueSnackbar
      )
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }
  //function for adding a new row to the table
  const handleRowAddPartA = async (newData) => {
    console.log('newData is', newData)
    setIserror(false)
    setErrorMessages([])
    const errorList = partAerrors(newData)
    if (errorList.length < 1) {
      console.log('newData is inside yo', newData)
      const { projectId, uid } = data?.phase || {}

      const additonalChargesObj = {
        ...newData,
      }
      // await createAdditonalCharges(additonalChargesObj, enqueueSnackbar)
      await addPhasePartAtax(
        orgId,
        uid,
        additonalChargesObj,
        'partATaxObj',
        enqueueSnackbar
      )
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }
  const [data1, setData] = useState([
    { id: 1, name: 'John Doe', sex: 'Male', class: '10th' },
    { id: 2, name: 'Jane Smith', sex: 'Female', class: '12th' },
  ])

  const handleEdit = (id, field, value) => {
    setData(
      data.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  const genders = ['Male', 'Female', 'Other']
  //function for adding a new row to the table
  const handleRowAddPartC = async (newData) => {
    setIserror(false)
    setErrorMessages([])
    const errorList = errors(newData)
    if (errorList.length < 1) {
      const { projectId, uid } = data?.phase || {}

      const additonalChargesObj = {
        ...newData,
      }
      // await createAdditonalCharges(additonalChargesObj, enqueueSnackbar)
      await addPhaseAdditionalCharges(
        orgId,
        uid,
        additonalChargesObj,
        'partCTaxObj',
        enqueueSnackbar
      )
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  const [currentStep, setCurrentStep] = useState(0)

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex)
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep === 0 ? 2 : prevStep - 1))
  }

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep === 2 ? 0 : prevStep + 1))
  }

  const headerStyles = (index) => ({
    borderTopLeftRadius: index === 0 ? '12px' : '0px',
    borderTopRightRadius: index === partAcolumns.length - 1 ? '12px' : '0px',
    borderBottomWidth: '2px',
    background: '#fff',
    fontWeight: '600',
    padding: '13px',
  })

  return (
    <section className="">
      {/* <table>
        <thead>
          {partAcolumns?.map((rowDa, i) => (
            <tr key={i}>
              <th>{rowDa?.title}</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {partAData.map((row) => (
            <tr key={row?.id}>
              <td>
                <input
                  type="text"
                  value={row?.component?.label}
                  onChange={(e) => handleEdit(row?.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row?.gst?.label}
                  onChange={(e) => handleEdit(row?.id, 'sex', e.target.value)}
                >
                  {gstValesA.map((data, i) => (
                    <option key={i} value={data?.value}>
                      {data?.label}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row?.class}
                  onChange={(e) => handleEdit(row.id, 'class', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* <div className="flex flex-col px-4 my-6 space-y-4">
        <div className="flex items-center ">
          <div
            className={`flex items-center ${
              currentStep === 0 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div
              className={`rounded-full ${
                currentStep >= 0 ? 'bg-[#DDD6FE]' : 'bg-gray-300'
              } w-8 h-8 flex items-center justify-center `}
            >
              A
            </div>
          </div>
          <div className="w-full h-[2px] bg-[#E5E7EB]"></div>
          <div
            className={`flex items-center ${
              currentStep === 1 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div
              className={`rounded-full ${
                currentStep >= 1 ? 'bg-[#DDD6FE]' : 'bg-gray-300'
              } w-8 h-8 flex items-center justify-center `}
            >
              B
            </div>
          </div>

          <div className="w-full h-[2px] bg-[#E5E7EB]"></div>

          <div
            className={`flex items-center ${
              currentStep === 2 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div
              className={`rounded-full ${
                currentStep >= 2 ? 'bg-[#DDD6FE]' : 'bg-gray-300'
              } w-8 h-8 flex items-center justify-center `}
            >
              C
            </div>
          </div>
        </div>
      </div> */}

      {/* Buttons for navigation */}
      {/* <div className="flex justify-between px-4 mb-4">
        {currentStep > 0 && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={prevStep}>Back</button>
        )}
        {currentStep < 2 && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={nextStep}>Next</button>
        )}
      </div> */}

      {/* <div className="flex justify-between px-4 mb-4">
        <button
          className="px-2 py-0 bg-[#DDD6FE] text-[10px] rounded-xl"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="px-2 py-0 bg-[#DDD6FE] text-[10px] rounded-xl"
          onClick={nextStep}
        >
          Next
        </button>
      </div> */}
      <div className=" ">
      <EditableTable  phase={data?.phase || {}}  partAData={partAData} fullCs= {fullCs} source={'project'} type={data?.phase?.projectType.name}/>
      </div>

      {/* {currentStep === 0 && (
        <>
          <section className="ml-4 text-md font-[500]">
            Unit Pricing & PLC
          </section>


          <div className="h-full w-full shadow-xl flex flex-col mb-2  rounded-t overflow-y-scroll">
            <div className="">
              <div className="mt-1">


                <MaterialCRUDTable
                  title=""
                  columns={partAcolumns.map((column, index) => ({
                    ...column,
                    headerStyle: headerStyles(index),
                  }))}
                  data={partAData}
                  options={{
                    headerStyle: {
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                      borderBottomWidth: '2px',
                      fontWeight: '600px',
                      padding: '13px',
                      borderRadius: '0px',
                      zIndex: '0',
                    },
                    actionsColumnIndex: -1,
                    minBodyHeight: '600px',
                    borderRadius: '30px',
                    search: false,
                    paging: false,
                    doubleHorizontalScroll: true,
                    position: 'absolute',
                  }}
                  style={{
                    padding: '0px 20px',
                    borderRadius: '30px',
                    boxShadow: 'none',
                    fontSize: '12px',
                    marginLeft: '10px',
                    marginRight: '10px',
                  }}
                  actionsCellStyle={{
                    width: 'auto',
                    justifyCenter: 'center',
                  }}
                  source={source}
                  editable={editOpitionsObjPartA}
                />
              </div>
            </div>
          </div>
        </>
      )} */}

      {/* Part B */}
      {/* {currentStep === 1 && (
        <>
          <section className="ml-4 text-md font-[500]">Additional Charges</section>

          <div className="">

            <div className=" min">
              <MaterialCRUDTable
                title=""
                columns={columns}
                data={tableData}
                options={{
                  headerStyle: {
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    borderBottomWidth: '2px',
                    fontWeight: '600px',
                    padding: '13px',
                    zIndex: '0',
                  },
                  actionsColumnIndex: -1,
                  minBodyHeight: '1000px',
                  paging: false,
                  search: false,
                  doubleHorizontalScroll: true,
                  position: 'absolute',
                }}
                style={{
                  padding: '0px 20px',
                  borderRadius: '30px',
                  boxShadow: 'none',
                  fontSize: '12px',
                  marginLeft: '10px',
                  marginRight: '10px',
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
        </>
      )} */}

      {/* Part C */}
      {/* {currentStep === 2 && (
        <>
          <section className="ml-4 text-md font-[500]">Other Charges</section>
          <div className="">
            <MaterialCRUDTable
              title=""
              columns={partCcolumns}
              data={partCData}
              options={{
                headerStyle: {
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                  borderBottomWidth: '2px',
                  background: '#f8fafd',
                  fontWeight: '600px',
                  padding: '13px',
                  zIndex: '0',
                },
                actionsColumnIndex: -1,
                minBodyHeight: '1000px',
                paging: false,
                search: false,
                doubleHorizontalScroll: true,
                position: 'absolute',
              }}
              style={{
                padding: '0px 30px',
                borderRadius: '30px',
                boxShadow: 'none',
                fontSize: '12px',
                marginLeft: '10px',
                marginRight: '10px',
              }}
              actionsCellStyle={{
                width: 'auto',
                justifyCenter: 'center',
              }}
              source={source}
              editable={editOpitionsObjPartC}
            />
          </div>
        </>
      )} */}

      {/* <section className="ml-4 text-md font-[500]">Part-A</section> */}

      {/* part b */}
      <div className="h-full shadow-xl flex flex-col  mb-6 bg-[#F1F5F9] rounded-t overflow-y-scroll"></div>
    </section>
  )
}

export default AdditionalChargesForm
