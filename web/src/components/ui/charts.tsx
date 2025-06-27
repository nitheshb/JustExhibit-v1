import * as React from "react"
import {
  ResponsiveContainer,
  TooltipProps,
  Tooltip as RechartsTooltip,
} from "recharts"

import { Card } from "./card"
import { cn } from "./utils"

type ChartContainerProps = {
  className?: string
  children: React.ReactNode
}




type ChartLegendProps = {
  content?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function ChartContainer({ className, children }: ChartContainerProps) {
  return (
    <Card className={cn("relative h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </Card>
  )
}

export function ChartTooltip<TData>({
  content,
  ...props
}: TooltipProps<number, string> & {
  content?: (props: TooltipProps<number, string>) => React.ReactNode
}) {
  return (
    <RechartsTooltip
      {...props}
      content={(tooltipProps) => (
        <ChartTooltipContent {...tooltipProps} customContent={content} />
      )}
    />
  )
}

type ChartTooltipContentProps<TValue = number, TName = string> = TooltipProps<TValue, TName> & {
  customContent?: (props: TooltipProps<TValue, TName>) => React.ReactNode
}

// export function ChartTooltipContent<TValue = number, TName = string>({
//   active,
//   payload,
//   label,
//   customContent,
// }: ChartTooltipContentProps<TValue, TName>) {
//   if (!active || !payload || payload.length === 0) return null

//   if (customContent) {
//     return <>{customContent({ active, payload, label })}</>
//   }

//   return (
//     <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
//       <div className="text-sm font-medium">{label}</div>
//       {payload.map((item, idx) => (
//         <div key={idx} className="text-xs text-muted-foreground">
//           {item.name}: {item.value}
//         </div>
//       ))}
//     </div>
//   )
// }

// Modified ChartTooltipContent component with shadcn/ui styling
export const ChartTooltipContent = ({ active, payload, hideLabel = false }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const browser = data.name;
  const value = data.value;
  const color = data.payload.fill;

  return (
    <div className="rounded-lg border bg-white p-3 shadow-md animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium text-foreground">
            {!hideLabel && browser}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {value.toLocaleString()} visitors
        </div>
      </div>
    </div>
  );
};





export function ChartLegend({ content, className, ...props }: ChartLegendProps) {
  return (
    <div className={cn("mt-4", className)} {...props}>
      {content}
    </div>
  );
}

export function ChartLegendContent() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full border border-black" 
             style={{ background: "rgba(92, 169, 227, 0.6)" }} />
        <span className="text-xs">Desktop</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full border border-black" 
             style={{ background: "rgba(42, 157, 144, 0.48)" }} />
        <span className="text-xs">Mobile</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full border border-black" 
             style={{ background: "rgba(231, 110, 80, 0.48)" }} />
        <span className="text-xs">Tablet</span>
      </div>
    </div>
  );
}