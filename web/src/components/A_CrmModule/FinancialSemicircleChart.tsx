
import React from 'react'

interface FinancialSemicircleChartProps {
  paidValue: number
  remainingValue: number
  balance?: number
  size?: number
  strokeWidth?: number
  filledColor?: string
  emptyColor?: string
  showPercentage?: boolean
  showBalance?: boolean
  className?: string
}

const FinancialSemicircleChart: React.FC<FinancialSemicircleChartProps> = ({
  paidValue = 0,
  remainingValue = 0,
  balance = 0,
  size = 120,
  strokeWidth = 10,
  filledColor = '#DBD3FD',
  emptyColor = '#e5e7eb',
  showPercentage = true,
  showBalance = false,
  className = '',
}) => {
  // Calculate progress percentage
  const total = paidValue + remainingValue
  const progress = total > 0 ? (paidValue / total) * 100 : 0
  const safeProgress = Math.max(0, Math.min(100, progress))

  // SVG calculations
  const radius = (size - strokeWidth) / 2
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference
  const halfHeight = size / 2 + strokeWidth / 2

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: halfHeight }}>
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${halfHeight}`}>
          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
               A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${
              size / 2
            }`}
            stroke={emptyColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
               A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${
              size / 2
            }`}
            stroke={filledColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.4s ease-in-out' }}
          />
        </svg>

        {showPercentage && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
            <span className="text-sm font-bold">
              {Math.round(safeProgress)}%
            </span>
          </div>
        )}
      </div>

      {showBalance && (
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500">Balance</div>
          <div className="text-sm font-medium">
            {formatCurrency(balance > 0 ? balance : 0)}
          </div>
        </div>
      )}
    </div>
  )
}

export default FinancialSemicircleChart
