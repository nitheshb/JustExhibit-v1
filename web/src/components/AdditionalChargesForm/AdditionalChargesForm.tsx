import React, { useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Select as SelectMAT, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { Alert, AlertTitle } from '@mui/lab'
import { useSnackbar } from 'notistack'
import Select from 'react-select'

import EditableTable from 'src/components/A_ProjModule/Comps/EditableTable'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
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

  // paymentScheduleA
//   const columns = [
//     {
//       title: 'Charges For*',
//       field: 'component',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => {
//         return rowData?.component?.label
//       },
//       editComponent: ({ value, onChange, rowData }) => {
//         return (
//           // <select
//           //   value={defaultValue(
//           //     blocksViewFeature === 'Construction_Other_Charges'
//           //       ? csConstruAdditionalChargesA
//           //       : costSheetAdditionalChargesA,
//           //     value
//           //   )}
//           //   onChange={(value_x) => {
//           //     console.log('onchane ', value_x)
//           //     onChange(value_x)
//           //   }}
//           //   // onChange={(e) => handleEdit(row?.id, 'sex', e.target.value)}>
//           // >
//           //   {blocksViewFeature === 'Construction_Other_Charges'
//           //     ? csConstruAdditionalChargesA
//           //     : costSheetAdditionalChargesA.map((data, i) => (
//           //         <option key={i} value={data?.value}>
//           //           {data?.label}
//           //         </option>
//           //       ))}
//           // </select>
//           <SelectMAT
//             defaultValue={'Car Parking'}
//             // value={'Car Parking'}
//             onChange={(e) => {
//               const selectedOptionObject =
//                 blocksViewFeature === 'Construction_Other_Charges'
//                   ? csConstruAdditionalChargesA
//                   : costSheetAdditionalChargesA.find(
//                       (option) => option.value === e.target.value
//                     )
//               console.log(
//                 'value is ',
//                 selectedOptionObject,
//                 e.target,
//                 e.target.value,
//                 value,
//                 rowData
//               )

//               onChange(selectedOptionObject)
//             }}
//           >
//             {blocksViewFeature === 'Construction_Other_Charges'
//               ? csConstruAdditionalChargesA
//               : costSheetAdditionalChargesA.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//           </SelectMAT>




//           // <Select
//           //   name="component"
//           //   onChange={(value_x) => {
//           //     onChange(value_x)
//           //   }}
//           //   options={
//           //     blocksViewFeature === 'Construction_Other_Charges'
//           //       ? csConstruAdditionalChargesA
//           //       : costSheetAdditionalChargesA
//           //   }
//           //   value={defaultValue(
//           //     blocksViewFeature === 'Construction_Other_Charges'
//           //       ? csConstruAdditionalChargesA
//           //       : costSheetAdditionalChargesA,
//           //     value
//           //   )}
//           //   className="text-md mr-2"
//           //   styles={{
//           //     menu: (provided) => ({
//           //       ...provided,
//           //       zIndex: 9999, // Adjust the z-index value as needed
//           //     }),
//           //   }}
//           // />
//         )
//       },
//       // editComponent: ({ value, onChange }) => (
//       //   <input
//       //     placeholder="Charges For"
//       //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//       //     autoComplete="off"
//       //     onChange={(e) => onChange(e.target.value)}
//       //     value={value}
//       //   />
//       // ),
//     },


//     {
//       title: 'Units*',
//       field: 'units',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => rowData?.units?.label,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (

//           <Select
//             name="Chargesdropdown"
//             onChange={(value) => {
//               console.log('onchane ', value)
//               onChange(value)
//             }}
//             options={unitsCancellation}
//             value={defaultValue(unitsCancellation, value)}
//             className="text-md mr-2"
//             styles={{
//               menu: (provided) => ({
//                 ...provided,
//                 zIndex: 1,
//                 position: 'absolute', // Adjust the z-index value as needed
//               }),
//             }}
//           />


// //           <select
// //   name="Chargesdropdown"
// //   onChange={(event) => {
// //     const selectedValue = event.target.value;
// //     console.log('onchange ', selectedValue);
// //     onChange(selectedValue);
// //   }}
// //   value={value}
// //   className="text-md mr-2 relative z-50 bg-white text-black border-2 border-gray-400 rounded-md shadow-sm focus:ring-0  w-48 h-10"
// // >
// //   <option value="" disabled selected>Unite</option>
// //   {unitsCancellation.map((option) => (
// //     <option key={option.value} value={option.value} className="bg-white text-gray-700 hover:bg-red-200 w-32 h-10">
// //       {option.label}
// //     </option>
// //   ))}
// // </select> 








//         )
//       },
//     },


//     {
//       title: 'Charges*',
//       field: 'charges',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) =>
//         rowData?.units?.value === 'percentage'
//           ? `${rowData?.charges} %`
//           : `₹ ${rowData?.charges?.toLocaleString('en-IN')}`,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (
//           <input
//             placeholder="Charges"
//             className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//             autoComplete="off"
//             onChange={(e) =>
//               rowData?.units?.value === 'percentage'
//                 ? onChange(
//                     parseInt(e.target.value) > 100 ? 100 : e.target.value
//                   )
//                 : onChange(e.target.value)
//             }
//             value={value}
//             type="number"
//             max="100"
//           />
//         )
//       },
//     },
//     {
//       title: 'GST*',
//       field: 'gst',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => rowData?.gst?.label,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (


//           <select
//   name="Chargesdropdown"
//   onChange={(event) => {
//     const value_x = event.target.value;
//     onChange(value_x);
//   }}
//   value={value}
//   className="text-md mr-2 relative z-50 bg-white text-black border-2 border-gray-400 rounded-md shadow-sm focus:ring-0  w-48 h-10" // Tailwind classes for width and height
// >
//   {gstValesA.map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>


 


          
//         )
//       },
//     },
//     {
//       title: 'Description*',
//       field: 'description',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       editComponent: ({ value, onChange }) => (
//         <input
//           placeholder="Description"
//           className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//           autoComplete="off"
//           onChange={(e) => onChange(e.target.value)}
//           value={value}
//         />
//       ),
//     },
//   ]


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
    render: (rowData) => rowData?.component?.label,
    editComponent: ({ value, onChange }) => (
      
        <SelectMAT
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
          
        >

<MenuItem value="">
  
  </MenuItem>
          {blocksViewFeature === 'Construction_Other_Charges'
            ? csConstruAdditionalChargesA.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : costSheetAdditionalChargesA.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </SelectMAT>
      
    ),
  },
  {
    title: 'Units*',
    field: 'units',
    headerStyle: {
      padding: '0.25rem',
    },
    cellStyle: {
      padding: '0.25rem',
    },
    render: (rowData) => rowData?.units?.label,
    editComponent: ({ value, onChange }) => (
      <SelectMAT
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
      >
        {unitsCancellation.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMAT>
    ),
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
    editComponent: ({ value, onChange }) => (
      <SelectMAT
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
      >
        {gstValesA.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMAT>
    ),
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
];

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




          <SelectMAT
            labelId="component-label"
            id="component"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label="Charges For*"
            className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
          >
            {blocksViewFeature === 'Construction_Other_Charges' ? (
              csPartATax.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              csPartATax.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </SelectMAT>
      








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
          // <Select
          //   name="Chargesdropdown"
          //   onChange={(value_x) => {
          //     onChange(value_x)
          //   }}
          //   options={gstValesPartA}
          //   value={defaultValue(gstValesPartA, value)}
          //   className="text-md mr-2"
          // />







<SelectMAT
  labelId="gst-label"
  id="gst"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  label="GST*"
  className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
>


  {gstValesPartA.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</SelectMAT>



        )
      },
    },
  ]

  // partC columns
//   const partCcolumns = [
//     {
//       title: 'Charges For*',
//       field: 'component',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => {
//         return rowData?.component?.label
//       },
//       editComponent: ({ value, onChange, rowData }) => {
//         return (

//           // <Select
//           //   name="component"
//           //   onChange={(value_x) => {
//           //     onChange(value_x)
//           //   }}
//           //   options={
//           //     blocksViewFeature === 'Construction_Other_Charges'
//           //       ? csConstruAdditionalChargesA
//           //       : costSheetPartcChargesA
//           //   }
//           //   value={defaultValue(
//           //     blocksViewFeature === 'Construction_Other_Charges'
//           //       ? csConstruAdditionalChargesA
//           //       : costSheetPartcChargesA,
//           //     value
//           //   )}
//           //   className="text-md mr-2"
//           // />

        

// //           <select
// //   name="component"
// //   onChange={(event) => {
// //     const value_x = event.target.value;
// //     onChange(value_x);
// //   }}
// //   value={value}
// //   className="text-md mr-2 relative z-50 bg-white text-black border-2 border-gray-400 rounded-md shadow-sm focus:ring-0  w-54 h-10"
// // >
// //   {(blocksViewFeature === 'Construction_Other_Charges' ? csConstruAdditionalChargesA : costSheetPartcChargesA).map((option) => (
// //     <option key={option.value} value={option.value}>
// //       {option.label}
// //     </option>
// //   ))}
// // </select>

// <FormControl fullWidth>
// <InputLabel id="component-label">Charges For*</InputLabel>
// <SelectMAT
//   labelId="component-label"
//   id="component"
//   value={value}
//   onChange={(e) => onChange(e.target.value)}
//   label="Charges For*"
// >
//   {blocksViewFeature === 'Construction_Other_Charges' ? (
//     csConstruAdditionalChargesA.map((option) => (
//       <MenuItem key={option.value} value={option.value}>
//         {option.label}
//       </MenuItem>
//     ))
//   ) : (
//     costSheetPartcChargesA.map((option) => (
//       <MenuItem key={option.value} value={option.value}>
//         {option.label}
//       </MenuItem>
//     ))
//   )}
// </SelectMAT>
// </FormControl>



//         )
//       },
//       // editComponent: ({ value, onChange }) => (
//       //   <input
//       //     placeholder="Charges For"
//       //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//       //     autoComplete="off"
//       //     onChange={(e) => onChange(e.target.value)}
//       //     value={value}
//       //   />
//       // ),
//     },
//     {
//       title: 'Units*',
//       field: 'units',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => rowData?.units?.label,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (


//           // <Select
//           //   name="Chargesdropdown"
//           //   onChange={(value) => {
//           //     onChange(value)
//           //   }}
//           //   options={unitsCancellation}
//           //   value={defaultValue(unitsCancellation, value)}
//           //   className="text-md mr-2"
//           // />



//           <select
//   name="Chargesdropdown"
//   onChange={(event) => {
//     onChange(event.target.value);
//   }}
//   value={value}
//   className="text-md mr-2 relative z-50 bg-white text-black border-2 border-gray-400 rounded-md shadow-sm focus:ring-0  w-48 h-10"
// >
//   {unitsCancellation.map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>




//         )
//       },
//     },
//     {
//       title: 'Charges*',
//       field: 'charges',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) =>
//         rowData?.units?.value === 'percentage'
//           ? `${rowData.charges} %`
//           : `₹ ${rowData?.charges?.toLocaleString('en-IN')}`,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (
//           <input
//             placeholder="Charges"
//             className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//             autoComplete="off"
//             onChange={(e) =>
//               rowData?.units?.value === 'percentage'
//                 ? onChange(
//                     parseInt(e.target.value) > 100 ? 100 : e.target.value
//                   )
//                 : onChange(e.target.value)
//             }
//             value={value}
//             type="number"
//             max="100"
//           />
//         )
//       },
//     },
//     {
//       title: 'GST*',
//       field: 'gst',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       render: (rowData) => rowData?.gst?.label,
//       editComponent: ({ value, onChange, rowData }) => {
//         return (
//           // <Select
//           //   name="Chargesdropdown"
//           //   onChange={(value_x) => {
//           //     onChange(value_x)
//           //   }}
//           //   options={gstValesA}
//           //   value={defaultValue(gstValesA, value)}
//           //   className="text-md mr-2"
//           // />


// <select
//   name="Chargesdropdown"
//   onChange={(event) => {
//     const value_x = event.target.value;
//     onChange(value_x);
//   }}
//   value={value}
//   className="text-md mr-2 w-48 h-10 bg-white text-black border-2 border-gray-400 rounded-md shadow-sm focus:ring-0 " 
// >
//   {gstValesA.map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>


//         )
//       },
//     },
//     {
//       title: 'Description*',
//       field: 'description',
//       headerStyle: {
//         padding: '0.25rem',
//       },
//       cellStyle: {
//         padding: '0.25rem',
//       },
//       editComponent: ({ value, onChange }) => (
//         <input
//           placeholder="Description"
//           className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
//           autoComplete="off"
//           onChange={(e) => onChange(e.target.value)}
//           value={value}
//         />
//       ),
//     },
//   ]




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
    render: (rowData) => rowData?.component?.label,
    editComponent: ({ value, onChange }) => (
    
        <SelectMAT
          labelId="component-label"
          id="component"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Charges For*"
          className="border border-gray-400  bg-transparent rounded-md  focus:ring-0 w-full h-10"
        >
          {blocksViewFeature === 'Construction_Other_Charges'
            ? csConstruAdditionalChargesA.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : costSheetPartcChargesA.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </SelectMAT>
    ),
  },
  {
    title: 'Units*',
    field: 'units',
    headerStyle: {
      padding: '0.25rem',
    },
    cellStyle: {
      padding: '0.25rem',
    },
    render: (rowData) => rowData?.units?.label,
    editComponent: ({ value, onChange }) => (
      <SelectMAT
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
      >
        {unitsCancellation.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMAT>
    ),
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
    editComponent: ({ value, onChange }) => (
      <input
        placeholder="Charges"
        className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="number"
        max="100"
      />
    ),
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
    editComponent: ({ value, onChange }) => (
      <SelectMAT
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 bg-transparent  rounded-md  focus:ring-0 w-full h-10"
      >
        {gstValesA.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMAT>
    ),
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
];

  const errors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.component) {
      errorList.push("Try Again, You didn't enter the Charges For field")
    }
    if (!formData.units) {
      errorList.push("Try Again, You didn't enter the Units field")
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

  return (
    <section>
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
      <section className="ml-4 text-md font-[500]">Part-A</section>
      {/* <EditableTable /> */}
      <div className=" min border border-radius-4">
        <MaterialCRUDTable
          title=""
          columns={partAcolumns}
          data={partAData}
          options={{
            headerStyle: {
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              borderBottomWidth: '2px',
              background: '#f8fafd',
              fontWeight: '600px',
              padding: '13px',
            },
            actionsColumnIndex: -1,
            search: false,
            paging: false,
            doubleHorizontalScroll: true,
            position: 'absolute',
          }}
          style={{
            padding: '0px 20px',
            borderRadius: '0px',
            boxShadow: 'none',
            fontSize: '12px',
          }}
          actionsCellStyle={{
            width: 'auto',
            justifyCenter: 'center',
          }}
          source={source}
          editable={editOpitionsObjPartA}
        />
      </div>

      {/* part b */}
      <div className="h-full shadow-xl flex flex-col  mb-6 bg-[#F1F5F9] rounded-t overflow-y-scroll">
        <div className="z-10">
          {/* <Dialog.Title className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
          {/* <span className="mr-auto ml-3  text-md font-extrabold tracking-tight uppercase font-body ">
          {blocksViewFeature === 'Construction_Other_Charges'
            ? 'Construction Other Charges (section B)'
            : 'Plot Other Charges (section B)'}
        </span> */}
          <section className="ml-4 text-md font-[500]">Part-B</section>
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
                  background: '#f8fafd',
                  fontWeight: '600px',
                  padding: '13px',
                },
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                doubleHorizontalScroll: true,
                position: 'absolute',
              }}
              style={{
                padding: '0px 20px',
                borderRadius: '0px',
                boxShadow: 'none',
                fontSize: '12px',
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

        <div className=" min">
          <section className="ml-4 text-md font-[500]">Part-C</section>
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
              },
              actionsColumnIndex: -1,
              paging: false,
              search: false,
              doubleHorizontalScroll: true,
              position: 'absolute',
            }}
            style={{
              padding: '0px 30px',
              borderRadius: '0px',
              boxShadow: 'none',
              fontSize: '12px',
            }}
            actionsCellStyle={{
              width: 'auto',
              justifyCenter: 'center',
            }}
            source={source}
            editable={editOpitionsObjPartC}
          />
        </div>
      </div>
    </section>
    
  )
}

export default AdditionalChargesForm