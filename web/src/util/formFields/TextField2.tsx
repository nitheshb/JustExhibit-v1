/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

import { ErrorMessage, useField } from 'formik'
// import { InputField, Label } from '@redwoodjs/forms'




export const TextField2 = ({ label,onChange, ...props }) => {


  const [field, meta] = useField(props)
  return (
    <div className="relative z-0 text-sm">

      <div className='flex flex-col space-y-[10px]'>

                     <label
        htmlFor={field.name}
        className="label font-semibold font-manrope text-[14px] leading-[20px] tracking-[0] text-[#333333]"
      >
        {label}

      </label>




        <input
          type="text"
          name={field.name}
          className={`${
            meta.touched && meta.error ? 'is-invalid' : ''
          } ${field.name === 'blockName' ? 'rounded-xs' : 'h-[42px] rounded-md'}
            w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#E5E5E5] px-4
            placeholder:font-manrope placeholder:font-normal
            placeholder:text-[14px] placeholder:leading-[24px]
            placeholder:tracking-[0%] placeholder:text-[#CCCCCC]`}
          placeholder="Enter text"
          autoComplete="off"
          {...field}
          {...props}
          onChange={onChange || field.onChange}
        />


      </div>





      <ErrorMessage
          component="div"
          name={field.name}
          className="error-message text-red-700 text-xs p-1 mx-auto"
        />
    </div>

  )
}



  // <div className="mb-2 w-full">
    //   <div className="flex flex-row">
    //     <label
    //       htmlFor={field.name}
    //       className="label font-regular text-[#4b4b4b]  text-sm block mb-1 text-opacity-40 text-[12px]"
    //     >
    //       {label}
    //     </label>
    //     <ErrorMessage
    //       component="div"
    //       name={field.name}
    //       className="error-message text-red-700 text-xs p-1 mx-auto"
    //     />
    //   </div>

    //   <input
    //     className={` ${meta.touched && meta.error && 'is-invalid'} ${
    //       field.name === 'blockName' ? '' : ' h-8  '
    //     }
    //        w-full min-w-full text-[16px] flex  text-[#4b4b4b]  border-b border-[#2b2a351a] rounded-sm leading-normal `}
    //     {...field}
    //     {...props}
    //     autoComplete="off"
    //   />
    // </div>
