import { pid } from 'process'

import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'

import {
  searchValue as searchedVal,
  searchData as searchResponse,
} from 'src/state/actions/search'
import CostBreakUpPdfPreview from 'src/util/costBreakUpPdfPreview'

import CrmCustomerSummary from '../A_CrmModule/A_CrmCustomerSummary'
import UnitBookingCancelCRM from '../A_CrmModule/A_UnitCancel.tsx/CrmUnitCancel'
import CustomerSideViewCRM from '../A_CrmModule/CrmCustomerSideView'
import AddNewDemand from '../A_CrmModule/CrmNewDemand'
import UnitSideViewCRM from '../A_CrmModule/CrmUnitSideView'
import ViewDocxFile from '../A_LegalModule/viewDocxFile'
import AddCampaignForm from '../A_MarketingModule/AddCampaign'
import LegalHomeList from '../A_ProjModule/LegalHomeList'
import NotificationsSetupForm from '../A_ProjModule/NotificatoinsSetupFromHome'
import ProjectAccessSideView from '../A_ProjModule/ProjectAccessSideView'
import ProjectDetailsFlowBody from '../A_ProjModule/ProjectDetails'
import ProjectsDocsListView from '../A_ProjModule/viewLegalDocument'
import AddTaskForm from '../A_TaskMan/AddTaskForm'
import ViewEditTaskManForm from '../A_TaskMan/ViewEditTaskManForm'
import AddBankDetailsForm from '../addBankDetailsForm'
import AddBlockForm from '../AddBlockForm/AddBlockForm'
import AdditionalChargesForm from '../AdditionalChargesForm/AdditionalChargesForm'
import AddLeadForm from '../AddLeadForm'
import AddPhaseForm from '../AddPhaseForm/AddPhaseForm'
import AddUnit from '../AddUnit'
import ConstructUnitsDetails from '../ConstructModule/ConstructUnitsDetails'
import CrmUnitSideView from '../crmUnitSideView'
import DialogFormBody from '../DialogFormBody/DialogFormBody'
import InventoryViewSideForm from '../DialogFormBody/InventoryViewSideView'
import CaptureUnitPayment from '../FinanceModule/CapturePayment'
import LeadProfileSideView from '../LeadProfileSideView'
import LegalDocsUplaodHome from '../LeadUplodCsv/Legal_Docs_upload'
import LeadsDropHomes from '../LeadUplodCsv/uploadHome'
import LegalDocsViewHome from '../LegalModule/viewLegalDocument'
import MoreDetailsPhaseForm from '../MoreDetailsPhaseForm/MoreDetailsPhaseForm'
import PaymentScheduleForm from '../PaymentScheduleForm/PaymentScheduleForm'
import TransactionUpdateSideView from '../transactionUpdateSideView'
import ViewUnitDetails from '../ViewUnitDetails'
import AddCustomerWallet from '../FinanceModule/AddCustomerWallet'

