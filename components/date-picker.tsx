"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerSimple(
    {
        onSelect,
        onError
    }
    : {
        onSelect: (months: number) => void
        onError: (error: string) => void
    }
) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  React.useEffect(() => {
    if (date) {
        const now = new Date()
        
        let months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth())

        if (now.getDate() < date.getDate()) {
            months--
        }
        onSelect(months)
    }
    else{
        onSelect(0)
    }
  }, [date, onSelect])

  return (
    <Field className="mx-auto w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
                const now = new Date()
                if (date && date < now) {
                    setDate(date)
                    setOpen(false)
                    onError("")
                }
                else {
                    onError("Please select a date in the past")
                }
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
