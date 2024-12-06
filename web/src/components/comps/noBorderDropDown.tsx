// import Select from 'react-select'
// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     // background: '#fff',
//     // // borderColor: '#9e9e9e',
//     // minHeight: '32px',
//     // height: '32px',
//     // boxShadow: state.isFocused ? null : null,
//     border: '0px solid #000',
//     // borderBottom: '1px solid #000', // Set the desired border styles here
//     borderRadius: '0', // Remove rounded corners
//     boxShadow: 'none', // Remove the box shadow
//   }),

//   valueContainer: (provided, state) => ({
//     ...provided,
//     height: '30px',
//     padding: '0 6px',
//     // padding: '0px',
//     minWidth: '80px'
//   }),
//   placeholder: (provided, state) => ({
//     ...provided,
//     minWidth: '58px', // Set the width of the placeholder text
//   }),
//   input: (provided, state) => ({
//     ...provided,
//     margin: '0px',
//   }),
//   indicatorSeparator: state => ({
//     display: 'none',
//   }),
//   indicatorsContainer: (provided, state) => ({
//     ...provided,
//     height: '30px',
//   }),
//   menu: (provided) => ({ ...provided, zIndex: 9999 }),
// }


// const NoBorderDropDown = ({
//   onChange,
//   options,
//   value,
//   name,
//   label,
//   className,
// }) => {
//   const defaultValue = (options, value) => {
//     return (
//       (options ? options?.find((option) => option?.value === value) : '') || ''
//     )
//   }

//   return (
//     <label>
//       <div className={className}>
//         {/* {(label != '' || label != 'Assigned To') && (
//           <label className="label font-regular text-[12px] block mb-1 text-gray-700">{label}</label>
//         )} */}
//         <label>
//           <Select
//             maxMenuHeight={150}
//             name={name}
//             value={defaultValue(options, value)}
//             placeholder={label || '  S/O'}
//             onChange={(value) => {
//               onChange(value)
//             }}
//             options={options}
//             className={`text-sm  ${
//               label != '' ? 'mt-' : ''
//             } border-transparent`}
//             styles={customStyles}
//           />
//         </label>


//       </div>
//     </label>
//   )
// }


import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from 'formik'
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    // borderColor: '#9e9e9e',
    minHeight: '32px',
    height: '32px',
    boxShadow: state.isFocused ? null : null,
    border: '0px solid #000',
    fontSize: '12px',

  
    borderRadius: '0', // Remove rounded corners
    boxShadow: 'none', 
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '31px',
    padding: '0px',
    fontSize: '12px',
    // background: '#E5E7EB',
    margin: '0px'

  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '31px',
    paddingLeft: '0px',
    paddingRight: '0px',
    // background: '#E5E7EB'

  }),
  singleValue: (provided, state) => ({
    ...provided,

    fontSize: '12px',

  }),
  placeHolder: (provided, state) => ({
    ...provided,

    fontSize: '12px',

  }),
  placeholder: (provided, state) => ({
    ...provided,

    fontSize: '12px',

  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
}


export const NoBorderDropDown = ({
  onChange,
  options,
  value,
  name,
  label,
  className,
}) => {
  const defaultValue = (options, value) => {
    return (
      (options ? options?.find((option) => option?.value === value) : '') || ''
    )
  }

  return (
    <label>
      <div className={className}>
        {(label != '' || label != 'Assigned To') && (
          <label className=" font-regular text-[10px] block text-gray-500 bg-red">{label}</label>
        )}
        <label>
          <Select
            maxMenuHeight={150}
            name={name}
            value={defaultValue(options, value)}
            placeholder={label=== "Maritual Status" ? 'Married' : label ||  'S/O'}
            onChange={(value) => {
              onChange(value)
            }}
            options={options}
            className={`text-sm text-gray-darker bg-red ${
              label != '' ? 'mt-' : ''
            } border-transparent`}
            styles={customStyles}
          />
        </label>
        <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2 "
      />

      </div>
    </label>
  )
}

export default NoBorderDropDown;
