
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import {
  searchValue as searchedVal,
  searchData as searchResponse,
} from 'src/state/actions/search'
import BookingPaymentFlow from '../A_CrmModule/A_Crm_sideFormBodies.tsx/booking_payment'
import CsMangerApprovalFlow from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_manager_approval'
import Cs_customerKyc from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_customerKyc'
import Crm_legal_Clarity from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_legal_ClarityBody'
import Crm_ATS_Draft from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_ats_draft'
import Crm_Sd_approval from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_sd_approval'
import Crm_ATS_approval from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_ats_approval'
import Crm_Unit_Posession from '../A_CrmModule/A_Crm_sideFormBodies.tsx/cs_posession'
import EcommerceHome from '../A_CrmModule/A_eCommerce/cs_eCommerceHome'

const CrmSiderForm = ({
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
  selUnitPayload,
  selUnitDetails,
  selPhaseObj,
  selSubMenu,
  selSubMenu2,
  setIsClicked,
  setOpen,
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
}) => {
  // dont write too many here
  //  this is for customerProfileSideView


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
                  title === 'Add Lead' ||
                  title === 'Create Event' ||
                  title === 'Edit Event' ||
                  title === 'upload_legal_docs'
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
                {title === 'crm_booking_payment' && (
                  <BookingPaymentFlow title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                  {title === 'crm_cs_approval' && (
                  <EcommerceHome title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                  {title === 'crm_show_cs' && (
                  <CsMangerApprovalFlow title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}

                {title === 'crm_KYC' && (
                  <Cs_customerKyc title={title} dialogOpen={setOpen} selUnitPayload={customerDetails} />
                )}
                {title === 'crm_legal_clarity' && (
                  <Crm_legal_Clarity title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                {title === 'crm_ATS_Draft' && (
                  <Crm_ATS_Draft title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                {title === 'crm_SD_Approval' && (
                  <Crm_Sd_approval title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                   {title === 'crm_ATS_Approval' && (
                  <Crm_ATS_approval title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}
                  {title === 'crm_posession' && (
                  <Crm_Unit_Posession title={title} dialogOpen={setOpen} selUnitPayload={selUnitPayload} />
                )}


              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CrmSiderForm
