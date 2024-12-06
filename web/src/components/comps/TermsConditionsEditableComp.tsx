import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Select as SelectMAT } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

import {
  csSections,
  VillaCsSections,
} from 'src/constants/projects'
import {
  addCostSheetMaster,
  addPhaseFullCs,
  addMastersFull,
  streamMasters,
  upsertMasterOption,
  deleteMasterOption,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

// import WarnPopUpNew from '../SiderForm/WarnPopUp'


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

const TermsConditionsEditableTable = ({
  phase,
  partAData,
  fullCs,
  source,
  type,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [csCategoryOptionsA, setCsCategoryOptionsA] = useState([])
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
  const [constructionPerSqft, setConstructionPerSqft] = useState(1200)
  const [gst, setGST] = useState(12)
  const [constGst, setConstGST] = useState(12)
  const [open, setOpen] = useState(false)
  const [saveWarn, setSaveWarn] = useState(false)
  const [selcDelRow, SetSelDelRow] = useState({})

  useEffect(() => {
    if (phase?.projectType?.name === 'Villas') {
      setCsCategoryOptionsA(VillaCsSections)
    } else {
      setCsCategoryOptionsA(csSections)
    }
  }, [phase])
  const categories = ['Food', 'Drink', 'Electronics', 'Clothing']

  const handleChange1 = (id, data, value) => {
    console.log('latest check', id, data, value)
    // step 6 : check title update only that value
    if (data?.title === 'Receipt') {
      const updatedArr = receiptA.map((item) =>
        item.id === data.id
          ? {
              ...item,
              label: value,
              value: value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g)
                .replace(/%/g, ''),
            }
          : item
      )
      setReceiptA(updatedArr)
    }   if (data?.title === 'Cost Sheet Estimation') {
      const updatedArr = costSheetEstimationA.map((item) =>
        item.id === data.id
          ? {
              ...item,
              label: value,
              value: value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g)
                .replace(/%/g, ''),
            }
          : item
      )
      setCostSheetEstimationA(updatedArr)
    }
     if (data?.title === 'Unit Summary') {
      const updatedArr = unitSummaryA.map((item) =>
        item.id === data.id
          ? {
              ...item,
              label: value,
              value: value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g)
                .replace(/%/g, ''),
            }
          : item
      )
      setUnitSummaryA(updatedArr)
    }

    // setRows(
    //   rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    // )
  }

  const saveSetup = () => {
    setSaveWarn(true)
  }
  const handleCostSheetSave = () => {
    console.log('setUpData is ', rows, source)
    const data = { fullCs: rows, type: type }
    const { projectId, uid } = phase || {}
    if (source === 'project') {
      const myId = selcDelRow?.id
      if (myId) setRows(rows.filter((item) => item.id !== myId))
      const newSet = rows.filter((item) => item.id !== myId)
      addPhaseFullCs(orgId, uid, newSet, 'partATaxObj', enqueueSnackbar)
    } else {
      addCostSheetMaster(orgId, `${type}_cs`, data, enqueueSnackbar)
    }
  }

  const projectItems = [
    'Receipt',
    'Cost Sheet Estimation',
    'Unit Summary',
  ]

  const crmItems = ['Lead Source', 'Booking By']



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id.replace(/-/g, ' '))
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0.1,
      }
    )

    Object.values(contentRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(contentRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const SidebarItem: React.FC<{ item: string }> = ({ item }) => (
    <li
      className={`border-l-2 ${
        activeItem === item
          ? 'border-[#0EA5E9]'
          : 'border-gray-80 hover:border-gray-400'
      }`}
    >
      <a
        href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
        className={`block px-4 py-2 text-md ${
          activeItem === item
            ? 'text-[#0EA5E9] font-bold'
            : 'text-gray-600 font-bold hover:text-[#0EA5E9]'
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleClick(item)
        }}
      >
        {item}
      </a>
    </li>
  )

  const [activeItem, setActiveItem] = useState(null)
  const contentRefs = useRef({})
  const [dynamicRows, setDynamicRows] = useState({})
  const [editingCell, setEditingCell] = useState(null)
  const [cellValues, setCellValues] = useState({})
  const [currentSection, setCurrentSection] = useState(null)
  const [taxA, setTaxA] = useState([])
  const [deletedRows, setDeletedRows] = useState([])
  // step 1: declare useState for each title
  const [receiptA, setReceiptA] = useState([])
  const [costSheetEstimationA,  setCostSheetEstimationA] = useState([])
  const [unitSummaryA, setUnitSummaryA] = useState([])
  const [approvalAuthorityA, setapprovalAuthority] = useState([])
  const [statesListA, setstatesList] = useState([])
  const [dataMapCopy, setDataMapCopy] = useState([])
  useEffect(() => {
    const unsubscribe = streamMasters(
      orgId,
      (querySnapshot) => {
        const bankA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          return x
        })

        console.log('fetched users list is', bankA)
        // step 3: filter and set values to each title
        if (bankA?.length > 0) {
          const cA = bankA.filter((item) => item.title == 'Receipt')
          const dA = bankA.filter((item) => item.title == 'Cost Sheet Estimation')
          const eA = bankA.filter((item) => item.title == 'Unit Summary')
          setReceiptA(
            cA.sort((a, b) => {
              return a.order - b.order
            })
          )
          setCostSheetEstimationA(
            dA.sort((a, b) => {
              return a.order - b.order
            })
          )
          setUnitSummaryA(
            eA.sort((a, b) => {
              return a.order - b.order
            })
          )
        }
      },
      (error) => setRows([])
    )

    return unsubscribe
  }, [])

  const appendRow = (key) => {
    setDynamicRows((prevRows) => ({
      ...prevRows,
      [key]: [...(prevRows[key] || []), ''],
    }))
    setCellValues((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), ''],
    }))
  }
  useEffect(() => {
    console.log('receiptA', receiptA)
    // setReceiptA(gstValesA)
    // setCostSheetEstimationA(costSheetEstimationA)
    // setUnitSummaryA(unitSummaryA)
    setDataMapCopy(dataMapCopy1)
  }, [])
  useEffect(() => {
    console.log('receiptA', receiptA)
    setDataMapCopy(dataMapCopy1)
    // step 2: add each title useState value
  }, [receiptA, costSheetEstimationA, unitSummaryA])
  const addRowNew = (dataObj) => {
    const title = dataObj?.title
    const order = dataObj?.data?.length || 0
    const newValue = ''
    const uid = uuidv4()

    const newRow = {
      id: uid,
      title: title,
      myId: '2c7bcd74-d334-471e-9138-5de5c96ee484',
      value: newValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/%/g, ''),
      label: newValue,
      order: order + 1,
    }
    // step 5: add new row to each title useState value
    if (title === 'Receipt') {
      setReceiptA([...receiptA, newRow])
    }
    console.log('receiptA', receiptA)
    if (title === 'Unit Summary') {
      setUnitSummaryA([...unitSummaryA, newRow])
    }
    if (title === 'Cost Sheet Estimation') {
      setCostSheetEstimationA([...costSheetEstimationA, newRow])
    }
    // setDataMapCopy(dataMapCopy1)
    console.log('receiptA', newRow)
  }
  // step 4: Assign useState value w.r.t to each title
  const dataMapCopy1 = [
    {
      title: 'Receipt',
      data: receiptA, // use state value here
      // data: [] ,
      desccription: 'Terms & Conditions to display on Payment Receipt',
    },

    { title: 'Cost Sheet Estimation', data: costSheetEstimationA,       desccription: 'Terms & Conditions to display on Estimated Cost Sheet',
    },
    { title: 'Unit Summary', data: unitSummaryA,       desccription: 'Terms & Conditions to display on Unit Summary Sheet',
    },

  ]
  const handleCellEdit = (key, rowIndex, column) => {
    setEditingCell({ key, rowIndex, column })
  }

  const handleCellChange = (e, key, rowIndex) => {
    console.log('handleCellChange', e, key, rowIndex)
    const newValue = e.target.value
    // setCellValues((prev) => ({
    //   ...prev,
    //   [key]: prev[key].map((value, i) => (i === rowIndex ? newValue : value)),
    // }))
  }

  const handleCellBlur = () => {
    setEditingCell(null)
  }

  const handleDeleteRow = (dataObj) => {
    // step : 7
    const title = dataObj?.title
    // const data = dataObj?.data?.find((item) => item.id === selcDelRow?.id)
    // console.log('data is', data)

    setDeletedRows([...deletedRows, dataObj])
    console.log('deletedRows', deletedRows)
    if (title === 'Receipt') {
      const updatedArr = receiptA.filter((item) => item.id != dataObj.id)
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i }
      })
      setReceiptA(setOrder)
    }
  }

  const handleClick = (item: string) => {
    setActiveItem(item)
    if (contentRefs.current[item]) {
      contentRefs.current[item].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setCurrentSection(item)
    }
  }

  const handleSave = (dataObj) => {
    console.log('sectionKey', dataObj)
    const title = dataObj?.title
    const newDataIs = []
    if (deletedRows.length > 0) {
      deletedRows.map((item) => {
        deleteMasterOption(orgId, item.id, user.email, enqueueSnackbar)
      })
      setDeletedRows([])
    }
    if (title === 'Receipt') {
      // setReceiptA([...receiptA, newRow])
      newDataIs.push(...receiptA)
    } if (title === 'Cost Sheet Estimation') {
      // setReceiptA([...receiptA, newRow])
      newDataIs.push(...costSheetEstimationA)
    } if (title === 'Unit Summary') {
      // setReceiptA([...receiptA, newRow])
      newDataIs.push(...unitSummaryA)
    }

    newDataIs.map((item) => {
      upsertMasterOption(orgId, item.id, item, enqueueSnackbar)
    })
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
      section: {
        value: 'additionalCost',
        label: 'Additional Charges',
      },
      component: {
        value: 'carparking',
        label: 'Car Parking',
      },
      gst: {
        value: '5',
        label: '5%',
      },
      units: {
        label: 'Fixed cost',
        value: 'fixedcost',
      },
      description: 'Car parking',
      charges: '200000',
      tableData: {
        id: 0,
      },
    },
    {
      id: '1',
      section: {
        value: 'additionalCost',
        label: 'Additional Charges',
      },
      gst: {
        label: '18%',
        value: '18',
      },
      component: {
        label: 'Club House Charges',
        value: 'clubhouse_charges',
      },
      description: 'club house charges',
      charges: '250',
      units: {
        value: 'costpersqft',
        label: 'Cost Per sqft',
      },
      myId: 'e95e001a-a2d3-4df9-b4a9-7339ef634d9d',
      tableData: {
        id: 1,
      },
    },
  ])
  const defaultValue = (options, value) => {
    console.log('vale is', value)
    return (
      (options
        ? options.find((option) => option.value === value?.value)
        : '') || ''
    )
  }
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
      fontSize: '13px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      position: 'absolute',
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  }
  const handleCostChange = (e) => {
    const inputValue = e.target.value

    const rawValue = e.target.value.replace(/,/g, '')
    const numValue = parseFloat(rawValue)
    if (!isNaN(numValue)) {
      setRows(
        rows.map((row) =>
          row.component.value === 'sqft_cost_tax'
            ? { ...row, ['charges']: numValue }
            : row
        )
      )
      setCostPerSqft(numValue)
    } else {
      setRows(
        rows.map((row) =>
          row.component.value === 'sqft_cost_tax'
            ? { ...row, ['charges']: 0 }
            : row
        )
      )
      setCostPerSqft(0)
    }
  }
  const handleConstructCostChange = (e) => {
    const inputValue = e.target.value
    setRows(
      rows.map((row) =>
        row.component.value === 'sqft_construct_cost_tax'
          ? { ...row, ['charges']: inputValue }
          : row
      )
    )
    setConstructionPerSqft(e.target.value)
  }
  const handleCostGSTChange = (e) => {
    const inputValue = e.target.value
    setRows(
      rows.map((row) =>
        row.component.value === 'sqft_cost_tax'
          ? { ...row, ['gst']: { value: inputValue, label: `${inputValue}%` } }
          : row
      )
    )
    setGST(e.target.value)
  }
  const handleConstCostGSTChange = (e) => {
    const inputValue = e.target.value
    setRows(
      rows.map((row) =>
        row.component.value === 'sqft_construct_cost_tax'
          ? { ...row, ['gst']: { value: inputValue, label: `${inputValue}%` } }
          : row
      )
    )
    setConstGST(e.target.value)
  }
  const createDBFun = () => {
    // get all the data dataObj
    // insert data to firebase db
    dataMapCopy?.map((dataObj, key) => {
      // console.log('dataObj', dataObj)
      const data = dataObj?.data?.map((data1, i) => {
        const data2 = {
          title: dataObj?.title,
          label: data1.label,
          value: data1.value,
          id: uuidv4(),
        }
        console.log('data2', data2)
        return data2
      })
    })
  }
  const createDBFun2 = () => {
    // get all the data dataObj
    // insert data to firebase db
    dataMapCopy?.map((dataObj) => {
      // console.log('dataObj', dataObj)
      const data = dataObj?.data?.map((data1, i) => {
        const uId = uuidv4()
        const data2 = {
          title: dataObj?.title,
          label: data1.label,
          value: data1.value,
          id: uId,
          order: i,
        }
        console.log('data2 ==>', data2)
        addMastersFull(orgId, uId, data2, enqueueSnackbar)
        return data2
      })
    })
  }
  return (
    <>
      <div className=" m-2 p-4 bg-white rounded-xl">
        <div className="mb-4 ">
          <div className="inline">
            <div className="">
              <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                Terms & Conditions<abbr title="required"></abbr>
              </label>
            </div>

            <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
          </div>
        </div>

        <div className="flex h-screen">
          <div className="w-64 text-gray-900 bg-white p-4 overflow-auto">
            <div className="mb-6">

              <ul>
                {projectItems.map((item) => (
                  <SidebarItem key={item} item={item} />
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto mx-2 bg-white text-gray-300">
            <div className="bg-white text-white p-6">
              {/* {Object.keys(dataMap).map((key) => ( */}
              {dataMapCopy?.map((dataObj, key) => (
                <div
                  key={key}
                  className="mb-24"
                  ref={(el) => (contentRefs.current[key] = el)}
                  // id={key.replace(/\s+/g, '-').toLowerCase()}
                >
                  <h1 className="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                    {dataObj?.title}
                  </h1>
                  <p className="mt-2 text-[18px] font-medium text-slate-700">
                    {dataObj?.desccription}
                  </p>
                  <div className="bg-[#FFFFFF]  mt-10 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            s.no
                          </th>
                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            Text
                          </th>

                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {dataObj?.data?.map((data, i) => (
                          <tr key={`static-${i}`}>

                            <td className="py-5 px-4 text-[#0EA5E9] text-md border-b">{i+1}</td>
                            <td className="py-5 px-4 border-b text-md text-[#728195] italic">
                              {/* {editingCell?.key === dataObj.title &&
                              editingCell.rowIndex === i &&
                              editingCell.column === 'Options' ? (
                                <input
                                  type="text"
                                  className="border-none w-full"
                                  value={
                                    cellValues[dataObj.title] || data.label
                                  }
                                  onChange={(e) =>
                                    handleCellChange(e, data?.title, i)
                                  }
                                  onBlur={handleCellBlur}
                                  autoFocus
                                />
                              ) : (
                                <span
                                  onClick={() =>
                                    handleCellEdit(dataObj.title, i, 'Options')
                                  }
                                >
                                  {data.label}
                                </span>
                              )} */}
                              <input
                                type="text"
                                value={data.label}
                                onChange={(e) => {
                                  // handleChange(row.id, 'unit', e.target.value)
                                  const rawValue = e.target.value
                                  // dataObj?.title

                                  // const numValue = parseFloat(rawValue)
                                  handleChange1(dataObj?.title, data, rawValue)
                                  // if (!isNaN(numValue)) {
                                  //   handleChange1(
                                  //     row.id,
                                  //     'charges',
                                  //     numValue
                                  //   )
                                  // } else {
                                  //   handleChange1(row.id, 'charges', 0)
                                  // }
                                }}
                                className="w-full p-1 border text-left border-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                            </td>


                            <td className="py-5 px-4 text-md items-center align-middle border-b text-[#6b7280]">
                              <button
                                onClick={() => handleDeleteRow(data, i)}
                                className="flex items-center text-[#728195]"
                                aria-label="Delete"
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
                        ))}
                        {(dynamicRows[dataObj['title']] || []).map((row, i) => (
                          <tr key={`dynamic-${i}`}>
                            <td className="py-5 px-4 text-md text-[#0EA5E9]"></td>
                            <td className="py-5 px-4 border-b text-md text-[#728195] italic">
                              <input
                                type="text"
                                className="border-none w-full"
                                value={cellValues[dataObj?.title]?.[i] || row}
                                onChange={(e) => handleCellChange(e, key, i)}
                                autoFocus
                              />
                            </td>
                            <td className="py-5 px-4 text-md border-b text-[#4F46E5]">
                              NA
                            </td>
                            <td className="py-5 px-4 text-md border-b text-[#6b7280]">
                              <button
                                onClick={() => handleDeleteRow(dataObj, i)}
                                className="flex items-center text-[#728195]"
                                aria-label="Delete"
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
                        ))}
                      </tbody>
                    </table>

                    <div className="flex  justify-between">
                      <button
                        // onClick={() => appendRow(dataObj?.title)}
                        onClick={() => addRowNew(dataObj)}
                        className=" mt-4 px-2 py- bg-cyan-500 text-white rounded"
                      >
                        Add Row
                      </button>

                      <button
                        onClick={() => handleSave(dataObj)}
                        className="mt-4 px-2 py- bg-cyan-500 text-white text-sm  rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="">
          <div className="mb-4 mt-2">
            <div className="inline">
              <div className="" onClick={() => createDBFun2()}>
                <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                  Initial Setup <abbr title="required"></abbr>
                </label>
              </div>

            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default TermsConditionsEditableTable
