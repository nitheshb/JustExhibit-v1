import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import {
  searchValue as searchedVal,
  searchData as searchResponse,
} from 'src/state/actions/search'

const WarnPopUpNew = ({
  open,
  setOpen,
  title,
  subtitle,
  leadsLogsPayload,
  onCloseDisabled = false,
  widthClass,
  unitsViewMode,
  setIsClicked,
  setCustomerDetails,
  setisImportLeadsOpen,
  selUnitStatus,
}) => {
  // dont write too many here
  //  this is for customerProfileSideView
  const dispatch = useDispatch()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden max-w-2xl relative"
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
            <Dialog.Overlay className="absolute inset-0 max-w-2xl bg-green-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div
            className={`fixed inset-0 flex items-center justify-center  ${(widthClass ==
              'max-w-2xl' ? 'ml-[10%]' : 'ml-[60%]')}`}
          >
            <div className="pl-10 max-w-full w-[calc(100%-300px)] bg-red-600">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-ceer"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-center"
              >
                <div className={`relative max-w-[100px]`}>
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
                  hello chck tisd
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default WarnPopUpNew
