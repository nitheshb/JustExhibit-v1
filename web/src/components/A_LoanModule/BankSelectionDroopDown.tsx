/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import {
  ChartPieIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
  PuzzleIcon,
} from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  FireIcon,
  CurrencyRupeeIcon,
  DotsVerticalIcon,
  CheckIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

export default function BankSelectionSwitchDrop({ type, setStatusFun }) {
  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  return (
    <div className="text-right inline-block  mt-[px]">
      <Menu as="div" className="relative inline-block text-left">
        <div className='container'>
          <Menu.Button className="min-w-[210%] inline-flex w-full justify-between px-0 py-0 text-sm font-semibold text-black-500 bg- rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-slate-400/10 dark:highlight-white/5 flex font-semibold hover:bg-slate-400/20 items-center leading-5 px-3 py-1 rounded-full space-x-2 text-xs px-2.5 py-1.5 ">
            <span className=" w-[300px] min-w-[] text-[12px] leading-[10px] tracking-wide text-[#0091ae]  ">
              <span className="flex flex-row ">
                <span>{`${type?.bName || 'Select Bank'} `} </span>{' '}
                <span className="ml-[2px]"></span>
              </span>
            </span>
            <ChevronDownIcon className="w-5 h-5 mr-3 mt-[2px] inline text-[#058527]" />
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
              ['Facing', 'show'].includes(type) ? 'right-0' : 'left-0'
            }  absolute  w-[360px] mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9000]`}
            // style={{ 'z-index': '9' }}
          >
            <div className="px-1 py-1 ">
              <>
                {[
                  {
                    bName: 'State Bank Of India',
                    value: 'sbi',
                  },
                  {
                    bName: 'ICICI',
                    value: 'icici',
                  },
                  {
                    bName: 'HDFC',
                    value: 'hdfc',
                  },
                ].map((data, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                        <div
                          className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
                          onClick={() => {
                            setStatusFun(data)
                          }}
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <OfficeBuildingIcon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <a className="block font-semibold text-gray-900">
                              {data.bName}
                              <span className="absolute inset-0" />
                            </a>
                            {/* <p className="mt- pb-2 border-b text-gray-600">
                              Event Setup, Insights, Access...
                            </p> */}
                          </div>
                        </div>

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
