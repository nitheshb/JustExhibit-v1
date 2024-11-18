/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'


import { LinearProgress } from '@mui/material'
import { Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { prettyDate } from 'src/util/dateConverter'
import SiderForm from '../SiderForm/SiderForm'
// import { StatusPipeline } from './StatusPipeline';

type ProjectStats = {
  total: number
  available: number
  sold: number
  blocked: number
}

type PipelineStats = {
  registration: number
  booking: number
  construction: number
  possession: number
}

type TransactionStats = {
  total: string
  sale: string
  balance: string
  refunds: string
}

type ProjectCardProps = {
  name: string
  type: string
  price: string
  stats: ProjectStats
  pipeline: PipelineStats
  transactions: TransactionStats
}

export function ProjectCard({
  project,
  setProject,
  onSliderOpen,
  isEdit,
  name,
  type,
  price,
  stats,
  pipeline,
  transactions,
}) {
  const { t } = useTranslation()
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const handleNewProjectClose = () => setIsNewProjectOpen(false)

  return (
    <>
    <div
      onClick={() => setIsNewProjectOpen(true)}
      className=" mx-4 bg-white border border-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:bg-[#F9F7F4] overflow-hidden cursor-pointer"
    >
      <section className="flex flex-row justify-between">
        <div className="p-6 flex items-center gap-4 border-b border-gray-100">
          <div className="bg-indigo-50 bg-gradient-to-r from-indigo-400 to-cyan-400 p-3 rounded-lg">
            <Building2 className="w-12 h-12 text-indigo-600" />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-900">
              {project?.eventName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                {project?.projectType?.name}
              </span>
              <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                {prettyDate(project?.eventStartDate)} -{' '}
                {prettyDate(project?.eventEndDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[12px]">{project?.location}</span>
              <span className="text-[12px]">{project?.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border-l  my-2  ml-6 py-2 w-[340px]">
          <h6 className="font-bodyLato font-semibold text-xs m-1 ml-7 mb-4">
            {'Stalls'}
          </h6>
          <div className="flex flex-row h-[101px] ml-6">
            {[
              { item: 'Total', value: project?.totalUnitCount || 0 },
              { item: 'Available', value: project?.availableCount || 0 },
              { item: 'Sold', value: project?.soldUnitCount || 0 },
              { item: 'Blocked', value: project?.blockedUnitCount || 0 },
              { item: 'Mang B', value: project?.blockedUnitCount || 0 },
            ].map((data, i) => (
              <div
                className=" w-1/4  mx-1"
                style={{
                  display: 'inline-block',
                  alignSelf: 'flex-end',
                }}
                key={i}
              >
                <h6 className="font-bodyLato flex justify-center font-semibold text-xs mt-1">
                  {t(data?.value)}
                </h6>

                <div className="">
                  <LinearProgress
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#57c0d0',
                      },
                    }}
                    variant="determinate"
                    value={100}
                    style={{
                      backgroundColor: '#22D3EE',
                      borderRadius: '3px',
                      height: `${
                        58 * (data.value / project?.totalUnitCount)
                      }px`,
                      width: `100%`,
                    }}
                  />
                </div>
                <div className="flex  justify-center mr-1  mb-1 mt[2px]">
                  <h6 className="font-bodyLato  text-xs mt-1">
                    {t(data.item)}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {/* Units Stats */}
        <div>
          <div className="px-6 py-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-600">Units</h4>
          </div>
          <div className="grid grid-cols-4 divide-x divide-gray-100">
            <div className="p-4 text-center">
              <div className="text-lg font-semibold text-gray-900">
                {project?.totalUnitCount || 0 }
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-semibold text-emerald-600">
                {project?.availableCount || 0}
              </div>
              <div className="text-xs text-gray-500">Available</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-semibold text-blue-600">
                {project?.soldUnitCount || 0 }
              </div>
              <div className="text-xs text-gray-500">Sold</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-semibold text-gray-400">
                {project?.blockedUnitCount || 0 }
              </div>
              <div className="text-xs text-gray-500">Blocked</div>
            </div>
          </div>
        </div>

        {/* Status Pipeline */}

        {/* Transactions */}
        <div>
          <div className="px-6 py-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-600">Transactions</h4>
          </div>
          <StatusPipeline
            stages={[
              {
                label: 'Total',
                value: parseInt(transactions.total.replace(/[^0-9]/g, '')),
                color: 'text-gray-900',
              },
              {
                label: 'Sale',
                value: parseInt(transactions.sale.replace(/[^0-9]/g, '')),
                color: 'text-emerald-600',
              },
              {
                label: 'Balance',
                value: parseInt(transactions.balance.replace(/[^0-9]/g, '')),
                color: 'text-orange-600',
              },
              {
                label: 'Refunds',
                value: parseInt(transactions.refunds.replace(/[^0-9]/g, '')),
                color: 'text-red-600',
              },
            ]}
          />
        </div>
      </div>
    </div>
    <SiderForm
        open={isNewProjectOpen}
        setOpen={handleNewProjectClose}
        title="project_details"
        data={project}
        setProject={setProject}
        widthClass="max-w-4xl"
      />
    </>
  )
}

type PipelineStage = {
  label: string
  value: number
  color: string
}

type StatusPipelineProps = {
  stages: PipelineStage[]
}

export function StatusPipeline({ stages }: StatusPipelineProps) {
  return (
    <div className="grid grid-cols-4 gap-2 py-3">
      {stages.map((stage, index) => (
        <div key={index} className="text-center">
          <div className={`text-lg font-semibold ${stage.color}`}>
            {stage.value}
          </div>
          <div className="text-xs text-gray-500">{stage.label}</div>
        </div>
      ))}
    </div>
  )
}
