import React from 'react'

interface RadialChartProps {
  progress: number
  totalSegments?: number
  filledColor?: string
  emptyColor?: string
  innerWidth?: number
  outerWidth?: number
  segmentHeight?: number
  baseRadius?: number
}

const RadialChart: React.FC<RadialChartProps> = ({
  progress,
  totalSegments = 50,
  filledColor = '#F8886A',
  emptyColor = '#e5e7eb',
  innerWidth = 4,
  outerWidth = 8,
  segmentHeight = 60,
  baseRadius = 40,
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, progress))
  const activeSegments = Math.round((clampedPercentage / 100) * totalSegments)
  const angleStep = 360 / totalSegments

  const innerRadius = baseRadius
  const outerRadius = baseRadius + segmentHeight
  const center = 100

  return (
    <div className="relative w-[84px] h-[84px] flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {Array.from({ length: totalSegments }).map((_, i) => {
          const angle = i * angleStep
          const rad = (angle * Math.PI) / 180

          const angleOffsetInner = innerWidth / 2 / innerRadius
          const angleOffsetOuter = outerWidth / 2 / outerRadius

          const p1x = center + innerRadius * Math.cos(rad - angleOffsetInner)
          const p1y = center + innerRadius * Math.sin(rad - angleOffsetInner)

          const p2x = center + outerRadius * Math.cos(rad - angleOffsetOuter)
          const p2y = center + outerRadius * Math.sin(rad - angleOffsetOuter)

          const p3x = center + outerRadius * Math.cos(rad + angleOffsetOuter)
          const p3y = center + outerRadius * Math.sin(rad + angleOffsetOuter)

          const p4x = center + innerRadius * Math.cos(rad + angleOffsetInner)
          const p4y = center + innerRadius * Math.sin(rad + angleOffsetInner)

          const color = i < activeSegments ? filledColor : emptyColor

          return (
            <polygon
              key={i}
              points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
              fill={color}
            />
          )
        })}
      </svg>
      <div className="absolute text-[15px] font-medium text-[#000000]">
        {clampedPercentage.toFixed(0)}%
      </div>
    </div>
  )
}

export default RadialChart