const SiderForm = ({
  mode,
  BlockFeed,
  blockDetails,
  customerDetails = {},
  csMode,
  costSheetA,
  data = {},
  headerContent,
  myBlock,
  newPlotCostSheetA,
  newPlotCostSheetB,
  newPlotPS,
  open,
  onCloseDisabled = false,
  paymentCaptureFun,
  pId,
  pdfExportComponent,
  phaseFeed,
  projectDetails,
  phaseDetails,
  projectsList,
  leadDetailsObj,
  setUnitsViewMode,
  selCustomerPayload,
  setProject,
  selUnitDetails,
  setSelUnitDetails,
  selPhaseObj,
  selSubMenu,
  selSubMenu2,
  setIsClicked,
  setOpen,
  subView,
  taskManObj,
  title,
  transactionData,
  unitViewerrr,
  unitsViewMode,
  unitViewActionType,
  viewLegalDocData,
  viewUnitConstData,
  wbPayload,
  widthClass,
  campaignPaylaod,
}) => {
  // dont write too many here
  //  this is for customerProfileSideView

  console.log('title is ', title)
  const dispatch = useDispatch()
  return (
    <Transition.Root show={open || false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onCloseDisabled ? () => {} : () => setOpen()}
        style={{ zIndex: '1000' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                className={`relative w-screen ${
                  title === 'Add Lead' || title === 'upload_legal_docs'
                    ? 'max-w-2xl'
                    : widthClass
                }
                 ${unitsViewMode ? 'max-w-7xl' : widthClass}`}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => {
                        setOpen(false)
                        setIsClicked(false)
                        dispatch(searchedVal(''))
                        dispatch(searchResponse({}))
                      }}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {title === 'Add Task' && (
                  <AddTaskForm title={title} dialogOpen={setOpen} />
                )}
                {title === 'Add Campaign' && (
                  <AddCampaignForm
                    mode={mode}
                    title={title}
                    campaignPaylaod={campaignPaylaod}
                    dialogOpen={setOpen}
                  />
                )}
                {title === 'view_task_man' && (
                  <ViewEditTaskManForm
                    title={title}
                    dialogOpen={setOpen}
                    taskManObj={taskManObj}
                  />
                )}
                {(title === 'Create Event' || title === 'Edit Event') && (
                  // <DialogFormBody
                  //   title={title}
                  //   dialogOpen={setOpen}
                  //   project={data}
                  // />
                  <ProjectDetailsFlowBody
                    title={title}
                    dialogOpen={setOpen}
                    project={data}
                    setProject={setProject}
                  />
                )}
                {title === 'project_details' && (
                  <ProjectDetailsFlowBody
                    title={title}
                    dialogOpen={setOpen}
                    project={data}
                  />
                )}
                {(title === 'Add Phase' || title === 'Edit Phase') && (
                  <AddPhaseForm
                    title={title}
                    dialogOpen={setOpen}
                    phase={data}
                  />
                )}
                {(title === 'Add Block' || title === 'Edit Block') && (
                  <AddBlockForm
                    title={title}
                    dialogOpen={setOpen}
                    data={data}
                  />
                )}
                {(title === 'Import Villas' ||
                  title === 'Import Apartment Stalls') && (
                    <LeadsDropHomes
                      title={title}
                      dialogOpen={setOpen}
                      pId={pId}
                      myPhase={phaseDetails}
                      myBlock={myBlock}
                    />
                  )}

                {title === 'Import Stalls' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                 { [
        'Import Booked Villas',
        'Import Booked Plots',
        'Import Booked Apartments',
      ].includes(title) && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Upload Mortgage' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Upload Unit Transactions' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'ImportAssets' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Add Stall' && (
                  <AddUnit
                    title={title}
                    phaseFeed={phaseFeed}
                    BlockFeed={BlockFeed}
                    dialogOpen={setOpen}
                    projectDetails={projectDetails}
                    phaseDetails={phaseDetails}
                    blockDetails={blockDetails}
                  />
                )}
                {title === 'Edit Stall' && (
                  <AddUnit
                    title={title}
                    data={data}
                    phaseFeed={phaseFeed}
                    BlockFeed={BlockFeed}
                    dialogOpen={setOpen}
                    projectDetails={projectDetails}
                    phaseDetails={phaseDetails}
                    blockDetails={blockDetails}
                  />
                )}
                {title === 'upload_legal_docs' && (
                  <LegalDocsUplaodHome
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'planDiagram'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                    projectsList={projectsList}
                  />
                )}
                {title === 'disp_legal_docs' && (
                  <LegalDocsViewHome
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'planDiagram'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                    projectsList={projectsList}
                    viewLegalDocData={viewLegalDocData}
                  />
                )}
                {title === 'disp_project_docs' && (
                  <>
                    {/* <ProjectsDocsListView
                      title={title}
                      dialogOpen={setOpen}
                      pId={pId}
                      source={'planDiagram'}
                      myPhase={phaseDetails}
                      myBlock={myBlock}
                      projectsList={projectsList}
                      viewLegalDocData={viewLegalDocData}
                    /> */}
                    <LegalHomeList
                      title={'Finance'}
                      dialogOpen={'false'}
                      data={phaseDetails}
                      source={'projectManagement'}
                      // setSubView={setSubView}
                      subView={subView}
                      projectDetails={projectDetails}
                      pId={projectDetails?.uid}
                    />
                  </>
                )}
                {title === 'disp_project_access' && (
                  <>
                    <ProjectAccessSideView
                      title={'Event Access'}
                      dialogOpen={'false'}
                      data={{ phase: phaseDetails }}
                      projectDetails={projectDetails}
                      subView={subView}
                    />
                  </>
                )}
                {title === 'disp_unit_constDetails' && (
                  <ConstructUnitsDetails
                    title={title}
                    dialogOpen={setOpen}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                    projectsList={projectsList}
                    projectDetails={projectDetails}
                    viewUnitConstData={viewUnitConstData}
                  />
                )}
                {title === 'customer_summary_full_view' && (
                  <CustomerSideViewCRM
                    title={title}
                    dialogOpen={setOpen}
                    selCustomerPayload={selCustomerPayload}
                  />
                )}
                {title === 'View Unit' && (
                  <ViewUnitDetails
                    title={title}
                    data={data}
                    phaseFeed={phaseFeed}
                    BlockFeed={BlockFeed}
                    dialogOpen={setOpen}
                    projectDetails={projectDetails}
                    phaseDetails={phaseDetails}
                    blockDetails={blockDetails}
                    leadDetailsObj={data?.leadDetailsObj}
                    unitViewActionType={unitViewActionType}
                  />
                )}

                {title === 'Import Leads' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    myPhase={undefined}
                    myBlock={undefined}
                  />
                )}
                {title === 'Add Lead' && (
                  <AddLeadForm title={title} dialogOpen={setOpen} />
                )}
                {title === 'New Transaction' && (
                  <CaptureUnitPayment title={title} dialogOpen={setOpen} />
                )}



                {title === 'Edit to Push Lead' && (
                  <AddLeadForm
                    title={title}
                    dialogOpen={setOpen}
                    customerDetails={customerDetails}
                  />
                )}
                {title === 'User Profile' && (
                  <LeadProfileSideView
                    openUserProfile={false}
                    customerDetails={customerDetails}
                    unitViewerrr={unitViewerrr}
                    unitsViewMode={unitsViewMode}
                    setUnitsViewMode={setUnitsViewMode}
                  />
                )}
                {title === 'Notification Setup' && (
                  <NotificationsSetupForm
                    title={title}
                    projectDetails={projectDetails}
                    wbPayload={wbPayload}
                  />
                )}
                {title === 'Event Inventory' && (
                  <InventoryViewSideForm
                    title={title}
                    projectDetails={projectDetails}
                  />
                  // <ProjPhaseHome
                  //   projectDetails={projectDetails}
                  //   leadDetailsObj={undefined}
                  //   source={undefined}
                  //   unitDetails={undefined}
                  // />
                )}
                {title === 'Additional Charges' && (
                  <AdditionalChargesForm
                    title={title}
                    data={data}
                    source={undefined}
                  />
                )}
                {title === 'Payment Schedule' && (
                  <PaymentScheduleForm
                    title={title}
                    data={data}
                    source={undefined}
                  />
                )}
                {title === 'More Details' && (
                  <MoreDetailsPhaseForm
                    title={title}
                    dialogOpen={setOpen}
                    data={data}
                  />
                )}
                {title === 'Plan Diagram' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'planDiagram'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Brouchers' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'Brouchers'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'legal_doc_upload' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'legal_doc_upload'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Approvals' && (
                  <LeadsDropHomes
                    title={title}
                    dialogOpen={setOpen}
                    pId={pId}
                    source={'Approvals'}
                    myPhase={phaseDetails}
                    myBlock={myBlock}
                  />
                )}
                {title === 'Bank Accounts' && (
                  <AddBankDetailsForm
                    title={title}
                    dialogOpen={setOpen}
                    phase={data}
                  />
                )}
                {title === 'Virtual Accounts' && (
                  <AddBankDetailsForm
                    title={title}
                    dialogOpen={setOpen}
                    phase={data}
                  />
                )}
                {title === 'Transaction' && (
                  <TransactionUpdateSideView
                    openUserProfile={false}
                    customerDetails={customerDetails}
                    unitViewerrr={unitViewerrr}
                    unitsViewMode={unitsViewMode}
                    setUnitsViewMode={setUnitsViewMode}
                    transactionData={transactionData}
                  />
                )}
                {title === 'CrmUnitSideView' && (
                  <CrmUnitSideView
                    openUserProfile={false}
                    customerDetails={customerDetails}
                    unitViewerrr={unitViewerrr}
                    unitsViewMode={unitsViewMode}
                    setUnitsViewMode={setUnitsViewMode}
                  />
                )}
                {title === 'unitDetails_crm_view' && (
                  <UnitSideViewCRM
                    openUserProfile={false}
                    customerDetails={customerDetails}
                    unitViewerrr={unitViewerrr}
                    unitsViewMode={unitsViewMode}
                    setUnitsViewMode={setUnitsViewMode}
                    transactionData={transactionData}
                    selCustomerPayload={selCustomerPayload}
                    setSelUnitDetails={setSelUnitDetails}
                    selSubMenu={selSubMenu}
                    selSubMenu2={selSubMenu2}
                  />
                )}
                {title === 'Cancel_Unit' && (
                  <UnitBookingCancelCRM
                    openUserProfile={false}
                    customerDetails={customerDetails}
                    unitViewerrr={unitViewerrr}
                    unitsViewMode={unitsViewMode}
                    setUnitsViewMode={setUnitsViewMode}
                    transactionData={transactionData}
                    selCustomerPayload={selCustomerPayload}
                    setSelUnitDetails={setSelUnitDetails}
                    selSubMenu={selSubMenu}
                    selSubMenu2={selSubMenu2}
                  />
                )}
                {title === 'capturePayment' && (
                  <CaptureUnitPayment
                    title={title}
                    selUnitDetails={selUnitDetails}
                    onSubmitFun={paymentCaptureFun}
                  />
                )}
                  {title === 'addWallet' && (
                  <AddCustomerWallet title={title} dialogOpen={setOpen}
                  selUnitDetails={selUnitDetails}
                  onSubmitFun={paymentCaptureFun} />
                )}
                {title === 'newDemand' && (
                  <AddNewDemand
                    title={title}
                    selUnitDetails={selUnitDetails}
                    onSubmitFun={paymentCaptureFun}
                  />
                )}

                {title === 'confirmationDialog' && (
                  <CrmConfirmationDialog
                    title={title}
                    selUnitDetails={selUnitDetails}
                    onSubmitFun={paymentCaptureFun}
                  />
                )}

                {title === 'costSheetPreview' && (
                  <CostBreakUpPdfPreview
                    csMode={csMode}
                    costSheetA={newPlotCostSheetA || []}
                    headerContent={headerContent}
                    leadDetailsObj1={leadDetailsObj}
                    newPlotPS={newPlotPS}
                    projectDetails={projectDetails}
                    pdfExportComponent={pdfExportComponent}
                    selPhaseObj={selPhaseObj}
                    selUnitDetails={selUnitDetails}
                  />
                )}

                {title === 'viewDocx' && <ViewDocxFile />}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SiderForm
