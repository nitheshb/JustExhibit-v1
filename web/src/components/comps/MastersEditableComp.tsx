import React, { useState, useEffect } from 'react'
import { useRef } from 'react'

import { Dialog } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Select as SelectMAT, MenuItem } from '@material-ui/core'
import { Rowing, Widgets } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid'
import { de } from 'date-fns/locale'
import { useSnackbar } from 'notistack'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'


//Step- 0
import {
  approvalAuthority,
  bathTypeList,
  bedRoomsList,
  carParkingList,
  costSheetAdditionalChargesA,
  csSections,
  facingTypeList,
  gstValesA,
  mortgageType,
  paymentScheduleA,
  sourceListItems,
  statesList,
  statusList,
  unitsCancellation,
  unitTypeList,
  VillaCsSections,
} from 'src/constants/projects'
import {
  addCostSheetMaster,
  addPhasePartAtax,
  addPhaseFullCs,
  steamBankDetailsList,
  streamProjectCSMaster,
  addMastersFull,
  streamMasters,
  upsertMasterOption,
  deleteMasterOption,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { formatIndianNumber } from 'src/util/formatIndianNumberTextBox'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'

import { gstValesPartA } from '../../../../../RedefineV2/web/src/constants/projects'
// import WarnPopUpNew from '../SiderForm/WarnPopUp'

import WarningModel from './warnPopUp'
import WarnPopUp from './warnPopUp'

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

const MastersEditableTable = ({ phase, partAData, fullCs, source, type }) => {
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


  // useEffect(() => {
  //   if (phase?.projectType?.name === 'Villas') {
  //     setCsCategoryOptionsA(VillaCsSections)
  //   } else {
  //     setCsCategoryOptionsA(csSections)
  //   }
  // }, [phase])
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

  const WarnDeletion = (id) => {
    setOpen(true)
    SetSelDelRow(id)
  }
  const yesDelete = () => {
    setOpen(false)
    saveSetup()
  }
  const handleDelete = async () => {
    console.log('delete operatin is', selcDelRow)
    const id = selcDelRow?.id
    await setRows(rows.filter((item) => item.id !== id))

    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[id]
      return newErrors
    })
    await handleCostSheetSave()
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

  const handleChange1 = (id, data, value) => {
    console.log('latest check', id, data, value)
    // step 6 : check title update only that value
    if(data?.title === 'Tax Rate'){
      const updatedArr = taxA.map(item =>
        item.id === data.id ? {...item, label: value, value: value.toLowerCase().replace("%", "")} : item
      );
      setTaxA(updatedArr)
    }

    if (data?.title === 'Planning Authority') {
      const updatedArr = approvalAuthorityA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setapprovalAuthority(updatedArr);
    }

    if (data?.title === 'State') {
      const updatedArr = statesListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setstatesList(updatedArr);
    }

    if (data?.title === 'Charges For') {
      const updatedArr = costSheetAdditionalChargesA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setCostSheetAdditionalCharges(updatedArr);
    }

    if (data?.title === 'Category') {
      const updatedArr = csSectionsA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setCsSections(updatedArr);
    }

    if (data?.title === 'Cost Type') {
      const updatedArr = unitsCancellationA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setUnitsCancellation(updatedArr);
    }

    if (data?.title === 'Payment Stage') {
      const updatedArr = paymentScheduleA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setPaymentSchedule(updatedArr);
    }

    if (data?.title === 'Type') {
      const updatedArr = unitTypeListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setUnitTypeList(updatedArr);
    }

    if (data?.title === 'Facing') {
      const updatedArr = facingTypeListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setFacingTypeList(updatedArr);
    }

    if (data?.title === 'Type/BedRooms') {
      const updatedArr = bedRoomsListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setBedRoomsList(updatedArr);
    }

    if (data?.title === 'Bathrooms') {
      const updatedArr = bathTypeListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setBathTypeList(updatedArr);
    }

    if (data?.title === 'Car Parking') {
      const updatedArr = carParkingListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setCarParkingList(updatedArr);
    }

    if (data?.title === 'Status') {
      const updatedArr = statusListA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setStatusList(updatedArr);
    }

    if (data?.title === 'Mortgage Type') {
      const updatedArr = mortgageTypeA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setMortgageType(updatedArr);
    }

    if (data?.title === 'Lead Source') {
      const updatedArr = sourceListItemsA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setSourceListItems(updatedArr);
    }

    if (data?.title === 'Booking By') {
      const updatedArr = bookingByA.map(item =>
        item.id === data.id ? {
          ...item,
          label: value,
          value: value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", "")
        } : item
      );
      setBookingBy(updatedArr);
    }








    // setRows(
    //   rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    // )
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
      id: uid,
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
        id: rows.length + 1,
      },
    }
    setRows([...rows, newRow])
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


  //Step-0
  const projectItems = [
    'Planning Authority',
    'State',
    'Charges For',
    'Category',
    'Cost Type',
    'Tax Rate',
    'Payment Stage',
    'Type',
    'Facing',
    'Type/BedRooms',
    'Bathrooms',
    'Car Parking',
    'Status',
    'Mortgage Type',
    'Villa Type Category',
  ]

  const crmItems = ['Lead Source', 'Booking By']

  const dataMap: { [key: string]: { label: string }[] } = {
    'Planning Authority': approvalAuthority,
    State: statesList,
    'Charges For': costSheetAdditionalChargesA,
    Category: csSections,
    'Cost Type': unitsCancellation,
    'Tax Rate': gstValesA,
    'Payment Stage': paymentScheduleA,
    Type: unitTypeList,
    Facing: facingTypeList,
    'Type/BedRooms': bedRoomsList,
    Bathrooms: bathTypeList,
    'Car Parking': carParkingList,
    Status: statusList,
    'Mortgage Type': mortgageType,
    'Lead Source': sourceListItems,
    'Villa Type Category': VillaCsSectionsA,
    'Booking By': [],
  }

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
  const [approvalAuthorityA, setapprovalAuthority] = useState([])
  const [statesListA, setstatesList] = useState([])
