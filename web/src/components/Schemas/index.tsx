import * as Yup from 'yup'

export const validate_capturePayment = Yup.object({
  chequeno: Yup.string()
    .required('Cheque number is required')
    .matches(/^[0-9]{6}$/, 'Cheque number must be 6 digits'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be a positive number')
    .integer('Amount must be an integer'),
  dated: Yup.date().required('Date is required'),
  paidTo: Yup.string().required('Paid to is required'),
})

export const validate_AddUnit = Yup.object({
  unit_no: Yup.string().required('Unit no. is required'),
  area: Yup.number()
    .required('Area is required')
    .typeError('Area must be a valid number')
    .positive('Area must be a positive number'),
  sqft_rate: Yup.number()
    .required('Rate per Sqft is required')
    .typeError('Rate per sqft must be a valid number')
    .positive('Rate per sqft must be a positive number'),
  plc_per_sqft: Yup.number()
    .required('Plc per sqft is required')
    .typeError('Plc per sqft must be a valid number')
    .positive('Plc per sqft must be a positive number'),
  size: Yup.string().required('Size is required'),
  facing: Yup.string().required('Facing is required field'),
  status: Yup.string().required('Status is required field'),
  release_status: Yup.string().required('Release status is required field'),
  mortgage_type: Yup.string().required('Mortage Type is required field'),
})
