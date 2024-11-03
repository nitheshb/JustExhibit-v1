/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/solid'
import { Card, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import Loader from 'src/components/Loader/Loader'
import { ProjectAccessFolder, ProjectFolders } from 'src/constants/projects'
import { deleteProject, getPlanDiagramByPhase, updateMoreDetails } from 'src/context/dbQueryFirebase'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { TextAreaField } from 'src/util/formFields/TextAreaField'

import WarningModel from '../comps/warnPopUp'
import CostSheetSetup from '../costSheetSetup'
import PaymentLeadAccess from '../PaymentScheduleForm/ProjectLeadAccess'
import PaymentScheduleSetup from '../paymentScheduleSetup'
import SiderForm from '../SiderForm/SiderForm'

import LegalHomeList from './LegalHomeList'

const ProjectAccessSideView = ({
  title,
  dialogOpen,
  data,
  source,
  setSubView,
  subView,
  projectDetails,
  pId,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [loading, setLoading] = useState(false)

  // const [subView, setSubView] = useState('salesAccess')
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [viewDocData, setViewDocData] = useState({})
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [isAccessSideView, setIsAccessSideView] = useState(false)
  const [planDiagramsA, setPlanDiagramsA] = useState([])
  useEffect(() => {
    getPlanDiagrams(data?.uid, 'plan_diagram')
    console.log('plan_diagram', data, projectDetails)

    // if (pId && title === 'Plan Diagram') {
    //   getPlanDiagrams(data?.uid, 'plan_diagram')
    // } else if (pId && title === 'Brouchers') {
    //   getPlanDiagrams(data?.uid, 'broucher')
    // } else if (pId && title === 'Approvals') {
    //   getPlanDiagrams(data?.uid, 'approval')
    // }
  }, [pId, data])
  const getPlanDiagrams = async (phaseId, type) => {
    const unsubscribe = getPlanDiagramByPhase(
      orgId,
      { pId: data?.phase.projectId, phaseId: data?.phase.uid, type: type },
      (querySnapshot) => {
        const response = querySnapshot.docs.map((docSnapshot) => {
          return { ...docSnapshot.data(), ...{ docId: docSnapshot.id } }
        })
        console.log('plan_diagram data is ', response)
        setPlanDiagramsA(response)
      },
      (e) => {
        console.log('error', e)
      }
    )
    return unsubscribe
  }
  useEffect(() => {
    getProjects()
  }, [])
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
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.eventName
          user.value = user?.uid
        })
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const handleDelete = async () => {
    // projectDetails.uid
    if (
      projectDetails?.bookUnitCount == undefined ||
      projectDetails?.bookUnitCount == 0
    ) {
      deleteProject(
        orgId,
        projectDetails.uid,
        user?.email,
        projectDetails,
        enqueueSnackbar
      )
      // enqueueSnackbar('Deleted Successfully', {
      //   variant: 'success',
      // })
    } else {
      enqueueSnackbar(
        `Cannot delete: ${projectDetails?.bookUnitCount} Booked unit exists `,
        {
          variant: 'error',
        }
      )
    }

    dialogOpen(false)
  }
  const dispDoc = (docData, type) => {
    setViewDocData(docData)
    setSubView(type)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }
  return (
    <div className="h-full flex flex-col  bg-white shadow-xl">
      <div className="   z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}

        <div className="flex flex-row ">

          {subView === 'salesAccess' && (
            <PaymentLeadAccess
              title={'Leads Access'}
              data={{ phase: data, project: projectDetails }}
              dept="sales"
              source={source}
            />
          )}
          {subView === 'creditNoteIssuers' && (
            <PaymentLeadAccess
              title={'Credit Note Issuers'}
              data={{ phase: data, project: projectDetails }}
              dept="admin"
              source={source}
            />
          )}

          {subView === 'marketingAccess' && (
            <PaymentLeadAccess
              title={'Marketing Access'}
              data={{ phase: data, project: projectDetails }}
              dept="marketing"
              source={source}
            />
          )}
          {subView === 'crmAccess' && (
            <PaymentLeadAccess
              title={'Stalls Access'}
              data={{ phase: data, project: projectDetails }}
              dept="crm"
              source={source}
            />
          )}
          {subView === 'FinAccess' && (
            <PaymentLeadAccess
              title={'Finance Access'}
              data={{ phase: data, project: projectDetails }}
              dept="finance"
              source={source}
            />
          )}
          {subView === 'legalAccess' && (
            <PaymentLeadAccess
              title={'Legal Access'}
              data={{ phase: data, project: projectDetails }}
              dept="legal"
              source={source}
            />
          )}
          {subView === 'constructAccess' && (
            <PaymentLeadAccess
              title={'Contruction Access'}
              data={{ phase: data, project: projectDetails }}
              dept="construction"
              source={source}
            />
          )}
        </div>
      </div>




      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'upload_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-2xl"
        projectsList={projects}
      />
      {/* <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'disp_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-xl"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      /> */}
       <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'disp_project_docs'}
        subView={subView}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-xl"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      />
      <SiderForm
        open={isAccessSideView}
        setOpen={setIsAccessSideView}
        title={'disp_project_access'}
        subView={subView}
              //    data={{ phase: data, project: projectDetails }}
              // dept="admin"
              // source={source}
        phaseDetails={data}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-xl"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      />
    </div>
  )
}

export default ProjectAccessSideView