const [costSheetAdditionalChargesA, setCostSheetAdditionalCharges] = useState([]);
const [csSectionsA, setCsSections] = useState([]);
const [unitsCancellationA, setUnitsCancellation] = useState([]);
const [paymentScheduleA, setPaymentSchedule] = useState([]);

const [unitTypeListA, setUnitTypeList] = useState([]);
const [facingTypeListA, setFacingTypeList] = useState([]);
const [bedRoomsListA, setBedRoomsList] = useState([]);
const [bathTypeListA, setBathTypeList] = useState([]);
const [carParkingListA, setCarParkingList] = useState([]);
const [statusListA, setStatusList] = useState([]);
const [mortgageTypeA, setMortgageType] = useState([]);
const [sourceListItemsA, setSourceListItems] = useState([]);
const [bookingByA, setBookingBy] = useState([]);
const [VillaCsSectionsA, setVillaCsSections] = useState([]);





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
        const cA = bankA.filter((item) => item.title == 'Tax Rate')
        const dA = bankA.filter((item) => item.title == 'State')
        const eA = bankA.filter((item) => item.title == 'Planning Authority')
        const fA = bankA.filter((item) => item.title === 'Charges For')
        const gA = bankA.filter((item) => item.title === 'Category')
        const hA = bankA.filter((item) => item.title === 'Cost Type')
        const iA = bankA.filter((item) => item.title === 'Payment Stage')
        const jA = bankA.filter((item) => item.title === 'Type')
        const kA = bankA.filter((item) => item.title === 'Facing')
        const lA = bankA.filter((item) => item.title === 'Type/BedRooms')
        const mA = bankA.filter((item) => item.title === 'Bathrooms')
        const nA = bankA.filter((item) => item.title === 'Car Parking')
        const oA = bankA.filter((item) => item.title === 'Status')
        const pA = bankA.filter((item) => item.title === 'Mortgage Type')
        const qA = bankA.filter((item) => item.title === 'Lead Source')
        const rA = bankA.filter((item) => item.title === 'Booking By')
        const sA = bankA.filter((item) => item.title === 'Villa Type Category');






        setTaxA(cA.sort((a, b) => {
          return a.order - b.order
        }))
        setstatesList(dA.sort((a, b) => {
          return a.order - b.order
        }))
        setapprovalAuthority(eA.sort((a, b) => {
          return a.order - b.order
        }))

        setCostSheetAdditionalCharges(fA.sort((a, b) => {
          return a.order - b.order;
        }));

        setCsSections(gA.sort((a, b) => {
          return a.order - b.order;
        }));

        setUnitsCancellation(hA.sort((a, b) => {
          return a.order - b.order;
        }));

        setPaymentSchedule(iA.sort((a, b) => {
          return a.order - b.order;
        }));

        setUnitTypeList(jA.sort((a, b) => {
          return a.order - b.order;
        }));

        setFacingTypeList(kA.sort((a, b) => {
          return a.order - b.order;
        }));

        setBedRoomsList(lA.sort((a, b) => {
          return a.order - b.order;
        }));

        setBathTypeList(mA.sort((a, b) => {
          return a.order - b.order;
        }));

        setCarParkingList(nA.sort((a, b) => {
          return a.order - b.order;
        }));

        setStatusList(oA.sort((a, b) => {
          return a.order - b.order;
        }));

        setMortgageType(pA.sort((a, b) => {
          return a.order - b.order;
        }));

        setSourceListItems(qA.sort((a, b) => {
          return a.order - b.order;
        }));

        setBookingBy(rA.sort((a, b) => {
          return a.order - b.order;
        }));

        setVillaCsSections(sA.sort((a, b) =>{
          return a.order - b.order;

        }));







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
    console.log('taxA', taxA)
    // setTaxA(gstValesA)
    // setstatesList(statesList)
    // setapprovalAuthority(approvalAuthority)
    setDataMapCopy(dataMapCopy1)
  }, [])
  useEffect(() => {
    console.log('taxA', taxA)

    setDataMapCopy(dataMapCopy1)
    // step 2: add each title useState value
  }, [taxA, statesListA, approvalAuthorityA,
    costSheetAdditionalChargesA,
    csSectionsA,
    unitsCancellationA,
    paymentScheduleA,
    unitTypeListA,
    facingTypeListA,
    bedRoomsListA,
    bathTypeListA,
    carParkingListA,
    statusListA,
    mortgageTypeA,
    sourceListItemsA,
    bookingByA,VillaCsSectionsA])
  const addRowNew = (dataObj) => {
    const title = dataObj?.title
    const order = dataObj?.data?.length || 0
    const newValue = ''
    const uid = uuidv4()

    const newRow = {
      id: uid,
      title: title,
      myId: '2c7bcd74-d334-471e-9138-5de5c96ee484',
      value: newValue.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace("%", ""),
      label: newValue,
      order: order + 1
    }
    // step 5: add new row to each title useState value
if(title === 'Tax Rate'){
  setTaxA([...taxA, newRow])
}
console.log('taxA', taxA)
if(title === 'Planning Authority'){
  setapprovalAuthority([...approvalAuthority, newRow])
}
if(title === 'State'){
  setstatesList([...statesList, newRow])
}


if (title === 'Charges For') {
  setCostSheetAdditionalCharges([...costSheetAdditionalChargesA, newRow]);
}

if (title === 'Category') {
  setCsSections([...csSectionsA, newRow]);
}

if (title === 'Cost Type') {
  setUnitsCancellation([...unitsCancellationA, newRow]);
}

if (title === 'Payment Stage') {
  setPaymentSchedule([...paymentScheduleA, newRow]);
}

if (title === 'Type') {
  setUnitTypeList([...unitTypeListA, newRow]);
}

if (title === 'Facing') {
  setFacingTypeList([...facingTypeListA, newRow]);
}

if (title === 'Type/BedRooms') {
  setBedRoomsList([...bedRoomsListA, newRow]);
}

if (title === 'Bathrooms') {
  setBathTypeList([...bathTypeListA, newRow]);
}

if (title === 'Car Parking') {
  setCarParkingList([...carParkingListA, newRow]);
}

if (title === 'Status') {
  setStatusList([...statusListA, newRow]);
}

if (title === 'Mortgage Type') {
  setMortgageType([...mortgageTypeA, newRow]);
}

if (title === 'Lead Source') {
  setSourceListItems([...sourceListItemsA, newRow]);
}

if (title === 'Booking By') {
  setBookingBy([...bookingByA, newRow]);
}

if (title === 'Villa Type Category') {
  setVillaCsSections([...VillaCsSectionsA, newRow]);
}







    // setDataMapCopy(dataMapCopy1)
    console.log('taxA', newRow)
    console.log('mortgageTypeA', newRow)
  }
  // step 4: Assign useState value w.r.t to each title
  const dataMapCopy1 = [
    {
      title: 'Tax Rate',
      data: taxA, // use state value here
      // data: [] ,
      desccription: 'Applicable GST tax rates list on cost values',
    },
    {
      title: 'Planning Authority',
      data: approvalAuthorityA,
      desccription: 'NA',
    },
    { title: 'State', data: statesListA, desccription: 'NA' },
    {
      title: 'Charges For',
      data: costSheetAdditionalChargesA,
      desccription: 'NA',
    },
    { title: 'Category', data: csSectionsA, desccription: 'NA' },
    { title: 'Cost Type', data: unitsCancellationA, desccription: 'NA' },
    { title: 'Payment Stage', data: paymentScheduleA, desccription: 'NA' },
    { title: 'Type', data: unitTypeListA, desccription: 'NA' },
    { title: 'Facing', data: facingTypeListA, desccription: 'NA' },
    { title: 'Type/BedRooms', data: bedRoomsListA, desccription: 'NA' },
    { title: 'Bathrooms', data: bathTypeListA, desccription: 'NA' },
    { title: 'Car Parking', data: carParkingListA, desccription: 'NA' },
    { title: 'Status', data: statusListA, desccription: 'NA' },
    { title: 'Mortgage Type', data: mortgageTypeA, desccription: 'NA' },
    { title: 'Lead Source', data: sourceListItemsA, desccription: 'NA' },
    { title: 'Villa Type Category', data: VillaCsSectionsA, desccription: 'NA' },
    { title: 'Booking By', data: [] },
  ]


  const InitialSetup = [
    {
      title: 'Tax Rate',
      data: gstValesA,
      description: 'Applicable GST tax rates list on cost values',
    },
    {
      title: 'Planning Authority',
      data: approvalAuthority,
      description: 'NA',
    },
    { title: 'State', data: statesList, description: 'NA' },
    {
      title: 'Charges For',
      data: costSheetAdditionalChargesA,
      description: 'NA',
    },
    {
      title: 'Category',
      data: csSections,
      description: 'NA'
    },
    { title: 'Cost Type', data: unitsCancellation, description: 'NA' },
    { title: 'Payment Stage', data: paymentScheduleA, description: 'NA' },
    { title: 'Type', data: unitTypeList, description: 'NA' },
    { title: 'Facing', data: facingTypeList, description: 'NA' },
    { title: 'Type/BedRooms', data: bedRoomsList, description: 'NA' },
    { title: 'Bathrooms', data: bathTypeList, description: 'NA' },
    { title: 'Car Parking', data: carParkingList, description: 'NA' },
    { title: 'Status', data: statusList, description: 'NA' },
    { title: 'Mortgage Type', data: mortgageType, description: 'NA' },
    { title: 'Lead Source', data: sourceListItems, description: 'NA' },
    { title: 'Villa Type Category', data: VillaCsSections, description: 'NA' },
    { title: 'Booking By', data: [] },
  ];





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
    if(title === 'Tax Rate'){

      const updatedArr = taxA.filter(item => item.id != dataObj.id)
      const setOrder = updatedArr.map((item, i) =>{
      return {...item, order: i}
      }
      );
      setTaxA(setOrder)
    }


    if (title === 'Planning Authority') {
      const updatedArr = approvalAuthorityA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setapprovalAuthority(setOrder);
    }

    if (title === 'State') {
      const updatedArr = statesListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setstatesList(setOrder);
    }

    if (title === 'Charges For') {
      const updatedArr = costSheetAdditionalChargesA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setCostSheetAdditionalCharges(setOrder);
    }

    if (title === 'Category') {
      const updatedArr = csSectionsA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setCsSections(setOrder);
    }

    if (title === 'Cost Type') {
      const updatedArr = unitsCancellationA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setUnitsCancellation(setOrder);
    }

    if (title === 'Payment Stage') {
      const updatedArr = paymentScheduleA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setPaymentSchedule(setOrder);
    }

    if (title === 'Type') {
      const updatedArr = unitTypeListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setUnitTypeList(setOrder);
    }

    if (title === 'Facing') {
      const updatedArr = facingTypeListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setFacingTypeList(setOrder);
    }

    if (title === 'Type/BedRooms') {
      const updatedArr = bedRoomsListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setBedRoomsList(setOrder);
    }

    if (title === 'Bathrooms') {
      const updatedArr = bathTypeListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setBathTypeList(setOrder);
    }

    if (title === 'Car Parking') {
      const updatedArr = carParkingListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setCarParkingList(setOrder);
    }

    if (title === 'Status') {
      const updatedArr = statusListA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setStatusList(setOrder);
    }

    if (title === 'Mortgage Type') {
      const updatedArr = mortgageTypeA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setMortgageType(setOrder);
    }

    if (title === 'Lead Source') {
      const updatedArr = sourceListItemsA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setSourceListItems(setOrder);
    }

    if (title === 'Booking By') {
      const updatedArr = bookingByA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => {
        return { ...item, order: i + 1 };
      });
      setBookingBy(setOrder);
    }


    if (title === 'Villa Type Category') {
      const updatedArr = VillaCsSectionsA.filter(item => item.id !== dataObj.id);
      const setOrder = updatedArr.map((item, i) => ({
        ...item,
        order: i + 1
      }));
      setVillaCsSections(setOrder);
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
    const newDataIs = [];
    if(deletedRows.length >0){
      deletedRows.map((item) => {
        deleteMasterOption(orgId, item.id, user.email, enqueueSnackbar)
      })
      setDeletedRows([])
    }
    if(title === 'Tax Rate'){
      // setTaxA([...taxA, newRow])
      newDataIs.push(...taxA)
    }

    //Step-8

    if (title === 'Planning Authority') {
      newDataIs.push(...approvalAuthorityA);
    }
    if (title === 'State') {
      newDataIs.push(...statesListA);
    }
    if (title === 'Charges For') {
      newDataIs.push(...costSheetAdditionalChargesA);
    }
    if (title === 'Category') {
      newDataIs.push(...csSectionsA);
    }
    if (title === 'Cost Type') {
      newDataIs.push(...unitsCancellationA);
    }
    if (title === 'Payment Stage') {
      newDataIs.push(...paymentScheduleA);
    }
    if (title === 'Type') {
      newDataIs.push(...unitTypeListA);
    }
    if (title === 'Facing') {
      newDataIs.push(...facingTypeListA);
    }
    if (title === 'Type/BedRooms') {
      newDataIs.push(...bedRoomsListA);
    }
    if (title === 'Bathrooms') {
      newDataIs.push(...bathTypeListA);
    }
    if (title === 'Car Parking') {
      newDataIs.push(...carParkingListA);
    }
    if (title === 'Status') {
      newDataIs.push(...statusListA);
    }
    if (title === 'Mortgage Type') {
      newDataIs.push(...mortgageTypeA);
    }
    if (title === 'Lead Source') {
      newDataIs.push(...sourceListItemsA);
    }
    if (title === 'Booking By') {
      newDataIs.push(...bookingByA);
    }


    newDataIs.map((item) => {
      upsertMasterOption(orgId, item.id, item,enqueueSnackbar)
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
    console.log('Clicked masters', dataMapCopy)

    InitialSetup?.map((dataObj) => {
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
                Data Masters<abbr title="required"></abbr>
              </label>
            </div>

            <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
          </div>
        </div>

        <div className="flex h-screen">
          <div className="w-64 text-gray-900 bg-white p-4 overflow-auto">
            <div className="mb-6">
              <div className="mb-4 ">
                <div className="inline">
                  <div className="">
                    <label className="  text-md   mb-8 lg:mb-3 font-bold text-slate-900">
                      Add Event<abbr title="required"></abbr>
                    </label>
                  </div>

                  <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
                </div>
              </div>
              <ul>
                {projectItems.map((item) => (
                  <SidebarItem key={item} item={item} />
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 ">
                <div className="inline">
                  <div className="">
                    <label className="font-bold text-[#053219]  text-md mb-1  ">
                      Stalls Module<abbr title="required"></abbr>
                    </label>
                  </div>

                  <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div>
                </div>
              </div>
              <ul>
                {crmItems.map((item) => (
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
                            Title
                          </th>
                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            Options
                          </th>
                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            Description
                          </th>
                          <th className="py-3 px-4 text-lg font-bold text-[#334155]">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {dataObj?.data?.map((data, i) => (
                          <tr key={`static-${i}`}>
                            {i === 0 ? (
                              <td className="py-5 px-4 font-bold text-[#0EA5E9] text-md">
                                {dataObj.title}
                              </td>
                            ) : (
                              <td className="py-5 px-4 text-[#0EA5E9] text-md"></td>
                            )}
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
                                  const rawValue = e.target.value;
                                  // dataObj?.title

                                  // const numValue = parseFloat(rawValue)
                                  handleChange1(
                                    dataObj?.title,
                                    data,
                                    rawValue
                                  )
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
                            <td className="py-5 px-4 text-md border-b text-[#4F46E5]">
                              NA
                            </td>

                            <td className="py-5 px-4 text-md border-b text-[#6b7280]">
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
                                onClick={() =>
                                  handleDeleteRow(dataObj, i)
                                }
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
        <div className="cursor-pointer" onClick={() => createDBFun2()}>
          <div className="mb-4 mt-2">
            <div className="inline">
              <div className="cursor-pointer" >
                <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                  Initial Masters setup <abbr title="required"></abbr>
                </label>
              </div>

              {/* <div className="border-t-4 rounded-xl w-16 mt-1 border-[#57C0D0]"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MastersEditableTable
