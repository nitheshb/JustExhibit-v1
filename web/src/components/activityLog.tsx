import { ClockIcon, MoveRight } from 'lucide-react';
import { useState,useEffect, useRef } from 'react';
import { timeConv } from 'src/util/dateConverter';
import { activieLogNamer, empNameSetter } from './logNameTranformer';

export default function ActivityLogComp( {filterData, usersList}) {
useEffect(() => {
  console.log('chek', filterData)
}, [filterData])

  return (
      <div className="py-2">
        {filterData?.length == 0 && (
          <div className="py-8 px-8 flex flex-col items-center">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[200px] h-[200px] inline"
                alt=""
                src="/templates.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
              Timeline is Empty
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
              This scenario is very rare to view
            </time>
          </div>
        )}



        <div className="">
          {/* <ol className="col-span-12 space-y-2 relative pl-4 sm:col-span-8  sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-200">
            {filterData?.map((data, i) => (
              <section
                key={i}
                className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-[#7BD2EA] bg-white  rounded-lg"
              >
                <a
                  href="#"
                  className="block items-center px-3 sm:flex "
                >
                  {data?.type == 'status' && (
                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                      <svg
                        className="w-3 h-3 text-blue-600 \"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                  {data?.type == 'ph' && (
                    <>
                      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-blue-600 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </span>
                      <div className="text-gray-600  m-3">
                        <div className="text-base font-normal">
                          <span className="font-medium text-green-900 ">
                            {'Rajiv'}
                          </span>{' '}
                          called{' '}
                          <span className="text-sm text-red-900 ">
                            {Name}
                          </span>{' '}
                        </div>
                        <div className="text-sm font-normal">
                          {data?.txt}
                        </div>
                        <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                          <ClockIcon className="mr-1 w-3 h-3" />
                          {data?.type == 'ph'
                            ? timeConv(
                              Number(data?.time)
                            ).toLocaleString()
                            : timeConv(data?.T).toLocaleString()}
                          {'    '}
                          <span className="text-red-900 ml-4 mr-4">
                            {Number(data?.duration)} sec
                          </span>
                          or
                          <span className="text-red-900 ml-4">
                            {parseInt(data?.duration / 60)} min
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                  {data?.type != 'ph' && (
                    <div className="text-gray-600 font-bodyLato mx-3 my-1">
                      <div className="text-base font-normal">
                        {data?.type === 'sts_change' && (
                          <span className="text-sm font-medium text-gray-800 ">
                            {data?.from?.toUpperCase()} {'  '}
                          </span>
                        )}
                        <span className="text-sm font-normal text-gray-800 mx-2 ">
                          {activieLogNamer(data)}
                        </span>{' '}
                        {data?.type === 'sts_change' && (
                          <span className="text-sm font-medium text-gray-800 ">
                            {'  '} {data?.to?.toUpperCase()}
                          </span>
                        )}
                        {data?.type === 'assign_change' && (
                          <span className="text-xs  text-gray-500 ">
                            {'  '} {empNameSetter(data?.to)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-normal">
                        {data?.txt}
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                        <ClockIcon className=" w-3 h-3   text-gray-500" />

                        <span className="text-xs  text-gray-500 ml-1">
                          {data?.type == 'ph'
                            ? timeConv(
                              Number(data?.time)
                            ).toLocaleString()
                            : timeConv(data?.T).toLocaleString()}
                        </span>

                        <div className="w-[2px] mx-2 mt-[4px] h-[8px] border-0 border-r"></div>

                        <span className="text-xs  text-gray-500">
                          by:
                        </span>
                        <span className="text-xs  text-gray-500 ml-1 ">
                          {data?.by}
                        </span>
                      </span>
                    </div>
                  )}
                </a>
              </section>
            ))}
          </ol> */}
            <div className="relative">
              <div
                className="absolute top-0 bottom-0 left-[22px] w-0.5 bg-[#5CA9E3]"
                style={{ height: '100%' }}
              ></div>

              <div className="space-y-3">
                {filterData?.map((data, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-2 top-[8px]">
                      <div className="p-[0.5px] flex items-center justify-center bg-white border border-[#F0F0F0] rounded-full ">
                        <div className="w-7 h-7  rounded-md flex items-center justify-center  z-10">
                          {data?.type === 'ph' ? (
                            <img
                              src="/timelineo.svg"
                              alt="Completed"
                              className="w-4 h-4"
                            />
                          ) : (
                            // <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            //   <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            // </svg>
                            <img
                              src="/timelineo.svg"
                              alt="Completed"
                              className="w-4 h-4"
                            />
                            // <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            //   <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            // </svg>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-100 py-2">
                      <a
                        href="#"
                        className="block items-center  sm:flex "
                      >
                        {data?.type == 'status' && (
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                            <svg
                              className="w-3 h-3 text-blue-600 \"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        )}
                        {data?.type == 'ph' && (
                          <>
                            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-blue-600 "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            </span>
                            <div className="text-gray-600  m-3">
                              <div className="text-base font-normal">
                                <span className="font-medium text-green-900 ">
                                  {'Rajiv'}
                                </span>{' '}
                                called{' '}
                                <span className="text-sm text-red-900 ">
                                  {Name}
                                </span>{' '}
                              </div>
                              <div className="text-sm font-normal">
                                {data?.txt}
                              </div>
                              <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                <ClockIcon className="mr-1 w-3 h-3" />
                                {data?.type == 'ph'
                                  ? timeConv(
                                      Number(data?.time)
                                    ).toLocaleString()
                                  : timeConv(
                                      data?.T
                                    ).toLocaleString()}
                                {'    '}
                                <span className="text-red-900 ml-4 mr-4">
                                  {Number(data?.duration)} sec
                                </span>
                                or
                                <span className="text-red-900 ml-4">
                                  {parseInt(data?.duration / 60)}{' '}
                                  min
                                </span>
                              </span>
                            </div>
                          </>
                        )}
                        {data?.type != 'ph' && (
                          <div className="text-gray-600 font-bodyLato mx-3 my-1">
                            <div className="text-base  flex-row flex items-center font-normal">
                              {data?.type === 'sts_change' && (
                                <span className="text-[12px] font-medium text-gray-800 bg-[#F5F5F5] p-2 py-1 px-3 rounded-[8px] ">
                                  {data?.from?.toUpperCase()} {'  '}
                                </span>
                              )}
                              {data?.type != 'sts_change' && ( <span className="text-sm font-normal text-gray-800  ">
                                {activieLogNamer(data)}
                              </span>)}{' '}
                              {data?.type === 'sts_change' && ( <span className="text-sm font-normal text-gray-800 mx-2 ">
                                <MoveRight className='w-4 h-4 ' />
                              </span>)}
                              {data?.type === 'sts_change' && (
                                <span className="text-[12px] font-medium text-gray-800 bg-[#F5F5F5] p-2 py-1 px-3 rounded-[8px] ">
                                  {'  '} {data?.to?.toUpperCase()}
                                </span>
                              )}
                              {data?.type === 'assign_change' && (
                                <span className="text-xs  text-gray-500 ml-2 ">
                                  {'  '} {empNameSetter(usersList, data?.to)}
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                              <ClockIcon className=" w-3 h-3   text-gray-500" />

                              <span className="text-xs  text-gray-500 ml-1">
                                {data?.type == 'ph'
                                  ? timeConv(
                                      Number(data?.time)
                                    ).toLocaleString()
                                  : timeConv(
                                      data?.T
                                    ).toLocaleString()}
                              </span>

                              <div className="w-[2px] mx-2 mt-[4px] h-[8px] border-0 border-r"></div>

                              <span className="text-xs  text-gray-500">
                                by:
                              </span>
                              <span className="text-xs  text-gray-500 ml-1 ">
                                {data?.by}
                              </span>
                            </span>
                          </div>
                        )}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

  );
}

