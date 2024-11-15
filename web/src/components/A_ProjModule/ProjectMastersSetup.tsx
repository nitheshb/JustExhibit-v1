/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { Facebook, Instagram, Twitter, Search, Settings, Bell, Plus, Download, ExternalLink } from 'lucide-react';

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import PencilIcon from '@heroicons/react/solid/PencilIcon'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import { useSnackbar } from 'notistack'

import { sourceListItems } from 'src/constants/projects'
import {
  deleteBankAccount,
  steamBankDetailsList,
  steamVirtualAccountsList,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'

import EditableTable from '../comps/EditableComp'
import SiderForm from '../SiderForm/SiderForm'

import SourceAddTemplate from './SourceAddTemplate'
import MastersEditableTable from '../comps/MastersEditableComp'
import TermsConditionsEditableTable from '../comps/TermsConditionsEditableComp'

const ProjectMastersSetupHome = ({ title, pId, data }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [testPhNo, setTestPhNo] = useState('')
  const [wbSelPayload, setWbSelPayload] = useState({})
  const [selCat, setSelCat] = useState('Masters')

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: 'Bank Account',
    sliderData: {},
    widthClass: 'max-w-xl',
  })

  const phKeyFieldFun = (e) => {
    setTestPhNo(e.target.value)
  }
  const triggerWhatsAppFun = (data) => {
    setIsOpenSideView(true)

    console.log('i was here', data, isOpenSideView)
    const { event } = data
    const payload = {
      event: event,
      target: 'customer',
      type: 'wa',
      scope: 'allProjects',
    }

    setWbSelPayload(payload)
  }

  const triggerEmailFun = (txt) => {}

  return (
    <>
        <div className="min-h-screen  rounded-xl">
      {/* Navigation Bar */}




      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Masters Setup</h1>
            <p className="text-gray-600">This area is usually used to setting up values for the dropdowns and other resuable options</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Integration
            </button>
          </div>
        </div>

             {/* Tabs */}
             <div className="flex items-center space-x-1 mb-6 border-b">
          {[
          { label: 'Masters', value: 'Masters' },
          { label: 'Terms & Conditions', value: 'TermsConditions' },


        ].map((data, i) => (
            <button
              key={i}
              onClick={() =>     setSelCat(data.value)}
              className={`px-4 py-2 ${
                selCat === data.value
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {data.value === 'Masters' && (
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              )}
              {data.label}
            </button>
          ))}
        </div>


       {selCat === 'TermsConditions' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {`${selCat} Setup`}
              </h2>
              <TermsConditionsEditableTable type={'TermsConditions'} />
            </div>
          </section>
        </div>
      )}
       {selCat === 'Masters' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className=" p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {`${selCat} Setup`}
              </h2>
              <MastersEditableTable type={'Masters'} />
            </div>
          </section>
        </div>
      )}
      {selCat === 'Plots' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {`${selCat} Cost Setup Templete`}
              </h2>
              <EditableTable type={'Plots'} />
            </div>
          </section>
        </div>
      )}
        {selCat === 'Villas' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {`${selCat} Cost Setup Templete`}
              </h2>
              <EditableTable type={'Villas'} />
            </div>
          </section>
        </div>
      )}
      {selCat === 'WeekendVillas' && (
        <div className="w-full   flex-row">
          <section className="m-4 inline-block">
            <div className="bg-[#FFEDEA] p-4 rounded-xl shadow-md shadow-neutral-200 ">
              <h2 className="text-sm font-semibold pb-2 border-b border-grey">
                {`${selCat} Cost Setup Templete`}
              </h2>
              <EditableTable type={'WeekendVillas'} />
            </div>
          </section>
        </div>
      )}
   </main>
</div>
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'Notification Setup'}
        widthClass="max-w-2xl"
        wbPayload={wbSelPayload}
      />
    </>
  )
}

export default ProjectMastersSetupHome
