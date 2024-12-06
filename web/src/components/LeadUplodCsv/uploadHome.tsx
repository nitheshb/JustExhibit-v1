import React, { useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Grid } from '@material-ui/core'
import csv from 'csvtojson'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import { MultipleFileUploadField } from './MultipleFileUploadField'
import { DownloadIcon } from '@heroicons/react/solid'

export default function LeadsDropHomes({ title, pId, myPhase, myBlock }) {
  const [existingCols, setexistingCols] = useState([])

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 flex flex-row justify-between">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219] w-sreen ">
          {['Import Apartment Stalls','Import Plot Stalls' ].includes(title)? 'Import Stalls' : title}
        </Dialog.Title>
        {title === 'Import Apartment Stalls' && (
          <div className="flex flex-row justify-between mr-8 ">
            <span></span>
            <a
              download="unitTemplate.csv"
              target="_blank"
              href="/apartmentTemplate.csv"
            >
              <span className="text-xs text-blue-500">
                <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                Sample Apartment Template
              </span>
            </a>
          </div>
        )}
        {title === 'Import Villas' && (
          <div className="flex flex-row justify-between mr-8 ">
            <span></span>
            <a
              download="villaTemplate.csv"
              target="_blank"
              href="/villaTemplate.csv"
            >
              <span className="text-xs text-blue-500">
                <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                Sample Villas Template
              </span>
            </a>
          </div>
        )}
        {title === 'Import Stalls' && (
          <div className="flex flex-row justify-between mr-8 ">
            <span></span>
            <a
              download="plotTemplate.csv"
              target="_blank"
              href="/plotTemplate.csv"
            >
              <span className="text-xs text-blue-500">
                <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                Sample Stalls
              </span>
            </a>
          </div>
        )}
        {title === 'ImportAssets' && (
            <div className=" flex flex-row justify-between mr-8">
              <span></span>
              <a
                download="unitTemplate.csv"
                target="_blank"
                href="/assetsTemplate.csv"
              >
                <span className="text-xs text-blue-500">
                  <DownloadIcon className="h-3 w-3 mr-1 mb-1 inline-block" />
                  Sample Assets Template
                </span>
              </a>
            </div>
          )}
      </div>
      <div className="grid  gap-8 grid-cols-1">
        {title === 'import Unit' && (
          <div className="flex flex-col  my-10 rounded-lg  px-4 m-4 mt-12">
            Block:{' '}
          </div>
        )}
        <div className="flex flex-col  my-10 rounded-lg  px-4 m-4 mt-12">
          <Formik
            initialValues={{ files: null }}
            // validationSchema={object({
            //   files: array(
            //     object({
            //       url: string().required(),
            //     })
            //   ),
            // })}
            onSubmit={async (values) => {
              console.log('ehcek1', {
                fileName: values.files[0].file.name,
                type: values.files[0].type,
                size: `${values.files[0].size} bytes`,
              })

              if (title === 'Plan Diagram') {
              } else if (title === 'legal_doc_upload') {
                console.log('am inside lega doc upload')
              } else {
                try {
                  const jsonArray = await csv().fromFile(
                    values.files[0].file.path
                  )

                  await console.log('jsonArray is ', jsonArray)
                } catch (error) {
                  console.log('error at jsonArray', error)
                }

                parse(values.files[0].file, {
                  header: true,
                  // download: true,
                  complete: async function (input) {
                    await setexistingCols((existing) => [
                      ...existing,
                      ...input.data,
                    ])
                    // let x =   await getLedsData()
                    console.log('Finished:', existingCols)
                  },
                })
              }
              // const myFiles = Array.from(values.files)
              // console.log('upload file values', values)
              // console.log('vsv data is ', myFiles)

              // myFiles.forEach((file) => {
              //   console.log('filer is ', file)
              //   try {
              //     parse(file, {
              //       complete: function (results) {
              //         console.log('Finished:', results.data)
              //       },
              //     })
              //   } catch (error) {
              //     console.log('error', error)
              //   }
              // })
              // const reader = new FileReader()
              // const y = await reader.readAsText(values.files[0])
              // await console.log('yo yo', y)
              // Array.from(values.files)
              //   .filter((file) => file.type === 'text/csv')

              // myFiles.forEach(async (file) => {
              //   // const text = await file.text()
              //   console.log('ami i here')

              //   const result = await parse(file, {
              //     complete: function (results) {
              //       console.log('Finished:', results.data)
              //     },
              //   })
              //   await console.log('result is ', result)
              // })

              return new Promise((res) => setTimeout(res, 2000))
            }}
          >
            {() => (
              // {parseExcel(values)}
              <Form>
                <Grid container spacing={2} direction="column">
                  <MultipleFileUploadField
                    name="files"
                    title={title}
                    pId={pId}
                    myPhase={myPhase}
                    myBlock={myBlock}
                  />

                  {/* <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid> */}
                </Grid>
                {/* <pre>hello{parseExcel(values)}</pre> */}
                {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                {/* <p>{JSON.stringify({ existingCols })}</p> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
