import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import Loader from 'src/components/Loader/Loader'
import { updateMoreDetails } from 'src/context/dbQueryFirebase'
import { TextAreaField } from 'src/util/formFields/TextAreaField'

const ConstructHomeList = ({ title, dialogOpen, data }) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      editMode: true,
    }
    setLoading(true)
    await updateMoreDetails(data?.phase?.uid, updatedData, enqueueSnackbar)
    setLoading(false)
    resetForm()
    dialogOpen(false)
  }

  const initialState = {
    highlights: data?.phase?.moreDetails?.highlights || '',
    amenities: data?.phase?.moreDetails?.amenities || '',
    remarks: data?.phase?.moreDetails?.remarks || '',
  }

  const schema = Yup.object({
    highlights: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4  z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        <div className="flex flex-row ">
          <div className="mr-4 templateList">
            <div className=" flex">
              <div className="flex flex-col">
                <button
                  className="templateItem hightlightItem"
                  tabIndex="0"
                  type="button"
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon tempalteIcon"
                      focusable="false"
                      viewBox="0 0 17 21"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.4766 9.90449C12.7564 8.97117 13.5897 7.4607 13.5897 5.75906C13.5897 2.93137 11.2892 0.630859 8.46152 0.630859C5.63383 0.630859 3.33332 2.93137 3.33332 5.75906C3.33332 7.4607 4.16664 8.97117 5.44641 9.90449C2.26516 11.1219 0 14.2063 0 17.8104C0 19.3656 1.26527 20.6309 2.82051 20.6309H14.1025C15.6578 20.6309 16.923 19.3656 16.923 17.8104C16.923 14.2063 14.6579 11.1219 11.4766 9.90449ZM4.8718 5.75906C4.8718 3.77969 6.48215 2.16934 8.46152 2.16934C10.4409 2.16934 12.0512 3.77969 12.0512 5.75906C12.0512 7.73844 10.4409 9.34883 8.46152 9.34883C6.48215 9.34883 4.8718 7.73844 4.8718 5.75906ZM14.1025 19.0924H2.82051C2.11359 19.0924 1.53848 18.5173 1.53848 17.8103C1.53848 13.9929 4.6441 10.8872 8.46156 10.8872C12.279 10.8872 15.3846 13.9929 15.3846 17.8103C15.3846 18.5173 14.8095 19.0924 14.1025 19.0924Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>

                  <span className="pt-[5px]"> Modifications</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-0 flex">
            <Formik
              initialValues={initialState}
              validationSchema={schema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
              }}
            >
              {() => (
                <Form>
                  <div className="mt-2 w-full">
                    <TextAreaField
                      label="Highlights*"
                      name="highlights"
                      type="text"
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <TextAreaField
                      label="Amenities"
                      name="amenities"
                      type="text"
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <TextAreaField label="Remarks" name="remarks" type="text" />
                  </div>
                  <p className="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{' '}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                    <button
                      onClick={() => dialogOpen(false)}
                      type="button"
                      className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                    >
                      {' '}
                      Cancel{' '}
                    </button>
                    <button
                      className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <Loader />}
                      {data?.block?.editMode ? 'Update' : 'Save'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col m-4">
            <div className="mt-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConstructHomeList
