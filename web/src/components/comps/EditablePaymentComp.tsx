import React, { useState, useEffect } from 'react'
import { Select as SelectMAT, MenuItem } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'



import {
  unitsCancellation,
} from 'src/constants/projects'
import {
  streamProjectCSMaster,
  addPhasePaymentScheduleCharges,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { formatIndianNumber } from 'src/util/formatIndianNumberTextBox'


// import './styles.css'
const StyledSelect = styled(SelectMAT)(({ theme }) => ({
  // width: '170px',
  fontSize: '13px',
  '&.MuiInputBase-root': {
    width: '100%',
    fontSize: '13px', //
  },
  '&.MuiOutlinedInput-root': {
    width: '100%',
  },
  '&.MuiFilledInput-root': {
    width: '100%',
  },
  '& .MuiSelect-select': {
    borderBottom: 'none',
    paddingRight: '32px',
    fontSize: '13px', //
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    right: 0,
    width: '32px',
    pointerEvents: 'none',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: 'none',
  },
  '& .MuiMenuItem-root': {
    fontSize: '13px', // Set font size for menu items
  },
}))
const EditableTablex = () => {
  const [rows, setRows] = useState([
    { id: '1', col1: 'option1', col2: '', col3: '' },
  ])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const newRows = Array.from(rows)
    const [reorderedItem] = newRows.splice(result.source.index, 1)
    newRows.splice(result.destination.index, 0, reorderedItem)

    setRows(newRows)
  }

  const handleChange = (id, column, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    )
  }

  const addRow = () => {
    const uid = uuidv4()

    const newRow = {
      id: uid,
      col1: 'option1',
      col2: '',
      col3: '',
    }
    setRows([...rows, newRow])
  }

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-[#e0e0e0] p-2 text-left">
                Column 1 (Dropdown)
              </th>
              <th className="border border-[#e0e0e0] p-2 text-left">
                Column 2 (Text)
              </th>
              <th className="border border-[#e0e0e0] p-2 text-left">
                Column 3 (Number)
              </th>
            </tr>
          </thead>
          <Droppable droppableId="table">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {rows.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                      >
                        <td className="border border-[#e0e0e0] p-2">
                          <select
                            value={row.col1}
                            onChange={(e) =>
                              handleChange(row.id, 'col1', e.target.value)
                            }
                            className="w-full p-1 border border-[#e0e0e0] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </select>
                        </td>
                        <td className="border border-[#e0e0e0] p-2">
                          <input
                            type="text"
                            value={row.col2}
                            onChange={(e) =>
                              handleChange(row.id, 'col2', e.target.value)
                            }
                            className="w-full p-1 border border-[#e0e0e0] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border border-[#e0e0e0] p-2">
                          <input
                            type="number"
                            value={row.col3}
                            onChange={(e) =>
                              handleChange(row.id, 'col3', e.target.value)
                            }
                            className="w-full p-1 border border-[#e0e0e0] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150 ease-in-out"
      >
        Add Row
      </button>
    </div>
  )
}

