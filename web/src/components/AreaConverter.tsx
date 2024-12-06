import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { areaConversions } from 'src/constants/projects'
import { sqmtConverter } from 'src/util/sqmtConverter'
import NoBorderDropDown from './comps/noBorderDropDown'

export const AreaConverter = ({ formik, hideField, fieldName,textPrimaryName, textSecondaryName, dropDownPrimaryName, dropdownSecondaryName }) => {
  const onConverterAdd = ({
    primary,
    primaryUnit,
    secondary,
    secondaryUnit,
    formik,
  }) => {
    // const primaryValue = primary ? sqmtConverter(primary, primaryUnit) : 0
    // const secondaryValue = secondary
    //   ? sqmtConverter(secondary, secondaryUnit)
    //   : 0
    // const value = primaryValue + secondaryValue
    // value && formik.setFieldValue(fieldName, value) && hideField(false)
    const primaryValue = formik.values[textPrimaryName] 
    ? sqmtConverter(formik.values[textPrimaryName], formik.values[dropDownPrimaryName]) 
    : 0
  const secondaryValue = formik.values[textSecondaryName]
    ? sqmtConverter(formik.values[textSecondaryName], formik.values[dropdownSecondaryName])
    : 0
  const value = primaryValue + secondaryValue
  value && formik.setFieldValue(fieldName, value) && hideField(false)
  }



  return (
    <div className="mt-3 mb-6">
      <label htmlFor="area" className="label font-regular text-sm">
        Sqmt Converter
      </label>
      <div className="flex justify-between items-baseline">
        {/* <div className="basis-1/4 mr-2">
          <TextField label="" name="areaTextPrimary" type="text" />
        </div> */}
        <MuiTextField


id={fieldName}
// ... other props ...
name={textPrimaryName}
value={formik.values[textPrimaryName]}
onChange={formik.handleChange}
          //id="area"
          className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
          size="small"
          InputProps={{
            style: {
              height: '2rem',
              padding: '0px',
            },
            endAdornment: (
              <InputAdornment
                position="start"
                style={{
                  height: '32px',
                  background: '#E5E7EB',
                  paddingLeft: '5px',
                  marginRight: '0px',
                }}
              >
                <NoBorderDropDown
                  name="relation1"
                  label=""
                  className="input  min-w-[122px] h-[32px]"
                  onChange={({ value }) => {
                    formik.setFieldValue('areaDropDownPrimary', value)
                  }}
                  value={formik.values.areaDropDownPrimary}
                  options={areaConversions}
                />
              </InputAdornment>
            ),
          }}
          label=""
          //name="areaTextPrimary"
          type="text"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRight: 'none',
                borderRadiusRight: '0px',
              },
              '&:hover fieldset': {
                borderRight: 'none',
                borderRadiusRight: '0px',
              },
              '&.Mui-focused fieldset': {
                borderRight: 'none',
                borderRadiusRight: '0px',
              },
            },
          }}
          //value={formik.values.areaTextPrimary}
          //onChange={formik.handleChange}
        />
        <MuiTextField

id={`${fieldName}Secondary`}



name={textSecondaryName}
value={formik.values[textSecondaryName]}
onChange={formik.handleChange}

        
          //id="area"
          className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 m-0 mt-1 p-0 border-l-none`}
          size="small"
          InputProps={{
            style: {
              height: '2rem',
              // paddingLeft: '7px',
              padding: '0px',
              margin: '0px',
              // background: 'red'
              // background: '#E5E7EB',
              width: '200px',
            },
            endAdornment: (
              <InputAdornment
                position="start"
                className="text-gray-900 bg-gray-200"
                style={{
                  height: '32px',
                  background: '#E5E7EB',
                  paddingLeft: '5px',
                  marginRight: '0px',
                }}
              >
                <NoBorderDropDown
                  name="areaDropdownSecondary"
                  label=""
                  className="input  min-w-[122px] h-[32px] bg-gray-200"
                  onChange={({ value }) => {
                    formik.setFieldValue('areaDropdownSecondary', value)
                  }}
                  value={formik.values.areaDropdownSecondary}
                  options={areaConversions}
                />
              </InputAdornment>
            ),
          }}
          label=""
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderLeft: 'none',
                borderRadiusLeft: '0px',
              },
              '&:hover fieldset': {
                borderLeft: 'none',
                borderRadiusLeft: '0px',
              },
              '&.Mui-focused fieldset': {
                borderLeft: 'none',
                borderRadiusLeft: '0px',
              },
            },
          }}
          //name="areaTextSecondary"
          type="text"
          //value={formik.values.areaTextSecondary}
          //onChange={formik.handleChange}
        />
      </div>
      <button
        className="mb-2 md:mb-0 float-right bg-[#57c0d0] px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:shadow-lg hover:bg-green-500"
        type="button"
        onClick={() =>
          onConverterAdd({
            primary: formik.values.areaTextPrimary,
            primaryUnit: formik.values.areaDropDownPrimary,
            secondary: formik.values.areaTextSecondary,
            secondaryUnit: formik.values.areaDropdownSecondary,
            formik,
          })
        }
      >
        Convert to Sqmt
      </button>
    </div>
  )
}
