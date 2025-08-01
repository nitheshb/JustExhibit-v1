import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'

export default function DropDownSearchBar({
  label,
  type,
  viewUnitStatusA,
  pickCustomViewer,
  dropDownItemsA,
  selProjectIs,
}) {
  return (
<div className="flex-shrink-0 z-10 inline-flex items-center p-3 px-6 text-sm font-medium text-left text-gray-900 ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full px-0 py-0 text-sm font-semibold text-black-500  rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <>
            <div className='flex flex-col gap-2'>
            <span className="text-left font-bold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#1A1A1A]">{label}</span>
            <div className="flex flex-row border border-[#E5E7EA] rounded-[8px] p-[12px]">
              <span className=" tracking-wide max-w-[150px] min-w-[150px] text-ellipsis text-left whitespace-nowrap font-body font-normal text-[12px] leading-[16px] tracking-[0px] align-middle text-[#131927] ">
                {selProjectIs?.eventName ||
                  selProjectIs?.phaseName ||
                  type?.toLocaleUpperCase()}
              </span>
              <ChevronDownIcon className="w-5 h-5  mt-[1px] inline text-[#9EA2AE] ml-2 mr-3" />
            </div>
              </div>
            </>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${
              ['Facing'].includes(type) ? 'right-0' : 'left-[-14px]'
            }  absolute  w-52 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9000]`}
            style={{ zIndex: '9', marginTop: '14px' }}
          >
            <div className="px-1 py-1 ">
              <>
                {dropDownItemsA.map((viewData, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-violet-500 text-white rounded-sm'
                            : 'text-gray-900'
                        } group flex    text-left w-full py-2 text-sm`}
                        onClick={() => pickCustomViewer(viewData)}
                      >
                        {viewUnitStatusA.includes(viewData) ? (
                          <CheckIcon
                            className="h-5 w-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckIcon
                            className="w-5 h-5 mr-2 text-transparent"
                            aria-hidden="true"
                          />
                        )}
                        {viewData?.eventName || viewData?.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
