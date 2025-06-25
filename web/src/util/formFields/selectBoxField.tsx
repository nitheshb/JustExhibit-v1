import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from 'formik'
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#E5E5E5',
    minHeight: '42px',
    height: '42px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
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
    height: '40px',
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
      <div className={`flex flex-col space-y-[10px] ${className}`}>
        {(label != '' || label != 'Assigned To') && (
          <label className="label font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]">{label}</label>
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