const EditablePaymentTable = ({
  title,
  phase,
  dataPayload,
  projData,
  partAData,
  fullCs,
  source,
  type,
  blocksViewFeature,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [data, setData] = useState([
    {
      id: 1,
      category: { value: 'addNewOption', label: 'Add New' },
      unit: 'kg',
      value: 10,
    },
    {
      id: 2,
      category: { value: '123', label: 'Apple' },
      unit: 'liter',
      value: 5,
    },
    {
      id: 3,
      category: { value: '124', label: 'Bat' },
      unit: 'piece',
      value: 2,
    },
  ])
  const [bankDetailsA, setBankDetailsA] = useState([])

  const [errors, setErrors] = useState({})
  const [costPerSqft, setCostPerSqft] = useState(1000)
  const [gst, setGST] = useState(12)

  useEffect(() => {
    if (source === 'project') {
      console.log('hello', fullCs)
      const costSqftA = fullCs.filter(
        (row) => row.component.value === 'sqft_cost_tax'
      )
      if (costSqftA.length > 0) {
        console.log('setUpData', costSqftA)
        const x = costSqftA[0]
        setCostPerSqft(x?.charges)
        setGST(x?.gst.value)
      }
      setRows(fullCs)
    } else {
      console.log('data is ', dataPayload)
      setRows(dataPayload || [])
      return
      const unsubscribe = streamProjectCSMaster(
        orgId,
        (querySnapshot) => {
          const addNewSetUp = [{ value: 'addNewOption', label: 'Add New' }]
          const bankA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // fullCs
          bankA.map((user) => {
            user.label = user?.accountName
            user.value = user?.accountNo
          })
          console.log('fetched users list is', bankA)
          if (bankA?.length > 0) {
            const y = bankA.filter((item) => item.type == type)
            console.log('matched is ', y)
            const x = y[0]['fullCs']
            // setBankDetailsA([...addNewSetUp, ...bankA])
            setRows(x)
          }
        },
        (error) => setRows([])
      )

      return unsubscribe
    }
  }, [fullCs, dataPayload])
  const categories = ['Food', 'Drink', 'Electronics', 'Clothing']

  const handleChange = (id, field, value) => {
    // if (field === 'category') {
    //   const isDuplicate = data.some(
    //     (item) => item.id !== id && item.category === value
    //   )
    //   if (isDuplicate) {
    //     setErrors((prev) => ({
    //       ...prev,
    //       [id]: 'This category is already in use',
    //     }))
    //   } else {
    //     setErrors((prev) => {
    //       const newErrors = { ...prev }
    //       delete newErrors[id]
    //       return newErrors
    //     })
    //   }
    // }

    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )
  }

  const handleDelete = (id) => {
    setRows(rows.filter((item) => item.id !== id))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[id]
      return newErrors
    })
  }

  const handleAdd = () => {
    const newId = Math.max(...data.map((item) => item.id), 0) + 1
    setData([...data, { id: newId, category: 'Food', unit: '', value: 0 }])
  }

  const onDragEnd = (result) => {
    console.log('resulet is ', result)
    if (!result.destination) return

    const newRows = Array.from(rows)
    const [reorderedItem] = newRows.splice(result.source.index, 1)
    newRows.splice(result.destination.index, 0, reorderedItem)

    setRows(newRows)
  }

  const handleChange1 = (id, column, value) => {
    console.log('latest check', value)
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    )
  }

  const addRow = () => {
    // const newRow = {
    //   id: String(rows.length + 1),
    //   category: { label: 'Add new', value: 'addNewOption' },
    //   col2: '',
    //   col3: '',
    // }
    const uid = uuidv4()

    const newRow = {
      zeroDay: '0',
      description: '',
      myId: uid,
      id: uid,
      units: {
        value: 'percentage',
        label: 'Percentage',
      },
      stage: {
        label: 'On Booking',
        value: 'on_booking',
      },
      percentage: '10',
      tableData: {
        id: rows?.length || 0 + 1,
      },
    }

    setRows([...rows, newRow])
  }
  const saveSetup = async () => {
    console.log('setUpData is ', rows, source)
    const data = { fullCs: rows, type: type }
    const { projectId, uid } = phase || {}
    if (source === 'project') {
      // addPhaseFullCs(orgId, uid, rows, 'partATaxObj', enqueueSnackbar)
      await addPhasePaymentScheduleCharges(
        orgId,
        uid || projData?.phase?.uid,
        rows,
        blocksViewFeature === 'Construction_Payment_Schedule'
          ? 'ConstructPayScheduleObj'
          : 'paymentScheduleObj',
        enqueueSnackbar
      )
    } else {
      await addPhasePaymentScheduleCharges(
        orgId,
        uid || projData?.phase?.uid,
        rows,
        blocksViewFeature === 'Construction_Payment_Schedule'
          ? 'ConstructPayScheduleObj'
          : 'paymentScheduleObj',
        enqueueSnackbar
      )
      // addCostSheetMaster(orgId, `${type}_cs`, data, enqueueSnackbar)
    }
  }
  const [rows, setRows] = useState([
    // {
    //   id: '1',
    //   category: { label: 'option1', value: 'addNewOption' },
    //   col2: '',
    //   col3: '',
    // },
    {
      id: '0',
      myId: '2c7bcd74-d334-471e-9138-5de5c96ee484',
      zeroDay: '0',
      description: 'On Booking',
      stage: {
        label: 'On Booking',
        value: 'on_booking',
      },
      percentage: '100000',
      tableData: {
        id: 0,
      },
    },
  ])
  useEffect(() => {
    // if(blocksViewFeature === 'Plot_Payment_Schedule'){
    //   setRows(paymentScheduleA)
    // }else{
    //   setRows(paymetScheduleConstruct)
    // }
  }, [])

  return (
    <>
      <div className=" m-2 p-4 bg-white rounded-xl">
        <div className="">
          <div className="py-2 pb-1 mb-1">
            <p className="text-sm text-gray-800 font-medium">{title}</p>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700">
                  <tr className="bg-gray-100 rounded-xl rounded-x-md">
                    <th className=" p-2 pl-2 text-center   text-md max-w-[600px] w-[300px]">
                      Payment Stage
                    </th>
                    <th className=" p-1 pl-2 text-center">Cost Type</th>
                    <th className=" p-1 pl-2 text-center">Amount/Percentage</th>
                    <th className=" p-1 pl-2 text-center">Timeline</th>
                    <th className=" p-1 pl-2 text-center">Description</th>
                    <th className=" p-1 pl-2 text-center">Action</th>
                  </tr>
                </thead>
                <Droppable droppableId="table">
                  {(provided) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                      {rows
                        // .filter((row) => row.section.value != 'unitCost')
                        ?.map((row, index) => (
                          <Draggable
                            key={row.id}
                            draggableId={row.id}
                            index={index}
                          >
                            {(provided) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                              >
                                <td className="border-b border-[#e0e0e0] px-2 w-[300px]">
                                  <section className="flex flex-row">
                                    <input
                                      type="text"
                                      value={row?.stage?.label}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(
                                          /,/g,
                                          ''
                                        )
                                        const chargesForDropDown = {label: rawValue, value: rawValue}
                                        handleChange1(row.id, 'stage', chargesForDropDown)
                                      }}
                                      className="w-full p-1 border text-left border-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                  
                                  </section>
                                  {/* <StyledSelect
                                    disableUnderline={true}
                                    defaultValue={row?.stage?.value}
                                    value={row?.stage?.value}
                                    onChange={(e) => {
                                      const chargesForDropDown =
                                        blocksViewFeature ===
                                        'Plot_Payment_Schedule'
                                          ? paymentScheduleA
                                          : paymetScheduleConstruct
                                      const selectedOptionObject =
                                        chargesForDropDown.find(
                                          (option) =>
                                            option.value === e.target.value
                                        )
                                      handleChange1(
                                        row.id,
                                        'stage',
                                        selectedOptionObject
                                      )
                                    }}
                                  >
                                    {blocksViewFeature ===
                                    'Plot_Payment_Schedule'
                                      ? paymentScheduleA.map((option) => (
                                          <MenuItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        ))
                                      : paymetScheduleConstruct.map(
                                          (option) => (
                                            <MenuItem
                                              key={option.value}
                                              value={option.value}
                                            >
                                              {option.label}
                                            </MenuItem>
                                          )
                                        )}
                                  </StyledSelect> */}
                                </td>
                                <td className="border-b border-[#e0e0e0]">
                                  <StyledSelect
                                    disableUnderline={true}
                                    defaultValue={row?.units?.value}
                                    value={row?.units?.value}
                                    onChange={(e) => {
                                      const selectedOptionObject =
                                        unitsCancellation.find(
                                          (option) =>
                                            option.value === e.target.value
                                        )
                                      handleChange1(
                                        row.id,
                                        'units',
                                        selectedOptionObject
                                      )
                                    }}
                                  >
                                    {unitsCancellation.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </StyledSelect>
                                </td>
                                <td className="border-b border-[#e0e0e0] mr-2 pr-4">
                                  <section className="flex flex-row">
                                    <input
                                      type="text"
                                      value={formatIndianNumber(
                                        row?.percentage || 0
                                      )}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(
                                          /,/g,
                                          ''
                                        )
                                        const numValue = parseFloat(rawValue)
                                        if (!isNaN(numValue)) {
                                          handleChange1(
                                            row.id,
                                            'percentage',
                                            numValue
                                          )
                                        } else {
                                          handleChange1(row.id, 'percentage', 0)
                                        }
                                      }}
                                      className="w-full p-1 border text-right border-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <span className="mt-1">
                                      {row?.units?.value === 'percentage'
                                        ? '%'
                                        : '₹'}
                                    </span>
                                  </section>
                                </td>{' '}
                                <td className="border-b border-[#e0e0e0] mr-2 pr-4">
                                  <section className="flex flex-row">
                                    <input
                                      type="text"
                                      value={formatIndianNumber(
                                        row?.zeroDay || 0
                                      )}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(
                                          /,/g,
                                          ''
                                        )
                                        const numValue = parseFloat(rawValue)
                                        if (!isNaN(numValue)) {
                                          handleChange1(
                                            row.id,
                                            'zeroDay',
                                            numValue
                                          )
                                        } else {
                                          handleChange1(row.id, 'zeroDay', 0)
                                        }
                                      }}
                                      className="w-full p-1 border text-right border-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <span className="mt-1">Days</span>
                                  </section>
                                </td>
                                <td className="border-b border-[#e0e0e0]">
                                  <input
                                    type="text"
                                    value={row?.description}
                                    onChange={(e) =>
                                      // handleChange(row.id, 'unit', e.target.value)
                                      handleChange1(
                                        row.id,
                                        'description',
                                        e.target.value
                                      )
                                    }
                                    className="w-full p-1 border  border-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                  />
                                </td>
                                <td className="border-b border-[#e0e0e0] text-center">
                                  <button
                                    onClick={() => handleDelete(row.id)}
                                    className="text-gray-500 hover:text-red-700"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </table>
            </DragDropContext>
          </div>
          <div className="flex justify-between">
            <button
              onClick={addRow}
              className="mt-4 bg-[#57C0D0]  text-white font-md py-1 px-2 rounded focus:outline-none focus:shadow-outline transition-colors duration-150 ease-in-out"
            >
              Add Schedule
            </button>
            <button
              onClick={saveSetup}
              className="mt-4 bg-[#57C0D0] text-white font-md py-1 px-2 rounded focus:outline-none focus:shadow-outline transition-colors duration-150 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditablePaymentTable
