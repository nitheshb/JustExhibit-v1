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
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px'
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
    height: '30px',
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
}


export const CustomSelect = ({
  onChange,
  options,
  setAddNewBankStuff,
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
          <label className="label font-regular text-[12px] block pb-1 text-gray-700">{label}</label>
        )}
        <label>
          <Select
            maxMenuHeight={150}
            name={name}
            value={defaultValue(options, value)}
            placeholder={label || 'All Events'}
            onChange={(value) => {
              onChange(value)
            }}
            options={options}
            className={`text-sm  ${
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
