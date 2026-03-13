"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerSimple } from "./date-picker"
import { FieldError } from "./ui/field"

export function CardDemo(
  {
    onMonthChange,
    onLifetimeChange
  }
  :{
    onMonthChange?: (months: number) => void
    onLifetimeChange?: (lifetime: number) => void
  }
) {
  const [months, setMonths] = React.useState(0)
  const [lifetime, setLifetime] = React.useState(90)
  const [monthsError, setMonthsError] = React.useState("")
  const [lifetimeError, setLifetimeError] = React.useState("")

  React.useEffect(() => {
    if(onMonthChange) {
      onMonthChange(months)
    }
  }, [months, onMonthChange])

  React.useEffect(() => {
    if(onLifetimeChange) {
      onLifetimeChange(lifetime)
    }
  }, [lifetime, onLifetimeChange])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Let's find the Time you've spent</CardTitle>
        <CardDescription>
          Just for fun... 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Date of Birth</Label>
              <DatePickerSimple onSelect={(months: number) => {setMonths(months)}} onError={(error: string) => {setMonthsError(error)}}></DatePickerSimple>
              {monthsError && <FieldError>{monthsError}</FieldError>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="lifetime"> Expected Lifetime (years)</Label>
              </div>
              <Input id="lifetime" type="number" value={lifetime} onChange={(e) => setLifetime(Number(e.target.value))} 
              onBlur={
                (e) => {
                  if(Number(e.target.value) < 90) {
                    setLifetimeError("Must be greater than or equal to 90")
                    setLifetime(Math.max(90, Number(e.target.value)))
                  }
                  else {
                    setLifetimeError("")
                  }
                }
              }
              required />
              {lifetimeError && <FieldError>{lifetimeError}</FieldError>}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
