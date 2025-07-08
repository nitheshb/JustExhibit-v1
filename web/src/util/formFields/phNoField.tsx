import { ErrorMessage } from 'formik'
import React from 'react'
import NumberFormat from 'react-number-format'
import Select from 'react-select'




export const PhoneNoField = ({
  onChange,
  options,
  value,
  name,
  label,
  className,
  labelSize,
  textSize,
  txtPad,
  customStyles,
  placeholder = "Mobile Number",
}) => {
  return (
    <div className={className}>
      <label className={`label font-regular  mb-2 ${labelSize === undefined ? 'text-sm': labelSize}`}>{label}</label>
      <NumberFormat
        // label="Mobile No*"
                className={`
          w-full min-w-full flex items-center
          bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-[2rem]
          px-4 ${textSize} ${txtPad}
          placeholder:font-manrope placeholder:font-normal
          placeholder:text-[14px] placeholder:leading-[24px]
          placeholder:tracking-[0%] placeholder:text-[#CCCCCC]
        `}
      
        name="mobileNo"
        value={value}
        //value={value || '+91'}
        onValueChange={(value) => {
          console.log('PhoneNoField value:', value);

          onChange(value)
        }}
        //format="###-###-####"
        format="###-###-####"
        mask=""
        placeholder={placeholder}
        style={customStyles}
      />
      <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-1 mt-1"
      />
    </div>
  )
}





