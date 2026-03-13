"use client"
import * as React from "react"
import { CardDemo } from "@/components/form"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const [months, setMonths] = React.useState(0)
  const [lifetime, setLifetime] = React.useState(90)
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center mt-10">How much time have you spent?</h1>
      </div>
      <div className="flex items-start min-h-screen w-screen pt-10">
        <div className="grid grid-cols-12 gap-4 w-full p-5">
          <div className="col-span-12 md:col-span-4 sticky">
            <CardDemo
              onMonthChange={(months: number) => setMonths(months)}
              onLifetimeChange={(lifetime: number) => setLifetime(lifetime)}
            ></CardDemo>
          </div>
          <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
            <div className="flex justify-center">
              <h2 className="text-xl col-start-1">{ months ? `You've spent ${months} months out of your expected lifetime of ${lifetime} years` : "Enter your date of birth" }</h2>
            </div>
            <div className="flex flex-wrap gap-2 w-full overflow-y-auto">
              {Array.from({ length: months }).map((_, i) => (
                <Badge key={`spent-${i}`} variant="destructive" size="sm"></Badge>
              ))}

              {Array.from({ length: lifetime * 12 - months }).map((_, i) => (
                <Badge key={`remaining-${i}`} variant="default" size="sm"></Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}
