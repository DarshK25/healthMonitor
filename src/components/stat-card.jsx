import React from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from '../lib/utils'

export function StatCard({ title, value, icon, description, trend, className }) {
  // Determine trend color and icon
  const trendColor = trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500'
  const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '→'
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          {icon && (
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        {(description || trend !== undefined) && (
          <div className="mt-4 flex items-center gap-2">
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            {trend !== undefined && (
              <span className={`text-sm font-medium flex items-center ${trendColor}`}>
                {trendIcon} {Math.abs(trend)}%
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
